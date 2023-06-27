<script>
import axios from 'axios';
import { store } from '../store.js';


export default {
    name: 'AppSearch',
    data() {
        return {
            store,
            isAdvanceSearch: false,
            isAdvanceSearchAnimation: false,
            isSearch: false,
            isSuggest: true,
            searchInputRooms: '',
            searchInputBeds: '',
            searchInputBathrooms: '',
            timeoutIsSearch: '',
            servicesCheck: [],
            errorTimeout: '',
            //-------------
            services: [],
            latitudine: "",
            longitudine: "",
            zoom: "",
            tempServices: [],
            searchInput: '',
        }
    },

    methods: {
        //mette i servizi in un array
        getServices() {
            axios.get(this.store.apiPath + 'services').then(response => {
                response.data.results.forEach(service => {
                    this.services.push(service)
                });
            })
        },

        //Ricerca base per nome
        getApartments() {
            if (this.store.searchInputName != '') {
                axios.get('http://127.0.0.1:8000/api/apartments/' + encodeURIComponent(this.store.searchInputName)).then(response => {
                    this.store.apartments = []
                    response.data.results.forEach(apartment => {
                        this.store.apartments.push(JSON.parse(JSON.stringify(apartment)))
                    });
                    if (response.data.results.length == 0) {
                        this.store.searchError = 'Sorry. No matching items found.'
                    } else {
                        this.store.searchError = ''
                    }
                    this.setApartments()

                })
            } else {
                axios.get(this.store.apiPath + 'apartments').then(response => {
                    this.store.apartments = []
                    response.data.results.forEach(apartment => {
                        this.store.apartments.push(JSON.parse(JSON.stringify(apartment)))
                    });
                    if (response.data.results.length == 0) {
                        this.store.searchError = 'Sorry. No matching items found.'
                    } else {
                        this.store.searchError = ''
                    }
                    this.setApartments()
                })
            }
        },

        //copia i dati di apartment aray in index apartment (ridondante, ma necessaria per come è scritto il codice)
        setApartments() {
            this.store.indexApartments = []
            this.store.apartments.forEach(apartment => {
                this.store.indexApartments.push(JSON.parse(JSON.stringify(apartment)))
            })
        },

        //per avere solo le classi delle icone del database
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

        //cambia il booleano che regola la ricerca avanzata e azzera i parametri
        searchBool() {
            if (this.isAdvanceSearch) {
                setTimeout(() => {
                    this.isAdvanceSearch = false
                }, 1000)
                this.isAdvanceSearchAnimation = true
                //azzeramento variabili
                this.store.searchError = ''
                this.store.indexApartments = this.store.apartments
                this.searchInput = ''
                this.searchInputRooms = ''
                this.searchInputBeds = ''
                this.searchInputBathrooms = ''
                this.store.searchInputName = ''

                this.isSearch = false
                this.isSuggest = false
                this.searchInputRooms = ''
                this.searchInputBeds = ''
                this.searchInputBathrooms = ''
                this.timeoutIsSearch = ''
                this.servicesCheck = []
            } else {
                this.isAdvanceSearch = true
                this.isAdvanceSearchAnimation = false
                //azzeramento variabili
                this.store.searchInputName = ''
                this.store.searchError = ''
                this.store.searchInput = ''
                this.store.indexApartments = this.store.apartments
                this.searchInput = ''
                this.searchInputRooms = ''
                this.searchInputBeds = ''
                this.searchInputBathrooms = ''

                this.isSearch = false
                this.isSuggest = true
                this.searchInputRooms = ''
                this.searchInputBeds = ''
                this.searchInputBathrooms = ''
                this.timeoutIsSearch = ''
                this.servicesCheck = []
            }

            this.getApartments()
        },

        //Logica Backend per la ricerca
        backSearch() {
            this.store.searchError = ''

            //services
            this.servicesCheck = []
            let servicesChecked = [];
            servicesChecked = document.querySelectorAll('._mycheck')
            servicesChecked.forEach(service => {
                if (service.checked) {
                    this.servicesCheck.push(service.value)
                }
            });
            let lastServices = this.servicesCheck.toString()

            if (this.store.searchInput != '') {
                axios.get('https://api.tomtom.com/search/2/geocode/' + encodeURIComponent(this.store.searchInput) + '.json?countrySet=IT&key=8AyhtFuGo44d57QodNOzeOGIsIaJsEq5').then(res => {
                    if (res.data.results.length > 0) {
                        let city_lat = res.data.results[0].position.lat
                        let city_lon = res.data.results[0].position.lon

                        axios.get('http://127.0.0.1:8000/api/apartments/getapartment/' + city_lat + '/' + city_lon + '/' + this.store.searchRange + '/' + (this.searchInputRooms == '' ? '0/' : this.searchInputRooms + '/') + (this.searchInputBeds == '' ? '0/' : this.searchInputBeds + '/') + (this.searchInputBathrooms == '' ? '0/' : this.searchInputBathrooms) + lastServices).then(resu => {
                            this.store.indexApartments = [];
                            if (resu.data.results.length == 0) {
                                this.store.searchError = 'Sorry. No matching items found.'
                            } else {
                                this.store.indexApartments = resu.data.results;

                            }
                            if (this.store.indexApartments.length != 0) {
                                clearTimeout(this.errorTimeout);
                                this.store.searchError = ''
                            } else {
                                this.errorTimeout = setTimeout(() => {
                                    this.store.searchError = 'Sorry. No matching items found.'

                                }, 2000);
                            }
                        })
                    }
                })

            } else if (this.store.searchInput == '' && (this.searchInputRooms != '' || this.searchInputBeds != '' || this.searchInputBathrooms != '' || lastServices.length != 0)) {
                axios.get('http://127.0.0.1:8000/api/apartmentempty/' + (this.searchInputRooms == '' ? '0/' : this.searchInputRooms + '/') + (this.searchInputBeds == '' ? '0/' : this.searchInputBeds + '/') + (this.searchInputBathrooms == '' ? '0/' : this.searchInputBathrooms) + lastServices).then(resul => {
                    //console.log(res.data.results)
                    //console.log('http://127.0.0.1:8000/api/apartmentempty/' + (this.searchInputRooms == '' ? '0/' : this.searchInputRooms + '/') + (this.searchInputBeds == '' ? '0/' : this.searchInputBeds + '/') + (this.searchInputBathrooms == '0/' ? '' : this.searchInputBathrooms) + lastServices)
                    this.store.indexApartments = [];
                    if (resul.data.results.length == 0) {
                        this.store.searchError = 'Sorry. No matching items found.'
                    } else {
                        this.store.indexApartments = resul.data.results;

                    }

                })
            } else {
                axios.get('http://127.0.0.1:8000/api/apartments').then(result => {
                    this.store.indexApartments = [];
                    if (result.data.results.length == 0) {
                        this.store.searchError = 'Sorry. No matching items found.'
                    } else {
                        this.store.indexApartments = result.data.results;
                    }

                })
            }
        },

        //riduce il numero di chiamate axios (usata dall'input delle città)
        setIsSearch() {
            if (this.isSearch == false) {
                this.isSearch = true
                //console.log(this.isSearch)
                //clearTimeout(this.timeoutIsSearch)
            } else {
                this.timeoutIsSearch = setTimeout(() => {
                    this.isSearch = false
                    //console.log(this.isSearch)
                }, 300)
            }
        },

        //click sul consiglio per cambiare nome della citta
        setInput(parametro) {
            this.store.searchInput = parametro

            this.backSearch()
            this.isSuggest = false;

        },

        //consigli citta
        advicedCity() {

            this.isSuggest = true;

            if (this.store.searchInput.length > 3) {
                axios.get('https://api.tomtom.com/search/2/geocode/' + encodeURIComponent(this.store.searchInput) + '.json?countrySet=IT&key=8AyhtFuGo44d57QodNOzeOGIsIaJsEq5').then(res => {
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
    <div id="appSearch">

        <div class="input-group my-3">
            <button class="input-group-text btn" :class="this.isAdvanceSearch ? '_btn-search' : '_btn-unsearch'"
                @click="searchBool()">Advanced Search</button>
            <!-- input di ricerca city -->
            <input type="text" aria-label="search" class="form-control _search" v-model="this.store.searchInput"
                @input="advicedCity(), backSearch(), setIsSearch()" placeholder="Search by city or address"
                v-if="isAdvanceSearch">
            <!-- input di ricerca name -->
            <input type="text" aria-label="search" class="form-control _search" v-model="this.store.searchInputName"
                @input="getApartments()" placeholder="Search by name or address" v-else>

            <!-- suggerimenti Indirizzi -->
            <div class="_menu-suggerimenti "
                v-if="this.store.searchInput != '' && this.store.arraySuggestion.length != 0 && this.store.searchInput.length > 3 && this.isSuggest === true">
                <ul>
                    <li v-for=" element  in  this.store.arraySuggestion "
                        @click="setInput(element.address.freeformAddress)"><i
                            class="fa-solid fa-location-dot _location-icon"></i> {{
                                element.address.freeformAddress }}</li>
                </ul>
            </div>

            <!-- Rooms -->
            <div class="_numb-imput-wrapper" :class="this.isAdvanceSearchAnimation ? 'numb-input-disappear' : ''"
                v-if="isAdvanceSearch">
                <i class="fa-solid fa-door-closed"></i>
                <input type="number" class="_numb-imput" aria-label="rooms" v-model="searchInputRooms"
                    @change="backSearch()" placeholder="rooms" min="0" max="30">
            </div>
            <!-- beds -->
            <div class="_numb-imput-wrapper" :class="this.isAdvanceSearchAnimation ? 'numb-input-disappear' : ''"
                v-if="isAdvanceSearch">
                <i class="fa-solid fa-bed"></i>
                <input class="_numb-imput" type="number" aria-label="beds" v-model="searchInputBeds" @change="backSearch()"
                    placeholder="beds" min="0" max="60">
            </div>
            <!-- bathrooms -->
            <div class="_numb-imput-wrapper" :class="this.isAdvanceSearchAnimation ? 'numb-input-disappear' : ''"
                v-if="isAdvanceSearch">
                <i class="fa-solid fa-bath"></i>
                <input class="_numb-imput" type="number" aria-label="bathrooms" v-model="searchInputBathrooms"
                    @change="backSearch()" placeholder="bath" min="0" max="20">
            </div>


            <!-- button - Ricerca avanzata -->
            <button class="input-group-text btn _btn-search" @click="backSearch()" v-if="isAdvanceSearch">Search</button>
            <!-- button - Ricerca per nome -->
            <button class="input-group-text btn _btn-search" @click="getApartments()" v-else>Search</button>

        </div>
        <!-- services -->
        <div class="bottom-side-search d-flex flex-wrap my-2"
            :class="this.isAdvanceSearchAnimation ? 'services-disappear' : ''" v-if="isAdvanceSearch">
            <div class="form-check _mycheckwrapper my-3" v-for=" service  in  this.services ">
                <input class="form-check-input _mycheck" type="checkbox" :value="service.id" @click="backSearch()">
                <div class="d-flex flex-column align-items-start _myiconwrapper">
                    <span class="h2 d-flex justify-content-center w-100">
                        <i :class="this.getIconsClass(service.icon)"></i>
                    </span>
                    <span class="_service-name d-flex justify-content-center w-100"> {{ service.name }}</span>
                </div>
            </div>
        </div>

        <!-- RANGE -->
        <div class=" _range container d-flex justify-content-center align-items-center flex-column" v-if="isAdvanceSearch"
            :class="this.isAdvanceSearchAnimation ? 'range-disappear' : ''">
            <!-- SLIDEBAR - PERSONALIZZATA -->
            <div class="slider-colored" :class="this.isAdvanceSearchAnimation ? 'slider-colored-disappear' : ''">
                <div class="_slider-bar"
                    :style="'width: calc(' + this.store.searchRange + '% + ' + (100 - this.store.searchRange) / 25 + 'px);'">
                </div>
                <div class="_slider-bar _limit"></div>
                <div class="_slider-button"
                    :style="'left:calc(' + this.store.searchRange + '% - 13px);transform: translateX(' + (100 - this.store.searchRange) + '%);'">
                </div>
            </div>
            <!-- SLIDEBAR - PERSONALIZZATA -->

            <input class="w-75 _slider" type="range" v-model="this.store.searchRange" @change="backSearch()">
            <span class="_slider-text">Range:
                <strong>
                    {{ this.store.searchRange }}
                </strong>
                km</span>
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
    position: relative;
}

._range {
    margin-top: 2em;


    .slider-colored {
        position: relative;
        width: 75%;
        //border: 1px solid rgba(255, 0, 0, 0.505);

        ._slider-bar {
            height: 8px;
            border-radius: 12px;
            background-color: rgb(255, 90, 95);
            position: absolute;
            bottom: -11px;
            z-index: 2;

        }

        ._limit {
            position: absolute;
            width: 100%;
            background-color: white;
            border: 1px solid rgb(255, 90, 95);
            z-index: 1;
        }

        ._slider-button {
            width: 13px;
            height: 13px;
            position: absolute;
            bottom: -14px;
            background: rgb(255, 255, 255);
            border-radius: 50%;
            border: 1px solid rgb(255, 90, 95);
            z-index: 3;
        }

    }

    ._slider-text {
        font-size: 1.1em;
        margin-top: .6em;

        strong {
            color: rgb(255, 90, 95);
        }
    }

    ._slider {
        position: relative;
        z-index: 4;
        opacity: 0;
        cursor: pointer;

        &::-webkit-slider-runnable-track {
            background-color: none;
            color: none;
        }

        &::-webkit-slider-thumb {
            background-color: none;
        }
    }

}

._search {
    color: rgb(25, 25, 25);

    &:focus {
        box-shadow: none;
        border: 1px solid lightgray;
    }

}


._menu-suggerimenti {
    position: absolute;
    top: 38px;
    left: 137px;
    width: 400px;
    border: 1px solid lightgray;
    background: white;
    z-index: 2;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);

    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        overflow: hidden;

        li {
            cursor: pointer;
            background: white;
            padding: .5em;

            ._location-icon {
                margin-right: .5em;
                font-size: .8em;
                color: rgb(180, 180, 180);
            }

            &:hover {
                background: rgb(255, 90, 95);
                color: white;

                ._location-icon {
                    color: rgb(254, 254, 254);
                }
            }
        }
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
    border: 1px solid transparent;

    &:hover {
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.368);
    }
}

._btn-unsearch {
    background: rgb(255, 255, 255);
    color: rgb(255, 90, 95);
    border: 1px solid rgb(255, 90, 95);
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
    height: 220px;
    overflow: hidden;

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

                ._service-name::after {
                    //text-decoration: underline;
                    content: '';

                    background: rgb(255, 90, 95);
                    border: 1px solid rgb(255, 90, 95);

                }

            }

        }

        span {
            color: rgb(0, 0, 0);
        }

        ._service-name::after {
            //text-decoration: underline;
            content: '';
            position: absolute;
            bottom: -17%;
            left: 50%;
            transform: translateX(-50%);
            width: 8px;
            height: 8px;
            background: rgb(255, 255, 255);
            border: 1px solid rgb(0, 0, 0);
            border-radius: 50%;
            transition: all .5s;
        }
    }


}

// SERVICES

//medium
@media screen and (max-width: 768px) {
    #appSearch {}
}

//small
@media screen and (max-width: 576px) {
    #appSearch {}
}
</style>