<template>
  <div class="q-pa-md">
    <q-table
      title="Customers"
      :data="customers"
      :columns="columns"
      color="primary"
      row-key="id"
      separator="horizontal"
      :pagination.sync="pagination"
      :loading="loading"
      @row-click="onRowClick"
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-btn @click="onAddClick" color="primary" label="Add New" class="q-mr-xs" />
        <q-input
          standout
          dense
          align="right"
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="close" @click="filter = ''" class="cursor-pointer"></q-icon>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>

<script>
import store from "../store";
export default {
  name: "CustomersTable",
  data() {
    return {
      loading: false,
      filter: "",
      pagination: {
        rowsPerPage: 20,
        sortBy: "name",
        descending: false
      },
      columns: [
        {
          name: "name",
          align: "center",
          label: "Name",
          field: "name",
          style: "font-weight:bold",
          sortable: true
        },
        {
          name: "notes",
          align: "left",
          label: "Notes",
          field: "notes",
        }
      ]
    };
  },
  computed: {
    customers() {
      return this.$store.state.customer.customers;
    }
  },
  methods: {
    onRowClick(evt, row) {
      this.$store.dispatch("customer/fetchCustomer", row.id);
      this.$router.push(`/customers/${row.id}`);
    },
    onAddClick(evt) {
      this.$router.push("/customers/create");
    }
  }
};
</script>

<style scoped></style>
