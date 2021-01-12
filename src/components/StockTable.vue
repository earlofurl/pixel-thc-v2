<template>
  <div class="q-pa-md">
<!--    Stock: {{ stock }}-->
    <q-table
      title="Stock (Reflects packaged product)"
      :data="stock"
      :columns="columns"
      color="primary"
      row-key="id"
      separator="horizontal"
      :pagination.sync="pagination"
      :loading="loading"
      :filter="filter"
    >
<!--      Good chance I'm going to want to move the location of this button-->
      <template v-slot:top-right>
        <q-btn class="add-button" @click="onAddClick" color="primary" label="Add New"/>
        <q-input
          standout
          dense
          align="right"
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="close" @click="filter = ''" class="cursor-pointer"></q-icon>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-batch="props">
        <q-td :props="props">{{ getBatch(props.row.labTestId) }}</q-td>
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
  </div>
</template>

<script>
// TODO: Add filters to Type column to easily select product categories.
import apiService from "src/services/apiService";

export default {
  name: "StockTable",
  props: {
    stock: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      title: "Stock Table",
      filter: "",
      loading: false,
      pagination: {
        rowsPerPage: 20,
        sortBy: "strain",
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
          sortable: true
        },
        {
          name: "thcPercent",
          align: "center",
          label: "THC %",
          field: "ThcPercent",
          style: "font-weight:bold",
          sortable: true
        },
        {
          name: "cbdPercent",
          align: "center",
          label: "CBD %",
          field: "CbdPercent",
          sortable: true
        },
        {
          name: "terpenePercent",
          align: "center",
          label: "Terp %",
          field: "TerpenePercent",
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
          name: "uom",
          align: "center",
          label: "UoM",
          field: "uom",
          sortable: true
        },
        {
          name: "default-price",
          align: "center",
          label: "Default Price",
          field: "priceDefault",
          format: (val) => `$${val}`,
          sortable: true
        }
      ]
    };
  },
  created() {
    this.loading = true;
    apiService
      .getStock()
      .then(response => {
        this.stock = response.data;
        this.loading = false;
      })
      .catch(error => {
        console.log("There was an error: " + error.response);
      });
  },
  computed: {
    labResultList() {
      return this.$store.state.lab.labs
    }
  },
  methods: {
    onAddClick(evt) {
      this.$router.push("/stock/create");
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
    getBatch(cid) {
      const labResults = this.labResultList;
      const labResult = labResults.find(x => x.LabTestResultId === cid);
      return labResult.TestBatch
    }
  },
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
