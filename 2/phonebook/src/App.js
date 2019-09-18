import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Phonebook from './components/Phonebook';

const App = ({ addresses }) => {
  const [filter, setFilter] = useState('');
  const [phonebook, setPhonebook] = useState([...addresses]);
  const [filtered, setFiltered] = useState([...phonebook]);

  var count = 0;
  
  console.log(phonebook)
  return (
  <>
    <h1>Phonebook</h1> 
    <Filter phonebook={phonebook} filtered={filtered} setFiltered={setFiltered} />

    <h1>Add a new</h1>
    <PersonForm phonebook={ phonebook } setPhonebook={ setPhonebook } setFiltered={ setFiltered } />

    <h1> Numbers </h1>
    {filtered.map(address => <Phonebook key={count++} address={address} />)}
    
  </>
  )
}

export default App;
