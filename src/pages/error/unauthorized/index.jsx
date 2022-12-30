import "../../../assets/bootstrap/css/bootstrap.min.css";
import "../../../assets/css/style.css";
import "../../../assets/fonts/fontawesome-all.min.css";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";

const UnauthorizedPage = () => {
  let navigate = useNavigate();

  useEffect(() => {
    window.onpopstate = () => {
      navigate(-1);
    };
  }, [navigate]);

  return (
    <>
      <NavBar />
      <main
        className="page landing-page"
        style={{ background: "var(--bs-light)", minHeight: "100vh" }}
      >
        <section>
          <div className="caption v-middle text-center">
            <h1 className="cd-headline clip">
              <span className="blc" />
              <span className="cd-words-wrapper">
                <b className="is-visible">401 Unauthorized</b>
              </span>
            </h1>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default UnauthorizedPage;
