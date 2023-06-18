<script>
import axios from 'axios';
import { store } from '../store.js';


export default {
    name: 'AppHome',
    data() {
        return {
            store,

            //debug
            apartment_id: 1,
            //debug
        }
    },

    methods: {
        setApartmentId() {
            this.formData.apartment_id = this.apartment_id;
        },

        sendMessage() {
            if (this.store.message_username != '' && this.store.message_content != '' && this.store.message_email != '' && this.store.message_email.includes('@')) {
                axios
                    .post(this.store.apiPath + 'messages/store', {
                        username: this.store.message_username,
                        content: this.store.message_content,
                        email: this.store.message_email,
                    }).then((res) => console.log(res))
                    .catch((error) => console.log(error));
            } else {
                console.log('devi compilare tutti i campi')
            }
        },
    }


}
</script>
<template>
    <form @submit.prevent="sendMessage()">
        <!-- username -->
        <div class="mb3 ">
            <label class="mx-3" for="username">username</label>
            <input type="text" name="username" id="username" class="form-control my-label"
                v-model="this.store.message_username" required>
        </div>

        <!-- content -->
        <div class="mb3">
            <label class="mx-3" for="content">content</label>
            <input type="text" name="content" id="content" class="form-control my-label"
                v-model="this.store.message_content" required>
        </div>

        <!-- email -->
        <div class="mb3">
            <label class="mx-3" for="email">email</label>
            <input type="email" name="email" id="email" class="form-control my-label" v-model="this.store.message_email"
                required>
        </div>

        <!-- submit -->
        <div class="mb-3">
            <button class="btn-primary" type="submit" @click="setApartmentId()">Submit</button>
        </div>

    </form>
</template>
<style lang="scss" scoped></style>