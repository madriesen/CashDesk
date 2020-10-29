<template>
  <div
    class="max-h-screen max-w-screen h-screen bg-white flex flex-col font-mono"
  >
    <nav
      id="nav"
      class="bg-black text-white px-16 py-5 flex items-center flex-shrink-0"
    >
      <div class="flex-1">
        <router-link to="/" id="logo">
          <img
            src="@/assets/logo.png"
            alt="Orders logo"
            height="50"
            width="100"
          />
        </router-link>
      </div>
      <clock />
    </nav>
    <router-view class="flex-1" />
  </div>
</template>

<script>
import Clock from "@/components/Clock";

export default {
  name: "App",
  components: { Clock }
};
</script>

<style></style>
