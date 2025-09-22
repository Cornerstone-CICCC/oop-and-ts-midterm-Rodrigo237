import { Component } from "../common/Component.js";
import { cartContext } from "../contexts/CartContext.js";

export class CartItem extends Component {
  render() {
    const {item} = this.props;
    const container = document.createElement('div');
    container.className = 'cart-item';
    container.innerHTML = `
      <span>${item.title}</span>
      <button>Delete</button>
    `;

    container.querySelector('button').addEventListener('click',()=>{
      cartContext.removeItem(item.id);
    })

    return container;
  }
}