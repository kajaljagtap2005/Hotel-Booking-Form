// Elements
const checkin = document.getElementById('checkin');
const checkout = document.getElementById('checkout');
const roomType = document.getElementById('roomType');
const adults = document.getElementById('adults');
const priceBox = document.getElementById('priceBox');
const totalPrice = document.getElementById('totalPrice');
const nightsEl = document.getElementById('nights');
const form = document.getElementById('bookingForm');
const successModal = document.getElementById('successModal');

//  min date to today
const today = new Date().toISOString().split('T')[0];
checkin.min = today;

// Listeners
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
    const timeDiff = co - ci;
    const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

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

// Form Submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            successModal.classList.remove('hidden');
            form.reset();
            priceBox.classList.add('hidden');
        } else {
            alert("Something went wrong. Please try again.");
        }
    } catch (err) {
        alert("Network error.");
    }
});

function closeModal() {
    successModal.classList.add('hidden');
}
