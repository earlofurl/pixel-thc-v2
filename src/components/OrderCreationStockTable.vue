<template>
  <div class="q-pa-lg">
<!--    Stock: {{ stock }}-->
    <q-table
      title="Stock to Choose From"
      :data="stock"
      :columns="columns"
      color="primary"
      row-key="id"
      separator="horizontal"
      :pagination.sync="pagination"
      :loading="loading"
      :filter="filter"
      @row-click="onRowClick"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          align="right"
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-thcPercent="props">
        <q-td :props="props">{{ getThcPercent(props.row.labTestId) }}</q-td>
      </template>
      <template v-slot:body-cell-cbdPercent="props">
        <q-td :props="props">{{ getCbdPercent(props.row.labTestId) }}</q-td>
      </template>
      <template v-slot:body-cell-terpenePercent="props">
        <q-td :props="props">{{ getTerpenePercent(props.row.labTestId) }}</q-td>
      </template>
    </q-table>
    <q-dialog v-model="card">
      <div>
        <q-card>
          <q-form ref="inputCard" @submit="submitCard(selectedRow, quantityInputText, priceInputText)">
            <q-input v-model="quantityInputText" label="Quantity"></q-input>
            <q-input v-model="priceInputText" label="$/Unit"></q-input>
            <q-btn type="submit" label="Add to Order" :disabled="overStockLimit"></q-btn>
            <q-badge color="red" v-if="overStockLimit">
              Over Stock Limit<q-icon name="warning" color="white" class="q-ml-xs"></q-icon>
            </q-badge>
          </q-form>
        </q-card>
      </div>
    </q-dialog>
  </div>
</template>

<script>
  // TODO: Add filters to Type column to easily select product categories.
  import apiService from "src/services/apiService";
  import store from "../store";

  export default {
    name: "OrderCreationStockTable",
    data() {
      return {
        title: "Stock Table",
        filter: "",
        card: false,
        loading: false,
        quantityInputText: "",
        priceInputText: "",
        selectedRow: {},
        pagination: {
          rowsPerPage: 20,
          sortBy: "strain",
          descending: false
        },
        columns: [
          {
            name: "id",
            label: "Id",
            field: "id",
            required: true,
            align: "left",
            sortable: true,
            sort: (a, b, rowA, rowB) => parseInt(a, 10) - parseInt(b, 10)
          },
          {
            name: "strain",
            align: "center",
            label: "Strain",
            field: "strain",
            style: "font-weight:bold",
            sortable: true
          },
          {
            name: "item-type",
            align: "center",
            label: "Type",
            field: "itemType",
            style: "font-weight:bold",
            sortable: true
          },
          {
            name: "batch",
            align: "center",
            label: "Batch",
            field: "batch",
            sortable: true,
            style: "width: 20px"
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
            name: "uom",
            align: "center",
            label: "UoM",
            field: "uom",
            sortable: true
          },
          {
            name: "thcPercent",
            align: "center",
            label: "THC %",
            field: "thc_percent",
            sortable: true,
            style: "width: 20px"
          },
          {
            name: "cbdPercent",
            align: "center",
            label: "CBD %",
            field: "cbd_percent",
            sortable: true,
            style: "width: 20px"

          },
          {
            name: "terpenePercent",
            align: "center",
            label: "Terp %",
            field: "terp_percent",
            sortable: true,
            style: "width: 20px"

          },
          {
            name: "default-price",
            align: "center",
            label: "Default Price",
            field: "priceDefault",
            format: (val) => `$${val}`,
            sortable: true
          },
          // {
          //   name: "addQuantity",
          //   align: "center",
          //   label: "Quant to Cart",
          // },
          // {
          //   name: "ppu",
          //   align: "center",
          //   label: "price"
          // },
          // {
          //   name: "add",
          //   align: "right",
          //   label: "Add",
          //   style: "width: 50px"
          // }
        ]
      };
    },
    mounted() {
      this.loading = true;
      apiService
        .getStock()
        .then(response => {
          this.$store.state.stock.stocks = response.data;
          this.loading = false;
        })
        .catch(error => {
          console.log("There was an error: " + error.response);
        });
    },
    computed: {
      stock() {
        return this.$store.state.stock.stocks
      },
      labResultList() {
        return this.$store.state.lab.labs
      },
      availableQuantity() {
        return this.selectedRow.quantity - this.quantityInputText
      },
      overStockLimit() {
        return this.availableQuantity < 0;
      }
    },
    methods: {
      onRowClick(evt, row) {
        console.log(row)
        this.selectedRow = row;
        this.quantityInputText = ""
        this.priceInputText = row.priceDefault
        this.availableQuantity = row.quantity
        this.card = true;
        this.$nextTick(()=>{ this.$refs.inputCard.focus()})
      },
      submitCard(row, quantity, ppu) {
        const newRow = this.mutateStockIntoLineItem(row, quantity, ppu)
        this.$store.dispatch("order/addToNewOrder", newRow)
        this.adjustOriginalInventory(row, quantity)
        this.card = false
      },
      getThcPercent(cid) {
        const labResults = this.labResultList;
        const labResult = labResults.find(x => x.LabTestResultId === cid);
        return labResult.ThcPercent
      },
      getCbdPercent(cid) {
        const labResults = this.labResultList;
        const labResult = labResults.find(x => x.LabTestResultId === cid);
        return labResult.CbdPercent
      },
      getTerpenePercent(cid) {
        const labResults = this.labResultList;
        const labResult = labResults.find(x => x.LabTestResultId === cid);
        return labResult.TerpenePercent
      },
      // onRowClick(evt, row) {
      //   console.log(`Row ${row.id} clicked.`)
      //   console.log(row)
      //   // Next line needs to get quantity and ppu from user input dialog.
      //   const newRow = this.mutateStockIntoLineItem(row, 50, 1.25)
      //   console.log("newRow object is: " + newRow)
      //   this.$store.dispatch("order/addToNewOrder", newRow)
      //   console.log(this.$store.state.order.newOrder)
      // },
      mutateStockIntoLineItem(stockItem, quantity, ppu) {
        const original = stockItem
        let newItem = {}
        newItem.strain = original.strain
        newItem.itemType = original.itemType
        newItem.stockId = original.id
        newItem.orderId = 1
        newItem.notes = original.notes
        newItem.quantity = quantity
        newItem.ppu = ppu
        return newItem
      },
      adjustOriginalInventory(row, adjustQuantity) {
        let newRow = row
        row.quantity = row.quantity - adjustQuantity;
        this.$store.dispatch("order/putOrder", newRow)
      },
    }
  };
</script>

<!-- Style not working when scoped. How to pass tr property into q-table?-->
<style scoped>
  .q-tr1:nth-child(even) {
    background-color: #afeeee;
  }
  add-button {
    alignment: right;
  }
</style>
