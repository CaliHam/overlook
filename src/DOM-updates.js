import dayjs from 'dayjs';
import datepicker from 'js-datepicker';
import '../dist/images/sad-server.png'
import { checkAvailability, filterRooms, bookRoom, getCurrentBookings, currentCustomer, newlyBookedRoom, loginUser, loginManager, searchForCustomer } from './scripts.js'
import { validateDate } from './booking-utilities.js'
import { getUser } from './apiCalls';

const bookingsTable = document.querySelector('.customer-bookings')
const managerBookingsTable = document.querySelector('.manager')
const userMenu = document.querySelector('.user')
const dashView = document.querySelector('#dashboard-view')
const bookingView = document.querySelector('#booking-view')
const dashBtns = document.querySelectorAll('.dash-btn')
const bookingBtn = document.querySelector('#book-btn')
const calendar = document.querySelector('#calendar')
const checkDateBtn = document.querySelector('#check-date')
const searchResults = document.querySelector('#results')
const filterForm = document.querySelector('#filter-by-room-type')
const filterType = document.querySelector('#room-type')
const submitFilter = document.querySelector('#submit-filter')
const usernameField = document.querySelector('#username')
const passwordField = document.querySelector('#password')
const loginBtn = document.querySelector('#login')
const loginErrorField = document.querySelector('#login-error-field')
const loginView = document.querySelector('#login-view')
const userNav = document.querySelector('#user-nav')
const managerView = document.querySelector('#manager-dash-view')
const roomsAvailable = document.querySelector('#rooms-avail')
const totalRevenue = document.querySelector('#total-revenue')
const percentOccupied = document.querySelector('#rooms-occ')
const todaysDate = document.querySelector('#today-date')
const customerName = document.querySelector('#customer-name')
const searchCustomersBtn = document.querySelector('#search-customers')
const customerHeader = document.querySelector('#customer-search-results')

// Date Picker //
const picker = datepicker(calendar)

// EVENT LISTENERS
window.addEventListener('load', () => {
	getUser('20')
	.catch(error => {
		if (error){
			loginView.innerHTML = `<h2>Sorry, our servers are down. Please try again later!</h2>`
		}
	})
})

passwordField.addEventListener('keydown', (e) => {
	if (e.key === "Enter") {
		validateUser(usernameField.value, passwordField.value)
	}
})

loginBtn.addEventListener('click', (e) => {
	e.preventDefault()
	validateUser(usernameField.value, passwordField.value)
})

dashBtns.forEach(button => button.addEventListener('click', () => {
	hideAllPages()
	dashView.classList.remove('hidden')
	getCurrentBookings(currentCustomer)
}))

bookingBtn.addEventListener('click', () => {
	hideAllPages()
	bookingView.classList.remove('hidden')
})

checkDateBtn.addEventListener('click', (e) => {
	e.preventDefault()
	validateDate(calendar.value) !== 'Invalid Date' ? checkAvailability(calendar.value) : checkForError()
})

checkDateBtn.addEventListener('keydown', (e) => {
	if (e.key === "Enter") {
		validateDate(calendar.value) !== 'Invalid Date' ? checkAvailability(calendar.value) : checkForError()
	}
})

submitFilter.addEventListener('click', (e) => {
	e.preventDefault()
	filterRooms(filterType.value)
})

searchCustomersBtn.addEventListener('click', (e) => {
	e.preventDefault()
	searchForCustomer(customerName.value)
})

// CODE

const displayUsername = (user) => {
	userMenu.innerText = user.name
}

const validateUser = (user, password) => {
	checkForManager(user, password)
	const userNum = parseInt(user.slice(8, 10))
	if (userNum > 50 || userNum < 1 || !userNum) {
		loginErrorField.innerText = 'Username does not exist'
	}
	else if (password !== 'overlook2021') { 
		loginErrorField.innerText = 'Incorrect Password'
	} else {
		hideAllPages()
		dashView.classList.remove('hidden')
		userNav.classList.remove('hidden')
		loginUser(userNum)
	}
}

const checkForManager = (user, pass) => {
	if (user === 'manager' && pass === 'overlook2021') {
		loginManager()
	}
}

const hideAllPages = () => {
	dashView.classList.add('hidden')
	bookingView.classList.add('hidden')
	loginView.classList.add('hidden')
	managerView.classList.add('hidden')
}

const displayManagerView = (totalCash, roomsReady, bookedRooms, today) => {
	loginView.classList.add('hidden')
	managerView.classList.remove('hidden')
	todaysDate.innerText = today;
	roomsAvailable.innerText = roomsReady.length;
	totalRevenue.innerText = totalCash;
	percentOccupied.innerText = `${(bookedRooms.length/25) * 100}%`
}

const renderBookingsTable = (tableType) => {
	let table;
	table = (tableType === 'manager') ? managerBookingsTable : bookingsTable
	table.innerHTML = ''
	table.innerHTML += `<thead>
	<tr>
		<th>Room Type</th>
		<th>Date</th>
		<th>Cost</th>
	</tr>
	</thead>
	<tbody class="booking-info">
		<!-- booking info goes here -->
	</tbody>
	<tfoot>
		<th>Total Cost:</th>
		<td></td>
		<td class="total-cost"></td>
	</tfoot>`
}

const displayCustomer = (customer) => {
	if (!customer){
		customerHeader.innerText = `No customers found`
	} else {
		customerHeader.innerText = `Bookings for ${customer.name}`
	}
	// userNav.classList.remove('hidden')
	// userMenu.innerText = 'Manager'
}

const displayBookings = (bookings, rooms) => {
	bookings.sort((a, b) => {
		const dateA = new Date(a.date);
		const dateB = new Date(b.date);
		return dateB - dateA;
	});	
	const bookingTable = document.querySelector('.booking-info');
	bookings.forEach((booking, i)=> {
		bookingTable.innerHTML += `
			<tr id="${booking.id}">
				<td class="room-type">${rooms[i].roomType.toUpperCase()}</td>
				<td>${dayjs(booking.date).format('MMMM D, YYYY')}</td>
				<td>$${rooms[i].costPerNight}</td>
			</tr>`
	})
}

const displayTotal = (cost) => {
	const totalCost = document.querySelector('.total-cost')
	totalCost.innerHTML = `<b>${cost}</b>`
}

const displayAvailableRooms = (availableRooms, date, filterType) => {
	searchResults.classList.remove('hidden')
	filterForm.classList.remove('hidden')
	searchResults.innerHTML = `<h2>Showing rooms available for ${dayjs(date).format('MMMM D, YYYY')}:</h2>`
	checkForError(availableRooms, date, filterType)
	availableRooms.forEach(room => {
		searchResults.innerHTML += `
		<div id="${room.number}" class="room-result-container">
			<h3>${room.roomType} with ${room.numBeds} ${room.bedSize} bed</h3>
			<p class="bidet">Bidet ${room.bidet ? 'is' : 'not'} included.</p>
			<hr>
			<p class="cost-per-night"><b>$${room.costPerNight.toFixed(2)}</b></p>
			<button class="book-room-btn">Book</button
		</div>`
	})
	const bookRoomBtn = document.querySelectorAll('.book-room-btn')
	bookRoomBtn.forEach(button => button.addEventListener('click', (e) => {
		bookRoom(e.target.closest('div').id)
	}))
}

const checkForError = (availableRooms, date, filterType) => {
	searchResults.classList.remove('hidden')
	if(!date){
		filterForm.classList.add('hidden')
		searchResults.innerHTML = `<h2>Please enter a valid date!</h2>`
	} else if (!availableRooms.length && filterType) {
		searchResults.innerHTML = `<h2>Sorry, there are no ${filterType} rooms available on ${dayjs(date).format('MMMM D, YYYY')}.<br> Please try another room.</h2>`	
	}	else if (!availableRooms.length){
		filterForm.classList.add('hidden')
		searchResults.innerHTML = `<h2>Sorry, there are no rooms available on ${dayjs(date).format('MMMM D, YYYY')}.<br> Please try another day.</h2>`
	}
}

const confirmBooking = (booking) => {
	searchResults.innerHTML = `
		<div id="confirmation">
			<img src="./images/star-rating.png" alt="Five Stars">
			<h2>Booking Confirmed</h2>
			<p>Thank you ${currentCustomer.name}!</p>
			<p>We are pleased to inform you that your reservation has been received and confirmed.</p>
			<hr>
			<table id="booking-details">
				<thead>
					<th>Booking Details:</th>
				</thead>
				<tbody>
					<tr>
						<th>Confirmation Number</th>
						<th>Room Type</th>
						<th>Date</th>
						<th>Total Cost</th>
					</tr>
					<tr>
						<td>${booking.id}</td>
						<td>${newlyBookedRoom.roomType.toUpperCase()}</td>
						<td>${dayjs(booking.date).format('MMMM D, YYYY')}</td>
						<td>$${newlyBookedRoom.costPerNight}</td>
					</tr>
				</tbody>
			</table>
			<button id="dash-card-btn" class="dash-btn">View My Dashboard</button>
		</div>`
		const dashBtns = document.querySelectorAll('.dash-btn')
		dashBtns.forEach(button => button.addEventListener('click', () => {
			hideAllPages()
			dashView.classList.remove('hidden')
			getCurrentBookings(currentCustomer)
		}))
}

export {
	displayBookings,
	renderBookingsTable,
	displayTotal,
	displayUsername,
	displayCustomer,
	displayManagerView,
	displayAvailableRooms,
	confirmBooking
}