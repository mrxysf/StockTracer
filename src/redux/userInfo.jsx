import { createStore } from "anew";

export default createStore({
  name: "userInfo",

  state: {
    userID: "",
    userName: "",
    userItems: { hello: 123 },
    numItems: 0
  },

  reducers: {
    setUserID(state, user) {
      return {
        userID: user
      };
    },
    setUserName(state, name) {
      return {
        userName: name
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
    getNumItems: store => store.create(state => state.numItems),
    getUserName: store => store.create(state => state.userName)
  }
});
