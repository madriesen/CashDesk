<template>
  <li class="flex no-wrap text-3xl">
    <div class="w-12">{{ amount }}</div>
    <div>{{ name }}</div>
  </li>
</template>
<script>
export default {
  name: "orderItem",
  props: ["name", "amount", "createdAt", "comment"]
};
</script>
