// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import './scss/styles.scss';
import dayjs from 'dayjs';


// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import '../dist/images/Overlook-logo.png'
import { getData, getUser, postData, getAllData } from './apiCalls';
import { displayBookings, displayTotal, displayUsername, displayAvailableRooms, } from './DOM-updates'
import { getTotalCost, validateDate, findAvailableRooms } from './booking-utilities';

let currentCustomer;
let currentBookings;
let bookedRooms;
let allCustomers;
let allBookings;
let allRooms;
let availableRooms;
let formattedDate;
let newlyBookedRoom;

const loginUser = (num) => {
	getUser(num)
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
		bookedRooms = findRooms(response, currentBookings)
		displayTotal(getTotalCost(bookedRooms))
		displayBookings(currentBookings, bookedRooms)
    })
}

const checkAvailability = (date) => {
	formattedDate = validateDate(date)
	const allRoomNumbers = allRooms.map(room => room.number)
	const unavailableRooms = allBookings.filter(booking => booking.date === formattedDate).map(room => room.roomNumber)
	const roomsReady = allRoomNumbers.filter(room => !unavailableRooms.includes(room))
	availableRooms = findAvailableRooms(roomsReady)
	displayAvailableRooms(availableRooms, date)
}

const filterRooms = (filterType) => {
	if (!filterType) {return}
	const filteredRooms = availableRooms.filter(room => room.roomType === filterType)
	displayAvailableRooms(filteredRooms, formattedDate, filterType)
}

const bookRoom = (newRoom) => {
	newlyBookedRoom = allRooms.find(room => room.number === parseInt(newRoom))
	const newId = String(Date.now());
	const newBooking = {
		"id": newId,
		"userID": currentCustomer.id,
		"date": formattedDate.toString(),
		"roomNumber": parseInt(newRoom)
	}
	postData(newBooking)
} 

export {
	loginUser,
	checkAvailability,
	validateDate,
	filterRooms,
	bookRoom,
	setData,
	getCurrentBookings,
	currentCustomer,
	newlyBookedRoom
}