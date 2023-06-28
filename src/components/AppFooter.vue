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
            <div class="_wrapper-footer d-flex flex-wrap justify-content-between align-items-center py-3 my-4 px-4">

                <div class="col-md-4 d-flex align-items-center">
                    <a href="#" class=" text-decoration-none 1h-1">
                        <img class="mb-3 me-2 mb-md-0 text-muted" style="width: 20px; padding-bottom: 1em;"
                            src="../../public/img/icon.png" alt="">
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
._wrapper-footer {
    max-width: 1200px;

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