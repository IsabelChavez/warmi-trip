$(document).ready(function() {
  // Obteniendo el UID del localStorage
  var UID = window.localStorage.getItem('storageUID');
  // Obteniendo la fecha actual
  var d = new Date();
  var $date = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();

  // Leyendo los datos del usuario
  firebase.database().ref('bd').on('value', function(data) {
    var user = data.val();
  });


  // Guardando en el localstorage la ciudad que se elije
  $('.btn-plan').click(function() {
    window.localStorage.setItem('city', $('#select-ciudad').val());
    window.location.href = 'planning.html'
    
  });

  // Obteniendo imagenes del input file
  $('#btn-save-file').click(function() {
    var $fileName = document.getElementById('txt-file').files[0]['name'];

    var $description = $('#txt-description').val();
    // Guardando los posts en el muro
    $('#container-post').append('<img class="img-responsive img-rounded post-foto center-block" src="../assets/img/' + $fileName + '">');

    $('#container-post').append('<p class="text-center">' + $description + '</p>');
    // Guardando los posts en la base de datos - fotos
    firebase.database().ref('posts/' + UID).push(

      {
        photo: $fileName,
        description: $description,
        date: $date
      });
    $(this).hide();
  });
  // Guardando los posts en la base de datos .posts
  $('#btn-save-post').click(function() {
    var $post = $('#txt-post').val();

    $('#container-post').append('<p class="text-center">' + $post + '</p>');
    firebase.database().ref('posts/' + UID).push({
      publish: $post,
      date: $date

    });

    $(this).hide();
  });
}); 