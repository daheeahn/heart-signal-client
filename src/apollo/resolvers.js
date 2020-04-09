export const typeDefs = `
    extend schema {
        query: Query
        mutation: Mutation
    }
`;

// export const resolvers = {
//   Query: {
//     // not use
//     isLoggedIn: (_, __, {cache}) => {
//       const queryResult = cache.readQuery({
//         query: GET_LOCAL_DATA,
//       });
//       console.log('queryResult', queryResult);
//       if (queryResult) {
//         return queryResult;
//       }
//     },
//   },
// };
