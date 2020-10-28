<template>
  <li class="grid grid-cols-4 text-3xl">
    <div class="col-span-3">{{ name }}</div>
    <div>{{ amount }}</div>
  </li>
</template>
<script>
export default {
  name: "orderItem",
  props: ["name", "amount", "createdAt"]
};
</script>
