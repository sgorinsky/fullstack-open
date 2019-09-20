import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Phonebook from './components/Phonebook';
import phoneService from './components/addresses'



const App = () => {
  const [filter, setFilter] = useState('');
  const [phonebook, setPhonebook] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    phoneService
      .getAll()
      .then(initialData => {
        setPhonebook(initialData);
        setFiltered(initialData);
      })
      .catch((error) => {
        console.log("Houston, we have a problem: \n", error);
      })
    }, []);
  
  
  
  const currentAddresses = filtered.map(address => {
      return (
        <>
          <Phonebook key={address.id} address={address} setPhonebook={setPhonebook} setFiltered={setFiltered}/>
        </>
      )
    })
  return (
  <>
    <h1>Phonebook</h1> 
    <Filter phonebook={phonebook} filtered={filtered} setFiltered={setFiltered} />

    <h1>Add a new</h1>
    <PersonForm phonebook={ phonebook } 
                setPhonebook={ setPhonebook } 
                setFiltered={ setFiltered } 
                setFilter={ setFilter } 
    />

    <h1> Numbers </h1>
    { currentAddresses }
    
  </>
  )
}

export default App;
