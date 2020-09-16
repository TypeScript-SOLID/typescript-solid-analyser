import { CLEAR_FILTER, FILTER_REPOSITORIES, GET_REPOSITORIES } from '../types';

export default (state, action) => {
  switch (action.type) {
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case FILTER_REPOSITORIES:
      return {
        ...state,
        filtered: state.repositories.filter((repository) =>
          repository.name.match(new RegExp(`${action.payload}`, 'gi')),
        ),
      };
    case GET_REPOSITORIES:
      return {
        ...state,
        repositories: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
