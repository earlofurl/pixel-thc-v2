<template>
  <div class="q-pa-sm">
    <div class="row">
      <div class="col-3">
      <CustomerCard />
      </div>
      <div class="col-7">
        <h4>Add Facility</h4>
        <q-form class="q-gutter-md" @submit="createFacility">
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Facility Name</q-item-label>
                <q-input dense outlined v-model="facility.name" label="Facility Name" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Primary Contact</q-item-label>
                <q-input dense outlined v-model="facility.contactName" label="Primary Contact" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Phone #</q-item-label>
                <q-input
                  dense
                  outlined
                  v-model="facility.phone"
                  label="Phone #"
                  mask="(###) ### - ####"
                  fill-mask
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Email</q-item-label>
                <q-input dense outlined v-model="facility.email" label="Email" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Address Line 1</q-item-label>
                <q-input dense outlined v-model="facility.address1" label="Address Line 1" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Address Line 2</q-item-label>
                <q-input dense outlined v-model="facility.address2" label="Address Line 2" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">City</q-item-label>
                <q-input dense outlined v-model="facility.city" label="City" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">State</q-item-label>
                <q-input dense outlined v-model="facility.state" label="State" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Zip Code</q-item-label>
                <q-input dense outlined v-model="facility.zip" label="Zip Code" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">County</q-item-label>
                <q-input dense outlined v-model="facility.county" label="County" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Notes</q-item-label>
                <q-input autogrow outlined v-model="facility.notes" label="Notes" type="textarea" />
              </q-item-section>
            </q-item>
          </q-list>
          <q-btn color="primary" type="submit" class="q-mr-xs" label="Submit" />
        </q-form>
      </div>
    </div>
  </div>
</template>

<script>
import CustomerCard from "../components/CustomerCard";
import store from "../store";

export default {
  name: "CustomerView",
  components: { CustomerCard },
  data() {
    return {
      facility: this.createFreshFacilityObject()
    };
  },
  methods: {
    createFacility() {
      this.facility.customerId = this.$store.state.customer.customer.id
      this.$store.dispatch("customer/createFacility", this.facility).then(res => {
        this.facility = this.createFreshFacilityObject()
      })
    },
    createFreshFacilityObject() {
      return {
        name: "",
        contactName: "",
        phone: "",
        email: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        county: "",
        notes: ""
      }
    }
  }
};
</script>

<style scoped></style>
