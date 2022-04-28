import "../../assets/bootstrap/css/bootstrap.min.css";
import "../../assets/css/style.css";


const NothingHere = ({ optText }) => {
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <h1 style={{ margin: "5vh" }}>{optText ? optText : "There's nothing here yet."}</h1>
        </div>
    );
}

export default NothingHere;