<template>
  <meta name="theme-color" content="#712cf9">
  <!-- Favicons -->
  <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
      crossorigin="anonymous"
  />
  <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
    <div class="search-bar">
      <el-input v-model="searchQuery" placeholder="Знайти тварину"></el-input>
      <el-button type="primary" @click="filterPets">Пошук</el-button>
    </div>
    <div class="searchResult" v-for="pet in filteredPets" :key="pet.id" style="margin-top: 15px">
      <el-button type="primary" @click="goToPet(pet.id)"><span >{{ pet.name }}</span></el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import {useRoute, useRouter} from "vue-router";

export default {
  data() {
    return {
      petData: null,
      searchQuery: ''
    };
  },
  mounted() {
    this.fetchPets();
  },
  methods: {

    goToPet (petId) {
      const route = this.$route;
      const router = this.$router;
      const id = route.query.id;
      console.log(id);
      router.push({path: '/pet', query: {id: id, pet: petId}});
    },
    fetchPets() {
      axios
          .post("http://localhost:3001/getAllPet")
          .then((response) => {
            this.petData = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
    },
    filterPets() {
      const query = this.searchQuery.toLowerCase().trim();
      if (this.petData && this.petData.length > 0) {
        return this.petData.filter((pet) => {
          const name = pet.name.toLowerCase();
          const id = String(pet.id).toLowerCase();
          return name.includes(query) || id.includes(query);
        });
      } else {
        return [];
      }
    },
  },
  computed: {
    filteredPets() {
      return this.filterPets();
    },
  },
};
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
button.el-button.el-button--primary {
  border: 1px white solid !important;
}

button.el-button.el-button--primary:hover {
  background-color: whitesmoke !important;
  color: black;
}
.searchResult {
  justify-content: left;
  display: flex;
}
.search-bar {
  margin-top: 50px;
}
</style>