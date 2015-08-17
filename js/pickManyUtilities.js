//<editor-fold defaultstate="collapsed" desc="Parent example">
/*
 parent.$(parent.document).on("EDGE_Plantilla_creationComplete", function (data) {
 $("body").trigger({
 type: "EDGE_Recurso_sendPreviousData",
 block: false,
 timer: {"remaining_time": 9, "current_state": "10"},
 previous_data: {"selected": []},
 attempts: 0,
 sym: data.sym
 });
 });
 
 parent.$(parent.document).on("EDGE_Plantilla_submitApplied", function (data) {
 
 console.log(data);
 
 var this_block = false;
 var this_show_answers = false;
 
 var intentos = data.attempts + 1;
 
 if (intentos >= data.attempts_limit) {
 this_block = true;
 this_show_answers = true;
 }
 
 $("body").trigger({
 type: "EDGE_Recurso_postSubmitApplied",
 block: this_block,
 show_answers: this_show_answers,
 attempts: intentos,
 timer: {"timerObj": data.timer.timerObj, "reset_timer": true},
 sym: data.sym
 });
 });
 */
//</editor-fold>


//***********************************************************************

//Evento que se dispara después de que el controlador recibe y transforma los resultados de una interacción.

$("body").on("EDGE_Recurso_postSubmitApplied", function (data) {

    var stage = $(data.sym.getComposition().getStage().ele);

    if (data.show_answers) {
        mostrarRespuestasPickMany(data.sym);
    }

    if (data.block) {
        stage.prop("blocked", true);
        deshabilitarPickManys(data.sym);

        if (stage.prop("usa_timer")) {
            stopTimer(data.sym);
        }
    } else {
        if (stage.prop("usa_timer")) {
            if (data.timer.reset_timer) {
                resetTimer(data.sym);
            }
        }
    }

    stage.prop("intentos_previos", data.attempts);
});

$("body").on("EDGE_Recurso_sendPreviousData", function (data) {
    inicializarPickMany(data.sym);
    var stage = $(data.sym.getComposition().getStage().ele);
    aplicarCambiosPreviosPickMany(data.previous_data, data.sym);

    if (data.block) {
        stage.prop("blocked", true);
        deshabilitarPickManys(data.sym);
        if (stage.prop("usa_timer")) {
            setHTMLTimer(data.timer.remaining_time, data.sym);
            cambiarEstadoTimer(data.sym, data.timer.current_state);
        }
    }

    stage.prop("intentos_previos", data.attempts);

});

//***********************************************************************


//Inicializa una actividad drag and drop donde a cada drop solo le corresponde un drag

function inicializarPickMany(sym) {
    var stage = $(sym.getComposition().getStage().ele);
    stage.prop("interaction_type", "choice");
    stage.prop("intentos_previos", 0);
    stage.prop("blocked", false);

    $.getJSON("config.json", function (data) {
        $.each(data, function (key, val) {
            stage.prop(key, val);
        });
    }).done(function () {

        var cont = 0;
        $.each(stage.prop("picks"), function (key, val) {
            cont++;
        });
        stage.prop("cantidad_picks", cont);
        inicializarPicks(sym);
        stage.prop("usa_timer", !isEmpty(stage.prop("timer")));
        //enviarEventoActividadTerminada(sym);
    });
}

//**********************************************************************************

function inicializarPicks(sym) {

    var stage = $(sym.getComposition().getStage().ele);
    var objPicks = stage.prop("picks");
    var CANTIDAD_PICKS = stage.prop("cantidad_picks");
    var contRespuestas = 0;
    for (var i = 1; i <= CANTIDAD_PICKS; i++) {
        var pickObj = sym.$("PICK_" + i);
        var esRespuesta = false;
        if (objPicks[i].hasOwnProperty("esRespuesta")) {
            esRespuesta = objPicks[i].esRespuesta;
            if (esRespuesta) {
                contRespuestas++;
            }
        }

        pickObj.prop("selected", false);
        pickObj.prop("esRespuesta", esRespuesta);
        pickObj.prop("correct", !esRespuesta);
        pickObj.prop("descripcion", objPicks[i].descripcion);
        pickObj.prop("nombre", "PICK_" + i);
        pickObj.prop("current_state", "normal");
    }

    if (contRespuestas > 1) {
        stage.prop("tipo", "many");
    }
    else {
        stage.prop("tipo", "one");
    }
}

//**********************************************************************************

function pickClickeado(sym, nombrePick) {
    var stage = $(sym.getComposition().getStage().ele);
    if (!stage.prop("blocked")) {

        switch (stage.prop("tipo")) {
            case "one":
            {
                var CANTIDAD_PICKS = stage.prop("cantidad_picks");
                for (var i = 0; i <= CANTIDAD_PICKS; i++) {
                    if (nombrePick !== "PICK_" + i) {
                        deseleccionarPick(sym, "PICK_" + i);
                    }
                    else {
                        seleccionarPick(sym, nombrePick);
                    }
                }
                break;
            }

            case "many":
            {
                seleccionarPick(sym, nombrePick);
                break;
            }
        }
    }
}

//**********************************************************************************

function seleccionarPick(sym, nombrePick) {
    var stage = $(sym.getComposition().getStage().ele);
    if (stage.prop("tipo") === "many" || (stage.prop("tipo") === "one" && !sym.$(nombrePick).prop("selected"))) {
        var pickObj = sym.$(nombrePick);
        var boolSelected = pickObj.prop("selected");
        if (boolSelected) {
            cambiarEstadoPick(sym, nombrePick, "hover");
        }
        else {
            cambiarEstadoPick(sym, nombrePick, "seleccionado")
        }

        pickObj.prop("selected", !boolSelected);
        pickObj.prop("correct", pickObj.prop("esRespuesta") === pickObj.prop("selected"));
    }
}

//**********************************************************************************

function deseleccionarPick(sym, nombrePick) {
    var pickObj = sym.$(nombrePick);
    if (pickObj.prop("selected")) {
        pickObj.prop("selected", false);
        cambiarEstadoPick(sym, nombrePick, "normal")
        pickObj.prop("correct", pickObj.prop("esRespuesta") === pickObj.prop("selected"));
    }
}

//**********************************************************************************

function cambiarEstadoPick(sym, nombrePick, new_state) {
    var pickObj = sym.$(nombrePick);
    if (pickObj.prop("current_state") !== new_state) {
        sym.getSymbol(nombrePick).play(new_state);
        pickObj.prop("current_state", new_state);
    }
}

//**********************************************************************************

function checkAnswersPickMany(sym) {

    var stage = $(sym.getComposition().getStage().ele);
    if (!stage.prop("blocked")) {
        var CANTIDAD_PICKS = stage.prop("cantidad_picks");
        var respuesta = {"selected": []};
        var correct = true;

        for (var i = 1; i <= CANTIDAD_PICKS; i++) {
            var pickObj = sym.$("PICK_" + i);

            if (!pickObj.prop("correct")) {
                correct = false;
            }

            if (pickObj.prop("selected")) {
                respuesta.selected.push(pickObj.prop("nombre") + "_(" + pickObj.prop("nombre") + ")");
            }
        }

        var timer = {};
        if (stage.prop("usa_timer")) {
            var timerObj = buscar_sym(sym, stage.prop("timer"), true);
            timer.remaining_time = timerObj.prop("segundos_restantes");
            timer.current_state = timerObj.prop("alertState");
        } else {
            //timer.timerObj = null;
            timer.remaining_time = null;
            timer.current_state = null;
        }
        //timer.time_out = false;

        if (correct) {
            enviarEventoInteraccion(stage.prop("interaction_type"), stage.prop("pregunta"), respuesta, "correct", stage.prop("intentos_previos"), stage.prop("num_intentos"), timer, sym);
        }
        else {
            enviarEventoInteraccion(stage.prop("interaction_type"), stage.prop("pregunta"), respuesta, "incorrect", stage.prop("intentos_previos"), stage.prop("num_intentos"), timer, sym);
        }
    }
}

//**********************************************************************************

function aplicarCambiosPreviosPickMany(data, sym) {
    if (!isEmpty(data.selected)) {
        $.each(data.selected, function (key, val) {
            seleccionarPick(sym, "PICK_" + nombreANumero(val));
        });
    }
}

//***********************************************************************

function mostrarRespuestasPickMany(sym) {
    var stage = $(sym.getComposition().getStage().ele);
    var CANTIDAD_PICKS = stage.prop("cantidad_picks");

    for (var i = 1; i <= CANTIDAD_PICKS; i++) {
        if (stage.prop("picks")[i].esRespuesta) {
            if (!sym.$("PICK_" + i).prop("selected")) {
                seleccionarPick(sym, "PICK_" + i);
            }
        } else {
            deseleccionarPick(sym, "PICK_" + i);
        }
    }
}

//***********************************************************************

$("body").on("EDGE_Recurso_eliminarOpciones", function (data) {
	eliminarPicks(data.sym, data.cantidad);
});

function eliminarPicks(sym, cantidad) {
    var stage = $(sym.getComposition().getStage().ele);
    var CANTIDAD_PICKS = stage.prop("cantidad_picks");
	
	var arrayPicks = [];
    for (var i = 1; i <= CANTIDAD_PICKS; i++) {
        if(!sym.$("PICK_" + i).prop("esRespuesta")){
			arrayPicks.push(sym.$("PICK_" + i));
		}
    }
	arrayPicks = shuffleArray(arrayPicks);
	for(var i=0; i<cantidad; i++){
		if(i<arrayPicks.length){
			arrayPicks[i].hide();
			arrayPicks[i].prop("selected", false);
			arrayPicks[i].prop("correct", true);
		}
	}
}

//***********************************************************************

function deshabilitarPickManys(sym) {
    var stage = $(sym.getComposition().getStage().ele);
    var CANTIDAD_PICKS = stage.prop("cantidad_picks");
    for (var i = 1; i <= CANTIDAD_PICKS; i++) {
        sym.$("PICK_" + i).off();
    }
}
//***********************************************************************

function shuffleArray(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

//***********************************************************************

//retorna la parte numérica del nombre de un elemento
// ej: DROP_1 -> 1

function nombreANumero(strNombre) {
    if (strNombre.indexOf("_") >= 0) {
        var strArray = strNombre.split("_");
        return strArray[1];
    }
    else {
        return "";
    }
}

//***********************************************************************

function inicializar(sym) {
    inicializarPickMany(sym);
}
