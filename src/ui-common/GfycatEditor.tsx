import { FC, useState, ChangeEvent } from "react";
import { useIsLoadingNade } from "../store/NadeStore/NadeSelectors";
import { Dimmer, Loader, Button, Input, Message } from "semantic-ui-react";
import { NadeApi } from "../api/NadeApi";
import { useUpdateNadeAction } from "../store/NadeStore/NadeActions";
import { Nade } from "../models/Nade";

type Props = {
  nade: Nade;
  onCancel: () => void;
};

export const GfycatEditor: FC<Props> = ({ nade, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentGfyID, updateGfyID] = useState(nade.gfycat.gfyId);
  const updateNade = useUpdateNadeAction();

  function onGfyIDChange(event: ChangeEvent<HTMLInputElement>) {
    updateGfyID(event.target.value);
  }

  async function saveGfycat() {
    setIsLoading(true);
    const result = await NadeApi.validateGfycat(currentGfyID);

    if (result.isErr()) {
      setIsLoading(false);
      setError("Can't find the provided gfycat.");
      updateGfyID(nade.gfycat.gfyId);
      return;
    }

    updateNade(nade.id, {
      gfycatIdOrUrl: currentGfyID
    });
    setIsLoading(false);
    setError(null);
    onCancel();
  }

  return (
    <>
      <div className="gfycat-editor">
        <div className="gfycat-editor-fields">
          <Input
            fluid
            loading={isLoading}
            placeholder="Gfycat ID or URL..."
            onChange={onGfyIDChange}
            value={currentGfyID}
            error={!!error}
          />

          <div className="gfycat-editor-buttons">
            <Button fluid onClick={onCancel} disabled={isLoading}>
              CANCEL
            </Button>
            <Button fluid positive onClick={saveGfycat} disabled={isLoading}>
              SAVE
            </Button>
          </div>
          {error && (
            <Message negative>
              <Message.Header>Error</Message.Header>
              <p>{error}</p>
            </Message>
          )}
        </div>
      </div>
      <style jsx>{`
        .gfycat-editor {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          display: flex;
          justify-content: center;
          background: rgba(255, 255, 255, 0.9);
        }

        .gfycat-editor-fields {
          align-self: center;
          width: 50%;
          background: white;
          border-radius: 3px;
          padding: 12px;
        }

        .gfycat-editor-buttons {
          margin-top: 12px;
          display: flex;
        }
      `}</style>
    </>
  );
};
