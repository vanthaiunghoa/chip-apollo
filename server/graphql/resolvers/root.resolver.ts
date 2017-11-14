import { merge } from 'lodash';

// import { resolvers as gitHubResolvers } from './github/schema';
// import { resolvers as sqlResolvers } from './sql/schema';

const rootResolvers = {
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

// Merge all of the resolver objects together
// const resolvers = merge(rootResolvers, gitHubResolvers, sqlResolvers);
export default rootResolvers;
