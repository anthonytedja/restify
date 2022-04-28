import "../../assets/bootstrap/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "../../assets/css/registration-form.css";
import "../../assets/fonts/fontawesome-all.min.css";

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";


const LoginPage = () => {
    let navigate = useNavigate();

    const [errorStatus, setErrorStatus] = useState("none");
    const [errorMsg, setErrorMsg] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch("https://anthonytedja.pythonanywhere.com/accounts/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username, password: password })
        })
            .then(res => {
                if (res.status >= 400) {
                    throw Error(res.status);
                }
                return res.json()
            })
            .then(res => {
                sessionStorage.setItem("token", "Token ".concat(res.token));
            })
            .then(() => {
                fetch(`https://anthonytedja.pythonanywhere.com/accounts/${username}/edit/`, {
                    method: "GET",
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
                        sessionStorage.setItem("username", res.username);
                        sessionStorage.setItem("user_id", res.id);
                        sessionStorage.setItem("restaurant_id", res.restaurant_id ? res.restaurant_id : "-1");
                        setErrorStatus("none");
                        navigate("/");
                    })
            })
            .catch((error) => {
                setErrorMsg("Incorrect login information. Please try again.");
                setErrorStatus("block");
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
                                <b className="is-visible">Login.</b>
                            </span>
                        </h1>
                    </div>
                        <section className="form-section" style={{ padding: '20px 0px' }}>
                            <div className="form-container">
                                <form className="needs-validation" noValidate style={{ borderRadius: 10 }} onSubmit={handleSubmit}>
                                    <p className="error-msg" style={{ display: errorStatus }}>{errorMsg}</p>
                                    <div className="mb-3"><input className="form-control" type="text" id="username" name="username" required placeholder="Username" value={username} onChange={(event) => { setUsername(event.target.value) }} /><div className="invalid-feedback">Please provide a valid username.</div></div>
                                    <div className="mb-3"><input className="form-control" type="password" id="password" name="password" required placeholder="Password" value={password} onChange={(event) => { setPassword(event.target.value) }} /><div className="invalid-feedback">Please provide a valid password.</div></div>
                                    <div className="mb-3"><button className="btn btn-primary d-block w-100" type="submit" style={{ background: 'lightblue' }} value="signin">Sign In</button></div>
                                    <Link className="already" to="/accounts/register">New to Restify? <strong>Signup here.</strong></Link>
                                </form>
                            </div>
                        </section>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default LoginPage;