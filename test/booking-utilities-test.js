import chai from 'chai';

import { sampleRooms } from '../src/data/sample-rooms';
import { sampleBookings } from '../src/data/sample-bookings';
import { getTotalCost, validateDate, findRooms, getUnavailableRooms, getOpenRooms } from '../src/booking-utilities';

const expect = chai.expect;

describe('Retrieve cost', () => {
  it('should return a cost given an array of room objects', () => {
    const totalCost = getTotalCost(sampleRooms.rooms)

    expect(totalCost).to.equal('$1,326.92')
  });

  it('should return a cost given a single room', () => {
    const totalCost = getTotalCost([{
      "number": 15,
      "roomType": "residential suite",
      "bidet": true,
      "bedSize": "queen",
      "numBeds": 1,
      "costPerNight": 358.4
      }])

    expect(totalCost).to.equal('$358.40')
  });

  it('should return $0 if given no array', () => {
    const totalCost = getTotalCost([])

    expect(totalCost).to.equal('$0.00')
  })
});

describe('Get date', () => {
  it('should return a given date in MM DD YYYY format to YYYY/MM/DD format', () => {
    const today = 'June 11 2023'
    const formattedDate = validateDate(today)

    expect(formattedDate).to.equal('2023/06/11')
  });

  it('should return a given date in MM-DD-YYYY format to YYYY/MM/DD format', () => {
    const birthday = 'Apr-26-1996'
    const formattedDate = validateDate(birthday)

    expect(formattedDate).to.equal('1996/04/26')
  });

  it('should return `Invalid Date` when given incorrect input', () => {
    const useless = 'askhdjfs'
    const formattedDate = validateDate(useless)

    expect(formattedDate).to.equal('Invalid Date')
  });

  it('should return `Invalid Date` when given no input', () => {
    const unkown = ''
    const formattedDate = validateDate(unkown)

    expect(formattedDate).to.equal('Invalid Date')
  });
});

describe('Find rooms', () => {
  let allRooms;

  beforeEach(() => {
    allRooms = sampleRooms.rooms
  })
  it('should return rooms that match numbers given', () => {
    const roomNumbers = [15, 24]
    const foundRooms = findRooms(roomNumbers, allRooms)

    expect(foundRooms).to.deep.equal([
      {
      "number": 15,
      "roomType": "residential suite",
      "bidet": true,
      "bedSize": "queen",
      "numBeds": 1,
      "costPerNight": 358.4
      },
      {
      "number": 24,
      "roomType": "suite",
      "bidet": false,
      "bedSize": "full",
      "numBeds": 2,
      "costPerNight": 477.38
      }])
  });

  it('should return an array of one room when one room matches', () => {
    const foundRooms = findRooms([24], allRooms)

    expect(foundRooms).to.deep.equal([{
      "number": 24,
      "roomType": "suite",
      "bidet": false,
      "bedSize": "full",
      "numBeds": 2,
      "costPerNight": 477.38
      }])
  })

  it('should return an empty array when no room numbers are given', () => {
    const foundRooms = findRooms([], allRooms)

    expect(foundRooms).to.deep.equal([])
  })
});

describe('Find Unavailable rooms', () => {
  let allRooms, allBookings, allBooked;

  beforeEach(() => {
    allRooms = sampleRooms.rooms
    allBookings = sampleBookings.bookings
    allBooked = sampleBookings.bookingsFull
  })

  it('should return an array of room numbers that are booked on a given date', () => {
    const bookDate = validateDate("Jan 10 2022")
    const bookedRooms = getUnavailableRooms(allBookings, bookDate)

    expect(bookedRooms).to.deep.equal([12])
  });

  it('should return an array of different room numbers that are booked on a different date', () => {
    const bookDate = validateDate("1-24-2022")
    const bookedRooms = getUnavailableRooms(allBooked, bookDate)

    expect(bookedRooms).to.deep.equal([15, 24, 12])
  });

  it('should return an empty array if there are no rooms booked a given date', () => {
    const bookDate = validateDate("2022/04/26")
    const bookedRooms = getUnavailableRooms(allBookings, bookDate)

    expect(bookedRooms).to.deep.equal([])
  });
})

describe('Find available rooms', () => {
  let allRooms, allBookings, allBooked;

  beforeEach(() => {
    allRooms = sampleRooms.rooms
    allBookings = sampleBookings.bookings
    allBooked = sampleBookings.bookingsFull
  })

  it('should return an array of room numbers that are available to book on a given date', () => {
    const bookDate = validateDate("Jan 10 2022")
    const openRooms = getOpenRooms(allRooms, allBookings, bookDate)

    expect(openRooms).to.deep.equal([15, 24])
  });

  it('should return an array of different room numbers that are available to book on a different date', () => {
    const bookDate = validateDate("4-22-2022")
    const openRooms = getOpenRooms(allRooms, allBookings, bookDate)

    expect(openRooms).to.deep.equal([24, 12])
  });

  it('should return an empty array if no dates are available to book on a given date', () => {
    const bookDate = validateDate("2022/01/24")
    const openRooms = getOpenRooms(allRooms, allBooked, bookDate)

    expect(openRooms).to.deep.equal([])
  });
})