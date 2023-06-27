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

    <div class="loading w-100 h-100 d-flex justify-content-center align-items-center"
        v-if="this.store.searchError === '' && this.store.indexApartments.length == 0">
        <div class="spinner-border text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <span>{{ this.store.searchError }}</span>
    </div>
    <div class="result" v-else>
        <div class="container">
            <h3>Sponsored</h3>
            <div class="card" v-for="apartment in this.store.indexApartmentsSponsor">
                {{ apartment.name }}
            </div>
        </div>

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