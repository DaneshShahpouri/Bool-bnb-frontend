<script>
import axios from 'axios';
import { store } from '../store.js';


export default {
    name: 'AppSearch',
    data() {
        return {
            store,
            isAdvanceSearch: false,
            isSearch: false,
            searchInputRooms: '',
            searchInputBeds: '',
            searchInputBathrooms: '',
            timeoutIsSearch: '',
            //-------------
            latitudine: "",
            longitudine: "",
            zoom: "",
            services: [],
            tempServices: [],
            searchInput: '',


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
                this.searchInputRooms = ''
                this.searchInputBeds = ''
                this.searchInputBathrooms = ''
            } else {
                this.isAdvanceSearch = true
                //azzeramento variabili
                this.store.searchError = ''
                this.store.indexApartments = this.store.apartments
                this.searchInput = ''
                this.searchInputRooms = ''
                this.searchInputBeds = ''
                this.searchInputBathrooms = ''
            }
        },

        //Logica FrontEnd (da togliere (Non ora))
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

                if (this.searchInputRooms > 0) {
                    this.store.indexApartments = this.store.indexApartments.filter(apartment => apartment.rooms_number >= this.searchInputRooms)
                }

                if (this.searchInputBeds > 0) {
                    this.store.indexApartments = this.store.indexApartments.filter(apartment => apartment.beds_number >= this.searchInputBeds)
                }

                if (this.searchInputBathrooms > 0) {
                    this.store.indexApartments = this.store.indexApartments.filter(apartment => apartment.bathrooms_number >= this.searchInputBathrooms)
                }

                if (this.store.indexApartments.length == 0) {
                    this.store.searchError = 'Sorry. No matching items found.'
                }

            } else {
                this.store.indexApartments = this.store.apartments
                this.store.searchError = ''

                if (this.searchInputName != '') {
                    //console.log(this.store.indexApartments.filter(apartment => ((apartment.name).toLowerCase()).includes(this.searchInputName.toLowerCase())))
                    this.store.indexApartments = this.store.indexApartments.filter(apartment => apartment.name.toLowerCase().includes(this.store.searchInputName.toLowerCase()))
                }

                if (this.store.indexApartments.length == 0) {
                    this.store.searchError = 'Sorry. No matching items found.'
                }


            }

            //console.log('funziono')

        },

        //Conversione lat-long-zoom (non usata)
        latLonConversion(lat, lon, zoomLevel) {
            const MIN_ZOOM_LEVEL = 0
            const MAX_ZOOM_LEVEL = 22
            const MIN_LAT = -85.051128779807
            const MAX_LAT = 85.051128779806
            const MIN_LON = -180.0
            const MAX_LON = 180.0

            if (
                zoomLevel == undefined ||
                isNaN(zoomLevel) ||
                zoomLevel < MIN_ZOOM_LEVEL ||
                zoomLevel > MAX_ZOOM_LEVEL
            ) {
                throw new Error(
                    "Zoom level value is out of range [" +
                    MIN_ZOOM_LEVEL.toString() +
                    ", " +
                    MAX_ZOOM_LEVEL.toString() +
                    "]"
                )
            }

            if (lat == undefined || isNaN(lat) || lat < MIN_LAT || lat > MAX_LAT) {
                throw new Error(
                    "Latitude value is out of range [" +
                    MIN_LAT.toString() +
                    ", " +
                    MAX_LAT.toString() +
                    "]"
                )
            }

            if (lon == undefined || isNaN(lon) || lon < MIN_LON || lon > MAX_LON) {
                throw new Error(
                    "Longitude value is out of range [" +
                    MIN_LON.toString() +
                    ", " +
                    MAX_LON.toString() +
                    "]"
                )
            }

            let z = Math.trunc(zoomLevel)
            let xyTilesCount = Math.pow(2, z)
            let x = Math.trunc(Math.floor(((lon + 180.0) / 360.0) * xyTilesCount))
            let y = Math.trunc(
                Math.floor(
                    ((1.0 -
                        Math.log(
                            Math.tan((lat * Math.PI) / 180.0) +
                            1.0 / Math.cos((lat * Math.PI) / 180.0)
                        ) /
                        Math.PI) /
                        2.0) *
                    xyTilesCount
                )
            )

            //console.log(z.toString() + "/" + x.toString() + "/" + y.toString());

            return z.toString() + "/" + x.toString() + "/" + y.toString()
        },

        //Logica Backend
        backSearch() {
            this.store.searchError = ''
            if (this.isSearch == false) {
                //--debug--
                console.log('Ricerca backend')
                //--debug--

                if (this.store.searchInput != '') {
                    axios.get('https://api.tomtom.com/search/2/search/' + this.store.searchInput + '.json?countrySet=IT&key=8AyhtFuGo44d57QodNOzeOGIsIaJsEq5').then(res => {
                        console.log(res.data.results.length)
                        if (res.data.results.length > 0) {
                            let city_lat = res.data.results[0].position.lat
                            let city_lon = res.data.results[0].position.lon

                            axios.get('http://127.0.0.1:8000/api/apartments/getapartment/' + city_lat + '/' + city_lon + '/' + (this.searchInputRooms == '' ? '0/' : this.searchInputRooms + '/') + (this.searchInputBeds == '' ? '0/' : this.searchInputBeds + '/') + (this.searchInputBathrooms == '0/' ? '' : this.searchInputBathrooms) + '1').then(resu => {
                                //console.log(res.data.results)
                                //console.log('http://127.0.0.1:8000/api/getapartment/' + city_lat + '/' + city_lon + '/' + this.store.searchRange + '/' + this.searchInputRooms + '/' + this.searchInputBeds + '/' + this.searchInputBathrooms + '/' + '1')
                                this.store.indexApartments = [];
                                this.store.indexApartments = resu.data.results;
                                if (resu.data.results.length == 0) {
                                    this.store.searchError = 'Sorry. No matching items found.'
                                }
                            })
                        }
                    })
                } else if (this.store.searchInput == '' && (this.searchInputRooms != '' || this.searchInputBeds != '' || this.searchInputBathrooms != '')) {
                    axios.get('http://127.0.0.1:8000/api/apartmentempty/' + (this.searchInputRooms == '' ? '0/' : this.searchInputRooms + '/') + (this.searchInputBeds == '' ? '0/' : this.searchInputBeds + '/') + (this.searchInputBathrooms == '0' ? '' : this.searchInputBathrooms)).then(resul => {
                        //console.log(res.data.results)
                        this.store.indexApartments = [];
                        this.store.indexApartments = resul.data.results;
                        if (resul.data.results.length == 0) {
                            this.store.searchError = 'Sorry. No matching items found.'
                        }
                    })
                } else {
                    axios.get('http://127.0.0.1:8000/api/apartments').then(result => {
                        this.store.indexApartments = [];
                        this.store.indexApartments = result.data.results;
                        if (result.data.results.length == 0) {
                            this.store.searchError = 'Sorry. No matching items found.'
                        }
                    })
                }

            }

            this.setIsSearch()
        },

        //riduce il numero di chiamate axios (non usata... credo)
        setIsSearch() {
            if (this.isSearch == false) {
                this.isSearch = true
                //console.log(this.isSearch)
                //clearTimeout(this.timeoutIsSearch)
            } else {
                this.timeoutIsSearch = setTimeout(() => {
                    this.isSearch = false
                    //console.log(this.isSearch)
                }, 700)
            }
        },

        //click sul consiglio per cambiare nome della citta
        setInput(parametro) {
            this.store.searchInput = parametro
            this.setIsSearch()
            this.backSearch()
            if (this.store.indexApartments.length == 0) {
                this.store.searchError = 'Sorry. No matching items found.'
            }

        },

        //consigli citta
        advicedCity() {

            if (this.store.searchInput.length > 3) {
                axios.get('https://api.tomtom.com/search/2/structuredGeocode.json?countrySet=IT&key=8AyhtFuGo44d57QodNOzeOGIsIaJsEq5&municipality=' + this.store.searchInput).then(res => {
                    this.store.arraySuggestion = []

                    let firstCountry = res.data.results[0]
                    let secondCountry = res.data.results[1]
                    let thirdCountry = res.data.results[2]

                    if (firstCountry != undefined) {
                        this.store.arraySuggestion.push(firstCountry)
                    }
                    if (secondCountry != undefined && secondCountry != firstCountry) {
                        this.store.arraySuggestion.push(secondCountry)
                    }
                    if (thirdCountry != undefined && thirdCountry != firstCountry && thirdCountry != secondCountry) {
                        this.store.arraySuggestion.push(thirdCountry)
                    }


                    // axios.get('https://api.tomtom.com/search/2/structuredGeocode.json?countrySet=IT&key=8AyhtFuGo44d57QodNOzeOGIsIaJsEq5&streetName=' + this.store.searchInput).then(res => {


                    //     let firstStreet = res.data.results[0]
                    //     let secondStreet = res.data.results[1]

                    //     if (firstStreet != undefined && !(this.store.arraySuggestion.includes(firstStreet))) {
                    //         this.store.arraySuggestion.push(firstStreet)
                    //     }
                    //     if (secondStreet != undefined && secondStreet !== firstCountry && secondStreet !== firstStreet && secondStreet !== secondCountry) {
                    //         this.store.arraySuggestion.push(secondStreet)
                    //     }
                    // })
                    //console.log(this.store.arraySuggestion)
                })
            }
        }
    },

    created() {
        this.getServices();
        this.backSearch()

    },
}
</script>
<template>
    <div id="appSearch" class="">

        <div class="input-group my-3">
            <button class="input-group-text btn _btn-search" @click="searchBool()">Advance Search</button>
            <!-- input di ricerca city -->
            <input type="text" aria-label="search" class="form-control _search" v-model="this.store.searchInput"
                @input="advicedCity(), backSearch(), setIsSearch()" placeholder="Search by city or address"
                v-if="isAdvanceSearch">
            <!-- input di ricerca name -->
            <input type="text" aria-label="search" class="form-control _search" v-model="this.store.searchInputName"
                @input="search()" placeholder="Search by name" v-else>

            <div class="_menu-suggerimenti"
                v-show="this.store.searchInput != '' && this.store.arraySuggestion.length != 0 && this.isSearch == false">
                <ul>
                    <li v-for=" element  in  this.store.arraySuggestion "
                        @click="setInput(element.address.freeformAddress)">{{
                            element.address.freeformAddress }}</li>
                </ul>
            </div>

            <!-- Rooms -->
            <div class="_numb-imput-wrapper" v-if="isAdvanceSearch">
                <i class="fa-solid fa-door-closed"></i>
                <input type="number" class="_numb-imput" aria-label="rooms" v-model="searchInputRooms"
                    @change="backSearch()" placeholder="rooms" min="0" max="30">
            </div>
            <!-- beds -->
            <div class="_numb-imput-wrapper" v-if="isAdvanceSearch">
                <i class="fa-solid fa-bed"></i>
                <input class="_numb-imput" type="number" aria-label="beds" v-model="searchInputBeds" @change="backSearch()"
                    placeholder="beds" min="0" max="60">
            </div>
            <!-- bathrooms -->
            <div class="_numb-imput-wrapper" v-if="isAdvanceSearch">
                <i class="fa-solid fa-bath"></i>
                <input class="_numb-imput" type="number" aria-label="bathrooms" v-model="searchInputBathrooms"
                    @change="backSearch()" placeholder="bath" min="0" max="20">
            </div>


            <!-- button -->
            <button class="input-group-text btn _btn-search" @click="backSearch()" v-if="isAdvanceSearch">Search</button>
            <!-- button -->
            <button class="input-group-text btn _btn-search" @click="search()" v-else>Search</button>

        </div>
        <!-- services -->
        <div class="bottom-side-search d-flex flex-wrap my-2" v-if="isAdvanceSearch">
            <div class="form-check _mycheckwrapper my-3" v-for=" service  in  this.services ">
                <input class="form-check-input _mycheck" type="checkbox" :value="service.id" @click="search()">
                <div class="d-flex flex-column align-items-start _myiconwrapper">
                    <span class="h2 d-flex justify-content-center w-100">
                        <i :class="this.getIconsClass(service.icon)"></i>
                    </span>
                    <span class="_service-name d-flex justify-content-center w-100"> {{ service.name }}</span>
                </div>
            </div>
        </div>

        <!-- RANGE -->
        <div class="container d-flex justify-content-center align-items-center flex-column" v-if="isAdvanceSearch">
            <input class="w-75" type="range" v-model="this.store.searchRange">
            <span>Range: {{ this.store.searchRange }} km</span>
        </div>
        <!-- Conversione coordinate-->
        <!-- <div>
            <input type="number" placeholder="latitudine" v-model="latitudine">
            <input type="number" placeholder="longitudine" v-model="longitudine">
            <input type="number" placeholder="zoom" v-model="zoom">
            <button type="submit" @click="latLonConversion(latitudine,longitudine,zoom)">converti</button>
        </div> -->
        <!-- /Conversione coordinate-->

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
    position: relative;


    ._search {
        color: rgb(25, 25, 25);

        &:focus {
            box-shadow: none;
            border: 1px solid lightgray;
        }

    }

    ._menu-suggerimenti {
        position: absolute;
        top: 50px;
        left: 170px;
        width: 200px;
        padding: .5em;
        border: 1px solid red;
        background: #c3c3c3;
        z-index: 2;
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