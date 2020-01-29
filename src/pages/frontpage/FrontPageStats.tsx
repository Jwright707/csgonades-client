import { FC } from "react";
import { useSiteStats } from "../../store/GlobalStore/GlobalHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

const FrontPageStats: FC = () => {
  const { colors } = useTheme();
  const { stats } = useSiteStats();

  return (
    <>
      <div id="stats">
        <div id="stats-container">
          <div className="stat">
            <div className="stat-number">{stats.numNades}</div>
            <div className="stat-label">NADES</div>
          </div>
        </div>
      </div>
      <style jsx>{`
        #stats {
          padding: 16px;
          background: ${colors.DP01};
          display: flex;
          justify-content: space-around;
          color: ${colors.TEXT};
        }

        #stats-container {
          display: flex;
          align-items: center;
        }

        .stat {
          display: inline-block;
        }

        .stat-number {
          font-weight: normal;
          text-align: center;
          font-size: 1.3em;
          margin-bottom: 3px;
        }
      `}</style>
    </>
  );
};

export { FrontPageStats };
