import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home/Home.vue";
import About from "../views/Home/About.vue";
import Login from "../views/Home/Login.vue";
import RestaurantList from "../views/RestaurantList/RestaurantList.vue";
import Filtering from "../views/RestaurantList/Filtering.vue";
import RestaurantDetail from "../views/RestaurantDetail/RestaurantDetail.vue";
import SearchMap from "../views/SearchMap/SearchMap.vue";
import RegistrationRegistration from "../views/RestaurantRegistration/Registration.vue";
import RegistrationComplete from "../views/RestaurantRegistration/Complete.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/Login",
    component: Login,
  },
  {
    path: "/RestaurantList",
    component: RestaurantList,
  },
  {
    path: "/RestaurantList/CurrentLocation",
    component: RestaurantList,
  },
  {
    path: "/RestaurantList/Search/",
    component: RestaurantList,
  },
  {
    path: "/Restaurant/Detail/:id",
    component: RestaurantDetail,
  },
  {
    path: "/SearchMap",
    component: SearchMap,
  },
  {
    path: "/RestaurantRegistration/Registration",
    component: RegistrationRegistration,
  },
  {
    path: "/RestaurantRegistration/Complete",
    component: RegistrationComplete,
  },
  {
    path: "/RestaurantList/Filtering",
    component: Filtering,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
