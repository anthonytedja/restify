import "../../assets/bootstrap/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "../../assets/css/registration-form.css";
import "../../assets/fonts/fontawesome-all.min.css";

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import FormBlog from "../../components/forms/FormBlog";
import FormMenuItem from "../../components/forms/FormMenuItem";
import FormImage from "../../components/forms/FormImage";

const AddDataPage = () => {
  let navigate = useNavigate();
  const { restaurantID } = useParams();

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/error/401");
    }
    if (sessionStorage.getItem("restaurant_id") !== restaurantID) {
      navigate("/error/403");
    }
  }, [navigate, restaurantID]);

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
                  <b className="is-visible">Add Data.</b>
                </span>
              </h1>
            </div>
            <FormBlog />
            <FormMenuItem />
            <FormImage />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AddDataPage;
