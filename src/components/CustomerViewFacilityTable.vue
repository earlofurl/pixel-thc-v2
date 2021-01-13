<template>
  <q-table
    title="Facilities"
    :data="customerFacilities"
    :columns="columns"
    color="primary"
    row-key="id"
    separator="horizontal"
    :pagination.sync="pagination"
    :loading="loading"
  ></q-table>
</template>

<script>
export default {
  name: "CustomerViewFacilityTable",
  data() {
    return {
      loading: false,
      pagination: {
        rowsPerPage: 10,
        sortBy: "name",
        descending: false
      },
      columns: [
        {
          name: "name",
          align: "center",
          label: "Name",
          field: "name",
          style: "font-weight:bold",
          sortable: true
        },
        {
          name: "license",
          align: "center",
          label: "License",
          field: "license",
        },
        {
          name: "address1",
          align: "center",
          label: "Address",
          field: "address1",
          sortable: true
        },
        {
          name: "city",
          align: "center",
          label: "City",
          field: "city",
          sortable: true
        },
        {
          name: "contact1",
          align: "center",
          label: "Contact",
          field: "contactName",
          sortable: true
        },
        {
          name: "email",
          align: "center",
          label: "Email",
          field: "email",
          sortable: true
        },
        {
          name: "phone",
          align: "center",
          label: "Phone",
          field: "phone",
          sortable: true
        },
        // {
        //   name: "notes",
        //   align: "left",
        //   label: "Notes",
        //   field: "notes",
        // }
      ]
    }
  },
  computed: {
    customerFacilities() {
      // compute the facilities associated with selected customer after customer is selected
        let cid = this.$store.state.customer.customer.id
        return this.$store.state.facility.facilities.filter(x => x.customerId === cid)
      }
    }
}
</script>

<style scoped>

</style>
