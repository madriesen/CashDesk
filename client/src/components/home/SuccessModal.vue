<template>
  <modal>
    <template v-slot:header>Successful</template>
    <template v-slot:body>{{ data.message }}</template>
    <template v-slot:footer
      ><div class="col-start-2 flex justify-between items-center">
        <button
          class="px-4 py-2 bg-red-500 rounded ml-5"
          @click="$emit('close')"
        >
          Close
        </button>
      </div></template
    >
  </modal>
</template>

<script>
import Modal from "@/components/Modal";
export default {
  name: "checking-modal",
  props: ["data"],
  components: { Modal },
};
</script>
