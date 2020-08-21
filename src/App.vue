<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { components } from "aws-amplify-vue";
export default {
  name: "App",
  components: {
    ...components
  }
};
</script>
