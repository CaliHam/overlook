// IMPORTS
import { setData } from './scripts.js'

// FETCH REQUESTS

const getData = (data) => {
    return fetch(`http://localhost:3001/api/v1/${data}`)
    .then(response => response.json())
    .catch(err => console.log(err))
};

const postData = (data) => {
    fetch('http://localhost:3001/api/v1/bookings', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(resolve => {
            console.log(resolve)
            setData()
        })
        .catch(err => console.log("ERROR", err));
};

const getAllData = () => {
    return Promise.all([ getData('customers'), getData('bookings'), getData('rooms') ]);
};

export {
    getData,
    postData,
    getAllData
}