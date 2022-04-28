import "../../assets/bootstrap/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "../../assets/css/blog-feed.css";
import "../../assets/fonts/fontawesome-all.min.css";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import RestaurantImage from "../RestaurantImage";
import NothingHere from "../NothingHere";

const RestaurantImages = () => {
    let navigate = useNavigate();
    const { restaurantID } = useParams();

    const [result, setResult] = useState({ "next": null, "results": [] });

    useEffect(() => {
        fetch(`https://anthonytedja.pythonanywhere.com/restaurants/${restaurantID}/picture/all/`)
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

    const handleDelete = (event) => {
        const pictureID = event.target.parentElement.getAttribute("id");
        fetch(`https://anthonytedja.pythonanywhere.com/restaurants/${restaurantID}/picture/${pictureID}/delete/`, {
            method: "DELETE",
            headers: {
                "Authorization": sessionStorage.getItem("token")
            }
        })
            .then(res => {
                console.log(res);
                if (res.status >= 400) {
                    throw Error(res.status);
                }
                let newResult = result.results.filter(picture => String(picture.id) !== String(pictureID));
                setResult({ ...result, "results": newResult });
            })
            .catch(error => navigate("/error/".concat(error.message)));
    }

    return (
        <>
            <ul className="restaurant-image-container mx-auto" style={{ maxWidth: 1100 }}>
                {result.results.map((picture, index) => (
                    <RestaurantImage
                        key={index}
                        image={picture.image}
                        id={picture.id}
                        handleDelete={handleDelete}
                    />
                ))}
            </ul>
            <div style={{ display: "flex", justifyContent: "center" }}>
                {result.next &&
                    <button className="btn btn-primary" onClick={handleLoadMore} style={{ alignSelf: "center", backgroundColor: "lightblue" }}>Load More</button>
                }
            </div>
        </>
    )
}

export default RestaurantImages;