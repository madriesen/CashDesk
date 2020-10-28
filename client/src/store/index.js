import { createStore } from "vuex";
import Products from "./Products";
import Orders from "./Orders";

export default createStore({
  modules: {
    products: Products,
    orders: Orders
  }
});
