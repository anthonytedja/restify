import "../../assets/bootstrap/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "../../assets/css/blog-feed.css";
import "../../assets/fonts/fontawesome-all.min.css";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import MenuItem from "../MenuItem";
import NothingHere from "../NothingHere";

const MenuItems = () => {
  let navigate = useNavigate();
  const { restaurantID } = useParams();

  const [result, setResult] = useState({ next: null, results: [] });

  useEffect(() => {
    fetch(
      `https://anthonytedja.pythonanywhere.com/restaurants/${restaurantID}/menu/all/`
    )
      .then((res) => {
        if (res.status >= 400) {
          throw Error(res.status);
        }
        return res.json();
      })
      .then((res) => setResult(res))
      .catch((error) => navigate("/error/".concat(error.message)));
  }, [navigate, restaurantID]);

  const handleLoadMore = (e) => {
    if (result.next) {
      fetch(result.next)
        .then((res) => res.json())
        .then((res) => {
          setResult({ ...res, results: result.results.concat(res.results) });
        });
    }
  };

  const handleDelete = (event) => {
    const itemID = event.target.parentElement.getAttribute("id");
    fetch(
      `https://anthonytedja.pythonanywhere.com/restaurants/${restaurantID}/menu/${itemID}/delete/`,
      {
        method: "DELETE",
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      }
    )
      .then((res) => {
        console.log(res);
        if (res.status >= 400) {
          throw Error(res.status);
        }
        let newResult = result.results.filter(
          (item) => String(item.id) !== String(itemID)
        );
        setResult({ ...result, results: newResult });
      })
      .catch((error) => navigate("/error/".concat(error.message)));
  };

  return (
    <>
      <ul className="blog-feed">
        {result.results.map((menuItem, index) => (
          <MenuItem
            key={`menu-${index}`}
            image={menuItem.image}
            name={menuItem.name}
            desc={menuItem.description}
            price={menuItem.price}
            id={menuItem.id}
            handleDelete={handleDelete}
          />
        ))}
        {result.next && (
          <button
            className="btn btn-primary"
            style={{ alignSelf: "center", backgroundColor: "lightblue" }}
            onClick={handleLoadMore}
          >
            Load More
          </button>
        )}
      </ul>
      {result.results.length === 0 && <NothingHere />}
    </>
  );
};

export default MenuItems;
