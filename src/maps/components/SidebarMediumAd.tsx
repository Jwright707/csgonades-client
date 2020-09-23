import { FC, useEffect, useState } from "react";
import { EzoicPlaceholder } from "../../common/adunits/EzoicPlaceholder";
import { Twemoji } from "../../common/Twemoji";
import { Dimensions } from "../../constants/Constants";

export const SidebarMediumAd: FC = ({}) => {
  const [isAdBlockEnabled, setIsAdBlockEnabled] = useState(false);

  useEffect(() => {
    if (!window.ezstandalone) {
      setIsAdBlockEnabled(true);
    }
  }, []);

  return (
    <>
      {isAdBlockEnabled && (
        <div className="block-msg-wrap">
          <div className="block-msg">
            <strong>Oh no!</strong> You have AdBlock enabled{" "}
            <Twemoji emoji="😢" />
            <br />
            Consider disabling it on this site to support my work{" "}
            <Twemoji emoji="😍" />
            <br />
          </div>
        </div>
      )}

      {!isAdBlockEnabled && (
        <div className="ph">
          <EzoicPlaceholder id="172" />
        </div>
      )}

      <style jsx>{`
        .ph {
        }

        .block-msg-wrap {
          display: flex;
          justify-content: center;
          margin-top: ${Dimensions.GUTTER_SIZE}px;
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        .block-msg {
          background: #87a600;
          border-radius: 5px;
          padding: 15px 30px;
          color: white;
          text-align: center;
        }
      `}</style>
    </>
  );
};
