import {gql} from 'apollo-boost';

export const USER_FRAGMENT = gql`
  fragment UserParts on User {
    id
    nickName
    gender
    age
  }
`;

const LOVER = `
  id
  name
  gender
  season
  image
  description
  age
  job
`;

const ARROW = `
  id
  from {
    ${LOVER}
  }
  to {
    ${LOVER}
  }
`;

export const LOVER_FRAGMENT = gql`
  fragment LoverParts on Lover {
    ${LOVER}
  }
`;

const EPISODE = `
  id
  number
  season
  arrows {
    ${ARROW}
  }
`;

export const EPISODE_FRAGMENT = gql`
  fragment EpisodeParts on Episode {
    ${EPISODE}
  }
`;

export const BOARD_FRAGMENT = gql`
  fragment BoardParts on Board {
    id
    episode {
      ${EPISODE}
    }
  }
`;

export const ARROW_FRAGMENT = gql`
  fragment ArrowParts on Arrow {
    ${ARROW}
  }
`;
