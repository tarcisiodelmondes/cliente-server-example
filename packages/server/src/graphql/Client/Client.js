import { gql } from "apollo-server-express";

import * as uuid from "uuid";

import createRepository from "../../io/Database/createRepository";
import { ListSortEnum } from "../List/List";

const clientRepository = createRepository("client");

export const typeDefs = gql`
  type Client implements Node {
    id: ID!
    name: String!
    email: String!
    disabled: Boolean!
  }

  type ClientList implements List {
    items: [Client!]!
    totalItems: Int!
  }

  input ClientListFilter {
    name: String
    email: String
    disabled: Boolean
  }

  input ClientListOptions {
    take: Int
    skip: Int
    sort: ListSort
    filter: ClientListFilter
  }

  extend type Query {
    client(id: ID!): Client
    clients(options: ClientListOptions): ClientList
  }

  input CreateClientInput {
    name: String!
    email: String!
  }

  input UpdateClientInput {
    id: ID!
    name: String!
    email: String!
  }

  input DeleteClientInput {
    id: ID!
  }

  input EnableClientInput {
    id: ID!
  }

  input DisabledClientInput {
    id: ID!
  }

  extend type Mutation {
    createClient(input: CreateClientInput!): Client!
    updateClient(input: UpdateClientInput!): Client!
    deleteClient(input: DeleteClientInput): Client!
    enableClient(input: EnableClientInput): Client!
    disableClient(input: DisabledClientInput): Client!
  }
`;

export const resolvers = {
  Query: {
    client: async (_, { id }) => {
      const clients = await clientRepository.read();

      return clients.find((client) => client.id === id);
    },

    clients: async (_, args) => {
      const { take = 10, skip = 0, sort, filter } = args.options || {};

      const clients = await clientRepository.read();

      if (sort) {
        clients.sort((clientA, clientB) => {
          if (!["name", "email", "disabled"].includes(sort.sorter))
            throw new Error(`Cannot sort by field "${sort.sorter}".`);

          const fieldA = clientA[sort.sorter];
          const fieldB = clientB[sort.sorter];

          if (typeof fieldA === "string") {
            if (sort.sorter === ListSortEnum.ASC)
              return fieldA.localeCompare(fieldB);
            else return fieldB.localeCompare(fieldA);
          }

          if (sort.sorter === ListSortEnum.ASC)
            return Number(fieldA) - Number(fieldB);
          else return Number(fieldB) - Number(fieldA);
        });
      }

      const filteredClients = clients.filter((client) => {
        if (!filter || Object.keys(filter).length === 0) return true;

        return Object.entries(filter).every(([field, value]) => {
          if (client[field] === null || client[field] === undefined)
            return false;
          if (typeof value === "string") {
            if (value.startsWith("%") && value.endsWith("%"))
              return client[field].includes(value.substr(1, value.length - 2));
            if (value.startsWith("%"))
              return client[field].endsWith(value.substr(1));
            if (value.endsWith("%"))
              return client[field].startsWith(
                value.substr(0, value.length - 1)
              );
            return client[field] === value;
          }
          return client[field] === value;
        });
      });

      return {
        items: filteredClients.splice(skip, skip + take),
        totalItems: clients.length,
      };
    },
  },

  Mutation: {
    createClient: async (_, { input }) => {
      const clients = await clientRepository.read();

      const client = {
        id: uuid.v4(),
        name: input.name,
        email: input.email,
        disabled: false,
      };

      await clientRepository.write([...clients, client]);

      return client;
    },

    updateClient: async (_, { input }) => {
      const clients = await clientRepository.read();

      const currentClient = clients.find((client) => client.id === input.id);

      if (!currentClient)
        throw new Error(`No client with this id "${input.id}"`);

      const updatedClient = {
        ...currentClient,
        name: input.name,
        email: input.email,
      };

      const updatedClients = clients.map((client) => {
        if (client.id === updatedClient.id) return updatedClient;
        return client;
      });

      await clientRepository.write(updatedClients);

      return updatedClient;
    },

    deleteClient: async (_, { input }) => {
      const clients = await clientRepository.read();

      const client = clients.find((client) => client.id === input.id);

      if (!client) throw new Error("ID not found");

      const updatedClients = clients.filter(
        (_client) => _client.id !== client.id
      );

      await clientRepository.write(updatedClients);

      return client;
    },

    enableClient: async (_, { input }) => {
      const clients = await clientRepository.read();

      const client = await clients.find((client) => client.id === input.id);

      if (client.disabled === true) {
        throw new Error("User is already activated");
      }

      const updatedClient = clients.map((_client) => {
        if (_client.id !== input.id) return _client;

        return {
          ...client,
          disabled: true,
        };
      });

      await clientRepository.write(updatedClient);

      return client;
    },

    disableClient: async (_, { input }) => {
      const clients = await clientRepository.read();

      const client = await clients.find((client) => client.id === input.id);

      if (client.disabled === false) {
        throw new Error("User is already disabled");
      }

      const updatedClient = clients.map((_client) => {
        if (_client.id !== input.id) return _client;

        return {
          ...client,
          disabled: false,
        };
      });

      await clientRepository.write(updatedClient);

      return client;
    },
  },
};
