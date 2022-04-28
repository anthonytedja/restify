import "../../assets/bootstrap/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "./style.css";

const RestaurantBlogCard = ({ title, body, date, image, id }) => {
    return (
        <li className="blog-card">
            <div className="blog-card-header" />
            <div className="blog-card-body">
                <div className="blog-card-title-container">
                <h1 className="blog-card-title">{title}</h1>
                </div>
                <div className="blog-card-text-container">
                <p className="blog-card-text">{body}</p>
                </div>
                <div className="blog-card-author-container">
                <p className="blog-card-author">{date}</p>
                <a className="blog-card-link" href="../blog/blog.html"><i className="fas fa-arrow-circle-right" /></a>
                </div>
            </div>
        </li>
    );
}

export default RestaurantBlogCard;