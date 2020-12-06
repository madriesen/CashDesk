<template>
  <modal>
    <template v-slot:header>Checking for updates</template>
    <template v-slot:body>
      <div class="w-full flex justify-center items-center">
        <div class="waiting-dots inline-block relative w-24 h-10">
          <div class="bg-primary rounded-full w-4 h-4"></div>
          <div class="bg-primary rounded-full w-4 h-4"></div>
          <div class="bg-primary rounded-full w-4 h-4"></div>
          <div class="bg-primary rounded-full w-4 h-4"></div>
        </div>
      </div>
    </template>
  </modal>
</template>

<script>
import Modal from "@/components/Modal";

export default {
  name: "checking-modal",
  components: { Modal },
};
</script>

<style lang="css">
.waiting-dots > div {
  position: absolute;
  top: 33px;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.waiting-dots > div:nth-child(1) {
  left: 8px;
  animation: waiting-dots1 0.6s infinite;
}
.waiting-dots > div:nth-child(2) {
  left: 8px;
  animation: waiting-dots2 0.6s infinite;
}
.waiting-dots > div:nth-child(3) {
  left: 32px;
  animation: waiting-dots2 0.6s infinite;
}
.waiting-dots > div:nth-child(4) {
  left: 56px;
  animation: waiting-dots3 0.6s infinite;
}

@keyframes waiting-dots1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes waiting-dots3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes waiting-dots2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>
