<script>
import { store } from '../store.js';

export default {
  name: 'AppHome',
  data() {
    return {
      store,

      viewBtn: false,
    }
  },

  props: {

    apartment: Object,
  },

}
</script>
<template>
    <router-link :to="{ name: 'apartments/show', params: { slug: apartment.slug } }" class="_card">
        <div  @mouseover="viewBtn = true" @mouseleave="viewBtn = false">
          <img :src="(apartment.cover_image != null && (apartment.cover_image.slice(apartment.cover_image.length - 3, apartment.cover_image.length) == 'png' || apartment.cover_image.slice(apartment.cover_image.length - 3, apartment.cover_image.length) == 'jpg' || apartment.cover_image.slice(apartment.cover_image.length - 3, apartment.cover_image.length) == 'ebp' || apartment.cover_image.slice(apartment.cover_image.length - 3, apartment.cover_image.length) == 'peg') ? (this.store.urlImg + apartment.cover_image) : 'https://www.svaghiamo.it/wp-content/uploads/2016/09/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png')" alt="apartment-image">
          <div class="_card-body">
            <h5 class="name">{{ apartment.name }}</h5>
            <div class="address">{{ apartment.address }}</div>
            <div class="price"> <strong>154&euro;</strong> notte</div>
    
            <div class="like">
                <i class="fa-regular fa-heart"></i>
            </div>
          </div>
        </div>
    </router-link>
</template>

<style lang="scss" scoped>
._card {
  width: calc(100% / 3 - 50px / 4 * 3);
  height: 400px;

  text-decoration: none;

  color: unset;

  transition: all .2s ease-in-out;

  img{
      width: 100%;
      height: 320px;

      border-radius: 20px;

      object-fit: cover;

      
  }

  ._card-body {
    position: relative;

    padding: 8px;

    height: 25%;

    .name {
      font-size: 1.2em;

      margin-bottom: 0px;
    }

    .address {
      padding-bottom: 12px;

      font-size: 0.9em;
      color: #717171;
    }

    .price {

      font-size: 1.2em;
    }

    .like {
      position: absolute;
      top: 10px;
      right: 20px;

      font-size: 1.4em;
    }

  }

  &:hover {
    transform: scale(1.035);

    z-index: 3;
  }
}

</style>