<template>
  <div
    class="relative bg-black w-40 h-40 p-5 flex justify-center items-center rounded-2xl text-white"
    @click="addToTicket(JSON.stringify(product))"
  >
    <div>
      <div class="text-center mb-2 uppercase">{{ product.name }}</div>
      <div class="text-center">€ {{ product.unitPrice }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "product",
  props: ["product"],
  methods: {
    ...mapActions({
      addToTicket: "orders/addToTicket"
    })
  }
};
</script>
