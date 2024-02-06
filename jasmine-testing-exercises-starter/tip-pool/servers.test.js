describe('Servers test (with setup and tear-down)', function () {
	beforeEach(function () {
		// initialization logic
		serverNameInput.value = 'Alice';
		submitServerInfo();
	});

	it('should add a new server to allServers on submitServerInfo()', function () {
		submitServerInfo();

		expect(Object.keys(allServers).length).toEqual(1);
		expect(allServers['server' + serverId].serverName).toEqual('Alice');
	});

	it('The Server Name / Earnings table in the UI should include the new server', function () {
		expect(serverTbody.innerHTML).toEqual(
			'<tr id="server1"><td>Alice</td><td>$0.00</td></tr>'
		);
	});

	afterEach(function () {
		// teardown logic
		serverTbody.innerHTML = '';
		delete allServers['server1'];
		serverId = 0;
	});
});

describe('updateServerTable tests when there are no bills', function () {
	beforeEach(function () {
		// initialization logic
		allServers.server1 = { serverName: 'Ashley' };
		allServers.server2 = { serverName: 'Rafaela' };
		updateServerTable();
	});

	it('Passes when two servers exist in the Server Name/ Earnings table in the UI with $0 earnings', function () {
		expect(serverTbody.innerHTML).toContain(
			'<tr id="server1"><td>Ashley</td><td>$0.00</td></tr>'
		);
		expect(serverTbody.innerHTML).toContain(
			'<tr id="server2"><td>Rafaela</td><td>$0.00</td></tr>'
		);
	});

	afterEach(function () {
		// teardown logic
		serverTbody.innerHTML = '';
		delete allServers['server1'];
		delete allServers['server2'];
	});
});
