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
    <h1>Записи до вас:</h1>
    <el-button type="primary" @click="sortToday">Сьогодні</el-button>
    <div class="info" v-for="data in dataFromBase" :key="data.id">
      <p>{{ data.data }}</p>
      <el-button type="primary" @click="goToPet(data.pet.id)"><span v-if="data.pet">{{ data.pet.name }}</span>
      </el-button>
      <p><strong>Причина звернення: </strong> {{ data.reason }}</p>
      <el-button type="primary" @click="deleteAppointment(data.id)">Видалити</el-button>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import {createRouter, createWebHistory, useRoute, useRouter} from 'vue-router';
import axios from 'axios';
import {ElMessage} from 'element-plus';
import dayjs from 'dayjs'
import utcPlugin from 'dayjs/plugin/utc';

dayjs.extend(utcPlugin);
export default {
  setup() {
    const dataFromBase = ref([]);
    const route = useRoute();
    const id = route.query.id;

    const OkDelete = (ms) => {
      ElMessage({
        message: ms,
        type: 'success',
      })
    }
    const deleteAppointment = async (idAppointment) => {
      console.log(idAppointment);
      try {
        const response = await axios.delete('http://localhost:3001/deleteAppoint', {params: {id: idAppointment}});
        OkDelete(response.data.message);
        console.log(response.data);
        getAppointments();
      } catch (error) {
        console.error(error);
      }
    }
    const getAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/doctor_appoint', {
          params: {
            doctor: id
          }
        });
        console.log(response.data);
        dataFromBase.value = response.data;
        await fetchPetData();
      } catch (error) {
        console.error(error);
      }
    }
    const fetchPetData = async () => {
      const promises = dataFromBase.value.map(async (data) => {
        if (data.pet > 0) {
          try {
            const response = await axios.post("http://localhost:3001/getPet", {id: data.pet});
            const pet = response.data[0];
            return {
              ...data,
              pet: {
                id: pet.id,
                name: pet.name
              }
            };
          } catch (error) {
            console.error(error);
            return {
              ...data,
              pet: "" // Возвращение значения по умолчанию
            };
          }
        } else {
          return {
            ...data,
            pet: "" // Возвращение значения по умолчанию
          };
        }
      });

      const updatedData = await Promise.all(promises);
      dataFromBase.value = updatedData;
    };
    const router = useRouter();
const formDataTime = (time) =>{
 return  dayjs(time).utc().format('YYYY-MM-DD');
    }
    const goToPet = (petId) => {
      console.log(id);
      router.push({path: '/pet', query: {id: id, pet: petId}});
    };
    const sortToday = () => {
      const today = dayjs().format('YYYY-MM-DD');
      console.log("Today " + today);
      let newData = [];
      for (const data of dataFromBase.value) {
        const dataDate = dayjs(data.data).format('YYYY-MM-DD');
        if (dataDate === today) {
          newData.push(data);
        }
      }
      // Очистка dataFromBase
      dataFromBase.value.splice(0, dataFromBase.value.length);
      newData.forEach((item) => {
        dataFromBase.value.push(item);
      });
      console.log(newData);
    }
    onMounted(async () => {
      getAppointments();
    });

    return {
      dataFromBase,
      deleteAppointment,
      goToPet,
      sortToday,
    };
  }
}
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
  text-align: left;
}

.info {
  border: 1px solid white;
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
}

button.el-button.el-button--primary {
  border: 1px white solid !important;
}

button.el-button.el-button--primary:hover {
  background-color: whitesmoke !important;
  color: black;
}

</style>