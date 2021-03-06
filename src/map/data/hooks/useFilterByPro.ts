import { filterByProSelector } from "../selectors";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { toggleProNadesAction } from "../slice";
import { useAnalytics } from "../../../utils/Analytics";

export const useFilterByPro = () => {
  const { event } = useAnalytics();

  const byPro = useSelector(filterByProSelector);
  const dispatch = useDispatch();

  const toggleFilterByPro = useCallback(() => {
    dispatch(toggleProNadesAction());
    event({
      category: "Filter",
      action: `Toggle pro`,
    });
  }, [dispatch, event]);

  return {
    byPro,
    toggleFilterByPro,
  };
};
