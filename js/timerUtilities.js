/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$("body").on("TimeAlert", function (data) {
    cambiarEstadoTimer(data.sym, data.timerObj, data.remaining_time);
});

function cambiarEstadoTimer(sym, timerObj, estado){
    var nombre = timerObj.prop("nombre");
    if(timerObj.prop("alertState")!==(""+estado)){
        sym.getSymbol(nombre).play(estado);
        timerObj.prop("alertState", ""+estado);
    }
}

//*************************************************************************************

function inicializarTimer(sym, nombreTimer) {
    var stage = $(sym.getComposition().getStage().ele);
    var timerObj = sym.$(nombreTimer);
    stage.prop("timer", timerObj);
    $.getJSON("timer_config.json", function (data) {
        $.each(data, function (key, val) {
            timerObj.prop(key, val);
        });
    }).done(function () {
        var spanElement = timerObj.find("p");
        timerObj.prop("timer_text", spanElement);
        setHTMLTimer(timerObj.prop("segundos"), timerObj);
        timerObj.prop("segundos_restantes", timerObj.prop("segundos"));
        timerObj.prop("interval_id", -1);
        timerObj.prop("nombre", nombreTimer);
        timerObj.prop("stopped", false);
        timerObj.prop("alertState", "normal");
    });
}

//*************************************************************************************

function startTimer(sym, nombreTimer) {
    var timerObj = sym.$(nombreTimer);
    if (timerObj.prop("interval_id")<0 && !timerObj.prop("stopped"))
    {
        var interval_id = setInterval(function () {
            var currentTime = timerObj.prop("segundos_restantes");
            currentTime--;
            timerObj.prop("timer_text").html(secondsToClockFormat(currentTime));
            timerObj.prop("segundos_restantes", currentTime);
            
            if($.inArray(currentTime, timerObj.prop("alertas"))>=0){
                $("body").trigger({
			type: "TimeAlert",
                        remaining_time: currentTime, 
                        timerObj: timerObj,
                        sym: sym
		});
            }
            
            if (currentTime <= 0) {
                stopTimer(timerObj);
                $("body").trigger({
			type: "TimeOut",
                        sym: sym
		});
            }
            
        }, 1000);
        timerObj.prop("interval_id", interval_id);
    }
}

//*************************************************************************************

function stopTimer(timerObj) {
    if(timerObj.prop("interval_id")>=0){
        clearInterval(timerObj.prop("interval_id"));
        timerObj.prop("interval_id", -1);
        timerObj.prop("stopped", true);
    }
}

//*************************************************************************************

function resetTimer(sym, timerObj) {
    if(timerObj.prop("interval_id")>=0){
        clearInterval(timerObj.prop("interval_id"));
        timerObj.prop("interval_id", -1);
    }
    
    var spanElement = timerObj.find("p");
    var newSpan = $('<span />').attr('className', 'folder_name').html(secondsToClockFormat(timerObj.prop("segundos")));
    spanElement.html(newSpan);
    timerObj.prop("segundos_restantes", timerObj.prop("segundos"));
    timerObj.prop("timer_text", spanElement);
    timerObj.prop("stopped", false);
    
    cambiarEstadoTimer(sym, timerObj, "normal");
}

//*************************************************************************************

function setHTMLTimer(seconds, timerObj){
    var newSpan = $('<span />').html(secondsToClockFormat(seconds));
    timerObj.prop("timer_text").html(newSpan);
}

//*************************************************************************************

function secondsToClockFormat(sec_num) {
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    var time = "";
    if (hours != "00") {
        time += hours + ":";
    }
    time += minutes + ":" + seconds;
    return time;
}

//***********************************************************************************

