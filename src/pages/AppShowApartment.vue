<script>
import axios from 'axios';
import { store } from '../store.js';
import AppMessageForm from '../components/AppMessageForm.vue';
import Map from '../components/Map.vue';
import AppFooter from '../components/AppFooter.vue';

export default {
    name: 'AppShowApartment',
    data() {
        return {
            store,
            apartment: {},

        }
    },

    components: {
        AppMessageForm,
        AppFooter,

    },

    methods: {
        getApartment() {
            axios.get(this.store.apiPath + 'apartments-show/' + this.$route.params.slug).then(response => {
                this.apartment = response.data.results
                console.log(this.apartment)


                this.store.message_apartment_id = response.data.results.id;


                this.MapCreation()
            })
        },


        MapCreation() {

            var center = [parseFloat(this.apartment.longitude), parseFloat(this.apartment.latitude)]
            //Creazione mappa 
            var map = tt.map({


                //Parametri mappa   
                key: "8AyhtFuGo44d57QodNOzeOGIsIaJsEq5",
                container: "map",
                center: center,
                zoom: 15,
                language: 'IT',
            })

            //Creazione puntatore sulla mappa
            const marker = new tt.Marker()

                //Settaggio puntatore mappa con coordinate uguali alle coordinate dell'appartamento visualizzato
                .setLngLat([this.apartment.longitude, this.apartment.latitude])
            marker.addTo(map);

            //popup al click sul puntatore che permette di visualizzare alcune specifiche dell'appartamento
            marker.setPopup(new tt.Popup().setHTML(`<h6 class="p-3"><i class="fa-solid fa-house"></i> ${this.apartment.name}</h6><p><i class="fa-solid fa-location-dot"></i> ${this.apartment.address}</p>`));
        },


    },



    mounted() {
        this.getApartment()

    },

}
</script>

<template>
    <div class="d-flex flex-column justify-content-center align-items-center">

        <!-- <div class="container d-flex align-items-start"> -->
        <div class="container d-sm-flex">
            <div class="mainSide">

                <div class="card _card">
                    <div class="img-wrapper">
                        <img class="card-img-top"
                            :src="(apartment.cover_image != null && (apartment.cover_image.slice(apartment.cover_image.length - 3, apartment.cover_image.length) == 'png' || apartment.cover_image.slice(apartment.cover_image.length - 3, apartment.cover_image.length) == 'jpg' || apartment.cover_image.slice(apartment.cover_image.length - 3, apartment.cover_image.length) == 'ebp' || apartment.cover_image.slice(apartment.cover_image.length - 3, apartment.cover_image.length) == 'peg') ? (this.store.urlImg + apartment.cover_image) : 'https://www.kuleuven.be/communicatie/congresbureau/fotos-en-afbeeldingen/no-image.png/image')"
                            alt="Card image cap">
                    </div>
                    <div class="card-body">
                        <h3>{{ apartment.name }}</h3>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"> <i class="fa-solid fa-door-closed"></i> Rooms: <strong>{{
                            apartment.rooms_number }}</strong></li>
                        <li class="list-group-item"> <i class="fa-solid fa-bed"></i> Beds: <strong>{{ apartment.beds_number
                        }}</strong></li>
                        <li class="list-group-item"> <i class="fa-solid fa-bath"></i> Bathrooms: <strong>{{
                            apartment.bathrooms_number }}</strong></li>
                        <li class="list-group-item"> Area (sqm): <strong>{{ apartment.sqm }}</strong></li>
                    </ul>
                </div>

                <div class="title">Description</div>

                <p class="desc margin">{{ apartment.description }}</p>

                <hr class="margin">

                <div class="title">What you'll find</div>

                <div class="amenities-container">

                    <div v-for="service in apartment.services" class="inner-container">
                        <span class="icon" v-html="service.icon"></span>
                        <span class="am-name">{{ service.name }}</span>
                    </div>

                </div>

                
            </div>
            
            <AppMessageForm></AppMessageForm>
        </div>
        
        <div class="address-container">
            <!-- <hr class="margin last"> -->
            <hr class="margin last">

            <div class="address">
                <i class="fa-solid fa-location-dot icon"></i>
                <strong>{{ apartment.address }}</strong>
            </div>
        </div>

        <div class="container" style="height: 500px;">
            <div id="map" class="map" style="width: 100% ; height: 100%;"></div>
        </div>


        <div class="d-flex justify-content-center my-5">
            <router-link :to="{ name: 'home' }" class="btn _btn-see">See Others</router-link>
        </div>
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
    <AppFooter class="_appfooter"></AppFooter>
</template>

<style lang="scss" scoped>
@import '../scss/_variables';
.mainSide {
    margin-right: 70px;
    padding-top: 25px;

    width: 70%;

    @media screen and (max-width: $mobile) {
        margin: 0;

        width: 100%; 
    }

    .margin {
        margin-bottom: 40px;
    }


    ._card {
        margin-bottom: 30px;

        border-radius: 10px;
        overflow: hidden;
    }

    .img-wrapper {
        height: 400px;
        width: 100%;

        overflow: hidden;

        img {
            height: 100%;
            object-fit: cover;
        }
    }

    .title {
        margin-bottom: 40px;

        font-size: 2em;

        @media screen and (max-width: $mobile) {
            text-align: center;        
        }
    }

    .desc {
        font-size: 1.2em;

        @media screen and (max-width: $mobile) {
            padding-left: 10px;
        }       
    }

    .amenities-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        gap: 60px;

        margin-bottom: 60px;
        padding-left: 40px;

        .inner-container {
            display: flex;
            gap: 10px;
            align-items: center;

            width: 200px;

            .icon {
                font-size: 2em;
                color: #ff5f64;
            }

            .am-name {
                font-size: 1.2em;
            }
        }

    }

    
}
.address-container {
    padding: 8px;
    margin-bottom: 20px;

    .icon {
        font-size: 1.4em;
        color: #ff5f64;
    }

    .address {
        display: flex;
        align-items: center;
        gap: 10px;

        font-size: 1.3em;

        @media screen and (max-width: $mobile) {
            justify-content: center; 
            
            font-size: 1em;
        }
    }
}

.last {
    width: 1200px;

    @media screen and (max-width: $mobile) {
            width: 350px;

            margin-bottom: 60px;
        }
}

.map {
    box-shadow: 0px 10px 20px rgba($color: #000000, $alpha: 0.4);
}

._btn-see {
    padding: 8px 26px;
    border: 2px solid #ff5f64;
    border-radius: 10px;
    color: #ff5f64;

    font-weight: bold;

    &:hover {
        background-color: #ff5f64;
        color: white;
    }
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

    
    ._appfooter {
        margin: auto;
        
        @media screen and (max-width: $mobile) {
            margin-bottom: 2em;
        }
    }
</style>