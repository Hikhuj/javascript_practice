const container = document.querySelector('.container');
/* Trying to select only those SEATs that are NOT OCCUPIED */
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

/**
 * It will be increasing the ticket price because of the selection of seats
 */
let ticketPrice = +movieSelect.value;

// Save Selected Movie Index and Price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
/**
 * Function updates total of seats and count them by taking all elements
 * that are on .row with class .seat.selected them it checks the length
 * and change the text of count and the test of total to show user
 * the amount of seats and total price of what user is buying
 */
function updateSelectedCount() {
  /**
   * We get the selected seats that are on .row and contains classes .seat.selected
   * It sets all on a node list of elements
   */
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  /**
   * Steps that I need to storage data when I reload the page
   * - Copy selected seats into arr
   * - Map through arr
   * - Return a new arr indexes
   * 
   * Using Spread Operator will add whatever we pass in to the variable
   * We are passing the selected seat and applying a map function to do someting
   * which is taking the seat and add it to the array but returning the index of the 
   * seat only
   */
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  /**
   * Here we are saving an array, an array of seats, we need to conver it first to JSON.stringify
   * before passing it to setItem
   */
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  // To count the number of elements on the array we can get a .length to get this data
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

/**
 * Get data from localStorage and populate UI
 */
function populateUI() {
  /**
   * To convert data you can use JSON.stringify() to transform into STRINGs everything
   * and the reverse is JSON.parse to transform back everything into the data that you required.
   * The following row takes the data converted as String and send it back into the data we reuired
   */
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      // If greater than -1 if is not in there it gives -1, if greater, it is there.
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex != null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  };
}

/**
 * Movie Select event
 */
movieSelect.addEventListener('change', e => {
  /**
   * The plus sign symbol before a variable makes sure it returns a positive or negative value
   * its name is Unary Operator.
   * Since I'm directly assigning a value to 'ticketPrice' var, the declaration created
   * before must change from CONST to LET
   */
  ticketPrice = +e.target.value;
  /**
   * This function will receive 2 params
   * - Movie ID
   * - Movie Price
   * This will allow us to save the data when updating the website
   */
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

/**
 * We capture every click on the 'seat' icons and we add the CSS class '.seat'
 * a '.selected' class too and we execute the updateSelectedCount()
 */
container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    // It change the class of the object to .selected and executes action
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();

container.addEventListener('mouseover', e => {
  console.log('Mouse Over Event: ' + e.target);
})
