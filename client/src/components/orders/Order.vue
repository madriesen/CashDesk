<template>
  <div
    class="grid grid-cols-12 py-5 pl-8 pr-4 uppercase text-white border-b-4 border-white"
    :class="isDone ? 'bg-primary' : isDeleted ? 'bg-red-600 ' : 'bg-black'"
  >
    <div class="col-span-5" @click="updateOrder(order)">
      <ul v-for="item in orderItems" :key="item.id">
        <order-item
          :name="item.product.name"
          :amount="item.amount"
        />
      </ul>
    </div>
    <div class="col-span-3 flex justify-center items-center text-base">
      {{order.comment}}
    </div>
    <div
      class="flex justify-center items-center text-4xl col-span-2"
      @click="updateOrder(order)"
    >
      {{ createdAt }}
    </div>
    <div
      v-if="isDone"
      class="flex justify-center items-center  col-span-2"
      @click="updateOrder(order)"
    ></div>
    <div
      v-if="!isDeleted && !isDone"
      class="flex justify-center items-center col-span-2"
      @click="deleteOrder(order)"
    >
      <fa icon="trash-alt" class="w-12 text-red-600"></fa>
    </div>
  </div>
</template>
<script>
import OrderItem from "@/components/orders/OrderItem";
import { mapActions } from "vuex";

export default {
  name: "Order",
  props: ["order"],
  components: { OrderItem },
  computed: {
    orderItems() {
      let amounts = {};
      this.order.products.forEach(function(product) {
        amounts[JSON.stringify(product)] =
          (amounts[JSON.stringify(product)] || 0) + 1;
      });

      let sortedOrderItems = [];
      Object.keys(amounts).forEach(key => {
        sortedOrderItems.push({
          product: JSON.parse(key),
          amount: amounts[key]
        });
      });

      return sortedOrderItems;
    },
    createdAt() {
      const created = new Date(this.order.createdAt);
      return `${this.getTwoDigits(created.getHours())}:${this.getTwoDigits(
        created.getMinutes()
      )}`;
    },
    isDone() {
      return this.order.status === "done";
    },
    isDeleted() {
      return this.order.status === "deleted";
    }
  },
  methods: {
    ...mapActions({
      getOrders: "orders/get",
      update: "orders/update",
      destroyAll: "orders/destroyAll"
    }),
    updateOrder(order) {
      if (order.status === "to be prepared") order.status = "done";
      else {
        order.status = "to be prepared";
      }
      this.update(order);
    },
    deleteOrder(order) {
      order.status = "deleted";
      this.update(order);
    },
    getTwoDigits(value) {
      return (value < 10 ? "0" : "") + value;
    }
  }
};
</script>
