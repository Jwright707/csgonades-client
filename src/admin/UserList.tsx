import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { useAdminUsers } from "../store2/AdminStore/hooks";
import { prettyDateTime } from "../utils/DateUtils";

const USER_LIMIT = 15;

export const UserList: FC = () => {
  const { colors } = useTheme();
  const [page] = useState(1);
  const [sortByActivity, setSortByActivity] = useState(false);
  const { users, fetchUsers } = useAdminUsers();

  useEffect(() => {
    fetchUsers(page, USER_LIMIT, sortByActivity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sortByActivity]);

  return (
    <>
      <div className="user-list">
        <button onClick={() => setSortByActivity(false)}>By created at</button>
        <button onClick={() => setSortByActivity(true)}>By last active</button>
        <table id="users">
          <thead>
            <tr>
              <td></td>
              <td>Nickname</td>
              <td>Last active</td>
              <td>Created at</td>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.steamId}>
                <td className="avatar">
                  <img src={user.avatar} />
                </td>
                <td className="nickname">
                  <Link
                    href={`/users/[user]`}
                    as={`/users/${user.steamId}`}
                    key={user.steamId}
                  >
                    <a>{user.nickname}</a>
                  </Link>
                </td>
                <td className="last-active">
                  {prettyDateTime(user.lastActive)}
                </td>
                <td className="created-at">{prettyDateTime(user.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .user-list {
          border: 1px solid ${colors.BORDER};
          border-radius: 5px;
          overflow: hidden;
        }

        #users {
          width: 100%;
          border-collapse: collapse;
        }

        thead td {
          font-weight: normal;
        }

        tr {
          border-bottom: 1px solid ${colors.BORDER};
        }

        td {
          padding: 12px;
          vertical-align: center;
        }

        .avatar {
          width: 50px;
        }

        .avatar img {
          width: 100%;
          border-radius: 50%;
          display: block;
        }

        .nickname {
        }

        .nickname a {
          color: ${colors.TEXT};
        }

        .nickname a:hover {
          text-decoration: underline;
        }

        .last-active {
          width: 80px;
          white-space: nowrap;
        }

        .created-at {
          width: 80px;
          white-space: nowrap;
        }
      `}</style>
    </>
  );
};
