// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import './scss/styles.scss';


// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import '../dist/images/Overlook-logo.png'
import { getData } from './apiCalls';
import { displayBookings, displayTotal, displayUsername } from './DOM-updates'

let currentCustomer;
let currentBookings;
let bookedRooms;

window.onload = () => {
	getData('customers/20')
		.then(response => {
			currentCustomer = response
			getCurrentBookings(currentCustomer)
			displayUsername(currentCustomer)
	})
}

// DASHBOARD VIEW

const getCurrentBookings = (currentCustomer) => {
	getData('bookings')
		.then(response => {
			currentBookings = response.bookings.filter(booking => booking.userID === currentCustomer.id)
			getBookedRooms(currentBookings)
		})
}

const getBookedRooms = (currentBookings) => {
	getData('rooms')
    .then(response => {
			const roomNumbers = currentBookings.map(booking => booking.roomNumber)
			bookedRooms = roomNumbers.reduce((foundRooms, currRoom) => {
					const foundRoom = response.rooms.find(room => room.number === currRoom)
					foundRooms.push(foundRoom)
					return foundRooms
        }, [])
			displayTotal(getTotalCost(bookedRooms))
			displayBookings(currentBookings, bookedRooms)
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


// export {

// }