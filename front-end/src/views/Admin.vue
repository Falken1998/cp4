<template>
  <div ref="admin" class="admin">
    <h1>The Admin Page!</h1>

    <!-- Adding Items -->
    <div class="heading">
      <div class="circle">1</div>
      <h2>Add an Item</h2>
    </div>
    <div class="add">
      <div class="form">
        <input v-model="item.title" placeholder="Title" />
        <p>$ <input v-model="item.price" placeholder="Price" /></p>
        <p></p>
        <textarea
          v-model="item.description"
          cols="30"
          rows="10"
          placeholder="Description"
        ></textarea>
        <p></p>
        <input v-model="item.user_name" placeholder="Full Name" />
        <input v-model="item.user_email" placeholder="Email" />

        <input type="file" name="photo" @change="fileChanged" />
        <button @click="upload" :disabled="isDisabled">Upload</button>
      </div>
      <div class="upload" v-if="addItem">
        <h2>{{ addItem.title }}</h2>
        <p>{{ addItem.description }}</p>
        <img :src="addItem.path" />
        <p>$ {{ addItem.price }}</p>
        <p>{{ addItem.user_name }}</p>
        <p>{{ addItem.user_email }}</p>
      </div>
    </div>

    <!-- Deleting / Editing Items -->
    <div class="heading">
      <div class="circle">2</div>
      <h2>Edit/Delete an Item</h2>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findTitle" placeholder="Search" />
        <div class="suggestions" v-if="suggestions.length > 0">
          <div
            class="suggestion"
            v-for="s in suggestions"
            :key="s.id"
            @click="selectItem(s)"
          >
            {{ s.title }}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findItem">
        <input v-model="findItem.title" />
        <p></p>
        <!-- Description -->
        <textarea v-model="findItem.description" cols="30" rows="10"></textarea>
        <p></p>
        <!-- image -->
        <img :src="findItem.path" style="width: 100px" />
        <input type="file" name="photo" @change="fileChanged" />
      </div>
      <div class="actions" v-if="findItem">
        <button @click="deleteItem(findItem)">Delete</button>
        <button @click="editItem(findItem)">Edit</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Admin",

  data() {
    return {
      item: {
        title: "",
        description: "",
        price: "",
        user_email: "",
        user_name: "",
        path: "",
      },
      file: null,
      addItem: null,
      items: [],
      findTitle: "",
      findItem: null,
    };
  },
  computed: {
    suggestions() {
      let items = this.items.filter((item) =>
        item.title.toLowerCase().startsWith(this.findTitle.toLowerCase())
      );
      return items.sort((a, b) => a.title > b.title);
    },
    isDisabled: {
      cache: false,
      get() {
        return (
          this.title >= 0 &&
          this.description <= 0 &&
          this.price <= 0 &&
          this.user_name <= 0 &&
          this.user_email <= 0
        );
      },
    },
  },
  created() {
    this.getItems();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];
    },
    clearItem() {
      this.item = {
        title: "",
        description: "",
        price: "",
        user_email: "",
        user_name: "",
        path: "",
      }
    },
    async upload() {
      try {
        const formData = new FormData();
        let r1;
        if (this.file != null) {
          formData.append("photo", this.file, this.file.name);
          r1 = await axios.post("/api/photos", formData);
        } else {
          r1 = { data: { path: "/images/default.png" } };
        }
        let r2 = await axios.post("/api/items", {
          title: this.item.title,
          description: this.item.description,
          price: this.item.price,
          user_name: this.item.user_name,
          user_email: this.item.user_email,
          path: r1.data.path,
        });
        this.addItem = r2.data;
        this.file = null;
        this.clearItem();
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
      try {
        await axios.put("/api/items/" + item._id, {
          title: this.findItem.title,
          description: this.findItem.description,
          price: this.findItem.price,
          path: this.findItem.path,
          user_name: this.findItem.user_name,
          user_email: this.findItem.user_email,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },

    async deleteItem(item) {
      try {
        await axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center;
}

/* Form */
input,
textarea,
select,
button {
  font-family: "Montserrat", sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5bdeff;
  color: #fff;
}
</style>