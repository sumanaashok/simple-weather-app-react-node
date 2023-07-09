// The search city component of the weather app

import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

const SearchCity = ({ onSearchChange }) => {

    let callCitiesAPI = async (inputValue) => {
        const response = await fetch(`/cities?PreFix=${inputValue}`);
        const body = await response.json();
    
        if (response.status !== 200) {
          throw Error(body.message) 
        }
        return body;
    }

    const [search, setSearch] = useState(null);

    const loadOptions = (inputValue) => {
        return callCitiesAPI(inputValue)
            .then((response) => {
                return response}
            )
    };

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);

    };

    // Using Aysync Paginate to load options into the search box
    return (
        <AsyncPaginate
            placeholder="Search for City"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />

    );
};

export default SearchCity;

