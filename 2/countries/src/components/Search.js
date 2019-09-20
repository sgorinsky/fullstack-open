import React from 'react'

const Search = ({ countries, search, setSearch, setFiltered }) => {
    
    const updateSearch = (event) => {
        setSearch(event.target.value); 
        
        // setSearch updates a letter late, so filtering based on form input
        setFiltered(countries.filter((country) => 
            country['name'].toLowerCase().includes(event.target.value.toLowerCase())
        ))
    }

    return (
        <>
            <form>
                find countries: {' '/* for whitespace */} 
                <input 
                    value={search}
                    onChange={updateSearch}
                />
            </form>
        </>
    )
}

export default Search
