import { createStore } from "anew";

export default createStore({
  name: "authenticate",

  state: {
    isAuth: false
  },

  reducers: {
    authenticated() {
      return {
        isAuth: true
      };
    }
  },

  selectors: {
    getAuth: store => store.create(state => state.isAuth)
  }
});
