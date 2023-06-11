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
    <h1>Виписаний вам рецепт:</h1>
    <div class="info" v-for="data in petData" :key="data.id" style="display: flex; flex-direction: column; align-items: center;">
      <h3 class="text-center">{{data.name}}</h3>
<br>
      <div class="resept" v-for="resept in data.resept" :key="resept.id" >
        <div class="text-center">
        <p>{{formDataTime(resept.data)}}</p>
        <p>{{resept.text}}</p>
        </div>
      </div>
      </div>

  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from "axios";
import { useRouter } from 'vue-router';
import dayjs from "dayjs";

export default {
  setup() {
    const router = useRouter();
    const petData = ref(null);

    onMounted(() => {
      loadData();
    });
    const formDataTime = (time)=>{
      return  dayjs(time).format('YYYY-MM-DD');
    };
    async function loadData() {
      try {
        const route = router.currentRoute.value;
        const id = route.query.id;

        const response1 = await axios.post('http://localhost:3001/pet', { id: id });
        const petDataResponse = response1.data;

        petData.value = await Promise.all(petDataResponse.map(async (data) => {
            try {
              const response = await axios.post('http://localhost:3001/getResept', { id: data.id });
              const resepts = response.data;
              console.log(resepts);
              return {
                ...data,
                resept: resepts
              };
            } catch (error) {
              console.error(error);
              return {
                ...data,
                resept: "Ошибка" // Возвращение значения по умолчанию
              };
            }

        }));
      } catch (error) {
        console.error(error);
      }
      console.log(petData.value);
    }

    return {
      petData,
      formDataTime,
    };
  },
};
</script>

<style scoped>
bd-placeholder-img {
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
.cover-container.d-flex.w-100.h-100.p-3.mx-auto.flex-column {
  margin-top: 77px;
}
p.List {
  text-align: left;
  margin-top: 20px;
}
button.el-button.el-button--primary {
  border: 1px white solid !important;
}
button.el-button.el-button--primary:hover {
  background-color: whitesmoke !important;
  color: black;
}
.resept{
  border: 1px solid white;
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
  text-align: left;
  width:60%;
}
</style>