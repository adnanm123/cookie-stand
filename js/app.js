'use strict';

const hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

const state = {
  allCookieStands: []
};

const tableElement = document.getElementById('sales-table');
let tHead = document.createElement('thead');
let tFoot = document.createElement('tfoot');
let tBody = document.createElement('tbody');

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function CookieSalmon(location, minNumber, maxNumber, avgCookiesPerCustomer) {
  this.location = location;
  this.minNumber = minNumber;
  this.maxNumber = maxNumber;
  this.avgCookiesPerCustomer = avgCookiesPerCustomer;
  this.cookiesSoldPerHour = [];
  this.customersPerHour = [];
  this.totalCookiesSoldPerDay = 0;
  state.allCookieStands.push(this);
}

CookieSalmon.prototype.getRandomCustomersPerHour = function() {
  for(let i = 0; i < hours.length; i++) {
    this.customersPerHour.push(random(this.minNumber, this.maxNumber));
  }
};

CookieSalmon.prototype.calculateCookiesPerHour = function() {
  this.getRandomCustomersPerHour();
  for(let i = 0; i < hours.length; i++) {
    let oneHour = Math.ceil(this.customersPerHour[i] * this.avgCookiesPerCustomer);
    this.cookiesSoldPerHour.push(oneHour);
    this.totalCookiesSoldPerDay += oneHour;
  }
};

CookieSalmon.prototype.render = function() {
  this.calculateCookiesPerHour();
  const row = document.createElement('tr');
  let th = document.createElement('th');
  th.textContent = this.location;
  row.appendChild(th);
  tBody.appendChild(row);
  for(let i = 0; i < hours.length; i++) {
    th = document.createElement('td');
    th.textContent = this.cookiesSoldPerHour[i];
    row.appendChild(th);
  }
  th = document.createElement('td');
  th.textContent = this.totalCookiesSoldPerDay;
  row.appendChild(th);
  tableElement.appendChild(tBody);
};

function renderHeader() {
  const row = document.createElement('tr');
  let th = document.createElement('th');
  th.textContent = 'Locations';
  row.appendChild(th);
  tHead.appendChild(row);
  for(let i = 0; i < hours.length; i++) {
    th = document.createElement('th');
    th.textContent = hours[i];
    row.appendChild(th);
  }
  th = document.createElement('th');
  th.textContent = 'daily location total';
  row.appendChild(th);
  tableElement.appendChild(tHead);
}

function renderFooter() {
  console.log('render footer was called');
  const row = document.createElement('tr');
  let th = document.createElement('th');
  th.textContent = 'Totals';
  row.appendChild(th);
  tFoot.appendChild(row);
  let grandTotal = 0;
  for (let i = 0; i < hours.length; i++) {
    let hourlyTotal = 0;
    for (let j = 0; j < state.allCookieStands.length; j++) {
      hourlyTotal += state.allCookieStands[j].cookiesSoldPerHour[i];
      console.log(hourlyTotal);
      grandTotal += state.allCookieStands[j].cookiesSoldPerHour[i];
    }
    th = document.createElement('td');
    th.textContent = hourlyTotal;
    row.appendChild(th);
  }

  const totalCell = document.createElement('td');
  totalCell.textContent = grandTotal;
  row.appendChild(totalCell);
  tableElement.appendChild(tFoot);
}

// executable code
new CookieSalmon('Seattle', 23, 65, 6.3);
new CookieSalmon('Tokyo', 3, 24, 1.2);
new CookieSalmon('Dubai', 11, 38, 3.7);
new CookieSalmon('Paris', 20, 38, 2.3);
new CookieSalmon('Lima', 2, 16, 4.6);

(function renderTable() {
  renderHeader();
  for(let i = 0; i < state.allCookieStands.length; i++) {
    state.allCookieStands[i].render();
  }
  renderFooter();
})();

// Form
let form = document.getElementById('form');
function handleSubmit(event) {
  event.preventDefault();
  let storeLocation = event.target.storeLocation.value;
  let minNumberOfCookies = parseInt(event.target.minNumberOfCookies.value);
  let maxNumberOfCookies = parseInt(event.target.maxNumberOfCookies.value);
  let avgNumberOfCookies = parseFloat(event.target.avgNumberOfCookies.value);

  let newLocation = new CookieSalmon(storeLocation, minNumberOfCookies, maxNumberOfCookies, avgNumberOfCookies);
  newLocation.render();

  tFoot.innerHTML = '';
  renderFooter();

  event.target.storeLocation.value = null;
  event.target.minNumberOfCookies.value = null;
  event.target.maxNumberOfCookies.value = null;
  event.target.avgNumberOfCookies.value = null;
}
form.addEventListener('submit', handleSubmit);
