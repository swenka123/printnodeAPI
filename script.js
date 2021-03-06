//"computers" variable is a placeholder for "computers-menu" in HTML codej
const computers = document.getElementById('computers-menu');

//Sets class of #computers-menu to "container"
//Is this even needed? Can't I just set container class in the HTML?
computers.setAttribute('class', 'container');

// Create a request variable and assign a new XMLHttpRequest object to it.
var computersRequest = new XMLHttpRequest();

// Open a new connection, using GET request for URL endpoint, asynchronus
computersRequest.open('GET', 'https://api.printnode.com/computers', true);

// Encodes API key into Base64 ASCII string
// End goal is that this will pull unencoded API key from db
var encodedKey = 'Basic ' + btoa('EYmLiWfsHQ_mtTdIDlu3yTzk7G2jSqcrGvqhPqCoJbI');

// Adds header to the request with Basic Auth and API key
computersRequest.setRequestHeader('Authorization', encodedKey);

// Function called when XMLHttpRequest transaction completes successfully
computersRequest.onload = function () {
	// Begin accessing JSON data here by turning responses into Javascript objects
	var computersData = JSON.parse(this.response);
	// If no error message, then for each Computer in the JSON response data...
	if (computersRequest.status >= 200 && computersRequest.status < 400) {
		computersData.forEach(computer => {
			// ...create a div with class of "card"
			const card = document.createElement('div');
			card.setAttribute('class', 'card');
			// ...create an <h1> and set the text content to the computer's title
			const computerName = document.createElement('h1');
			computerName.textContent = computer.name;
			// ...create an <h2> and set the text content to the computer's ID
			const computerID = document.createElement('h2');
			computerID.textContent = computer.id;
			// ...create a <p> and set the text content to the computer's status
			const computerState = document.createElement('p');
			// Limit to 20 chars
			computer.state = computer.state.substring(0, 20);
			computerState.textContent = `${computer.state}`;
			// ...append <h1>, <h2>, and <p> to card
			card.appendChild(computerName);
			card.appendChild(computerID);
			card.appendChild(computerState);
			// ...append card to the #computers-menu container element
			computers.appendChild(card);
		// ...log each computer's name to console. Not really needed, but extra check for functionality for now.
		console.log(computer.name);
		})
	}
	// If error message, or the above broke...
	else {
		console.log("It Broke.");
	}	
}	

// Send request
computersRequest.send()