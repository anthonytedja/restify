import "../../../assets/bootstrap/css/bootstrap.min.css";
import "../../../assets/css/style.css";
import "../../../assets/css/registration-form.css";
import "../../../assets/fonts/fontawesome-all.min.css";

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const FormMenuItem = () => {
    let navigate = useNavigate();
    const { restaurantID } = useParams();

    const [errorStatus, setErrorStatus] = useState("none");
    const [errorMsg, setErrorMsg] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name || !price || !description) {
            setErrorMsg("Name, price and description are required.");
            setErrorStatus("block");
            return;
        }
        let imageInput = document.getElementById("m-image");

        if (imageInput.files.length !== 1) {
            setErrorMsg("One image is required.");
            setErrorStatus("block");
            return;
        }


        const data = new FormData();
        [["name", name], ["price", price], ["description", description]].forEach((value, index) => {
            data.append(value[0], value[1]);
        });
        data.append("image", imageInput.files[0]);

        fetch(`https://anthonytedja.pythonanywhere.com/restaurants/${restaurantID}/menu/add/`, {
            method: "POST",
            headers: {
                "Authorization": sessionStorage.getItem("token")
            },
            body: data
        })
            .then(res => {
                if (res.status >= 400) {
                    throw Error(res.status);
                }
                setErrorStatus("none");
                return res.json();
            })
            .then(res => {
                navigate(`/restaurants/${restaurantID}`);
            })
            .catch((error) => {
                console.log(error);
                setErrorMsg("Some fields are invalid.");
                setErrorStatus("block");
            });
    }

    return (
        <section className="form-section" style={{ padding: '20px 0px' }}>
            <div className="form-container">
                <form className="needs-validation" method="post" noValidate style={{ borderRadius: 10 }} onSubmit={handleSubmit}>
                    <h2 className="text-center">Add Menu Item</h2>
                    <div className="mb-3"><label className="form-label" htmlFor="profilepicture">Image</label><input className="form-control" type="file" id="m-image" name="image" accept="image/*" required /><div className="invalid-feedback">Please provide an image.</div></div>
                    <div className="mb-3"><label className="form-label" htmlFor="lname">Dish Name</label><input className="form-control" type="text" id="m-name" name="name" value={name} onChange={(e) => { setName(e.target.value) }} required /><div className="invalid-feedback">Please provide a dish name.</div></div>
                    <div className="mb-3"><label className="form-label" htmlFor="lname">Price</label><input className="form-control" type="number" id="m-price" name="price" value={price} onChange={(e) => { setPrice(e.target.value) }} required /><div className="invalid-feedback">Please provide a price.</div></div>
                    <div className="mb-3"><label className="form-label" htmlFor="lname">Description</label><textarea className="form-control" id="m-description" name="m-description" value={description} onChange={(e) => { setDescription(e.target.value) }} required placeholder="Enter a description" /><div className="invalid-feedback">Please provide a description.</div></div>
                    <p className="error-msg" style={{ display: errorStatus }}>{errorMsg}</p>
                    <div className="mb-3"><button className="btn btn-primary d-block w-100" type="submit" style={{ background: 'lightblue' }} value="signin">Add Dish</button></div>
                </form>
            </div>
        </section>
    );
}

export default FormMenuItem;