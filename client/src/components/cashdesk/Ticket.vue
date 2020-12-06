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
      <div class="border-t-4 border-white p-8 grid grid-cols-2 col-gap-4">
        <div
          class="bg-green-500 rounded h-full py-2 px-5 w-full flex items-center justify-center"
          @click="send"
        >
          <v-h1>Send</v-h1>
        </div>
        <div>
          <div
            class="bg-primary rounded py-2 px-5 flex items-center justify-center mb-4"
            @click="addComment"
          >
            <v-h2>Comment</v-h2>
          </div>

          <div
            class="bg-red-500 rounded py-2 px-5 flex items-center justify-center"
            @click="clearTicket"
          >
            <v-h2>Cancel</v-h2>
          </div>
        </div>
      </div>
    </div>
    <add-comment-modal
      v-if="showModal"
      @close="showModal = false"
      @send="send"
    />
  </div>
</template>

<script>
import VH1 from "@/components/VH1";
import VH2 from "@/components/VH2";
import AddCommentModal from "@/components/cashdesk/AddCommentModal";
import TicketItem from "@/components/cashdesk/TicketItem";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Ticket",
  components: { TicketItem, VH1, VH2, AddCommentModal },
  data: () => {
    return {
      showModal: false
    };
  },
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
    send(comment = "") {
      console.log("sent order");
      this.sendTicket({ order: this.ticket, comment: comment });
    },
    addComment() {
      this.showModal = true;
    }
  }
};
</script>
