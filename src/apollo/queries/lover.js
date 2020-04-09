import gql from 'graphql-tag';
import {USER_FRAGMENT, LOVER_FRAGMENT} from './fragment';

export const CREATE_USER = gql`
  mutation createUser($gender: Gender!, $age: Int!) {
    createUser(gender: $gender, age: $age)
  }
`;

export const GET_USER = gql`
  {
    getUser {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export const LOVERS = gql`
  {
    lovers {
      females {
        ...LoverParts
      }
      males {
        ...LoverParts
      }
    }
  }
  ${LOVER_FRAGMENT}
`;
