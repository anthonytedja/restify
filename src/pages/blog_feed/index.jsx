import "../../assets/bootstrap/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "../../assets/css/blog-feed.css";
import "../../assets/fonts/fontawesome-all.min.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import BlogCard from "../../components/BlogCard";
import NothingHere from "../../components/NothingHere";

const BlogFeedPage = () => {
  let navigate = useNavigate();

  const [result, setResult] = useState({ next: null, results: [] });
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("https://anthonytedja.pythonanywhere.com/restaurants/feed/", {
      method: "GET",
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.status >= 400) {
          throw Error(res.status);
        }
        return res.json();
      })
      .then((res) => {
        setResult(res);
      })
      .catch((error) => {
        if (error.message === "401") {
          navigate("/accounts/login");
          return;
        }
        navigate("/error/".concat(error.message));
      });
  }, [navigate]);

  useEffect(() => {
    window.onscroll = () => {
      let documentHeight = document.body.scrollHeight;
      let currentScroll = window.scrollY + window.innerHeight;
      if (currentScroll + 10 >= documentHeight && result.next) {
        setPage(page + 1);
      }
    };
  }, [result, page]);

  useEffect(() => {
    window.onscroll = () => {
      let documentHeight = document.body.scrollHeight;
      let currentScroll = window.scrollY + window.innerHeight;
      if (currentScroll + 10 >= documentHeight && result.next) {
        setPage(page + 1);
      }
    };

    if (result.next) {
      fetch(result.next, {
        method: "GET",
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setResult({ ...res, results: result.results.concat(res.results) });
        });
    }
  }, [page, result]);

  return (
    <>
      <NavBar />
      <main
        className="page lanidng-page"
        style={{ background: "var(--bs-light)", minHeight: "100vh" }}
      >
        <section>
          <div className="caption v-middle text-center">
            <h1 className="cd-headline clip">
              <span className="blc" />
              <span className="cd-words-wrapper">
                <b className="is-visible">Blog Feed.</b>
              </span>
            </h1>
          </div>
          <div className="body-pad-header">
            <ul className="blog-feed">
              {result.results.map((blog, index) => (
                <BlogCard
                  key={index}
                  title={blog.title}
                  body={blog.body}
                  date={blog.date}
                  restaurant={blog.restaurant}
                  id={blog.id}
                />
              ))}
            </ul>
            {result.results.length === 0 && <NothingHere />}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default BlogFeedPage;
