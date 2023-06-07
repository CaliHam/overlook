import chai from 'chai';
import { customerRequest } from '../src/data/sample-customers';
import { roomRequest } from '../src/data/sample-rooms';
import { bookingRequest } from '../src/data/sample-bookings';

const expect = chai.expect;

// SAMPLE DATA REQUESTS

const mockGetCustomer = () => {
  return new Promise((resolve, reject) => {
    resolve(customerRequest.customers);
  })
};

const mockGetRoom = () => {
  return new Promise((resolve, reject) => {
      resolve(roomRequest.rooms);
  });
};

const mockGetBooking = () => {
  return new Promise((resolve, reject) => {
      return resolve(bookingRequest.bookings);
  });
};

// TESTS

describe('Get Customer', function() {
  // let customer1;

  // beforeEach(() => {
  //   mockGetCustomer().then(response => {
  //     customer1 = response[0]
  //     console.log(customer1)
  //   });
  // })
  it('should return a customer', function() {
    // mockGetCustomer().then(response => {
    //   customer1 = response[0]
      
    // });
    // expect(customer1.name).to.equal("Reki Cyan");
  });
});
