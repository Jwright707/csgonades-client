import { useEffect } from "react";
import { useRouter } from "next/router";
import { useIsAdmin } from "../store/AuthStore/AuthHooks";

export const useAdRefresher = () => {
  const isAdmin = useIsAdmin();
  const { pathname, query } = useRouter();

  useEffect(() => {
    const delay = setTimeout(() => {
      const csgoEzoicCodes = findAdCode();
      console.log("> Found placeholders", csgoEzoicCodes);

      if (!isAdmin) {
        ezDisplayAds();
      }
    }, 500);
    return () => clearTimeout(delay);
  }, [pathname, query, isAdmin]);
};

export const ezDisplayAds = (tries = 0) => {
  if (tries >= 4) {
    return;
  }

  if (typeof ezstandalone === "undefined") {
    setTimeout(() => {
      ezDisplayAds(tries + 1);
    }, 500);
    return;
  }

  try {
    const csgoEzoicCodes = findAdCode();

    if (!csgoEzoicCodes.length) {
      return;
    }

    if (!ezstandalone.enabled) {
      ezstandalone.cmd.push(function() {
        ezstandalone.define(...csgoEzoicCodes);
        ezstandalone.enable();
        ezstandalone.display();
        console.log("> Placeholders", csgoEzoicCodes.join(","));
      });
    } else if (ezstandalone.enabled) {
      ezstandalone.cmd.push(function() {
        ezstandalone.define(...csgoEzoicCodes);
        ezstandalone.refresh();
        console.log("> Placeholders", csgoEzoicCodes.join(","));
      });
    }
  } catch (error) {
    return;
  }
};

function findAdCode() {
  function isHidden(el: any) {
    return el.offsetParent === null;
  }

  const adIds: number[] = [];

  const elements = document.querySelectorAll(
    'div[id^="ezoic-pub-ad-placeholder"]'
  );

  elements.forEach(el => {
    if (isHidden(el)) {
      return;
    }

    try {
      const id = Number(el.id.split("-").pop());
      adIds.push(id);
    } catch (error) {
      console.error("Failed to parse ad id");
    }
  });

  return adIds;
}
