import "../../assets/bootstrap/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "../../assets/css/blog-feed.css";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const BlogCard = ({ title, body, date, restaurant, id }) => {
  let navigate = useNavigate();
  const [restaurantName, setRestaurantName] = useState("");

  useEffect(() => {
    fetch(
      `https://anthonytedja.pythonanywhere.com/restaurants/${restaurant}/name/`
    )
      .then((res) => {
        if (res.status >= 400) {
          throw Error(res.status);
        }
        return res.json();
      })
      .then((res) => setRestaurantName(res.name))
      .catch((error) => navigate("/error/".concat(error.message)));
  }, [navigate, restaurant]);

  return (
    <li className="blog-card">
      <Link
        className="page-link-p1"
        to={`/restaurants/${restaurant}/blogs/${id}`}
      >
        <div className="blog-card-body">
          <div className="blog-card-title-container">
            <h1 className="blog-card-title">{title}</h1>
          </div>
          <div className="blog-card-text-container">
            <p className="blog-card-text">{body}</p>
          </div>
          <div className="blog-card-author-container">
            <p className="blog-card-author">{date.slice(0, 10)}</p>
            <Link to={`/restaurants/${restaurant}`}>
              <button
                className="btn btn-primary"
                style={{
                  backgroundColor: "lightcoral",
                  position: "absolute",
                  right: "1vh",
                  bottom: "1vh",
                }}
              >
                {restaurantName}&nbsp;
              </button>
            </Link>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default BlogCard;
