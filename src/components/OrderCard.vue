<template>
  <div>
    <q-card>
      <q-card-section>
        <p>{{ facility.name }}</p>
        <p>{{ facility.contactName }}</p>
        <p>{{ facility.email }}</p>
        <p>{{ facility.phone }}</p>
        <p>{{ facility.notes }}</p>
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
    facility() {
      return this.$store.state.facility.facility;
    }
  }
};
</script>

<style lang="scss" scoped></style>
