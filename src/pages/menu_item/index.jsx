import "../../assets/bootstrap/css/bootstrap.min.css";
import "../../assets/css/style.css";

import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

import defaultLogo from "../../assets/img/restaurant.png";

const MenuItemPage = () => {
    let navigate = useNavigate();
    const { restaurantID, menuID } = useParams();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [avatar, setAvatar] = useState("");

    const deletevisibility = !sessionStorage.getItem("token") ? "hidden" :
        (sessionStorage.getItem("restaurant_id") !== restaurantID) ? "hidden" : "visible";

    useEffect(() => {
        fetch(`https://anthonytedja.pythonanywhere.com/restaurants/${restaurantID}/menu/${menuID}`)
            .then(res => {
                if (res.status >= 400) {
                    throw Error(res.status);
                }
                return res.json()
            })
            .then(res => {
                setName(res.name);
                setDescription(res.description);
                setPrice(res.price);
                setAvatar(res.image);
            })
            .catch(error => {
                navigate("/error/".concat(error.message));
            });
    }, []);

    const deleteitem = (e) => {
        if (!sessionStorage.getItem("token")) {
            return;
        }

        fetch(`https://anthonytedja.pythonanywhere.com/restaurants/${restaurantID}/menu/${menuID}/delete/`, {
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
                                <b className="is-visible">Menu Item.</b>
                            </span>
                        </h1>
                    </div>
                        <section className="form-section" style={{ padding: 20 }}>
                            <div className="mx-auto" style={{ maxWidth: 600, display: 'block' }}>
                                <div className="avatar" style={{ backgroundImage: avatar ? `url(https://anthonytedja.pythonanywhere.com/media/${avatar})` : `url(${defaultLogo})` }} />
                                <p><strong>{name}</strong></p>
                                <p><strong>$ {price}</strong></p>
                                <p>{description}</p>
                                <a className="active" href="#" />
                                <button className="btn btn-primary" type="submit" style={{ backgroundColor: "lightcoral", visibility: deletevisibility }} onClick={deleteitem}>Delete <i className={"fas fa-trash"} /></button>
                            </div>
                        </section>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default MenuItemPage;