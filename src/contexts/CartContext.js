export class CartContext {
  constructor(){
    this.cart = [];
    this.listeners = [];
  }

  subscribe(fn){
    this.listeners.push(fn)
  }

  notifyListeners(){
    this.listeners.forEach(fn => fn(this.cart));
  }

  addItem(product){
    this.cart.push(product);
    this.notifyListeners();
  }

  removeItem(id){
    this.cart = this.cart.filter(item => item.id !== id);
    this.notifyListeners();
  }

  getItems(){
    return this.cart
  }
}

export const cartContext = new CartContext();