<template>
  <modal>
    <template v-slot:header>
      <v-h1 class="flex-1"> Clear all orders </v-h1>
    </template>
    <template v-slot:body>
      <div>Are you sure you want to delete all orders?</div>
    </template>
    <template v-slot:footer>
      <div class="col-start-2 flex justify-between items-center">
        <button
          class="px-4 py-2 bg-green-500 rounded mr-5"
          @click="clearOrders"
        >
          Clear
        </button>
        <button
          class="px-4 py-2 bg-red-500 rounded ml-5"
          @click="$emit('close')"
        >
          Cancel
        </button>
      </div>
    </template>
  </modal>
</template>
<script>
import Modal from "@/components/Modal";
import VH1 from "@/components/VH1";
import { mapActions } from "vuex";

export default {
  name: "clearOrdersModal",
  components: { Modal, VH1 },
  methods: {
    ...mapActions({ destroyAll: "orders/destroyAll" }),
    clearOrders() {
      this.destroyAll();
      this.$emit("close");
    },
  },
};
</script>