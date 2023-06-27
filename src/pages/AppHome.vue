<script>
import axios from 'axios';
import { store } from '../store.js';
import AppSearch from '../components/AppSearch.vue';
import ApartmentCard from '../components/ApartmentCard.vue';
import SponsoredCard from '../components/SponsoredCard.vue';

export default {
    name: 'AppHome',
    data() {
        return {
            store,
            //formricerca
            radius: 20,

        }
    },

    components: {
        AppSearch,
        ApartmentCard,
        SponsoredCard,
    },

    methods: {
        getApartments() {
            if (this.store.searchInputName != '') {
                axios.get('http://127.0.0.1:8000/api/apartments/' + this.store.searchInputName).then(response => {
                    //console.log(response)
                    this.store.apartments = []
                    response.data.results.forEach(apartment => {
                        this.store.apartments.push(JSON.parse(JSON.stringify(apartment)))
                        // this.store.userName = response.data.user
                    });

                    this.setApartments()
                })
            } else {
                axios.get(this.store.apiPath + 'apartments').then(response => {

                    response.data.sponsorRes?.forEach(apartment => {
                        this.store.indexApartmentsSponsor.push(JSON.parse(JSON.stringify(apartment)))
                        // this.store.userName = response.data.user

                    });
                    //console.log(this.store.indexApartmentsSponsor)
                    //console.log('siamo nella results')
                    this.store.apartments = []
                    let tempapartments = Object.values(response.data.results)
                    //console.log(tempapartments)
                    tempapartments.forEach(apartment => {
                        this.store.apartments.push(JSON.parse(JSON.stringify(apartment)))
                        // this.store.userName = response.data.user
                        this.isSearching = false;

                    });
                    this.setApartments()
                })
            }
        },

        setApartments() {
            this.store.indexApartments = []
            this.store.apartments.forEach(apartment => {
                this.store.indexApartments.push(JSON.parse(JSON.stringify(apartment)))

            })

        },

        scrollLeft(id) {
            let left = document.querySelector(id);

            left.scrollBy(-1400, 0);

            console.log(event)
        },

        scrollRight(id) {
            let right = document.querySelector(id);

            right.scrollBy(1400, 0);
        },


    },

    created() {
        this.getApartments();
        this.setApartments();


    }

}
</script>

<template>
    <AppSearch></AppSearch>

    <!-- <div class="container align-items-stretch mt-5" id="AppHome" v-if="this.store.searchError === ''">
        <div class="card _card" v-for="apartment in  this.store.indexApartments ">
            <div class="img-wrapper">
                <img class="card-img-top"
                    :src="(apartment.cover_image != null && (apartment.cover_image.slice(apartment.cover_image.length - 3, apartment.cover_image.length) == 'png' || apartment.cover_image.slice(apartment.cover_image.length - 3, apartment.cover_image.length) == 'jpg' || apartment.cover_image.slice(apartment.cover_image.length - 3, apartment.cover_image.length) == 'ebp' || apartment.cover_image.slice(apartment.cover_image.length - 3, apartment.cover_image.length) == 'peg') ? (this.store.urlImg + apartment.cover_image) : 'https://www.kuleuven.be/communicatie/congresbureau/fotos-en-afbeeldingen/no-image.png/image')"
                    alt="Card image cap">
            </div>
            <h5 class="card-title">{{ apartment.name.length > 25 ? apartment.name.substring(0, 25) + '...' :
                apartment.name }}</h5>
            <span class="address"> {{ apartment.address }}</span>
            <div class="card-body d-flex flex-column justify-content-between">
                <p class="card-text">{{ apartment.description.length > 50 ? apartment.description.substring(0, 50) + '...' :
                    apartment.description }}</p>
                <router-link :to="{ name: 'apartments/show', params: { slug: apartment.slug } }"
                    class="btn btn-outline-primary">See Details</router-link>
            </div>
        </div>
    </div>
    <div class="alert alert-danger container" role="alert" v-else>
        {{ this.store.searchError }}
    </div> -->

    <div class="loading w-100 h-100 d-flex justify-content-center align-items-center"
        v-if="this.store.searchError === '' && this.store.indexApartments.length == 0">
        <div class="spinner-border text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <span>{{ this.store.searchError }}</span>
    </div>
    <div class="result" v-else>

        <div class="wrapper" v-if="this.store.searchError === ''">
            <div class="sponsor-container" v-show="this.store.isSearching == false">
                <div class="title">Featured <i class="fa-solid fa-rocket icon"></i></div>
                <div class="slider">

                    <div @click="scrollLeft('#sponsored-apartments')" class="slider-btn btn-left">
                        <i class="fa-solid fa-chevron-left"></i>
                    </div>
                    <div @click="scrollRight('#sponsored-apartments')" class="slider-btn btn-right">
                        <i class="fa-solid fa-chevron-right"></i>
                    </div>
                    <div id="sponsored-apartments" class="inner-container">
                        <sponsoredCard v-for="apartment in this.store.indexApartmentsSponsor" :apartment="apartment"></sponsoredCard>
                    </div>

                </div>
            </div>

            <div class="_title">All <i class="fa-solid fa-earth-americas icon"></i></div>

            <div class="cards-container">
                <apartmentCard v-for="apartment in this.store.indexApartments" :apartment="apartment"></apartmentCard>
            </div>
            <div class="footbar-mobile">
                <a class="foot-btn" href="http://localhost:5173/">
                    <i class="fa-solid fa-house"></i>
                </a>
                
                <a class="foot-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                    <i class="fa-brands fa-airbnb icon"></i>
                </a>

                <a class="foot-btn" href="http://127.0.0.1:8000/login">  
                    <i class="fa-solid fa-user-shield"></i>
                </a>
            </div>      
        </div>
        <div class="alert alert-danger container" role="alert" v-else>
            {{ this.store.searchError }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../scss/_variables';
.wrapper {
    display: flex;
    flex-direction: column;

    .sponsor-container {

        margin-bottom: 30px;

        .title {
            margin-left: 100px;

            font-size: 2em;
            font-weight: bold;

            @media screen and (max-width: $mobile) {
                margin-left: 0;
                
                text-align: center;
            }

            .icon {
                color: rgb(255, 90, 95);
            }
        }

        .slider {
            position: relative;

            .slider-btn {
                position: absolute;
                top: 40px;

                display: flex;
                justify-content: center;
                align-items: center;

                z-index: 5;

                height: 65.3%;
                width: 50px;

                font-size: 1.8em;

                background-color: rgba($color: #000000, $alpha: 0.2);

                color: white;

                // border-radius: 20px;

                cursor: pointer;

                &.btn-left {
                    left: 0px;

                    border-radius: 0 20px 20px 0;

                    &:hover {
                        background-color: rgba($color: #000000, $alpha: 0.5);
                        transition: all .3s ease-in-out;
                    }
                }

                &.btn-right {
                    right: 0px;

                    border-radius: 20px 0 0 20px;

                    &:hover {
                        background-color: rgba($color: #000000, $alpha: 0.5);
                        transition: all .3s ease-in-out;
                    }
                }
            }
        }

        .inner-container {
            position: relative;

            display: flex;
            flex-flow: row nowrap;
            gap: 20px;
            overflow-x: hidden;

            padding: 40px 60px 40px 60px;

            width: 100%;

            scroll-behavior: smooth;
        }

    }

    ._title {
        margin-left: 110px;
        margin-bottom: 50px;

        font-size: 2em;
        font-weight: bold;

        @media screen and (max-width: $mobile) {
            margin-left: 0;

            text-align: center;
        }
            
        .icon {
            color: rgb(255, 90, 95);
        }
    }

    .cards-container {
        display: flex;

        flex-flow: row wrap;
        gap: 50px;

        margin: 0 auto;
        margin-bottom: 80px;
        padding-bottom: 50px;

        width: 90%;
    }

    .footbar-mobile{
        display: none;

        z-index: 8;

        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        gap: 40px;

        width: 100%;
        height: 60px;
        background-color: rgba(0, 0, 0, 0.738);

        border-radius: 30% 30% 0 0;

        .foot-btn{
            padding: 0 10px;
            width: calc(100% / 3 - 40px - 40px / 4 * 3);

            color: white;

            text-align: center;
            font-size: 1.4em;

            .icon{
                font-size: 2em;
                color: rgb(255, 90, 95);
            }
        }
        
        @media screen and (max-width: $mobile) {
            position: fixed;
            bottom: 0;

            display: flex;
        }
    }
}
</style>