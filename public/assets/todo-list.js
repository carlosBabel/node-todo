$(document).ready(function(){

  $('form').on('submit', function(){

      var tarea = $('form input');
      var todo = {tarea: tarea.val()};

      $.ajax({
        type: 'POST',
        url: '/',
        data: todo,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  $('li').on('click', function(){
      var tarea = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/' + tarea,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});
