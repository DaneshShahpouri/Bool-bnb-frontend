<script>
import AppHeader from './components/AppHeader.vue';
import { store } from './store.js';

export default {
  name: 'App',
  data() {
    return {
      store,
    }
  },

  components: {
    AppHeader
  },


}
</script>

<template>
  <AppHeader></AppHeader>
  <router-view></router-view>
</template>

<style scoped></style>
