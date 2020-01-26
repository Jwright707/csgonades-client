import { useRouter } from "next/router";
import { FC } from "react";
import { FaDiscord } from "react-icons/fa";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { MapLink } from "./MapLink";
import { ThemeToggler } from "./ThemeToggler";
export const Navigation: FC = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const currentRoute = router.query.name;

  return (
    <>
      <nav>
        <ul>
          <MapLink mapName="dust2" currentMapPath={currentRoute} />
          <MapLink mapName="mirage" currentMapPath={currentRoute} />
          <MapLink mapName="inferno" currentMapPath={currentRoute} />
          <MapLink mapName="overpass" currentMapPath={currentRoute} />
          <MapLink mapName="train" currentMapPath={currentRoute} />
          <MapLink mapName="cache" currentMapPath={currentRoute} />
          <MapLink mapName="nuke" currentMapPath={currentRoute} />
          <MapLink mapName="vertigo" currentMapPath={currentRoute} />
          <MapLink mapName="cobblestone" currentMapPath={currentRoute} />
        </ul>
        <div>
          <ThemeToggler />
          <ul id="secondary-nav">
            <li>
              <a
                className="discord-link"
                target="_black"
                href="https://discord.gg/010h0KFCBNASyMUKv"
                rel="nofollow"
              >
                <span className="discord-link-text">
                  <FaDiscord style={{ marginRight: 6, fontSize: "1.5em" }} />
                  Join Discord
                </span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <style jsx>{`
        nav {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          width: 100%;
        }

        #secondary-nav {
          padding: 12px;
        }

        .discord-link {
          background: ${colors.primaryBtnBg};
          display: flex;
          justify-content: space-around;
          padding: 12px;
          width: 100%;
          color: white;
          border-radius: 4px;
          transition: background 0.15s;
          font-weight: normal;
        }

        .discord-link:hover {
          background: ${colors.primaryBtnHover};
        }

        .discord-link-text {
          display: flex;
          align-items: center;
        }
      `}</style>
    </>
  );
};
