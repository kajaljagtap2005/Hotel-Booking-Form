/ Elements
const checkin     = document.getElementById('checkin');
const checkout    = document.getElementById('checkout');
const roomType    = document.getElementById('roomType');
const adults      = document.getElementById('adults');
const priceBox    = document.getElementById('priceBox');
const totalPrice  = document.getElementById('totalPrice');
const nightsEl    = document.getElementById('nights');
const form        = document.getElementById('bookingForm');
const successModal = document.getElementById('successModal');

const today = new Date().toISOString().split('T')[0];
checkin.min = today;

checkin.addEventListener('change', () => {
  checkout.min = checkin.value;
  calculatePrice();
});

checkout.addEventListener('change', calculatePrice);
roomType.addEventListener('change', calculatePrice);
adults.addEventListener('input', calculatePrice);

function calculatePrice() {
  if (!checkin.value || !checkout.value || !roomType.value) {
    priceBox.classList.add('hidden');
    return;
  }

  const ci = new Date(checkin.value);
  const co = new Date(checkout.value);
  const nights = Math.ceil((co - ci) / (1000 * 60 * 60 * 24));
