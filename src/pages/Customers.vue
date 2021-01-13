<template>
  <div class="q-pa-mid">
    <CustomersTable />
  </div>
</template>

<script>
import CustomersTable from "components/CustomersTable";
import store from "../store";
// import customer from "../store/customer";

export default {
  name: "Customers",
  components: { CustomersTable },
  created() {
    this.$store.dispatch("customer/fetchCustomers");
    this.$store.dispatch("facility/fetchFacilities");
  }
};
</script>

<style scoped></style>
