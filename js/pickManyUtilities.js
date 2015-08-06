
	//Inicializa una actividad drag and drop donde a cada drop solo le corresponde un drag

	function inicializarPickMany(sym){
		var stage = $(sym.getComposition().getStage().ele);
		stage.prop("intentos_previos", 0);
		stage.prop("blocked", false);
		
		$.getJSON( "config.json", function( data ) {
		  $.each( data, function( key, val ) {
			stage.prop(key, val);
		  });
		}).done(function() {
	
		var cont=0;
		$.each( stage.prop("picks"), function( key, val ) {
			cont++;
		  });

                inicializarPicks(sym);
		stage.prop("cantidad_picks", cont);
		enviarEventoActividadTerminada(sym);
	  });
	}
        
        //**********************************************************************************
        
        function inicializarPicks(sym){
            
            var stage = $(sym.getComposition().getStage().ele);
            var objPicks = stage.prop("picks");
            var CANTIDAD_PICKS = stage.prop("cantidad_picks");
            
            for(var i=1; i<=CANTIDAD_PICKS; i++){
                var pickObj = sym.$("PICK_"+i);
                var esRespuesta = false;
                if(objPicks[i].hasOwnProperty("esRespuesta")){
                    esRespuesta = objPicks[i].esRespuesta;
                }
                pickObj.prop("selected", false);
                pickObj.prop("esRespuesta", esRespuesta);
                pickObj.prop("correct", !esRespuesta);
            }
        }
        
        //**********************************************************************************
        
        function seleccionarPick(sym, nombrePick){
            var pickObj = sym.$(nombrePick);
            var boolSelected = pickObj.prop("selected");
            
            if(boolSelected){
                sym.getSymbol(nombrePick).play("normal");
            }
            else{
                sym.getSymbol(nombrePick).play("seleccionado");
            }
            
            pickObj.prop("selected", !boolSelected);
            pickObj.prop("correct", pickObj.prop("esRespuesta") === pickObj.prop("selected"));
        }