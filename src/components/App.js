import { Component } from "../common/Component.js";
import { CartList } from "./CartList.js";
import { Footer } from "./Footer.js";
import { Header } from "./Header.js";
import { ProductList } from "./ProductList.js";

export class App extends Component {
   async render() {
    const container = document.createElement('div');

    const header = new Header().render();
    const main = document.createElement('main');
    const footer = new Footer().render();

    const productSection = document.createElement('section');
    productSection.id = 'products';

    const cartSection = document.createElement('section');
    cartSection.id = 'cart';

    main.appendChild(productSection);
    main.appendChild(cartSection);

    container.appendChild(header);
    container.appendChild(main);
    container.appendChild(footer);

    // Pasar cartContext como prop
    await new ProductList({ cartContext: this.props.cartContext }).mount(productSection);
    new CartList({ cartContext: this.props.cartContext }).mount(cartSection);

    return container;
  }
}