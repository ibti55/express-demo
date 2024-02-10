document.addEventListener("DOMContentLoaded", function() {
    // Sample orders data
    const orders = [
        { id: 1, time: "2024-01-28 10:00:00", status: "Pending", amount: 50.00 },
        { id: 2, time: "2024-01-27 15:30:00", status: "Shipped", amount: 75.50 },
        { id: 3, time: "2024-01-26 09:45:00", status: "Delivered", amount: 120.25 }
    ];

    const ordersContainer = document.getElementById("orders-container");

    // Display orders
    orders.forEach(order => {
        const orderDiv = document.createElement("div");
        orderDiv.classList.add("order");

        orderDiv.innerHTML = `
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Time:</strong> ${order.time}</p>
            <p><strong>Status:</strong> ${order.status}</p>
            <p><strong>Amount:</strong> $${order.amount.toFixed(2)}</p>
            <button class="view-details-btn">View Details</button>
            <div class="details">
                <!-- Placeholder for order details -->
                <p>This is where detailed order information will be displayed.</p>
            </div>
        `;

        const viewDetailsBtn = orderDiv.querySelector(".view-details-btn");
        const detailsDiv = orderDiv.querySelector(".details");

        viewDetailsBtn.addEventListener("click", function() {
            detailsDiv.classList.toggle("show");
            if (detailsDiv.classList.contains("show")) {
                viewDetailsBtn.textContent = "Hide Details";
            } else {
                viewDetailsBtn.textContent = "View Details";
            }
        });

        ordersContainer.appendChild(orderDiv);
    });
});
