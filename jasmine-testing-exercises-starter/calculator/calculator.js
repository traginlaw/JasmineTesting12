window.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('calc-form');
	if (form) {
		setupIntialValues();
		form.addEventListener('submit', function (e) {
			e.preventDefault();
			update();
		});
	}
});

function getCurrentUIValues() {
	return {
		amount: +document.getElementById('loan-amount').value,
		years: +document.getElementById('loan-years').value,
		rate: +document.getElementById('loan-rate').value,
	};
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
	const userValues = { amount: 0, years: 0, rate: 0.0 };
	const amount = document.getElementById('loan-amount').value;
	console.log(amount);
	const years = document.getElementById('loan-years').value;
	const rate = document.getElementById('loan-rate').value;
	const amountUser = userValues.amount;
	const yearsUser = userValues.years;
	const rateUsers = userValues.rate;
	update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
	const currentUserValues = getCurrentUIValues();
	updateMonthly(calculateMonthlyPayment(currentUserValues));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(userValues) {
	const interest = (userValues.rate * 0.01) / 12;
	const m = Math.floor(userValues.years * 12);
	return (
		(interest * userValues.amount) /
		(1 - Math.pow(1 + interest, -m))
	).toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
	const monthlyAmount = document.getElementById('monthly-payment');
	monthlyAmount.innerText = '$' + monthly;
	monthlyAmount.appendChild(monthly);
}
