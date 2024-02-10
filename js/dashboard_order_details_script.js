document.addEventListener("DOMContentLoaded", function() {
    const orderDetailsContainer = document.getElementById("order-details-container");
    const goBackBtn = document.getElementById("go-back-btn");

    // Retrieve order details from localStorage
    const orderDetails = localStorage.getItem("orderDetails");

    if (orderDetails) {
        orderDetailsContainer.innerHTML = `<p>${orderDetails}</p>`;
    } else {
        orderDetailsContainer.innerHTML = "<p>No details available.</p>";
    }

    goBackBtn.addEventListener("click", function() {
        window.history.back();
    });
});
