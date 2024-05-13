const container = document.querySelector('.container');
/* Trying to select only those SEATs that are NOT OCCUPIED */
const seat = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

/**
 * It will be increasing the ticket price because of the selection of seats
 */
const ticketPrice = +movieSelect.value;

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  console.log(selectedSeats);

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = 
}

/**
 * We capture every click on the 'seat' icons and we add the CSS class '.seat'
 * a '.selected' class too and we execute the updateSelectedCount()
 */
container.addEventListener('click', e => {
  if(
    e.target.classList.contains('seat')
    && !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
})

container.addEventListener('mouseover', e => {
  console.log('Mouse Over Event: ' + e.target);
})
