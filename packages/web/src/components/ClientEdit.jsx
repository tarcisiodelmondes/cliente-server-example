import gql from "graphql-tag";
import React, { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation } from "react-apollo";

const CLIENT = gql`
  query CLIENT($clientId: ID!) {
    client(id: $clientId) {
      id
      name
      email
    }
  }
`;

const UPDATE_CLIENT = gql`
  mutation UPDATE_CLIENT($id: ID!, $name: String!, $email: String!) {
    updateClient(input: { id: $id, name: $name, email: $email }) {
      id
      name
      email
    }
  }
`;

export function ClientEdit({ clientId }) {
  const { error, loading, data } = useQuery(CLIENT, {
    variables: {
      clientId,
    },

    skip: !clientId,
    fetchPolicy: "cache-first",
  });

  const [updateClient] = useMutation(UPDATE_CLIENT);

  const initialValues = useMemo(
    () => ({
      name: data?.client.name ?? "",
      email: data?.client.email ?? "",
    }),
    [data]
  );

  const [values, setValues] = useState(initialValues);

  useEffect(() => setValues(initialValues), [initialValues]);

  function handleNameValue(e) {
    e.persist();

    setValues((value) => ({
      ...value,
      name: e.target.value,
    }));
  }

  function handleEmailValue(e) {
    e.persist();

    setValues((value) => ({
      ...value,
      email: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log(clientId, values);

    updateClient({
      variables: {
        id: clientId,
        name: values.name,
        email: values.email,
      },
    }).then(console.log);
  }

  if (error) return <p>internal server error</p>;

  return (
    <>
      {loading ? (
        <p>Carregando</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            onChange={(e) => handleNameValue(e)}
            value={values.name}
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => handleEmailValue(e)}
            value={values.email}
          />

          <button type="submit">Editar</button>
        </form>
      )}
    </>
  );
}
