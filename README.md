# Overlook

## Table of Contents
* [Description](#Description)
* [Learning Goals](#Learning-Goals)
* [Features](#Features)
* [Installation](#Installation)
* [Contributors](#Contributors)
* [Technologies Used](#Technologies-Used)

## Description
Welcome to the Overlook Hotel managemet tool! With our site, users and managers will be able to manage room bookings and calculate customer bills.

## Learning Goals
- Use object and array prototype methods to perform data manipulation
- Create a user interface that is easy to use and clearly displays information.
- Write DRY, reusable code that follows SRP and trends toward function purity
- Implement a robust testing suite using TDD
- Make network requests to retrieve and post data
- Complete usability testing and incorporate any feedback that would improve the user experience
- Archive 100% accessibility audit score using the Lighthouse dev tool

## Features
- Upon page load, you are greeted with a login screen to retrieve their individual data. 
![Login Screen Preview](dist/gifs/login-user.gif)

- Once a user is logged in, they will see their dashboard with a table of their bookings and the total amount they've spent at the hotel.
![Dashboard Preview](dist/gifs/user-dash.gif)

- User can navigate to the "New Booking" page and search for an available room to book while also having the option to filter the rooms by type. Once a room is booked, they will receive a confirmation and can see their dashboard has been updated.
![New Booking Preview](dist/gifs/user-booking.gif)

- Managers can login to view the stats for the current date.
![Manager Login Preview](dist/gifs/login-manager.gif)

- Managers can also search for a customer by name to view their current bookings.
![Manager Search Preview](dist/gifs/login-manager.gif)

## Installation
1. `fork` this repository and/or `clone` it to local
1. Once you have cloned the repo, change (cd) into the directory and install the project dependencies. Run `npm install` or `npm i` to install project dependencies.
1. Run `npm test` to see tests
1. Run `npm run lint` if you would like to see the linter
1. Setup local server by cloning the following repo into another directory: https://github.com/turingschool-examples/overlook-api
    - Follow the instructions in the repo's readme to get it setup
1. Inside the server directory, run `npm start`
1. Inside the project directory run `npm start` and visit `localhost:8080`

## Contributers
- [Calli Herrmann](https://github.com/CaliHam/)

### With additional help from:
- [Elise Jones](https://github.com/Elise-Jones/) (reviewing pull-requests)
- [Jeremiah Black](https://github.com/jeremiahblackol) (project manager)

## Technologies Used
- JavaScript (ES6)
- CSS
- HTML
- Mocha
- Chai
- Webpack
- Fetch API
