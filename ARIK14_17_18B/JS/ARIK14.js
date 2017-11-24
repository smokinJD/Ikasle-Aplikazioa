var opcion= "";
$(document).ready(function() {
    $('#zonaIkasle').hide();
            $('#zonaModulo').hide();
            $('#zonaConsulta').hide();
        esconder();
    
    // GESTION DE IKASLEAK 
    $('#ikasleBerria').click(function(){
            esconder();
            vaciar();
            $('#zonaIkasle').show();
            funcionModulosInsertarIkasle();
            opcion="ikasleGuardarBerria";
            $('.valores').attr("disabled", false);
            return false;
          });
    $('#ikasleAldatu').click(function(){
            esconder();
            vaciar();
           $('#zonaIkasle').show();
           $('#ikasleNombresTodos').show();
           $('.valores').attr("disabled", false);
           CargarComboIkasleak();
            opcion="ikasleGuardarAldatu";
            return false;
          });
    $('#ikasleKendu').click(function(){
            esconder();
            vaciar();
            $('.valores').val("");
            $('#zonaIkasle').show();
            $('#ikasleNombresTodos').show();
             $('.valores').attr("disabled", true);
             CargarComboIkasleak();
              opcion="ikasleGuardarKendu";
             
            return false;
          });    
    $('#ikasleBilatu').click(function(){
            esconder();
            vaciar();
            $('#zonaIkasle').show();
             CargarComboIkasleak();
            opcion="ikasleGuardarBilatu";
              $('#ikasleNombresTodos').show();
              $('.valores').attr("disabled", true);
              alert('ikasle bilatu');
           return false;
          });
     $('#ikasleGuardar').click(function(){
           switch(opcion){
             case "ikasleGuardarBerria":
                funcionIkasleBerria();
                break;
            case "ikasleGuardarAldatu":
                 funcionIkasleAldatu();
                break;
            case "ikasleGuardarKendu":
                funcionIkasleKendu();
                break;
            case "ikasleGuardarBilatu":
                funcionIkasleBilatu();
                break;
                    }
             });
        
    $('#ikasleNombresTodos').change(function(){
         
              MiId=$('#ikasleNombresTodos').val();
              MiNombre=$('#ikasleNombresTodos option:selected').html();
              MiEdad=$('#ikasleNombresTodos option:selected').attr('data-edad');
              MiCurso=$('#ikasleNombresTodos option:selected').attr('data-curso');
              
              $('#ikasleId').val(MiId);
              $('#ikasleNombre').val(MiNombre);
              $('#ikasleEdad').val(MiEdad);
              $('#ikasleCurso').val(MiCurso);
    });
      //funciones de gestion de ikasleak     
           
           function funcionIkasleBerria(){
              MiNombre = $('#ikasleNombre').val();
              MiEdad = $('#ikasleEdad').val();
              MiCurso = $('#ikasleCurso').val();
              
              arrayModulos = [];
              $('.elegidos').each(function(index){
                  modulo = $(this).attr("value");
                  item = {};
                  item ['id_modulo'] = modulo;
                  arrayModulos.push(item);
                  
              });
              
              var json = {"Nombre":MiNombre,"Edad":MiEdad,"Curso":MiCurso,arrayModulos};
              var jsonModulos = JSON.stringify(json);
              
              alert (jsonModulos);
              
              
              $.ajax({
               type:'POST',
               data:{data:jsonModulos},
               dstaType:'json',
              url:"../controlador/controlador_insertar_ikasle.php",
            success:function(datos) {
                alert("Se ha insertado con exito")
                alert(datos)
                }, 
                error: function(xhr){
                alert("An error occured: " + xhr.status + " " + xhr.statusText);  
             }  
             });                 
                 esconder();
                 vaciar();
          }
                    
           function funcionIkasleAldatu(){
               MiId = $('#ikasleId').val();
               MiNombre = $('#ikasleNombre').val();
              MiEdad = $('#ikasleEdad').val();
              MiCurso = $('#ikasleCurso').val();
              $.ajax({
               type:'POST',
               data:"submit=&id="+MiId+"&Nombre="+MiNombre+"&Edad="+MiEdad+"&Curso="+MiCurso,
               dstaType:'json',
              url:"../controlador/controlador_insertar_ikasle.php",
            success:function(datos) {
                alert("Se ha insertado con exito")
                alert(datos)
                }, 
                error: function(xhr){
                alert("An error occured: " + xhr.status + " " + xhr.statusText);  
             }  
             });                 
                 esconder();
                 vaciar();
          };
          
           function funcionIkasleKendu(){
              
                $('#ikasleNombresTodos').show();
              MiId=$('#ikasleNombresTodos').val();
              confirmar = confirm("Seguro que desea borrar el registro? ");
              if(!confirmar){ return false}
               $.ajax({
               type:'POST',
              data:{data:MiId},
              dstaType:'json',
              url:"../controlador/controlador_borrar_ikasle.php",
            success:function(datos) {
               alert("Se ha eliminado con exito");
               
                }, 
                error: function(xhr){
                alert("An error occured: " + xhr.status + " " + xhr.statusText);  
             }  
             });                 
                  $('.valores').attr("disabled", false);
               esconder();
               vaciar();   
           };
           
           function funcionIkasleBilatu(){};
           
           function CargarComboIkasleak(){
               $('#ikasleNombresTodos').html("");
               $.ajax({
                 type:'POST',
                 dstaType:'json',
                 url:"../controlador/controlador_consulta_ikasleak.php",
              success:function(datos) {
                 //alert(datos)
                  midato=JSON.parse(datos)
                   micombo="";    
               $.each( midato, function(i,dato) {
	        micombo+="<option value='"+dato.id+"' data-edad='"+dato.Edad+"' data-curso='"+dato.Curso+"' data-nombre='"+dato.Nombre+"'>"+dato.Nombre+"</option>";
		            });
            	//alert(micombo)
                $('#ikasleNombresTodos').append(micombo);
                return false;
               }, 
             error: function(xhr){
                     alert("An error occured: " + xhr.status + " " + xhr.statusText);  
                    }           
            });
             };
             
             function funcionModulosInsertarIkasle(){
         $('#zonaIkasleModulo').html(' ');
                $.ajax({
                     type:'POST',
                      dstaType:'json',
                       url:"../controlador/controlador_consulta_modulo.php",
            success:function(datos) {
                alert(datos);
               var tabla="<table>";
               tabla+="<th>Modulos Disponibles</th>\n\
               <th>Modulos seleccionados</th>";
               midato=JSON.parse(datos);
               cursos =" ";    
             $.each( midato, function(i,dato) {
	        cursos += "<p value='"+dato.id_modulo+"' class='disponibles'>"+dato.Nombre+"</p>";
            });
                tabla+="<tr>";
                tabla+="<td class='disponibles'>"+cursos+"</td>";
		tabla+="<td class='seleccionados'></td>";
                 tabla+="</tr>";
            	tabla+="</table>";
                alert(tabla);
                $('#zonaIkasleModulo').append(tabla).hide().fadeIn('slow');
                return false;
            }, 
        error: function(xhr){
                alert("An error occured: " + xhr.status + " " + xhr.statusText);  
             }           
             });	
         };
         
         
         $('#zonaIkasleModulo').on("click", "p", function(){
              if ($(this).attr("class") === "disponibles"){
                $(this).appendTo("td.seleccionados");
                $(this).attr("class", "elegidos");
              }else{
                  $(this).prependTo("td.disponibles");
                  $(this).attr("class", "disponibles");
              }
         });
          
    //MODULUEN GESTIOA
    $('#moduloBerria').click(function(){
            esconder();
            vaciar();
            $('#zonaModulo').show();
            $('.valores').attr("disabled", false);
            opcion="moduloGuardarBerria";
            return false;
          });
    $('#moduloAldatu').click(function(){
            esconder();
            vaciar();
            $('#zonaModulo').show();
            $('#moduloNombresTodos').show();
            $('.valores').attr("disabled", false);
            opcion="moduloGuardarAldatu";
            CargarComboModuluak();
           return false;
          });
    $('#moduloKendu').click(function(){
            esconder();
            vaciar();
            $('#zonaModulo').show();
            $('#moduloNombresTodos').show();
            $('.valores').attr("disabled", true);
            CargarComboModuluak();
            opcion="moduloGuardarKendu";
           alert('modulokendu');
            return false;
          });
    $('#moduloBilatu').click(function(){
            esconder();
            vaciar();
            $('#zonaModulo').show();
            alert('modulobilatu');
            $('#moduloNombresTodos').show();
            $('.valores').attr("disabled", true);
            CargarComboModuluak();
           return false;
          });
          
    $('#moduloGuardar').click(function(){
           switch(opcion){
             case "moduloGuardarBerria":
                funcionModuloBerria();
                break;
            case "moduloGuardarAldatu":
                 funcionModuloAldatu();
                break;
            case "moduloGuardarKendu":
                funcionModuloKendu();
                break;
            case "ikasleGuardarBilatu":
                funcionIkasleBilatu();
                break;
                    }
    });
    
    //funciones de gestion de modulos     
           
           $('#moduloNombresTodos').change(function(){
         
              MiId=$('#moduloNombresTodos').val();
              MiNombre=$('#moduloNombresTodos option:selected').html();
              MiCurso=$('#moduloNombresTodos option:selected').attr('data-curso');
              
              $('#moduloId').val(MiId);
              $('#moduloNombre').val(MiNombre);
              $('#moduloCurso').val(MiCurso);
    });
    
           function funcionModuloBerria(){
              MiNombre = $('#moduloNombre').val();
              MiCurso = $('#moduloCurso').val();
              $.ajax({
               type:'POST',
               data:"submit=&Nombre="+MiNombre+"&Curso="+MiCurso,
               dstaType:'json',
              url:"../controlador/controlador_insertar_modulo.php",
            success:function(datos) {
                alert("Se ha insertado con exito");
                alert(datos);
                }, 
                error: function(xhr){
                alert("An error occured: " + xhr.status + " " + xhr.statusText);  
             }  
             });                 
                 esconder();
                 vaciar();
          };
          
          function funcionModuloAldatu(){
               MiId = $('#moduloId').val();
               MiNombre = $('#moduloNombre').val();
               MiCurso = $('#moduloCurso').val();
              $.ajax({
               type:'POST',
               data:"submit=&id="+MiId+"&Nombre="+MiNombre+"&Curso="+MiCurso,
               dstaType:'json',
              url:"../controlador/controlador_modificar_modulo.php",
            success:function(datos) {
                alert("Se ha modificado con exito");
                alert(datos);
                }, 
                error: function(xhr){
                alert("An error occured: " + xhr.status + " " + xhr.statusText);  
             }  
             });                 
                 esconder();
                 vaciar();
          };
          
          function funcionModuloKendu(){
              
                $('#moduloNombresTodos').show();
              MiId=$('#moduloNombresTodos').val();
              confirmar = confirm("Seguro que desea borrar el registro? ");
              if(!confirmar){ return false}
               $.ajax({
               type:'POST',
              data:{data:MiId},
              dstaType:'json',
              url:"../controlador/controlador_borrar_modulo.php",
            success:function(datos) {
               alert("Se ha eliminado con exito");
               
                }, 
                error: function(xhr){
                alert("An error occured: " + xhr.status + " " + xhr.statusText);  
             }  
             });                 
               $('.valores').attr("disabled", false);
               esconder();
               vaciar();
           };
          
          function CargarComboModuluak(){
               $('#moduloNombresTodos').html("");
               $.ajax({
                 type:'POST',
                 dstaType:'json',
                 url:"../controlador/controlador_consulta_modulo.php",
              success:function(datos) {
                 //alert(datos)
                midato=JSON.parse(datos);
                micombo="";    
                $.each( midato, function(i,dato) {
	        micombo+="<option value='"+dato.id_modulo+"' data-curso='"+dato.Curso+"' data-nombre='"+dato.Nombre+"'>"+dato.Nombre+"</option>";
		});
            	//alert(micombo)
                $('#moduloNombresTodos').append(micombo);
                return false;
               }, 
             error: function(xhr){
                     alert("An error occured: " + xhr.status + " " + xhr.statusText);  
                    }           
            });
            };
    // GESTION DE CONSULTAS
   $('#kontsultaIkasleak').click(function(){
            esconder();
            $('#zonaConsulta').show();
           alert('kontsulta ikasleak');
            funcionKontsultaIkasleak();
           return false;
          });
    $('#kontsultaModuluak').click(function(){
            esconder();
            $('#zonaConsulta').show();
           alert('kontsulta moduluak');
          funcionKontsultaModuluak();
           return false;
          });
    $('#kontsultaIkasleModulo').click(function(){
            esconder();
            $('#zonaConsulta').show();
           alert('kontsulta moduluak ikasleak');
          
           return false;
          });
    //funciones consultas
    
    function funcionKontsultaIkasleak(){
         $('#zonaConsulta').html(' ');
                $.ajax({
                     type:'POST',
                      dstaType:'json',
                       url:"../controlador/controlador_consulta_ikasleak.php",
            success:function(datos) {
                alert(datos);
               var tabla="<table>";
               tabla+="<th class='id'>Registro</th>\n\
               <th class='nombre'>Nombre</th><th class='nombre'>Edad</th>\n\
               <th class='numerico'>Curso</th><th class='nombre'>Opciones</th>";
               midato=JSON.parse(datos);
                         
             $.each( midato, function(i,dato) {
	        tabla+="<tr>";
                tabla+="<td class='id'>"+dato.id+"</td>";
		tabla+="<td class='numerico'>"+dato.Nombre+"</td>";
                tabla+="<td class='numerico'>"+dato.Edad+"</td>";
                 tabla+="<td class='numerico'>"+dato.Curso+"</td>";
                 tabla+="<td class='nombre'><input type='button' value='editar' class='editar' data-id='"+dato.id+"'>";
		 tabla+="<input type='button' value='borrar' class='borrar' data-id='"+dato.id+"'></td>";
                 tabla+="</tr>";
            });
            	tabla+="</table>";
                alert(tabla);
                $('#zonaConsulta').append(tabla).hide().fadeIn('slow');
                return false;
            }, 
        error: function(xhr){
                alert("An error occured: " + xhr.status + " " + xhr.statusText);  
             }           
             });	
         };
         
         function funcionKontsultaModuluak(){
         $('#zonaConsulta').html(' ');
                $.ajax({
                     type:'POST',
                      dstaType:'json',
                       url:"../controlador/controlador_consulta_modulo.php",
            success:function(datos) {
                alert(datos);
               var tabla="<table>";
               tabla+="<th class='id'>Registro</th>\n\
               <th class='nombre'>Nombre</th>\n\
               <th class='numerico'>Curso</th><th class='nombre'>Opciones</th>";
               midato=JSON.parse(datos);
                         
             $.each( midato, function(i,dato) {
	        tabla+="<tr>";
                tabla+="<td class='id'>"+dato.id_modulo+"</td>";
		tabla+="<td class='numerico'>"+dato.Nombre+"</td>";
                 tabla+="<td class='numerico'>"+dato.Curso+"</td>";
                 tabla+="<td class='nombre'><input type='button' value='editar' class='editar' data-id='"+dato.id_modulo+"'>";
		 tabla+="<input type='button' value='borrar' class='borrar' data-id='"+dato.id_modulo+"'></td>";
                 tabla+="</tr>";
            });
            	tabla+="</table>";
                alert(tabla);
                $('#zonaConsulta').append(tabla).hide().fadeIn('slow');
                return false;
            }, 
        error: function(xhr){
                alert("An error occured: " + xhr.status + " " + xhr.statusText);  
             }           
             });	
         };
      
      
    
    
    //funciones generales
     function esconder(){
            $('#zonaIkasle').hide();
            $('#zonaModulo').hide();
            $('#zonaConsulta').hide();
            $('#ikasleNombresTodos').hide();
            $('#moduloNombresTodos').hide();
          }
          
    function vaciar(){
        $('input:text').val("");
    }
    });
    
    
    
/*$("#boton").click(function() {
  var opcion=$('#modulo').val();
  $('#zona').html(' ')
	$.ajax({
            type:'POST',
              data:{data:opcion},
              dstaType:'json',
              url:"../controlador/controlador_consulta.php",
            success:function(datos) {
                alert(datos)
               if(datos.length==4){
                    alert('no hay datos');
                    return;
                     }
               var tabla="<table >";
               tabla+="<tr><th class='id'>Registro</th>\n\
               <th class='nombre'>Nombre</th><th class='numerico'>Edad</th>\n\
               <th class='numerico'>Curso</th><th class='nombre'>Modulo</th></tr>"
              // if (typeof datos == "string")
              midato=JSON.parse(datos)
             //alert(midato[0].Nombre)
             
             $.each( midato, function(i,dato) {
	        tabla+="<tr>";                tabla+="<td class='id'>"+dato.id+"</td>";
		tabla+="<td class='nombre'>"+dato.Nombre+"</td>";
                tabla+="<td class='numerico'>"+dato.Edad+"</td>";
                tabla+="<td class='numerico'>"+dato.Curso+"</td>";
                tabla+="<td class='nombre'>"+dato.Modulo+"</td>";
		tabla+="</tr>";
            });
            	tabla+="</table>";
                alert(tabla)
                $('#zona').append(tabla).hide().fadeIn('slow');
            }, 
        error: function(xhr){
                alert("An error occured: " + xhr.status + " " + xhr.statusText);  
             }           
                    
        });	
                        
                
            
	});*/
        
  /*$("#froga").click(function() {
  nuevodato={"id":"1","name":"ana","gender":"aaaa","email":"ana@aaa.com","picture":"img/img.jpg"}
  alert(nuevodato)
 //nuevaopcion={"accion":"baja"}
        datos=JSON.stringify(nuevodato);
      //  opcion=JSON.stringify(nuevaopcion);
        alert(datos)
    //    alert(opcion)
        alert("antes de ir")
   var qwe = $.param({loquemando: datos});
	$.ajax({
            type:'POST',
              data:qwe,
              dstaType:'json',
              url:"EJERCICIOBDfroga.php",
            //   headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            success:function(data) {
                alert("he vuelto")
                alert(data)
               
               
              
            
            }, 
        error: function(xhr){
                alert("An error occured: " + xhr.status + " " + xhr.statusText);  
             }           
                    
        });	
                        
             
            
	});   */      
        


