import { Component } from "../common/Component.js";
import { ProductItem } from "./ProductItem.js";

export class ProductList extends Component {
  constructor(props){
    super(props);
    this.products = []
    this.filtered = []
    this.productsContainer = null;
  }

  async render() {
    const container = document.createElement('div');
    container.className = 'product-list';

    this.productsContainer = document.createElement('div');
    this.productsContainer.className = 'products-container';
    container.appendChild(this.productsContainer);

    const res = await fetch('https://fakestoreapi.com/products');
    this.products = await res.json();
    this.filtered = [...this.products];

    this.renderItems();

    this.setupFilters();
    return container;
  }

  renderItems() {
    this.productsContainer.innerHTML = '';
    this.filtered.forEach(product => {
      const item = new ProductItem({ product, cartContext: this.props.cartContext });
      this.productsContainer.appendChild(item.render());
    });
  }

setupFilters(){
  const searchInput = document.getElementById('searchInput');
  const categorySelect = document.getElementById('categorySelect');
  if (!searchInput || !categorySelect) return;

  const filterProducts = () => {
    const search = searchInput.value.toLowerCase();
    const category = categorySelect.value;

    console.log("Opciones del select:");
    [...categorySelect.options].forEach(opt => console.log(opt.value));

    this.filtered = this.products.filter(p => {
      const matchCategory = category === 'all' || p.category === category;
      const matchSearch = p.title.toLowerCase().includes(search);
      return matchCategory && matchSearch;
    });

    console.log("Filtrando por:", { search, category });
    console.log("Productos filtrados:", this.filtered.length);

    if (this.filtered.length === 0) {
      console.log("No hay productos que coincidan con la búsqueda/categoría.");
    }

    this.renderItems();
  };

  searchInput.addEventListener('input', filterProducts);
  categorySelect.addEventListener('change', filterProducts);

  filterProducts(); // Ejecuta una vez al principio para mostrar todo
}
}
