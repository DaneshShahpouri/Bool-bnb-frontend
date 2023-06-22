<script>
import axios from 'axios';
import { store } from '../store.js';
import AppMessageForm from '../components/AppMessageForm.vue';
import Map from '../components/Map.vue';

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

        <div class="container d-flex align-items-start">
            <div class="mainSide m-5">

                <div class="card">
                    <div class="img-wrapper">
                        <img class="card-img-top"
                            :src="(apartment.cover_image != null && (apartment.cover_image.slice(apartment.cover_image.length - 3, apartment.cover_image.length) == 'png' || apartment.cover_image.slice(apartment.cover_image.length - 3, apartment.cover_image.length) == 'jpg' || apartment.cover_image.slice(apartment.cover_image.length - 3, apartment.cover_image.length) == 'ebp' || apartment.cover_image.slice(apartment.cover_image.length - 3, apartment.cover_image.length) == 'peg') ? (this.store.urlImg + apartment.cover_image) : 'https://www.kuleuven.be/communicatie/congresbureau/fotos-en-afbeeldingen/no-image.png/image')"
                            alt="Card image cap">
                    </div>
                    <div class="card-body">
                        <h3>{{ apartment.name }}</h3>
                        <p class="card-text">{{ apartment.description }}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"> Address: <strong>{{ apartment.address }}</strong></li>
                        <li class="list-group-item"> Rooms: <strong>{{ apartment.rooms_number }}</strong></li>
                        <li class="list-group-item"> Beds: <strong>{{ apartment.beds_number }}</strong></li>
                        <li class="list-group-item"> Bathrooms: <strong>{{ apartment.bathrooms_number }}</strong></li>
                        <li class="list-group-item"> Area (sqm): <strong>{{ apartment.sqm }}</strong></li>
                        <li class="list-group-item d-flex gap-4 flex-wrap"> Amenities:
                            <div v-for="service in apartment.services"
                                class="d-flex justify-content-center align-items-center gap-2 flex-nowrap">
                                <span>{{ service.name }}</span>
                                <span v-html="service.icon"></span>
                            </div>
                        </li>
                        <div></div>
                    </ul>
                </div>

                <div class="d-flex justify-content-center my-5">
                    <router-link :to="{ name: 'home' }" class="btn btn-outline-primary">See Others</router-link>
                </div>

            </div>
            <AppMessageForm></AppMessageForm>

        </div>

        <div class="container" style="height: 500px;">
            <div id="map" style="width: 100% ; height: 100%; "></div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.mainSide {
    width: 70%;

    .img-wrapper {
        height: 400px;
        width: 100%;
        overflow: hidden;

        img {
            height: 100%;
            object-fit: cover;
        }
    }
}
</style>