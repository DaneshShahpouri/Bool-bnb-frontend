<script>
import axios from 'axios';
import { store } from '../store.js';


export default {
    name: 'AppMessageForm',
    data() {
        return {
            store,
            isSend: false,
            isError: false,
            error: '',
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
                        apartment_id: this.store.message_apartment_id,
                        username: this.store.message_username,
                        content: this.store.message_content,
                        email: this.store.message_email,
                    }).then((res) => {
                        console.log(res);
                        this.isSend = true;

                        setTimeout(
                            () => {
                                this.isSend = false;
                                this.error = '';
                            }, 3000);

                        setTimeout(
                            () => {
                                this.store.message_username = '';
                                this.store.message_content = '';
                                this.store.message_email = '';
                            }, 100);

                    })
                    .catch((error) => {
                        console.log(error)
                        this.isError = true;
                        this.error = error;

                        setTimeout(
                            () => {
                                this.isError = false;
                            }, 3000);

                    });


            } else {
                //console.log('devi compilare tutti i campi')
            }
        },
    }


}
</script>
<template>
    <div id="appMessageForm" class="my-5">
        <h4>Send Message</h4>
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
                <textarea type="text" name="content" id="content" class="form-control my-label"
                    v-model="this.store.message_content" required></textarea>
            </div>

            <!-- email -->
            <div class="mb3">
                <label class="mx-3" for="email">email</label>
                <input type="email" name="email" id="email" class="form-control my-label" v-model="this.store.message_email"
                    required>
            </div>

            <!-- submit -->
            <div class="mb-3 d-flex justify-content-center">
                <button class="btn btn-outline-primary my-3" type="submit">Send</button>
            </div>

        </form>

        <div class="alert" :class="(this.isSend ? 'alert-success' : (this.isError ? 'alert-danger' : ''))" role="alert">
            {{ this.isSend ? 'Success Request' : (this.isError ? this.error : '') }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
#appMessageForm {
    width: 30%;
    border: 1px solid lightgray;
    border-radius: 7px;
    padding: 1.5em;
}
</style>