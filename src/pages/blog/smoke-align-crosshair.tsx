import { FC } from "react";
import { BlogPost } from "../../blog/BlogPost";
import { BlogPostArticle } from "../../blog/BlogPostArticle";
import { BlogCodeSnippet } from "../../blog/BlogCodeSnippet";
import { BlogNadeItem } from "../../blog/BlogNadeItem";
import { CsConsole } from "../../blog/CsConsole";
import { AdUnit } from "../../common/adunits/AdUnit";

export const blogNadeAlignCrosshair: BlogPost = {
  title: "Smoke Lineup Crosshair Bind for CS:GO",
  slug: "smoke-align-crosshair",
  imageUrl: "/blogimg/nade-align-crosshair/align-crosshair.jpg",
  thumbnailUrl: "/blogimg/nade-align-crosshair/align-crosshair_thumb.jpg",
  createdAt: "2020-03-29T20:00:00.000Z",
  updatedAt: "2020-04-23T12:07:00.000Z",
  intro:
    "Create a fullscreen crosshair to line up smokes and other nades. For particular smokes, it can be hard to find something natural to place your crosshair at to hit that perfect smoke. This key bind will help you align those hard nades.",
};

const NadeAlignCrosshairBlogPost: FC = () => {
  return (
    <>
      <BlogPostArticle data={blogNadeAlignCrosshair}>
        <p>To get the result as shown in the image above you can choose;</p>
        <p>
          <b>Simple bind:</b> No need to edit your config file, but you have to
          press the button to enable/disable the crosshair.
        </p>
        <p>
          <b>Custom bind:</b> When you hold down the button, the crosshair is
          big. And when you release it, it goes back to normal. But you will
          have to edit your config file.
        </p>
        <h2>How to set it up</h2>
        <h3>1. Simple: Toggle crosshair</h3>
        <p>
          Open your console and write <code>cl_crosshairsize</code> to get the
          current crosshair size you are using.
        </p>
        <CsConsole
          actions={[
            {
              input: "cl_crosshairsize",
              output: `"cl_crosshairsize" = "2.5" ( def. 5 ) `,
            },
            {
              input: `bind "X" "toggle cl_crosshairsize 2.5 5000"`,
              output: `bind "X" "toggle cl_crosshairsize 2.5 5000"`,
            },
          ]}
        />
        <p>
          As seen above, my crosshair has a size of 2.5, so I set it to toggle
          between 2.5 and 5000.
        </p>
        <p>
          Pressing X will make my crosshair large. Pressing it again will set it
          back to normal.
        </p>
        <BlogCodeSnippet code={'bind "X" "toggle cl_crosshairsize 2.5 5000"'} />

        <AdUnit center tagType="mega-banner" />

        <h3>2. Advanced: Hide on release</h3>
        <p>
          This method will give you the same result, but when you release your
          selected button, the crosshair goes back to normal.
        </p>

        <p>First, get your current settings:</p>
        <CsConsole
          actions={[
            {
              input: "cl_crosshairgap",
              output: `"cl_crosshairgap" = "-1" ( def. 1 ) `,
            },
            {
              input: "cl_crosshairdot",
              output: `"cl_crosshairdot" = "0" ( def. 1 ) `,
            },
            {
              input: "cl_crosshairsize",
              output: `"cl_crosshairsize" = "2.5" ( def. 5 ) `,
            },
          ]}
        />
        <p>
          As we can see, I have a size of 2.5, the gap of -1 and no dot enabled
          for my crosshair.
        </p>

        <p>
          Now for the bind, copy-paste the following into your autoexec.cfg
          file.
        </p>

        <BlogCodeSnippet
          code={
            'bind "X" "+crosshairsmoke"\nalias "-crosshairsmoke" "cl_crosshairsize 2.5;cl_crosshairdot 0;cl_crosshairgap -1"\nalias "+crosshairsmoke" "cl_crosshairsize 1337;cl_crosshairdot 1;cl_crosshairgap 10"\n'
          }
        />

        <p>Change out X with whatever key you prefer.</p>
        <p>
          On the 2nd line, set the values for your crosshair, so it goes back to
          your settings when you release the button.
        </p>

        <p>The result of the command is the following:</p>
        <img
          src="/blogimg/nade-align-crosshair/big_crosshair_example_advanced.jpg"
          alt="Result showing big crosshair"
        />
        <p>
          <em>
            Remember to write <b>exec autoexec</b> in your console to apply the
            new changes you included in your autoexec.cfg file.
          </em>
        </p>
        <p>
          If you prefer not to have the dot, remove the{" "}
          <code>cl_crosshairsize</code> commands from line 2 and 3. And if you
          don&apos;t want the gap to change, remove that as well. It&apos;s up
          to you!
        </p>

        <AdUnit center tagType="mega-bottom" />

        <h2>Example of smoke using the key bind</h2>
        <p>
          On the nade below, you can see the large crosshair used to set up the
          smoke.
        </p>
        <div className="nade-wrap">
          <BlogNadeItem nadeSlug="dust2-smoke-a-cross-from-long-doors" />
        </div>
        <p>
          That&apos;s it! Now you got an extra tool in toolbelt to find creative
          line ups.
        </p>
      </BlogPostArticle>
      <style jsx>{`
        img {
          max-width: 100%;
          margin: 30px auto;
          display: block;
          min-width: 85%;
        }

        code {
          font-size: 17px;
        }

        .nade-wrap {
          display: flex;
          justify-content: center;
          margin-top: 30px;
          margin-bottom: 30px;
        }
      `}</style>
    </>
  );
};

export default NadeAlignCrosshairBlogPost;
