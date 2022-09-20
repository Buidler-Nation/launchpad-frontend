import * as React from "react";
import {useNavigate} from "react-router-dom";
import {Box, Button, Grid, Link} from "@mui/material";
import {Cancel, CheckCircle, GitHub, Language, Telegram, Twitter} from "@mui/icons-material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Banner from "../../assets/img/banner-2.png";

import {useProject} from "../../hooks";
import "./all-projects.scss";

export function MenuInterface() {
    const [activeTab, setActiveTab] = React.useState("two");
    const handleChange = (id: any) => {
        setActiveTab(id);
    };
    const {ongoing, upcoming, ended} = useProject();
    return (
        <div className="container">
            <div className="tab-root">
                <div className="tab-div">
                    <ul className="nav">
                        <li
                            onClick={() => handleChange("one")}
                            className={activeTab === "one" ? "active" : ""}
                        >
                            Coming Soon
                        </li>
                        <li
                            onClick={() => handleChange("two")}
                            className={activeTab === "two" ? "active" : ""}
                        >
                            Ongoing
                        </li>
                        <li
                            onClick={() => handleChange("three")}
                            className={activeTab === "three" ? "active" : ""}
                        >
                            Closed
                        </li>
                    </ul>
                </div>
            </div>
            {activeTab === "one" ? (
                    <Grid container justifyContent="center" spacing={5} marginBottom={5}>
                        {Object.keys(upcoming).map((value) => {
                            return (
                                <Grid item xs={10} sm={8} md={6} lg={4} key={value}>
                                    <LaunchpadHome project={upcoming[value]}/>
                                </Grid>
                            );
                        })}
                    </Grid>
                ) :
                <>
                    {activeTab === "two" ? (
                        <Grid container justifyContent="center" spacing={5} marginBottom={5}>
                            {Object.keys(ongoing).map((value) => {
                                return (
                                    <Grid item xs={10} sm={8} md={6} lg={4} key={value}>
                                        <LaunchpadHome project={ongoing[value]}/>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    ) : (
                        <Grid container justifyContent="center" spacing={5} marginBottom={5}>
                            {Object.keys(ended).map((value) => {
                                return (
                                    <Grid item xs={10} sm={8} md={6} lg={4} key={value}>
                                        <LaunchpadHome project={ended[value]}/>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    )
                    }
                </>
            }
        </div>
    );
}

function LaunchpadHome(props: any) {
    const [value, setValue] = React.useState("one");
    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };
    let navigate = useNavigate();
    const showProjectDetail = () => {
        navigate(`/project-details/${props.project.address}`);
    };
    let tokenPrice = "";
    let startDistance = props.project.projectTime[0] - Math.round((new Date()).getTime() / 1000);
    let endDistance = props.project.projectTime[1] - Math.round((new Date()).getTime() / 1000);

    const [counter, setCounter] = React.useState("");
    if (!props.project.loading) {
        setTimeout(() => {
            let distance = 0;
            if (endDistance > 0 && startDistance > 0) {
                distance = props.project.projectTime[0] - Math.round((new Date()).getTime() / 1000);
                startDistance = distance;
            } else if (endDistance > 0 && startDistance < 0) {
                distance = props.project.projectTime[1] - Math.round((new Date()).getTime() / 1000);
                endDistance = distance;
            } else {
                clearTimeout();
            }
            const days = Math.floor(distance / (60 * 60 * 24));
            const hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
            const minutes = Math.floor((distance % (60 * 60)) / (60));
            const seconds = Math.floor((distance % (60)));
            setCounter(days + "d " + hours + "h " + minutes + "m " + seconds + "s");
        }, 1000);
        tokenPrice = "$" + props.project.amount[0] / Math.pow(10, 6);
    }
    return (
        <div className="card-root">
            <img
                src= {Banner}
                alt= "Buidlers Finance"
                className="img"
            />
            {/*<div className="icons">*/}
            {/*    <div className= "d-flex justify-content-start flex-row" >*/}
            {/*        {typeof (props.project.projectInfo.socials.website) !== "undefined" ? (*/}
            {/*            <div className="d-flex me-4">*/}
            {/*                <a title="Website" className="social-links" target="_blank"*/}
            {/*                   href="">*/}
            {/*                    <i className="bi-globe"></i></a>*/}
            {/*            </div>*/}
            {/*        ) : <></>}*/}
            {/*        {typeof (props.project.projectInfo.socials.telegram) != "undefined" ? (*/}
            {/*            <div className = "d-flex me-4">*/}
            {/*                <a title="Telegram" className="social-links" target="_blank"*/}
            {/*                   href="">*/}
            {/*                    <i className="bi-telegram"></i></a>*/}
            {/*            </div>*/}
            {/*         ) : <></>}*/}
            {/*        {typeof (props.project.projectInfo.socials.twitter) != "undefined" ? (*/}
            {/*            <div className="d-flex me-4">*/}
            {/*                <a title="Twitter" className="social-links" target="_blank"*/}
            {/*                   href="">*/}
            {/*                    <i className="bi-twitter"></i></a>*/}
            {/*            </div>*/}
            {/*        ) : <></>}*/}
            {/*        {typeof (props.project.projectInfo.socials.github) != "undefined" ? (*/}
            {/*            <div className="d-flex me-4">*/}
            {/*                <a title="Github" className="social-links" target="_blank"*/}
            {/*                   href="">*/}
            {/*                    <i className="bi-github"></i></a>*/}
            {/*            </div>*/}
            {/*         ) : <></>}*/}
            {/*        {typeof (props.project.projectInfo.socials.discord) != "undefined" ? (*/}
            {/*            <div className="d-flex me-4">*/}
            {/*                <a title="Discord" className="social-links" target="_blank"*/}
            {/*                   href="">*/}
            {/*                    <i className="bi-discord"></i></a>*/}
            {/*            </div>*/}
            {/*        ) : <></>}*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="tabs">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="primary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs"
                >
                    <Tab value="one" label="Offering"/>
                    <Tab value="two" label="Screening"/>
                    <Tab value="three" label="Description"/>
                </Tabs>
            </div>
            {value === "one" ? (
                <div className="content">
                    <div>
                        <p>Buidler's Finance</p>
                        {startDistance > 0 && endDistance > 0 ? (
                                <div className="content-spacing">
                                    <p className="content-text-title">Registration Opens</p>
                                    <p className="content-time">{counter}</p>
                                </div>) :
                            <>
                                {startDistance < 0 && endDistance > 0 ? (
                                        <div className="content-spacing">
                                            <p className="content-text-title">Registration Closes</p>
                                            <p className="content-time">{counter}</p>
                                        </div>) :
                                    <div className="content-spacing">
                                        <p className="content-text-title">Registration Closed</p>
                                        <p className="content-time">CLOSED</p>
                                    </div>
                                }
                            </>
                        }
                        <div className="content-spacing">
                            <p className="content-text-title">PUBLIC Total Raise</p>
                            <p className="content-text">{tokenPrice}</p>
                        </div>
                    </div>
                </div>
            ) : <>
                {value === "two" ? (
                        <div className="content">
                            <div className="d-flex flex-row">
                                <CheckCircle color="success" className="me-3"/>
                                <p className="text-white">
                                    Deflationary Protocol
                                </p>
                            </div>
                            <div className="d-flex flex-row ">
                                <CheckCircle color="success" className="me-3"/>
                                <p className="text-white">
                                    Smart Contracts Audited
                                </p>
                            </div>
                            <div className="d-flex flex-row ">
                                <CheckCircle color="success" className="me-3"/>
                                <p className="text-white">
                                    Liquidity Locked
                                </p>
                            </div>

                            <div className="d-flex flex-row ">
                                <CheckCircle color="success" className="me-3"/>
                                <p className="text-white">
                                    Protocol Launch 27th October
                                </p>
                            </div>
                        </div>
                    )
                    : (
                        <div className="content">
                            <p className="text-white">
                                Buidler's is a decentralized protocol based on the $BDN token backed by Buidler's Finance and its entire
                                ecosystem. $BDN will be a non-inflationary yield-generating currency that is backed by its treasury.
                                The Buidler's Protocol aims to power the Buidler's
                                <a className="show-more-btn" href="javascript:void(0);" onClick={showProjectDetail} >
                                    ....read more
                                </a>
                            </p>
                        </div>
                    )
                }
            </>
            }
            <p className="button-div">
                <button className="research" type="button" onClick={showProjectDetail}>
                    Research
                </button>
            </p>
        </div>
    );
}
