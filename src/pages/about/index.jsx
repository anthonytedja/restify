import "../../assets/bootstrap/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "../../assets/fonts/fontawesome-all.min.css";
import "../../assets/css/typing-animation.css";

import iphone from "../../assets/img/iphone.png";
import iphone_screen from "../../assets/img/demo.jpg";

import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

const AboutPage = () => {
  return (
    <>
      <NavBar />
      <header
        className="masthead page"
        style={{ background: "var(--bs-light)" }}
      >
        <div className="container h-100">
          <div className="row h-100">
            <div className="col-lg-7 my-auto">
              <div className="mx-auto header-content">
                {" "}
                <div className="caption v-middle text-center">
                  <h1 className="cd-headline clip">
                    <span className="blc" />
                    <span className="cd-words-wrapper">
                      <b className="is-visible">Discover.</b>
                      <b>Connect.</b>
                      <b>Restify.</b>
                    </span>
                  </h1>
                </div>
                <p style={{ padding: "0 20%" }}>
                  Your go to social media for all foodies out there! Connect
                  with your favourite eateries or share and grow your brand with
                  our amazing community!
                </p>
                <p style={{ padding: "0 20%" }}>
                  Learn more about our developers{" "}
                  <a href="https://github.com/anthonytedja">Anthony Tedja</a>{" "}
                  and <a href="https://github.com/kevshinXP">Kevin Shin</a>.
                </p>
                <Link
                  className="btn btn-light action-button mx-auto"
                  role="button"
                  to="/accounts/register"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "20%",
                    minWidth: 150,
                    backgroundColor: "#fdcc52",
                    marginTop: 40,
                  }}
                >
                  Sign Up
                </Link>
              </div>
            </div>
            <div className="col-lg-5 my-auto" style={{ paddingTop: "5em" }}>
              <div className="device-container">
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                  <div className="device-mockup iphone6_plus portrait white">
                    <div
                      className="device"
                      style={{ backgroundImage: "url(" + iphone + ")" }}
                    >
                      <div className="screen">
                        <img
                          className="img-fluid selector"
                          alt="App in Appstore"
                          src={iphone_screen}
                          style={{
                            transform:
                              "translateY(-3px) scaleX(0.98) scaleY(0.98)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="iphone-mockup" />
            </div>
          </div>
        </div>
      </header>
      <Footer />
    </>
  );
};

export default AboutPage;
