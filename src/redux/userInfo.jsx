import { createStore } from "anew";

export default createStore({
  name: "userInfo",

  state: {
    userID: "",
    userItems: { hello: 123 },
    numItems: 0
  },

  reducers: {
    setUserID(state, user) {
      return {
        userID: user
      };
    },
    setUserItems(state, itemList) {
      return {
        userItems: itemList
      };
    },
    setNumItems(state, number) {
      return {
        numItems: number
      };
    }
  },

  selectors: {
    getUserID: store => store.create(state => state.userID),
    getUserItems: store => store.create(state => state.userItems),
    getNumItems: store => store.create(state => state.numItems)
  }
});
