<template>
  <div
    class="grid grid-cols-5 py-5 pl-8 pr-4 uppercase text-white border-b-4 border-white"
    :class="isDone ? 'bg-primary' : 'bg-black'"
  >
    <div class="col-span-3">
      <ul v-for="item in orderItems" :key="item.id">
        <order-item :name="item.product.name" :amount="item.amount" />
      </ul>
    </div>
    <div class="flex justify-center items-center">
      {{ createdAt }}
    </div>
    <div v-if="isDone" class="flex justify-center items-center">
      <span>[icon]</span>
    </div>
  </div>
</template>
<script>
import OrderItem from "@/components/orders/OrderItem";

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
    }
  },
  methods: {
    getTwoDigits(value) {
      return (value < 10 ? "0" : "") + value;
    }
  }
};
</script>
