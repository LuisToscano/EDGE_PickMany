function enviarEventoActividadTerminada(sym) {
    parent.$(parent.document).trigger({
        type: "EDGE_Plantilla_creationComplete",
        sym: sym
    });
}

function enviarEventoInteraccion(tipo, pregunta, respuesta, resultado, intentos_previos, limite_intentos, timerObj, sym) {
    parent.$(parent.document).trigger({
        type: "EDGE_Plantilla_submitApplied",
        interactionType: tipo,
        question: pregunta,
        answer: respuesta,
        results: resultado,
        attempts: intentos_previos,
        attempts_limit: limite_intentos,
        timer: timerObj,
        sym: sym
    });
}

$("body").on("TimeOut", function (data) {
    var stage = $(data.sym.getComposition().getStage().ele);

    var timer = {};
    var timerObj = buscar_sym(data.sym, stage.prop("timer"), true);
    timer.remaining_time = 0;
    timer.time_out = true;
    timer.current_state = timerObj.prop("alertState");
    enviarEventoInteraccion(stage.prop("interaction_type"), stage.prop("pregunta"), "", "incorrect", stage.prop("intentos_previos"), stage.prop("num_intentos"), timer, data.sym);
});

function buscar_sym(sym, arrSymSearch, boolJQUERY) {
    var temp = sym;
    $.each(arrSymSearch, function (index, value) {
        //EDGE_Plantilla.debug ? console.log(temp, index, value, arrSymSearch) : false;

        if (!isEmpty(boolJQUERY) && index === arrSymSearch.length - 1) {
            temp = temp.$(value);
        } else {
            temp = temp.getSymbol(value);
        }

    });
    //EDGE_Plantilla.debug ? console.log(temp, arrSymSearch, boolJQUERY) : false;
    return temp;
}