import { FC, useState, useEffect } from "react";
import { useIsSignedIn } from "../../core/authentication/useIsSignedIn";
import { useIsFavoriteInProgress } from "../data/hooks/useIsFavoriteInProgress";
import { useIsFavorited } from "../data/hooks/useIsFavorited";
import { useAddFavorite } from "../data/hooks/useAddFavorite";
import { useUnfavorite } from "../data/hooks/useUnFavorite";
import { Popup } from "semantic-ui-react";
import { FaStar } from "react-icons/fa";
import { useSignInWarning } from "../../core/global/hooks/useSignInWarning";
import { useDisplayToast } from "../../core/toasts/hooks/useDisplayToast";

type Props = {
  disableAction?: boolean;
  nadeId: string;
  slug?: string;
};

export const ThumbnailFavoriteButton: FC<Props> = ({
  nadeId,
  disableAction,
}) => {
  const displayToast = useDisplayToast();
  const [nadeIsFavorite, setNadeIsFavorite] = useState(false);
  const { setSignInWarning } = useSignInWarning();
  const isSignedIn = useIsSignedIn();
  const isFavoriteInProgress = useIsFavoriteInProgress();
  const isFavorite = useIsFavorited(nadeId);
  const addFavorite = useAddFavorite();
  const unFavorite = useUnfavorite();

  useEffect(() => {
    if (isFavorite) {
      setNadeIsFavorite(true);
    }
  }, [isFavorite]);

  function onFavorite(e: any) {
    e.stopPropagation();
    e.preventDefault();
    if (!isSignedIn) {
      setSignInWarning("favorite");
      return;
    }

    if (isFavoriteInProgress) {
      return displayToast({
        severity: "warning",
        message:
          "Allready trying to favorite nade, please wait or refresh the page.",
      });
    }
    if (isFavorite) {
      setNadeIsFavorite(false);
      unFavorite(isFavorite.id);
    } else {
      setNadeIsFavorite(true);
      addFavorite(nadeId);
    }
  }

  const favoriteText = nadeIsFavorite ? "Unfavorite" : "Favorite";
  const iconColor = nadeIsFavorite ? "rgb(250, 200, 0)" : "white";

  return (
    <>
      {!disableAction && (
        <Popup
          inverted
          openOnTriggerClick={false}
          trigger={
            <div className="fav-btn" onClick={onFavorite}>
              <FaStar className="icon-fix-yo" />
            </div>
          }
          size="mini"
          position="left center"
          content={favoriteText}
        ></Popup>
      )}

      <style jsx global>{`
        .icon-fix-yo {
          font-size: 18px;
          line-height: 18px;
          margin: 0;
          padding: 0;
          position: relative;
        }
      `}</style>

      <style jsx>{`
        .fav-btn {
          align-items: center;
          background: rgba(0, 0, 0, 0.8);
          border-radius: 5px;
          color: ${iconColor};
          display: flex;
          height: 36px;
          justify-content: center;
          width: 36px;
        }

        .fav-btn:hover {
          background: rgba(0, 0, 0, 1);
          color: rgb(250, 200, 0);
        }

        .spin {
          animation: spin 0.5s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};
