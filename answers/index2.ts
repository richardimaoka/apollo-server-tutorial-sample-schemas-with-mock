import { ApolloServer, gql } from "apollo-server";

// query ($term: String!) {
//   me {
//     id
//     username
//     email
//     role
//   }
//   user(id: "a") {
//     id
//     username
//     email
//     role
//   }
//   allUsers {
//     id
//     username
//   }
//   search(term: "abc") {
//     ... on User {
//       id
//       username
//       email
//     }
//     ... on Chat {
//       id
//       messages {
//         id
//         user {
//           id
//           username
//         }
//       }
//     }
//     ... on ChatMessage {
//       content
//       id
//       user {
//         id
//         username
//       }
//     }
//   }
// }
const typeDefs = gql`
  # https://www.graphql-code-generator.com/
  scalar Date

  schema {
    query: Query
  }

  type Query {
    me: User!
    user(id: ID!): User
    allUsers: [User]
    search(term: String!): [SearchResult!]!
    myChats: [Chat!]!
  }

  enum Role {
    USER
    ADMIN
  }

  interface Node {
    id: ID!
  }

  union SearchResult = User | Chat | ChatMessage

  type User implements Node {
    id: ID!
    username: String!
    email: String!
    role: Role!
  }

  type Chat implements Node {
    id: ID!
    users: [User!]!
    messages: [ChatMessage!]!
  }

  type ChatMessage implements Node {
    id: ID!
    content: String!
    time: Date!
    user: User!
  }
`;

const server = new ApolloServer({ typeDefs, mocks: true });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
