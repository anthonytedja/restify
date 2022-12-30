import "../../assets/bootstrap/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "../../assets/css/registration-form.css";
import "../../assets/fonts/fontawesome-all.min.css";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

import defaultAvatar from "../../assets/img/default-avatar.png";

const ProfilePage = () => {
  let navigate = useNavigate();

  const [errorStatus, setErrorStatus] = useState("none");
  const [errorMsg, setErrorMsg] = useState(
    "Incorrect login information. Please try again."
  );

  const username = sessionStorage.getItem("username");
  const [avatar, setAvatar] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/error/401");
    }

    fetch(
      `https://anthonytedja.pythonanywhere.com/accounts/${username}/edit/`,
      {
        method: "GET",
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      }
    )
      .then((res) => {
        if (res.status >= 400) {
          setAvatar("");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhoneNum("");
          setPassword("");
          throw Error(res.status);
        }
        return res.json();
      })
      .then((res) => {
        setAvatar(res.avatar ? res.avatar : defaultAvatar);
        setFirstName(res.first_name ? res.first_name : "");
        setLastName(res.last_name ? res.last_name : "");
        setEmail(res.email ? res.email : "");
        setPhoneNum(res.phone_num ? res.phone_num : "");
      })
      .catch((error) => {
        navigate("/error/".concat(error.message));
      });
  }, [navigate, username]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      setErrorMsg("Email and password are required.");
      setErrorStatus("block");
      return;
    }
    if (password !== password2) {
      setErrorMsg("Passwords do not match.");
      setErrorStatus("block");
      return;
    }

    const data = new FormData();
    [
      ["username", username],
      ["email", email],
      ["password", password],
      ["first_name", firstName],
      ["last_name", lastName],
      ["phone_num", phoneNum],
    ].forEach((value, index) => {
      data.append(value[0], value[1]);
    });
    let fileInput = document.querySelector('input[type="file"]');
    if (fileInput.files.length === 1) {
      data.append("avatar", fileInput.files[0]);
    }

    fetch(
      `https://anthonytedja.pythonanywhere.com/accounts/${username}/edit/`,
      {
        method: "PUT",
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
        body: data,
      }
    )
      .then((res) => {
        if (res.status === 400) {
          console.log(res.details);
          setErrorMsg("Some fields are invalid.");
          setErrorStatus("block");
          return;
        } else if (res.status > 400) {
          throw Error(res);
        }
        setErrorStatus("none");
      })
      .catch((error) => console.log(error))
      .then((res) => {
        navigate("/");
      });
  };

  const logout = (event) => {
    event.preventDefault();
    fetch(`https://anthonytedja.pythonanywhere.com/accounts/logout/`, {
      method: "GET",
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    });
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("restaurant_id");
    navigate("/");
  };

  const handleAvatarSelect = (e) => {
    if (e.target.files.length !== 1) {
      return;
    }
    const imageURL = URL.createObjectURL(e.target.files[0]);
    setAvatar(imageURL);
    return () => URL.revokeObjectURL(imageURL);
  };

  return (
    <>
      <NavBar />
      <main
        className="page lanidng-page"
        style={{ background: "var(--bs-light)", minHeight: "100vh" }}
      >
        <section style={{ marginBottom: "-75px" }}>
          <div className="container">
            <div className="mx-auto header-content">
              {" "}
              <div className="caption v-middle text-center">
                <h1 className="cd-headline clip">
                  <span className="blc" />
                  <span className="cd-words-wrapper">
                    <b className="is-visible">Profile.</b>
                    <b>Edit.</b>
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </section>
        <section className="form-section" style={{ padding: "0px" }}>
          <div className="form-container">
            <form
              className="needs-validation"
              noValidate
              style={{ borderRadius: 10 }}
              onSubmit={logout}
            >
              <button
                className="btn btn-primary d-block w-100"
                type="submit"
                style={{ background: "lightblue" }}
                value="save"
              >
                Logout
              </button>
            </form>
          </div>
        </section>
        <section className="form-section" style={{ padding: "20px 0px" }}>
          <div className="form-container">
            <form
              className="needs-validation"
              noValidate
              style={{ borderRadius: 10 }}
              onSubmit={handleSubmit}
            >
              <h2 className="text-center">Edit Account Details</h2>
              <div
                className="avatar"
                style={{ backgroundImage: `url(${avatar})` }}
              />
              <div className="mb-3">
                <label className="form-label" htmlFor="profilepicture">
                  Profile Picture
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="profilepicture"
                  name="profilepicture"
                  accept="image/*"
                  onChange={handleAvatarSelect}
                />
                <div className="invalid-feedback">
                  Please provide first name.
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="fname">
                  First Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="fname"
                  name="fname"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  required
                />
                <div className="invalid-feedback">
                  Please provide first name.
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="lname">
                  Last Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="lname"
                  name="lname"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  required
                />
                <div className="invalid-feedback">
                  Please provide last name.
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
                <div className="invalid-feedback">
                  Please provide a valid email.
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  className="form-control"
                  type="tel"
                  id="phone"
                  name="phone"
                  value={phoneNum}
                  onChange={(e) => {
                    setPhoneNum(e.target.value);
                  }}
                  maxLength={10}
                  required
                />
                <div className="invalid-feedback">
                  Please provide a valid phone number.
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
                <div className="invalid-feedback">
                  Please provide a valid password.
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="password2">
                  Repeat Password
                </label>
                <input
                  className="form-control"
                  type="password"
                  id="password2"
                  name="password2"
                  value={password2}
                  onChange={(e) => {
                    setPassword2(e.target.value);
                  }}
                  required
                />
                <div className="invalid-feedback">
                  Please provide a valid password.
                </div>
              </div>
              <p className="error-msg" style={{ display: errorStatus }}>
                {errorMsg}
              </p>
              <div className="mb-3" style={{ display: "flex" }}>
                <Link
                  className="btn btn-primary d-block w-50"
                  style={{ background: "var(--bs-gray-200)", marginRight: 5 }}
                  to="/"
                >
                  Cancel
                </Link>
                <button
                  className="btn btn-primary d-block w-50"
                  type="submit"
                  style={{ background: "lightblue", marginLeft: 5 }}
                  value="save"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ProfilePage;
