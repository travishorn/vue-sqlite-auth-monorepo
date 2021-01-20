<template>
  <ul class="navbar-nav ml-auto">
    <li class="nav-item dropdown">
      <a
        class="nav-link dropdown-toggle"
        href="#"
        id="userControlDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <img
          src="../assets/user-placeholder.png"
          class="rounded-circle"
          style="width:25px"
          :alt="`User profile picture for ${username}`"
        />
        <span class="mx-2">{{ username }}</span>
      </a>
      <div
        class="dropdown-menu dropdown-menu-right"
        aria-labelledby="userControlDropdown"
      >
        <button class="dropdown-item" @click="logOut">Log out</button>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "UserControl",
  computed: {
    ...mapState({
      username: state => state.user.username
    })
  },
  methods: {
    logOut() {
      this.$store.dispatch("logOut");
    }
  }
};
</script>
