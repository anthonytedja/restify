import "../../assets/bootstrap/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "../../assets/css/blog-feed.css";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const createNotificationTitle = (type, user, restaurant) => {
    switch (type) {
        case "follow":
            return "New Follower";
        case "like":
            return "Like";
        case "comment":
            return "Comment";
        case "blog":
            return "New Blog";
        case "menu_item":
            return "Menu Change";
    }
}

const createNotificationBody = (type, user, restaurant) => {
    switch (type) {
        case "follow":
            return `${user} has started following you`;
        case "like":
            return `${user} liked your restaurant page`;
        case "comment":
            return `${user} has commented on your page`;
        case "blog":
            return `${restaurant} posted a new blog`;
        case "menu_item":
            return `${restaurant} updated their menu`;
    }
}

const NotificationCard = ({ type, user, restaurant, date }) => {
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [restaurantName, setRestaurantName] = useState("");

    useEffect(() => {
        fetch(`https://anthonytedja.pythonanywhere.com/accounts/${user}/name/`)
            .then(res => {
                if (res.status >= 400) {
                    throw Error(res.status);
                }
                return res.json()
            })
            .then(res => setUsername("@" + res.username))
            .catch(error => navigate("/error/".concat(error.message)));

        fetch(`https://anthonytedja.pythonanywhere.com/restaurants/${restaurant}/name/`)
            .then(res => {
                if (res.status >= 400) {
                    throw Error(res.status);
                }
                return res.json()
            })
            .then(res => setRestaurantName(res.name))
            .catch(error => navigate("/error/".concat(error.message)));
    }, []);


    return (
        <li className="blog-card">
            <Link to={`/restaurants/${restaurant}`}>
                <p style={{ position: "absolute", bottom: "5px", right: "20px" }}>{date.substring(0, 10)}</p>
                <div className="blog-card-header" />
                <div className="blog-card-body">
                    <div className="blog-card-title-container">
                        <h1 className="blog-card-title">{createNotificationTitle(type, username, restaurantName)}</h1>
                    </div>
                    <div className="blog-card-text-container">
                        <p className="blog-card-text">{createNotificationBody(type, username, restaurantName)}</p>
                    </div>
                    <div className="blog-card-author-container">
                        <p className="blog-card-author"></p>
                    </div>
                </div>
            </Link>
        </li >
    );
}

export default NotificationCard;