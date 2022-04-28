import "../../assets/bootstrap/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "./style.css";

import { useEffect, useState } from "react";

import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import RestaurantCard from "../../components/RestaurantCard";
import NothingHere from "../../components/NothingHere";

const IndexPage = () => {
    const [result, setResult] = useState({ "next": null, "results": [] });
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        {/* make request to API (initial) */ }
        fetch("https://anthonytedja.pythonanywhere.com/restaurants/search/?q=''")
            .then(res => res.json())
            .then(res => {
                setResult(res);
            });
    }, []);

    useEffect(() => {
        window.onscroll = () => {
            let documentHeight = document.body.scrollHeight;
            let currentScroll = window.scrollY + window.innerHeight;
            if (currentScroll + 10 >= documentHeight && result.next) {
                setPage(page + 1);
            }
        };
    }, [result]);

    useEffect(() => {
        window.onscroll = () => {
            let documentHeight = document.body.scrollHeight;
            let currentScroll = window.scrollY + window.innerHeight;
            if (currentScroll + 10 >= documentHeight && result.next) {
                setPage(page + 1);
            }
        };

        if (result.next) {
            {/* make request to API (new page) */ }
            fetch(result.next)
                .then(res => res.json())
                .then(res => {
                    setResult({ ...res, "results": result.results.concat(res.results) });
                });
        }
    }, [page]);

    const submitSearch = (event) => {
        event.preventDefault();
        setSearch(event.target.elements["search-field-2"].value);
    }
    useEffect(() => {
        {/* make request to API (new search) */ }
        fetch(`https://anthonytedja.pythonanywhere.com/restaurants/search/?q=${search}`)
            .then(res => res.json())
            .then(res => {
                setResult(res);
            });
    }, [search])

    const onBlur = (e) => {
        setSearch(e.target.value);
    }

    return (
        <>
            <NavBar onSubmit={submitSearch} onBlur={onBlur} />
            <main className="page landing-page" style={{ background: 'var(--bs-light)', minHeight: '100vh' }}>
                <section>
                    <div className="caption v-middle text-center">
                        <h1 className="cd-headline clip">
                            <span className="blc" />
                            <span className="cd-words-wrapper">
                                <b className="is-visible">Restify.</b>
                            </span>
                        </h1>
                    </div>
                    <div className="body-pad-header">
                        <ul className="search-results" style={{ maxWidth: '1200px' }}>
                            {result.results.map((restaurant, index) => (
                                <RestaurantCard
                                    key={index}
                                    title={restaurant.name}
                                    desc={restaurant.description}
                                    id={restaurant.id}
                                    logo={restaurant.logo ? restaurant.logo : undefined}
                                    header={restaurant.header_image ? restaurant.header_image : undefined}
                                />
                            ))}
                        </ul>
                        {result.results.length == 0 &&
                            <NothingHere optText={`No results found for “${search}”`} />
                        }
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default IndexPage;