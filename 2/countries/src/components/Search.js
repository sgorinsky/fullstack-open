import React from 'react'

const Search = ({ countries, search, setSearch, setFiltered }) => {
    
    const updateSearch = (event) => {
        console.log(event.target.value);
        setSearch(event.target.value);
        setFiltered(countries.filter((country) => 
            country['name'].toLowerCase().includes(search.toLowerCase())
        ))
    }

    return (
        <>
            find countries 
            <form>
                <input 
                    onChange={updateSearch}
                    value={search}
                />
            </form>
        </>

    )
}

export default Search
