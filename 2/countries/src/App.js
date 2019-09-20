import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Search from './components/Search'
import Show from './components/Show'

const App = () => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios
      .get('/rest/v2/all')        
      .then((response)=> {
        setCountries(response.data);
        setFiltered(response.data);
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  var count = -1000;

  if (search === '') {
    return (
      <>
        <Search countries={countries} search={search} setSearch={setSearch} setFiltered={setFiltered} />
      </>

    )
  }

  return (
    <>
      <Search key='search' countries={countries} search={ search } setSearch={ setSearch } setFiltered={ setFiltered } />
      <Show key='show' countries={filtered} />
    </>
  )
}

export default App;
