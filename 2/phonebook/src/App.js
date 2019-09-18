import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Phonebook from './components/Phonebook';
import axios from 'axios';

const App = () => {
  const [filter, setFilter] = useState('');
  const [phonebook, setPhonebook] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        setPhonebook(response.data);
        setFiltered(response.data);
      })
      .catch((error) => {
        console.log("Houston, we have a problem: \n", error);
      })
  }, []);

  console.log(phonebook);
  
  
  return (
  <>
    <h1>Phonebook</h1> 
    <Filter phonebook={phonebook} filtered={filtered} setFiltered={setFiltered} />

    <h1>Add a new</h1>
    <PersonForm phonebook={ phonebook } setPhonebook={ setPhonebook } setFiltered={ setFiltered } setFilter={ setFilter } />

    <h1> Numbers </h1>
    {filtered.map(address => <Phonebook key={address.id} address={address} />)}
    
  </>
  )
}

export default App;
