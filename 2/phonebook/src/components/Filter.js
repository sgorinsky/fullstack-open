import React from 'react'

const Filter = ({ addresses }) => {
    const [phonebook, setPhonebook] = useState([...addresses]);
    const [filtered, setFiltered] = useState([...phonebook]);
    const [filter, setFilter] = useState('');

    const filterAddresses = (event) => {
        event.preventDefault();
        console.log(event.target.value);
        if (event.target.value !== '') {
            setFilter(event.target.value);
            setFiltered(phonebook.filter(address => address.name.includes(event.target.value) || address.number.includes(event.target.value)))
            console.log(filtered);
        } else {
            setFilter('');
            setFiltered(phonebook);
        }
    }
    return (
        <form>
            filter shown with
        <input
                value={filter}
                onChange={filterAddresses}
            />
        </form>
    )
}

export default Filter