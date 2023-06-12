// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import './scss/styles.scss';


// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import '../dist/images/Overlook-logo.png'
import { getData, getUser, postData, getAllData } from './apiCalls';
import { displayBookings, displayTotal, displayUsername, displayAvailableRooms, displayManagerView, renderBookingsTable, displayCustomer } from './DOM-updates'
import { getTotalCost, validateDate, findRooms, getOpenRooms, getUnavailableRooms } from './booking-utilities';

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

const loginManager = () => {
	setData().then(data => {
		getTodaysData()
	})
}

const setData = () => {
  return getAllData().then(data => {
    allCustomers = data[0].customers;
    allBookings = data[1].bookings;
    allRooms = data[2].rooms;
  });
};

// DASHBOARD VIEW

const getCurrentBookings = (currentCustomer, tableType) => {
	getData('bookings')
		.then(response => {
			currentBookings = response.bookings.filter(booking => booking.userID === currentCustomer.id)
			getBookedRooms(currentBookings, tableType)
		})
}

const getBookedRooms = (currentBookings, tableType) => {
	getData('rooms')
    .then(response => {
		allRooms = response.rooms
		const roomNumbers = currentBookings.map(booking => booking.roomNumber)
		bookedRooms = findRooms(roomNumbers, allRooms)
		renderBookingsTable(tableType)
		displayTotal(getTotalCost(bookedRooms))
		displayBookings(currentBookings, bookedRooms)
    })
}

const searchForCustomer = (name) => {
	if (name === '') {return}
	currentCustomer = allCustomers.find(customer => customer.name.toLowerCase().includes(name.toLowerCase()))
	displayCustomer(currentCustomer)
	getCurrentBookings(currentCustomer, 'manager')
}

const getTodaysData = () => {
	const today = new Date().toLocaleDateString();
	formattedDate = validateDate(today)
	const roomsAvailable = getOpenRooms(allRooms, allBookings, formattedDate)
	const bookedRoomNumbers = getUnavailableRooms(allBookings, formattedDate)
	const bookedRooms = findRooms(bookedRoomNumbers, allRooms)
	const totalRevenue = getTotalCost(bookedRooms)
	displayManagerView(totalRevenue, roomsAvailable, bookedRooms, today);
}

const checkAvailability = (date) => {
	formattedDate = validateDate(date)
	const roomsReady = getOpenRooms(allRooms, allBookings, formattedDate)
	availableRooms = findRooms(roomsReady, allRooms)
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
	loginManager,
	checkAvailability,
	validateDate,
	filterRooms,
	bookRoom,
	setData,
	getCurrentBookings,
	searchForCustomer,
	currentCustomer,
	newlyBookedRoom
}