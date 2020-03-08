import { FC } from "react";
import { FaUndo } from "react-icons/fa";
import { useNadeFilter } from "../../store/NadeFilterStore/NadeFilterHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {};

export const ResetFilterButton: FC<Props> = ({}) => {
  const { colors } = useTheme();
  const { isDefault, resetFilter } = useNadeFilter();

  function onReset() {
    if (!isDefault) {
      resetFilter();
    }
  }

  const visible = isDefault ? "" : "visible";

  return (
    <>
      <button className={`filter-btn ${visible}`} onClick={onReset}>
        <FaUndo style={{ marginLeft: -1 }} />
      </button>
      <style jsx>{`
        .filter-btn {
          border: none;
          outline: none;
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          color: #767676;
          font-size: 16px;
          background: rgba(173, 0, 0, 0.7);
          color: white;
          border-radius: 5px;
          opacity: 0;
          transition: all 0.1s;
          box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
        }

        .visible {
          opacity: 1;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};