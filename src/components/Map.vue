<script>

import { store } from '../store.js';

export default {
    name: 'Map',
    data() {
        return {
            store,
        }
    },

    mounted() {

        this.MapCreation()

    },


    methods : {

            MapCreation() {

            var map = tt.map({
            key: "8AyhtFuGo44d57QodNOzeOGIsIaJsEq5",
            container: "map",
            })
    

        },


    }
}

</script>

<template>
<div class="container" style="height: 500px;">
    <div id="map" style="width: 100% ; height: 100%; "></div>
</div>


</template>

<style lang="scss" scoped>

#map {

    object-fit: cover;
    

}

</style>