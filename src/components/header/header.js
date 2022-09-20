import * as React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import Logo from "../../assets/svg/B-N.png";
import { ConnectMenu } from "../index";
import "./header.css";

const links = [
  {
    id: 1,
    text: "Projects",
    path: "/projects",
  },
];

function CustomLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link className={`nav-link ${match && "active"}`} to={to} {...props}>
        {children}
      </Link>
    </div>
  );
}

export const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src = {Logo} className="navbar-logo"/>
        </a>
        <span></span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-center">
              <li className="nav-item me-4" key={1}>
                <CustomLink to="/projects">Projects</CustomLink>
              </li>
            <li className="nav-item me-4" key={2}>
              <a className="nav-link" href = "https://www.Buidlersdao.finance/" target="_blank">Buidler's Finance</a>
            </li>
            <li className="nav-item me-4" key={3}>
              <a className="nav-link" href = "https://testapp.Buidlersdao.finance/#/" target = "_blank">Stake BDN</a>
            </li>
          </ul>
        </div>
        <div className="nav-button">
          <ConnectMenu></ConnectMenu>
        </div>
      </div>
    </nav>
  );
};
