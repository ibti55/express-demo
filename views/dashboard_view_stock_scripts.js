document.addEventListener('DOMContentLoaded', () => {
  (async () => {
    const table = document.getElementById('medicines');
    const searchInput = document.getElementById('searchInput');
    const filterSelect = document.getElementById('filterSelect');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');

    const ITEMS_PER_PAGE = 10;
    let currentPage = 1;

    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/dashboard_view_stock');
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
        return [];
      }
    }

    async function populateTable(pageNumber, filteredData) {
      const startIndex = (pageNumber - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const pageData = filteredData.slice(startIndex, endIndex);

      table.innerHTML = `<tr>
        <th>Medicine ID</th>
        <th>Medicine Name</th>
        <th>Generic Name</th>
        <th>Quantity</th>
      </tr>`;

      pageData.forEach(medicine => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${medicine.medicine_id}</td>
          <td>${medicine.medicine_name}</td>
          <td>${medicine.generic_name}</td>
          <td>${medicine.quantity}</td>
        `;
        table.appendChild(row);
      });

      updatePaginationButtons();
    }

    async function filterAndPaginate(searchTerm, filterValue) {
      console.log('sfsdkbjfdsjkfbdskj')
      const medicineData = await fetchData();

      let filteredData = medicineData.filter(medicine => {
        const idMatch = medicine.medicine_id.toLowerCase().includes(searchTerm.toLowerCase());
        const nameMatch = medicine.medicine_name.toLowerCase().includes(searchTerm.toLowerCase());
        const genericMatch = medicine.generic_name.toLowerCase().includes(searchTerm.toLowerCase());
        const quantityMatch = medicine.quantity.toString().includes(searchTerm.toLowerCase());

        if (filterValue === 'lowStock') {
          return (idMatch || nameMatch || genericMatch || quantityMatch) && medicine.quantity < 50;
        } else if (filterValue === 'outOfStock') {
          return (idMatch || nameMatch || genericMatch || quantityMatch) && medicine.quantity === 0;
        } else {
          return idMatch || nameMatch || genericMatch || quantityMatch;
        }
      });

      populateTable(currentPage, filteredData);
    }

    function updatePaginationButtons() {
      if (currentPage === 1) {
        prevPageButton.style.display = 'none';
      } else {
        prevPageButton.style.display = 'inline-block';
      }

      const totalPages = Math.ceil(medicineData.length / ITEMS_PER_PAGE);
      if (currentPage === totalPages || totalPages === 0) {
        nextPageButton.style.display = 'none';
      } else {
        nextPageButton.style.display = 'inline-block';
      }
    }

    // Initial population of the table
    await filterAndPaginate('', 'all');

    // Event listeners for search and filter
    searchInput.addEventListener('input', () => {
      filterAndPaginate(searchInput.value, filterSelect.value);
    });

    filterSelect.addEventListener('change', () => {
      filterAndPaginate(searchInput.value, filterSelect.value);
    });

    // Event listeners for pagination
    prevPageButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        filterAndPaginate(searchInput.value, filterSelect.value);
      }
    });

    nextPageButton.addEventListener('click', () => {
      const totalPages = Math.ceil(medicineData.length / ITEMS_PER_PAGE);
      if (currentPage < totalPages) {
        currentPage++;
        filterAndPaginate(searchInput.value, filterSelect.value);
      }
    });
  })();
});
