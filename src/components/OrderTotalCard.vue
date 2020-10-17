<template>
  <div>
    <q-card class="my-card">
      <q-card-section>
        <p>Total Price</p>
        <div class="text-h4">${{ orderTotal }}</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import store from "../store";

export default {
  name: "OrderTotalCard",
  computed: {
    order() {
      return this.$store.state.order.order;
    },
    lineItems() {
      return this.$store.state.order.order.lineItems;
    },
    // lineItems() {
    //   let lineItemsArray = []
    //   const items = this.order.lineItemIds
    //   for (let i = 0, len = items.length; i < len; i++) {
    //     lineItemsArray.push(this.$store.state.lineItem.lineItems.find(x => x.id === items[i]))
    //   }
    //   console.log(lineItemsArray)
    //   return lineItemsArray
    // },
    orderTotal() {
      const data = this.lineItems
      return data.reduce((acc, item) => acc + parseFloat(item.quantity * item.ppu), 0);
    }
  }
};
</script>

<style scoped></style>
