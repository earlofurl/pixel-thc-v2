<template>
  <div class="q-pa-lg" style="max-width: 1200px">
    <h1>Add New Order</h1>
    <q-form class="q-gutter-md" @submit="createOrder">
      <q-list>
        <q-badge color="secondary" multi-line>
<!--          Model: "{{ model }}"-->
        </q-badge>
        <q-item>
          <q-item-section>
            <q-item-label class="q-pb-xs">Customer</q-item-label>
            <q-select
              dense
              outlined
              v-model="order.customer"
              label="Customer"
              :options="customers"
              option-label="name">
<!--              use-input-->
<!--              input-debounce="0"-->
<!--              @filter="filterFn"-->
<!--              behavior="menu"-->
<!--            >-->
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="q-pb-xs">Initial Status</q-item-label>
            <q-select dense outlined v-model="order.status" label="Initial Status" :options="orderStatuses" />
          </q-item-section>
        </q-item>
<!--        <q-item>-->
<!--          <q-date v-model="order.scheduledDeliveryDate" today-btn />-->
<!--        </q-item>-->
        <q-item>
          <q-input filled v-model="order.scheduledPackDate" placeholder="<-- Pack Date & Time -->">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date v-model="order.scheduledPackDate" mask="YYYY-MM-DD HH:mm"></q-date>
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="order.scheduledPackDate" mask="YYYY-MM-DD HH:mm"></q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-item>
        <q-item>
          <q-input filled v-model="order.scheduledShipDate" placeholder="<-- Ship Date & Time -->">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date v-model="order.scheduledShipDate" mask="YYYY-MM-DD HH:mm"></q-date>
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="order.scheduledShipDate" mask="YYYY-MM-DD HH:mm"></q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-item>
      </q-list>
      <OrderCreationStockTable />
      <div><p>For now, click row in bottom table to remove item.</p></div>
      <OrderCreationTable />
      <q-btn type="submit" class="q-mr-xs" label="Submit" />
    </q-form>
  </div>
</template>

<script>
  import store from "../store";
  import OrderCreationTable from "components/NewOrderItemsTable";
  import OrderCreationStockTable from "components/OrderCreationStockTable";

  export default {
    name: "OrderCreate",
    components: {OrderCreationStockTable, OrderCreationTable },
    data() {
      return {
        order: {},
        customer: null,
        // status: 'OPEN',
        orderStatuses: [
          'OPEN', 'PACKED', 'SHIPPED', 'DELIVERED', 'CANCELLED'
        ]
      };
    },
    computed: {
      customers() {
        return this.$store.state.customer.customers
      },
      newOrderItems() {
        return this.$store.state.order.newOrder
      }
    },
    methods: {
      createOrder() {
        console.log("createOrder called in OrderCreate.vue")
        this.order.lineItems = this.newOrderItems
        this.$store
          .dispatch("order/createOrder", this.order)
          .then(res => {
            for (let item in this.order.lineItems) {
              let lineItemData = this.order.lineItems[item]
              let stockUpdateData = this.$store.state.stock.stocks.find(x => x.id === lineItemData.stock)
              this.$store.dispatch("stock/putStock", stockUpdateData)
            }
            this.order = this.createFreshOrderObject();
            this.$store.dispatch("order/createFreshNewOrderObject")
            this.$router.push('/orders')

          });
      },
      createFreshOrderObject() {
        return {
          scheduledPackDate: "",
          scheduledShipDate: "",
          notes: "",
          customer: null,
          status: 'OPEN',
          orderItems: [],
        };
      },
      // filterFn (val, update) {
      //   if (val === '') {
      //     update(() => {
      //       this.options = this.customers
      //     })
      //     return
      //   }
      //     update(() => {
      //       const needle = val.toLowerCase()
      //       this.options = this.customers.filter(v => needle.includes(v.name) > -1)
      //     })
      // }
    },
    created() {
      this.order = this.createFreshOrderObject()
      this.$store.dispatch("order/createFreshNewOrderObject")
    },
  }
</script>

<style scoped>

</style>
