import { App } from "./components/App.js";
import { cartContext } from "./contexts/CartContext.js";

const root = document.querySelector('#app')
const app = new App({ cartContext })

await app.mount(root)