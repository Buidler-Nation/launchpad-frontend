import * as React from "react";
import {ethers} from "ethers";
import {useDispatch, useSelector} from "react-redux";
import Banner from "../../assets/img/banner-1.png";

import {Button, IconButton, InputAdornment, OutlinedInput,} from "@mui/material";
import {CheckCircle} from "@mui/icons-material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LinearProgress from "@mui/material/LinearProgress";

import {useWeb3Context} from "../../hooks";
import { PublicSale, StableCoin} from "../../abis";
import {ConnectMenu} from "../";
import {
  changeApproval,
  error,
  fetchProjectDetails,
  invest,
  isPendingTxn,
  txnButtonText,
  warning,
} from "../../store/slices";
import "./project-details.scss";
import {ADDRESSES, DEFAULT_NETWORK, getAddress, messages} from "../../constants";
import Logo from "../../assets/img/B-N-1.png"

export function ProjectDetails() {
  const [projectLoading, setProjectLoading] = React.useState(true);
  const [activeTab, setactiveTab] = React.useState("p-details");
  const [progress, setProgress] = React.useState(0);
  const [amountToRaised, setAmountToRaised] = React.useState(0);
  const [amountRaised, setAmountRaised] = React.useState(0);
  const [invested, setInvested] = React.useState(0);
  const [canInvest, setCanInvest] = React.useState(0);
  const [allowance, setAllowance] = React.useState(false);
  const [quantity, setQuantity] = React.useState("");
  const [isWhitelist, setIsWhitelist ] = React.useState(false);
  const [stableCoinBalance, setStableCoinBalance] = React.useState(0);
  const [saleCompleted, setSaleCompleted] = React.useState(false);

  let id  = ADDRESSES.project1;
  const { provider, address, chainID, checkWrongNetwork } = useWeb3Context();
  const dispatch = useDispatch();

  const projectDetails = useSelector((state) => {
    return state.projects[id];
  });
  React.useEffect(() => {
    if (projectDetails === undefined) {
      dispatch(
          fetchProjectDetails({
            address: id,
            provider,
            networkID: DEFAULT_NETWORK,
          })
      );
    }
  }, []);

  const pendingTransactions = useSelector((state) => {
    return state.pendingTransactions;
  });

  React.useEffect(() => {
    if (projectDetails && projectDetails.loading === false) {
      setProjectLoading(false);
    }
  }, [projectDetails]);

  const projectContract = new ethers.Contract(id, PublicSale, provider);
  const stableCoinContract = new ethers.Contract(
      getAddress("STABLE_COIN_ADDRESS"),
      StableCoin,
      provider
  );

  const setMax = () => {
    console.log(canInvest, invested, stableCoinBalance);
    setQuantity(Math.min(canInvest - invested, stableCoinBalance));
  };

  const onSeekApproval = async () => {
    if (await checkWrongNetwork()) return;
    await dispatch(
        changeApproval({
          address,
          idoAddress: id,
          provider,
          networkID: chainID,
        })
    );
  };

  const onInvest = async () => {
    if (await checkWrongNetwork()) return;
    const startTime = Math.round(Date.UTC(2022, 3, 5, 17, 0, 0)/ 1000);
    const endTime = Math.round(Date.UTC(2024, 3, 6, 17, 0, 0)/ 1000);
    const currentTime =  Math.round((Date.parse(new Date)) / 1000);

    if (quantity === "" || parseFloat(quantity) === 0) {
      dispatch(warning({ text: "Quantity is mandatory" }));
    }

    if (saleCompleted) {
      dispatch(error({ text: "Sale is Complete" }));
    }

    else if(startTime > currentTime) {
      dispatch(error({ text: "Sale yet to Start" }));
    }

    else if(endTime < currentTime) {
      dispatch(error({ text: "Sale Ended" }));
    }

    else {
      await dispatch(
          invest({
            address,
            value: String(quantity),
            provider,
            networkID: chainID,
            idoAddress: id,
          })
      );
      setQuantity("");
    }
  };

  const checkAllowance = () => {
    if (!provider) {
      dispatch(warning({ text: messages.please_connect_wallet }));
      return;
    }
    return stableCoinContract.allowance(address, id).then((data) => {
      return setAllowance(data > 0);
    });
  };

  const updateRasiedAmounts = () => {
    projectContract.getAmountInfo().then((data) => {
      const amountToRaised = data.totalAmountToRaise_ / Math.pow(10, 6);
      const amountRaised = data.totalAmountRaised_ / Math.pow(10, 6);
      setAmountToRaised(amountToRaised);
      setAmountRaised(amountRaised);
      const complition = (amountRaised * 100) / amountToRaised;
      setSaleCompleted(amountRaised >= amountToRaised);
      !isNaN(complition) && progress !== complition && setProgress(complition);
    });
  };

  const handleChange = (event, newValue) => {
    setactiveTab(newValue);
  };

  React.useEffect(() => {
    updateRasiedAmounts();
    const interval = setInterval(updateRasiedAmounts, 5000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    if (address) {
      checkAllowance();
      const interval = setInterval(checkAllowance, 5000);
      return () => clearInterval(interval);
    }
  }, [address]);

  const updateUserTokens = () => {
    projectContract.userToTokenAmount(address).then((data) => {
      setInvested(data / Math.pow(10, 18));
    });
    projectContract.checkMaxTokenForUser(address).then((data) => {
      setCanInvest(data / Math.pow(10, 18));
    });
    stableCoinContract.balanceOf(address).then((data) => {
      setStableCoinBalance(data / Math.pow(10, 6));
    })
  };

  React.useEffect(() => {
    if (address) {
      updateUserTokens();
    }
  }, [address]);

  return (
      <>
        {projectLoading && <p>Loading</p>}
        {!projectLoading && (
            <div className="project-details-wrapper">
              <div className="details mt-5 p-5">
                <div className="d-flex justify-content-between flex-wrap">
                  <div className="d-flex align-items-center mb-3">
                <span className="icon">
                  <img
                      alt="Project icon"
                      height="75px"
                      width="75px"
                      src={Logo}
                  ></img>
                </span>
                    <span className="project-name ms-3">
                  Buidler's Nation
                </span>
                  </div>
                  <div className="d-flex  align-items-center mb-3">
                    <a className="social-links me-3"
                       href=""
                       target="_blank">
                      <i className="bi-twitter"></i>
                    </a>

                    <a className="social-links me-3"
                       href=""
                       target="_blank">
                      <i className="bi-globe"></i>
                    </a>

                    <a className="social-links me-3"
                       href=""
                       target="_blank" >
                      <i className="bi-telegram"></i>
                    </a>

                    <a className="social-links me-3"
                       href=""
                       target="_blank">
                      <i className="bi-discord"></i>
                    </a>
                  </div>
                </div>
                <div>
                  <p className="description">
                    Buidler's Nation is a decentralized protocol based on the $BDN token backed by Buidler's Finance and its entire
                    ecosystem. $BDN will be a non-inflationary yield-generating currency that is backed by its treasury.
                    The Buidler's Nation Protocol aims to power the Buidler's ecosystem, which will consist of various innovative web3
                    products, services, and applications that will turn the entire protocol into a distributed,
                    decentralized, on-chain venture fund.
                  </p>
                </div>
              </div>
              <div className="additional-details d-flex mt-5 flex-wrap">
                <div className="graph mb-5">
                  <img
                      alt={`Project Banner`}
                      src={Banner}
                  />
                </div>
                <div className="screening p-4 mb-5 flex-sm-grow-1">
                  <div className="d-flex flex-row ">
                    <CheckCircle color="success" className="me-3" />
                    <p className="text-white">Deflationary Protocol</p>
                  </div>

                  <div className="d-flex flex-row ">
                    <CheckCircle color="success" className="me-3" />
                    <p className="text-white">Smart Contracts Audited</p>
                  </div>

                  <div className="d-flex flex-row">
                    <CheckCircle color="success" className="me-3" />
                    <p className="text-white">Liquidity Locked</p>
                  </div>

                  <div className="d-flex flex-row ">
                    <CheckCircle color="success" className="me-3" />
                    <p className="text-white"> Launch Coming Soon </p>
                  </div>

                </div>
              </div>
              <div className="progress-container d-flex flex-wrap">
                <div className="graph mb-5 p-4">
                  <div className="d-flex justify-content-between progress-details">
                <span>
                  Amount to raise:{" "}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  }).format(amountToRaised)}
                </span>
                    <span>
                  Amount raised:{" "}
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      }).format(amountRaised)}
                </span>
                  </div>
                  <div>
                    <LinearProgress variant="determinate" value={progress} />
                  </div>
                </div>
                <div className="screening p-4 mb-5 flex-sm-grow-1">
                  {address && (
                      <>
                        <OutlinedInput
                            type="number"
                            placeholder="Amount"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            id="outlined-basic"
                            variant="outlined"
                            className="outline-input"
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton onClick={setMax} edge="end">
                                  Max
                                </IconButton>
                              </InputAdornment>
                            }
                        />
                        {address && allowance ? (
                            <Button
                                onClick={() => {
                                  if (isPendingTxn(pendingTransactions, "investing"))
                                    return;
                                  onInvest();
                                }}
                                variant="outlined"
                            >
                              {txnButtonText(
                                  pendingTransactions,
                                  "investing",
                                  "Invest"
                              )}
                            </Button>
                        ) : (
                            <Button
                                onClick={() => {
                                  if (
                                      isPendingTxn(
                                          pendingTransactions,
                                          "approve_investment"
                                      )
                                  )
                                    return;
                                  onSeekApproval();
                                }}
                                variant="outlined"
                            >
                              {txnButtonText(
                                  pendingTransactions,
                                  "approve_investment",
                                  "Approve"
                              )}
                            </Button>
                        )}
                        <p className="investment-details mt-3">
                          Invested:{" "}
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2,
                          }).format(invested)}
                        </p>
                        <p className="investment-details">
                          Total you can Invest:{" "}
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2,
                          }).format(canInvest)}
                        </p>
                      </>
                  )}
                  {!address && <ConnectMenu></ConnectMenu>}
                </div>
              </div>
              <div className="table-section d-flex mb-5 p-4 flex-column">
                <div className="tabs d-flex align-items-start">
                  <Tabs
                      value={activeTab}
                      onChange={handleChange}
                      textColor="secondary"
                      indicatorColor="secondary"
                      aria-label="secondary tabs"
                      centered
                  >
                    <Tab value="p-details" label="Project Details" />
                  </Tabs>
                </div>
                {activeTab === "p-details" && (
                    <div className="d-flex flex-wrap">
                      <div className="mt-4 flex-grow-1">
                        <table>
                          <thead>
                          <tr>
                            <th colSpan="2">Token information</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr>
                            <td>Name</td>
                            <td>Buidler's Nation </td>
                          </tr>
                          <tr>
                            <td>Token Symbol</td>
                            <td>mockToken</td>
                          </tr>
                          <tr>
                            <td>Price</td>
                            <td>1 USDT</td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="spacer"></div>
                      <div className="mt-4 flex-grow-1">
                        <table>
                          <thead>
                          <tr>
                            <th colSpan="2">Pool Information</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr>
                            <td>Opens</td>
                            <td>2022-04-05 05:00:00 PM UTC</td>
                          </tr>
                          <tr>
                            <td>Closes</td>
                            <td>2022-04-06 05:00:00 PM UTC</td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                )}
              </div>
            </div>
        )}
      </>
  );
}
