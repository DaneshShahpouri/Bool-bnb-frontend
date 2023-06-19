<script>
import axios from 'axios';
import { store } from '../store.js';


export default {
    name: 'AppSearch',
    data() {
        return {
            store,
            isAdvanceSearch: false,

            services: [],
            tempServices: [],
            searchInput: '',
            searchInputRooms: null,
            searchInputBeds: null,
            searchInputBathrooms: null,

        }
    },

    methods: {
        getServices() {
            axios.get(this.store.apiPath + 'services').then(response => {

                response.data.results.forEach(service => {
                    this.services.push(service)
                });
                //console.log(this.services)
            })
        },

        getIconsClass(string) {
            let stringMod = string.replaceAll('<i class="', '');
            let stringModTwi = stringMod.replaceAll('"></i>', '');
            return stringModTwi
        },

        //restituisce false se almeno un valore in value non è presente in arr
        multipleInArray(arr, values) {
            return values.every(value => {
                return arr.includes(parseInt(value));
            });
        },

        searchBool() {
            if (this.isAdvanceSearch) {
                this.isAdvanceSearch = false
                //azzeramento variabili
                this.store.searchError = ''
                this.store.indexApartments = this.store.apartments
                this.searchInput = ''
                this.searchInputRooms = null
                this.searchInputBeds = null
                this.searchInputBathrooms = null
            } else {
                this.isAdvanceSearch = true
                //azzeramento variabili
                this.store.searchError = ''
                this.store.indexApartments = this.store.apartments
                this.searchInput = ''
                this.searchInputRooms = null
                this.searchInputBeds = null
                this.searchInputBathrooms = null
            }
        },

        search() {

            if (this.isAdvanceSearch) {
                //services
                //inserisce i services selezionati in this.tempServices
                let services = document.querySelectorAll('._mycheck');
                this.tempServices = []
                this.store.searchError = ''


                services.forEach(service => {

                    if (service.checked) {
                        this.tempServices.push(service.value)
                    }
                })
                //fine check services

                //svuota array di visualizzazione appartamenti
                this.store.indexApartments = [];

                //Se ci sono serviziTemporanei 
                if (this.tempServices.length > 0) {

                    //debug------------------------------
                    // console.log('this.store.apartments')
                    // console.log(this.store.apartments)
                    // console.log('this.store.indexApartments')
                    // console.log(this.store.indexApartments)
                    //debug------------------------------

                    this.store.apartments.forEach(apartment => {
                        //id services in tutti gli appartamenti
                        let tempApartmentService = []
                        apartment.services.forEach(service => {
                            tempApartmentService.push(service.id)
                        })

                        if (this.multipleInArray(tempApartmentService, this.tempServices)) {
                            this.store.indexApartments.push(apartment)
                        }
                    })
                } else {
                    this.store.indexApartments = this.store.apartments
                }


                if (this.searchInput != '') {
                    //console.log(this.store.indexApartments.filter(apartment => ((apartment.name).toLowerCase()).includes(this.searchInput.toLowerCase())))
                    this.store.indexApartments = this.store.indexApartments.filter(apartment => apartment.name.toLowerCase().includes(this.searchInput.toLowerCase()) || apartment.address.toLowerCase().includes(this.searchInput.toLowerCase()))
                }

                if (this.store.indexApartments.length == 0) {
                    this.store.searchError = 'Sorry. No matching items found.'
                }

            } else {
                this.store.indexApartments = this.store.apartments
                this.store.searchError = ''

                if (this.searchInput != '') {
                    //console.log(this.store.indexApartments.filter(apartment => ((apartment.name).toLowerCase()).includes(this.searchInput.toLowerCase())))
                    this.store.indexApartments = this.store.indexApartments.filter(apartment => apartment.name.toLowerCase().includes(this.searchInput.toLowerCase()))
                }

                if (this.store.indexApartments.length == 0) {
                    this.store.searchError = 'Sorry. No matching items found.'
                }

            }

        }
    },

    created() {
        this.getServices();

    },
}
</script>
<template>
    <div id="appSearch" class="">

        <div class="input-group my-3">
            <button class="input-group-text btn _btn-search" @click="searchBool()">Advance Search</button>
            <!-- input di ricerca stringa -->
            <input type="text" aria-label="search" class="form-control _search" v-model="searchInput" @change="search()"
                :placeholder="isAdvanceSearch ? 'Search by city or name' : 'Search by name'">

            <!-- Rooms -->
            <div class="_numb-imput-wrapper" v-if="isAdvanceSearch">
                <i class="fa-solid fa-door-closed"></i>
                <input type="number" class="_numb-imput" aria-label="rooms" v-model="searchInputRooms" @change="search()"
                    placeholder="rooms">
            </div>
            <!-- beds -->
            <div class="_numb-imput-wrapper" v-if="isAdvanceSearch">
                <i class="fa-solid fa-bed"></i>
                <input class="_numb-imput" type="number" aria-label="beds" v-model="searchInputBeds" @change="search()"
                    placeholder="beds">
            </div>
            <!-- bathrooms -->
            <div class="_numb-imput-wrapper" v-if="isAdvanceSearch">
                <i class="fa-solid fa-bath"></i>
                <input class="_numb-imput" type="number" aria-label="bathrooms" v-model="searchInputBathrooms"
                    @change="search()" placeholder="bath">
            </div>

            <!-- button -->

            <button class="input-group-text btn _btn-search" @click="search()">Search</button>
        </div>
        <!-- services -->
        <div class="bottom-side-search d-flex flex-wrap my-2" v-if="isAdvanceSearch">
            <div class="form-check _mycheckwrapper my-3" v-for="service in this.services">
                <input class="form-check-input _mycheck" type="checkbox" :value="service.id" @click="search()">
                <div class="d-flex flex-column align-items-start _myiconwrapper">
                    <span class="h2 d-flex justify-content-center w-100">
                        <i :class="this.getIconsClass(service.icon)"></i>
                    </span>
                    <span class="_service-name d-flex justify-content-center w-100"> {{ service.name }}</span>
                </div>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
#appSearch {
    border-bottom: 1px solid lightgray;
    border-radius: 7px;
    padding: 1.5em;
    width: 90%;
    margin: 1em auto;
    margin-bottom: 5em;


    ._search {
        color: rgb(25, 25, 25);

        &:focus {
            box-shadow: none;
            border: 1px solid lightgray;
        }
    }

    ._numb-imput-wrapper {
        border: 1px solid lightgray;

        display: flex;
        align-items: center;

        ._numb-imput {
            width: 60px;
            font-size: .9em;
            border: none;

            &:focus-visible {
                outline: none;
            }

        }

        i {
            padding: 0 .5em;
        }

    }

    ._btn-search {
        background: rgb(255, 90, 95);
        color: white;
        transition: all .5s;

        &:hover {
            box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.368);
        }

    }

    // SERVICES
    .bottom-side-search {
        // border-bottom: 1px solid lightgray;
        // border-top: 1px solid lightgray;
        padding-top: 2em;

        ._mycheckwrapper {
            width: calc(100% / 6);
            position: relative;
            padding: 0;
            border-bottom: 1px solid transparent;
            color: rgb(92, 92, 92);
            transition: all .5s;

            span {
                transition: all .5s;
            }

            &:hover {
                color: black;
            }

            ._mycheck {
                position: absolute;
                left: 50%;
                transform: translateX(-30%);
                height: 60px;
                width: 120px;
                opacity: 0;
                cursor: pointer;

                &:checked+._myiconwrapper {

                    span {
                        color: rgb(255, 90, 95);
                    }

                    ._service-name {
                        text-decoration: underline;
                    }

                }
            }
        }


    }

    // SERVICES

}
</style>