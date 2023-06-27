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
    <div class="_container">

        <div id="appMessageForm" class="my-5">
            <div class="title-container">
                <!-- <i class="fa-solid fa-envelope icon"></i> -->
                <i class="fa-regular fa-envelope icon"></i>
                <div class="title">Send a message</div>
            </div>
            <form @submit.prevent="sendMessage()">

                <!-- username -->
                <div class="mb-1">
                    <label class="mx-1" for="username">Username*</label>
                    <input type="text" name="username" id="username" minlength="3" maxlength="100"
                        class="form-control my-label" v-model="this.store.message_username" required>
                </div>

                <!-- content -->
                <div class="mb-1">
                    <label class="mx-1" for="content">Content*</label>
                    <textarea type="text" name="content" id="content" class="form-control my-label"
                        v-model="this.store.message_content" required minlength="5" maxlength="300"></textarea>
                </div>

                <!-- email -->
                <div class="mb-3">
                    <label class="mx-1" for="email">Email*</label>
                    <input type="email" name="email" id="email" class="form-control my-label"
                        v-model="this.store.message_email" required minlength="5" maxlength="100">
                </div>

                <!-- submit -->
                <div class="d-flex justify-content-center">
                    <button class="btn my-3 _btn-send" type="submit">
                        <i class="fa-solid fa-paper-plane"></i>
                    </button>
                </div>

            </form>

        </div>
        <div class="alert" :class="(this.isSend ? 'alert-success' : (this.isError ? 'alert-danger' : ''))" role="alert">
            {{ this.isSend ? 'Success Request' : (this.isError ? this.error : '') }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: row;

    width: 30%;

    #appMessageForm {

        border: 1px solid lightgray;
        border-radius: 7px;
        padding: 1.5em;
        padding-bottom: 0;

        box-shadow: 0px 6px 20px rgba($color: #000000, $alpha: 0.2);

        .title-container {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 10px;

            margin-bottom: 14px;

            .icon {
                font-size: 3em;

                color: #ff5f64;
            }

            .title {
                font-size: 1.5em;
                font-weight: bold;
            }
        }

        ._btn-send {
            padding: 8px 26px;
            border: 2px solid #ff5f64;
            border-radius: 10px;
            color: #ff5f64;

            &:hover {
                background-color: #ff5f64;
                color: white;
            }
        }
    }
}
</style>