import "../../assets/bootstrap/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "./style.css";

import { useParams } from "react-router-dom";

import defaultImage from "../../assets/img/food.jpeg";

const MenuItem = ({ image, name, desc, price, id, handleDelete }) => {
  const { restaurantID } = useParams();
  //const token = sessionStorage.getItem("token");

  return (
    <li className="menu-item-card" id={id}>
      {sessionStorage.getItem("token") &&
        String(sessionStorage.getItem("restaurant_id")) ===
          String(restaurantID) && (
          <button className="delete-btn" onClick={handleDelete}>
            X
          </button>
        )}
      <div className="menu-item-card-header">
        <img
          className="menu-image"
          src={image ? image : defaultImage}
          alt="menu item"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "10px 0 0 10px",
          }}
        />
      </div>
      <div className="menu-item-card-body">
        <div className="menu-item-card-title-container">
          <h1 className="menu-item-card-title">{name}</h1>
        </div>
        <div className="menu-item-card-text-container">
          <p className="menu-item-card-text">{desc}</p>
        </div>
        <div className="menu-item-card-author-container">
          <p className="menu-item-card-author">{`$ ${price}`}</p>
        </div>
      </div>
    </li>
  );
};

export default MenuItem;
