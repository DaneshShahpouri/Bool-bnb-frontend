<script>
import axios from 'axios';
import { store } from '../store.js';
import AppSearch from '../components/AppSearch.vue';

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
        AppSearch
    },

    methods: {
        getApartments() {
            if (this.store.searchInput != '') {
                axios.get('http://127.0.0.1:8000/api/apartments/' + this.store.searchInput).then(response => {
                    console.log(response)
                    this.store.apartments = []
                    response.data.results.forEach(apartment => {
                        this.store.apartments.push(JSON.parse(JSON.stringify(apartment)))
                        // this.store.userName = response.data.user

                    });
                    this.setApartments()
                })
            } else {
                axios.get(this.store.apiPath + 'apartments').then(response => {
                    //console.log(response)
                    this.store.apartments = []
                    response.data.results.forEach(apartment => {
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

    <!-- FORM RICERCA -->
    <!-- <form class="container" @submit.prevent="getApartments()">

        <div class="mb-3">
            <label for="address" class="mb-2">Address Form*</label>
            <input class="form-control my-label" type="text" name="address" id="address" v-model="this.store.searchInput">
        </div>

        <div>
            <input type="range" id="radius" name="radius" min="0" max="100" v-model="this.radius">
            <label for="radius">Radius</label>
        </div>

        <button type="submit" class="btn btn-primary">invia</button>

    </form> -->
    <!-- FORM RICERCA -->

    <div class="container align-items-stretch mt-5" id="AppHome" v-if="this.store.searchError === ''">
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
    </div>
</template>

<style lang="scss" scoped>
#AppHome {
    display: flex;
    align-items: center;
    gap: 1em;
    flex-flow: row wrap;

    ._card {
        width: calc((100% / 4) - 1em);
        border: 1px solid lightgray;
        border-radius: 20px;
        padding: 1em;

        .img-wrapper {
            height: 150px;

            .card-img-top {
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }

        .address {
            font-size: .8em;
        }
    }
}
</style>