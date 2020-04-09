import gql from 'graphql-tag';
import {ARROW_FRAGMENT} from './fragment';

export const CREATE_ARROW = gql`
  mutation createArrow($boardId: String!, $fromId: String!, $toId: String!) {
    createArrow(boardId: $boardId, fromId: $fromId, toId: $toId) {
      ...ArrowParts
    }
  }
  ${ARROW_FRAGMENT}
`;

export const DELETE_ARROW = gql`
  mutation deleteArrow($arrowId: String!) {
    deleteArrow(arrowId: $arrowId)
  }
`;
