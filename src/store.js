import { reactive } from 'vue';

export const store = reactive({
    //Axios
    apiPath: 'http://127.0.0.1:8000/api/',
    urlImg: 'http://127.0.0.1:8000' + '/storage/',

    //Info Sender Message
    user_name: 'Accedi',
    user_surname: '',
    user_email: '',
});