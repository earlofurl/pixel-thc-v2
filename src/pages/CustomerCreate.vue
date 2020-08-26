<template>
  <div class="q-pa-md" style="max-width: 500px">
    <h2>Add New Customer</h2>
    <q-form class="q-gutter-md" @submit="createCustomer">
      <q-list>
        <q-item>
          <q-item-section>
            <q-item-label class="q-pb-xs">Customer Name</q-item-label>
            <q-input outlined v-model="customer.name" label="Customer Name"/>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="q-pb-xs">Notes</q-item-label>
            <q-input type="textarea" outlined v-model="customer.notes" label="Notes" />
          </q-item-section>
        </q-item>
      </q-list>
      <q-btn type="submit" color="primary" class="q-mr-xs" label="Submit"/>
    </q-form>
  </div>
</template>

<script>
import store from "../store";

export default {
  name: "CustomerCreate",
  data() {
    return {
      customer: this.createFreshCustomerObject()
    };
  },
  methods: {
    createCustomer() {
      this.$store.dispatch("customer/createCustomer", this.customer).then(res => {
        this.customer = this.createFreshCustomerObject();
      });
    },
    createFreshCustomerObject() {
      return {
        name: "",
        // photoPrimary: "",
        notes: "",
      }
    }
  }
}
</script>

<style scoped>

</style>
