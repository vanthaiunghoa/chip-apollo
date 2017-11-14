// import { Random } from 'meteor/random';
import { makeExecutableSchema } from 'graphql-tools';
import Author from './graphql/schemas/author.schema';
import resolvers from './graphql/resolvers/root.resolver';

export const typeDefs = [Author, `
      type Email {
        address: String
        verified: Boolean
      }
      type User {
        emails: [Email]
        randomString: String
        _id: String
      }
      type Query {
        user: User,
        author: Author
      }
`];

export default makeExecutableSchema({
  typeDefs, resolvers
});
