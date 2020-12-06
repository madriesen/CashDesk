<template>
  <modal @close="$emit('close')">
    <template v-slot:header>
      <v-h1 class="flex-1">
        Add comment to order
      </v-h1>
    </template>
    <template v-slot:body>
      <div class="grid grid-cols-7 my-4">
        <label class="flex items-center" for="name">
          Comment:
        </label>
        <textarea
          class="col-span-4 p-2 rounded"
          id="comment"
          v-model="comment"
        />
      </div>
    </template>
    <template v-slot:footer>
      <div class="col-start-2 flex justify-between items-center">
        <button
          class="px-4 py-2 bg-green-500 rounded mr-5"
          @click="sendComment"
        >
          Send
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
export default {
  name: "add-comment-modal",
  components: { Modal, VH1 },
  data() {
    return {
      comment: ""
    };
  },
  methods: {
    sendComment() {
      this.$emit("send", this.comment);
      this.$emit("close");
    }
  }
};
</script>
