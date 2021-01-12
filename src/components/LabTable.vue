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
<!--        Below line adds button to top-right enabling user to show only the current lab results in the table.-->
        <q-btn name="currentFilter" color="primary" :disable="loading" @click="filterCurrent">{{ filterText }}</q-btn>
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
    filterToggle: false,
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
      if (this.filterToggle) {
        return this.$store.state.lab.labs.filter((el) => {
          return el.Current === true
        })
      } else {
        return this.$store.state.lab.labs;
      }
    },
    filterText() {
      if (this.filterToggle) {
        return 'Show All'
      } else {
        return 'Current Only'
      }
    }
  },
  methods: {
    filterCurrent() {
      this.filterToggle = !this.filterToggle
    }
  }

}
</script>

<style scoped>

</style>
