<template>
  <div id="orders" class="h-full max-h-screen max-w-screen">
    <div class="text-right mt-3 mx-5">
      <button
        @click="showModal = true"
        class="py-4 px-2 bg-red-600 text-white rounded"
      >
        Clear orders
      </button>
    </div>
    <div class="h-full py-5 px-3">
      <order
        v-for="order in orders"
        :key="order._id"
        :order="order"
        @click="updateOrder(order)"
      ></order>
    </div>
    <clear-orders-modal v-if="showModal" @close="showModal = false" />
  </div>
</template>

<script>
import Order from "@/components/orders/Order";
import ClearOrdersModal from "@/components/orders/ClearOrdersModal";
import { mapActions, mapGetters } from "vuex";
import io from "socket.io-client";

export default {
  name: "orders",
  components: { Order, ClearOrdersModal },
  data: () => {
    return {
      showModal: false,
    };
  },
  computed: {
    ...mapGetters({
      orders: "orders/getOrdersDesc",
    }),
  },
  methods: {
    ...mapActions({
      getOrders: "orders/get",
      update: "orders/update",
      destroyAll: "orders/destroyAll",
    }),
    updateOrder(order) {
      if (order.status === "to be prepared") order.status = "done";
      else {
        order.status = "to be prepared";
      }
      this.update(order);
    },
  },
  mounted() {
    this.getOrders();
    const socket = io(process.env.VUE_APP_API_URL);
    console.log("socket", socket);
    socket.on("updateOrders", () => {
      this.getOrders();
    });
  },
};
</script>
