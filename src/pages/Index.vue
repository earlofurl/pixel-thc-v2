<template>
  <q-page class="flex flex-center">
    <div>
      <amplify-authenticator>
        <amplify-sign-in
          slot="sign-in"
          header-text="Hello World Test Test Test"
        ></amplify-sign-in>
      </amplify-authenticator>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex"
};
</script>
