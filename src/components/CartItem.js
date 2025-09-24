import { Component } from "../common/Component.js";
import { cartContext } from "../contexts/CartContext.js";

export class CartItem extends Component {
  render() {
    const {item} = this.props;
    const container = document.createElement('div');
    container.className = 'cart-item';
    container.innerHTML = `
      <span>${item.title} <strong>x${item.count}</span>
      <button class="decrease-btn"> - </button> 
      <button class="delete-btn">🗑️</button>    
  `;

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