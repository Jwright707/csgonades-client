import { FC, useRef, useState } from "react";
import { useSetMapView } from "../store/MapStore/hooks/useSetMapView";
import { Dimensions } from "../constants/Constants";
import { useNadesForMapView } from "../store/MapStore/hooks/useNadesForMapView";
import { NadeLight } from "../models/Nade/Nade";
import { MapPosIcon } from "./mapview2/MapPosIcon";
import { CsgoMap } from "../models/Nade/CsGoMap";
import { filterByCoords } from "../store/MapStore/hooks/helpers";
import { MapViewSuggested } from "./MapViewSuggested";
import { useFilterServerSideNades } from "../store/MapStore/hooks/useFilteredNades";
import { TypeFilter } from "./nadefilter/TypeFilter";
import { MapViewSelector } from "./nadefilter/MapViewSelectors";
import { TickrateSelector } from "./nadefilter/TickrateSelector";
import { FavFilterButton } from "./nadefilter/FavFilterButton";
import { useIsSignedIn } from "../store/AuthStore/AuthHooks";
import { ResetFilterButton } from "./nadefilter/ResetFilterButton";

type Props = {
  map: CsgoMap;
  allNades: NadeLight[];
};

export const MapViewScreen: FC<Props> = ({ allNades, map }) => {
  const filteredNades = useFilterServerSideNades(allNades);
  const { mapView } = useSetMapView();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [suggestedNades, setSuggestedNades] = useState<NadeLight[] | null>(
    null
  );
  const [mapWidth, setMapWidth] = useState(0);
  const isSignedIn = useIsSignedIn();
  const nades = useNadesForMapView(allNades);
  const mapViewRef = useRef<HTMLDivElement>(null);

  function onMapViewImageLoaded() {
    if (mapViewRef.current) {
      setMapWidth(mapViewRef.current.offsetHeight);
      setMapLoaded(true);
    }
  }

  function onNadeClick(pos: { x: number; y: number }) {
    const suggested = filterByCoords(filteredNades, pos);
    setSuggestedNades(suggested);
  }

  if (mapView === "list") {
    return null;
  }

  return (
    <>
      <MapViewSuggested
        onDismiss={() => setSuggestedNades(null)}
        nades={suggestedNades}
      />
      <div id="mapview-wrap">
        <div id="mapview-filters">
          <div className="space-below">
            <TypeFilter vertical />
          </div>

          <div className="space-below">
            <TickrateSelector vertical />
          </div>
          {isSignedIn && (
            <div className="space-below">
              <FavFilterButton
                vertical
                showSingInWarning={() => {
                  //no-op
                }}
              />
            </div>
          )}

          <div className="space-below">
            <ResetFilterButton vertical />
          </div>
        </div>

        <div id="view-selector">
          <MapViewSelector vertical />
        </div>

        <div id="mapview-screen">
          <div id="mapview" ref={mapViewRef}>
            <img
              src={`/mapsoverlays/${map}.jpg`}
              onLoad={onMapViewImageLoaded}
            />
            {mapLoaded &&
              nades.map((n) => (
                <MapPosIcon
                  key={n.id}
                  nade={n}
                  mapWidth={mapWidth}
                  onPress={onNadeClick}
                />
              ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        #mapview-wrap {
          display: grid;
          grid-template-columns: min-content 1fr min-content;
          grid-template-areas:
            "mpfilter mpoverview mpviewselector"
            "mpfilter mpoverview .";
          background: #151515;
          border-radius: 5px;
          padding: ${Dimensions.GUTTER_SIZE}px;
        }

        #mapview-screen {
          justify-self: center;
          grid-area: mpoverview;
          height: calc(
            100vh - ${Dimensions.HEADER_HEIGHT}px - ${Dimensions.NAV_HEIGHT}px -
              ${Dimensions.GUTTER_SIZE * 4}px
          );
          width: calc(
            100vh - ${Dimensions.HEADER_HEIGHT}px - ${Dimensions.NAV_HEIGHT}px -
              ${Dimensions.GUTTER_SIZE * 4}px
          );
        }

        #mapview {
          position: relative;
        }

        #view-selector {
          grid-area: mpviewselector;
        }

        #mapview-filters {
          grid-area: mpfilter;
        }

        #mapview img {
          width: 100%;
          display: block;
        }

        .space-below {
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};
