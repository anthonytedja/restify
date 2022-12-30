import "../../../assets/bootstrap/css/bootstrap.min.css";
import "../../../assets/css/style.css";
import "../../../assets/css/registration-form.css";
import "../../../assets/fonts/fontawesome-all.min.css";

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const FormBlog = () => {
  let navigate = useNavigate();
  const { restaurantID } = useParams();

  const [errorStatus, setErrorStatus] = useState("none");
  const [errorMsg, setErrorMsg] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title || !body) {
      setErrorMsg("Title and body are required.");
      setErrorStatus("block");
      return;
    }

    fetch(
      `https://anthonytedja.pythonanywhere.com/restaurants/${restaurantID}/blog/add/`,
      {
        method: "POST",
        headers: {
          Authorization: sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          date: new Date().toISOString(),
          body: body,
        }),
      }
    )
      .then((res) => {
        if (res.status >= 400) {
          throw Error(res.status);
        }
        setErrorStatus("none");
        return res.json();
      })
      .then((res) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="form-section" style={{ padding: "20px 0px" }}>
      <div className="form-container">
        <form
          className="needs-validation"
          noValidate
          style={{ borderRadius: 10 }}
          onSubmit={handleSubmit}
        >
          <h2 className="text-center">Add Blog Post</h2>
          <div className="mb-3">
            <label className="form-label" htmlFor="title">
              Title
            </label>
            <input
              className="form-control"
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
            />
            <div className="invalid-feedback">Please provide a title.</div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="logo">
              Body
            </label>
            <textarea
              className="form-control"
              id="newblogpost"
              name="newblogpost"
              required
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
              }}
            />
            <div className="invalid-feedback">Please provide a body.</div>
          </div>
          <p className="error-msg" style={{ display: errorStatus }}>
            {errorMsg}
          </p>
          <div className="mb-3">
            <button
              className="btn btn-primary d-block w-100"
              type="submit"
              style={{ background: "lightblue" }}
              value="signin"
            >
              Add Blog
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default FormBlog;
