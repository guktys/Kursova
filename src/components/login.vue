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
    <div class="login" style="display: flex; flex-direction: column; align-items: center;">
      <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
      >
        <el-form-item label="Ім'я" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="Пароль" prop="pass">
          <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item style="display: flex; justify-content: center;">
          <el-button type="primary" @click="submitForm">Увійти</el-button>
          <el-button @click="resetForm">Скинути</el-button>
        </el-form-item>
      </el-form>
    </div>


  </div>
</template>

<script>
  import { reactive, ref } from 'vue'
  import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
  import axios from 'axios';
  import { createRouter, useRouter } from 'vue-router';
  import store  from '../store.js';
  export default {
  name: 'Login',
  components: {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
},
  setup() {
    const router = useRouter()
  const ruleFormRef = ref(null)
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else {

        callback()
      }
    }

    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== ruleForm.pass) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    }

    const ruleForm = reactive({
      name: '',
      pass: '',

    })

    const rules = reactive({
      name: [{ required: true, message: 'Please input the name', trigger: 'blur' }],
      pass: [{ validator: validatePass, trigger: 'blur' }],

    })

    const submitForm = () => {
      if (!ruleFormRef.value) return;

      ruleFormRef.value.validate((valid) => {
        if (valid) {
          console.log(ruleForm);
          axios.post('http://localhost:3001/user', ruleForm)
              .then(response => {
                console.log('Server response:', response.data);
                // Обработка ответа от сервера
              if(response.data.login===true){
              //  store.commit('setAuthenticated', true);
              let userRole =response.data.role;
              if(userRole === "user"){
                router.push({ path: '/user_panel',query: { id: response.data.id } });

              }else {
                router.push({ path: '/doctorPanel',query: { id: response.data.id } });
              }

              }

              })
              .catch(error => {
                console.error('Error:', error);
                // Обработка ошибки
              });
        } else {
          console.log('error submit!');
          return false;
        }
      });
    };

    const resetForm = () => {
      if (!ruleFormRef.value) return
      ruleFormRef.value.resetFields()
    }

    return {
      ruleForm,
      rules,
      submitForm,
      resetForm,
      ruleFormRef,
    }
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

.cover-container.d-flex.w-100.h-100.p-3.mx-auto.flex-column {
  margin-top: 150px;
}
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
}

form {
  width: 36%;
}

</style>
<style src="../assets/Appointments.css"></style>