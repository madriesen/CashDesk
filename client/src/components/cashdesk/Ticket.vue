<template>
  <div>
    <div class="bg-black border-black border-4 rounded flex flex-col">
      <div class="border-b-4 border-white px-3 py-8">
        <v-h1>Order Total: € {{ total }}</v-h1>
      </div>
      <div
        class="flex-auto flex flex-col overflow-scroll"
        style="max-height: 432px"
      >
        <div id="order-items" class="flex-1">
          <ul
            class="text-black text-lg p-2"
            v-for="item in ticketItems"
            :key="item._id"
          >
            <ticket-item :product="item.product" :amount="item.amount" />
          </ul>
        </div>
      </div>
      <div
        class="border-t-4 border-white p-8 flex justify-between items-center"
      >
        <div
          class="bg-green-500 rounded py-2 px-5 w-5/12 flex items-center justify-center"
          @click="send"
        >
          <v-h1>Send</v-h1>
        </div>
        <div
          class="bg-red-500 rounded py-2 px-5 w-5/12 flex items-center justify-center"
          @click="clearTicket"
        >
          <v-h1>Cancel</v-h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VH1 from "@/components/VH1";
import TicketItem from "@/components/cashdesk/TicketItem";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Ticket",
  components: { TicketItem, VH1 },
  computed: {
    ...mapGetters({
      ticket: "orders/getTicket"
    }),
    ticketItems() {
      let amounts = {};
      this.ticket.forEach(function(product) {
        amounts[JSON.stringify(product)] =
          (amounts[JSON.stringify(product)] || 0) + 1;
      });

      let sortedTicketItems = [];
      Object.keys(amounts).forEach(key => {
        sortedTicketItems.push({
          product: JSON.parse(key),
          amount: amounts[key]
        });
      });

      return sortedTicketItems.reverse();
    },
    total() {
      let total = 0;
      this.ticketItems.forEach(item => {
        total += item.amount * item.product.unitPrice;
      });
      return (Math.round(total * 100) / 100).toFixed(2);
    }
  },
  methods: {
    ...mapActions({
      clearTicket: "orders/clearTicket",
      sendTicket: "orders/send"
    }),
    send() {
      this.sendTicket(this.ticket);
    }
  }
};
</script>
