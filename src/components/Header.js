import { Component } from "../common/Component.js";
import {allCategories} from "../data/categories.js";
import { cartContext } from "../contexts/CartContext.js";
export class Header extends Component {
  render() {
    const el = document.createElement('header');
    el.innerHTML = `
    <div class="nav-left">
        <img class="logo" src="../images/snappy_logo.jpg"/>
        <nav class="nav-search">
          <button id="homeBtn">Home</button>
          <div class="filters">
            <input type="text" id="searchInput" placeholder="Search products..." />
            <select id="categorySelect"></select>
          </div>
        </nav>
    </div>
    <div class="nav-right">
        <button id="cartBtn">
          🛒 Cart (<span id="cartCount">0</span>)
        </button>
    </div>
    `;

    const cartCount = el.querySelector('#cartCount');
    cartContext.subscribe(cart => {
      cartCount.textContent = cart.length;
    });

    const select = el.querySelector('#categorySelect');
    allCategories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat === 'all' ? 'All Categories' : cat;
      select.appendChild(option);
    });

    return el;
  }
}