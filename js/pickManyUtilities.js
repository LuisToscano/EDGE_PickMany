
//Inicializa una actividad drag and drop donde a cada drop solo le corresponde un drag

function inicializarPickMany(sym) {
    var stage = $(sym.getComposition().getStage().ele);
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
        enviarEventoActividadTerminada(sym);
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
            contRespuestas++;
        }

        if (contRespuestas > 1) {
            stage.prop("tipo", "many");
        }
        else {
            stage.prop("tipo", "one");
        }

        pickObj.prop("selected", false);
        pickObj.prop("esRespuesta", esRespuesta);
        pickObj.prop("correct", !esRespuesta);
    }
}

//**********************************************************************************

function pickClickeado(sym, nombrePick) {

    var stage = $(sym.getComposition().getStage().ele);
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

//**********************************************************************************

function seleccionarPick(sym, nombrePick) {
    var stage = $(sym.getComposition().getStage().ele);
    if (stage.prop("tipo") === "many" || (stage.prop("tipo") === "one" && !sym.$(nombrePick).prop("selected"))) {
        var pickObj = sym.$(nombrePick);
        var boolSelected = pickObj.prop("selected");
        if (boolSelected) {
            sym.getSymbol(nombrePick).play("normal");
        }
        else {
            sym.getSymbol(nombrePick).play("seleccionado");
        }

        pickObj.prop("selected", !boolSelected);
        pickObj.prop("correct", pickObj.prop("esRespuesta") === pickObj.prop("selected"));
    }
}

//**********************************************************************************

function deseleccionarPick(sym, nombrePick) {
    var pickObj = sym.$(nombrePick);
    pickObj.prop("selected", false);
    sym.getSymbol(nombrePick).play("normal");
    pickObj.prop("correct", pickObj.prop("esRespuesta") === pickObj.prop("selected"));
}



//**********************************************************************************

function checkAnswersPickMany(sym, nombrePick) {
    var stage = $(sym.getComposition().getStage().ele);
    var CANTIDAD_PICKS = stage.prop("cantidad_picks");
    var strRespuesta = "";
    var correct = true;
    
    for (var i = 1; i <= CANTIDAD_PICKS; i++) {
        var pickObj = sym.$("PICK_" + i);
        
        if(!pickObj.prop("correct")){
          correct = false;  
        }
    }
}

        