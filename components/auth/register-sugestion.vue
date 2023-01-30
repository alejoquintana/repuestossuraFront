<template>
    <v-layout justify-center column class="text-center">
        <h4>
            El email ingresado no está registrado.
        </h4>
        <p>¿ Todavía no tenes tu usuario <br> En {{$accessor.configs.siteName}} ?</p>
        <v-btn class="mt-4 rounded-xl rounded-br-0 " color="info" block nuxt to="/registrate" >
            REGISTRATE
        </v-btn>
    </v-layout>
</template>
