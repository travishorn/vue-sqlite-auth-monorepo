<template>
  <div>
    <nav-bar />
    <router-view />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { mapGetters } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapGetters(["loggedIn"])
  },
  components: {
    NavBar
  }
};
</script>
