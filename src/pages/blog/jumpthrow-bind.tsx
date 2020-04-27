import { FC } from "react";
import { BlogPost } from "../../blog/BlogPost";
import { BlogPostArticle } from "../../blog/BlogPostArticle";
import { BlogCodeSnippet } from "../../blog/BlogCodeSnippet";
import { PageLink } from "../../common/PageLink";

export const blogJumpthrowBind: BlogPost = {
  title: "Jumpthrow Bind for CS:GO - Ultimate Guide",
  slug: "jumpthrow-bind",
  imageUrl: "/blogimg/jump.jpg",
  thumbnailUrl: "/blogimg/jump_thumb.jpg",
  createdAt: "2020-04-27T09:30:00.000Z",
  updatedAt: "2020-04-27T09:30:00.000Z",
  intro:
    "Adding a jumpthrow bind allows you to throw long range smokes consistently. The bind jumps and releases the nade with a single button.",
};

const NadeAlignCrosshairBlogPost: FC = () => {
  return (
    <>
      <BlogPostArticle data={blogJumpthrowBind}>
        <p>
          If you already know what the jumpthrow bind is, skip to the end where
          you can copy the bind.
        </p>
        <h2>Is jumpthrow bind legal?</h2>
        <p>
          <a href="https://www.pcgamesn.com/counter-strike-global-offensive/jumpthrow-bind">
            Yes
          </a>
          , mostly. In matchmaking, ESEA, FACEIT and most pro tournaments the
          jump throw bind is legal to use. However, if your playing on some pro
          or semi-pro tournament, double-check their rules to be sure you’re not
          breaking any rules.
        </p>
        <h2>What is the jumpthrow bind?</h2>
        <p>
          The jumpthrow bind is a small script you can bind to one of your
          buttons. It allows you with one click of a button to perform multiple
          actions. In the case of the jumpthrow bind, these actions are jumping
          and releasing the left mouse button at the same time. So why is this
          so useful? It allows you to throw long-range with the same outcome
          every time. If you try to jump and release the nade yourself without
          the bind, you will see some variations for your throws as your not a
          robot, and you probably release the mouse button at slightly different
          times.
        </p>
        <h2>Single key jumpthrow bind</h2>
        <p>Simple jumpthrow bind that you can paste into your console.</p>
        <p>
          Change <em>KEY</em> with whatever key you prefer to use.
        </p>
        <BlogCodeSnippet code={'bind KEY "+jump; -attack; -jump"'} />

        <h2>Jumpthrow alias in autoexec</h2>
        <p>
          If you don’t have a autoexec config file allready, you can follow{" "}
          <a href="https://www.dailyesports.gg/how-to-create-a-custom-csgo-config-autoexec-cfg/">
            this guide
          </a>{" "}
          to set it up.
        </p>
        <p>
          Paste the following into your autoexec file, change out KEY with
          whatever button you prefer:
        </p>
        <BlogCodeSnippet
          code={
            'alias "+jumpthrow" "+jump;-attack;-attack2"\nalias "-jumpthrow" "-jump"\nbind "KEY" "+jumpthrow"'
          }
        />

        <p>
          Now that you got your jumpthrow bind is set up, head over to your
          favorite map and find some nades that use the jumpthrow bind.
        </p>

        <PageLink href="/maps/[map]" as="/maps/dust2">
          <span className="cta-map">Dust2 Nades</span>
        </PageLink>
        <PageLink href="/maps/[map]" as="/maps/mirage">
          <span className="cta-map">Mirage Nades</span>
        </PageLink>

        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/FQa3SL6IlrE"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <h2>Read more</h2>
        <p>
          <PageLink
            href="/blog/tickrate-and-jumpthrow-bind"
            as="/blog/tickrate-and-jumpthrow-bind"
          >
            <span>Why Jumpthrow Smokes Are Different on 64 and 128 Tick</span>
          </PageLink>
        </p>
      </BlogPostArticle>
      <style jsx>{`
        .video-container {
          overflow: hidden;
          position: relative;
          width: 100%;
          margin-bottom: 30px;
        }

        .video-container::after {
          padding-top: 56.25%;
          display: block;
          content: "";
        }

        .video-container iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .cta-map {
          background: #299464;
          border-radius: 10px;
          color: white;
          display: block;
          margin: 30px auto;
          padding: 15px 30px;
          width: 200px;
          text-align: center;
          font-weight: 500;
          font-size: 18px;
        }
      `}</style>
    </>
  );
};

export default NadeAlignCrosshairBlogPost;
