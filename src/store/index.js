import { createStore } from "vuex";

export default createStore({
  state: {
    goods: [
      {
        id: 0,
        name: "Мужские Кроссовки Nike Blazer Mid Suede",
        price: 12999,
        imgURL: "./img/sneaker-1.jpg",
      },
      {
        id: 1,
        name: "Мужские Кроссовки Nike Air Max 270",
        price: 13001,
        imgURL: "./img/sneaker-2.jpg",
      },
      {
        id: 2,
        name: "Мужские Кроссовки Nike Blazer Mid Suede",
        price: 8499,
        imgURL: "./img/sneaker-3.jpg",
      },
      {
        id: 3,
        name: "Кроссовки Puma X Aka Boku Future Rider",
        price: 8999,
        imgURL: "./img/sneaker-4.jpg",
      },
    ],
    cart: [],
    favorites: [
      {
        id: 0,
        name: "Мужские Кроссовки Nike Blazer Mid Suede",
        price: 12999,
        imgURL: "./img/sneaker-1.jpg",
      },
      {
        id: 1,
        name: "Мужские Кроссовки Nike Air Max 270",
        price: 13001,
        imgURL: "./img/sneaker-2.jpg",
      },
    ],
    showDrawer: false,
  },
  getters: {
    getCartLength(state) {
      return state.cart.length;
    },
    isCartAdded: (state) => (id) => {
      return state
      .cart
      .some((item) => item.id === id);
    },
    getTotalPrice(state) {
      return state
      .cart
      .reduce((a,b) => a + b.price, 0)
    }
  },
  mutations: {
    addCart(state, goodsItem) {
      state.cart.push(goodsItem);
    },
    deleteCartItems(state, id) {
      state.cart = state.cart.filter((item) => item.id !== id);
    },
    changeDrawer(state, boolean) {
      state.showDrawer = boolean;
    },
  },
  actions: {},
  modules: {},
});
