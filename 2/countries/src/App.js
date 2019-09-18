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
        console.log(response.data[0])
        setCountries(response.data);
        setFiltered(response.data);
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  console.log(countries)
  
  if (search === '') {
    return (
      <>
        <Search countries={countries} search={search} setSearch={setSearch} setFiltered={setFiltered} />
      </>

    )
  }

  return (
    <>
      <Search countries={countries} search={ search } setSearch={ setSearch } setFiltered={ setFiltered } />
      <Show countries={filtered} />
    </>
  )
}

export default App;
