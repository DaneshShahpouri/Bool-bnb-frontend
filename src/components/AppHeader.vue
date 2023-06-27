<script>
import axios from 'axios';
import { store } from '../store.js';

export default {
  name: 'AppHeader',
  data() {
    return {
      store,
    }
  },


}

</script>

<template>
  <nav id="navbar" class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
    <div class="container">
      <a class="navbar-brand d-flex align-items-center" href="http://localhost:5173/">
        
        <div class="logo">
          <img src="../../public/img/boolbnb-logo.png" alt="">
        </div>
        <div class="logo-mobile">
          <img src="../../public/img/boolbnb-logo.png" alt="">
        </div>
        
      </a>

      <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="">
        <span class="navbar-toggler-icon"></span>
      </button> -->

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- Left Side Of Navbar -->
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <a class="nav-link" href="http://localhost:5173/">Home</a>
          </li>
          <!-- <li class="nav-item">
            <a class="nav-link" href="#">Apartments</a>
          </li> -->
        </ul>

        <!-- Right Side Of Navbar -->
        <ul class="navbar-nav ml-auto">
          <!-- Authentication Links -->
          <!-- @guest -->
          <li class="nav-item" v-if="this.store.userName == ''">
            <a class="nav-link" href="http://127.0.0.1:8000/login">
              <button class="btn _btn">
                <i class="fa-solid fa-feather-pointed icon me-1"></i>Admin
              </button>
            </a>
          </li>
          
          <li class="nav-item dropdown" v-else>
            <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false"
              v-if="this.store.userName != '' || this.store.userName != null">{{
                this.store.userName }}</a>

            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown" v-else>
              <a class="dropdown-item" href="">Dashboard</a>
              <a class="dropdown-item" href="">Logout</a>

              <form id="logout-form" action="" method="POST" class="d-none">

              </form>
            </div>
          </li>

        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import '../scss/_variables';

#navbar {

  ._btn{
    border: 2px solid rgb(255, 90, 95);

    font-weight: bold;

    .icon{
      color: rgb(255, 90, 95);
    }
    &:hover{
      background-color: rgb(255, 90, 95);

      color: white;

      &:hover .icon{
        color: white;
      }
    }
  }


  .container{

    @media screen and (max-width: $mobile) {
        display: flex;
        justify-content: center;
      }


    .logo {
      width: 150px;
  
      @media screen and (max-width: $mobile) {
        display: none;
      }
  
      img {
        width: 100%;
      }
    }
  
    .logo-mobile{
      display: none;
  
      width: 150px;
  
  
  
      @media screen and (max-width: $mobile) {
        display: block;
      }
  
      img {
        width: 100%;
      }
    }
  }
}

</style>
