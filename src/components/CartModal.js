// components/CartModal.js
import { Component } from "../common/Component.js";
import { cartContext } from "../contexts/CartContext.js";

export class CartModal extends Component {
  render() {
    const modal = document.createElement('div');
    modal.className = 'cart-modal-overlay';

    const content = document.createElement('div');
    content.className = 'cart-modal-content';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-modal';
    closeBtn.textContent = '×';

    const title = document.createElement('h2');
    title.textContent = 'Purchase Summary';

    const list = document.createElement('ul');
    list.className = 'cart-summary-list';

    let total = 0;
    cartContext.getItems().forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <div class="item-info">
        <span class="item-title">${item.title}</span>
        <span class="item-price">$${item.price}</span>
      </div>
      `;
      list.appendChild(li);
      total += item.price;
    });

    const totalDisplay = document.createElement('p');
    totalDisplay.className = 'cart-total';
    totalDisplay.textContent = `Total: $${total.toFixed(2)}`;

    const payBtn = document.createElement('button');
    payBtn.className = 'pay-button';
    payBtn.textContent = 'Simulate Payment';

    payBtn.addEventListener('click', () => {
  if (total <= 0) {
    alert('⚠️ Your cart is empty. Add products before simulating payment.');
    return;
  }

  alert('✅ Payment simulated! Thank you for your purchase.');
  cartContext.cart = [];
  cartContext.notifyListeners();
  modal.remove();
});


    closeBtn.addEventListener('click', () => {
      modal.remove();
    });

    content.appendChild(closeBtn);
    content.appendChild(title);
    content.appendChild(list);
    content.appendChild(totalDisplay);
    content.appendChild(payBtn);
    modal.appendChild(content);

    return modal;
  }
}
