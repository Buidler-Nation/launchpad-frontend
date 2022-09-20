import { useEffect, useState } from "react";

import { useWeb3Context } from "../hooks";
import { DEFAULT_NETWORK } from "../constants";

import styled from "@emotion/styled";

const Div = styled.div`
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 0px 10px rgba(44, 39, 109, 0.1);
  border-radius: 10px;
  padding: 9px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const P = styled.p`
  font-family: Montserrat SemiBold;
  font-weight: 600;
  font-size: 18px;
  color: #ffffff;
`;

export function ConnectMenu() {
  const {
    connect,
    disconnect,
    connected,
    web3,
    providerChainID,
    checkWrongNetwork,
  } = useWeb3Context();
  const [isConnected, setConnected] = useState(connected);

  let buttonText = "Connect Wallet";
  let clickFunc = connect;
  let buttonStyle = {};

  if (isConnected) {
    buttonText = "Disconnect";
    clickFunc = disconnect;
  }

  if (isConnected && providerChainID !== DEFAULT_NETWORK) {
    buttonText = "Wrong network";
    buttonStyle = { backgroundColor: "rgb(255, 67, 67)" };
    clickFunc = () => {
      checkWrongNetwork();
    };
  }

  useEffect(() => {
    setConnected(connected);
  }, [web3, connected]);

  return (
    <Div className="ms-3 connect-button" style={buttonStyle} onClick={clickFunc}>
      <P className="mb-0">{buttonText}</P>
    </Div>
  );
}
