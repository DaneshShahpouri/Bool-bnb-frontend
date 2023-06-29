<script>
import axios from 'axios';
import { store } from '../store.js';
import AppSearch from '../components/AppSearch.vue';
import ApartmentCard from '../components/ApartmentCard.vue';
import SponsoredCard from '../components/SponsoredCard.vue';
import AppFooter from '../components/AppFooter.vue';

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
        AppFooter,
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

            if (screen.width <= 768) {
                left.scrollBy(-323, 0);
            } else {
                left.scrollBy(-1200, 0);
            }
        },

        scrollRight(id) {
            let right = document.querySelector(id);
            if (screen.width <= 768) {
                right.scrollBy(323, 0);
            } else {
                right.scrollBy(1200, 0);
            }
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


    <!-- Error e loader -->
    <div class="loading w-100 h-100 d-flex justify-content-center align-items-center my-5"
        v-if="this.store.searchError === '' && this.store.indexApartments.length == 0">
        <div class="spinner-border text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <span>{{ this.store.searchError }}</span>
    </div>
    <div class="result" v-else>

        <div class="wrapper" v-if="this.store.searchError === ''">
            <div class="sponsor-container" v-if="this.store.indexApartmentsSponsor.length > 0">
                <div class="title">Featured <i class="fa-solid fa-rocket icon"></i></div>
                <div class="slider">
                    <!-- Sfondo gradiente -->
                    <!-- <div class="_gradient-background left"></div>
                    <div class="_gradient-background right"></div> -->

                    <div @click="scrollLeft('#sponsored-apartments')" class="slider-btn btn-left">
                        <i class="fa-solid fa-chevron-left"></i>
                    </div>
                    <div @click="scrollRight('#sponsored-apartments')" class="slider-btn btn-right">
                        <i class="fa-solid fa-chevron-right"></i>
                    </div>
                    <div id="sponsored-apartments" class="inner-container">
                        <sponsoredCard v-for="apartment in this.store.indexApartmentsSponsor" :apartment="apartment">
                        </sponsoredCard>
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

                <a class="foot-btn">
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

    <AppFooter class="_appfooter"></AppFooter>
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

            // Grandiete background-color
            ._gradient-background {
                position: absolute;
                top: 0px;
                z-index: 4;
                height: 100%;
                width: 100px;
                background-color: green;

                &.left {
                    left: 0px;
                    background: rgb(252, 252, 252);
                    background: linear-gradient(90deg, rgba(252, 252, 252, 1) 30%, rgba(0, 0, 0, 0) 80%);

                }

                &.right {
                    right: 0px;
                    background: rgb(252, 252, 252);
                    background: linear-gradient(90deg, rgba(252, 252, 252, 0) 20%, rgb(255, 255, 255) 70%);
                }
            }

            // Grandiete background-color


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

                cursor: pointer;

                @media screen and (max-width: $mobile) {
                    top: 160px;

                    height: 20%;
                    width: 30px;
                }

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

            @media screen and (max-width: $mobile) {
                padding: 40px 18px;
            }


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

    .footbar-mobile {
        display: none;

        z-index: 8;

        //display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        gap: 40px;

        width: 100%;
        height: 60px;
        background-color: rgba(0, 0, 0, 0.738);

        border-radius: 30% 30% 0 0;

        .foot-btn {
            padding: 0 10px;
            width: calc(100% / 3 - 40px - 40px / 4 * 3);

            color: white;

            text-align: center;
            font-size: 1.4em;

            .icon {
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

._appfooter {
    margin: auto;

    @media screen and (max-width: $mobile) {
        margin-bottom: 2em;
    }
}
</style>