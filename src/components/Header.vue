<template>
  <header class="mb-auto">
    <link href="https://getbootstrap.com/docs/5.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <link rel="apple-touch-icon" href="https://getbootstrap.com/docs/5.2/assets/img/favicons/apple-touch-icon.png" sizes="180x180">
    <link rel="manifest" href="https://getbootstrap.com/docs/5.2/assets/img/favicons/manifest.json">
    <link rel="mask-icon" href="https://getbootstrap.com/docs/5.2/assets/img/favicons/safari-pinned-tab.svg" color="#712cf9">

    <div>
      <h3 class="float-md-start mb-0">Guktys</h3>
      <nav class="nav nav-masthead justify-content-center float-md-end">
        <a class="nav-link fw-bold py-1 px-0 active" aria-current="page" href="/">Головна</a>
        <a class="nav-link fw-bold py-1 px-0" href="/contact">Контакти</a>
        <b-dropdown id="dropdown-1" text="Послуги" class="m-md-2">

            <b-dropdown-item >Про нас</b-dropdown-item>
            <b-dropdown-item >Хірургія</b-dropdown-item>
            <b-dropdown-item >Вакцинація</b-dropdown-item>
            <b-dropdown-item >Тепрапія</b-dropdown-item>
            <b-dropdown-item >Кардіологія</b-dropdown-item>

        </b-dropdown>
      </nav>
    </div>
  </header>
</template>



<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'


export default {
  name: 'Header'
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
.flexible-table{
  width: 100%;
  margin: 0 0 20px;
  border-collapse: collapse;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
table{
  border: solid;
}
tr{
  border: solid;
}
th{
  border: solid;
}
td{
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
@media (min-width: 768px){.float-md-end {
  float: right !important;
}}

</style>