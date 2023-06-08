// IMPORTS


// FETCH REQUESTS

const getData = (data) => {
    return fetch(`http://localhost:3001/api/v1/${data}`)
    .then(response => response.json())
    .catch(err => console.log(err))
};

const getAllData = () => {
    return Promise.all([ getData('customers'), getData('bookings'), getData('rooms') ]);
};

// const postData 




export {
    getData,
    getAllData
}