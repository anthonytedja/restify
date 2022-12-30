import "../../assets/bootstrap/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "./style.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Comment = ({ author, body, date }) => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetch(`https://anthonytedja.pythonanywhere.com/accounts/${author}/name/`)
      .then((res) => {
        if (res.status >= 400) {
          throw Error(res.status);
        }
        return res.json();
      })
      .then((res) => setUsername(res.username))
      .catch((error) => navigate("/error/".concat(error.message)));
  }, [navigate, author]);

  return (
    <li className="restaurant-comment">
      <div className="restaurant-comment-header">
        <div className="comment-author-container">
          <p>@{username}</p>
        </div>
        <div className="comment-date-container">
          <p>{date.slice(0, 10)}</p>
        </div>
      </div>
      <p className="restaurant-comment-body">{body}</p>
    </li>
  );
};

export default Comment;
