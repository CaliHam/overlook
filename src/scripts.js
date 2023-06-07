// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import './scss/styles.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import '../dist/images/Overlook-logo.png'
import { getData } from './apiCalls';


// I should see a dashboard page that shows me:
// Any room bookings I have made (past or upcoming)
// The total amount I have spent on rooms
let currentCustomer;
let currentBookings;
// step 1: get customer
    // usually this would be retrieved from the user logging in. 
    // for now, we will use http://localhost:3001/api/v1/customers/<id> where<id> will be a number of a customer’s id

window.onload = () => {
    getData('customers/1')
    .then(response => {
        currentCustomer = response
        console.log(currentCustomer)
        getCurrentBookings(currentCustomer)
    })
}

// step 2: get bookings
    // the bookings have a key where the userID will match the customer.id
    // iterate through all bookings.userID to filter the ids that match
    // return an array of booking objects matching criteria

const getCurrentBookings = (currentCustomer) => {
    getData('bookings')
    .then(response => {
        currentBookings = response.bookings.filter(booking => booking.userID === currentCustomer.id)
        console.log(currentBookings)
    })
}

// step 3: display filtered bookings in table
    // in dom updates



// step 4: display total amount spent on rooms
    // use our filtered bookings array
    // iterate through rooms to match rooms.number to bookings.roomNumber
    // return the cost (map)(rooms.costPerNight) and add all those together
    // we will have access to each individual room cost and the total cost now
// step 5: display all data in table and style it