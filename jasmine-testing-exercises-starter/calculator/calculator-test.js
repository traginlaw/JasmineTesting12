it('should calculate the monthly rate correctly', function () {
	const values = {
		amount: 10000,
		years: 10,
		rate: 2.5,
	};
	expect(calculateMonthlyPayment(values)).toEqual('94.27');
});

it('should return a result with 2 decimal places', function () {
	const values = {
		amount: 10000,
		years: 10,
		rate: 2.5,
	};
	expect(calculateMonthlyPayment(values)).toEqual('94.27');
});

// comment for commit
