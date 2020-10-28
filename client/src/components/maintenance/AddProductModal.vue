<template>
  <div
    class="fixed flex justify-center items-center z-50 top-0 left-0 w-full h-full bg-modal"
  >
    <div class="w-modal mx-auto p-8 bg-white rounded shadow-2xl">
      <div class="bg-black p-2 pr-10  flex">
        <v-h1 class="flex-1">
          Add Product
        </v-h1>
        <v-h1 @click="$emit('close')">
          X
        </v-h1>
      </div>

      <div class="my-5 px-2">
        <div class="grid grid-cols-7 my-4">
          <label class="flex items-center" for="name">
            Name:
          </label>
          <input
            class="col-span-4 p-2 rounded"
            id="name"
            type="text"
            v-model="product.name"
          />
        </div>
        <div class="grid grid-cols-7 my-4">
          <label class="flex items-center" for="price">
            Price:
          </label>
          <input
            class="col-span-4 p-2 rounded"
            id="price"
            type="number"
            v-model="product.unitPrice"
          />
        </div>
      </div>

      <div class="mt-5 grid grid-cols-7 my-4">
        <div class="col-start-2 flex justify-between items-center">
          <button class="px-4 py-2 bg-green-500 rounded mr-5" @click="save">
            Save
          </button>
          <button
            class="px-4 py-2 bg-red-500 rounded ml-5"
            @click="$emit('close')"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VH1 from "@/components/VH1";
import { mapActions } from "vuex";

export default {
  name: "AddProductModal",
  components: { VH1 },
  data: () => {
    return {
      product: { name: "", unitPrice: 0 }
    };
  },
  methods: {
    ...mapActions({
      addProduct: "products/add"
    }),
    save() {
      this.addProduct(this.product);
      this.$emit("close");
    }
  }
};
</script>
