import gql from 'graphql-tag';
import {BOARD_FRAGMENT, EPISODE_FRAGMENT, ARROW_FRAGMENT} from './fragment';

// export const BOARD = gql`
//   query board($episodeId: String!) {
//     board(episodeId: $episodeId) {
//       ...BoardParts
//     }
//   }
//   ${BOARD_FRAGMENT}
// `;

export const BOARD = gql`
  query board($episodeId: String!) {
    board(episodeId: $episodeId) {
      id
      episode {
        ...EpisodeParts
      }
      arrows {
        ...ArrowParts
      }
    }
  }
  ${EPISODE_FRAGMENT}
  ${ARROW_FRAGMENT}
`;

export const UPDATE_BOARD = gql`
  mutation updateBoard(
    $boardId: String!
    $fromIds: [String!]!
    $toIds: [String!]!
  ) {
    updateBoard(boardId: $boardId, fromIds: $fromIds, toIds: $toIds)
  }
`;
