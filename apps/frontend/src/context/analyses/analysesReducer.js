import { ANALYSIS_COMPLETE, ANALYSIS_ERROR, START_ANALYSIS } from '../types';

export default (state, action) => {
  switch (action.type) {
    case ANALYSIS_COMPLETE:
      return {
        ...state,
        results: { ...state.results, ...action.payload },
        performing: false,
      };
    case ANALYSIS_ERROR:
      return {
        ...state,
        performing: false,
      };
    case START_ANALYSIS:
      return {
        ...state,
        performing: true,
      };
    default:
      return state;
  }
};
