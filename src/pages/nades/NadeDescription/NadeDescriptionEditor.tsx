import { FC, useState } from "react";
import ReactMde, { commands } from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import { Button } from "semantic-ui-react";
import Showdown from "showdown";

type Props = {
  onSave: (description: string) => void;
  onCancel: () => void;
  description: string;
};

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
  simpleLineBreaks: true
});

export const NadeDescriptionEditor: FC<Props> = ({
  description,
  onCancel,
  onSave
}) => {
  const [descValue, setDescValue] = useState(description);
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  function onSaveDescription() {
    onSave(descValue);
  }

  return (
    <>
      <ReactMde
        value={descValue}
        onChange={setDescValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        commands={[
          {
            commands: [
              commands.boldCommand,
              commands.italicCommand,
              commands.linkCommand,
              commands.unorderedListCommand
            ]
          }
        ]}
        generateMarkdownPreview={markdown =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
      <Button onClick={onCancel}>Cancel</Button>
      <Button onClick={onSaveDescription}>Save</Button>
    </>
  );
};
