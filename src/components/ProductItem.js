import { Component } from "../common/Component.js";
import {cartContext} from "../contexts/CartContext.js"
export class ProductItem extends Component {
  render() {
    const { product } = this.props;
    const productItem = document.createElement('section')
    productItem.className = 'product';
    productItem.innerHTML = `
    <img src="${product.image}" alt="${product.title}"/>
    <h3>${product.title}</h3>
    <p>$${product.price}</p>
    <button>AddItem</button>
    `

    productItem.querySelector('button').addEventListener('click',()=>{
      cartContext.addItem(product)
    })

    return productItem;
  }
}