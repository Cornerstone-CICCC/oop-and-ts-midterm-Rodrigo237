import { Component } from "../common/Component.js";
import { CartList } from "./CartList.js";
import { Footer } from "./Footer.js";
import { Header } from "./Header.js";
import { ProductList } from "./ProductList.js";

export class App extends Component {
  async render() {
    const container = document.createElement('div');

    const header = await new Header().render();
    container.appendChild(header); 

    const main = document.createElement('main');
    const logo = document.createElement('div');
    logo.className = 'logo_title';
    logo.innerHTML = `<h1 class="page-title">Snappy Shop</h1>`;

    const title = document.createElement('div');
    title.className='title';
    title.innerHTML = '<h2 >Our Products</h2>'

    const products_main = document.createElement('div');
    products_main.className = "products-main";

    const productSection = document.createElement('section');
    productSection.id = 'products';

    const cartSection = document.createElement('section');
    cartSection.id = 'cart';

    products_main.appendChild(productSection);
    products_main.appendChild(cartSection);
    main.appendChild(logo);
    main.appendChild(title)
    main.appendChild(products_main);

    const footer = new Footer().render();

    container.appendChild(main);
    container.appendChild(footer);

    const productList = new ProductList({ cartContext: this.props.cartContext });
    await productList.mount(productSection);

    productList.setupFilters();

    new CartList({ cartContext: this.props.cartContext }).mount(cartSection);

    return container;
  }
}
