import { FC } from "react";
import { EzoicPlaceholder } from "../common/adunits/EzoicPlaceholder";
import { Dimensions } from "../constants/Constants";
import { DiscordJoinAction } from "../frontpage/DiscordJoinAction";
import { CsgoMap } from "../models/Nade/CsGoMap";
import { NadeLight } from "../models/Nade/Nade";
import { MapPageJumbo } from "./MapPageJumbo";
import { TopContributorList } from "./TopContributor";

type Props = {
  map: CsgoMap;
  nades: NadeLight[];
};

export const MapPageSidebar: FC<Props> = ({ map, nades }) => {
  return (
    <>
      <>
        <div className="spacer">
          <MapPageJumbo map={map} nades={nades} />
        </div>
        <div className="spacer">
          <DiscordJoinAction />
        </div>
        <div className="spacer ph">
          <EzoicPlaceholder id="188" />
        </div>

        <div className="spacer sticky">
          <TopContributorList csMap={map} nades={nades} />
          <div className="sticky-ph">
            <EzoicPlaceholder id="172" />
          </div>
        </div>
      </>
      <style jsx>{`
        .sticky {
          position: sticky;
          top: ${Dimensions.HEADER_HEIGHT + Dimensions.GUTTER_SIZE * 2.5}px;
        }

        .sticky-ph {
          margin-top: 20px;
        }

        .spacer {
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        .ph {
        }
      `}</style>
    </>
  );
};
