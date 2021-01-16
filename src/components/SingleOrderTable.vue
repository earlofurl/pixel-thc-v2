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
    >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="strain" :props="props">
                {{ props.row.strain }}
              </q-td>
              <q-td key="itemType" :props="props">
                {{ props.row.itemType }}
              </q-td>
              <q-td key="quantity" :props="props">
                {{ props.row.quantity }}
                <q-popup-edit v-model="props.row.quantity" buttons persistent @save="updateQuantity(props.row.id, props.row.quantity)">
                  <q-input v-model="props.row.quantity" dense autofocus counter buttons></q-input>
                </q-popup-edit>
              </q-td>
              <q-td key="ppu" :props="props">
                {{ props.row.ppu }}
                <q-popup-edit v-model="props.row.ppu" buttons persistent @save="updatePpu(props.row.id, props.row.ppu)">
                  <q-input v-model="props.row.ppu" dense autofocus counter></q-input>
                </q-popup-edit>
              </q-td>
              <q-td key="Total" :props="props">
                {{ props.row.quantity * props.row.ppu}}
              </q-td>
              <q-td key="packStatus" :props="props">
                <q-checkbox v-model="props.row.packedStatus" v-on:click.native="changeLineItemStatus(props.row.id, props.row.packedStatus)"></q-checkbox>
              </q-td>
              <q-td key="edit" :props="props">
                <q-btn icon="delete" @click="deleteLineItem(props.row.id)"></q-btn>
              </q-td>
            </q-tr>
          </template>
      <template v-slot:top-right>
        <q-btn class="add-button" @click="onAddClick" color="primary" label="Add New"/>
      </template>
    </q-table>
    <q-dialog v-model="stockCard">
      <q-card>
        <q-form class="q-gutter-md" @submit="addToOrder">
        <q-card-section>
          <OrderCreationStockTable />
        </q-card-section>
        <q-card-section>
          <NewOrderItemsTable />
        </q-card-section>
        <q-btn type="submit" class="q-mr-xs" label="Submit" />
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import store from "../store";
import OrderCreationStockTable from "components/OrderCreationStockTable";
import NewOrderItemsTable from "components/NewOrderItemsTable";

// TODO: Rows sometimes switch position after packed checkbox is clicked.

export default {
  name: "SingleOrderTable",
  components: {NewOrderItemsTable, OrderCreationStockTable},
  data() {
    return {
      title: "Single Order Table",
      loading: false,
      orderIsPacked: false,
      stockCard: false,
      pagination: {
        rowsPerPage: 20,
        sortBy: "itemType",
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
        },
        {
          name: "packStatus",
          align: "center",
          label: "Pack Status",
          field: "packedStatus",
          // classes (val) {
          //   return val.packedStatus==true ? "fas fa-check-square" : "fas fa-times-circle"
          // },
          sortable: true
        },
        {
          name: "edit",
          align: "right",
          label: "Edit"
        }
      ]
    };
  },
  computed: {
    order() {
      return this.$store.state.order.order;
    },
    lineItems() {
      return this.$store.state.order.order.lineItems
    },
    newOrderItems() {
      return this.$store.state.order.newOrder // initialize array for new line-item objects to be added to new order
    },
    // orderIsPacked() {
    //   const lineItems = this.lineItems
    //   const lineItemsPacked = lineItems.packedStatus.every(e => {
    //     return e === true
    //   })
    //   console.log(lineItemsPacked)
    //   return lineItemsPacked;
    // }
    // lineItems() {
    //   let lineItemsArray = []
    //   const items = this.order.lineItemIds
    //   for (let i = 0, len = items.length; i < len; i++) {
    //     lineItemsArray.push(this.$store.state.lineItem.lineItems.find(x => x.id === items[i]))
    //   }
    //   console.log(lineItemsArray)
    //   return lineItemsArray
    // },
  },
  methods: {
    // TODO: This is almost working correctly. Changing lineItemStatus on its own and pushing to backend is working.
    // TODO: Checking for orderStatus and pushing that to the backend is not working and is also interfering with
    // TODO: the lineItemStatus process. Revert back to working lineItemStatus and then puzzle forward from there.
    async changeLineItemStatus(id, status) {
      console.log(id, status);
      await this.$store.dispatch("lineItem/changeLineItemStatus", {id, status}).then(response => { // pass request to store and await response
              const items = this.lineItems // set lineItems array in var items
              let itemsPacked = [] // initialize array for analyzing whether item is packed or not
              items.forEach(item => { // iterate through items array and add packed status to itemsPacked array
                itemsPacked.push(item.packedStatus);
              })
              console.log(itemsPacked)
              let allPacked = itemsPacked.every(e => { // check if every packed status is true
                return e === true
              })
              console.log(allPacked)
              // if every item status is packed = true, then change overall status of order to 'PACKED', else change to 'OPEN'
              // TODO: add condition where instead of changing to 'OPEN' if already open, just do nothing, else change back to 'OPEN' in case status was previously 'PACKED'
              allPacked === true ? this.changeOrderStatus('PACKED') : this.changeOrderStatus('OPEN')
            })
    },
    updateQuantity(id, quantity) {
      console.log('Update quantity has been triggered.')
      this.$store.dispatch("lineItem/changeLineItemQuantity", { id, quantity })
    },
    updatePpu(id, ppu) {
      console.log('Update PPU has been triggered');
      this.$store.dispatch("lineItem/changeLineItemPpu", { id, ppu} );
    },
    deleteLineItem(id) {
      console.log(`Delete Line Item has been triggered on Item id #${id}`);
      this.$store.dispatch("order/deleteLineItem", id);
    },
    onAddClick() {
      this.stockCard = true
    },
    addToOrder() {
      console.log("addToOrder called in SingleOrderTable.vue")
      const itemsToAdd = this.newOrder
      this.$store
        .dispatch("order/addToOrder", this.$store.state.order.order, itemsToAdd ) // pass order object to the createOrder action in store
        .then(res => {
          for (let item in this.itemsToAdd) { // iterate through lineItems array
            let lineItemData = this.itemsToAdd[item] // select a single line item object
            let stockUpdateData = this.$store.state.stock.stocks.find(x => x.id === lineItemData.stockId) // select stock object parent of line-item object using stockId from line-item object
            let stockUpdatePatch = {}
            stockUpdatePatch.id = stockUpdateData.id
            stockUpdatePatch.quantity = stockUpdateData.quantity
            this.$store.dispatch("stock/patchStock", stockUpdatePatch) // dispatch putStock action in store to adjust stock quantity in backend
          }
          // this.order = this.createFreshOrderObject(); // after receiving positive response, create a new order object to refresh form
          // this.$store.dispatch("order/createFreshNewOrderObject") // create new order object in store state as well. Are both of these necessary?
          // this.$router.push('/orders') // return user to order table

        });
    },
    async changeOrderStatus(status) {
      const id = this.order.id
      console.log(`This will change the status of Order #${id} to ${status}.`)
      await this.$store.dispatch("order/changeOrderStatus", {id, status})
    }
  }
};
</script>

<style scoped></style>
