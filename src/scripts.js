// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import './scss/styles.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import '../dist/images/Overlook-logo.png'
import { getData } from './apiCalls';
import { displayBookings } from './DOM-updates'

// I should see a dashboard page that shows me:
// Any room bookings I have made (past or upcoming)
// The total amount I have spent on rooms
let currentCustomer;
let currentBookings;
let bookedRooms;
// step 1: get customer
    // usually this would be retrieved from the user logging in. 
    // for now, we will use http://localhost:3001/api/v1/customers/<id> where<id> will be a number of a customer’s id

window.onload = () => {
    getData('customers/1')
    .then(response => {
        currentCustomer = response
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
        displayBookings(currentBookings)
        getBookedRooms(currentBookings)
    })
}

// step 3: display filtered bookings in table
    // DONE - in dom updates

// step 4: display total amount spent on rooms
    // ahhh we have to get the rooms now too
    // use our filtered bookings array
    // iterate through rooms to match rooms.number to bookings.roomNumber
    // return the cost (map)(rooms.costPerNight) and add all those together
    // we will have access to each individual room cost and the total cost now

const getBookedRooms = (currentBookings) => {
    getData('rooms')
    .then(response => {
        const roomNumbers = currentBookings.map(booking => booking.roomNumber)
        bookedRooms = roomNumbers.reduce((foundRooms, currRoom) => {
            const foundRoom = response.rooms.find(room => room.number === currRoom)
            foundRooms.push(foundRoom)
            return foundRooms
        }, [])
        console.log('booked rooms', bookedRooms)
        // update the table with each cost per night (dom/newfunction = displayCosts)
        console.log(getTotalCost(bookedRooms))
    })
}

const getTotalCost = (rooms) => {
    const totalCost = rooms.reduce((cost, currRoom) => {
        cost += currRoom.costPerNight;
        return cost
    }, 0)
    const formattedCost = totalCost.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    return formattedCost
}

// step 5: display all data in table and style it

// export {

// }