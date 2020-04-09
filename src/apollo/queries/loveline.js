import gql from 'graphql-tag';
import {} from './fragment';

export const LOVELINE_STATUS = gql`
  query lovelineStatus($episodeId: String!, $boardId: String!) {
    lovelineStatus(episodeId: $episodeId, boardId: $boardId) {
      sameNum
      totalNum
    }
  }
`;
