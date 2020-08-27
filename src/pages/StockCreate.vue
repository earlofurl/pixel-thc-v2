<template>
  <div class="q-pa-md" style="max-width: 500px">
    <h1>Add New Stock Item</h1>
    <q-form class="q-gutter-md" @submit="createStock">
      <q-list>
        <q-item>
          <q-item-section>
            <q-item-label class="q-pb-xs">Lab Results</q-item-label>
            <q-select
              dense
              outlined
              v-model="stock.labResult"
              label="Lab Results"
              :options="labResultList"
              option-label="ProductName"
            ></q-select>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="q-pb-xs">Item Strain</q-item-label>
            <q-input dense outlined disable v-model="stock.labResult.ProductName" label="Strain Name" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="q-pb-xs">Batch</q-item-label>
            <q-input dense outlined disable v-model="stock.labResult.TestBatch" label="Batch" />
          </q-item-section>
        </q-item>
<!--        <q-item>-->
<!--          <q-item-section>-->
<!--            <q-item-label class="q-pb-xs">Item Type</q-item-label>-->
<!--            <q-input dense outlined v-model="stock.itemType" label="Item Type" />-->
<!--          </q-item-section>-->
<!--        </q-item>-->
        <q-item>
          <q-item-section>
            <q-item-label class="q-pb-xs">Item Type</q-item-label>
            <q-select dense outlined v-model="stock.itemType" label="Item Type" :options="itemTypes" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="q-pb-xs">Quantity</q-item-label>
            <q-input dense outlined v-model="stock.quantity" label="Quantity" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="q-pb-xs">UoM</q-item-label>
            <q-select dense outlined v-model="stock.uom" label="UoM" :options="options" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="q-pb-xs">Default Price</q-item-label>
            <q-input dense outlined v-model="stock.priceDefault" label="Default Price" />
          </q-item-section>
        </q-item>
      </q-list>
      <q-btn type="submit" class="q-mr-xs" label="Submit" />
    </q-form>
  </div>
</template>

<script>
  import store from "../store";
  import apiService from "src/services/apiService";

  export default {
    name: "StockCreate",
    data() {
      return {
        stock: this.createFreshStockObject(),
        itemTypes: [
          'Preroll - Single',
          'Preroll - TwoPack',
          'Hash - Pckgd',
          'Hash - Bulk',
          'Flower - Hand A',
          'Flower - Machine B',
          'Flower - Machine A/B Mix',
          'Kief - Loose Bulk'
        ],
        options: [
          'GRAMS', 'POUNDS', 'EACH'
        ],

      };
    },
    methods: {
      createStock() {
        console.log("createStock called in StockCreate.vue")
        this.stock.strain = this.stock.labResult.ProductName
        this.stock.batch = this.stock.labResult.TestBatch
        this.$store
          .dispatch("stock/createStock", this.stock)
          .then(res => {
            this.stock = this.createFreshStockObject();
          });
      },
      createFreshStockObject() {
        return {
          strain: "",
          itemType: "",
          batch: "",
          quantity: "",
          uom: "",
          priceDefault: "",
          labResult: {}
        };
      }
    },
    // mounted() {
    //   this.$store.dispatch('lab/fetchLabs')
    // },
    computed: {
      labResultList() {
        return this.$store.state.lab.labs
      }
    }
  }
</script>

<style scoped>

</style>
