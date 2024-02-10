function updateStock() {
    const medicineID = document.getElementById('medicineID').value.trim();
    const medicineName = document.getElementById('medicineName').value.trim();
    const genericName = document.getElementById('genericName').value.trim();
    const quantity = parseInt(document.getElementById('quantity').value);

    if (medicineID === '' || medicineName === '' || genericName === '' || isNaN(quantity) || quantity <= 0) {
        alert('Please enter valid values for all fields.');
        return;
    }

    // Here you can perform operations to update the stock of the medicine
    // You can make AJAX requests to your backend server to handle the update
    // For now, let's just log the values
    console.log('Updating stock for:');
    console.log('Medicine ID:', medicineID);
    console.log('Medicine Name:', medicineName);
    console.log('Generic Name:', genericName);
    console.log('Quantity:', quantity);

    // You can add further logic to communicate with your backend to update the stock
    // Once the stock is updated successfully, you can provide feedback to the user
    alert('Stock updated successfully!');
}
