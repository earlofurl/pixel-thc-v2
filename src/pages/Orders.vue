<template>
  <div class="q-pa-md">
    <OrderTable />
  </div>
</template>

<script>
import OrderTable from "components/OrderTable";
import store from "../store";

export default {
  name: "Orders",
  components: { OrderTable },
  // TODO: Add a check to prevent API call every time orders is navigated to.
  created() {
    // load relevant data for order creation into store state
    this.$store.dispatch("order/fetchOrders");
    this.$store.dispatch("customer/fetchCustomers");
    this.$store.dispatch("lab/fetchLabs");
    this.$store.dispatch("facility/fetchFacilities");
  }
};
</script>

<style scoped></style>
