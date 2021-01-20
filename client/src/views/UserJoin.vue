<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <p class="display-3 text-center">Welcome!</p>
        <p class="lead text-center">
          You're one step away from having your own account.
        </p>

        <form @submit.prevent="register">
          <div class="from-group my-2 my-lg-4">
            <input
              class="form-control"
              type="text"
              placeholder="Pick a username"
              maxlength="20"
              required
              v-model="username"
            />
          </div>

          <div class="from-group my-2 my-lg-4">
            <input
              class="form-control"
              type="password"
              placeholder="Pick a strong password"
              required
              v-model="password"
            />
          </div>

          <button class="btn btn-primary">Next</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserJoin",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    register() {
      this.$store
        .dispatch("register", {
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.$router.push("/");
        });
    }
  }
};
</script>
