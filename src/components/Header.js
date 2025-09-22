import { Component } from "../common/Component.js";

export class Header extends Component {
  render() {
    const header = document.createElement('header');
    header.innerHTML= `<h1>Snappy Shop</h1>`

    return header;
  }
}