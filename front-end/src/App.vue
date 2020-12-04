<template>
  <div id="app">
    <div class="header">
      <router-link to="/">
        <div class="logo">
          <img src="/logo.png" width="80px" style="margin-top: 5px" />
        </div>
      </router-link>
      <div class="title">
        <h1>Gregs List</h1>
      </div>
      <!-- <select style="float: right; padding-right: 50px;" name="" id="" v-model="selectUser" @change="updateUser">
        <option value="none">No User Selected</option>
        <option :value="user._id" v-for="user in users" :key="user._id">
          {{ user.name }}
        </option>
      </select> -->
    </div>
    <div class="content">
      <router-view />
    </div>
    <div class="footer">
      <router-link to="/admin">Admin</router-link>
      <p></p>
      <a
        href="https://github.com/BYU-CS-260-Winter-2020/lab-4-museum-of-ordinary-objects-Falken1998"
        target="_blank"
        >github repo</a
      >
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      users: [],
      selectUser: "none",
    };
  },
  methods: {
    // async getUsers() {
    //   try {
    //     let response = await axios.get("/api/users");
    //     this.users = response.data;
    //     return true;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // updateUser(){
    //   this.$root.$data.selectUser = this.selectUser;
    // }
  },
};
</script>
<style>
html {
  box-sizing: border-box;
}

body {
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}

/* Header */
.header {
  display: flex;
  padding: 10px 100px 0px 100px;
  background-color: #9c9c9c;
  color: #dfdfdf;
}

.title {
  background-color: #000;
  border-radius: 40px;
  padding-left: 15px;
  padding-right: 15px;
  margin-top: 5px;
  margin-bottom: 15px;
}

.title h1 {
  font-size: 30px;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}

/* Footer */
.footer {
  height: 50px;
  padding: 20px 100px 0px 100px;
  background: #e3e3e3;
  font-size: 12px;
}

.footer a {
  color: #000;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}
</style>
