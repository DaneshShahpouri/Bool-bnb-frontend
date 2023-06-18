import { reactive } from 'vue';

export const store = reactive({
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
});