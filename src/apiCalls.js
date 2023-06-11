// IMPORTS
import { setData } from './scripts.js'
import { confirmBooking } from './DOM-updates.js'

// FETCH REQUESTS

const getData = (data) => {
    return fetch(`http://localhost:3001/api/v1/${data}`)
    .then(response => response.json())
    .catch(err => console.log(err))
};

const getUser = (num) => {
    return fetch(`http://localhost:3001/api/v1/customers/${num}`)
    .then(response => response.json())
    .catch(err => console.log(err))
}

const postData = (data) => {
    fetch('http://localhost:3001/api/v1/bookings', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(resolve => {
            confirmBooking(resolve.newBooking)
            setData()
        })
        .catch(err => console.log("ERROR", err));
};

const getAllData = () => {
    return Promise.all([ getData('customers'), getData('bookings'), getData('rooms') ]);
};

export {
    getData,
    getUser,
    postData,
    getAllData
}