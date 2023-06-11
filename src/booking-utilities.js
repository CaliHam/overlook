// import {}

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

const findRooms = (response, currentBookings) => {
	const roomNumbers = currentBookings.map(booking => booking.roomNumber)
	return roomNumbers.reduce((foundRooms, currRoom) => {
		const foundRoom = response.rooms.find(room => room.number === currRoom)
		foundRooms.push(foundRoom)
		return foundRooms
	}, [])
}

const findAvailableRooms = (roomsReady) => {
	return roomsReady.reduce((acc, currNum) => {
		let foundRoom = allRooms.find(room => room.number === currNum)
		acc.push(foundRoom)
		return acc
	},[])
}

export {
	getTotalCost,
	validateDate,
	findRooms,
	findAvailableRooms
}