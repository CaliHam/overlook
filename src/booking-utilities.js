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


export {
	getTotalCost,
	validateDate,
	findRooms,
}