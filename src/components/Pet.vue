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
    <div class="info">
      <div v-if="petData && petData.length > 0">
        <!-- Рендеринг данных о питомце -->
        <div v-for="pet in petData" :key="pet.id">
          <h1>{{ pet.name }}</h1>
          <p><strong>Id: {{ pet.id }}</strong></p>
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
      <el-button class="addResept" type="primary" @click="dialogFormVisible = true">Виписати рецепт</el-button>
      <h1>Виписані рецепти:</h1>
      <div class="resept" v-if="resepts && resepts.length > 0">
      <div class="reseptItem" v-for="resept in resepts" :key="resept.id">
        <p>{{resept.data}}</p>
        <p>{{resept.text}}</p>
      </div>
      </div>
    </div>
    <el-dialog v-model="dialogFormVisible" title="Виписати рецепт">
      <el-form :model="form">
        <el-form-item label="Рецепт" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.text" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button class="ok" type="primary" @click="handleRecipeForm">Виписати</el-button>
        <el-button @click="dialogFormVisible = false">Відмінити</el-button>
      </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting
} from '@element-plus/icons-vue'
import {ElDialog, ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElButton, ElMessage} from 'element-plus';

import {createRouter, createWebHistory, useRoute, useRouter} from 'vue-router';
import axios from "axios";
import { reactive, ref } from 'vue'

const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
export default {
  components: {
    ElDialog,
    ElForm,
    ElFormItem,
    ElInput,
    ElSelect,
    ElOption,
    ElButton,
  },
  data() {
    return {
      petData: null,
      resepts:null,
      dialogFormVisible: false,
      form: {
        text: '',
      },
      formLabelWidth: '140px',
      petId:0,
      // Инициализируем свойство для хранения данных о питомцах
    };
  },
  mounted() {
    const route = useRoute();
    const pet = route.query.pet;
    this.petId=pet;
    // Выполняем GET-запрос на сервер, передавая идентификатор
    axios.post('http://localhost:3001/getPet', { id: pet})
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

    this.getResept();


  }, methods: {
     OkDelete (ms)  {
      ElMessage({
        message: ms,
        type: 'success',
      })
    },
    async handleRecipeForm() {
      // Обработчик события нажатия кнопки "Виписати"
      // Получите данные из формы и выполните необходимые операции
      const recipeData = {
        text: this.form.text,
      };
      try {
        const response = await axios.post('http://localhost:3001/addResept', {text: recipeData.text, pet: this.petId});
         console.log('Response:', response.data);
        this.OkDelete(response.data.message);
        this.getResept();
      } catch (error) {
        console.error('Error submitting form:', error);
      }
      // Выполните нужные действия с данными, например, сохраните в переменную или отправьте на сервер
      console.log(recipeData);
      this.form.text = '';
      this.dialogFormVisible = false;
    },
    getResept() {
      axios.post('http://localhost:3001/getResept', { id:  this.petId})
          .then(response => {
            // Обработка успешного ответа
            console.log(response.data);
            this.resepts=response.data;
          })
          .catch(error => {
            // Обработка ошибки
            console.error(error);
          });
    }
  },




  computed: {
    getImageUrl (name) {
      return (name) => {
        const img = '' + name;
        return new URL(`../assets/pet/${img}`, import.meta.url).href;
      };
    },
  },
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



.el-col-12 {
  max-width: 17%;
  flex: 0 0 50%;
}
.info {
  text-align: left;
  margin-left: 284px;
  margin-top: -233px;
}
.info {
  width: 60%;
}
img.petImg {
  /* height: 50%!important; */
  width: 500px;
}
.info {
  overflow: auto;

}
.info {
  position: absolute;
  top: 260px;
}
.reseptItem{
  border: 1px solid white;
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
  text-align: left;
}
button.el-button.el-button--primary {
  border: 1px white solid !important;
}

button.el-button.el-button--primary:hover {
  background-color: whitesmoke !important;
  color: black;
}
.addResept {
  margin-top: 10px;
  padding: 23px;
}
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
button.el-button.el-button--primary.ok {
  color: black;
}
</style>