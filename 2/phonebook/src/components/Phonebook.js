import React from 'react'
import phoneService from './addresses'

const baseUrl = 'http://localhost:3001/persons';
const Phonebook = ({ address, setFiltered, setPhonebook}) => 
        <li> 
            {address.name + ' '} 
            {address.number + ' '}
            <button key={`button${address.id}`} onClick={() => {
                if (window.confirm(`Are you sure you want to delete ${address.name}?`))
                    phoneService
                        .deleteObject(address.id)
                        .then(data => {
                            phoneService.getAll().then(data => {
                                console.log(data);
                                setFiltered([...data])
                                setPhonebook([...data])
                            }) 
                        })
                        
                }}>
                delete
            </button>
        </li>

export default Phonebook