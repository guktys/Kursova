<template>
  <meta name="theme-color" content="#712cf9">
  <!-- Favicons -->
  <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
      crossorigin="anonymous"
  />
  <br>
  <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <location/>
              </el-icon>
              <span>Записи до лікаря</span>
            </template>
            <el-menu-item-group title="">
              <el-menu-item index="1-1" @click="goToAppointments">Записатися</el-menu-item>
              <el-menu-item index="1-2" @click="goToUserCalendar">Календар записів</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item index="4" @click="goToResept">
            <el-icon>
              <el-icon><document /></el-icon>
            </el-icon>
            <span>Рецепти та препарати</span>
          </el-menu-item>
        </el-menu>
      </el-col>

    </el-row>
    <div class="info">
      <div v-if="petData && petData.length > 0">
        <!-- Рендеринг данных о питомце -->
        <div v-for="pet in petData" :key="pet.id">
          <h1>{{ pet.name }}</h1>
          <p>Порода: {{ pet.type }}</p>
          <p v-html="pet.card"></p>
          <img class="petImg" :src="getImageUrl(pet.img)" />
          <!-- Другие поля данных о питомце -->
        </div>
      </div>

      <div v-else>
        <!-- Обработка загрузки данных -->
        <p>Loading pet data...</p>
      </div>


    </div>

  </div>
</template>

<script lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import {createRouter, createWebHistory, useRoute, useRouter} from 'vue-router';
import {ref} from 'vue';
import axios from "axios";


export default {
  data() {
    return {
      petData: null,
     // Инициализируем свойство для хранения данных о питомцах
    };
  },
  mounted() {
    const route = useRoute();
    const id = route.query.id;

    // Выполняем GET-запрос на сервер, передавая идентификатор
    axios.post('http://localhost:3001/pet', { id: id})
        .then(response => {
          // Обработка успешного ответа
          this.petData = response.data;
          let parsedObject=JSON.parse( this.petData[0].card);
          this.petData[0].card='Вік: '+parsedObject.age+'<br> Справка: '+parsedObject.illness;
          console.log( this.petData);
        })
        .catch(error => {
          // Обработка ошибки
          console.error(error);
        });



  },computed: {
    getImageUrl (name) {
      return (name) => {
        const img = '' + name;
        return new URL(`../assets/pet/${img}`, import.meta.url).href;
      };
    },
   }, methods: {
    goToAppointments() {
      const id = this.$route.query.id;
      console.log(id);
      this.$router.push({ path: '/appointments', query: { id: id } });

    },
    goToUserCalendar() {
      const id = this.$route.query.id;
      console.log(id);
      this.$router.push({ path: '/user_calendar', query: { id: id } });

    },

    goToResept(){
      const id = this.$route.query.id;
      console.log(id);
      this.$router.push({ path: '/resepts', query: { id: id } });

    },
  },

};
</script>


<style scoped>
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, .1);
  border: solid rgba(0, 0, 0, .15);
  border-width: 1px 0;
  box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
}

.b-example-vr {
  flex-shrink: 0;
  width: 1.5rem;
  height: 100vh;
}

.bi {
  vertical-align: -.125em;
  fill: currentColor;
}

.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.btn.btn-lg.btn-secondary.fw-bold.border-white.bg-white {
  color: black;
}

.nav-link.fw-bold.py-1.px-0 {
  color: white;
}

.nav-link.fw-bold.py-1.px-0 {
  color: white;
  margin-right: 31px;
}

main.px-3 h1 {
  margin-top: 165px;
}

.display-4.font-weight-normal {
  color: #ffffff;
  text-shadow: 2px 2px 4px #000;
}

.lead.font-weight-normal {
  color: #ffffff;
  text-shadow: 2px 2px 4px #000;
}

div.position-relative.overflow-hidden.p-3.p-md-5.m-md-3.text-center.bg-light {
  background-image: url("../assets/main.jpg");
  background-repeat: no-repeat;
  background-position: center;
}

.btn-outline-secondary {
  --bs-btn-color: #f8f8f8;
  --bs-btn-border-color: #ebedee;
}

.container.main-screen {
  position: relative;
  background-image: url("../assets/cat.png");
  background-position-Y: -56px;
  background-position-x: right;
  background-size: 500px 700px;
  background-repeat: no-repeat;
  height: 452px;
}

p.hometext {
  margin-top: 33px;
  text-align: left;
}

.border {
  border: var(--bs-border-width) var(--bs-border-style) #212529 !important;
}

span.headline {
  color: white;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

a.rowItem p {
  color: white;
  padding-top: 2px;
}

#dropdown04 {
  color: white;
  margin-top: -4px;
  font-size: 16px;
  font-weight: 700;
  margin-right: 8px;
  margin-left: -8px;
}

.btn-outline-secondary {
  --bs-btn-hover-bg: #0086fe00;
}

.cover-container.d-flex.w-100.h-100.p-3.mx-auto.flex-column {
  margin-top: 90px;
}

.el-col-12 {
  max-width: 17%;
  flex: 0 0 50%;
}
.info {
  position: absolute;
  left: 287px;
  top: 3px;
  text-align: left;
}

.info {
  width: 50%;
}
img.petImg {
  /* height: 50%!important; */
  width: 500px;
}
</style>