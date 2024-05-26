import gql from "graphql-tag";


export const contextSchemas = gql`
  type Context {
    id: ID
  }

  type ContextResponse implements Response {
    status: String
    data: [Context]
    errors: [DataError]
  }
`;
