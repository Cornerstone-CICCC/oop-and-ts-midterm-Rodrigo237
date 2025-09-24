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
    const found = this.cart.find(item => item.id === product.id);
    if(found){
      found.count += 1
    }else{
      this.cart.push({...product,count: 1});
    }
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