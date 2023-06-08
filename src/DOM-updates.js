const wholeTable = document.querySelector('#customer-bookings')
const bookingTable = document.querySelector('#booking-info');
const totalCost = document.querySelector('#total-cost')
const userMenu = document.querySelector('.user')
const dashView = document.querySelector('#dashboard-view')
const bookingView = document.querySelector('#booking-view')
const dashBtn = document.querySelector('#dash-btn')
const bookingBtn = document.querySelector('#book-btn')

// EVENT LISTENERS

dashBtn.addEventListener('click', () => {
	hideAllPages()
	dashView.classList.remove('hidden')
})

bookingBtn.addEventListener('click', () => {
	hideAllPages()
	bookingBtn.classList.remove('hidden')
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
				<td>${booking.date}</td>
				<td>$${rooms[i].costPerNight}</td>
			</tr>`
	})
}

const displayTotal = (cost) => {
	totalCost.innerHTML = `<b>${cost}</b>`
}



export {
    displayBookings,
    displayTotal,
    displayUsername
}