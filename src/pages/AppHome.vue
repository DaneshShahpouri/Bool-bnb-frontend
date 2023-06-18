<script>
import axios from 'axios';
import { store } from '../store.js';

export default {
    name: 'AppHome',
    data() {
        return {
            store,
            apartments: [],
        }
    },

    methods: {
        getApartments() {
            axios.get(this.store.apiPath + 'apartments').then(response => {
                
                response.data.results.forEach(apartment => {
                    this.apartments.push(apartment)
                });
            })
        }
    },

    created() {
        this.getApartments();

    },
}
</script>

<template>
    <div class="container align-items-stretch mt-5" id="AppHome">
        <div class="card _card" v-for="apartment in  this.apartments ">
            <div class="img-wrapper">
                <img class="card-img-top"
                    :src="(apartment.cover_image != null && (apartment.cover_image.slice(apartment.cover_image.length - 3, apartment.cover_image.length) == 'png' || apartment.cover_image.slice(apartment.cover_image.length - 3, apartment.cover_image.length) == 'jpg') ? (this.store.urlImg + apartment.cover_image) : 'https://www.kuleuven.be/communicatie/congresbureau/fotos-en-afbeeldingen/no-image.png/image')"
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
</template>

<style lang="scss" scoped>
#AppHome {
    display: flex;
    align-items: center;
    gap: 1em;
    flex-flow: row wrap;

    ._card {
        width: calc((100% / 4) - 2em);
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