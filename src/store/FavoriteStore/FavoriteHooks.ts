import { useDispatch, useSelector } from "react-redux";
import { Favorite } from "../../models/Favorite";
import { allFavoritesSelector } from "./FavoriteSelectors";
import {
  addFavoriteThunkAction,
  addUnFavoriteThunkAction,
  fetchFavoritedNadesThunkAction,
  fetchFavoritesThunkAction
} from "./FavoriteThunks";

export const useFetchFavorites = () => {
  const dispatch = useDispatch();
  return () => dispatch(fetchFavoritesThunkAction());
};

export const useAddFavorite = () => {
  const dispatch = useDispatch();
  return (nadeId: string) => dispatch(addFavoriteThunkAction(nadeId));
};

export const useUnfavorite = () => {
  const dispatch = useDispatch();
  return (favoriteId: string) => dispatch(addUnFavoriteThunkAction(favoriteId));
};

export const useIsFavorited = (nadeId: string): Favorite | null => {
  const favories = useSelector(allFavoritesSelector);
  const result = favories.find(favorite => favorite.nadeId === nadeId);
  if (result) {
    return result;
  }
  return null;
};

export const useFetchFavoritedNades = () => {
  const dispatch = useDispatch();
  return () => dispatch(fetchFavoritedNadesThunkAction());
};
