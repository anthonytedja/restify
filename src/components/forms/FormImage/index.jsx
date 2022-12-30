import "../../../assets/bootstrap/css/bootstrap.min.css";
import "../../../assets/css/style.css";
import "../../../assets/css/registration-form.css";
import "../../../assets/fonts/fontawesome-all.min.css";

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const FormImage = () => {
  let navigate = useNavigate();
  const { restaurantID } = useParams();

  const [errorStatus, setErrorStatus] = useState("none");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let imageInput = document.getElementById("i-image");
    if (imageInput.files.length !== 1) {
      setErrorMsg("One image is required.");
      setErrorStatus("block");
      return;
    }

    const data = new FormData();
    data.append("image", imageInput.files[0]);

    fetch(
      `https://anthonytedja.pythonanywhere.com/restaurants/${restaurantID}/picture/add/`,
      {
        method: "POST",
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
        body: data,
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
        navigate(`/restaurants/${restaurantID}`);
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg("The image provided is invalid.");
        setErrorStatus("block");
      });
  };

  return (
    <section className="form-section" style={{ padding: "20px 0px" }}>
      <div className="form-container">
        <form
          className="needs-validation"
          method="post"
          noValidate
          style={{ borderRadius: 10 }}
          onSubmit={handleSubmit}
        >
          <h2 className="text-center">Add Restaurant Image</h2>
          <div className="mb-3">
            <label className="form-label" htmlFor="profilepicture">
              Image
            </label>
            <input
              className="form-control"
              type="file"
              id="i-image"
              name="image"
              accept="image/*"
              required
            />
            <div className="invalid-feedback">Please provide an image.</div>
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
              Add Image
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default FormImage;
