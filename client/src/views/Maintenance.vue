<template>
  <div id="maintenance" class="pt-5 h-full">
    <div class="flex p-5 bg-black h-full">
      <div id="addProductsTable" class="w-full">
        <div id="productsTable_Header">
          <v-h1>Products</v-h1>
        </div>
        <div
          id="productsTable_Content"
          v-for="product in products"
          :key="product._id"
        >
          <product :product="product" />
        </div>
        <div id="productsTable_Footer" class="mt-5">
          <div @click="showModal = true">
            <v-h1>Add product +</v-h1>
          </div>
        </div>
      </div>
    </div>
    <add-product-modal v-if="showModal" @close="showModal = false" />
  </div>
</template>

<script>
import VH1 from "@/components/VH1";
import Product from "@/components/maintenance/Product";
import { mapActions, mapGetters } from "vuex";
import AddProductModal from "@/components/maintenance/AddProductModal";

export default {
  name: "maintenance",
  data: () => {
    return {
      showModal: false
    };
  },
  components: { AddProductModal, Product, VH1 },
  computed: {
    ...mapGetters({
      products: "products/getProducts"
    })
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
