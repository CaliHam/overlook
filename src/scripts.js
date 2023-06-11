// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import './scss/styles.scss';
import dayjs from 'dayjs';


// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import '../dist/images/Overlook-logo.png'
import { getData, getUser, postData, getAllData } from './apiCalls';
import { displayBookings, displayTotal, displayUsername, displayAvailableRooms, } from './DOM-updates'

let currentCustomer;
let currentBookings;
let bookedRooms;
// let allCustomers;
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

const validateDate = (value) => {
	return dayjs(value).format('YYYY/MM/DD')
}

const checkAvailability = (date) => {
	formattedDate = dayjs(date).format('YYYY/MM/DD')
	const allRoomNumbers = allRooms.map(room => room.number)
	const unavailableRooms = allBookings.filter(booking => booking.date === formattedDate).map(room => room.roomNumber)
	const roomsReady = allRoomNumbers.filter(room => !unavailableRooms.includes(room))
	availableRooms = roomsReady.reduce((acc, currNum) => {
		let foundRoom = allRooms.find(room => room.number === currNum)
		acc.push(foundRoom)
		return acc
	},[])
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