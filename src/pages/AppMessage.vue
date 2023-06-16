<script>
import axios from 'axios';
import { store } from '../store.js';


export default {
    name: 'AppHome',
    data() {
        return {
            store,
            formData: {
                'sender_name': store.user_name != 'Accedi' ? store.user_name : '',
                'sender_surname': store.user_surname != '' ? store.user_surname : '',
                'sender_email': store.user_email != '' ? store.user_email : '',
            },
        }
    },

    methods: {
        sendMessage() {
            axios
                .post(this.store.apiPath + 'message/store', this.formData)
                .then((response) => {
                    // this.formData = {};
                    console.log(response)
                })
        },
    }


}
</script>
<template>
    <form @submit.prevent="sendMessage()">

        <div class="mb3 ">
            <label class="mx-3" for="username">username</label>
            <input type="text" name="username" id="username" class="form-control my-label">
        </div>

        <div class="mb3">
            <label class="mx-3" for="content">content</label>
            <input type="text" name="content" id="content" class="form-control my-label">
        </div>

        <div class="mb3">
            <label class="mx-3" for="email">email</label>
            <input type="text" name="email" id="email" class="form-control my-label">
        </div>

        <div class="mb-3">
            <button class="btn-primary" type="submit">Submit</button>
        </div>

    </form>
</template>
<style lang="scss" scoped></style>