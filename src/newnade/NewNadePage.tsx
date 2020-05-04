import { FC, useState } from "react";
import { Message, Step } from "semantic-ui-react";
import { NadeApi } from "../api/NadeApi";
import { GfycatData } from "../models/Nade/GfycatData";
import { NadeBody } from "../models/Nade/Nade";
import { useGetOrUpdateToken } from "../store/AuthStore/hooks/useGetToken";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { redirectNadePage } from "../utils/Common";
import { AddGfycat } from "./AddGfycat";
import { AddImage } from "./AddImage";
import { PageCentralize } from "../common/PageCentralize";

type NewNadeStep = "gfycat" | "result-img";

export const NewNadePage: FC = () => {
  const getToken = useGetOrUpdateToken();
  const [currentStep, setCurrentStep] = useState<NewNadeStep>("gfycat");
  const { colors } = useTheme();
  const [gfyData, setGfyData] = useState<GfycatData | null>(null);
  const [error, setError] = useState<string | null>(null);

  function onGfycatAdded(gfyData: GfycatData) {
    setGfyData(gfyData);
    setCurrentStep("result-img");
  }

  async function onAddImage(imageData: string) {
    const token = await getToken();
    if (!token) {
      setError("You need to be signed in to add a nade");
      return;
    }

    if (!gfyData) {
      setError("Missing gfycat video, you forgot a step.");
      return;
    }

    const nadeBody: NadeBody = {
      imageBase64: imageData,
      gfycatIdOrUrl: gfyData.gfyId,
    };

    const result = await NadeApi.save(nadeBody, token);

    if (result.isErr()) {
      setError("Failed to submit, try again or the service might be down.");
      return;
    }

    const { id } = result.value;

    redirectNadePage(id);
  }

  function onGfyStepClick() {
    setCurrentStep("gfycat");
  }

  function onImgStepClick() {
    setCurrentStep("result-img");
  }

  return (
    <>
      <PageCentralize>
        <div className="nade-new-container">
          <Step.Group>
            <Step
              active={currentStep === "gfycat"}
              icon="video"
              link
              title="Video"
              description="Add gfycat video"
              onClick={onGfyStepClick}
            />
            <Step
              active={currentStep === "result-img"}
              icon="image"
              link
              title="Screenshot"
              description="Add a image of the resulting nade"
              onClick={onImgStepClick}
            />
          </Step.Group>

          {error && (
            <Message negative>
              <Message.Header>Error</Message.Header>
              <p>{error}</p>
            </Message>
          )}

          <div className="new-nade-step">
            {currentStep === "gfycat" && (
              <AddGfycat
                addGfycat={onGfycatAdded}
                onError={(e) => setError(e)}
                clearError={() => setError(null)}
              />
            )}
            {currentStep === "result-img" && (
              <AddImage onAddImage={onAddImage} />
            )}
          </div>
        </div>
      </PageCentralize>

      <style jsx>
        {`
          .nade-new-container {
            grid-area: main;
            margin-top: 30px;
            margin-bottom: 100px;
          }

          .new-nade-step {
            border: 1px solid ${colors.BORDER};
            background: ${colors.DP01};
            border-radius: 4px;
            padding: 12px;
          }
        `}
      </style>
    </>
  );
};
