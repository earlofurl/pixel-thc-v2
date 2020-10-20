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
          <template v-slot:body-cell-packStatus="props">
            <q-checkbox v-model="props.row.packedStatus" v-on:click.native="changeLineItemStatus(props.row.id, props.row.packedStatus)"></q-checkbox>
          </template>

<!--      <template v-slot:body-cell-packStatus="props">-->
<!--        <i :props="props" :class="props.row.packedStatus?'fas fa-check-square fa-lg':'fas fa-times-circle fa-lg'" :style="props.row.packedStatus?'color:Green;font-size:24px':'color:Red;font-size:24px'"></i>-->
<!--      </template>-->
    </q-table>
  </div>
</template>

<script>
import store from "../store";

export default {
  name: "SingleOrderTable",
  data() {
    return {
      title: "Single Order Table",
      loading: false,
      orderIsPacked: false,
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
      await this.$store.dispatch("lineItem/changeLineItemStatus", id, status).then(response => {
        const items = this.lineItems
        let itemsPacked = []
        items.forEach(item => {
          itemsPacked.push(item.packedStatus);
        })
        console.log(itemsPacked)
        let allPacked = itemsPacked.every(e => {
          return e === true
        })
        console.log(allPacked)
        allPacked === true ? this.changeOrderStatus('PACKED') : this.changeOrderStatus('OPEN')
      })
    },
    async changeOrderStatus(status) {
      const id = this.order.id
      console.log(`This will change the status of Order #${id} to ${status}.`)
      await this.$store.dispatch("order/changeOrderStatus", id, status)
    }
  }
};
</script>

<style scoped></style>
