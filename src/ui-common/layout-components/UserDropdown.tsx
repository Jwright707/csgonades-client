import Router from "next/router";
import { FC } from "react";
import { Dropdown } from "semantic-ui-react";
import { User } from "../../models/User";
import {
  useIsAdminOrModerator,
  useSignOut
} from "../../store/AuthStore/AuthHooks";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { redirectUserPage } from "../../utils/Common";

type Props = {
  user: User;
};

export const UserDropdown: FC<Props> = ({ user }) => {
  const { layers } = useTheme();
  const isAdminOrMod = useIsAdminOrModerator();
  const signOut = useSignOut();
  function onProfileClick() {
    redirectUserPage(user.steamId);
  }

  function onFavoritesClick() {
    Router.push(`/favorites`);
  }

  function onAdminClick() {
    Router.push(`/admin`);
  }

  return (
    <>
      <span className="user-nav-user">
        {user.avatar && (
          <img
            className="user-avatar"
            src={user.avatar}
            alt={`avatar for ${user.nickname}`}
          />
        )}
        <Dropdown className="dropdown" text={user.nickname}>
          <Dropdown.Menu direction="left">
            <Dropdown.Item
              text="Profile"
              icon="user"
              onClick={onProfileClick}
            />
            <Dropdown.Item
              text="Favorites"
              icon="star"
              onClick={onFavoritesClick}
            />
            {isAdminOrMod && (
              <Dropdown.Item text="Admin" icon="spy" onClick={onAdminClick} />
            )}
            <Dropdown.Divider />
            <Dropdown.Item
              text="Sign out"
              icon="sign out alternate"
              onClick={signOut}
            />
          </Dropdown.Menu>
        </Dropdown>
      </span>
      <style jsx>{`
        .user-nav-user {
          display: flex;
          align-self: center;
        }

        .user-avatar {
          align-self: center;
          width: 20px;
          border-radius: 50%;
          margin-right: 6px;
        }
      `}</style>
    </>
  );
};