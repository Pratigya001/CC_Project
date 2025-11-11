let mithaiList = JSON.parse(localStorage.getItem('mithaiList')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveData() {
  localStorage.setItem('mithaiList', JSON.stringify(mithaiList));
  localStorage.setItem('cart', JSON.stringify(cart));
}

function showPage(id) {
  document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id === 'home') displayMithai();
  if (id === 'cart') displayCart();
}

function displayMithai(list = mithaiList) {
  const container = document.getElementById('product-list');
  container.innerHTML = '';
  if (list.length === 0) {
    container.innerHTML = '<p>No mithai available yet. Add some!</p>';
    return;
  }
  list.forEach((m, i) => {
    container.innerHTML += `
      <div class="card">
        <img src="${m.img || 'https://via.placeholder.com/200x200?text=Mithai'}" alt="${m.name}">
        <h3>${m.name}</h3>
        <p>Category: ${m.category}</p>
        <p>₹${m.price}</p>
        <button onclick="addToCart(${i})">Add to Cart</button>
        <button class="delete-btn" onclick="deleteMithai(${i})">Delete</button>
      </div>`;
  });
}

document.getElementById('add-form').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('mname').value;
  const price = parseFloat(document.getElementById('mprice').value);
  const category = document.getElementById('mcategory').value;
  const img = document.getElementById('mimg').value;

  mithaiList.push({ name, price, category, img });
  saveData();
  alert('Added successfully!');
  e.target.reset();
  showPage('home');
});

function addToCart(i) {
  cart.push(mithaiList[i]);
  saveData();
  updateCartCount();
  alert('Added to cart!');
}

function deleteMithai(i) {
  const confirmDelete = confirm(`Are you sure you want to delete "${mithaiList[i].name}"?`);
  if (confirmDelete) {
    mithaiList.splice(i, 1);
    saveData();
    displayMithai();
    alert(' Deleted successfully!');
  }
}

function displayCart() {
  const list = document.getElementById('cart-items');
  list.innerHTML = '';
  let total = 0;
  if (cart.length === 0) {
    list.innerHTML = '<p>Your cart is empty!</p>';
    document.getElementById('total').innerText = 'Total: ₹0';
    return;
  }
  cart.forEach((item, i) => {
    total += item.price;
    list.innerHTML += `
      <div class="cart-item">
        <span>${item.name} - ₹${item.price}</span>
        <button onclick="removeItem(${i})">Remove</button>
      </div>`;
  });
  document.getElementById('total').innerText = `Total: ₹${total}`;
}

function removeItem(i) {
  cart.splice(i, 1);
  saveData();
  displayCart();
  updateCartCount();
}

function checkout() {
  if (cart.length === 0) return alert('Your cart is empty!');
  alert('Thank you for your sweet purchase 🍡!');
  cart = [];
  saveData();
  displayCart();
  updateCartCount();
}

function updateCartCount() {
  document.getElementById('cart-count').innerText = cart.length;
}

function searchMithai() {
  const searchValue = document.getElementById('search').value.toLowerCase();
  const filtered = mithaiList.filter(m => m.name.toLowerCase().includes(searchValue));
  displayMithai(filtered);
}

function filterMithai() {
  const category = document.getElementById('filter').value;
  if (category === 'all') return displayMithai();
  const filtered = mithaiList.filter(m => m.category.toLowerCase() === category.toLowerCase());
  displayMithai(filtered);
}

displayMithai();
updateCartCount();
