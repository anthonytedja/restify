import "../../assets/bootstrap/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "../../assets/css/blog-feed.css";
import "../../assets/css/Profile-Card.css";
import "./style.css";

import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import RestaurantBlogCard from "../../components/RestaurantBlogCard";
import MenuItems from "../../components/MenuItems";
import Comments from "../../components/Comments";
import Blogs from "../../components/Blogs";
import RestaurantImages from "../../components/RestaurantImages";

import defaultHeader from "../../assets/img/restaurant-header.jpg";
import defaultLogo from "../../assets/img/restaurant.png";
import defaultFoodImage from "../../assets/img/food.jpeg";


const RestaurantPage = () => {
    let navigate = useNavigate();
    const { restaurantID } = useParams();
    const editvisibility = !sessionStorage.getItem("token") ? "hidden" :
        (sessionStorage.getItem("restaurant_id") !== restaurantID) ? "hidden" : "visible";

    const [likes, setLikes] = useState(0);
    const [followers, setFollowers] = useState(0);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [header, setHeader] = useState("");
    const [logo, setLogo] = useState("");

    const [likePressed, setLikePressed] = useState("");
    const [likeBtnColor, setLikeBtnColor] = useState("lightblue");
    const [likeBtnIcon, setLikeBtnIcon] = useState("far fa-heart");
    const [followPressed, setFollowPressed] = useState("");
    const [followBtnColor, setFollowBtnColor] = useState("lightblue");
    const [followBtnIcon, setFollowBtnIcon] = useState("fas fa-user-plus");

    useEffect(() => {
        fetch(`https://anthonytedja.pythonanywhere.com/restaurants/${restaurantID}`)
            .then(res => {
                if (res.status >= 400) {
                    throw Error(res.status);
                }
                return res.json()
            })
            .then(res => {
                setLikes(res.likes);
                setFollowers(res.followers);
                setDescription(res.description);
                setName(res.name);
                setDescription(res.description);
                setAddress(res.address);
                setPhoneNum(res.phone_num);
                setPostalCode(res.postal_code);
                setHeader(res.header_image);
                setLogo(res.logo);
            })
            .catch(error => {
                navigate("/error/".concat(error.message));
            });

        if (!sessionStorage.getItem("token")) {
            return;
        }
        fetch(`https://anthonytedja.pythonanywhere.com/restaurants/${restaurantID}/follow/`, {
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
                setFollowPressed(res.follows);
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
    useEffect(() => {
        if (followPressed === "yes") {
            setFollowBtnColor("#fdcc52");
            setFollowBtnIcon("fas fa-user-minus");
        } else {
            setFollowBtnColor("lightblue");
            setFollowBtnIcon("fas fa-user-plus");
        }
    }, [followPressed]);

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

        fetch(`https://anthonytedja.pythonanywhere.com/restaurants/${restaurantID}/likes/`, {
            method: "POST",
            headers: {
                "Authorization": sessionStorage.getItem("token")
            }
        })
            .catch(error => {
                navigate("/error/".concat(error.message));
            });
    }
    const handleFollow = (e) => {
        if (!sessionStorage.getItem("token")) {
            return;
        }

        if (followPressed === "yes") {
            setFollowPressed("no");
            setFollowers(followers - 1);
        } else {
            setFollowPressed("yes");
            setFollowers(followers + 1);
        }

        fetch(`https://anthonytedja.pythonanywhere.com/restaurants/${restaurantID}/follow/`, {
            method: "POST",
            headers: {
                "Authorization": sessionStorage.getItem("token")
            }
        })
            .catch(error => {
                navigate("/error/".concat(error.message));
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
                                <b className="is-visible">{name}</b>
                            </span>
                        </h1>
                    </div>
                        <section className="form-section" style={{ padding: 20 }}>
                            <div className="mx-auto" style={{ maxWidth: 1000, display: 'block' }}><a className="active" href="#" />
                                <div className="profile-card">
                                    <div className="profile-back" style={{ backgroundImage: `url(${header ? "https://anthonytedja.pythonanywhere.com/media/" + header : 'linear-gradient(35deg, #CCFFFF, #FFCCCC)'})` }} />
                                    <img className="rounded-circle profile-pic" src={logo ? "https://anthonytedja.pythonanywhere.com/media/" + logo : defaultLogo} />
                                    <button className="btn btn-primary restaurant-button" type="submit" style={{ backgroundColor: likeBtnColor }} onClick={handleLike} >{likes}&nbsp;<i className={likeBtnIcon} /></button>
                                    <button className="btn btn-primary restaurant-button" type="submit" style={{ backgroundColor: followBtnColor }} onClick={handleFollow} >{followers}&nbsp;<i className={followBtnIcon} /></button>
                                    <Link className="btn btn-primary restaurant-button" style={{ backgroundColor: 'lightgrey', visibility: editvisibility }} to={`/restaurants/${restaurantID}/edit`} >Edit <i className={"fas fa-cog"} /></Link>
                                    <h3 className="profile-name">{name}</h3>
                                    <p><i className="fas fa-location-arrow" />&nbsp; {address}</p>
                                    <p><i className="fas fa-search-location" />&nbsp; {postalCode}</p>
                                    <p><i className="fas fa-phone-alt" />&nbsp; {phoneNum}</p>
                                    <p>{description}</p>
                                </div>
                            </div>
                        </section>
                    </div>
                    <RestaurantImages />
                    <br></br>
                    <br></br>
                    <div className="mx-auto header-content">				<div className="caption v-middle text-center">
                        <h1 className="cd-headline clip">
                            <span className="blc" />
                            <span className="cd-words-wrapper">
                                <b className="is-visible">Menu.</b>
                            </span>
                        </h1>
                    </div></div>
                    <MenuItems />
                    <br></br>
                    <br></br>
                    <div className="mx-auto header-content">				<div className="caption v-middle text-center">
                        <h1 className="cd-headline clip">
                            <span className="blc" />
                            <span className="cd-words-wrapper">
                                <b className="is-visible">Blogs.</b>
                            </span>
                        </h1>
                    </div></div>
                    <Blogs />
                    <br></br>
                    <br></br>
                    <div className="mx-auto header-content">				<div className="caption v-middle text-center">
                        <h1 className="cd-headline clip">
                            <span className="blc" />
                            <span className="cd-words-wrapper">
                                <b className="is-visible">Comments.</b>
                            </span>
                        </h1>
                    </div></div>
                    <Comments />
                </section>

            </main>

            <Footer />
        </>
    )
}

export default RestaurantPage;