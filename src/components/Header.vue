<template>
  <header>
    <b-navbar toggleable="lg" type="dark" class="header">
      <b-navbar-brand href="/#/">
        <img src="@/assets/images/ロゴ.jpg" alt style="width:50px; height:50px;" />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!-- <b-nav-item>
            <router-link to="/" class="nav-link text-light">Home</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/RestaurantList" class="nav-link text-light">店舗一覧</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/Restaurant/Detail/1" class="nav-link text-light">店舗詳細</router-link>
          </b-nav-item> -->
          <b-nav-item>
            <router-link to="/RestaurantRegistration/Registration" class="nav-link text-light">店舗追加</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/MenuRegistration/21" class="nav-link text-light">メニュー追加</router-link>
          </b-nav-item>
          <!-- <b-nav-item>
            <router-link to="/RestaurantList" class="nav-link text-light">現在地から探す</router-link>
          </b-nav-item> -->
          <b-nav-item>
            <router-link to="/SearchMap" class="nav-link text-light">マップから検索</router-link>
          </b-nav-item>
          <!-- <b-nav-item>
            <router-link to="/Login" class="nav-link text-light">ログイン</router-link>
          </b-nav-item>-->
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <!-- <b-navbar-nav class="ml-auto"></b-navbar-nav> -->
      </b-collapse>
    </b-navbar>
  </header>
</template>

<style src="../assets/css/site.css"></style>

<script>
export default {};
</script>

<style scoped>
.header {
  background-color: #2e603b;
  border: 1px solid black;
}
</style>