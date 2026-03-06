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

  if (nights <= 0) {
    priceBox.classList.add('hidden');
    return;
  }

  const prices = {
    Single: 4999,
    Double: 7999,
    Suite: 14999,
    Deluxe: 11999,
    Presidential: 24999
  };

  const total = prices[roomType.value] * nights;

  totalPrice.textContent = `₹${total.toLocaleString('en-IN')}`;
  nightsEl.textContent = `${nights} night${nights > 1 ? 's' : ''} • ${roomType.value}`;
  priceBox.classList.remove('hidden');
}
/ Form submit handling (AJAX + success modal)
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Required fields validation (PDF requirement)
  if (!checkin.value || !checkout.value || !roomType.value || !adults.value ||
      !document.getElementById('fullName').value ||
      !document.getElementById('email').value ||
      !document.getElementById('phone').value) {
    alert("Please fill all required fields marked with *");
    return;
  }

  if (new Date(checkout.value) <= new Date(checkin.value)) {
    alert("Check-out date must be after check-in date!");
    return;
  }
  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      successModal.classList.remove('hidden');
      form.reset();
      priceBox.classList.add('hidden');
    } else {
      alert("Submission failed. Please try again.");
    }
  } catch (err) {
    alert("Network error. Please check your connection.");
  }
});

function closeModal() {
  successModal.classList.add('hidden');
}
