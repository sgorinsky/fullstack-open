import React, { useState } from 'react'

const PersonForm = ({ phonebook, setPhonebook, setFiltered, setFilter }) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const addNumber = (event) => {
        event.preventDefault();

        const alreadyIn = phonebook.filter((address) => {
            return (address['name'] === name || address['number'] === number);
        }).length > 0

        if (alreadyIn) {
            alert(`${name} already in phonebook`);
        } else {
            const address = {};
            
            address['name'] = name;
            address['number'] = number;
            
            setPhonebook(phonebook.concat(address));
            setFiltered(phonebook.concat(address));
            setFilter('');
            
        }
    }

    const handleName = (event) => {
        setName(event.target.value);
    }

    const handleNumber = (event) => {
        setNumber(event.target.value);
    }

    return (
        <form onSubmit={addNumber}>
            Name:
            <input
                value={name}
                onChange={handleName}
            />
            <br></br>
            Number:
            <input
                value={number}
                onChange={handleNumber}
            />
            <br></br>
            <button type="submit">add</button>
        </form>
    )
}

export default PersonForm