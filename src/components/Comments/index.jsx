import "../../assets/bootstrap/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "../../assets/css/blog-feed.css";
import "../../assets/fonts/fontawesome-all.min.css";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Comment from "../Comment";
import NothingHere from "../NothingHere";

const Comments = () => {
  let navigate = useNavigate();
  const { restaurantID } = useParams();

  const [result, setResult] = useState({ next: null, results: [] });
  const [commentValue, setCommentValue] = useState("");

  useEffect(() => {
    fetch(
      `https://anthonytedja.pythonanywhere.com/restaurants/${restaurantID}/comment/all/`
    )
      .then((res) => {
        if (res.status >= 400) {
          throw Error(res.status);
        }
        return res.json();
      })
      .then((res) => setResult(res))
      .catch((error) => navigate("/error/".concat(error.message)));
  }, [navigate, restaurantID]);

  const handleLoadMore = (e) => {
    if (result.next) {
      fetch(result.next)
        .then((res) => res.json())
        .then((res) => {
          setResult({ ...res, results: result.results.concat(res.results) });
        });
    }
  };

  const addComment = (e) => {
    e.preventDefault();

    fetch(
      `https://anthonytedja.pythonanywhere.com/restaurants/${restaurantID}/comment/`,
      {
        method: "POST",
        headers: {
          Authorization: sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: sessionStorage.getItem("user_id"),
          date: new Date().toISOString(),
          body: commentValue,
        }),
      }
    )
      .then((res) => {
        if (res.status >= 400) {
          throw Error(res.status);
        }
      })
      .catch((error) => navigate("/error/".concat(error.message)))
      .then((res) => {
        navigate(`/`);
      });
  };

  return (
    <>
      <ul className="blog-feed mx-auto" style={{ maxWidth: 1200 }}>
        {result.results.map((comment, index) => (
          <Comment
            key={`comment-${index}`}
            author={comment.user}
            date={comment.date}
            body={comment.body}
          />
        ))}
        {result.next && (
          <button
            className="btn btn-primary"
            style={{ alignSelf: "center", backgroundColor: "lightblue" }}
            onClick={handleLoadMore}
          >
            Load More
          </button>
        )}
      </ul>
      {sessionStorage.getItem("token") && (
        <section className="form-section" style={{ padding: "20px 0px" }}>
          <div className="form-container">
            <form
              className="needs-validation"
              method="post"
              noValidate
              style={{ borderRadius: 10 }}
              onSubmit={addComment}
            >
              <div className="mb-3">
                <textarea
                  className="form-control"
                  id="comment"
                  name="comment"
                  required
                  placeholder="Comment"
                  value={commentValue}
                  onChange={(e) => {
                    setCommentValue(e.target.value);
                  }}
                />
                <div className="invalid-feedback">Please provide comment.</div>
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-primary d-block w-100"
                  type="submit"
                  style={{ background: "#fdcc52" }}
                  value="comment"
                >
                  Add Comment
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
      {!sessionStorage.getItem("token") && result.results.length === 0 && (
        <NothingHere />
      )}
    </>
  );
};

export default Comments;
