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
                //console.log(response.data.results)

                response.data.results.forEach(apartment => {
                    this.apartments.push(apartment)
                });
            })
        }
    },

    created() {
        this.getApartments()
        console.log(this.store.apiPath.slice(this.store.apiPath.length - 3, this.store.apiPath.length))
    },
}
</script>

<template>
    <div class="container" id="AppHome">
        <div class="card _card" v-for="apartment in  this.apartments ">
            <div class="img-wrapper">
                <img class="card-img-top"
                    :src="(apartment.cover_image != null && (apartment.cover_image.slice(apartment.cover_image.length - 3, apartment.cover_image.length) == 'png' || apartment.cover_image.slice(apartment.cover_image.length - 3, apartment.cover_image.length) == 'jpg') ? (this.store.urlImg + apartment.cover_image) : 'https://www.kuleuven.be/communicatie/congresbureau/fotos-en-afbeeldingen/no-image.png/image')"
                    alt="Card image cap">
            </div>
            <h5 class="card-title">{{ apartment.name }}</h5>
            <div class="card-body">
                <p class="card-text">{{ apartment.description }}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
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
        width: calc(100% / 4);
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
    }
}
</style>