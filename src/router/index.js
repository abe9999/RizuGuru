import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home/Home.vue";
import About from "../views/Home/About.vue";
import Login from "../views/Home/Login.vue";
import RestaurantList from "../views/RestaurantList/RestaurantList.vue";
import Filtering from "../views/RestaurantList/Filtering.vue";
import RestaurantDetail from "../views/RestaurantDetail/RestaurantDetail.vue";
import SearchMap from "../views/SearchMap/SearchMap.vue";
import RestaurantRegistration from "../views/RestaurantRegistration/RestaurantRegistration.vue";
import AddressToCoord from "../views/AddressToCoord.vue";
import DistanceFromStation from "../views/DistanceFromStation.vue";
import HomeTest from "../views/Home/HomeTest.vue";
import MenuRegistration from "../views/MenuRegistration/MenuRegistration.vue";

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
    path: "/Restaurant/Detail/:id",
    component: RestaurantDetail,
  },
  {
    path: "/SearchMap",
    component: SearchMap,
  },
  {
    path: "/Restaurant/Registration",
    component: RestaurantRegistration,
  },
  {
    path: "/RestaurantList/Filtering",
    component: Filtering,
  },
  {
    path: "/AddressToCoord",
    component: AddressToCoord,
  },
  {
    path: "/DistanceFromStation",
    component: DistanceFromStation,
  },
  {
    path: "/HomeTest",
    component: HomeTest,
  },
  {
    path: "/Menu/Registration/:id",
    component: MenuRegistration
  }
];

const router = new VueRouter({
  routes,
});

export default router;
