import { useCallback, useEffect } from "react";
import ReactGA from "react-ga";
import { useIsAdmin } from "../store/AuthStore/AuthHooks";
import { useRouter } from "next/router";

const IS_BROWSER = typeof window !== "undefined";
const IS_PROD = process.env.NODE_ENV === "production";

export const usePageView = () => {
  const { query, route } = useRouter();
  const { pageView } = useAnalytics();

  useEffect(() => {
    const pageViewDelay = setTimeout(() => {
      const location = window.location.pathname + window.location.search;
      pageView({ path: location });
    }, 1000);
    return () => clearTimeout(pageViewDelay);
  }, [pageView, query, route]);
};

export const useAnalytics = () => {
  const isAdmin = useIsAdmin();

  const event = useCallback(
    (opts: EventOptions) => {
      if (isAdmin) {
        return;
      }
      GoogleAnalytics.event(opts);
    },
    [isAdmin]
  );

  const pageView = useCallback(
    (opts: PageViewOpts) => {
      if (isAdmin) {
        return;
      }
      GoogleAnalytics.pageView(opts);
    },
    [isAdmin]
  );

  return {
    event,
    pageView,
  };
};

type EventOptions = {
  category: string;
  action: string;
  label?: string;
  value?: number;
  ignore?: boolean;
  nonInteraction?: boolean;
};

type PageViewOpts = {
  path: string;
  title?: string;
  ignore?: boolean;
};

interface TimingOpts extends ReactGA.TimingArgs {
  ignore?: boolean;
}

class GoogleAnalytics {
  static event(opts: EventOptions) {
    if (opts.ignore || !IS_BROWSER) {
      return;
    }
    try {
      this.init();
      ReactGA.event({
        action: opts.action,
        category: opts.category,
        label: opts.label,
        nonInteraction: opts.nonInteraction,
        value: opts.value,
      });
    } catch (error) {
      // no-op
    }
  }

  static timing(opts: TimingOpts) {
    if (opts.ignore || !IS_BROWSER) {
      return;
    }
    try {
      this.init();
      ReactGA.timing(opts);
    } catch (error) {
      // no-op
    }
  }

  static async pageView(opts: PageViewOpts) {
    if (opts.ignore || !IS_BROWSER) {
      return;
    }
    try {
      this.init();
      ReactGA.pageview(opts.path, undefined, opts.title);
    } catch (error) {
      // no-op
    }
  }

  private static init() {
    if (!IS_BROWSER || window.GA_INITIALIZED) {
      return;
    }
    ReactGA.initialize("UA-71896446-6", {
      testMode: IS_PROD ? false : true,
      debug: IS_PROD ? false : false,
    });
    window.GA_INITIALIZED = true;
  }
}
