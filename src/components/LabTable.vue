<template>
  <div class="q-pa-md">
    <q-table
      title="Lab Results"
      :data="labResults"
      :columns="columns"
      color="primary"
      row-key="name"
      separator="horizontal"
      :pagination.sync="pagination"
      :loading="loading"
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-input standout dense debounce="300" color="primary" v-model="filter" placeholder="search">
          <template v-slot:append>
            <q-icon name="close" @click="filter = ''" class="cursor-pointer"></q-icon>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-current="props">
        <q-td :props="props">
          <q-checkbox
            v-model="props.row.Current"
            disable
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import apiService from "src/services/apiService";

export default {
name: "LabTable",
  // props: {
  //   labResults: {
  //     type: Array,
  //     // required: true,
  //   }
  // },
  data() {
  return {
    title: "Lab Results",
    loading: false,
    pagination: {
      rowsPerPage: 20,
      sortBy: 'item',
      descending: false,
    },
    filter: "",
    columns: [
      {
        name: "Source Tag",
        label: "Parent Tag",
        field: "SourcePackageLabel",
        required: true,
        align: "left",
        sortable: true,
        sort: (a, b, rowA, rowB) => parseInt(a, 10) - parseInt(b, 10),
        format: (val, row) => `${val}`,
      },
      {
        name: "item",
        align: "center",
        label: "Item",
        field: "ProductName",
        sortable: true
      },
      {
        name: "batch",
        align: "center",
        label: "Batch",
        field: "TestBatch",
        sortable: true,
      },
      {
        name: "thc_percent",
        label: "THC%",
        field: "ThcPercent",
        sortable: true,
      },
      {name: "cbd_percent", label: "CBD%", field: "CbdPercent"},
      {name: "terp_percent", label: "Terp%", field: "TerpenePercent"},
      {name: "test_id", label: "Test ID", field: "LabTestExternalId"},
      {name: "test_date", label: "Test Date", field: "TestPerformedDate"},
      {
        name: "grow_name",
        label: "Grow Name",
        field: "ProducerLicenseName",
        sortable: true,
        alight: "center",
        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
      },
      {
        name: "current",
        label: "Current",
        field: "Current",
      }
    ]
  }
  },
  async created() {
    this.loading = true
    await this.$store.dispatch('lab/fetchLabs').then(response => this.loading = false)
  },
  computed: {
    labResults() {
      return this.$store.state.lab.labs;
    }
  }

}
</script>

<style scoped>

</style>
