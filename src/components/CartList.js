import { Component } from "../common/Component.js";
import { cartContext } from "../contexts/CartContext.js";
import { CartItem } from "./CartItem.js";

export class CartList extends Component {
    render() {
    const cartContext = this.props.cartContext;
    const container = document.createElement('div');
    container.className = 'cart-list';

    const title = document.createElement('h2');
    title.textContent = 'Carrito';
    container.appendChild(title);

    const list = document.createElement('div');
    container.appendChild(list);

    const renderItems = (cart) => {
      list.innerHTML = '';
      if (cart.length === 0) {
        list.innerHTML = '<p>Vacío</p>';
      } else {
        cart.forEach(item => {
          const cartItem = new CartItem({ item, cartContext });
          list.appendChild(cartItem.render());
        });
      }
    };

    cartContext.subscribe(renderItems);
    renderItems(cartContext.getItems());

    return container;
  }
}