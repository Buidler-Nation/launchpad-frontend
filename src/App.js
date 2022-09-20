import routes from "./Routes";

import { useRoutes } from "react-router-dom";
import { useWeb3Context } from "./hooks";
import { useEffect, useState } from "react";
import {useDispatch} from "react-redux";
import * as React from "react";
import {ADDRESSES, DEFAULT_NETWORK} from "./constants";
import {fetchProjectDetails} from "./store/slices";

function App() {
  const { connect, hasCachedProvider, provider } = useWeb3Context();
  const dispatch = useDispatch();
  const [walletChecked, setWalletChecked] = useState(false);

  useEffect(() => {
    if (hasCachedProvider()) {
      connect().then(() => {
        setWalletChecked(true);
      });
    } else {
      setWalletChecked(true);
    }
  }, []);
  React.useEffect(() => {
    Object.values(ADDRESSES).map(address => {
      dispatch(fetchProjectDetails({ address, provider, networkID: DEFAULT_NETWORK }));
    });
  }, []);

  let element = useRoutes(routes);
  return <>{element}</>;
}

export default App;
