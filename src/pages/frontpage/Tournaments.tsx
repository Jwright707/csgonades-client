import { FC, useEffect } from "react";
import { useTournaments } from "../../store/TournamentStore/TournamentHooks";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { TournamentList } from "./TournamentList";

export const TournamentsContainer: FC = () => {
  const { uiDimensions } = useTheme();
  const { tournaments, fetchTournaments } = useTournaments();

  useEffect(() => {
    fetchTournaments();
  }, []);

  return (
    <>
      <div className="tournaments">
        <TournamentList tournaments={tournaments} />
      </div>
      <style jsx>{`
        .tournaments {
          margin: ${uiDimensions.OUTER_GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};