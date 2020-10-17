<template>
  <div>
    <q-card class="my-card">
<!--      <img class="photoPrimary"-->
<!--           :src="this.bucketLink + customer.photoPrimary"-->
<!--      />-->
      <q-card-section>
        <div class="text-h6">{{ facility.name }}</div>
      </q-card-section>
      <q-card-section>
        <div class="text-subtitle2">{{ facility.address1 }}</div>
        <div class="text-subtitle2">{{ facility.contactName }}</div>
        <div class="text-subtitle2">{{ facility.email }}</div>
        <div class="text-subtitle2">{{ facility.phone }}</div>
      </q-card-section>
      <q-card-section>{{ facility.notes }}</q-card-section>
    </q-card>
  </div>
</template>

<script>
import store from "../store";

export default {
  name: "CustomerCard",
  data () {
    return {
      bucketLink: "https://pixel-thc-dev-pub.s3-us-west-2.amazonaws.com/"
    }
  },
  computed: {
    facility() {
      return this.$store.state.facility.facility.facility;
    }
  }
};
</script>

<style scoped>
img {
  width: 150px;
  height: 150px;
}
</style>
