describe('PAYMENTS.JS FUNCTION TESTS', function () {
	describe('submitPaymentInfo Tests', function () {
		beforeAll(function () {
			// initialization logic
			billAmtInput.value = 25;
			tipAmtInput.value = 5;
			submitPaymentInfo();
		});

		it('Passes when a new payment exists in allPayments object from the submitPaymentInfo()', function () {
			expect(Object.keys(allPayments).length).toEqual(1);
			expect(JSON.stringify(allPayments['payment' + paymentId])).toContain(
				'"billAmt":"25","tipAmt":"5","tipPercent":20'
			);
		});

		it('Passes when the new payment is in the payment table with bill amount = 25, tip amount = 5, tip percentage = 20%', function () {
			expect(paymentTbody.innerHTML).toContain(
				'<tr id="payment1"><td>$25</td><td>$5</td><td>20%</td></tr>'
			);
		});

		it('Passes when the new payment is in the summary table with bill amount = $25', function () {
			expect(summaryTds[0].innerHTML).toEqual('$25');
		});

		it('Passes when the new payment is in the summary table with tip amount = $5', function () {
			expect(summaryTds[1].innerHTML).toEqual('$5');
		});

		it('Passes when the new payment is in the summary table with average tip percentage = 20%', function () {
			expect(summaryTds[2].innerHTML).toEqual('20%');
		});

		afterAll(function () {
			// teardown logic
			// initialization logic
			billAmtInput.value = '';
			tipAmtInput.value = '';

			delete allPayments['payment' + paymentId];

			paymentId = 0;
			paymentTbody.innerHTML = '';

			summaryTds[0].innerHTML = '';
			summaryTds[1].innerHTML = '';
			summaryTds[2].innerHTML = '';
		});
	});

	describe('updateSummary Tests', function () {
		beforeAll(function () {
			// initialization logic
			billAmtInput.value = 25;
			tipAmtInput.value = 3;
			submitPaymentInfo();
			billAmtInput.value = 76;
			tipAmtInput.value = 7;
			submitPaymentInfo();
		});

		it('Passes when the number of payments is 2', function () {
			expect(Object.keys(allPayments).length).toEqual(2);
		});

		it('Passes when 2 payments exists in the allPayments object', function () {
			expect(JSON.stringify(allPayments)).toContain(
				'"payment1":{"billAmt":"25","tipAmt":"3","tipPercent":12'
			);
			expect(JSON.stringify(allPayments)).toContain(
				'"payment2":{"billAmt":"76","tipAmt":"7","tipPercent":9'
			);
		});

		it('Passes when 2 payments exists in payment table', function () {
			expect(paymentTbody.innerHTML).toContain(
				'<tr id="payment1"><td>$25</td><td>$3</td><td>12%</td></tr>'
			);
			expect(paymentTbody.innerHTML).toContain(
				'<tr id="payment2"><td>$76</td><td>$7</td><td>9%</td></tr>'
			);
		});

		it('Passes when the new payment is in the summary table with bill amount = $101', function () {
			expect(summaryTds[0].innerHTML).toEqual('$101');
		});

		it('Passes when the new payment is in the summary table with tip amount = $10', function () {
			expect(summaryTds[1].innerHTML).toEqual('$10');
		});

		it('Passes when the new payment is in the summary table with average tip percentage = 11%', function () {
			expect(summaryTds[2].innerHTML).toEqual('11%');
		});

		afterAll(function () {
			// teardown logic
			// initialization logic
			billAmtInput.value = '';
			tipAmtInput.value = '';

			delete allPayments['payment1'];
			delete allPayments['payment2'];

			paymentId = 0;
			paymentTbody.innerHTML = '';

			summaryTds[0].innerHTML = '';
			summaryTds[1].innerHTML = '';
			summaryTds[2].innerHTML = '';
		});
	});

	describe('appendPaymentTable tests', function () {
		beforeEach(function () {
			// initialization logic
			billAmtInput.value = 25;
			tipAmtInput.value = 5;
			paymentId = 1;
			tempPayment = {
				billAmt: billAmtInput.value,
				tipAmt: tipAmtInput.value,
				tipPercent: calculateTipPercent(billAmtInput.value, tipAmtInput.value),
			};
			appendPaymentTable(tempPayment);
		});

		it('The payment table should have one row', function () {
			expect(paymentTbody.innerHTML).toContain(
				'<tr id="payment1"><td>$25</td><td>$5</td><td>20%</td></tr>'
			);
		});

		afterEach(function () {
			// initialization logic
			billAmtInput.value = '';
			tipAmtInput.value = '';
			paymentId = 0;

			paymentTbody.innerHTML = '';
		});
	});

	describe('createCurPayment tests', function () {
		describe("createCurPayment '' billAmtInput test", function () {
			beforeEach(function () {
				// initialization logic
				billAmtInput.value = '';
				tipAmtInput.value = 5;
			});

			it('passes when createCurPayment returns undefined when billAmtInput.value is ""', function () {
				expect(createCurPayment()).toBeUndefined();
			});

			afterEach(function () {
				// initialization logic
				billAmtInput.value = '';
				tipAmtInput.value = '';
				//paymentId = 0;

				paymentTbody.innerHTML = '';
			});
		});

		describe("createCurPayment '' tipAmtIInput test", function () {
			beforeEach(function () {
				// initialization logic
				billAmtInput.value = 25;
				tipAmtInput.value = '';
			});

			it('passes when createCurPayment returns undefined when tipAmtInput.value is ""', function () {
				expect(createCurPayment()).toBeUndefined();
			});

			afterEach(function () {
				// initialization logic
				billAmtInput.value = '';
				tipAmtInput.value = '';

				paymentTbody.innerHTML = '';
			});
		});

		describe('createCurPayment billAmtInput > 0 test', function () {
			beforeEach(function () {
				// initialization logic
				billAmtInput.value = 0;
				tipAmtInput.value = 5;
			});

			it('passes when createCurPayment returns undefined when billAmtInput.value is 0', function () {
				expect(createCurPayment()).toBeUndefined();
			});

			afterEach(function () {
				// initialization logic
				billAmtInput.value = '';
				tipAmtInput.value = 5;

				paymentTbody.innerHTML = '';
			});
		});

		describe('createCurPayment billAmtInput > 0 test', function () {
			beforeEach(function () {
				// initialization logic
				billAmtInput.value = 0;
				tipAmtInput.value = 5;
			});

			it('passes when createCurPayment returns undefined when billAmtInput.value is -1', function () {
				expect(createCurPayment()).toBeUndefined();
			});

			afterEach(function () {
				// initialization logic
				billAmtInput.value = '';
				tipAmtInput.value = '';

				paymentTbody.innerHTML = '';
			});
		});

		describe('createCurPayment tipAmtInput < 0 test', function () {
			beforeEach(function () {
				// initialization logic
				billAmtInput.value = 25;
				tipAmtInput.value = -5;
			});

			it('passes when createCurPayment returns undefined when tipAmtInput.value is -5', function () {
				expect(createCurPayment()).toBeUndefined();
			});

			afterEach(function () {
				// initialization logic
				billAmtInput.value = '';
				tipAmtInput.value = '';

				paymentTbody.innerHTML = '';
			});
		});

		describe('createCurPayment tipAmtInput is 0 test', function () {
			beforeEach(function () {
				// initialization logic
				billAmtInput.value = 25;
				tipAmtInput.value = 0;
			});

			it('passes when createCurPayment returns an object with billAmt = 25, tipAmt = 0, tipPercent = 0', function () {
				expect(JSON.stringify(createCurPayment())).toContain(
					'"billAmt":"25","tipAmt":"0","tipPercent":0'
				);
			});

			afterEach(function () {
				// initialization logic
				billAmtInput.value = -1;
				tipAmtInput.value = 5;

				paymentTbody.innerHTML = '';
			});
		});

		describe('createCurPayment tipAmtInput is 5 test', function () {
			beforeEach(function () {
				// initialization logic
				billAmtInput.value = 25;
				tipAmtInput.value = 5;
			});

			it('passes when createCurPayment returns an object with billAmt = 25, tipAmt = 5, tipPercent = 20%', function () {
				expect(JSON.stringify(createCurPayment())).toContain(
					'"billAmt":"25","tipAmt":"5","tipPercent":20'
				);
			});

			afterEach(function () {
				// initialization logic
				billAmtInput.value = -1;
				tipAmtInput.value = 5;

				paymentTbody.innerHTML = '';
			});
		});
	});
});
