const bookingTable = document.querySelector('#customer-bookings');
// const totalCost = document.querySelector('#total-cost')

const displayBookings = (bookings) => {
    bookings.forEach(booking => {
        bookingTable.innerHTML += `
            <tr id="${booking.id}">
                <td>${booking.roomNumber}</td>
                <td>${booking.date}</td>
                <td>$314</td>
            </tr>`
    })
}

// const displayCosts = () => {

// }



export {
    displayBookings,

}