import { ApolloServer, gql } from "apollo-server";

// query {
//   posts {
//     id
//     title
//     author {
//       firstName
//       lastName
//     }
//   }
// }

const typeDefs = gql`
  # https://studio.apollographql.com/sandbox/explorer
  type Author {
    id: Int!
    firstName: String!
    lastName: String!
    posts(findTitle: String): [Post]
  }

  type Post {
    id: Int!
    title: String!
    author: Author
  }

  type Query {
    posts: [Post]
  }
`;

const server = new ApolloServer({ typeDefs, mocks: true });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
