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
    <el-calendar v-model="selectedDate" :value-format="dateFormat"  @click="handleDateChange">
      <template #date-cell="{ data }">
        <span v-if="isHoliday(data)" class="holiday"></span>
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split('-').slice(1).join('-') }}
          {{ data.isSelected ? '✔️' : '' }}
        </p>

      </template>
    </el-calendar>

    <h3>Обрана дата: {{ selectedDate }}</h3>
    <p v-html="info"></p>
  </div>
</template>

<script>
import { ElCalendar } from 'element-plus';
import axios from "axios";
import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import dayjs from 'dayjs'
import utcPlugin from 'dayjs/plugin/utc';

dayjs.extend(utcPlugin);
export default {
  name: 'UserCalendar',
  components: {
    ElCalendar,
  },
  setup() {
    const route = useRoute();
    const id = route.query.id;
    const value = ref(new Date());
    const dataFromBase = ref([]);
    const selectedDate = ref(null);
    const info = ref('');
const days  = ref([]);
    const dateFormat = (date) => {
      return dayjs(date).format('YYYY-MM-DD');
    };
    const getOneDohter = async (dohterId) => {
      try {
        const response = await axios.get('http://localhost:3001/getDoctors',
            {
              params: {
                id: dohterId
              }
            });

          return response.data[0].name; // Выводит значение из промиса

      } catch (error) {
        console.error(error);
      }

    }
    const handleDateChange = async () => {// Преобразуем выбранную дату в нужный формат и сохраняем в selectedDate
console.log("handleDateChange");
      if (selectedDate.value !== null) {
        // Если выбранная дата не равна null
        info.value = ''; // Сбрасываем значение info
        for (const item of dataFromBase.value) {
          if (dateFormat(item.data) === dateFormat(selectedDate.value)) {
            const doctorName = await getOneDohter(item.doctor);
            info.value += "Лікар: " + doctorName;
            info.value += '<br>' + "Причина звернення: " + item.reason + '<br>';
            console.log(info.value);
          }
        }
      } else {
        info.value = ''; // Если выбранная дата равна null, очищаем info
      }
    };

    const isHoliday = (date) => {
      const formattedDate = dayjs(date.day).utc().format('YYYY-MM-DD');
      return days.value.includes(formattedDate);
    }
    onMounted(async () => {


      
      try {
        const response = await axios.get('http://localhost:3001/data_appoint', {
          params: {
            user: id
          }
        });

        dataFromBase.value = response.data;
        days.value = response.data.map((item) => item.data.split('T')[0]);
      } catch (error) {
        console.error(error);
      }

    });
    return {
      value,
      selectedDate,
      handleDateChange,
      info,
      dateFormat,
      isHoliday,

    };
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


.cover-container.d-flex.w-100.h-100.p-3.mx-auto.flex-column {
  margin-top: 90px;
}
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
button.el-button.el-button--primary {
  border: 1px white solid !important;
}
button.el-button.el-button--primary:hover {
  background-color: whitesmoke !important;
  color: black;
}
.el-calendar-day {
  color: black;
}
 .holiday {
   position: absolute;
   width: 10px;
   height: 10px;
   background: var(--el-color-danger);
   border-radius: 50%;
   bottom: 0px;
   left: 50%;
   transform: translateX(-50%);
   top: 48px;
}
.formatted-text {
  white-space: pre-line;
}
</style>
<style src="../assets/Appointments.css"></style>