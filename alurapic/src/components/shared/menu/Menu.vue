<template>
    <nav>
        <ul>
            <li v-for="rota in rotas">
                <!-- <router-link componente do vue-router -->
                    <!-- se definiu path o valor vai ser path se não vai ser / -->
                <router-link :to="rota.path ? rota.path : '/'">{{rota.titulo}}</router-link>
            </li>
            <!-- <li><router-link to="/cadastro">Cadastro</router-link></li> -->
        </ul>
    </nav>
</template>

<script>
export default {
    props: ['rotas']
}
</script>

<style scoped>

</style>