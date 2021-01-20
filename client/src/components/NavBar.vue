<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-2 mb-lg-5">
    <router-link class="navbar-brand" to="/">My Web App</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <login-form v-if="!loggedIn && !hideLoginForm" />
      <user-control v-if="loggedIn" />
    </div>
  </nav>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import UserControl from "@/components/UserControl.vue";
import { mapGetters } from "vuex";

export default {
  name: "NavBar",
  computed: {
    hideLoginForm() {
      return ["UserJoin"].indexOf(this.$route.name) !== -1;
    },
    ...mapGetters(["loggedIn"])
  },
  components: {
    LoginForm,
    UserControl
  }
};
</script>

<style></style>
