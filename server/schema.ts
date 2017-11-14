// import { Random } from 'meteor/random';
import { makeExecutableSchema } from 'graphql-tools';
import Author from './graphql/authors/author.schema';
import resolvers from './graphql/root.resolver';

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
      
      type Mutation {
        root(id: String): String
      }


`];

export default makeExecutableSchema({
  typeDefs, resolvers
});
