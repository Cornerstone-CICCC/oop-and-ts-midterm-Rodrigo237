import { Component } from "../common/Component.js";
import {cartContext} from "../contexts/CartContext.js"
export class ProductItem extends Component {
  render() {
    const { product, cartContext } = this.props;
    const productItem = document.createElement('section')
    productItem.className = 'product';
    productItem.innerHTML = `
    <div class="product-image">
      <img src="${product.image}" alt="${product.title}"/>
    </div>
    <div class="product-info">
      <span class="category-label">${product.category}</span>
      <h3 class="product-title">${product.title}</h3>
      <p class="product-description">${product.description}</p>
      <div>
        <span class="product-price">$${product.price}</span>
        <span class="product-rating">⭐ ${product.rating.rate}</span>
      </div>
      <button class="add-to-cart">🛒 Add to Cart</button>
    </div>  
    `

    productItem.querySelector('button').addEventListener('click',()=>{
      cartContext.addItem(product)
    })

    return productItem;
  }
}