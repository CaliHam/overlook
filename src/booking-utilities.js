import dayjs from 'dayjs';

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

const findRooms = (roomNumbers, allRooms) => {
	return roomNumbers.reduce((foundRooms, currRoom) => {
		const foundRoom = allRooms.find(room => room.number === currRoom)
		foundRooms.push(foundRoom)
		return foundRooms
	}, [])
}

const getOpenRooms = (allRooms, allBookings, formattedDate) => {
	const allRoomNumbers = allRooms.map(room => room.number)
	const unavailableRooms = allBookings.filter(booking => booking.date === formattedDate).map(room => room.roomNumber)
	return allRoomNumbers.filter(room => !unavailableRooms.includes(room))
}

export {
	getTotalCost,
	validateDate,
	findRooms,
	getOpenRooms
}