// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import './scss/styles.scss';
import dayjs from 'dayjs';


// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import '../dist/images/Overlook-logo.png'
import { getData, getAllData } from './apiCalls';
import { displayBookings, displayTotal, displayUsername, displayAvailableRooms } from './DOM-updates'

let currentCustomer;
let currentBookings;
let bookedRooms;
let allCustomers;
let allBookings;
let allRooms;

window.onload = () => {
	getData('customers/20')
		.then(response => {
			currentCustomer = response
			getCurrentBookings(currentCustomer)
			displayUsername(currentCustomer)
	})
	setData();
}

const setData = () => {
  getAllData().then(data => {
    allCustomers = data[0].customers;
    allBookings = data[1].bookings;
    allRooms = data[2].rooms;
  });
};

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

// ✅ I should be able to select a date for which I’d like to book a room for myself
// ✅ Upon selecting a date, I should be shown a list of room details for only rooms that are available on that date
// I should be able to filter the list of available rooms by their roomType property
// I should be able to select a room for booking
// In the event that no rooms are available for the date/roomType selected, display a message fiercely 
	// apologizing to the user and asking them to adjust their room search

const checkAvailability = (date) => {
	const formattedDate = dayjs(date).format('YYYY/MM/DD')
	const allRoomNumbers = allRooms.map(room => room.number)
	const unavailableRooms = allBookings.filter(booking => booking.date === formattedDate).map(room => room.roomNumber)
	const roomsReady = allRoomNumbers.filter(room => !unavailableRooms.includes(room))
	const availableRooms = roomsReady.reduce((acc, currNum) => {
		let foundRoom = allRooms.find(room => room.number === currNum)
		acc.push(foundRoom)
		return acc
	},[])
	displayAvailableRooms(availableRooms, date)
	// filterRooms(availableRooms)
}

// const filterRooms = (rooms) => {

// }

export {
	checkAvailability
}