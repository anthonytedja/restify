import "../../assets/bootstrap/css/bootstrap.min.css";
import "../../assets/css/style.css";

import { Link } from "react-router-dom";

import logo from "../../assets/img/restaurant.png";

const NavBar = ({ onSubmit, onBlur }) => {
    const restaurantID = sessionStorage.getItem("restaurant_id") ? sessionStorage.getItem("restaurant_id") : "-1";
    const visibility = (window.location.pathname === "/") ? "visible" : "hidden";
    const visibilityIcon = (sessionStorage.getItem("token") ? "visible" : "hidden");

    const homepagelink = (window.location.pathname === "/") ? "#" : "/";
    const accountLink = sessionStorage.getItem("token") ? "/accounts" : "/accounts/login";
    const restaurantLink = !sessionStorage.getItem("token") ? "/accounts/login" :
        (sessionStorage.getItem("restaurant_id") === "-1") ? "/restaurants/create/" : `/restaurants/${sessionStorage.getItem("restaurant_id")}`;
    const addDataLink = !sessionStorage.getItem("token") ? "/accounts/login" :
        (sessionStorage.getItem("restaurant_id") === "-1") ? "/restaurants/create/" : `/restaurants/${restaurantID}/add/`;
    
    return (
        <nav className="navbar navbar-light navbar-expand-lg navigation-clean-search fixed-top" id="mainNav" style={{ backgroundColor: 'white', borderBottom: '1px solid var(--bs-gray-300)' }}>
            <div className="container"><Link className="navbar-brand" to={homepagelink}><img alt="Restify Logo" src={logo} style={{ maxHeight: 40, marginRight: 15 }} /><strong>Restify</strong></Link><button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1"><span className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon" /></button>
                <div className="collapse navbar-collapse" id="navcol-1">
                    <form className="me-auto search-form" onSubmit={onSubmit} target="_self" style={{ display: 'block', marginLeft: 'auto', width: '50%', marginTop: 10, marginBottom: 10, visibility: visibility }}>
                        <div className="d-flex align-items-center"><label className="form-label d-flex mb-0" htmlFor="search-field" /><input className="form-control search-field" type="search" id="search-field-2" name="search" placeholder="Search Eateries" style={{ backgroundColor: 'var(--bs-light)' }} onBlur={onBlur} /></div>
                    </form>
                    <ul className="navbar-nav" style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <li className="nav-item" style={{ visibility: visibilityIcon }}><Link className="nav-link active" to="/accounts/feed"><i className="fas fa-pager" /></Link></li>
                        <li className="nav-item dropdown" style={{ visibility: visibilityIcon }}><Link className="nav-link" to={restaurantLink} aria-expanded="false" data-bs-toggle="dropdown"><i className="fas fa-hamburger" /></Link>
                            <div className="dropdown-menu dropdown-menu-end"><a className="dropdown-item" href="account/restaurant.html">Restaurant</a><a className="dropdown-item" href="#">Settings</a></div>
                        </li>
                        <li className="nav-item" style={{ visibility: visibilityIcon }}><Link className="nav-link active" to={addDataLink}><i className="fas fa-plus" /></Link></li>
                        <li className="nav-item dropdown" style={{ visibility: visibilityIcon }}><Link className="nav-link" to="/accounts/notifications/" aria-expanded="false" data-bs-toggle="dropdown"><i className="fas fa-bell" /></Link>
                            <div className="dropdown-menu dropdown-menu-end"><a className="dropdown-item" href="#">Notification 1</a><a className="dropdown-item" href="#">Notification 2</a></div>
                        </li>
                        <li className="nav-item dropdown"><Link className="nav-link" to={accountLink} aria-expanded="false" data-bs-toggle="dropdown"><i className="fas fa-user-circle" /></Link>
                            <div className="dropdown-menu dropdown-menu-end"><a className="dropdown-item" href="account/index.html">Account</a><a className="dropdown-item" href="#">Log Out</a></div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;