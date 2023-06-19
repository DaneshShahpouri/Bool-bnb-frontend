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
            apartment: [],
        }
    },

    components: {
        AppMessageForm,
        Map,
    },

    methods: {
        getApartment() {
            axios.get(this.store.apiPath + 'apartments/' + this.$route.params.slug).then(response => {
                this.apartment = response.data.results
                //console.log(response.data.results)
                this.store.message_apartment_id = response.data.results.id;
                //console.log(this.store.message_apartment_id)
            })
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
                            :src="(apartment.cover_image != null && (apartment.cover_image.slice(apartment.cover_image.length - 3, apartment.cover_image.length) == 'png' || apartment.cover_image.slice(apartment.cover_image.length - 3, apartment.cover_image.length) == 'jpg') ? (this.store.urlImg + apartment.cover_image) : 'https://www.kuleuven.be/communicatie/congresbureau/fotos-en-afbeeldingen/no-image.png/image')"
                            alt="Card image cap">
                    </div>
                    <div class="card-body">
                        <h3>{{ apartment.name }}</h3>
                        <p class="card-text">{{ apartment.description }}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"> Rooms: <strong>{{ apartment.rooms_number }}</strong></li>
                        <li class="list-group-item"> Beds: <strong>{{ apartment.beds_number }}</strong></li>
                        <li class="list-group-item"> Bathrooms: <strong>{{ apartment.bathrooms_number }}</strong></li>
                    </ul>
                </div>
    
                <div class="d-flex justify-content-center my-5">
                    <router-link :to="{ name: 'home' }" class="btn btn-outline-primary">See Others</router-link>
                </div>
    
            </div>
            <AppMessageForm></AppMessageForm>
            
        </div>
    
        <Map class=""></Map>
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