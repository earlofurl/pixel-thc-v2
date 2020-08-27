<template>
  <div class="q-pa-md">
    <q-table
      title="Single Order Table"
      :data="lineItems"
      :columns="columns"
      color="primary"
      row-key="tag"
      separator="horizontal"
      :pagination.sync="pagination"
      :loading="loading"
    ></q-table>
  </div>
</template>

<script>
// TODO: Add calculated price total to totals field.
// TODO: Using a card for order total rather than incorporating it in table.
import store from "../store";

export default {
  name: "SingleOrderTable",
  data() {
    return {
      title: "Single Order Table",
      loading: false,
      pagination: {
        rowsPerPage: 20,
        sortBy: "name",
        descending: false
      },
      columns: [
        // {
        //   name: "id",
        //   label: "Id",
        //   field: "id",
        //   required: true,
        //   align: "left",
        //   sortable: true,
        //   sort: (a, b, rowA, rowB) => parseInt(a, 10) - parseInt(b, 10)
        // },
        {
          name: "name",
          align: "center",
          label: "Product",
          field: "name",
          style: "font-weight:bold",
          sortable: true
        },
        {
          name: "quantity",
          align: "center",
          label: "Quantity",
          field: "quantity",
          sortable: true
        },
        {
          name: "ppu",
          align: "center",
          label: "Price/Unit",
          field: "ppu",
          format: val => `$${val}`,
          sortable: true
        },
        {
          name: "Total",
          align: "center",
          label: "Total",
          field: row => row.quantity * row.ppu,
          format: val => `$${val}`,
          sortable: true
        }
      ]
    };
  },
  computed: {
    order() {
      return this.$store.state.order.order;
    },
    lineItems() {
      let lineItemsArray = []
      const items = this.order.lineItemIds
      for (let i = 0, len = items.length; i < len; i++) {
        lineItemsArray.push(this.$store.state.lineItem.lineItems.find(x => x.id === items[i]))
      }
      console.log(lineItemsArray)
      return lineItemsArray
    },
  }
};
</script>

<style scoped></style>
