<template>
  <div id="orders" class="h-full max-h-screen max-w-screen">
    <div class="h-full py-5 px-3">
      <order
        v-for="order in orders"
        :key="order._id"
        :order="order"
        @click="updateOrder(order)"
      ></order>
    </div>
  </div>
</template>

<script>
import Order from "@/components/orders/Order";
import { mapActions, mapGetters } from "vuex";
import io from "socket.io-client";

export default {
  name: "orders",
  components: { Order },
  computed: {
    ...mapGetters({
      orders: "orders/getOrdersDesc"
    })
  },
  methods: {
    ...mapActions({
      getOrders: "orders/get",
      update: "orders/update"
    }),
    updateOrder(order) {
      if (order.status === "to be prepared") order.status = "done";
      else {
        order.status = "to be prepared";
      }
      this.update(order);
    }
  },
  mounted() {
    this.getOrders();
    const socket = io(process.env.VUE_APP_API_URL);
    console.log("socket", socket);
    socket.on("updateOrders", () => {
      this.getOrders();
    });
  }
};
</script>
