import { NextPage } from "next";
import { useEffect } from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import { usePreloadUser } from "../src/store/AuthStore/AuthHooks";

const Auth: NextPage = () => {
  const preloadUser = usePreloadUser();

  useEffect(() => {
    preloadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dimmer active>
      <Loader>Signing in...</Loader>
    </Dimmer>
  );
};

export default Auth;
