<template>
  <div class="q-pa-md">
    <StockTable />
  </div>
</template>

<script>
  import StockTable from "components/StockTable";
  import store from "../store";
  export default {
    name: "Stock",
    components: {StockTable},
    created() {
      this.$store.dispatch("stock/fetchStock");
      this.$store.dispatch("lab/fetchLabs");
    }
  }
</script>

<style scoped>

</style>
