import "../../assets/bootstrap/css/bootstrap.min.css";
import "../../assets/css/style.css";

import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";


const BlogPage = () => {
    let navigate = useNavigate();
    const { restaurantID, blogID } = useParams();

    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [body, setBody] = useState("");
    const [likes, setLikes] = useState("");
    const [restaurantName, setRestaurantName] = useState("");

    const [likePressed, setLikePressed] = useState("");
    const [likeBtnColor, setLikeBtnColor] = useState("lightblue");
    const [likeBtnIcon, setLikeBtnIcon] = useState("far fa-heart");

    const deletevisibility = !sessionStorage.getItem("token") ? "hidden" :
        (sessionStorage.getItem("restaurant_id") !== restaurantID) ? "hidden" : "visible";

    useEffect(() => {
        fetch(`https://anthonytedja.pythonanywhere.com/restaurants/${restaurantID}/name/`)
            .then(res => {
                if (res.status >= 400) {
                    throw Error(res.status);
                }
                return res.json()
            })
            .then(res => setRestaurantName(res.name))
            .catch(error => navigate("/error/".concat(error.message)));

        fetch(`https://anthonytedja.pythonanywhere.com/restaurants/${restaurantID}/blog/${blogID}`)
            .then(res => {
                if (res.status >= 400) {
                    throw Error(res.status);
                }
                return res.json()
            })
            .then(res => {
                setTitle(res.title);
                setDate(res.date);
                setBody(res.body);
                setLikes(res.likes);
            })
            .catch(error => {
                navigate("/error/".concat(error.message));
            });

        if (!sessionStorage.getItem("token")) {
            return;
        }
        fetch(`https://anthonytedja.pythonanywhere.com/restaurants/${restaurantID}/blog/${blogID}/likes/`, {
            headers: {
                "Authorization": sessionStorage.getItem("token")
            }
        })
            .then(res => {
                if (res.status >= 400) {
                    throw Error(res.status);
                }
                return res.json()
            })
            .then(res => {
                setLikePressed(res.likes);
            })
            .catch(error => {
                navigate("/error/".concat(error.message));
            });
    }, []);

    useEffect(() => {
        if (likePressed === "yes") {
            setLikeBtnColor("rgb(225, 92, 138)");
            setLikeBtnIcon("fas fa-heart");
        } else {
            setLikeBtnColor("lightblue");
            setLikeBtnIcon("far fa-heart");
        }
    }, [likePressed]);

    const handleLike = (e) => {
        if (!sessionStorage.getItem("token")) {
            return;
        }

        if (likePressed === "yes") {
            setLikePressed("no");
            setLikes(likes - 1);
        } else {
            setLikePressed("yes");
            setLikes(likes + 1);
        }

        fetch(`https://anthonytedja.pythonanywhere.com/restaurants/${restaurantID}/blog/${blogID}/likes/`, {
            method: "POST",
            headers: {
                "Authorization": sessionStorage.getItem("token")
            }
        })
            .catch(error => {
                navigate("/error/".concat(error.message));
            });
    }

    const deleteblog = (e) => {
        if (!sessionStorage.getItem("token")) {
            return;
        }

        fetch(`https://anthonytedja.pythonanywhere.com/restaurants/${restaurantID}/blog/${blogID}/delete/`, {
            method: "DELETE",
            headers: {
                "Authorization": sessionStorage.getItem("token")
            }
        })
            .catch(error => {
                navigate("/error/".concat(error.message));
            })

            .then(res => {
                navigate(`/restaurants/${restaurantID}/`);
            });


    }

    return (
        <>
            <NavBar />
            <main className="page lanidng-page" style={{ background: 'var(--bs-light)', minHeight: '100vh' }}>
                <section>
                    <div className="mx-auto header-content">				<div className="caption v-middle text-center">
                        <h1 className="cd-headline clip">
                            <span className="blc" />
                            <span className="cd-words-wrapper">
                                <b className="is-visible">Blog Post.</b>
                            </span>
                        </h1>
                    </div>
                        <section className="form-section" style={{ padding: 20 }}>
                            <div className="mx-auto" style={{ maxWidth: 600, display: 'block' }}>
                                <h2><strong>{title}</strong></h2>
                                <p><strong>{date.slice(0, 10)}</strong></p>
                                <p>{body}</p>
                                <a className="active" href="#" />
                                <button className="btn btn-primary" type="submit" style={{ backgroundColor: likeBtnColor }} onClick={handleLike}>{likes}&nbsp;<i className={likeBtnIcon} /></button>
                                <button className="btn btn-primary" type="submit" style={{ margin: '0 0 0 15px', backgroundColor: "lightcoral", visibility: deletevisibility }} onClick={deleteblog}>Delete <i className={"fas fa-trash"} /></button>
                                <Link to={`/restaurants/${restaurantID}`} style={{ float: "right" }}><button className="btn btn-primary" style={{ backgroundColor: "lightcoral" }}>Visit {restaurantName}&nbsp;</button></Link>
                            </div>
                        </section>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default BlogPage;