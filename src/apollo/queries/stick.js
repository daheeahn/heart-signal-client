import gql from 'graphql-tag';

// not use
export const GET_LOCAL_DATA = gql`
  query getLocalData {
    isLoggedIn @client
  }
`;
