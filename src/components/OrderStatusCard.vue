<template>
  <div>
    <q-card class="my-card">
      <q-card-section>
        <p>Status</p>
        <div class="text-h4">${{ orderStatus }}</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
  import store from "../store";

  export default {
    name: "OrderStatusCard",
    computed: {
      orderStatus() {
        return this.$store.state.order.order.status
      }
    }
  }
</script>

<style scoped>

</style>
