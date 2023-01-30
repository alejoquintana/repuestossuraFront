import swal from 'sweetalert'

export default function ({ $axios, redirect }) {
  $axios.onError(error => {
    if(error.response.status === 403) {
      if (window){
          swal('La sesión expiró','Volvé a iniciar sesión para continuar','error')
            .then(()=>{
                window.location.replace('/login')
            })
      }
    }else{
      if(window.location.href.includes('/login') || window.location.href.includes('/registrate'))return;
      if (window){
         let message = error.message ? error.message : '' ;
         swal('Ocurrió un error',error.message,'error')
      } 
    }
  })
}