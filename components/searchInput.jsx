import {useEffect, useState} from "react";
import fetchSearchProducts from "../client/fetch/fetchSearchProduct";
import {Empty} from "../client/utils";
import Link from 'next/link';

import {Spinner} from "./index";

export default function SearchInput({title}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [isLoading, setLoading] = useState(false);


    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value);
        setSearchResult([]);
    }

    const handleBlur = () => {
        setSearchResult([]);
    }

    useEffect(async() => {
        if (searchTerm) {
            setLoading(true);
            const result = await fetchSearchProducts(searchTerm);
            setLoading(false);

            if (result.data) {
                setSearchResult(result.data);
            }
        }
    }, [searchTerm]);

    return <div className="search-input">
        <input onBlur={handleBlur} onChange={handleSearchTerm} value={searchTerm} placeholder={title} type="text"/>
        <div className="search-input__icon">
            {!isLoading && <img height="14" width="13" alt="Поиск по сайту" src="/icons/union.svg"/>}
            {isLoading && <Spinner height={15} width={15} />}

        </div>
        {!Empty(searchResult) &&
        <div className="search-input__dropdown">
            {searchResult.map(product => (
                <div key={product.id} className="row">
                    <Link  href={`/product/${product.id}`}>
                        <a>{product.name}</a>
                    </Link>
                </div>
            ))}

        </div>
        }

    </div>
}
