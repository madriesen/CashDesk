<template>
  <div id="cashDesk" class="max-h-screen max-w-screen">
    <div class="grid grid-cols-3 h-full pt-5 px-3">
      <products />
      <ticket />
    </div>
  </div>
</template>

<script>
import Ticket from "@/components/cashdesk/Ticket";
import Products from "@/components/cashdesk/Products";

export default {
  name: "cashDesk",
  components: { Products, Ticket }
};
</script>
