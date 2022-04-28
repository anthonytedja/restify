import "../../assets/bootstrap/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "./style.css";

import { useParams } from "react-router-dom";

const RestaurantImage = ({ image, id, handleDelete }) => {
    const { restaurantID } = useParams();
    console.log(image);

    return (
        <li className="restaurant-image" id={id}>
            {sessionStorage.getItem("token") && String(sessionStorage.getItem("restaurant_id")) === String(restaurantID) &&
                <button className="delete-btn" onClick={handleDelete}>X</button>
            }
            <div className="i-container"><img className="r-image" src={image} /></div>
        </li>
    );
}

export default RestaurantImage;