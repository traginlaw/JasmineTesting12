describe('HELPERS.JS FUNCTION TESTS', function () {
	describe('calculateTipPercentage function tests', function () {
		it('Passes when function returns 20 for a $20 tip on a $100 bill', function () {
			expect(calculateTipPercent(100, 20)).toEqual(20);
		});

		it('Passes when function returns 15 for a $3 tip on a $20 bill', function () {
			expect(calculateTipPercent(20, 3)).toEqual(15);
		});

		it('Passes when function returns 7 for a $30 tip on a $20 bill', function () {
			expect(calculateTipPercent(200, 14)).toEqual(7);
		});
	});

	describe('sumPaymentTotal function tests', function () {
		beforeEach(function () {
			// initialization logic - setup allPayments object

			allPayments.payment1 = {
				billAmt: 100,
				tipAmt: 20,
				tipPercent: 20,
			};
			allPayments.payment2 = {
				billAmt: 20,
				tipAmt: 3,
				tipPercent: 15,
			};
			allPayments.payment3 = {
				billAmt: 200,
				tipAmt: 14,
				tipPercent: 7,
			};
		});

		it('Passes when sumPyamentTotal function returns 320 for billAmt', function () {
			expect(sumPaymentTotal('billAmt')).toEqual(320);
		});

		it('Passes when sumPyamentTotal function returns 37 for tipAmt', function () {
			expect(sumPaymentTotal('tipAmt')).toEqual(37);
		});

		it('Passes when sumPyamentTotal function returns 42 for tipPercent', function () {
			expect(sumPaymentTotal('tipPercent')).toEqual(42);
		});

		afterEach(function () {
			// teardown logic
			delete allPayments['payment1'];
			delete allPayments['payment2'];
			delete allPayments['payment3'];
		});
	});
});
