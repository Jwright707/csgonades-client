import { FC, useEffect, useState } from "react";
import { NadeApi } from "../api/NadeApi";
import { NadeLight } from "../models/Nade/Nade";
import { User } from "../models/User";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { UserDetails } from "./UserDetails";
import { CsgnList } from "../common/list/CsgnList";
import { NadeItemMobile } from "../common/nadeitem/NadeItemMobile";
import { isMobileOnly } from "react-device-detect";
import { NadeItem } from "../common/nadeitem/NadeItem";

type Props = {
  user: User;
};

export const UserUI: FC<Props> = ({ user }) => {
  const [nades, setNades] = useState<NadeLight[]>([]);

  const { colors } = useTheme();

  useEffect(() => {
    NadeApi.byUser(user.steamId).then((res) => {
      if (res.isOk()) {
        setNades(res.value);
      }
    });
  }, []);

  function renderItem(item: NadeLight) {
    if (isMobileOnly) {
      return <NadeItemMobile nade={item} />;
    } else {
      return <NadeItem nade={item} />;
    }
  }

  function keyExtractor(item: NadeLight) {
    return item.id;
  }

  return (
    <>
      <div className="user-container">
        <div className="user-details">
          <UserDetails user={user} />
        </div>
        <div className="user-nades">
          <h2>Nades by {user.nickname}</h2>
          <CsgnList<NadeLight>
            data={nades}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
          />
        </div>
      </div>
      <style jsx>{`
        .user-container {
          grid-area: main;
          position: relative;
          margin: 30px;
          margin-bottom: 100px;
          display: flex;
          flex-direction: column;
          min-height: 60vh;
        }

        .user-details {
          display: block;
          margin-bottom: 30px;
        }

        .user-nades {
          flex: 1;
        }

        .user-nades h2 {
          font-weight: 300;
          color: ${colors.TEXT};
        }
      `}</style>
    </>
  );
};
