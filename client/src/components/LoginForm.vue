<template>
  <form class="form-inline ml-auto my-2 my-lg-0" @submit.prevent="logIn">
    <input
      class="form-control mr-sm-2 my-2 my-sm-0"
      placeholder="Username"
      aria-label="Username"
      type="text"
      maxlength="20"
      required
      v-model="username"
    />
    <input
      class="form-control mr-sm-2"
      type="password"
      placeholder="Password"
      aria-label="Password"
      required
      v-model="password"
    />
    <button class="btn btn-dark my-2" type="submit">Log in</button>
    <router-link class="btn btn-primary my-2 mx-2" to="/join">
      Join!
    </router-link>
  </form>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    logIn() {
      this.$store.dispatch("logIn", {
        username: this.username,
        password: this.password
      });
    }
  }
};
</script>

<style></style>
