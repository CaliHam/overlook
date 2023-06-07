const bookingTable = document.querySelector('#customer-bookings');
const totalCost = document.querySelector('#total-cost')

const displayBookings = (bookings, rooms) => {
    bookings.forEach((booking, i)=> {
        bookingTable.innerHTML += `
            <tr id="${booking.id}">
                <td>${booking.roomNumber}</td>
                <td>${booking.date}</td>
                <td>${rooms[i].costPerNight}</td>
            </tr>`
    })
}

const displayTotal = (cost) => {
    console.log(cost)
    totalCost.innerText = `${cost}`
}



export {
    displayBookings,
    displayTotal
}