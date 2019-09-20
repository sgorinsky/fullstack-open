import React from 'react'
import phoneService from './addresses'

const baseUrl = 'http://localhost:3001/persons';
const Phonebook = ({ address, setFiltered, setPhonebook, setNotification, setError }) => 
        <li> 
            {address.name + ' '} 
            {address.number + ' '}
            <button key={`button${address.id}`} onClick={() => {
                if (window.confirm(`Are you sure you want to delete ${address.name}?`))
                    phoneService
                        .deleteObject(address.id)
                        .then(response => {
                            phoneService.getAll().then(data => {
                                console.log(data);
                                setFiltered([...data])
                                setPhonebook([...data])
                            }) 
                        })
                        .catch(response => {
                            phoneService.getAll().then(data => {
                                setError(true);
                                setNotification(`${address.name} already deleted from phonebook`);
                                setFiltered([...data]);
                                setPhonebook([...data]);
                                setTimeout(() => {
                                    setNotification(null)
                                    setError(false)
                                }, 3000);
                            })
                        })
                        
                }}>
                delete
            </button>
        </li>

export default Phonebook