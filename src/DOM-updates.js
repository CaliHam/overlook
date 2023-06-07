const wholeTable = document.querySelector('#customer-bookings')
const bookingTable = document.querySelector('#booking-info');
const totalCost = document.querySelector('#total-cost')

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
    displayTotal
}