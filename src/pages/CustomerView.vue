<template>
  <div class="q-pa-sm">
    <div>
      <CustomerCard />
    </div>
  </div>
</template>

<script>
import CustomerCard from "../components/CustomerCard";

export default {
  name: "CustomerView",
  components: { CustomerCard }
};
</script>

<style scoped></style>
