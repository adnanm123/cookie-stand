'use strict';

const hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let seattle = {
  location: 'Seattle',
  minNumber: 23,
  maxNumber: 65,
  avgCookiesPerCustomer: 6.3,
  cookiesSoldPerHour: [],
  customersPerHour: [],
  totalCookiesSoldPerDay: 0,
  getRandomCustomersPerHour: function () {
    for(let i = 0; i < hours.length; i++) {
      this.customersPerHour.push(random(this.minNumber, this.maxNumber));
    }
  },
  calculateCookiesPerHour: function() {
    this.getRandomCustomersPerHour();
    for(let i = 0; i < hours.length; i++) {
      let oneHour = Math.ceil(this.customersPerHour[i] * this.avgCookiesPerCustomer);
      this.cookiesSoldPerHour.push(oneHour);
      this.totalCookiesSoldPerDay += oneHour;
    }
  },
  render: function() {
    this.calculateCookiesPerHour();
    const seattleList = document.getElementById('seattle');
    for(let i = 0; i < hours.length; i++) {
      const li = document.createElement('li');
      li.textContent = `${hours[i]}: ${this.cookiesSoldPerHour[i]} cookies`;
      seattleList.appendChild(li);
    }
    const li = document.createElement('li');
    li.textContent = `Total: ${this.totalCookiesSoldPerDay} cookies`;
    seattleList.appendChild(li);
  }
};
seattle.render();
console.log(seattle.cookiesSoldPerHour);
