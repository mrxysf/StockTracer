import { combineStores } from "anew";
import userInfoStore from "./userInfo";
import authStore from "./authenticate";

export default (window.store = combineStores({
  name: "root",

  persist: true,

  stores: [userInfoStore, authStore]
}));
