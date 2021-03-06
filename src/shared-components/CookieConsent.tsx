import { FC, memo, useEffect, useMemo, useState } from "react";
import { FaCookieBite } from "react-icons/fa";
import { Dimensions } from "../constants/Constants";
import { useCookieConcent } from "../core/global/hooks/useCookieConcent";
import { useTheme } from "../core/settings/SettingsHooks";

export const CookieConsent: FC = memo(() => {
  const [render, setRender] = useState(false);
  const { colors } = useTheme();
  const { acceptCookieConcent, acceptedCookieConsent } = useCookieConcent();

  useEffect(() => {
    const renderTimer = setTimeout(() => {
      setRender(true);
    }, 2000);
    return () => clearTimeout(renderTimer);
  }, []);

  const wrapperClassName = useMemo(() => {
    const classNames = ["cookie-consent-wrapper"];
    if (!acceptedCookieConsent && render) {
      classNames.push("visible");
    }
    return classNames.join(" ");
  }, [acceptedCookieConsent, render]);

  function onCookieConsentAccept() {
    acceptCookieConcent();
  }

  return (
    <>
      <div className={wrapperClassName}>
        <div className="cookie-consent">
          <div className="cookie-icon">
            <FaCookieBite />
          </div>

          <div className="consent-txt">
            In order to give you a better service CSGO Nades uses{" "}
            <a href="/privacypolicy">cookies</a> for analytics and advertising.
            <br /> By continuing to browse the site you are agreeing to our use
            of cookies.
          </div>

          <div className="close-button">
            <button className="accept-btn" onClick={onCookieConsentAccept}>
              I Accept
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .cookie-consent-wrapper {
          background: rgba(0, 0, 0, 0.9);
          bottom: 0;
          display: flex;
          justify-content: space-around;
          left: 0;
          position: fixed;
          right: 0;
          transform: translateY(100%);
          transition: all 0.3s ease-out;
          z-index: 999;
        }

        .visible {
          transform: translateY(0%);
        }

        .cookie-consent {
          color: #fff;
          display: flex;
          flex-direction: row;
          font-size: 16px;
          padding ${Dimensions.GUTTER_SIZE / 2}px;
        }

        .cookie-icon {
          align-items: center;
          display: flex;
          font-size: 1.5em;
          margin-right: ${Dimensions.GUTTER_SIZE}px;
        }

        .consent-txt {
          font-size: 12px;
          margin-right: ${Dimensions.GUTTER_SIZE}px;
        }

        .close-button {
          align-items: center;
          display: flex;
        }

        .accept-btn {
          appearance: none;
          background: ${colors.PRIMARY};
          border-radius: 5px;
          border: none;
          border: none;
          color: #fff;
          cursor: pointer;
          font-size: 14px;
          font-weight: 400;
          outline: none;
          padding: 10px 20px;
          white-space: nowrap;
        }

        .accept-btn:hover {
          background: #083345;
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .cookie-consent {
            align-items: center;
            flex-direction: column;
          }

          .consent-txt {
            text-align: center;
          }

          .consent-txt, .cookie-icon {
            margin: 0;
            margin-bottom: ${Dimensions.GUTTER_SIZE}px;
          }
        }
      `}</style>
    </>
  );
});
