import dayjs from 'dayjs';
import datepicker from 'js-datepicker';
import { checkAvailability } from './scripts.js'

const wholeTable = document.querySelector('#customer-bookings')
const bookingTable = document.querySelector('#booking-info');
const totalCost = document.querySelector('#total-cost')
const userMenu = document.querySelector('.user')
const dashView = document.querySelector('#dashboard-view')
const bookingView = document.querySelector('#booking-view')
const dashBtn = document.querySelector('#dash-btn')
const bookingBtn = document.querySelector('#book-btn')
const calendar = document.querySelector('#calendar')
const checkDateBtn = document.querySelector('#check-date')
const searchResults = document.querySelector('#results')

// Date Picker //
const picker = datepicker(calendar)

// EVENT LISTENERS

dashBtn.addEventListener('click', () => {
	hideAllPages()
	dashView.classList.remove('hidden')
})

bookingBtn.addEventListener('click', () => {
	hideAllPages()
	bookingView.classList.remove('hidden')
})

checkDateBtn.addEventListener('click', (e) => {
	e.preventDefault()
	checkAvailability(calendar.value)
})

// CODE

const displayUsername = (user) => {
	userMenu.innerText = user.name
}

const hideAllPages = () => {
	dashView.classList.add('hidden')
	bookingView.classList.add('hidden')
}

const displayBookings = (bookings, rooms) => {
	if(!bookings){
		wholeTable.innerHTML = `<th>Book some rooms the view them here!</th>`
		return
	}
	bookings.sort((a, b) => {
		const dateA = new Date(a.date);
		const dateB = new Date(b.date);
		return dateB - dateA;
	});
	bookings.forEach((booking, i)=> {
		bookingTable.innerHTML += `
			<tr id="${booking.id}">
				<td>${booking.roomNumber}</td>
				<td>${dayjs(booking.date).format('MMMM D, YYYY')}</td>
				<td>$${rooms[i].costPerNight}</td>
			</tr>`
	})
}

const displayTotal = (cost) => {
	totalCost.innerHTML = `<b>${cost}</b>`
}

const displayAvailableRooms = (availableRooms, date) => {
	searchResults.classList.remove('hidden')
	searchResults.innerHTML = ''
	if(!availableRooms.length){
		searchResults.innerHTML = `<p>Sorry there are no rooms available on ${date} at this time.</p>`
	}
	availableRooms.forEach(room => {
		searchResults.innerHTML += `
		<div class="room-result-container">
			<h3>${room.roomType} with ${room.numBeds} ${room.bedSize} bed</h3>
			<p class="bidet">Bidet ${room.bidet ? 'is' : 'not'} included.</p>
			<hr>
			<p class="cost-per-night"><b>$${room.costPerNight.toFixed(2)}</b></p>
			<button class="book-room-btn">Book</button
		</div>`
	})
}


export {
	displayBookings,
	displayTotal,
	displayUsername,
	displayAvailableRooms
}