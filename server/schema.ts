// import { Random } from 'meteor/random';
import {Author} from './graphql/schemas/author';
import {Book} from './graphql/schemas/book';

export const typeDefs = [Author, Book, `
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

export const resolvers =
{
    Query: {
      user(root, args, context) {
        /*
         * We access to the current user here thanks to the context. The current
         * user is added to the context thanks to the `meteor/apollo` package.
         */
        // return context.user;
        return { _id: 'Bob', emails: ['bob@deamz.com'] };
      },
      author() {
        return {id: 123}
      }
    },
    User: {
      emails: ({ emails }) => emails
      // randomString: () => Random.id(),
    }
};
