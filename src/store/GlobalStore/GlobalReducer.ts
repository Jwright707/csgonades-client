import { Reducer } from "redux";
import { SiteStats } from "../../api/StatsApi";
import { assertNever } from "../../utils/Common";
import { GlobalActions } from "./GlobalActions";

export type GlobalState = {
  readonly stats: SiteStats;
  readonly isNavOpen: boolean;
};

const initialState: GlobalState = {
  stats: {
    numNades: 0,
    numUsers: 0,
    numPending: 0
  },
  isNavOpen: false
};

export const GlobalReducer: Reducer<GlobalState, GlobalActions> = (
  state = initialState,
  action
): GlobalState => {
  switch (action.type) {
    case "@@global/ADD_SITE_STATS":
      return {
        ...state,
        stats: action.stats
      };
    case "@@global/TOGGLE_NAVIGATION":
      return {
        ...state,
        isNavOpen: !state.isNavOpen
      };
    case "@@global/CLOSE_NAVIGATION":
      return {
        ...state,
        isNavOpen: false
      };
    default:
      assertNever(action);
      return state;
  }
};
