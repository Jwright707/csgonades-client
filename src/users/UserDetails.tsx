import { FC } from "react";
import { Dimensions } from "../constants/Constants";
import { formatDate } from "../models/DateFormater";
import { User } from "../models/User";
import { useIsAllowedUserEdit } from "../store/AuthStore/AuthHooks";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { capitalize } from "../utils/Common";
import { dateFromNow } from "../utils/DateUtils";
import { UserEditorModal } from "./UserEditor/UserEditorModal";

type Props = {
  user: User;
};

export const UserDetails: FC<Props> = ({ user }) => {
  const { colors } = useTheme();
  const allowEdit = useIsAllowedUserEdit(user);

  return (
    <>
      <div className="user-details">
        <h1>
          <img src={user.avatar || ""} alt={`avatar for ${user.nickname}`} />{" "}
          <a
            href={`https://steamcommunity.com/profiles/${user.steamId}`}
            rel="noopener noreferrer nofollow"
            target="_blank"
          >
            {user.nickname}
          </a>
        </h1>

        {user.role !== "user" && (
          <span className="user-role-badge">{capitalize(user.role)}</span>
        )}

        <div className="member-since">
          <span>Member since</span> {formatDate(user.createdAt)}
        </div>

        {allowEdit && user.lastActive && (
          <div className="member-since">
            <span>Last active</span> {dateFromNow(user.lastActive)}
          </div>
        )}

        <UserEditorModal user={user} />

        {!!user.bio && <div className="bio">{user.bio}</div>}
      </div>
      <style jsx>{`
        .user-details {
          position: relative;
          background: ${colors.DP01};
          margin-right: 18px;
          padding: 12px;
          width: 400px;
          border: 1px solid ${colors.BORDER};
          align-self: flex-start;
          border-radius: ${Dimensions.BORDER_RADIUS};
          margin-bottom: ${Dimensions.GUTTER_SIZE};
        }

        .user-details a {
          color: ${colors.TEXT};
        }

        .user-details h1 {
          display: flex;
          align-items: center;
          font-size: 1.2em;
          color: ${colors.TEXT};
        }

        .user-details img {
          border-radius: 50%;
          width: 30px;
          margin-right: 12px;
        }

        .member-since {
          margin-bottom: 12px;
          color: ${colors.TEXT};
        }

        .member-since span {
          font-weight: normal;
          margin-right: 6px;
        }

        .bio {
          margin-bottom: 12px;
        }

        .user-role-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: ${colors.PRIMARY};
          color: white;
          font-size: 0.8em;
          padding: 3px 6px;
          border-radius: ${Dimensions.BORDER_RADIUS};
        }
      `}</style>
    </>
  );
};
