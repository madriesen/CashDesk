import axios from "axios";

const Products = {
  namespaced: true,
  state: () => ({
    products: []
  }),
  mutations: {
    SET_PRODUCTS: (state, products) => {
      state.products = products;
    },
    DELETE: (state, id) => {
      state.products.find((o, i) => {
        if (o._id === id) {
          state.products.splice(i, 1);
          return true; // stop searching
        }
      });
    }
  },
  getters: {
    getProducts: state => state.products
  },
  actions: {
    add: ({ dispatch }, product) => {
      axios
        .post(process.env.VUE_APP_API_URL + "/products", product)
        .then(() => {
          dispatch("get");
        });
    },
    get: ({ commit }) => {
      axios.get(process.env.VUE_APP_API_URL + "/products").then(response => {
        commit("SET_PRODUCTS", response.data);
      });
    },
    delete: ({ dispatch }, id) => {
      axios.delete(process.env.VUE_APP_API_URL + "/products/" + id).then(() => {
        dispatch("get");
      });
    }
  }
};

export default Products;
