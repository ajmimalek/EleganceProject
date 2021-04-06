import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { Helmet } from "react-helmet";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { SearchProvider, Results, SearchBox } from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";

import "@elastic/react-search-ui-views/lib/styles/styles.css";
import Upload from "./Upload";

const useStyles = makeStyles(styles);
const connector = new AppSearchAPIConnector({
  searchKey: "search-371auk61r2bwqtdzocdgutmg",
  engineName: "search-ui-examples",
  hostIdentifier: "host-2376rb"
});

function Wardrobe() {
  const classes = useStyles();
  return (

    <>
    <Helmet>
      <title>Elegance App - My Wardrobe</title>
    </Helmet>
    <div>
    <SearchProvider
      config={{
        apiConnector: connector
      }}
    >
      <Upload />
      <div className="App"> 
        <Layout
          header={<SearchBox />}
          bodyContent={<Results titleField="title" urlField="nps_link" />}
        />
      </div>
    </SearchProvider>
  
  </div>
  </>
  );
  
}

export { Wardrobe as default };