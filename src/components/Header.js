import { Component } from "../common/Component.js";
import { cartContext } from "../contexts/CartContext.js";
import { CartModal } from "./CartModal.js"
export class Header extends Component {
  async render() {
    const el = document.createElement('header');
    el.innerHTML = `
    <div class="nav-left">
        <img class="logo" src="../images/snappy_logo.jpg"/>
        <nav class="nav-search">
          <button id="homeBtn">Home</button>
          <div class="filters">
            <div class="search-group">
              <input type="text" id="searchInput" placeholder="Search products..." />
              <button id="searchBtn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242 1.656a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/>
                </svg>
              </button>
            </div>
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

    const select = el.querySelector('#categorySelect');
    select.innerHTML = `<option value="all">All Categories</option>`;
    const res = await fetch('https://fakestoreapi.com/products/categories');
    const categories = await res.json();
    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      select.appendChild(option);
    });

    const cartCount = el.querySelector('#cartCount');
    cartContext.subscribe(cart => {
      const total = cart.reduce((sum, item) => sum + (item.count || 1), 0);
      cartCount.textContent = total;
    });

    const searchInput = el.querySelector('#searchInput');
    const searchBtn = el.querySelector('#searchBtn');
    searchBtn.addEventListener('click', () => {
      const event = new Event('input', { bubbles: true });
      searchInput.dispatchEvent(event);
    });

    const cartBtn = el.querySelector('#cartBtn');
    cartBtn.addEventListener('click', () => {
    const modal = new CartModal().render();
      document.body.appendChild(modal);
    });

    return el;
  }
}