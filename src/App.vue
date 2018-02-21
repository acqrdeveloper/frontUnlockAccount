<template>
    <section>
        <div id="app">
            <div class="container mb-5 pb-5">
                <router-view/>
            </div>
        </div>
        <footer class="sticky-footer w-100 mt-5" style="background-color: transparent !important;">
            <div class="container">
                <div class="text-center">
                    <small>Copyright © Corporación Sapia {{(new Date).getFullYear()}}</small>
                </div>
            </div>
        </footer>
    </section>
</template>

<script>

    import Search from './components/Search';
    import SelectAction from "./components/SelectAction";

    export default {
        components: {
            SelectAction,
            Search},
        name: 'app',
    }
</script>

<style>
    @import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
    @import "../node_modules/font-awesome/css/font-awesome.min.css";
    @import "assets/vendor/css/sb-admin.css";

    .card-header {
        background-color: #003348 !important;
        color: #fff !important;
    }

    body {
        background-color: #f5f5f5;
    }

    .btn-primary {
        background-color: #003348 !important;
        border-color: #003348 !important;
    }
    .btn-primary:focus {
        box-shadow: 0 0 0 0.2rem rgba(0, 49, 75, 0.5) !important;
    }
</style>
