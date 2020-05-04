import { FC } from "react";
import { SortingMethodSelector } from "../SortingMethodSelector";
import { TypeFilter } from "./TypeFilter";
import { TickrateSelector } from "./TickrateSelector";
import { FavFilterButton } from "./FavFilterButton";
import { MapViewSelector } from "./MapViewSelectors";
import { ResetFilterButton } from "./ResetFilterButton";
import { Dimensions } from "../../constants/Constants";
import { useSetMapView } from "../../store/MapStore/hooks/useSetMapView";
import { useIsSignedIn } from "../../store/AuthStore/AuthHooks";

type Props = {};

export const FilterBar: FC<Props> = ({}) => {
  const isSignedIn = useIsSignedIn();
  const { mapView } = useSetMapView();

  if (mapView === "overview") {
    return null;
  }

  return (
    <>
      <div id="filters">
        {mapView === "list" && (
          <div id="filter-sort">
            <SortingMethodSelector />
          </div>
        )}

        <div id="filter-type">
          <TypeFilter />
        </div>
        <div id="filter-tick">
          <TickrateSelector />
        </div>
        {isSignedIn && (
          <div id="filter-fav">
            <FavFilterButton
              showSingInWarning={() => {
                //no-op
              }}
            />
          </div>
        )}

        <div id="view-selector">
          <MapViewSelector />
        </div>
        <div id="filter-reset">
          <ResetFilterButton />
        </div>
      </div>
      <style jsx>{`
        #filters {
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
          display: grid;
          grid-template-columns:
            min-content
            min-content
            min-content
            1fr
            min-content
            min-content;
          grid-template-areas: "typefilter tickfilter favfilter resetfilter sortfilter viewselector";
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
          grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
          height: 70px;
        }

        #view-selector {
          grid-area: viewselector;
        }

        #filter-reset {
          grid-area: resetfilter;
        }

        #filter-map {
          grid-area: mapfilter;
        }

        #filter-sort {
          grid-area: sortfilter;
        }

        #filter-type {
          grid-area: typefilter;
        }

        #filter-tick {
          grid-area: tickfilter;
        }

        #filter-fav {
          grid-area: favfilter;
        }

        @media only screen and (max-width: 600px) {
          #view-selector {
            display: none;
          }

          #filters {
            margin-bottom: ${Dimensions.GUTTER_SIZE}px;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-areas:
              "typefilter tickfilter favfilter "
              "sortfilter sortfilter  resetfilter";
            grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
            grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
            height: auto;
          }
        }
      `}</style>
    </>
  );
};
