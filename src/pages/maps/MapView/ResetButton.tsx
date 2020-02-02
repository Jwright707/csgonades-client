import { FC } from "react";
import { FaUndo } from "react-icons/fa";
import { Popup } from "semantic-ui-react";
import { CsgoMap } from "../../../models/Nade/CsGoMap";
import { useIsAdmin } from "../../../store/AuthStore/AuthHooks";
import { useNadeFilter } from "../../../store/NadeStore/NadeHooks";
import { useTheme } from "../../../store/SettingsStore/SettingsHooks";
import { GoogleAnalytics } from "../../../utils/GoogleAnalytics";

type Props = {
  map: CsgoMap;
};

export const ResetButton: FC<Props> = ({ map }) => {
  const isAdmin = useIsAdmin();
  const { colors } = useTheme();
  const { reset, canReset } = useNadeFilter(map);

  function onReset() {
    if (canReset) {
      GoogleAnalytics.event({
        category: "Nade filter",
        action: "Reset",
        ignore: isAdmin
      });
      reset();
    }
  }

  const className = canReset ? "reset" : "reset disabled";

  return (
    <>
      <Popup
        content="Reset filter"
        hoverable
        position="right center"
        inverted
        mouseEnterDelay={500}
        openOnTriggerClick={false}
        size="tiny"
        trigger={
          <div className={className} onClick={onReset}>
            <FaUndo />
          </div>
        }
      />

      <style jsx>{`
        .reset {
          display: flex;
          align-items: center;
          justify-content: space-around;
          background: red;
          height: 45px;
          width: 45px;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          cursor: pointer;
          color: white;
          transition: all 0.2s;
          margin-top: 12px;
          padding-right: 2px;
          background: ${colors.filterResetBg};
        }

        .disabled {
          background: ${colors.filterResetDisabledBg};
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
};
