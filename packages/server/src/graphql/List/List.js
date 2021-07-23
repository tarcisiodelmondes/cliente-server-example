import { gql } from "apollo-server-express";

export const typeDefs = gql`
  interface List {
    items: [Node!]!
    totalItems: Int!
  }

  enum ListSortEnum {
    ASC
    DESC
  }

  input ListSort {
    sorter: String!
    assortment: ListSortEnum!
  }
`;

export const ListSortEnum = Object.freeze({
  ASC: "ASC",
  DESC: "DESC",
});

export const resolvers = {
  List: {
    __resolveType: () => null,
  },
};
