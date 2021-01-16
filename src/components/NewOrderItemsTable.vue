<template>
  <div class="q-pa-lg">
<!--    newOrderModel: {{ newOrderItemArray }}-->
    <q-table
      title="Assigned to Order"
      :data="newOrderItemArray"
      :columns="columns"
      color="primary"
      row-key="id"
      separator="horizontal"
      :pagination.sync="pagination"
      :loading="loading"
      dense="dense"
      :filter="filter"
      @row-click="onRowClick"
    >
<!--      <template v-slot:body-cell-action="props">-->
<!--        <q-td :props="props">-->
<!--          <div class="q-gutter-sm">-->
<!--            <q-btn dense color="primary" icon="edit"/>-->
<!--            <q-btn dense color="red" icon="delete" @click="clickedRemoveRow()"/>-->
<!--          </div>-->
<!--        </q-td>-->
<!--      </template>-->
    </q-table>
  </div>

</template>

<script>
  import apiService from "src/services/apiService";
  export default {
    name: "NewOrderItemsTable",
    data() {
      return {
        title: "Order Creation Table",
        filter: "",
        loading: false,
        clickedRow: {},
        adjustQuantity: 0,
        pagination: {
          rowsPerPage: 20,
          sortBy: "strain",
          descending: false
        },
        orderModel: [
          {
            "name": "",
            "quantity": "",
            "ppu": "",
            "stock": 0,
            "notes": ""
          }
        ],
        columns: [
          {
            name: "strain",
            align: "center",
            label: "Strain",
            field: "strain",
            style: "font-weight:bold",
            sortable: true
          },
          {
            name: "itemType",
            align: "center",
            label: "Item Type",
            field: "itemType",
            style: "font-weight:bold",
            sortable: true
          },
          {
            name: "quantity",
            align: "center",
            label: "Quantity",
            field: "quantity",
            style: "font-weight:bold",
            sortable: true
          },
          {
            name: "ppu",
            align: "center",
            label: "Ppu",
            field: "ppu",
            sortable: true
          },
          {
            name: "notes",
            align: "center",
            label: "Notes",
            field: "notes",
            sortable: true
          },
          {
            name: "action",
            align: "left",
            label: "Action",
            field: "action",
            sortable: true
          }
        ]
      }
    },
    computed: {
      newOrderItemArray() {
        return this.$store.state.order.newOrder
      }
    },
    methods: {
      // TODO: Make this a function of button press rather than row click.
      // having trouble figuring out how to pass row through button
      // so doing a rowclick for now

      onRowClick(evt, row) {
        const rowSelect = row;
        console.log(rowSelect);
        // this.clickedRow = row;
        // console.log(this.selectedRow.quantity);
        // this.adjustQuantity = this.selectedRow.quantity
        // console.log(this.adjustQuantity)
        // this.$store.dispatch("stock/fetchStockById", this.selectedRow.stock);
        this.$store.dispatch("stock/adjustStockQuantity", rowSelect);
        this.$store.dispatch("order/removeNewItem", rowSelect);
        // this.clickedRow = {};
      },
      // clickedRemoveRow(evt, row) {
      //   // const newRow = this.mutateLineItemIntoStock(row, quantity)
      //   this.selectedRow = row
      //   const addQuantity = this.selectedRow.quantity
      //   // this.adjustOriginalInventory(row, addQuantity)
      //   console.log(this.selectedRow)
      //   this.$store.dispatch("stock/adjustStockQuantity", this.selectedRow.id, addQuantity)
      //   this.$store.dispatch("order/removeNewItem", this.selectedRow)

      // adjustOriginalInventory(row, adjustQuantity) {
      //   row.quantity = row.quantity + adjustQuantity;
      //   console.log(row)
      //   this.$store.dispatch("stock/putStock", row)
      // },
    }
  }
</script>

<style scoped>

</style>
