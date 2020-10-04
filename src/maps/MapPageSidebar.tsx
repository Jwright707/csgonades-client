import { FC } from "react";
import { Dimensions } from "../constants/Constants";
import { DiscordJoinAction } from "../frontpage/DiscordJoinAction";
import { CsgoMap } from "../models/Nade/CsGoMap";
import { NadeLight } from "../models/Nade/Nade";
import { useSetMapView } from "../store/MapStore/hooks/useSetMapView";
import { SidebarAdSticky } from "../common/adunits/SidebarAdSticky";
import { MapPageJumbo } from "./MapPageJumbo";
import { TopContributorList } from "./TopContributor";
import { SidebarSkyskraperAd } from "../common/adunits/SidebarSkyskraper";

type Props = {
  map: CsgoMap;
  nades: NadeLight[];
};

export const MapPageSidebar: FC<Props> = ({ map, nades }) => {
  const { mapView } = useSetMapView();

  return (
    <>
      <>
        {mapView === "list" && (
          <div className="jumbo spacer">
            <MapPageJumbo map={map} nades={nades} />
          </div>
        )}

        <div className="spacer ph">
          <SidebarSkyskraperAd />
        </div>

        <div className="spacer">
          <TopContributorList csMap={map} nades={nades} />
        </div>

        <div className="sticky">
          <div className="spacer">
            <DiscordJoinAction />
          </div>
          <div className="ph">
            <SidebarAdSticky />
          </div>
        </div>
      </>
      <style jsx>{`
        .jumbo {
          margin-top: 100px;
        }

        .sticky {
          position: sticky;
          top: ${Dimensions.NAV_HEIGHT + Dimensions.GUTTER_SIZE}px;
        }

        .spacer {
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        .half-spacer {
          margin-bottom: ${Dimensions.GUTTER_SIZE / 2}px;
        }

        .ph {
        }
      `}</style>
    </>
  );
};
