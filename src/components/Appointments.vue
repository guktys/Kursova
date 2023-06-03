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

    <img class="pess" src="../assets/pexels-sam-lion-5732454-removebg-preview.png"/>
    <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="formLabelAlign"
        style="max-width: 460px"
    >
      <h1 style="text-align: left">Регестраці запису до лікаря:</h1>
      <el-form-item label="Оберіть лікаря:">
        <el-cascader v-model="formLabelAlign.doctor" placeholder="Лікар"
                     :options="options"
                     filterable @change="handleChange"/>
      </el-form-item>
      <el-form-item label="Причина звернення">
        <el-input type="textarea" v-model="formLabelAlign.reason"/>
      </el-form-item>
      <el-form-item label="Дата запису">
        <el-date-picker
            v-model="formLabelAlign.data"
            type="date"
            placeholder="Оберіть день прийому"
            format="YYYY/MM/DD"
            value-format="YYYY-MM-DD"
            :disabled-date="disabledDate"
        >
          <template #default="cell">
            <div class="cell">
              <span class="text">{{ cell.text }}</span>
              <span v-if="isHoliday(cell.date)" class="holiday"></span>
            </div>
          </template>
        </el-date-picker>


      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formLabelAlign)">Записатися</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script lang="ts">
import {ref, onMounted} from 'vue';
import {ElCascader,  ElButton } from 'element-plus';
import {useRoute} from 'vue-router';
import axios from 'axios';
import {reactive} from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import dayjs from 'dayjs'




export default {
  components: {
    ElCascader,
  },
  setup() {
    const value = ref([]);
    const props = {
      expandTrigger: 'hover',
    };

    const handleChange = (value: any) => {
      console.log(value);
    };
    const user = ref('');
    const options = ref([]);
    interface FormLabelAlign {
      reason: string;
      doctor: number;
      data: string;
      user:string;
    }
    const formLabelAlign = reactive<FormLabelAlign>({
      reason: '',
      doctor:0,
      data:'',
      user:'',
    });
    const labelPosition = ref('top');
    const route = useRoute();
    const id = route.query.id;
    const dataFromBase = ref([]);
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.user = id; // Добавляем айди пользователя
      const selectedDoctor = formLabelAlign.doctor.length > 0 ? formLabelAlign.doctor[formLabelAlign.doctor.length - 1] : null;
      formLabelAlign.doctor = selectedDoctor;
      console.log(formLabelAlign);
          try {
            const response = await axios.post('http://localhost:3001/appoint', formLabelAlign);
            console.log('Form submitted successfully!');
            console.log('Response:', response.data);
            window.location.reload();
          } catch (error) {
            console.error('Error submitting form:', error);
          }

    };
    const holidays = [
      '2023-06-01',
      '2023-06-09',
      '2023-06-12',
      // Add more holidays as needed
    ];

    const isHoliday = (date) => {
      const formattedDate = dayjs(date).format('YYYY-MM-DD');
      return dataFromBase.value.some((item) => item === formattedDate);
    }

      const disabledDate = (time) => {
        // Проверяем, есть ли текущая дата в массиве dataFromBase
        const formattedDate = dayjs(time).format('YYYY-MM-DD');
        return dataFromBase.value.some((item) => item === formattedDate);
      };


    onMounted(async () => {
      try {
        const response = await axios.get('http://localhost:3001/doctors');
        const doctors = response.data;
        options.value = doctors.map((doctor) => ({
          value: doctor.id,
          label: doctor.name,
        }));
      } catch (error) {
        console.error(error);
      }
      try {
        const response = await axios.get('http://localhost:3001/data_appoint', {
          params: {
            user: id
          }
        });
        console.log(response.data);
        dataFromBase.value = response.data.map((item) => item.data.substr(0, 10));
        console.log(dataFromBase.value);
      } catch (error) {
        console.error(error);
      }



    });

    return {
      value,
      props,
      handleChange,
      options,
      formLabelAlign,
      labelPosition,
      submitForm,
      dataFromBase,
      isHoliday,
      dayjs,
      disabledDate ,
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
img.pess {
  position: absolute;
  height: 556px;
  width: 500px;
  padding: 0px;
  top: -46px;
  right: 91px;
}
.cell {
  height: 30px;
  padding: 3px 0;
  box-sizing: border-box;
}
.cell .text {
  width: 24px;
  height: 24px;
  display: block;
  margin: 0 auto;
  line-height: 24px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
}
.cell.current .text {
  background: #626aef;
  color: #fff;
}
.cell .holiday {
  position: absolute;
  width: 6px;
  height: 6px;
  background: var(--el-color-danger);
  border-radius: 50%;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
}
</style>