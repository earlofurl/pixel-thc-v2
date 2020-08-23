<template>
  <q-page>
    <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12"></div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <div class="row">
          <img alt="Pixel THC" src="~assets/PixelTHC_tempLogo.png" />
        </div>
        <!-- Check that the SDK client is not currently loading before accessing is methods -->
        <div v-if="!$auth.loading">
          <div class="row">
            <div class="col-4"></div>
            <div class="col-auto">
              <!-- show login when not authenticated -->
              <q-btn
                v-if="!$auth.isAuthenticated"
                @click="login"
                color="primary"
              >
                Log in
              </q-btn>
              <!-- show logout when authenticated -->
              <q-btn v-if="$auth.isAuthenticated" @click="logout">
                Log out
              </q-btn>
            </div>
            <div class="col-auto"></div>
          </div>
        </div>

        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12"></div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Home",
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
};
</script>
