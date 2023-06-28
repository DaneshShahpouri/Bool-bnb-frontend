<script>
import axios from 'axios';
import { store } from '../store.js';

export default {
    name: 'AppFooter',
    data() {
        return {
            store,
        }
    },


}
</script>
<template>
    <div class="container">

        <footer class=" py-3 border-top">
            <div class="_wrapper-footer d-flex flex-wrap align-items-center py-3 my-4 px-4">

                <div class="col-md-4 d-flex align-items-center gap-3 marker">
                    <a href="#" class=" text-decoration-none 1h-1">
                        <i class="fa-brands fa-airbnb icon"></i>
                    </a>
                    <span class="mb-3 md-md-0 text-muted">© 2023 TeamTwo Company, Inc</span>
                </div>
                <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li class="ms-3">
                        <a href="#" class="text-muted">
                            <i class="fa-brands fa-facebook"></i>
                        </a>
                    </li>
                    <li class="ms-3">
                        <a href="#" class="text-muted">
                            <i class="fa-brands fa-instagram"></i>
                        </a>
                    </li>
                    <li class="ms-3">
                        <a href="#" class="text-muted">
                            <i class="fa-brands fa-github"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    </div>
</template>
<style lang="scss" scoped>
@import '../scss/_variables';
._wrapper-footer {
    justify-content: space-between;

    max-width: 1200px;

    .marker{

        @media screen and (max-width: $mobile) {
            margin-bottom: 20px;
        }
        
        .icon{
            color: #ff5a5f;
            font-size: 2.4em;

            @media screen and (max-width: $mobile) {
                font-size: 1.8em;
            }
        }
    }


    @media screen and (max-width: $mobile) {
        justify-content: center;
    }

    ul {
        li {
            a {
                display: block;
                width: 40px;
                height: 40px;

                i {
                    font-size: 1.5em;
                }
            }
        }
    }

}
</style>