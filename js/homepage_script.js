document.addEventListener('DOMContentLoaded', function() {
    const medicineList = document.querySelector('.medicine-list');

    // Simulated data for featured medicines
    const featuredMedicines = [
        { name: 'Paracetamol', price: '5.99' },
        { name: 'Ibuprofen', price: '7.49' },
        { name: 'Cetirizine', price: '9.99' },
        { name: 'Amoxicillin', price: '12.99' },
        { name: 'Omeprazole', price: '8.99' }
    ];

    // Display featured medicines
    featuredMedicines.forEach(medicine => {
        const medicineItem = document.createElement('div');
        medicineItem.classList.add('medicine-item');
        medicineItem.innerHTML = `
            <h3>${medicine.name}</h3>
            <p>$${medicine.price}</p>
        `;
        medicineList.appendChild(medicineItem);
    });
});
