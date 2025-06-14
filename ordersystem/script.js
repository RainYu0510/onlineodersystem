const menu = [
  { id: 1, name: '牛肉飯', price: 100, image: 'images/beef.png', category: 'main' },
  { id: 2, name: '雞排便當', price: 90, image: 'images/chicken.png', category: 'main' },
  { id: 3, name: '咖哩飯', price: 95, image: 'images/curry.png', category: 'main' },
  { id: 4, name: '紅茶', price: 30, image: 'images/tea.png', category: 'drink' },
  { id: 5, name: '珍珠奶茶', price: 50, image: 'images/bubble_tea.png', category: 'drink' },
  { id: 6, name: '布丁', price: 40, image: 'images/pudding.png', category: 'dessert' },
];

const cart = {};
let discount = 1; // 折扣倍率，1 = 無折扣

function renderMenu(filter = 'all') {
  const menuDiv = document.getElementById('menu');
  menuDiv.innerHTML = ''; // 清空舊資料

  const filteredMenu = filter === 'all'
    ? menu
    : menu.filter(item => item.category === filter);

  filteredMenu.forEach(item => {
    const div = document.createElement('div');
    div.className = 'menu-item';
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <h3>${item.name}</h3>
      <p>價格：${item.price} 元</p>
      <input type="number" min="0" value="${cart[item.id] || 0}" onchange="updateOrder(${item.id}, this.value)" />
    `;
    menuDiv.appendChild(div);
  });
}

function updateOrder(id, quantity) {
  if (quantity > 0) {
    cart[id] = parseInt(quantity);
  } else {
    delete cart[id];
  }
  renderOrder();
  // 重新渲染菜單以同步數量
  const categorySelect = document.getElementById('category-select');
  renderMenu(categorySelect.value);
}

function renderOrder() {
  const orderDiv = document.getElementById('order');
  const totalSpan = document.getElementById('total');
  orderDiv.innerHTML = '';
  let total = 0;

  for (let id in cart) {
    const item = menu.find(m => m.id == id);
    const qty = cart[id];
    const subtotal = qty * item.price;
    total += subtotal;
    orderDiv.innerHTML += `<p>${item.name} x ${qty} = ${subtotal} 元</p>`;
  }

  // 套用折扣
  const discountedTotal = Math.round(total * discount);
  totalSpan.textContent = discountedTotal;
}

function submitOrder() {
  alert("訂單已送出！");
}

// 篩選選單事件
document.getElementById('category-select').addEventListener('change', e => {
  renderMenu(e.target.value);
});

function submitOrder() {
  if (Object.keys(cart).length === 0) {
    alert("您尚未選擇任何品項！");
    return;
  }

  alert("訂單已送出！");
  clearOrder(); // 送出後也順便清空
}

function clearOrder() {
  // 清空所有資料
  for (let id in cart) {
    delete cart[id];
  }
  discount = 1;
  document.getElementById('discount-code').value = '';
  document.getElementById('discount-message').textContent = '';

  renderOrder();
  renderMenu(document.getElementById('category-select').value);
}

// 折扣按鈕事件
document.getElementById('apply-discount').addEventListener('click', () => {
  const codeInput = document.getElementById('discount-code');
  const msg = document.getElementById('discount-message');
  const code = codeInput.value.trim().toUpperCase();

  // 假設折扣碼只有一組
  if (code === 'SAVE10') {
    discount = 0.9;
    msg.style.color = 'green';
    msg.textContent = '折扣碼有效！已享有9折優惠';
  } else if (code === '') {
    discount = 1;
    msg.textContent = '';
  } else {
    discount = 1;
    msg.style.color = 'red';
    msg.textContent = '折扣碼無效';
  }

  renderOrder();
});

// 初始載入
document.addEventListener('DOMContentLoaded', () => {
  renderMenu();
  renderOrder();
});
