<template>
  <header class="mb-auto">

    <div>
      <h3 class="float-md-start mb-0">Guktys</h3>
      <nav class="nav nav-masthead justify-content-center float-md-end">
        <a class="nav-link fw-bold py-1 px-0 active" aria-current="page" href="/">Головна</a>
        <a class="nav-link fw-bold py-1 px-0" href="/contact">Контакти</a>
        <el-dropdown>
          <el-button type="primary">
            <p class="headerDropdown">Послуги</p>
            <el-icon class="el-icon--right">
              <arrow-down></arrow-down>
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Про нас</el-dropdown-item>
              <el-dropdown-item>Хірургія</el-dropdown-item>
              <el-dropdown-item>Вакцинація</el-dropdown-item>
              <el-dropdown-item>Тепрапія</el-dropdown-item>
              <el-dropdown-item>Кардіологія</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <a href="/login">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
        </a>

      </nav>
    </div>
  </header>
</template>


<script>

import {ArrowDown} from '@element-plus/icons-vue'
import {ElDropdown, ElDropdownMenu, ElDropdownItem, ElButton} from 'element-plus'

export default {
  name: 'Header',
  components: {ArrowDown, ElDropdown, ElDropdownMenu, ElDropdownItem, ElButton},
  methods: {
    handleClick() {
      alert('button click')
    }
  }
}

</script>
<style>

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

.row.p-4.pb-0.pe-lg-0.pt-lg-5.align-items-center.rounded-3.border.shadow-lg {
  margin-top: 50px;
}

img.rounded-lg-3 {
  height: 10%;
  width: 70%;
  border-radius: 8px;
}

.carousel-caption {
  text-shadow: 2px 2px 4px #000;
}

#myCarousel {
  height: 90%;
  margin-top: -49px;
}

.pb-2.border-bottom {
  margin-top: 55px;
}

.flexible-table {
  width: 100%;
  margin: 0 0 20px;
  border-collapse: collapse;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

table {
  border: solid;
}

tr {
  border: solid;
}

th {
  border: solid;
}

td {
  border: solid;
}

#dropdown04 {
  color: white;
  margin-top: -4px;
  font-size: 16px;
  font-weight: 700;
  margin-right: 8px;
  margin-left: -8px;
}

@media (min-width: 768px) {
  .float-md-end {
    float: right !important;
  }
}

.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 15px;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;

}

button.el-button {
  background-color: #409eff00 !important;
  border-color: #409eff00 !important;

  font-size: 16px;
}

.headerDropdown {
  font-weight: 700 !important;
  margin-bottom: 0px;
}
</style>