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
    <table>
      <thead>
      <tr>
        <th>Послуга</th>
        <th>Ціна, грн</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Прийом до лікаря</td>
        <td>150</td>
      </tr>
      <tr>
        <td>Профілактичний огляд</td>
        <td>100</td>
      </tr>
      <tr>
        <td>Вакцинація</td>
        <td>200</td>
      </tr>
      <tr>
        <td>Лікування ран і ушкоджень</td>
        <td>250</td>
      </tr>
      <tr>
        <td>Стаціонарне лікування</td>
        <td>300</td>
      </tr>
      <tr>
        <td>Операції</td>
        <td>500</td>
      </tr>
      <tr>
        <td>Дентальна чистка</td>
        <td>180</td>
      </tr>
      <tr>
        <td>Аналізи</td>
        <td>80</td>
      </tr>
      <tr>
        <td>Експрес-тестування</td>
        <td>120</td>
      </tr>
      <tr>
        <td>Ехографія</td>
        <td>350</td>
      </tr>
      <tr>
        <td>Дослідження крові</td>
        <td>90</td>
      </tr>
      <tr>
        <td>Флюорографія</td>
        <td>150</td>
      </tr>
      </tbody>
    </table>


  </div>
</template>

<script>
export default {
  name: "Poslygu"
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
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

tr.price__flex-right td:first-child {
  width: 1px;
  white-space: nowrap;
}
th {
  color: black;
}
.cover-container.d-flex.w-100.h-100.p-3.mx-auto.flex-column {
  margin-top: 77px;
}
</style>