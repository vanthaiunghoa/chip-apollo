import { Mongo } from 'meteor/mongo';
import { merge } from 'lodash';

// import { resolvers as gitHubResolvers } from './github/schema';
// import { resolvers as sqlResolvers } from './sql/schema';

const resolvers = {
    Mutation: {
      createBook: async (root, {title, author}) => {
        console.log(title);
        return {title: title};
      }
    }
};

export default resolvers;
