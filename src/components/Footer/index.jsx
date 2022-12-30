import "../../assets/bootstrap/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "./style.css";

import { Link } from "react-router-dom";

const Footer = () => {
  const restaurantID = sessionStorage.getItem("restaurant_id")
    ? sessionStorage.getItem("restaurant_id")
    : "-1";

  const feedLink = !sessionStorage.getItem("token")
    ? "/accounts/login"
    : "/accounts/feed";
  const restaurantLink = !sessionStorage.getItem("token")
    ? "/accounts/login"
    : restaurantID === "-1"
    ? "/restaurants/create/"
    : `/restaurants/${restaurantID}`;

  return (
    <footer
      className="footer-clean"
      style={{ borderTop: "1px solid var(--bs-gray-300)" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-4 col-md-3 item">
            <ul>
              <li>
                <Link to={feedLink}>Blog Feed</Link>
              </li>
              <li>
                <Link to="/">Explore</Link>
              </li>
            </ul>
          </div>
          <div className="col-sm-4 col-md-3 item">
            <ul>
              <li>
                <Link to={restaurantLink}>My Restaurant</Link>
              </li>
              <li>
                <a href="mailto:joemama@mail.com?subject=Lol&body=Lmao%20why%20do%20you%20need%20help">
                  Help
                </a>
              </li>
            </ul>
          </div>
          <div className="col-sm-4 col-md-3 item">
            <ul>
              <li>
                <Link to="/about">About Restify</Link>
              </li>
              <li>
                <Link to="/terms">Terms and Conditions</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="copyright">Restify © 2022</p>
    </footer>
  );
};

export default Footer;
