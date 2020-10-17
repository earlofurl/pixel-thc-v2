<template>
  <div>
    <q-card class="my-card">
<!--      <img class="photoPrimary"-->
<!--           :src="this.bucketLink + customer.photoPrimary"-->
<!--      />-->
      <q-card-section>
        <div class="text-h6">{{ customer.name }}</div>
      </q-card-section>
      <q-card-section>{{ customer.notes }}</q-card-section>
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
    customer() {
      return this.$store.state.customer.customer;
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
