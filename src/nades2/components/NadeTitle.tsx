import { FC, useMemo } from "react";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { NadeType } from "../../models/Nade/NadeType";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { capitalize } from "../../utils/Common";
import { EditButton } from "./EditButton";

type Props = {
  title: string;
  type?: NadeType;
  map?: CsgoMap;
  onEditNade: () => void;
  allowEdit: boolean;
};

export const NadeTitle: FC<Props> = ({
  title,
  map,
  type,
  onEditNade,
  allowEdit,
}) => {
  const { colors } = useTheme();

  const nadeTitle = useMemo(() => {
    const titleBuilder = [];

    if (map) {
      titleBuilder.push(capitalize(map));
    }

    if (type) {
      titleBuilder.push(type);
      titleBuilder.push("for");
    }

    if (title.length) {
      titleBuilder.push(title);
    }

    if (titleBuilder.length === 0) {
      return "No title";
    }

    return titleBuilder.join(" ");
  }, [title, map, type]);

  return (
    <>
      <div className="center-title">
        <EditButton onClick={onEditNade} allowEdit={allowEdit}>
          <h1>{nadeTitle}</h1>
        </EditButton>
      </div>

      <style jsx>{`
        .center-title {
          display: flex;
          justify-content: space-around;
        }

        h1 {
          text-align: center;
          font-size: 30px;
          margin: 0;
          padding: 0;
          margin-bottom: 30px;
          font-weight: 300;
          color: ${colors.TEXT};
          display: inline-block;
        }
      `}</style>
    </>
  );
};