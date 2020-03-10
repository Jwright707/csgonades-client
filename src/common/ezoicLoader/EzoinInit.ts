const isBrowser = typeof window !== "undefined";

const hasEzoic = typeof ezstandalone !== "undefined";
export function ezoicInit() {
  if (isBrowser && hasEzoic && !ezstandalone.enabled) {
    try {
      ezstandalone.DEBUG = false;
      ezstandalone.init();
      ezstandalone.define(108, 109, 104, 101, 102);
      ezstandalone.enable();
      ezstandalone.display();
      console.log("> Ez init");
    } catch (error) {
      // no-op
    }
  } else if (isBrowser && hasEzoic && ezstandalone.enabled) {
    setTimeout(() => {
      try {
        ezstandalone.refresh();
        console.log("> Ez refresh");
      } catch (error) {
        // no-op
      }
    }, 1000);
  }
}
