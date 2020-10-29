<template>
  <div class="grid grid-cols-4 bg-white p-4 text-2xl h-16 my-1">
    <div class="col-span-2">
      <h1 class="font-bold">{{ product.name }}</h1>
    </div>
    <div>
      <p>€ {{ product.unitPrice }}</p>
    </div>
    <div class="grid grid-cols-2">
      <div class="" @click="removeProduct(product._id)">
        <img
          class="flex justify-end"
          src="@/assets/icons/Trash-can.svg"
          height="26"
          width="22"
          alt="delete product"
        />
      </div>
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
      removeProduct: "products/delete"
    })
  }
};
</script>
