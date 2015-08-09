/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$("body").on("TimeAlert", function (data) {
    cambiarEstadoTimer(data.sym, data.remaining_time);  //POSIBLEMENTE CON ERROR
});

function cambiarEstadoTimer(sym, estado) {
    var stage = $(sym.getComposition().getStage().ele);
    var timerObj = buscar_sym(sym, stage.prop("timer"), true);

    if (timerObj.prop("alertState") !== ("" + estado)) {
        buscar_sym(sym, stage.prop("timer")).play(estado);
        timerObj.prop("alertState", "" + estado);
    }
}

//*************************************************************************************

function inicializarTimer(sym) {
    var stage = $(sym.getComposition().getStage().ele);


    $.getJSON("timer_config.json").done(function (data) {
        var timerObj = buscar_sym(sym, data.sym, true);
        $.each(data, function (key, val) {
            timerObj.prop(key, val);
        });

        stage.prop("timer", data.sym);
        var spanElement = timerObj.find("p");
        timerObj.prop("timer_text", spanElement);
        setHTMLTimer(timerObj.prop("segundos"), sym);
        timerObj.prop("segundos_restantes", timerObj.prop("segundos"));
        timerObj.prop("interval_id", -1);
        timerObj.prop("nombre", data.sym);
        timerObj.prop("stopped", false);
        timerObj.prop("alertState", "normal");
    });
}

//*************************************************************************************

function startTimer(sym) {
    var stage = $(sym.getComposition().getStage().ele);
    var timerObj = buscar_sym(sym, stage.prop("timer"), true);
    //console.log(timerObj);
    if (timerObj.prop("interval_id") < 0 && !timerObj.prop("stopped"))
    {
        var interval_id = setInterval(function () {
            var currentTime = timerObj.prop("segundos_restantes");
            currentTime--;
            timerObj.prop("timer_text").html(secondsToClockFormat(currentTime));
            timerObj.prop("segundos_restantes", currentTime);

            if ($.inArray(currentTime, timerObj.prop("alertas")) >= 0) {
                $("body").trigger({
                    type: "TimeAlert",
                    remaining_time: currentTime,
                    timerObj: timerObj,
                    sym: sym
                });
            }

            if (currentTime <= 0) {
                stopTimer(sym);
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

function stopTimer(sym) {
    var stage = $(sym.getComposition().getStage().ele);
    var timerObj = buscar_sym(sym, stage.prop("timer"), true);
    if (timerObj.prop("interval_id") >= 0) {
        clearInterval(timerObj.prop("interval_id"));
        timerObj.prop("interval_id", -1);
        timerObj.prop("stopped", true);
    }
}

//*************************************************************************************

function resetTimer(sym) {
    var stage = $(sym.getComposition().getStage().ele);
    var timerObj = buscar_sym(sym, stage.prop("timer"), true);
    if (timerObj.prop("interval_id") >= 0) {
        clearInterval(timerObj.prop("interval_id"));
        timerObj.prop("interval_id", -1);
    }

    var spanElement = timerObj.find("p");
    var newSpan = $('<span />').attr('className', 'folder_name').html(secondsToClockFormat(timerObj.prop("segundos")));
    spanElement.html(newSpan);
    timerObj.prop("segundos_restantes", timerObj.prop("segundos"));
    timerObj.prop("timer_text", spanElement);
    timerObj.prop("stopped", false);

    cambiarEstadoTimer(sym, "normal");
}

//*************************************************************************************

function setHTMLTimer(seconds, sym) {
    var stage = $(sym.getComposition().getStage().ele);
    var newSpan = $('<span />').html(secondsToClockFormat(seconds));
    var timerObj = buscar_sym(sym, stage.prop("timer"), true);
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

