import "../../assets/bootstrap/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "../../assets/css/blog-feed.css";
import "../../assets/fonts/fontawesome-all.min.css";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import BlogCard from "../BlogCard";
import NothingHere from "../NothingHere";

const Blogs = () => {
    let navigate = useNavigate();
    const { restaurantID } = useParams();

    const [result, setResult] = useState({ "next": null, "results": [] });

    useEffect(() => {
        fetch(`https://anthonytedja.pythonanywhere.com/restaurants/${restaurantID}/blog/all/`)
            .then(res => {
                if (res.status >= 400) {
                    throw Error(res.status);
                }
                return res.json()
            })
            .then(res => setResult(res))
            .catch(error => navigate("/error/".concat(error.message)));
    }, []);

    const handleLoadMore = (e) => {
        if (result.next) {
            fetch(result.next)
                .then(res => res.json())
                .then(res => {
                    setResult({ ...res, "results": result.results.concat(res.results) });
                });
        }
    }

    return (
        <>
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
                {result.next &&
                    <button className="btn btn-primary" style={{ alignSelf: "center", backgroundColor: "lightblue" }} onClick={handleLoadMore}>Load More</button>
                }
            </ul>
            {result.results.length === 0 &&
                <NothingHere />
            }
        </>
    )
}

export default Blogs;