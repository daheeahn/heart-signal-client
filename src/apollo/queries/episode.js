import gql from 'graphql-tag';
import {EPISODE_FRAGMENT} from './fragment';

export const EPISODES = gql`
  {
    episodes {
      ...EpisodeParts
    }
  }
  ${EPISODE_FRAGMENT}
`;

export const UPDATE_ARROWS_OF_EPI = gql`
  mutation updateArrowsOfEpi(
    $episodeId: String!
    $fromId: String!
    $toId: String!
  ) {
    updateArrowsOfEpi(episodeId: $episodeId, fromId: $fromId, toId: $toId)
  }
`;
