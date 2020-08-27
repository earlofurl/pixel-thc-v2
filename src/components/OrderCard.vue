<template>
  <div>
    <q-card>
      <q-card-section>
        <p>{{ customer.name }}</p>
        <p>{{ customer.contactName }}</p>
        <p>{{ customer.email }}</p>
        <p>{{ customer.phone }}</p>
        <p>{{ customer.notes }}</p>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import apiService from "../services/apiService";

export default {
  name: "OrderCard",
  custie: {},
  computed: {
    order() {
      return this.$store.state.order.order;
    },
    customer() {
      return this.$store.state.customer.customer;
    }
  }
};
</script>

<style lang="scss" scoped></style>
