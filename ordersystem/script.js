const menu = [
  { id: 1, name: '牛肉飯', price: 100, img: 'images/beef.jpg' },
  { id: 2, name: '雞排便當', price: 90, img: 'images/chicken.jpg' },
  { id: 3, name: '咖哩飯', price: 95, img: 'images/curry.jpg' }
];


const cart = {};

function renderMenu() {
  //const menuDiv = document.getElementById('menu');//畫菜單
  menu.forEach(item => {//一個一個拿出菜單中的每一項來做事
    const div = document.createElement('div');
    div.className = 'menu-item';
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}" style="width:150px; height:auto;">
      <h3>${item.name}</h3>
      <p>價格：${item.price} 元</p>
      <input type="number" min="0" value="0" onchange="updateOrder(${item.id}, this.value)">
    `;
    document.getElementById('menu').appendChild(div);
  });
}
function clearOrder() {
  for (let id in cart) {
    delete cart[id];
  }
  document.querySelectorAll('#menu input').forEach(input => input.value = 0);
  renderOrder();
}

function updateOrder(id, quantity) {
  if (quantity > 0) {
    cart[id] = parseInt(quantity);
  } else {
    delete cart[id];
  }
  renderOrder();
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

  totalSpan.textContent = total;
}

function submitOrder() {
  alert("訂單已送出！");
}
// 讓菜單在頁面載入後顯示
document.addEventListener('DOMContentLoaded', renderMenu);

