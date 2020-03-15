import { FC } from "react";
import { EzoicPlaceHolder } from "../common/ezoicLoader/EzoicPlaceHolder";
import { Layout2 } from "../layout/Layout2";
import { NadeLight } from "../models/Nade/Nade";
import { useInitAdvert } from "../store/AdvertStore/hooks";
import { FrontpageActions } from "./FrontpageActions";
import { FrontPageJumbo } from "./FrontPageJumbo";
import { RecentNades } from "./RecentNades";
import { FrontPageRecentPosts } from "./FrontPageRecentPosts";

type Props = {
  recentNades: NadeLight[];
};

export const FrontPage: FC<Props> = ({ recentNades }) => {
  useInitAdvert();

  return (
    <Layout2 canonical="">
      <FrontPageJumbo />
      <RecentNades recentNades={recentNades} />
      <EzoicPlaceHolder desc="Front page | Over recent nades" id={119} />
      <FrontPageRecentPosts />
      <FrontpageActions />
      <div className="bottom-placeholder">
        <EzoicPlaceHolder desc="Front Page | Bottom" id={110} />
      </div>

      <style jsx>{`
        .bottom-placeholder {
          margin-bottom: 100px;
          margin-top: 30px;
        }
      `}</style>
    </Layout2>
  );
};
