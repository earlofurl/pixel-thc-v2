<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-2">
        <q-btn @click="goBack" label="<- Back"></q-btn>
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        <div class="my-card">
          <OrderCard />
        </div>
      </div>
      <div class="col-1"></div>
      <div class="col-2">
        <OrderTotalCard />
      </div>
      <div class="col-1"></div>
      <div class="col-2">
        <OrderStatusCard />
      </div>
      <div class="col-1"></div>
      <div class="col-2">
        <q-btn @click="onDeleteClick">DELETE</q-btn>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <SingleOrderTable />
      </div>
    </div>
    <q-dialog v-model="card">
      <div>
        <q-card>
          <q-form ref="deleteConfirmCard" @submit="deleteOrder">
            <q-btn type="submit" label="Confirm Deletion"></q-btn>
            <q-btn @click="onDeleteCancel" label="Cancel"></q-btn>
          </q-form>
        </q-card>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import OrderCard from "components/OrderCard";
import SingleOrderTable from "components/SingleOrderTable";
import OrderTotalCard from "components/OrderTotalCard";
import OrderStatusCard from "components/OrderStatusCard";
import OrderCreationStockTable from "components/OrderCreationStockTable";
export default {
  components: {OrderStatusCard, OrderTotalCard, SingleOrderTable, OrderCard },
  data() {
    return {
      card: false,
      fabRight: true
    };
  },
  methods: {
    goBack() {
      return this.$router.push('/orders')
    },
    onDeleteClick() {
      this.card = true;
      this.$nextTick(()=>{ this.$refs.deleteConfirmCard.focus()})
    },
    onDeleteCancel() {
      this.card = false;
    },
    deleteOrder() {
      const id = this.$store.state.order.order.id;
      this.$store.dispatch("order/deleteOrder", id);
      this.$router.push('/orders');
    }
  }
  // created() {
  //   this.$store.dispatch(
  //     "lineItem/fetchLineItems",
  //     this.$store.state.order.order.lineItemIds
  //   );
  // }
};
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 250px;
}
</style>
