import { FC, useEffect, useState } from "react";
import { Icon, Popup } from "semantic-ui-react";
import { useIsSignedIn } from "../../store/AuthStore/AuthHooks";
import {
  useAddFavorite,
  useIsFavorited,
  useUnfavorite
} from "../../store/FavoriteStore/FavoriteHooks";

type Props = {
  nadeId: string;
};

export const FavoriteButton: FC<Props> = ({ nadeId }) => {
  const isSignedIn = useIsSignedIn();
  const favorite = useIsFavorited(nadeId);
  const addFavorite = useAddFavorite();
  const unFavorite = useUnfavorite();
  const [starColor, setStarColor] = useState<any>(favorite ? "yellow" : "grey");
  const [didClickFavorite, setDidClickFavorite] = useState(false);

  useEffect(() => {
    if (favorite) {
      setStarColor("yellow");
    } else {
      setStarColor("grey");
    }
  }, [favorite]);

  function onFavoriteClick() {
    setDidClickFavorite(true);

    if (favorite) {
      unFavorite(favorite.id);
    } else {
      addFavorite(nadeId);
      setStarColor("yellow");
    }
  }

  function onMouseEnter() {
    if (favorite) {
      setStarColor("grey");
    } else {
      setStarColor("yellow");
    }
  }

  function onMouseLeave() {
    if (didClickFavorite) {
      setDidClickFavorite(false);
      return;
    }
    if (favorite) {
      setStarColor("yellow");
    } else {
      setStarColor("grey");
    }
  }

  if (!isSignedIn) {
    return (
      <>
        <Popup
          size="mini"
          inverted
          content={"You need to be signed in to favorite."}
          style={{ padding: 6 }}
          offset="0, 6px"
          position="left center"
          trigger={
            <span className="favicon-container">
              <Icon className="favorite-icon" name="star" size="big" />
            </span>
          }
        />
        <style jsx>{`
          .favicon-container {
            color: grey;
            display: flex;
            align-content: center;
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <div
        onClick={onFavoriteClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Popup
          size="mini"
          inverted
          content={favorite ? "Unfavorite" : "Favorite"}
          style={{ padding: 6 }}
          offset="0, 6px"
          position="left center"
          trigger={
            <Icon
              link
              color={starColor}
              className="favorite-icon"
              name="star"
              size="big"
            />
          }
        />
      </div>
    </>
  );
};
