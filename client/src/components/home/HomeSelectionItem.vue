<template>
  <router-link
    :to="link"
    class="relative bg-black w-64 h-64 mx-5 flex justify-center items-center rounded-3xl text-white"
  >
    <div>
      <slot />
    </div>
    <span class="absolute top-0 right-0 m-5">[icon]</span>
  </router-link>
</template>

<script>
export default {
  name: "HomeSelectionItem",
  props: ["link"]
};
</script>
