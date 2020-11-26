<template>
  <div
    class="fixed flex justify-center items-center z-50 top-0 left-0 w-full h-full bg-modal"
  >
    <div class="w-modal mx-auto p-8 bg-white rounded shadow-2xl">
      <div class="bg-black p-2 pr-10  flex">
        <slot name="header" />
        <button @click="$emit('close')">
          <v-h1>
            X
          </v-h1>
        </button>
      </div>

      <div class="my-5 px-2">
        <slot name="body" />
      </div>

      <div class="mt-5 grid grid-cols-7 my-4">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
import VH1 from "@/components/VH1";

export default {
  name: "Modal",
  components: { VH1 }
};
</script>
