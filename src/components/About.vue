<template>
  <meta name="theme-color" content="#712cf9">
  <link rel="apple-touch-icon" href="https://getbootstrap.com/docs/5.2/assets/img/favicons/apple-touch-icon.png"
        sizes="180x180">
  <link href="https://getbootstrap.com/docs/5.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
  <link rel="manifest" href="https://getbootstrap.com/docs/5.2/assets/img/favicons/manifest.json">
  <link rel="mask-icon" href="https://getbootstrap.com/docs/5.2/assets/img/favicons/safari-pinned-tab.svg"
        color="#712cf9">

  <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
    <div class="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
      <div class="col-lg-7 p-3 p-lg-5 pt-lg-3">
        <h1 class="display-4 fw-bold lh-1">Послуги високої якості</h1>
        <p class="lead">Ветеринарна клініка "Guktys" - ваш надійний партнер у здоров'ї та добробуті ваших домашніх улюбленців. Наша клініка пропонує широкий спектр послуг високої якості для тварин, забезпечуючи їм найкращу можливу медичну догляд і увагу.
          Наша команда висококваліфікованих та досвідчених ветеринарів присвячена здоров'ю вашого улюбленця і завжди готова надати професійну допомогу в будь-який час. </p>
      </div>
      <div class="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
        <img class="rounded-lg-3" src="../assets/doctor.jpg" alt="" width="720">
      </div>
    </div>


    <h2 class="pb-2 border-bottom">Наші найкращі лікарі</h2>

    <el-carousel :interval="4000" type="card" height="650px">
      <el-carousel-item>
        <div class="item">
          <h1>Коваль Олександр Ігорович</h1>
          <p>Хірургія/терапія/УЗД діагностика/урологія</p>
        </div>

        <img class="first-slide" src="../assets/pexels-tima-miroshnichenko-6235666-removebg-preview.png" alt="First slide">
      </el-carousel-item>
      <el-carousel-item>
        <div class="item">
        <h1>Білодід Марія Вікторівна</h1>
        <p>Офтальмологія/терапія</p>
        <img class="second-slide" src="../assets/pexels-pavel-danilyuk-5998468-removebg-preview.png" alt="Second slide">
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="item">
        <h1>Кістяківський Юрій Йосипович</h1>
        <p>Терапія/репродуктологія/Хірургія</p>
        <img class="third-slide" src="../assets/pexels-klaus-nielsen-6303775-removebg-preview.png" alt="Third slide">
        </div>
      </el-carousel-item>
    </el-carousel>


    <h2 class="pb-2 border-bottom">Прайс стаціонару</h2>

    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5"></div>
    <div class="flexible-table">
      <table class="scrollable" border="0"><thead><tr><th>Услуги</th><th>Пояснение</th><th>Цена, грн</th></tr></thead><tbody><tr class="price__flex-right"><td data-title="Услуги"></td><td data-title="Пояснение">Категория 1 (инъекции, обработки без стоимости препаратов)</td><td data-title="Цена, грн">300</td></tr><tr class="price__flex-right"><td data-title="Услуги"></td><td data-title="Пояснение">Категория 2 (Ж-е в средне тяжелом состоянии,  без стоимости препаратов)</td><td data-title="Цена, грн">1000</td></tr><tr class="price__flex-right"><td data-title="Услуги"></td><td data-title="Пояснение">Категория 3 (Ж-е в тяжелом состоянии, инфузия, инъекции, обработки, оксигенация,  без стоимости препаратов)</td><td data-title="Цена, грн">1500</td></tr><tr class="price__flex-right"><td data-title="Услуги"></td><td data-title="Пояснение">Категория 4 (Ж-е в крайне тяжелом состоянии, реанимация, инфузия, инъекции, обработки, оксигенация, без стоимости препаратов)</td><td data-title="Цена, грн">2000</td></tr><tr class="price__flex-right"><td data-title="Услуги">Коты</td><td data-title="Пояснение">Проживание, уход </td><td data-title="Цена, грн">200</td></tr><tr class="price__flex-right"><td data-title="Услуги">Хорьки, грызуны, птицы</td><td data-title="Пояснение">Проживание, уход </td><td data-title="Цена, грн">100</td></tr><tr class="price__flex-right"><td data-title="Услуги">Собаки</td><td data-title="Пояснение">Проживание, уход, выгул </td><td data-title="Цена, грн">от 300</td></tr></tbody></table>															</div>
  </div>
</template>

<script>
import { ElCarousel, ElCarouselItem } from 'element-plus';

export default {
  components: {
    ElCarousel,
    ElCarouselItem,
  },
  name: "About",
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
#dropdown04 {
  color: white;
  margin-top: -4px;
  font-size: 16px;
  font-weight: 700;
  margin-right: 8px;
  margin-left: -8px;
}
.btIconWidgetTitle {
  --bs-text-opacity: 1;
  color: #6c757d !important;
  font-size: 1.25rem;
  font-weight: 300;
}
.col-lg-6.col-md-8.mx-auto {
  width: 100%;
}
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.item {
  position: relative;
  top: 22px;
}
</style>