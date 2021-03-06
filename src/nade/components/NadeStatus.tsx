import { FC, memo } from "react";
import { Dimensions } from "../../constants/Constants";
import { StatusInfo } from "../models/Nade";
import { Status } from "../models/Status";
import { useTheme } from "../../core/settings/SettingsHooks";
import { ThemeColors } from "../../core/settings/Themes";

type Props = {
  status: Status;
  statusInfo?: StatusInfo;
};

const NadeStatus: FC<Props> = memo(({ status }) => {
  const { colors } = useTheme();

  if (status === "accepted") {
    return null;
  }

  function statusText() {
    switch (status) {
      case "pending":
        return (
          <>
            <div className="pending">Waiting for approval</div>
            <style jsx>{`
              .pending {
                font-size: 14px;
                font-weight: 500;
                text-transform: uppercase;
              }
            `}</style>
          </>
        );
      case "declined":
        return (
          <>
            <div className="declined">
              Declined! Read comment and do the changes to get it approved.
            </div>
            <style jsx>{`
              .declined {
                font-size: 14px;
                font-weight: 500;
                text-transform: uppercase;
              }
            `}</style>
          </>
        );
      case "deleted":
        return (
          <>
            <div className="deleted">
              Deleted, will be removed permanently at a later point
            </div>
            <style jsx>{`
              .declined {
                font-size: 14px;
                font-weight: 500;
                text-transform: uppercase;
              }
            `}</style>
          </>
        );
      default:
        return <></>;
    }
  }

  const statusColors = statusColor(status, colors);

  return (
    <>
      <div className="status-container">{statusText()}</div>
      <style jsx>{`
        .status-container {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: ${statusColors.background};
          border: 1px solid ${statusColors.border};
          padding: 10px 20px;
          color: ${statusColors.text};
          border-top-left-radius: ${Dimensions.BORDER_RADIUS};
          border-top-right-radius: ${Dimensions.BORDER_RADIUS};
          z-index: 999;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  );
});

function statusColor(status: Status, colors: ThemeColors) {
  switch (status) {
    case "accepted":
      return {
        border: colors.BORDER,
        background: "#00f064",
        text: "white",
      };
    case "pending":
      return {
        border: colors.BORDER,
        background: "#f09800",
        text: "white",
      };
    case "declined":
      return {
        border: colors.BORDER,
        background: "#bf0000",
        text: "white",
      };
    case "deleted":
      return {
        border: colors.BORDER,
        background: "#bf0000",
        text: "white",
      };
    default:
      return {
        border: colors.BORDER,
        background: "white",
        text: "#222",
      };
  }
}

export default NadeStatus;
