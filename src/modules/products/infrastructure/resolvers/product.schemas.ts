import gql from "graphql-tag";


export const productSchemas = gql`
  type Product {
    id: ID
    name: String
    description: String
    price: Float
  }

  type ProductResponse implements Response {
    status: String
    data: [Product]
    errors: [DataError]
  }
`;
