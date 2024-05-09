const movieSelect = document.querySelector(".movie-select select");
const seatContainer = document.querySelector(".seat-container");
const seats = Array.from(seatContainer.querySelectorAll(".seats"));
const seatCount = document.querySelector("#seat-count");
const totalPrice = document.querySelector("#total-price");
let ticketPrice = movieSelect.value;

// function to populate the reserved seats

window.addEventListener("DOMContentLoaded", () => {
  const selectedSeatIndices = JSON.parse(localStorage.getItem("selectedSeats"));

  selectedSeatIndices.forEach((index) => {
    seats[index].classList.add("occupied");
  });
});

movieSelect.addEventListener("change", (event) => {
  ticketPrice = +event.target.value;
  UpdateCount();
});

// tracking seat selection

seatContainer.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("seats") &&
    !event.target.classList.contains("occupied")
  ) {
    event.target.classList.toggle("selected");
    UpdateCount();
  }
});

// function to update the count fo the seats

function UpdateCount() {
  const selectedSeats = seatContainer.querySelectorAll(".seats.selected");
  const selectedSeatCount = selectedSeats.length;
  seatCount.textContent = selectedSeatCount;

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  // saving the indices to the local storage
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  totalPrice.textContent = selectedSeatCount * ticketPrice;
}
