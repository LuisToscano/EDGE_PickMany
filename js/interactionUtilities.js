function enviarEventoActividadTerminada(sym){
	parent.$(parent.document).trigger({
			type: "EDGE_Plantilla_creationComplete",
			sym: sym
		});
}

function enviarEventoInteraccion(tipo,pregunta,respuesta,resultado,intentos_previos,limite_intentos, timerObj, sym){
	parent.$(parent.document).trigger({
			type: "EDGE_Plantilla_submitApplied",
			interactionType: tipo,
                        question: pregunta,
			answer: respuesta,
			results: resultado,
			attempts: intentos_previos,
			attempts_limit: limite_intentos,
                        timer: timerObj,
			sym:sym
		});
}

    $("body").on("TimeOut", function (data) {
        var stage = $(data.sym.getComposition().getStage().ele);
        
        var timer = {};
        timer.timerObj = stage.prop("timer");
        timer.remaining_time = 0;
        timer.time_out = false;
        timer.current_state = timer.timerObj.prop("alertState");
        enviarEventoInteraccion(stage.prop("interaction_type"), stage.prop("pregunta"), "", "incorrect", stage.prop("intentos_previos"), stage.prop("num_intentos"), timer, data.sym);
    });