const popup = document.querySelector('.popup');
const popupYes = document.querySelector('#popup-yes');
const popupNo = document.querySelector('#popup-no');
const popupOk = document.querySelector('#popup-ok');
const popupTexto = document.getElementById("text");
const popupImage = document.querySelector('#popup-img');

// Abrir el popup al hacer clic en algún elemento
// elemento.addEventListener('click', () => {
//   popup.style.display = 'flex';
// });

// Cerrar el popup al hacer clic en el botón "Sí"
popupYes.addEventListener('click', () => {
  popup.style.display = 'none';
});

// Cerrar el popup al hacer clic en el botón "No" o en cualquier parte fuera del contenido del popup
popupNo.addEventListener('click', () => {
  popup.style.display = 'none';
});

popup.addEventListener('click', (event) => {
  if (event.target === popup) {
    popup.style.display = 'none';
  }
});


/**
* Funcion:  custom_popup brinda parametros de configuracion para mostra un stand especifico de un area
* @param {String} titulo
* @param {String} img
* @return none
*/
function custom_popup(titulo,nom_img) {
  popupNo.style.visibility = 'hidden';
  popupYes.style.visibility = 'hidden';
  popupOk.style.visibility = 'visible';
  popupImage.style.visibility = 'visible';
  popupImage.src = './static/img/visor/s'+nom_img+'plano.webp';
  popupTexto.textContent = titulo;
  //ligar funcion Yes con el cambio de stand
  popup.style.display = 'flex';

}

/**
 * @brief popup para el stand anterior
 * @param {String} titulo 
 * @return none
 */
function custom_popup_standAnterior(titulo) {
  popupNo.style.visibility = 'visible';
  popupYes.style.visibility = 'visible';
  popupImage.style.visibility = 'hidden';
  popupOk.style.visibility = 'hidden';
  popupTexto.textContent = titulo;
  popup.style.display = 'flex';

  //ligar funcion Yes con el cambio de stand
  (result)=>{
      if (result.isConfirmed){
          console.log("CONFIRME EL POPUP");
          document.getElementById("mostrarStand").style.visibility = "visible ";
          var logo = document.getElementById('rm');
          // logo.src = "./static/img/stands/s"+area_global+".webp";
          // dibujar(area_global);
          logo.src = "./static/img/stands/s"+pila.top().numero+".webp";
          dibujar(pila.top().numero);
      }
  }
}

/**
* Funcion:  custom_popup brinda parametros de configuracion para 
* @param {String} titulo
* @param {String} img
* @return none
*/
function custom_popup_Alerta(titulo) {
  popupNo.style.visibility = 'hidden';
  popupYes.style.visibility = 'hidden';
  popupOk.style.visibility = 'visible';
  popupImage.style.visibility = 'hidden';
  popupTexto.textContent = titulo;
  popup.style.display = 'flex';

}
 export {custom_popup, custom_popup_Alerta, custom_popup_standAnterior}