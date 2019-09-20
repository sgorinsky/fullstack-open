import React, { useState } from 'react';
import phoneService from './addresses';

const PersonForm = ({ phonebook, setPhonebook, setFiltered, setFilter, setNotification }) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    
    const addNumber = (event) => {
        event.preventDefault();
        
        var current = phonebook.find(address => name.toLowerCase() === address.name.toLowerCase());

        if (current === undefined) {
            current = {
                name:' ',
                number:' '
            }
        }
        
        if (current.name === name && current.number === number) {
            alert(`${name} already in phonebook`);
        } else if (current.number !== number && current.name === name) {
            if (window.confirm(`${current.name} is already in the phonebook, would you like to change their number?`)) {
                const newNumber = { ...current, number: number };
                phoneService
                    .update(current.id, newNumber)
                    .then(data => {
                        phoneService.getAll().then(data => {
                            console.log(data);
                            setFiltered([...data]);
                            setPhonebook([...data]);
                            setName('');
                            setNumber('');
                        })
                    })
            }
        } else {
            const address = {
                name: name,
                number: number,
                id: phonebook.length+1
            };
            
            phoneService.create(address).then(setPhonebook(phonebook.concat(address)));
            setFiltered(phonebook.concat(address));
            setFilter('');
            setName('');
            setNumber('');
            setNotification(`Added ${address.name} to phonebook`);
            setTimeout(() => setNotification(null), 3000);
            
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