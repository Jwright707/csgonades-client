import { NextPage } from "next";
import React from "react";
import { FrontPage } from "../src/pages/frontpage/FrontPage";
import { fetchSiteStatsThunk } from "../src/store/GlobalStore/GlobalThunks";
import { fetchNewestNadesAction } from "../src/store/NadeStore/NadeThunks";

const Index: NextPage = props => {
  return <FrontPage />;
};

Index.getInitialProps = async ({ store, req }) => {
  const { dispatch } = store;

  await dispatch(fetchNewestNadesAction());
  await dispatch(fetchSiteStatsThunk());

  return;
};

export default Index;
