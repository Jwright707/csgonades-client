import { FC } from "react";
import { useSetMapView } from "../../store/MapStore/hooks/useSetMapView";
import { FaMap, FaListUl } from "react-icons/fa";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {
  vertical?: boolean;
};

export const MapViewSelector: FC<Props> = ({ vertical }) => {
  const { colors } = useTheme();
  const { mapView, setMapView } = useSetMapView();

  return (
    <>
      <div className="view-selector">
        <div className="label">VIEW</div>
        <div className="view-selector-btns">
          <button
            className={
              mapView === "overview" ? "selector selected" : "selector"
            }
            onClick={() => setMapView("overview")}
          >
            <FaMap />
          </button>
          <button
            className={mapView === "list" ? "selector selected" : "selector"}
            onClick={() => setMapView("list")}
          >
            <FaListUl />
          </button>
        </div>
      </div>
      <style jsx>{`
        .label {
          font-size: 12px;
          font-weight: 500;
          margin-bottom: 5px;
          color: ${vertical ? "white" : colors.TEXT};
        }

        .view-selector-btns {
          display: flex;
          flex-direction: ${vertical ? "column" : "row"};
          background: ${colors.filterBg};
          overflow: hidden;
          border-radius: 5px;
        }

        .selector {
          border: none;
          outline: none;
          background: ${colors.filterBg};
          width: ${Dimensions.BUTTON_HEIGHT}px;
          height: ${Dimensions.BUTTON_HEIGHT}px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          color: white;
          font-size: ${Dimensions.BUTTON_HEIGHT / 2}px;
          cursor: pointer;
          overflow: hidden;
          border-right: 1px solid rgba(0, 0, 0, 0.3);
          transition: background 0.1s;
        }

        .selector:last-child {
          border-right: none;
        }

        .view-selector button:hover {
          background: ${colors.filterBgHover};
        }

        .selected {
          background: ${colors.filterBgHover};
        }
      `}</style>
    </>
  );
};
