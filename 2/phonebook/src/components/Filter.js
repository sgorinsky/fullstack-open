import React , { useState } from 'react'

const Filter = ({ phonebook, filtered, setFiltered }) => {
    const [filter, setFilter] = useState('');

    const filterAddresses = (event) => {
        event.preventDefault();
        console.log(event.target.value);
        if (event.target.value !== '') {
            setFilter(event.target.value);
            setFiltered(phonebook.filter(address =>
                address.name.toLowerCase().includes(event.target.value.toLowerCase()) || address.number.includes(event.target.value)))
            console.log(filtered);
        } else {
            setFilter('');
            setFiltered(phonebook);
        }
    }
    return (
        <>
            <form>
                filter shown with:
                <input
                        value={filter}
                        onChange={filterAddresses}
                />
            </form>
        </>
    )
}

export default Filter