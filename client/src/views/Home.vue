<template>
  <div
    id="home"
    class="container mx-auto flex flex-col justify-center items-center"
  >
    <ul class="flex flex-wrap">
      <home-selection-item link="/cash-desk">Cash Desk</home-selection-item>
      <home-selection-item link="/orders">Orders</home-selection-item>
      <home-selection-item link="/maintenance">Maintenance</home-selection-item>
    </ul>
    <button
      @click="shutdown"
      class="text-white bg-red-600 px-8 py-6 mt-16 rounded"
    >
      Shutdown
    </button>

    <button
      @click="update"
      class="text-white bg-primary px-8 py-6 mt-16 rounded"
    >
      Update
    </button>

    <error-modal v-if="showError" @close="showError = false" :error="error" />
    <success-modal
      v-if="showSuccess"
      @close="showSuccess = false"
      :data="successData"
    />
    <checking-modal v-if="checkingForUpdates" />
  </div>
</template>

<script>
import HomeSelectionItem from "@/components/home/HomeSelectionItem";
import axios from "axios";
import ErrorModal from "../components/home/ErrorModal.vue";
import SuccessModal from "../components/home/SuccessModal.vue";
import CheckingModal from "../components/home/CheckingModal.vue";

export default {
  name: "Home",
  components: {
    HomeSelectionItem,
    ErrorModal,
    SuccessModal,
    CheckingModal,
  },
  data() {
    return {
      error: {},
      showError: false,
      successData: {},
      showSuccess: false,
      checkingForUpdates: false,
    };
  },
  methods: {
    shutdown() {
      axios.get(process.env.VUE_APP_API_URL + "/shutdown");
    },
    update() {
      if (this.checkingForUpdates) return true;
      this.checkingForUpdates = true;
      axios
        .get(process.env.VUE_APP_API_URL + "/update")
        .then((data) => {
          if (data.status === 200) {
            // already up to date
            this.successData = data.data;
            this.showSuccess = true;
            this.checkingForUpdates = false;
          }
          if (data.status === 205) {
            // needs update
            this.successData = data.data;
            this.showSuccess = true;
            this.checkingForUpdates = false;
          }
        })
        .catch((error) => {
          this.error = error.response.data.error;
          this.showError = true;
          this.checkingForUpdates = false;
        });
    },
  },
};
</script>
