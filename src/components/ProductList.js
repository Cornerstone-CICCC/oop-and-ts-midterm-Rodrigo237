import { Component } from "../common/Component.js";
import { ProductItem } from "./ProductItem.js";

export class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filtered: [],
      filterCategory: "",
      filterSearch: ""
    };
    this.productsContainer = null;
  }

  async render() {
    const container = document.createElement('div');
    container.className = 'product-list';

    this.productsContainer = document.createElement('div');
    this.productsContainer.className = 'products-container';
    container.appendChild(this.productsContainer);

    const res = await fetch('https://fakestoreapi.com/products');
    this.setState({
      products: await res.json()
    });
    this.renderItems();
    setTimeout(() => {
      this.setupFilters();
    }, 0);
    
    return container;
  }

  renderItems() {
    this.productsContainer.innerHTML = '';
    const listFiltered  = this.state.products
    .filter((product) => {
      const matchCategory = !this.state.filterCategory || this.state.filterCategory === "all" || product.category === this.state.filterCategory;
      const matchSearch = product.title.toLowerCase().includes(this.state.filterSearch.toLowerCase());
      return matchCategory && matchSearch;
    })
    listFiltered.forEach(product => {
      const item = new ProductItem({ product, cartContext: this.props.cartContext });
      this.productsContainer.appendChild(item.render());
    });
  }

  setupFilters() {
    const searchInput = document.getElementById('searchInput');
    const categorySelect = document.getElementById('categorySelect');
   
    if (categorySelect) {
      categorySelect.addEventListener('change', this.updateFilters);
    }

    if (searchInput) {
      searchInput.addEventListener('input', this.updateFilters);
    }

  }

  updateFilters = () => {
    const category = document.querySelector('#categorySelect')?.value || "";
    const search = document.querySelector('#searchInput')?.value || "";

    this.setState({
      filterCategory: category,
      filterSearch : search
    })

    this.renderItems()

  }
}
