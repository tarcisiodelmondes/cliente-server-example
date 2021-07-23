import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";

const GET_CLIENTS_LIST = gql`
  query GET_CLIENTS_LIST($skip: Int!, $take: Int!) {
    clients(options: { skip: $skip, take: $take }) {
      items {
        id
        name
        email
      }
    }
  }
`;

export function ClientList({ onSelectClient }) {
  const { error, loading, data, fetchMore } = useQuery(GET_CLIENTS_LIST, {
    fetchPolicy: "cache-and-network",
    variables: {
      skip: 0,
      take: 10,
    },
  });

  const handleSelectionClient = (client) => () => onSelectClient?.(client.id);

  function handleMore() {
    fetchMore({
      variables: {
        skip: data.clients.items.length,
        take: 10,
      },
      updateQuery: (results, { fetchMoreResult }) => {
        if (!fetchMoreResult) return results;

        return {
          ...results,
          clients: {
            ...results.clients,
            items: results.clients.items.concat(fetchMoreResult.clients.items),
          },
        };
      },
    });
  }

  const clients = data?.clients.items ?? [];

  if (error) return <p>Internal server error</p>;

  return (
    <section>
      {loading ? (
        <p>Carregando</p>
      ) : (
        <ul>
          {clients.map((client) => {
            return (
              <li key={client.id} onClick={handleSelectionClient(client)}>
                <p>{client.name}</p>
                <p>{client.email}</p>
              </li>
            );
          })}
        </ul>
      )}
      <button type="button" onClick={handleMore}>
        Carregar mais
      </button>
    </section>
  );
}
