import { Mongo } from 'meteor/mongo';
import { merge } from 'lodash';

import authorResolvers from './authors/author.resolver';
import bookResolvers from './books/book.resolver';

const Entity = new Mongo.Collection('bomip_entity');

const rootResolvers = {
    Query: {
      user(root, args, context, info) {
        /*
         * We access to the current user here thanks to the context. The current
         * user is added to the context thanks to the `meteor/apollo` package.
         */
        // return context.user;
        return { _id: 'Bob', emails: ['bob@deamz.com'] };
      },
      author: async (root, {_id}) => {
        return (await Entity.find({}));
      }
    },
    User: {
      emails: ({ emails }) => emails
      // randomString: () => Random.id(),
    }
};

// Merge all of the resolver objects together
// const resolvers = merge(rootResolvers, gitHubResolvers, sqlResolvers);
export default merge(rootResolvers, authorResolvers, bookResolvers);

// extend type Mutation {
//   createAuthor: async (root, args, context, info) => {
//     const id = await Authors.insert(args);
//     return await Authors.findOne({_id: id});
//   }
