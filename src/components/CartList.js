import { Component } from "../common/Component.js";
import { cartContext } from "../contexts/CartContext.js";
import { CartItem } from "./CartItem.js";

export class CartList extends Component {
    render() {
    const cartContext = this.props.cartContext;
    const container = document.createElement('div');
    container.className = 'cart-list';

    const title = document.createElement('h2');
    title.textContent = 'Cart';
    container.appendChild(title);

    const totalCount = document.createElement('div');
    totalCount.className = 'cart-total-count';
    const totalPay = document.createElement('div');
    totalPay.className = 'cart-total-pay';

    const totals = document.createElement('div');
    totals.className = 'cart-summary-totals';
    totals.appendChild(totalCount);
    totals.appendChild(totalPay);

    container.appendChild(totals);

    const list = document.createElement('div');
    container.appendChild(list);

    const renderItems = (cart) => {

      const total = cart.reduce((sum, item) => sum + (item.count || 1), 0);
      totalCount.textContent = `Total products: ${total}`;

      const totalAmount = cart.reduce((sum, item) => sum + (item.price * (item.count || 1)), 0);
      totalPay.textContent = `Total: $${totalAmount.toFixed(2)}`;


      list.innerHTML = '';
      if (cart.length === 0) {
        list.innerHTML = '<p>Empty</p>';
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