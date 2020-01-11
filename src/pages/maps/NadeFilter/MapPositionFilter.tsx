import { FC, useState } from "react";
import { Icon } from "semantic-ui-react";
import { MapPositionSelector } from "./MapPositionSelector";
import { CsgoMap } from "../../../models/Nade/CsGoMap";
import { MapCoordinates } from "../../../models/Nade/Nade";
import { useNadeFilter } from "../../../store/NadeStore/NadeHooks";
import { useTheme } from "../../../store/LayoutStore/LayoutHooks";

type Props = {
  map: CsgoMap;
};

export const MapPositionFilter: FC<Props> = ({ map }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { filterByMapCoords, coords } = useNadeFilter();
  const { colors } = useTheme();

  const onSelect = (coords: MapCoordinates) => {
    setIsOpen(false);
    filterByMapCoords(coords);
  };

  function onDismiss() {
    setIsOpen(false);
  }

  function onOpen() {
    setIsOpen(true);
  }

  const hasCoordsSelected = !!coords;

  const className = hasCoordsSelected
    ? "nade-position-filter active"
    : "nade-position-filter";

  return (
    <>
      <div className={className} onClick={onOpen}>
        <div className={"position-filter"}>
          <span>POSITION</span>
          <Icon name="location arrow" />
        </div>
      </div>
      {isOpen && (
        <MapPositionSelector
          map={map}
          onClick={onSelect}
          onDismiss={onDismiss}
        />
      )}
      <style jsx>{`
        .nade-position-filter {
          background: #e0e1e2;
          border-bottom-left-radius: 3px;
          border-bottom-right-radius: 3px;
          margin-right: 6px;
          transition: background 0.2s;
        }

        .nade-position-filter:hover {
          background: #c0c1c2;
        }

        .position-filter {
          padding: 12px;
          cursor: pointer;
        }
        .position-filter span {
          margin-right: 6px;
        }

        .active {
          background: #c0c1c2;
        }
      `}</style>
    </>
  );
};