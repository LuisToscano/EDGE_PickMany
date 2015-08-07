function getIdInteraccion(){
	return "";
}

function enviarEventoActividadTerminada(sym){
	parent.$(parent.document).trigger({
			type: "EDGE_Plantilla_creationComplete",
			sym: sym
		});
}

function enviarEventoInteraccion(id,tipo,pregunta,respuesta,resultado,intentos_previos,limite_intentos, sym){
	parent.$(parent.document).trigger({
			type: "EDGE_Plantilla_submitApplied",
			interactionId: id,
			interactionType: tipo,
                        question: pregunta,
			answer: respuesta,
			results: resultado,
			attempts: intentos_previos,
			attempts_limit: limite_intentos,
			sym:sym
		});
}