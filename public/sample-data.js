/*
 * Enables functionality of artist search, track populating, and ranking
   for full game 
 */
// Sample data (replace with your API data later)
const sampleOrders = {
  "monday": [
      {name: "Arnold Palmer", type: "Drink", orders: 42},
      {name: "Hot Chocolate", type: "Drink", orders: 36},
      {name: "Turkey Bacon Avocado", type: "Food", orders: 22},
      {name: "Iced Matcha", type: "Drink", orders: 18},
  ],
  "tuesday": [
      {name: "Latte", type: "Drink", orders: 50},
      {name: "Chicken Quesadilla", type: "Food", orders: 18},
      {name: "Mango Smoothie", type: "Drink", orders: 32},
      {name: "Caprese Sandwich", type: "Food", orders: 22},
      {name: "Hummus Sandwich", type: "Food", orders: 20}
  ],
  "wednesday": [
    {name: "Cold Brew", type: "Drink", orders: 44},
    {name: "Pasta", type: "Food", orders: 28},
    {name: "Matcha Latte", type: "Drink", orders: 33},
    {name: "RDM Avocado Toast", type: "Food", orders: 25},
    {name: "Hot Chocolate", type: "Drink", orders: 19}
],
"thursday": [
    {name: "Chai Latte", type: "Drink", orders: 39},
    {name: "Hummus Sandwich", type: "Food", orders: 24},
    {name: "Iced Coffee", type: "Drink", orders: 45},
    {name: "Blueberry Waffles", type: "Food", orders: 29},
    {name: "Matcha Lemonade", type: "Drink", orders: 18}
],
"friday": [
    {name: "Iced Tea", type: "Drink", orders: 48},
    {name: "Grilled Chicken Sandwich", type: "Food", orders: 30},
    {name: "Matcha Latte", type: "Drink", orders: 37},
    {name: "Shakshuka", type: "Food", orders: 26},
    {name: "Lemonade", type: "Drink", orders: 15}
],
"saturday": [
    {name: "London Fog", type: "Drink", orders: 52},
    {name: "Beet & Goat Cheese Salad", type: "Food", orders: 35},
    {name: "Brain Freeze", type: "Drink", orders: 41},
    
],
"sunday": [
    {name: "Mocha", type: "Drink", orders: 45},
    {name: "Chai Tea Latte", type: "Drink", orders: 34},
    {name: "Hot Tea", type: "Drink", orders: 30},
    {name: "Ranch Salad", type: "Food", orders: 21},
]
};

// Populate Orders on Page Load
function populateOrders(day) {
  const ordersGrid = document.getElementById('orders-grid');
  ordersGrid.innerHTML = ""; 

  const orders = sampleOrders[day] || [];
  if (orders.length === 0) {
      ordersGrid.innerHTML = `<p>No popular orders found for ${day}.</p>`;
      return;
  }

  orders.forEach(order => {
      const card = document.createElement('div');
      card.classList.add('order-card');

      card.innerHTML = `<h3>${order.name}</h3>
          <p>Type: ${order.type}</p>
          <p>Orders: ${order.orders}</p>`;

      ordersGrid.appendChild(card);
  });
}

// Event Listener for Search Input
document.getElementById('search').addEventListener('input', (e) => {
  const day = e.target.value.trim();
  populateOrders(day);
});

// Initial Load with Monday's Data
populateOrders("Monday");
