const bookingsEl = document.getElementById("bookings");
const dialog = document.getElementById("bookingDialog");
const form = document.getElementById("bookingForm");
const dateInput = document.getElementById("dateInput");
const timeInput = document.getElementById("timeInput");
const guestsInput = document.getElementById("guestsInput");
const totalPriceEl = document.getElementById("totalPrice");
const dialogTitle = document.getElementById("dialogTitle");
const dialogLocation = document.getElementById("dialogLocation");

let selectedTour = null;
let bookings = [];

const tours = {
  paris: { name: "Paris Highlights & Seine Cruise", location: "Paris, France", price: 85, timeSlots: ["09:00","13:00","18:30"] },
  tokyo: { name: "Tokyo Night Food Safari", location: "Tokyo, Japan", price: 110, timeSlots: ["17:30","20:30"] },
  capetown: { name: "Cape Town Peninsula & Penguins", location: "Cape Town, South Africa", price: 130, timeSlots: ["08:00"] },
  newyork: { name: "New York Skyline Helicopter Ride", location: "New York, USA", price: 250, timeSlots: ["10:00","12:00","15:00"] },
  rome: { name: "Rome Ancient Wonders", location: "Rome, Italy", price: 95, timeSlots: ["09:00","14:00"] },
  sydney: { name: "Sydney Opera House Experience", location: "Sydney, Australia", price: 120, timeSlots: ["11:00","16:00"] },
  giza: { name: "Pyramids of Giza Adventure", location: "Cairo, Egypt", price: 140, timeSlots: ["08:00","12:00"] },
  rio: { name: "Rio Carnival Street Tour", location: "Rio de Janeiro, Brazil", price: 100, timeSlots: ["15:00","20:00"] },
  london: { name: "London Royal Experience", location: "London, UK", price: 115, timeSlots: ["10:00","13:00"] },
  dubai: { name: "Dubai Desert & City Lights", location: "Dubai, UAE", price: 180, timeSlots: ["09:00","18:00"] }
};

function openBooking(id) {
  selectedTour = tours[id];
  dialogTitle.textContent = selectedTour.name;
  dialogLocation.textContent = selectedTour.location;
  timeInput.innerHTML = "";
  selectedTour.timeSlots.forEach(slot => {
    const opt = document.createElement("option");
    opt.value = slot; opt.textContent = slot;
    timeInput.appendChild(opt);
  });
  const today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", today);
  guestsInput.value = 1;
  totalPriceEl.textContent = "$" + selectedTour.price;
  dialog.showModal();
}

form.addEventListener("input", () => {
  if (!selectedTour) return;
  const guests = parseInt(guestsInput.value) || 1;
  totalPriceEl.textContent = "$" + (guests * selectedTour.price);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const date = dateInput.value;
  const time = timeInput.value;
  const guests = parseInt(guestsInput.value) || 1;
  if (!date || !time) return;
  bookings.push({ tour: selectedTour, date, time, guests, total: guests * selectedTour.price });
  renderBookings();
  dialog.close();
});

function renderBookings() {
  bookingsEl.innerHTML = bookings.length ? "" : "<p>No bookings yet.</p>";
  bookings.forEach(b => {
    const div = document.createElement("div");
    div.className = "booking-card";
    div.innerHTML = `
      <strong>${b.tour.name}</strong><br>
      ${b.date} at ${b.time} for ${b.guests} guests<br>
      Total: $${b.total}
    `;
    bookingsEl.appendChild(div);
  });
}
function goBack() {
  // Simply close the booking popup
  dialog.close();

  // Optionally, reset form so it's ready for the next selection
  form.reset();
  selectedTour = null;
}

renderBookings();
