document.addEventListener("DOMContentLoaded", function() {
    // Extract query parameters from the URL
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const email = params.get('email');
    const phone = params.get('phone');
    const address = params.get('address');

    // Display user details on the page
    const userDetailsContainer = document.getElementById('userDetails');
    userDetailsContainer.innerHTML = `
        <div class="user-info">
            <label>Name:</label>
            <span>${name}</span>
        </div>
        <div class="user-info">
            <label>Email:</label>
            <span>${email}</span>
        </div>
        <div class="user-info">
            <label>Phone:</label>
            <span>${phone}</span>
        </div>
        <div class="user-info">
            <label>Address:</label>
            <span>${address}</span>
        </div>
    `;
});
