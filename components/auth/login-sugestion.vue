<template>
    <v-layout justify-center column class="text-center">
        <h4>El mail ingresado YA esta registrado!</h4>
        <p>¿ Ya tenés tu usuario <br> en {{$accessor.configs.siteName}}?</p>
        <v-btn class="mt-4 rounded-xl rounded-br-0 " :color="$accessor.helpers.colors.secondary" block to="/login" nuxt>
            INGRESA
        </v-btn>
    </v-layout>
</template>
