<template>
  <li class="grid grid-cols-5 bg-white p-4">
    <div class="grid col-span-3 flex align-middle">{{ product.name }}</div>
    <div class="flex align-middle">{{ amount }}</div>
    <div
      class="text-right flex justify-end"
      @click="removeFromTicket(product._id)"
    >
      <img
        class="inline-block"
        src="@/assets/icons/Trash-can.svg"
        height="26"
        width="22"
      />
    </div>
  </li>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "ticketItem",
  props: ["product", "amount"],
  methods: {
    ...mapActions({
      removeFromTicket: "orders/removeFromTicket"
    })
  }
};
</script>
