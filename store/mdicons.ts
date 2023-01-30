import { RootState } from "~/store";

import Vue from "vue";
import { getterTree, mutationTree, actionTree } from "typed-vuex";

import {
        mdiCrop,
        mdiBroom,
        mdiDelete,
        mdiEmoticonExcitedOutline,
        mdiAccountPlus,
        mdiSearchWeb,
        mdiMenuDown,
        mdiTrashCan,
        mdiTextSearch,
        mdiFilePdf,
        mdiFilter,
        mdiClock,
        mdiHome,
        mdiHandshake,
        mdiCurrencyUsd,
        mdiHuman,
        mdiTruck,
        mdiCloseThick,
        mdiRadioboxBlank,
        mdiRadioboxMarked,
        mdiPause,
        mdiPlay,
        mdiEye,
        mdiShopping,
        mdiStar,
        mdiContentCopy,
        mdiYoutube,
        mdiAccountOutline,
        mdiAccountCircle,
        mdiCartOutline,
        mdiCartVariant,
        mdiLogout,
        mdiInformationOutline,
        mdiBookInformationVariant,
        mdiPencil,
        mdiCart,
        mdiInformation,
        mdiCheck,
        mdiCheckCircle,
        mdiFacebookMessenger,
        mdiFacebook,
        mdiWhatsapp,
        mdiInstagram,
        mdiImageMultiple,
        mdiTelegram,
        mdiPinterest,
        mdiChevronRight,
        mdiChevronLeft,
        mdiChevronUp,
        mdiChevronDown,
        mdiBell,
        mdiBellRing,
        mdiHeart,
        mdiPhone,
        mdiCellphone,
        mdiClose,
        mdiMenu,
        mdiEmailOutline,
        mdiAccount,
        mdiEmail,
        mdiUpload,
        mdiArrowLeft,
        mdiArrowRight,
        mdiPlus,
        mdiCog,
        mdiMapMarker,
        mdiMapMarkerOutline,
        mdiMinus,
        mdiInformationVariant,
        mdiAlert,
        mdiMagnify,
        mdiCreditCard,
        mdiFileCertificateOutline,
        mdiTruckFastOutline,
        mdiCashMultiple,
      } from '@mdi/js'

export type Icon =
  | "mdiTrashCan"
  | "mdiCrop"
  | "mdiBroom"
  | "mdiDelete"
  | "mdiMenuDown"
  | "mdiSearchWeb"
  | "mdiAccountPlus"
  | "mdiFilePdf"
  | "mdiFilter"
  | "mdiClock"
  | "mdiHome"
  | "mdiHandshake"
  | "mdiCurrencyUsd"
  | "mdiHuman"
  | "mdiTruck"
  | "mdiCloseThick"
  | "mdiRadioboxBlank"
  | "mdiRadioboxMarked"
  | "mdiTextSearch"
  | "mdiShopping"
  | "mdiEye"
  | "mdiStar"
  | "mdiContentCopy"
  | "mdiYoutube"
  | "mdiAccountOutline"
  | "mdiAccountCircle"
  | "mdiEmoticonExcitedOutline"
  | "mdiCartOutline"
  | "mdiCartVariant"
  | "mdiShopping"
  | "mdiLogout"
  | "mdiPause"
  | "mdiPlay"
  | "mdiInformationVariant"
  | "mdiCart"
  | "mdiInformation"
  | "mdiCheck"
  | "mdiCheckCircle"
  | "mdiBookInformationVariant"
  | "mdiPencil"
  | "mdiWhatsapp"
  | "mdiPinterest"
  | "mdiFacebook"
  | "mdiFacebookMessenger"
  | "mdiInstagram"
  | "mdiImageMultiple"
  | "mdiChevronRight"
  | "mdiChevronLeft"
  | "mdiChevronUp"
  | "mdiChevronDown"
  | "mdiBell"
  | "mdiBellRing"
  | "mdiHeart"
  | "mdiPhone"
  | "mdiCellphone"
  | "mdiClose"
  | "mdiMenu"
  | "mdiEmailOutline"
  | "mdiAccount"
  | "mdiEmail"
  | "mdiUpload"
  | "mdiArrowLeft"
  | "mdiArrowRight"
  | "mdiPlus"
  | "mdiCog"
  | "mdiMapMarker"
  | "mdiMapMarkerOutline"
  | "mdiMinus"
  | "mdiAlert"
  | "mdiCreditCard"
  | "mdiFileCertificateOutline"
  | "mdiTruckFastOutline"
  | "mdiCashMultiple"
  | "mdiMagnify";

/* STATE */
export const state = () => {
  return {
    mdicons: {
      mdiCrop,
      mdiBroom,
      mdiDelete,
      mdiMenuDown,
      mdiHuman,
      mdiSearchWeb,
      mdiAccountPlus,
      mdiTruck,
      mdiCloseThick,
      mdiRadioboxBlank,
      mdiRadioboxMarked,
      mdiHandshake,
      mdiCurrencyUsd,
      mdiHome,
      mdiClock,
      mdiFilePdf,
      mdiFilter,
      mdiTextSearch,
      mdiTrashCan,
      mdiPause,
      mdiPlay,
      mdiLogout,
      mdiCartOutline,
      mdiCartVariant,
      mdiEmoticonExcitedOutline,
      mdiEye,
      mdiShopping,
      mdiTelegram,
      mdiStar,
      mdiContentCopy,
      mdiYoutube,
      mdiAccountOutline,
      mdiAccountCircle,
      mdiInformationOutline,
      mdiBookInformationVariant,
      mdiPencil,
      mdiCart,
      mdiInformation,
      mdiCheck,
      mdiCheckCircle,
      mdiWhatsapp,
      mdiFacebookMessenger,
      mdiFacebook,
      mdiInstagram,
      mdiImageMultiple,
      mdiPinterest,
      mdiChevronRight,
      mdiChevronLeft,
      mdiChevronUp,
      mdiChevronDown,
      mdiBell,
      mdiBellRing,
      mdiHeart,
      mdiPhone,
      mdiCellphone,
      mdiClose,
      mdiMenu,
      mdiEmailOutline,
      mdiAccount,
      mdiEmail,
      mdiUpload,
      mdiArrowLeft,
      mdiArrowRight,
      mdiPlus,
      mdiCog,
      mdiMapMarker,
      mdiMapMarkerOutline,
      mdiMinus,
      mdiInformationVariant,
      mdiAlert,
      mdiMagnify,
      mdiCreditCard,
      mdiFileCertificateOutline,
      mdiTruckFastOutline,
      mdiCashMultiple,
    }
  };
};

export type catalogoState = ReturnType<typeof state>;

/* GETTERS */
export const getters = getterTree(state, {
  getMdicons(state):any{
    return state.mdicons
  },
  getIcon: (state) => (icon:string):any => {
    let iconStr = (icon as Icon) ;
    return state.mdicons[iconStr] ;
  }
});

/* MUTATIONS */
/* export const mutations = mutationTree(state, {

}); */
