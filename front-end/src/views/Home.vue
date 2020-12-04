<template>
  <div ref="home" class="home">
    <section class="image-gallery">
      <div class="image" v-for="item in items" :key="item.id">
        <h2 class="card-title">{{ item.title }}</h2>
        <div class="card">
          <div class="card-body">
            <p>Description: <br />{{ item.description }}</p>
            <p>Price: $ {{ item.price.toFixed(2) }}</p>
            <p></p>
            <p>
              Please contact: {{ item.user_name }} at
              {{ item.user_email }} about purchasing
            </p>
          </div>

          <img :src="item.path" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      items: [],
    };
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        if(this.$root.$data.selectedUser != null){
          const id = this.$root.$data.selectedUser._id;
        } else{
          
        }
        let response = await axios.get("/api/items/");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.card-title {
  font-size: 1.5em;
}
.card-body {
  width: 50%;
  padding: 1.5em;
  border: 1px lightgrey solid;
}
/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  display: flex;
  flex-direction: column;
  gap: 1em;
  flex-wrap: wrap;
}

.image {
  padding: 1.5em;
  border: 1px solid black;
}

.image img {
  width: 400px;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>
