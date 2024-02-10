// Sample user data
let users = [
    { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St' },
    { name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210', address: '456 Elm St' }
];

// Function to display users
function displayUsers() {
    const userList = document.getElementById('users');
    userList.innerHTML = '';
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.address}</td>
            <td>
                <button onclick="showDetails('${user.name}', '${user.email}', '${user.phone}', '${user.address}')">Details</button>
                <button onclick="deleteUser('${user.name}')">Delete</button>
            </td>
        `;
        userList.appendChild(row);
    });
}

// Function to add a new user
function addUser() {
    const name = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();

    if (name !== '' && email !== '' && phone !== '' && address !== '') {
        users.push({ name, email, phone, address });
        displayUsers();
        // Clear input fields after adding user
        document.getElementById('username').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('address').value = '';
    } else {
        alert('Please enter valid information for all fields.');
    }
}

// Function to show user details
function showDetails(name, email, phone, address) {
    // Redirect to index.html page with user details as query parameters
    window.location.href = `dashboard_user_details.html?name=${name}&email=${email}&phone=${phone}&address=${address}`;
}

// Function to delete a user
function deleteUser(name) {
    const index = users.findIndex(user => user.name === name);
    if (index !== -1) {
        users.splice(index, 1);
        displayUsers();
    }
}

// Initial display of users
displayUsers();

