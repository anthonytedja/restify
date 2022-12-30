import "../../assets/bootstrap/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "../../assets/fonts/fontawesome-all.min.css";

import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

const TermsPage = () => {
  return (
    <>
      <NavBar />
      <main
        className="page landing-page"
        style={{ background: "var(--bs-light)" }}
      >
        <section>
          <div className="mx-auto header-content">
            {" "}
            <div className="caption v-middle text-center">
              <h1 className="cd-headline clip">
                <span className="blc" />
                <span className="cd-words-wrapper">
                  <b className="is-visible">Terms and Policies</b>
                </span>
              </h1>
            </div>
            <section className="form-section" style={{ padding: 20 }}>
              <div
                className="mx-auto"
                style={{ maxWidth: 600, display: "block" }}
              >
                <p>
                  <strong>Terms and Conditions</strong>
                </p>
                <p>
                  Uhhh don't do bad stuff on Restify... or in general. Bad
                  people will be banned by our mods &gt;:c
                </p>
                <p>
                  Each user can only have up to one account bc our servers can
                  handle the load :(
                </p>
                <p>
                  You must not link Restify in any way that damages our
                  reputation, pls.
                </p>
                <p>
                  You have to give{" "}
                  <a href="https://github.com/anthonytedja">Anthony Tedja</a>
                  &nbsp;and{" "}
                  <a href="https://github.com/kevshinXP">Kevin Shin</a>&nbsp;all
                  your v-bucks and if you don't know what that is, then you're
                  probably over 13 years old, our requirement to use Restify.
                </p>
                <p>
                  <strong>The Data Policy</strong>
                </p>
                <p>
                  We have all the rights to your data and any information you
                  give us lol what did you expect. If we get hacked or you have
                  an issue with us then we're not responsible so you can't
                  actually sue us.
                  <br />
                </p>
                <p>
                  We can modify, delete, or claim content produced on Restify as
                  ours and there's nothing you can do about it.
                </p>
                <p>tldr, we own you.</p>
                <p>Revised: February 9, 2022</p>
              </div>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default TermsPage;
