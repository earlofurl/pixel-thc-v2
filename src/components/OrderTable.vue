<template>
  <div class="q-pa-md">
    <q-table
      title="Orders"
      :data="orders"
      :columns="columns"
      color="primary"
      :row-key="id"
      separator="horizontal"
      :pagination.sync="pagination"
      :loading="loading"
      @row-click="onRowClick"
      @addToOrderTable="addToOrderTable"
    >
      <template v-slot:top-right>
        <q-btn @click="onAddClick" color="primary" label="Add New" class="q-mr-xs" />
      </template>

      <template v-slot:body-cell-customer="props">
        <!-- <p>Hi</p> -->
        <q-td :props="props">{{ getCustomerName(props.row.customerId) }}</q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import apiService from "src/services/apiService";
import router from "../router";
import store from "../store";
import { mapGetters } from "vuex";
import { date } from "quasar";

export default {
  name: "OrderTable",
  data() {
    return {
      title: "Order Table",
      loading: false,
      sku: "",
      pagination: {
        rowsPerPage: 20,
        sortBy: "packDate",
        descending: true
      },
      columns: [
        {
          name: "customer",
          align: "center",
          label: "Customer",
          field: "customerId",
          style: "font-weight:bold",
          sortable: true
        },
        {
          name: "status",
          align: "center",
          label: "Status",
          field: "status",
          style: "font-weight:bold",
          sortable: true
        },
        {
          name: "packDate",
          label: "Pack By",
          align: "center",
          field: "scheduledPackDate",
          sortable: true,
          format: (val, row) => date.formatDate(val, "dddd, DD-MM-YYYY")
        },
        {
          name: "shipDate",
          label: "Scheduled to Ship",
          align: "center",
          field: "scheduledShipDate",
          sortable: true,
          format: (val, row) => date.formatDate(val, "dddd, DD-MM-YYYY")
        },
        {
          name: "notes",
          label: "Notes",
          align: "center",
          field: "notes"
        }
        // TODO: Add Totals of items contained in order.
      ]
    };
  },
  computed: {
    orders() {
      return this.$store.state.order.orders;
    },
    customer() {
      return this.$store.state.customer.customers;
    }
  },
  methods: {
    async onRowClick(evt, row) {
      await this.$store
        .dispatch("order/fetchOrder", row.id)
        .then(res => {
          this.$store.dispatch(
            "lineItem/fetchLineItems",
            this.$store.state.order.order.lineItemIds
          );
        })
        .then(this.$store.dispatch("customer/fetchCustomer", row.customerId))
        .finally(this.$router.push(`/orders/${row.id}`));
    },
    getCustomerName(cid) {
      const custies = this.customer;
      const custie = custies.find(x => x.id === cid);
      return custie.name;
    },
    onAddClick(evt) {
      this.$router.push("/orders/create");
    },
  }
};
</script>
