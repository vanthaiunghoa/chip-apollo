import { Mongo } from 'meteor/mongo';
import { merge } from 'lodash';

// import { resolvers as gitHubResolvers } from './github/schema';
// import { resolvers as sqlResolvers } from './sql/schema';

const resolvers = {
    Mutation: {
      createAuthor: async (root, {firstName, lastName}) => {
        console.log(firstName);
        return {firstName: firstName};
      }
    }
};

export default resolvers;
