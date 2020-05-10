import { useMemo } from "react";
import { useSelector } from "react-redux";
import { NadeLight } from "../../../models/Nade/Nade";
import { favoritedNadeIdsSelector } from "../../../store/FavoriteStore/FavoriteSelectors";
import {
  filterByTickrateSelector,
  filterByFavoritesSelector,
  filterByTypeSelector,
  filterByProSelector,
} from "../selectors";
import {
  addFavoriteToNades,
  filterByType,
  filterByTickrate,
  filterByFavorite,
  containsSimilarNade,
  filterByPro,
} from "./helpers";

export const useNadesForMapView = (nades: NadeLight[]): NadeLight[] => {
  const byTickrate = useSelector(filterByTickrateSelector);
  const byFavorites = useSelector(filterByFavoritesSelector);
  const byType = useSelector(filterByTypeSelector);
  const favoritedNades = useSelector(favoritedNadeIdsSelector);
  const byPro = useSelector(filterByProSelector);

  const unqiueNadesForPosition = useMemo(() => {
    const unqiueNades: NadeLight[] = [];

    if (!nades) {
      return unqiueNades;
    }

    let filteredNades = [...nades];

    filteredNades = addFavoriteToNades(filteredNades, favoritedNades);
    filteredNades = filterByType(filteredNades, byType);
    filteredNades = filterByTickrate(filteredNades, byTickrate);
    filteredNades = filterByFavorite(filteredNades, byFavorites);
    filteredNades = filterByPro(filteredNades, byPro);

    for (const nade of filteredNades) {
      if (nade.mapEndCoord && nade.type) {
        if (!containsSimilarNade(nade, unqiueNades)) {
          unqiueNades.push(nade);
        }
      }
    }
    return unqiueNades;
  }, [nades, byType, byTickrate, byFavorites, favoritedNades, byPro]);

  return unqiueNadesForPosition;
};
