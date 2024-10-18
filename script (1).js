let userTicket = {};

// List of available rides from Jaipur
const rides = [
  { id: 1, name: "Jaipur to Delhi", price: 500 },
  { id: 2, name: "Jaipur to Ajmer", price: 300 },
  { id: 3, name: "Jaipur to Alwar", price: 350 },
  { id: 4, name: "Jaipur to Amer", price: 150 },
  { id: 5, name: "Jaipur to Udaipur", price: 700 },
  { id: 6, name: "Jaipur to Jodhpur", price: 600 },
  { id: 7, name: "Jaipur to Kota", price: 450 },
  { id: 8, name: "Jaipur to Bikaner", price: 550 },
];

// Show Registration Form
document.getElementById('showRegisterBtn').addEventListener('click', function () {
  document.getElementById('homeSection').style.display = 'none';
  document.getElementById('registerSection').style.display = 'block';
});

// Show Login Form
document.getElementById('showLoginBtn').addEventListener('click', function () {
  document.getElementById('homeSection').style.display = 'none';
  document.getElementById('loginSection').style.display = 'block';
});

// Registration Logic
document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const phone = document.getElementById('registerPhone').value;
  const password = md5(document.getElementById('registerPassword').value); // MD5 password hash
  const address = document.getElementById('address').value;

  // Save user in localStorage
  const user = { firstName, lastName, phone, password, address };
  localStorage.setItem(phone, JSON.stringify(user));

  alert('Registration successful! Redirecting to login...');
  setTimeout(() => {
    window.location.href = 'index.html'; // Redirect to home page after registration
  }, 2000);
});

// Login Logic
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const phone = document.getElementById('loginPhone').value;
  const password = md5(document.getElementById('loginPassword').value); // MD5 password hash

  const user = JSON.parse(localStorage.getItem(phone));

  if (user && user.password === password) {
    alert('Login successful!');
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('rideSection').style.display = 'block'; // Show ride selection section
    displayRides();
  } else {
    alert('Invalid login credentials!');
  }
});

// Display available rides
function displayRides() {
  const ridesContainer = document.getElementById('ridesContainer');
  ridesContainer.innerHTML = ''; // Clear previous rides

  rides.forEach(ride => {
    const rideDiv = document.createElement('div');
    rideDiv.className = 'ride';
    rideDiv.innerHTML = `${ride.name} - ₹${ride.price} <button class="selectRideBtn" data-id="${ride.id}">Select</button>`;
    ridesContainer.appendChild(rideDiv);
  });

  // Add event listeners to ride selection buttons
  const selectRideBtns = document.querySelectorAll('.selectRideBtn');
  selectRideBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const rideId = this.getAttribute('data-id');
      const selectedRide = rides.find(ride => ride.id == rideId);
      userTicket.ride = selectedRide.name;
      userTicket.price = selectedRide.price;

      document.getElementById('confirmTicketBtn').style.display = 'inline-block';
    });
  });
}

// Confirm Ticket Logic
document.getElementById('confirmTicketBtn').addEventListener('click', function () {
  userTicket.ticketId = Math.floor(Math.random() * 10000); // Random ticket ID
  document.getElementById('ticketDetails').innerText = `Ticket ID: ${userTicket.ticketId}\nRide: ${userTicket.ride}\nPrice: ₹${userTicket.price}`;
  
  // Show ticket section
  document.getElementById('rideSection').style.display = 'none';
  document.getElementById('ticketSection').style.display = 'block';
});

// Download Ticket Logic
document.getElementById('downloadTicketBtn').addEventListener('click', function () {
  const ticketContent = document.getElementById('ticketDetails').innerText;
  const blob = new Blob([ticketContent], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `ticket_${userTicket.ticketId}.txt`;
  link.click(); // Automatically trigger the download
});

// Back to Home Logic
document.getElementById('backToHomeBtn').addEventListener('click', function () {
  document.getElementById('ticketSection').style.display = 'none';
  document.getElementById('homeSection').style.display = 'block'; // Show home section
});

// Mask the phone number (e.g., 9876543210 -> 9876****10)
function maskPhoneNumber(phone) {
  return phone.slice(0, 4) + "****" + phone.slice(-2);
}

// Registration Logic
document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const phone = document.getElementById('registerPhone').value;
  const password = md5(document.getElementById('registerPassword').value); // MD5 password hash
  const address = document.getElementById('address').value;

  // Save user in localStorage
  const user = { firstName, lastName, phone, password, address };
  localStorage.setItem(phone, JSON.stringify(user));

  alert('Registration successful! Redirecting to login...');
  setTimeout(() => {
    window.location.href = 'index.html'; // Redirect to home page after registration
  }, 2000);
});

// Login Logic
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const phone = document.getElementById('loginPhone').value;
  const password = md5(document.getElementById('loginPassword').value); // MD5 password hash

  const user = JSON.parse(localStorage.getItem(phone));

  if (user && user.password === password) {
    alert('Login successful!');
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('rideSection').style.display = 'block'; // Show ride selection section
    displayRides();
    userTicket.phone = phone; // Store phone number for ticket details
  } else {
    alert('Invalid login credentials!');
  }
});

// Display available rides
function displayRides() {
  const ridesContainer = document.getElementById('ridesContainer');
  ridesContainer.innerHTML = ''; // Clear previous rides

  rides.forEach(ride => {
    const rideDiv = document.createElement('div');
    rideDiv.className = 'ride';
    rideDiv.innerHTML = `${ride.name} - ₹${ride.price} <button class="selectRideBtn" data-id="${ride.id}">Select</button>`;
    ridesContainer.appendChild(rideDiv);
  });

  // Add event listeners to ride selection buttons
  const selectRideBtns = document.querySelectorAll('.selectRideBtn');
  selectRideBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const rideId = this.getAttribute('data-id');
      const selectedRide = rides.find(ride => ride.id == rideId);
      userTicket.ride = selectedRide.name;
      userTicket.price = selectedRide.price;

      document.getElementById('confirmTicketBtn').style.display = 'inline-block';
    });
  });
}

// Confirm Ticket Logic
document.getElementById('confirmTicketBtn').addEventListener('click', function () {
  userTicket.ticketId = Math.floor(Math.random() * 10000); // Random ticket ID
  const maskedPhone = maskPhoneNumber(userTicket.phone); // Mask phone number

  document.getElementById('ticketDetails').innerText = 
    `Ticket ID: ${userTicket.ticketId}\n` +
    `Ride: ${userTicket.ride}\n` +
    `Price: ₹${userTicket.price}\n` +
    `Mobile: ${maskedPhone}`; // Display masked phone number

  // Show ticket section
  document.getElementById('rideSection').style.display = 'none';
  document.getElementById('ticketSection').style.display = 'block';
});

// Download Ticket Logic
document.getElementById('downloadTicketBtn').addEventListener('click', function () {
  const ticketContent = document.getElementById('ticketDetails').innerText;
  const blob = new Blob([ticketContent], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `ticket_${userTicket.ticketId}.txt`;
  link.click(); // Automatically trigger the download
});

// Back to Home Logic
document.getElementById('backToHomeBtn').addEventListener('click', function () {
  document.getElementById('ticketSection').style.display = 'none';
  document.getElementById('homeSection').style.display = 'block'; // Show home section
});
