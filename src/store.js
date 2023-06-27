import { reactive } from 'vue';

export const store = reactive({
    //Home(index)
    //tutti gli appartmenti
    apartments: [],
    //quelli visualizzati in home
    indexApartments: [],

    //Sponsor Index Apartment
    indexApartmentsSponsor :[],

    //USER
    userName: '',

    //Axios
    apiPath: 'http://127.0.0.1:8000/api/',
    urlImg: 'http://127.0.0.1:8000' + '/storage/',

    //Info Sender Message
    message_apartment_id: '',
    message_username: '',
    message_content: '',
    message_email: '',

    //search
    searchError: '',
    searchInput: '',
    searchInputName: '',
    searchRange: 20,
    arraySuggestion: [],
    isSearching: false,
});