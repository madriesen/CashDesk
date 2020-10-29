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
      class=" text-white bg-red-600 px-8 py-6 mt-16 rounded"
    >
      Shutdown
    </button>
  </div>
</template>

<script>
import HomeSelectionItem from "@/components/home/HomeSelectionItem";
import axios from "axios";

export default {
  name: "Home",
  components: {
    HomeSelectionItem
  },
  methods: {
    shutdown() {
      axios.get(process.env.VUE_APP_API_URL + "/shutdown");
    }
  }
};
</script>
