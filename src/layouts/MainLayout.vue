<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar
        class="Qtoolbar"
        elevated
      >
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
          color="primary"
        />

        <q-toolbar-title class="toolbarText">
          Pixel THC
        </q-toolbar-title>

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
              <q-btn v-if="$auth.isAuthenticated" @click="logout" color="secondary">
                Log out
              </q-btn>
            </div>
            <div class="col-auto"></div>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-purple-10"
      width="200"
    >
      <q-list>
        <!-- <div v-if="!this.isLoggedIn">
          <q-item clickable :to="{name: 'profile'}">
            <q-item-section avatar>
              <q-icon name="settings"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Profile</q-item-label>
              <q-item-label caption>view your profile</q-item-label>
            </q-item-section>
          </q-item>
        </div> -->
        <q-item to="/" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon class="drawerIcon" name="dashboard"/>
          </q-item-section>
          <q-item-section>
            <q-item-label class="drawerLabel">Dashboard</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/profile" active-class="q-item-no-link-highlighting" v-if="$auth.isAuthenticated">
          <q-item-section avatar>
            <q-icon class="drawerIcon" name="person"/>
          </q-item-section>
          <q-item-section>
            <q-item-label class="drawerLabel">Profile</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/lab" active-class="q-item-no-link-highlighting" v-if="$auth.isAuthenticated">
          <q-item-section avatar>
            <q-icon class="drawerIcon" name="emoji_objects"/>
          </q-item-section>
          <q-item-section>
            <q-item-label class="drawerLabel">Lab</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/customers" active-class="q-item-no-link-highlighting" v-if="$auth.isAuthenticated">
          <q-item-section avatar>
            <q-icon class="drawerIcon" name="people"/>
          </q-item-section>
          <q-item-section>
            <q-item-label class="drawerLabel">Customers</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/stock" active-class="q-item-no-link-highlighting" v-if="$auth.isAuthenticated">
          <q-item-section avatar>
            <q-icon class="drawerIcon" name="table_view"/>
          </q-item-section>
          <q-item-section>
            <q-item-label class="drawerLabel">Stock</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/orders" active-class="q-item-no-link-highlighting" v-if="$auth.isAuthenticated">
          <q-item-section avatar>
            <q-icon class="drawerIcon" name="list"/>
          </q-item-section>
          <q-item-section>
            <q-item-label class="drawerLabel">Orders</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksData = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev"
  }
  // {
  //   title: 'Github',
  //   caption: 'github.com/quasarframework',
  //   icon: 'code',
  //   link: 'https://github.com/quasarframework'
  // },
  // {
  //   title: 'Discord Chat Channel',
  //   caption: 'chat.quasar.dev',
  //   icon: 'chat',
  //   link: 'https://chat.quasar.dev'
  // },
  // {
  //   title: 'Forum',
  //   caption: 'forum.quasar.dev',
  //   icon: 'record_voice_over',
  //   link: 'https://forum.quasar.dev'
  // },
  // {
  //   title: 'Twitter',
  //   caption: '@quasarframework',
  //   icon: 'rss_feed',
  //   link: 'https://twitter.quasar.dev'
  // },
  // {
  //   title: 'Facebook',
  //   caption: '@QuasarFramework',
  //   icon: 'public',
  //   link: 'https://facebook.quasar.dev'
  // },
  // {
  //   title: 'Quasar Awesome',
  //   caption: 'Community Quasar projects',
  //   icon: 'favorite',
  //   link: 'https://awesome.quasar.dev'
  // }
];

export default {
  name: "MainLayout",
  // components: { EssentialLink },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    };
  },
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

<!--Notice lang="scss"-->
<style lang="scss">
.drawerIcon {
  color: white;
}

.drawerLabel {
  color: white;
}

.Qtoolbar {
  background-color: white;
}

.toolbarText {
  color: black;
}
</style>
