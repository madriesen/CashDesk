import axios from "axios";

const Orders = {
  namespaced: true,
  state: () => ({
    orders: [],
    ticket: []
  }),
  mutations: {
    SET_ORDERS: (state, orders) => {
      state.orders = orders;
    },
    ADD_TO_TICKET: (state, product) => {
      state.ticket.push(product);
    },
    REMOVE_FROM_TICKET: (state, productId) => {
      state.ticket.find((o, i) => {
        if (o._id === productId) {
          state.ticket.splice(i, 1);
          return true; // stop searching
        }
      });
    },
    CLEAR_TICKET: state => {
      state.ticket = [];
    }
  },
  getters: {
    getOrdersDesc: state => {
      state.orders.sort(function(a, b) {
        return b.createdAt.localeCompare(a.createdAt);
      });
      return state.orders;
    },
    getTicket: state => state.ticket
  },
  actions: {
    send: ({ dispatch }, order) => {
      axios
        .post(process.env.VUE_APP_API_URL + "/orders", { products: order })
        .then(() => {
          dispatch("clearTicket");
          dispatch("get");
        });
    },
    get: ({ commit }) => {
      axios.get(process.env.VUE_APP_API_URL + "/orders").then(response => {
        commit("SET_ORDERS", response.data);
      });
    },
    addToTicket: ({ commit }, product) => {
      commit("ADD_TO_TICKET", JSON.parse(product));
    },
    removeFromTicket: ({ commit }, productId) => {
      commit("REMOVE_FROM_TICKET", productId);
    },
    update: ({ dispatch }, order) => {
      axios
        .patch(process.env.VUE_APP_API_URL + "/orders/" + order._id, {
          status: order.status
        })
        .then(response => {
          console.log("response", response);
          dispatch("get");
        });
    },
    clearTicket: ({ commit }) => {
      commit("CLEAR_TICKET");
    }
  }
};

export default Orders;
