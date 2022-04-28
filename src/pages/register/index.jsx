import "../../assets/bootstrap/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "../../assets/css/registration-form.css";
import "../../assets/fonts/fontawesome-all.min.css";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";


const RegisterPage = () => {
    let navigate = useNavigate();

    const [errorStatus, setErrorStatus] = useState("none");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch("https://anthonytedja.pythonanywhere.com/accounts/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username, email: email, password: password })
        })
            .then(res => {
                if (res.status >= 400) {
                    throw Error(res.status);
                }
                setErrorStatus("none");
                navigate("/accounts/login");
            })
            .catch((error) => {
                console.log(error);
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
                                <b className="is-visible">Register.</b>
                            </span>
                        </h1>
                    </div>
                        <section className="form-section" style={{ padding: '20px 0px' }}>
                            <div className="form-container">
                                <form className="needs-validation" noValidate style={{ borderRadius: 10 }} onSubmit={handleSubmit}>
                                    <p className="error-msg" style={{ display: errorStatus }}>Incorrect login information. Please try again.</p>
                                    <div className="mb-3"><input className="form-control" type="text" id="username" name="username" required placeholder="Username" value={username} onChange={(e) => { setUsername(e.target.value) }} /><div className="invalid-feedback">Please provide a valid username.</div></div>
                                    <div className="mb-3"><input className="form-control" type="email" id="email" name="email" required placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} /><div className="invalid-feedback">Please provide a valid password.</div></div>
                                    <div className="mb-3"><input className="form-control" type="password" id="password" name="password" required placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} /><div className="invalid-feedback">Please provide a valid password.</div></div>
                                    <div className="mb-3"><button className="btn btn-primary d-block w-100" type="submit" style={{ background: 'lightblue' }} value="register">Register</button></div>
                                    <Link className="already" to="/terms">You agree to our <strong>Terms and Policies</strong> by signing up.</Link>
                                    <br></br>
                                    <Link className="already" to="/accounts/login">Have an account? <strong>Login here.</strong></Link>
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

export default RegisterPage;