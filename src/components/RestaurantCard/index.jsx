import "../../assets/bootstrap/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "./style.css";

import { Link } from "react-router-dom";

import defaultLogo from "../../assets/img/restaurant.png";

const RestaurantCard = ({ title, desc, id, logo, header }) => {
    let desc2 = desc.substring(0, 160);

    return (
        <li className="restaurant-card">
            <Link className="page-link-p1" to={`/restaurants/${id}`}>
                <div className="card-image-header" style={{ backgroundImage: header ? "url(" + header + ")" : 'linear-gradient(35deg, #CCFFFF, #FFCCCC)' }}>
                    <img alt="" className="card-icon" src={logo ? logo : defaultLogo} />
                </div>
                <div className="card-body">
                    <h1 className="card-title">{title}</h1>
                    <p className="card-description">{desc2.substring(0, desc2.lastIndexOf(" ")).trim().concat(" ...")}</p>
                </div>
                <div className="card-footer-p1"></div>
            </Link>
        </li >
    );
}

export default RestaurantCard;