import { accessorType } from "~/store";
import { nuxtSocket } from "nuxt-socket-io";
import { Context } from "@nuxt/types";
import { Auth } from "@nuxtjs/auth";
import { recaptcha } from "@nuxtjs/recaptcha";
declare module "vue/types/vue" {
  interface Vue {
    $auth: typeof Auth;
    $accessor: typeof accessorType;
    $nuxtSocket: typeof nuxtSocket;
    $mq: string;
    $recaptcha: typeof recaptcha;
    /*         $auth: typeof Auth  */
  }
}

declare module "vuex/types/index" {
  interface Store<S> {
    $auth: typeof Auth;
    $accessor: typeof accessorType;
    $nuxtSocket: typeof nuxtSocket;
    $mq: string;
    $recaptcha: typeof recaptcha;
    /*      $auth: typeof Auth  */
  }
}

declare module "@nuxt/types" {
  interface NuxtAppOptions {
    $auth: typeof Auth;
    $accessor: typeof accessorType;
    $nuxtSocket: typeof nuxtSocket;
    $mq: string;
    $recaptcha: typeof recaptcha;
    /*     $auth: typeof Auth  */
  }
}
