import chai from 'chai';

import { sampleCustomers } from '../src/data/sample-customers';
import { sampleRooms } from '../src/data/sample-rooms';
import { sampleBookings } from '../src/data/sample-bookings';
import { getTotalCost, validateDate, findRooms } from '../src/booking-utilities';


const expect = chai.expect;



// TESTS

describe('Retrieve cost', function() {
  // let customer1;

  // beforeEach(() => {
    
  // })
  it('should return a cost given an array of room objects', function() {
    const totalCost = getTotalCost(sampleRooms.rooms)

    expect(totalCost).to.equal('$1,326.92')
  });
});

describe('Get date', function() {
  // let customer1;

  // beforeEach(() => {
    
  // })
  it('should return a date in YYYY/MM/DD format', function() {
    const today = 'June 11 2023'
    const formattedDate = validateDate(today)

    expect(formattedDate).to.equal('2023/06/11')
  });
});

describe('Find rooms', function() {
  // let customer1;

  // beforeEach(() => {
    
  // })
  it('should return rooms that match numbers given', function() {
    const roomNumbers = [15, 24]
    const allRooms = sampleRooms.rooms
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
      },])
  });
});