// Get the buttons
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const button4 = document.getElementById('button4');

// Add click event listeners to the buttons
button1.addEventListener('click', () => {
  // Navigate to another page when button 1 is clicked
  window.location.href = 'dashboard_view_stock.html';
});

button2.addEventListener('click', () => {
  // Navigate to another page when button 2 is clicked
  window.location.href = 'page2.html';
});

button3.addEventListener('click', () => {
  // Navigate to another page when button 3 is clicked
  window.location.href = 'page3.html';
});

button4.addEventListener('click', () => {
  // Navigate to another page when button 4 is clicked
  window.location.href = 'page4.html';
});
