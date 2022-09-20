import "./footer.css";
import whitepaper from "../../assets/img/whitepaper.png";

export function Footer() {
  const downloadWhitepaper = () => {
    window.open(
      "",
      "_blank"
    );
  };
  return (
    <div>
      <footer id="contactus" className="d-flex justify-content-between my-5 ">
        <div className="d-flex flex-column me-3">
          <span className="logo mb-3"></span>
        </div>
        <ul className="list-group">
          <li className="list-group-item">
            <a
              className="nav-link"
              target="_blank"
              href=""
            >
              Twitter
            </a>
          </li>
          <li className="list-group-item">
            <a
              className="nav-link"
              target="_blank"
              href=""
            >
              Discord
            </a>
          </li>
          <li className="list-group-item">
            <a
              className="nav-link"
              target="_blank"
              href=""
            >
              Instagram
            </a>
          </li>
          <li className="list-group-item">
            <a
              className="nav-link"
              target="_blank"
              href=""
            >
              Medium
            </a>
          </li>
          <li className="list-group-item">
            <a
              className="nav-link"
              target="_blank"
              href=""
            >
              GitBook
            </a>
          </li>
        </ul>
        <ul className="list-group">
          <li className="list-group-item">
            <a
              className="nav-link"
              href=""
              target="_blank"
            >
              Whitepaper
            </a>
          </li>
          <li className="list-group-item">
            <a
              className="nav-link"
              href=""
              target="_blank"
            >
              Docs
            </a>
          </li>
        </ul>
        <ul class="list-group">
          <li class="list-group-item">
            <button
              type="button"
              class="nav-link whitepaper-download"
              onClick={() => downloadWhitepaper()}
            >
              <img class="img-fluid" src={whitepaper} />
              Whitepaper
            </button>
          </li>
        </ul>
      </footer>
      <p className="copyright">&copy; Buidler's Finance, All Rights Reserved</p>
    </div>
  );
}
