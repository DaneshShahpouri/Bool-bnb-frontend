<script>
import axios from 'axios';
import { store } from '../store.js';
import AppSearch from '../components/AppSearch.vue';
import ApartmentCard from '../components/ApartmentCard.vue';

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
                    console.log(response.data)
                    //console.log('siamo nella results')
                    this.store.apartments = []
                    let tempapartments = Object.values(response.data.results)
                    //console.log(tempapartments)
                    tempapartments.forEach(apartment => {
                        this.store.apartments.push(JSON.parse(JSON.stringify(apartment)))
                        // this.store.userName = response.data.user

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

        <div class="cards-container" v-if="this.store.searchError === ''">

            <apartmentCard v-for="apartment in this.store.indexApartments" :apartment="apartment"></apartmentCard>


        </div>
        <div class="alert alert-danger container" role="alert" v-else>
            {{ this.store.searchError }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
.cards-container {
    display: flex;
    flex-flow: row wrap;
    gap: 50px;

    margin: 0 auto;
    padding-bottom: 50px;

    width: 90%;
}
</style>