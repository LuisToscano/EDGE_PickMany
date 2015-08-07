

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
        sym: data.sym
    });
});

parent.$(parent.document).on("EDGE_Plantilla_creationComplete", function (data) {
    $("body").trigger({
        type: "EDGE_Recurso_sendPreviousData",
        block: false,
        previous_data: {"selected": []},
        attempts: 0,
        sym: data.sym
    });
});

//***********************************************************************

//Evento que se dispara después de que el controlador recibe y transforma los resultados de una interacción.

$("body").on("EDGE_Recurso_postSubmitApplied", function (data) {

    var stage = $(data.sym.getComposition().getStage().ele);

    if (data.show_answers) {
        mostrarRespuestasPickMany(data.sym);
    }

    if (data.block) {
        stage.prop("blocked", true);
    }

    stage.prop("intentos_previos", data.attempts);
});

$("body").on("EDGE_Recurso_sendPreviousData", function (data) {

    var stage = $(data.sym.getComposition().getStage().ele);
    aplicarCambiosPreviosPickMany(data.previous_data, data.sym);

    if (data.block) {
        stage.prop("blocked", true);
    }

    if (data.attempts > 0) {
        stage.prop("intentos_previos", data.attempts);
    }
});

//***********************************************************************


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
            if(esRespuesta){
                contRespuestas++;
            }
        }

        pickObj.prop("selected", false);
        pickObj.prop("esRespuesta", esRespuesta);
        pickObj.prop("correct", !esRespuesta);
        pickObj.prop("descripcion", objPicks[i].descripcion);
        pickObj.prop("nombre", "PICK_" + i);
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
    if (pickObj.prop("selected")) {
        pickObj.prop("selected", false);
        sym.getSymbol(nombrePick).play("normal");
        pickObj.prop("correct", pickObj.prop("esRespuesta") === pickObj.prop("selected"));
    }
}

//**********************************************************************************

function checkAnswersPickMany(sym) {

    var interactionId = "";
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

        if (correct) {
            enviarEventoInteraccion(interactionId, "choice", stage.prop("pregunta"), respuesta, "correct", stage.prop("intentos_previos"), stage.prop("num_intentos"), sym);
        } else {
            enviarEventoInteraccion(interactionId, "choice", stage.prop("pregunta"), respuesta, "incorrect", stage.prop("intentos_previos"), stage.prop("num_intentos"), sym);
        }
    }
}

//**********************************************************************************

function aplicarCambiosPreviosPickMany(data, sym) {
    $.each(data.selected, function (key, val) {
        seleccionarPick(sym, "PICK_" + nombreANumero(val));
    });
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

        