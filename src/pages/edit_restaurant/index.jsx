import "../../assets/bootstrap/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "../../assets/css/registration-form.css";
import "../../assets/fonts/fontawesome-all.min.css";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

import defaultLogo from "../../assets/img/restaurant.png";

const EditRestaurantPage = () => {
  let navigate = useNavigate();
  const { restaurantID } = useParams();
  //const userID = sessionStorage.getItem("user_id") ? sessionStorage.getItem("user_id") : "-1";

  const [errorStatus, setErrorStatus] = useState("none");
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/error/401");
    }
    if (sessionStorage.getItem("restaurant_id") !== restaurantID) {
      navigate("/error/403");
    }

    fetch(`https://anthonytedja.pythonanywhere.com/restaurants/${restaurantID}`)
      .then((res) => {
        if (res.status >= 400) {
          throw Error(res.status);
        }
        return res.json();
      })
      .then((res) => {
        setLogo(
          res.logo
            ? `https://anthonytedja.pythonanywhere.com/media/${res.logo}`
            : defaultLogo
        );
        setName(res.name ? res.name : "");
        setAddress(res.address ? res.address : "");
        setPostalCode(res.postal_code ? res.postal_code : "");
        setPhoneNum(res.phone_num ? res.phone_num : "");
        setDescription(res.description ? res.description : "");
      })
      .catch((error) => {
        navigate("/error/".concat(error.message));
      });
  }, [navigate, restaurantID]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();
    [
      ["name", name],
      ["address", address],
      ["postal_code", postalCode],
      ["phone_num", phoneNum],
      ["description", description],
    ].forEach((value, index) => {
      if (value[1]) {
        data.append(value[0], value[1]);
      }
    });
    let headerFileInput = document.getElementById("headerimage");
    if (headerFileInput.files.length === 1) {
      data.append("header", headerFileInput.files[0]);
    }
    let logoFileInput = document.getElementById("logo");
    if (logoFileInput.files.length === 1) {
      data.append("logo", logoFileInput.files[0]);
    }

    fetch(
      `https://anthonytedja.pythonanywhere.com/restaurants/${restaurantID}/info/edit/`,
      {
        method: "PATCH",
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
        setErrorMsg("Some fields are invalid.");
        setErrorStatus("block");
      });
  };

  const handleLogoSelect = (e) => {
    if (e.target.files.length !== 1) {
      return;
    }
    const imageURL = URL.createObjectURL(e.target.files[0]);
    setLogo(imageURL);
    return () => URL.revokeObjectURL(imageURL);
  };

  return (
    <>
      <NavBar />
      <main
        className="page lanidng-page"
        style={{ background: "var(--bs-light)", minHeight: "100vh" }}
      >
        <section>
          <div className="mx-auto header-content">
            {" "}
            <div className="caption v-middle text-center">
              <h1 className="cd-headline clip">
                <span className="blc" />
                <span className="cd-words-wrapper">
                  <b className="is-visible">Edit Your Restaurant.</b>
                </span>
              </h1>
            </div>
            <section className="form-section" style={{ padding: "20px 0px" }}>
              <div className="form-container">
                <form
                  className="needs-validation"
                  noValidate
                  style={{ borderRadius: 10, position: "relative" }}
                  onSubmit={handleSubmit}
                >
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img
                      className="rounded-circle profile-pic"
                      src={logo}
                      alt="logo"
                      style={{ margin: "0" }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="profilepicture">
                      Logo
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="logo"
                      name="logo"
                      accept="image/*"
                      onChange={handleLogoSelect}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="profilepicture">
                      Banner
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="headerimage"
                      name="headerimage"
                      accept="image/*"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <div className="invalid-feedback">
                      Please provide a valid name.
                    </div>
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="text"
                      id="address"
                      name="address"
                      required
                      placeholder="Address"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                    <div className="invalid-feedback">
                      Please provide a valid address.
                    </div>
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="text"
                      id="postal_code"
                      name="postal_code"
                      required
                      placeholder="Postal Code"
                      value={postalCode}
                      onChange={(e) => {
                        setPostalCode(e.target.value);
                      }}
                    />
                    <div className="invalid-feedback">
                      Please provide a valid postal code.
                    </div>
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="text"
                      id="phone_num"
                      name="phone_num"
                      required
                      placeholder="Phone Number"
                      value={phoneNum}
                      onChange={(e) => {
                        setPhoneNum(e.target.value);
                      }}
                    />
                    <div className="invalid-feedback">
                      Please provide a valid phone number.
                    </div>
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      type="text"
                      id="description"
                      name="description"
                      required
                      placeholder="Restaurant Description"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                    <div className="invalid-feedback">
                      Please provide a valid description.
                    </div>
                  </div>
                  <p className="error-msg" style={{ display: errorStatus }}>
                    {errorMsg}
                  </p>
                  <div className="mb-3">
                    <button
                      className="btn btn-primary d-block w-100"
                      type="submit"
                      style={{ background: "lightblue" }}
                      value="register"
                    >
                      Edit
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default EditRestaurantPage;
