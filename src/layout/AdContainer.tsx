import { FC, useEffect, memo } from "react";
import { AdUnit } from "../common/adunits/AdUnit";

const AD_CONTAINER_ID = "tag-container";

type Props = {};

export const AdContainer: FC<Props> = memo(({}) => {
  return (
    <>
      <div id={AD_CONTAINER_ID}>
        <AdUnit tagType="half-page" />
        <AdUnit tagType="skyscraper" />
        <AdUnit tagType="mega-bottom" />
        <AdUnit tagType="mega-banner" />
        <AdUnit tagType="top-medium-rectangle" />
      </div>
      <style jsx>
        {`
          #tag-container {
            display: none;
          }
        `}
      </style>
    </>
  );
});

type AdType =
  | "top-medium-rectangle"
  | "skyscraper"
  | "mega-bottom"
  | "half-page"
  | "mega-banner";

const adUnitIds = {
  "mega-banner": "60796-1",
  "top-medium-rectangle": "60796-2",
  "half-page": "60796-3",
  skyscraper: "60796-4",
  "mega-bottom": "60796-28",
};

export const AdTag: FC<{ tagType: AdType }> = memo(({ tagType }) => {
  useEffect(() => {
    let self: HTMLElement | null = null;
    let adContainerRef: HTMLElement | null = null;
    let originalAdElement: HTMLElement | null = null;
    const delay = setTimeout(() => {
      self = document.getElementById(tagType);
      if (!self) {
        console.warn("Self not found");
        return;
      }
      adContainerRef = document.getElementById(AD_CONTAINER_ID);
      if (!adContainerRef) {
        console.warn("Did not find ad container");
        return;
      }
      originalAdElement = document.getElementById(adUnitIds[tagType]);
      if (!originalAdElement) {
        console.warn("Did not find original ad unit", adUnitIds[tagType]);
        return;
      }
      self.appendChild(originalAdElement);
      console.log("> Moved ad into slot");
    }, 1000);

    return () => {
      if (delay) {
        clearTimeout(delay);
      }
      if (originalAdElement && adContainerRef && self) {
        self.removeChild(originalAdElement);
        adContainerRef.appendChild(originalAdElement);
        console.log("> Moved div back");
      }
    };
  }, [tagType]);

  return <div id={tagType} />;
});