import chai from 'chai';

import { sampleCustomers } from '../src/data/sample-customers';
import { sampleRooms } from '../src/data/sample-rooms';
import { sampleBookings } from '../src/data/sample-bookings';
import { getTotalCost, validateDate, findRooms } from '../src/booking-utilities';

const expect = chai.expect;

describe('Retrieve cost', function() {
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

describe('Get date', function() {
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

describe('Find rooms', function() {
  let allRooms;

  beforeEach(() => {
    allRooms = sampleRooms.rooms
  })
  it('should return rooms that match numbers given', function() {
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

  it('should return an array of one room when one room matches', function() {
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

  it('should return an empty array when no room numbers are given', function() {
    const foundRooms = findRooms([], allRooms)

    expect(foundRooms).to.deep.equal([])
  })
});