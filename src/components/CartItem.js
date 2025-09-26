import { Component } from "../common/Component.js";
import { cartContext } from "../contexts/CartContext.js";

export class CartItem extends Component {
  render() {
    const {item} = this.props;
    const container = document.createElement('div');
    container.className = 'cart-item';
    container.innerHTML = `
    <img src="${item.image}" alt="${item.title}" />
    <span class="item-count"><strong>x${item.count}</strong></span>
    <span class="item-price">$${item.price}</span>
    <div class="quantity-controls">
      <button class="increase-btn">+</button>
      <button class="decrease-btn">−</button>
    </div>
    <button class="delete-btn">🗑️</button>
    `;


  container.querySelector('.increase-btn').addEventListener('click', () => {
      item.count += 1;
      cartContext.notifyListeners();
    });

  container.querySelector('.decrease-btn').addEventListener('click', () => {
      if (item.count > 1) {
        item.count -= 1;
      } else {
        return;
      }
      cartContext.notifyListeners();
    });

    container.querySelector('.delete-btn').addEventListener('click', () => {
      container.classList.add('removing');
      setTimeout(() => {
      cartContext.removeItem(item.id);
      }, 400); 
    });


    return container;
  }
}