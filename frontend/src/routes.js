// @material-ui/icons
// core components/views for Admin layout
import WardrobePage from "views/Wardrobe/Wardrobe.js";
import OOTD from "views/OOTD/OOTD.js";
import Store from "views/Store/Store.js";
import FamilyWardrobe from "views/FamilyWardrobe/FamilyWardrobe.js";
import LocalStore from "views/LocalStore/LocalStore.js";
import MyDashboard from "views/Dashboard/MyDashboard.js";

import { AddShoppingCart, Dashboard, Group, HowToReg, Kitchen, LocalGroceryStore } from "@material-ui/icons";
import UserProfile from "views/UserProfile/UserProfile";

const dashboardRoutes = [
  {
    path: "/wardrobe",
    name: "Wardrobe",
    icon: Kitchen,
    component: WardrobePage,
    layout: "/admin",
  },
  {
    path: "/ootd",
    name: "OOTD - Outfit Of The Day",
    icon: HowToReg,
    component: OOTD,
    layout: "/admin",
  },
  {
    path: "/store",
    name: "Store",
    icon: AddShoppingCart,
    component: Store,
    layout: "/admin",
  },
  {
    path: "/familywardrobe",
    name: "Family Wardrobe",
    icon: Group,
    component: FamilyWardrobe,
    layout: "/admin",
  },
  {
    path: "/localstore",
    name: "Local Store  ",
    icon: LocalGroceryStore,
    component: LocalStore,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    invisible: true,
    component: MyDashboard,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "Profile",
    invisible: true,
    component: UserProfile,
    layout: "/admin",
  },
];

export default dashboardRoutes;
