import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home/Home.vue";
import About from "../views/Home/About.vue";
import NotFound from "../views/Home/NotFound.vue";
import Login from "../views/Home/Login.vue";
import RestaurantList from "../views/RestaurantList/RestaurantList.vue";
import RestaurantListTest from "../views/RestaurantList/RestaurantListTest.vue";
import Filtering from "../views/RestaurantList/Filtering.vue";
import RestaurantDetail from "../views/RestaurantDetail/RestaurantDetail.vue";
import SearchMap from "../views/SearchMap/SearchMap.vue";
import RegistrationRegistration from "../views/RestaurantRegistration/Registration.vue";
import RegistrationRegistrationTest from "../views/RestaurantRegistration/RegistrationTest.vue";
import RegistrationComplete from "../views/RestaurantRegistration/Complete.vue";
import MenuRegistration from "../views/MenuRegistration/MenuRegistration.vue";
import MenuRegistrationComplete from "../views/MenuRegistration/Complete.vue";
import ImageRegistration from "../views/ImageRegistration/ImageRegistration.vue";
import ImageRegistrationComplete from "../views/ImageRegistration/Complete.vue";
import HomeTest from "../views/Home/HomeTest.vue";

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
    path: "*",
    component: NotFound,
  },
  {
    path: "/Login",
    component: Login,
  },
  {
    name: "RestaurantList",
    path: "/RestaurantList",
    component: RestaurantList,
  },
  {
    name: "RestaurantListTest",
    path: "/RestaurantListTest",
    component: RestaurantListTest,
  },
  {
    name: "Filtering",
    path: "/RestaurantList/Filtering",
    component: Filtering,
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
    path: "/RestaurantRegistration/RegistrationTest",
    component: RegistrationRegistrationTest,
  },
  {
    path: "/RestaurantRegistration/Complete",
    component: RegistrationComplete,
  },
  {
    path: "/MenuRegistration",
    component: MenuRegistration,
  },
  {
    path: "/MenuRegistration/Complete",
    component: MenuRegistrationComplete,
  },
  {
    path: "/ImageRegistration",
    component: ImageRegistration,
  },
  {
    path: "/ImageRegistration/Complete",
    component: ImageRegistrationComplete,
  },
  {
    path: "/HomeTest",
    component: HomeTest,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
