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
    </div>
    <div class="row">
      <div class="col">
        <SingleOrderTable />
      </div>
    </div>
<!--    <div>-->
<!--      <q-fab-->
<!--        v-model="fabRight"-->
<!--        vertical-actions-align="left"-->
<!--        color="primary"-->
<!--        icon="keyboard_arrow_up"-->
<!--        direction="up"-->
<!--      ></q-fab>-->
<!--    </div>-->
  </div>
</template>

<script>
import OrderCard from "components/OrderCard";
import SingleOrderTable from "components/SingleOrderTable";
import OrderTotalCard from "components/OrderTotalCard";
import OrderStatusCard from "components/OrderStatusCard";
export default {
  components: {OrderStatusCard, OrderTotalCard, SingleOrderTable, OrderCard },
  data() {
    return {
      fabRight: true
    };
  },
  methods: {
    goBack() {
      return this.$router.push('/orders')
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
