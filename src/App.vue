<template>
  <div class="wrapper">
    <header class="header">
      <div class="container">
        <div class="header__content">
          <router-link to="/">
            <img src="./assets/logo.svg" alt="logo" class="header__logo" />
          </router-link>

          <ul class="header__list">
            <li @click="$store.commit('changeDrawer', true)">
              <img src="./assets/cart.svg" alt="cart-icon" />
              <span>{{ $store.getters.getTotalPrice }} руб.</span>
            </li>
            <li>
              <router-link to="/favorites">
                <img src="./assets/favorites.svg" alt="favorites-icon" />
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <router-view />
  </div>
</template>

<script></script>

<style lang="scss">
body {
  font-family: "Inter", sans-serif;
  background: #e5e5e5;
  box-sizing: border-box;
}
h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
body {
  margin: 0;
}
ul {
  list-style: none;
  padding: 0;
}
button {
  border: none;
  cursor: pointer;
}
a {
  text-decoration: none;
}
.wrapper {
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.04);
  border-radius: 20px;

  max-width: 1080px;
  margin: 0 auto;
  margin-top: 85px;
}
.container {
  max-width: 960px;
  margin: 0 auto;
}
.header {
  padding: 43px 45px;
  border-bottom: 1px solid #eaeaea;
  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__list {
    display: flex;
    align-items: center;
    li {
      display: flex;
      align-items: center;
      margin-left: 30px;
      span {
        margin-left: 10px;
        font-weight: 600;
        font-size: 14px;
        color: #5c5c5c;
      }
    }
  }
}
</style>
