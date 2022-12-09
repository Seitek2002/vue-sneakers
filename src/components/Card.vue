<template>
  <div class="card">
    <div class="card__top">
      <div
        @click="liked = !liked"
        :class="liked ? 'card__liked active' : 'card__liked'"
      >
        <img src="../assets/unliked.svg" alt="unliked-icon" />
        <img src="../assets/liked.svg" alt="unliked-icon" />
      </div>
      <img class="card__sneaker" :src="good.imgURL" alt="sneaker-img" />
    </div>
    <h2 class="card__name">{{ good.name }}</h2>
    <div class="card__info">
      <div class="card__price">
        <p>Цена:</p>
        {{ good.price }} руб.
      </div>
      <div
        :class="
          $store.getters.isCartAdded(good.id)
            ? 'card__added active'
            : 'card__added'
        "
      >
        <img @click="addCart(good)" src="../assets/add.svg" alt="add-icon" />
        <img
          @click="deleteCartItem(good.id)"
          src="../assets/added.svg"
          alt="add-icon"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
export default {
  props: ["good"],
  setup() {
    const store = useStore();
    const liked = ref(false);
    const added = ref(false);

    const addCart = (item) => {
      store.commit("addCart", item);
      added.value = true;
    };

    const deleteCartItem = (id) => {
      store.commit("deleteCartItems", id);
      added.value = false;
    };

    return {
      liked,
      added,
      addCart,
      deleteCartItem,
    };
  },
};
</script>

<style lang="scss">
.card {
  margin: 40px 0;
  width: 210px;
  background: #ffffff;
  border: 1px solid #f3f3f3;
  border-radius: 40px;
  padding: 20px 25px 30px 30px;
  box-sizing: border-box;
  transition: 0.3s;

  &__added {
    overflow: hidden;
    height: 32px;
    width: 32px;

    img {
      transition: 0.3s;
    }

    &.active img {
      transform: translateY(-36px);
    }
  }

  &__liked {
    cursor: pointer;
    overflow: hidden;
    height: 32px;
    width: 32px;

    img {
      transition: 0.3s;
    }

    &.active img {
      transform: translateY(-36px);
    }
  }

  &:hover {
    border: 1px solid #f8f8f8;
    box-shadow: 0px 14px 30px rgba(0, 0, 0, 0.05);
  }

  &__sneaker {
    max-width: 100%;
  }
  &__name {
    font-weight: 400;
    font-size: 14px;
    color: #000000;
    margin: 14px 0;
  }
  &__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      cursor: pointer;
    }
  }
  &__price {
    font-weight: 700;
    font-size: 14px;
    color: #000000;
    p {
      font-weight: 500;
      font-size: 11px;
      text-transform: uppercase;
      color: #bdbdbd;
    }
  }
  &__top {
    position: relative;
  }
  &__liked {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
