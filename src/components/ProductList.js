import { Component } from "../common/Component.js";
import { ProductItem } from "./ProductItem.js";

export class ProductList extends Component {
  async render() {
    const container = document.createElement('div');
    container.className = 'product-list';

    const res = await fetch('https://fakestoreapi.com/products');
    const products = await res.json();
    window.products = products;

    products.forEach(product => {
      const item = new ProductItem({ product, cartContext: this.props.cartContext });
      container.appendChild(item.render());
    });

    return container;
  }
}