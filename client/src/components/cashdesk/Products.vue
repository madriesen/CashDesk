<template>
  <div class="col-span-2 h-full">
    <div class="grid grid-cols-3 row-gap-10">
      <div v-for="product in products" :key="product._id">
        <product :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import Product from "@/components/cashdesk/Product";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Products",
  components: { Product },
  computed: {
    ...mapGetters({ products: "products/getProducts" })
  },
  methods: {
    ...mapActions({
      getProducts: "products/get"
    })
  },
  mounted() {
    this.getProducts();
  }
};
</script>
