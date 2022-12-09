<template>
  <section class="catalog">
    <div v-if="$store.state.showDrawer" class="overlay">
      <div class="drawer">
        <div class="drawer__top">
          <h2>Корзина</h2>
          <svg
            @click="$store.commit('changeDrawer', false)"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.5"
              y="0.5"
              width="31"
              height="31"
              rx="7.5"
              fill="white"
              stroke="#DBDBDB"
            />
            <path
              d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z"
              fill="#B5B5B5"
            />
          </svg>
        </div>
        <template v-if="$store.getters.getCartLength">
          <div class="drawer__content">
            <div
              v-for="cartItem in $store.state.cart"
              :key="cartItem.id"
              class="cartItem"
            >
              <img :src="cartItem.imgURL" alt="sneaker-img" />
              <div class="cartInfo">
                <h3>{{ cartItem.name }}</h3>
                <span>{{ cartItem.price }} руб.</span>
              </div>
              <svg
                @click="$store.commit('deleteCartItems', cartItem.id)"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="31"
                  height="31"
                  rx="7.5"
                  fill="white"
                  stroke="#DBDBDB"
                />
                <path
                  d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z"
                  fill="#B5B5B5"
                />
              </svg>
            </div>
          </div>
          <div class="drawer__bottom">
            <div class="total">
              <span class="total__text">Итого: </span>
              <div class="dots"></div>
              <span class="total__price">{{ $store.getters.getTotalPrice }} руб.</span>
            </div>
            <div class="total">
              <span class="total__text">Налог 5%: </span>
              <div class="dots"></div>
              <span class="total__price">{{ Math.round($store.getters.getTotalPrice * 0.05) }} руб.</span>
            </div>
            <button class="order__btn">
              Оформить заказ
              <svg
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 7H14.7143"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.71436 1L14.7144 7L8.71436 13"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </template>
        <div class="empty" v-else>
          <img src="../assets/empty.svg" alt="" />
          <h2 class="empty__title">Корзина пустая</h2>
          <p class="empty__description">
            Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
          </p>
          <button
            @click="$store.commit('changeDrawer', false)"
            class="empty__btn order__btn"
          >
            Вернуться назад
          </button>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="catalog__top">
        <h1 class="catalog__title">Все кроссовки</h1>
        <label for="search">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.25 15.25L11.8855 11.8795L15.25 15.25ZM13.75 7.375C13.75 9.06576 13.0784 10.6873 11.8828 11.8828C10.6873 13.0784 9.06576 13.75 7.375 13.75C5.68424 13.75 4.06274 13.0784 2.86719 11.8828C1.67165 10.6873 1 9.06576 1 7.375C1 5.68424 1.67165 4.06274 2.86719 2.86719C4.06274 1.67165 5.68424 1 7.375 1C9.06576 1 10.6873 1.67165 11.8828 2.86719C13.0784 4.06274 13.75 5.68424 13.75 7.375V7.375Z"
              stroke="#E4E4E4"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          <input
            @input="handleSearch"
            placeholder="Поиск..."
            type="text"
            id="search"
          />
        </label>
      </div>
      <div class="catalog__content">
        <template v-if="filteredGoods.length">
          <Card v-for="good in filteredGoods" :key="good.id" :good="good" />
        </template>
        <template v-else>
          <div
            v-for="(_, i) in [...Array(4)]"
            :key="i"
            class="skeleton-card card"
          >
            <div class="skeleton__top skeleton"></div>
            <h2 class="skeleton__name skeleton"></h2>
            <p class="skeleton__suptitle skeleton"></p>
            <div class="skeleton__info">
              <div class="skeleton__price skeleton"></div>
              <div class="skeleton__btn skeleton"></div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import Card from "@/components/Card.vue";
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
export default {
  components: { Card },
  setup() {
    const store = useStore();
    const cart = store.state.cart;
    const goods = store.state.goods;

    const filteredGoods = ref(null);
    filteredGoods.value = goods;

    const handleSearch = (e) => {
      const inputVal = e.target.value.trim().toLowerCase();

      filteredGoods.value = goods.filter((good) => {
        return good.name.toLowerCase().includes(inputVal);
      });
    };
    
    // const totalPrice = ref()

    return {
      handleSearch,
      filteredGoods,
      cart
    };
  },
};
</script>

<style lang="scss">
.catalog {
  padding-top: 40px;

  &__content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    input {
      border: none;
      font-weight: 400;
      font-size: 14px;
      color: #c4c4c4;
      outline: none;
    }
    label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #f3f3f3;
      border-radius: 10px;
      padding: 15px 18px;
      svg {
        margin-right: 13px;
      }
    }
  }
  &__title {
    font-weight: 700;
    font-size: 32px;
    color: #000000;
  }
}
.overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  z-index: 1;
}
.drawer {
  position: absolute;
  width: 385px;
  padding: 30px;
  background: #fff;
  height: 100%;
  right: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  &__top {
    display: flex;
    justify-content: space-between;

    svg {
      cursor: pointer;
    }
  }

  &__content {
    padding-top: 30px;
    flex: 1;
    overflow: auto;
  }

  .total {
    margin-top: 19px;
    display: flex;
    .dots {
      flex: 1;
      border-bottom: 2px dashed #dfdfdf;
      margin: 0 10px;
    }
    &__price {
      font-weight: 600;
      font-size: 16px;
      color: #000000;
    }
    &__text {
      font-weight: 400;
      font-size: 16px;
      color: #000000;
    }
  }

  .cartItem {
    background: #ffffff;
    border: 1px solid #f3f3f3;
    border-radius: 20px;
    padding: 30px 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    svg {
      width: 52px;
      height: 52px;
      cursor: pointer;
      opacity: 0.5;
      transition: 0.3s;

      &:hover {
        opacity: 1;
      }
    }

    img {
      width: 70px;
      height: 70px;
    }

    .cartInfo {
      margin-left: 21px;
      margin-right: 12px;
      h3 {
        font-weight: 400;
        font-size: 14px;
        color: #000000;
      }

      span {
        font-weight: 700;
        font-size: 14px;
        color: #000000;
      }
    }
  }

  .order__btn {
    margin-top: 24px;
    background: #9dd558;
    border-radius: 18px;
    width: 100%;
    padding: 18px 0;
    font-weight: 600;
    font-size: 16px;
    color: #ffffff;
    position: relative;

    svg {
      position: absolute;
      right: 33px;
      top: 20px;
      transition: 0.3s;
    }

    &:hover svg {
      right: 26px;
    }
  }
}

.empty {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  &__title {
    font-weight: 600;
    font-size: 22px;
    color: #000000;
    margin-top: 21px;
    margin-bottom: 9px;
  }

  &__description {
    font-weight: 400;
    font-size: 16px;
    color: #000000;
    opacity: 0.4;
    width: 285px;
    margin: 0 auto;
  }

  &__btn {
    margin-top: 40px;
  }
}

.skeleton {
  animation: skeleton-fade linear alternate-reverse infinite 1s;
  background: #ccc;
  border-radius: 10px;
  &__top {
    width: 100%;
    height: 91px;
  }

  &__suptitle {
    width: 93px;
    height: 15px;
    margin-top: 4px;
  }

  &__name {
    width: 100%;
    height: 15px;
    margin-top: 16px;
  }

  &__price {
    width: 80px;
    height: 24px;
  }

  &__btn {
    width: 32px;
    height: 32px;
  }

  &__info {
    margin-top: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

@keyframes skeleton-fade {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
