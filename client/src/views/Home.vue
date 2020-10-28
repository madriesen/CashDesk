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
  </div>
</template>

<script>
import HomeSelectionItem from "@/components/home/HomeSelectionItem";

export default {
  name: "Home",
  components: {
    HomeSelectionItem
  }
};
</script>
