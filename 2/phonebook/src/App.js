import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Phonebook from './components/Phonebook'

const App = ({ addresses }) => {
  const [phonebook, setPhonebook] = useState([...addresses]);
  const [filtered, setFiltered] = useState([...phonebook]);
  const [filter, setFilter] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const addNumber = (event) => {
    event.preventDefault();
    
    const alreadyIn = phonebook.filter((address) => {
      return( address['name'] === name || address['number'] === number);
    }).length > 0
    
    console.log(alreadyIn);

    if (alreadyIn) {
      alert('Name or number already in the phonebook');
    } else {
      const address = {};
      address['name'] = name;
      address['number'] = number;
      setPhonebook(phonebook.concat(address));
      setFiltered(phonebook.concat(address));
      setFilter('')

    }
  }

  const handleName = (event) => {
    setName(event.target.value);
    console.log(event.target.value);
  }

  const handleNumber = (event) => {
    setNumber(event.target.value);
    console.log(event.target.value);
  }
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
    <h1>Phonebook</h1> 
    <form>
      filter shown with
      <input
        value={filter}
        onChange={filterAddresses}
      />
    </form>

    <h1>Add a new</h1>
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
    
    {filtered.map(address => <Phonebook address={address} />)}
  </>
  )
}

export default App;
