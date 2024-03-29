import Vue from 'vue';

Vue.filter('price', value => {
  if(!value)return 0;
  if (value % 1 != 0) {
    value = value.toFixed(2);
  }
  value =  value;
  value = value.toString().replace('.',',');
  value = value.split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
  value = value.split('').reverse().join('').replace(/^[\.]/, '');
  return value
});



Vue.filter('text', value => {
  if (value) {
    value = value.replace(/\n/g, "<br>");
    return value.trim();
  }
});

Vue.filter('datetime', val => {

    let date = new Date(val);
    let minuts = date.getMinutes();
    if (minuts < 10){minuts = `0${minuts}`}
    let formatted_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + ' / ' + date.getHours() + ":" + minuts
    return formatted_date;
  
});

Vue.filter('date', val => {
    let date = new Date(val);
    let minuts = date.getMinutes();
    if (minuts < 10) {
      minuts = `0${minuts}`
    }
    let formatted_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    return formatted_date;
  
});


Vue.filter('slug', str => {

  if (typeof str != 'string') {
    return str;
  }

  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
});

Vue.filter('ucFirst', (string) => {
  if(!string)return;
  return string.charAt(0).toUpperCase() + string.slice(1);
})
Vue.filter('uc', (string) => {
  if(!string)return;
  return string.toUpperCase();
})