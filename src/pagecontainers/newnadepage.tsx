import { FC, useState } from "react";
import { Layout } from "../components/layout/layout";
import { Button, Segment, Grid, Divider } from "semantic-ui-react";
import { NewNadeGfycat } from "../components/newnade/NewNadeGfycat";
import { NewNadeImage } from "../components/newnade/NewNadeImage";
import { NadeBody } from "../models/Nade";
import { useSelector } from "react-redux";
import { tokenSelector } from "../store/AuthStore/AuthSelectors";
import { NadeApi } from "../api/NadeApi";
import Router from "next/router";
import { GoogleAnalytics } from "../utils/GoogleAnalytics";

const NewNadePage: FC = () => {
  const accessToken = useSelector(tokenSelector);
  const [gfyId, setGfyId] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  const cantSumbit = !gfyId || !imageBase64;

  function onSetImageBase64(base64image: string) {
    GoogleAnalytics.event("New Nade", "Set image");
    setImageBase64(base64image);
  }

  function onSetGfycat(gfyId: string) {
    GoogleAnalytics.event("New Nade", "Set gfycat");
    setGfyId(gfyId);
  }

  async function onSumbitNade() {
    if (!gfyId || !imageBase64) {
      console.warn("Tried to submit with no gfyid or image");
      return;
    }

    const nadeBody: NadeBody = {
      gfycatIdOrUrl: gfyId,
      imageBase64: imageBase64
    };

    const nade = await NadeApi.save(nadeBody, accessToken);
    GoogleAnalytics.event("New Nade", "Submit");

    if (nade) {
      Router.push(`/nade/${nade.id}`);
    }
  }

  return (
    <Layout>
      <div className="nade-new-container">
        <h2>Add new nade</h2>
        <Segment placeholder>
          <Grid columns={2} stackable textAlign="center">
            <Divider vertical>And</Divider>

            <Grid.Row verticalAlign="middle">
              <Grid.Column>
                <NewNadeGfycat onSetGfycat={onSetGfycat} />
              </Grid.Column>

              <Grid.Column>
                <NewNadeImage onSetImageBase64={onSetImageBase64} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Button disabled={cantSumbit} color="green" onClick={onSumbitNade}>
          Submit
        </Button>
      </div>

      <style jsx>
        {`
          .nade-new-container {
            margin: 18px;
          }
        `}
      </style>
    </Layout>
  );
};

export { NewNadePage };
