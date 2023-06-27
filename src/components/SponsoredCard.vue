<script>
import { store } from '../store.js';

export default {
  name: 'AppHome',
  data() {
    return {
      store,

    }
  },

  props: {

    apartment: Object,
  },

}
</script>
<template>
  <router-link :to="{ name: 'apartments/show', params: { slug: apartment.slug } }" class="_card">
    <div @mouseover="viewBtn = true" @mouseleave="viewBtn = false">
      <img
        :src="(apartment.cover_image != null && (apartment.cover_image.slice(apartment.cover_image.length - 3, apartment.cover_image.length) == 'png' || apartment.cover_image.slice(apartment.cover_image.length - 3, apartment.cover_image.length) == 'jpg' || apartment.cover_image.slice(apartment.cover_image.length - 3, apartment.cover_image.length) == 'ebp' || apartment.cover_image.slice(apartment.cover_image.length - 3, apartment.cover_image.length) == 'peg') ? (this.store.urlImg + apartment.cover_image) : 'https://www.svaghiamo.it/wp-content/uploads/2016/09/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png')"
        alt="apartment-image">
      <div class="_card-body">
        <div class="_sponsorship" v-if="apartment.sponsorships.length > 0"><i class="fa-solid fa-medal"></i></div>
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

@import '../scss/_variables';

._card {
  position: relative;

  width: calc(100% / 4 - 50px / 5 * 4);
  height: 410px;

  flex-shrink: 0;

  text-decoration: none;

  color: unset;

  transition: all .2s ease-in-out;

  @media screen and (max-width: $pd) {
    
    width: calc(100% / 3 - 50px / 4 * 3);
  }

  @media screen and (max-width: $mid) {
    
    width: calc(100% / 2 - 50px / 3 * 2);
  }


  @media screen and (max-width: $tablet) {

    width: calc(100% / 2 - 50px / 3 * 2);
  }

  @media screen and (max-width: $mobile) {

    width: calc(100% - 50px / 2);
    
  }

  img {
    width: 100%;
    height: 320px;

    border-radius: 20px;

    object-fit: cover;
  }

  ._card-body {
    padding: 8px;

    height: 25%;

    //Medaglietta Sponsorship
    ._sponsorship {
      position: absolute;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      top: 280px;
      left: 10px;
      color: rgb(239, 110, 5);
      background-color: white;

      i {
        margin-left: .18em;
      }
    }

    .name {
      font-size: 1.2em;

      margin-bottom: 0px;

      padding-bottom: 4px;
    }

    .address {
      padding-bottom: 12px;

      font-size: 0.9em;
      color: #717171;
    }

    .price {

      font-size: 1.1em;
    }

    .like {
      position: absolute;
      top: 320px;
      right: 20px;

      font-size: 1.4em;

      @media screen and (max-width: $pd) {
        top: 10px;
      }
    
      @media screen and (max-width: $mid) {
        
        
      }
    
    
      @media screen and (max-width: $tablet) {
    
        
      }
    
      @media screen and (max-width: $mobile) {
        
      }
    }

  }

  &:hover {
    transform: scale(1.035);

    z-index: 3;
  }
}
</style>