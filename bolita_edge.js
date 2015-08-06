/*jslint */
/*global AdobeEdge: false, window: false, document: false, console:false, alert: false */
(function (compId) {

    "use strict";
    var im='images/',
        aud='media/',
        vid='media/',
        js='js/',
        fonts = {
        },
        opts = {
            'gAudioPreloadPreference': 'auto',
            'gVideoPreloadPreference': 'auto'
        },
        resources = [
        ],
        scripts = [
            js+"interactionUtilities.js",
            js+"jquery-1.10.2.js"
        ],
        symbols = {
            "stage": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'bolita',
                            symbolName: 'bolita',
                            type: 'rect',
                            rect: ['18px', '1px', '101', '101', 'auto', 'auto'],
                            transform: [[],[],[],['0.53465','0.53465']]
                        },
                        {
                            id: 'RoundRect',
                            type: 'rect',
                            rect: ['203px', '25px', '101px', '54px', 'auto', 'auto'],
                            borderRadius: ["10px", "10px", "10px", "10px"],
                            fill: ["rgba(255,0,0,1)"],
                            stroke: [0,"rgb(0, 0, 0)","none"]
                        },
                        {
                            id: 'PICK_1',
                            symbolName: 'PICK_1',
                            type: 'rect',
                            rect: ['50px', '239px', '54', '54', 'auto', 'auto']
                        }
                    ],
                    style: {
                        '${Stage}': {
                            isStage: true,
                            rect: ['null', 'null', '550px', '400px', 'auto', 'auto'],
                            overflow: 'hidden',
                            fill: ["rgba(255,255,255,1)"]
                        }
                    }
                },
                timeline: {
                    duration: 500,
                    autoPlay: true,
                    data: [
                        [
                            "eid11",
                            "top",
                            500,
                            0,
                            "linear",
                            "${bolita}",
                            '1px',
                            '1px'
                        ],
                        [
                            "eid9",
                            "scaleY",
                            500,
                            0,
                            "linear",
                            "${bolita}",
                            '0.53465',
                            '0.53465'
                        ],
                        [
                            "eid8",
                            "scaleX",
                            500,
                            0,
                            "linear",
                            "${bolita}",
                            '0.53465',
                            '0.53465'
                        ],
                        [
                            "eid10",
                            "left",
                            500,
                            0,
                            "linear",
                            "${bolita}",
                            '18px',
                            '18px'
                        ],
                        [
                            "eid19",
                            "top",
                            500,
                            0,
                            "linear",
                            "${PICK_1}",
                            '239px',
                            '239px'
                        ],
                        [
                            "eid18",
                            "left",
                            500,
                            0,
                            "linear",
                            "${PICK_1}",
                            '50px',
                            '50px'
                        ]
                    ]
                }
            },
            "bolita": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '101px', '101px', 'auto', 'auto'],
                            borderRadius: ['50%', '50%', '50%', '50%'],
                            id: 'Ellipse',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            type: 'ellipse',
                            fill: ['rgba(192,192,192,1)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            isStage: 'true',
                            rect: [undefined, undefined, '101px', '101px']
                        }
                    }
                },
                timeline: {
                    duration: 500,
                    autoPlay: true,
                    labels: {
                        "a": 0,
                        "b": 250
                    },
                    data: [
                        [
                            "eid3",
                            "background-color",
                            0,
                            250,
                            "linear",
                            "${Ellipse}",
                            'rgba(192,192,192,1)',
                            'rgba(255,0,0,1.00)'
                        ],
                        [
                            "eid5",
                            "background-color",
                            250,
                            250,
                            "linear",
                            "${Ellipse}",
                            'rgba(255,0,0,1)',
                            'rgba(192,192,192,1.00)'
                        ]
                    ]
                }
            },
            "PICK_1": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '54px', '54px', 'auto', 'auto'],
                            borderRadius: ['50%', '50%', '50%', '50%'],
                            id: 'Ellipse',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'ellipse',
                            fill: ['rgba(254,37,247,1.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            isStage: 'true',
                            rect: [undefined, undefined, '54px', '54px']
                        }
                    }
                },
                timeline: {
                    duration: 500,
                    autoPlay: false,
                    labels: {
                        "normal": 0,
                        "seleccionado": 250
                    },
                    data: [
                        [
                            "eid23",
                            "background-color",
                            0,
                            250,
                            "linear",
                            "${Ellipse}",
                            'rgba(254,37,247,1.00)',
                            'rgba(37,254,50,1.00)'
                        ],
                        [
                            "eid25",
                            "background-color",
                            250,
                            250,
                            "linear",
                            "${Ellipse}",
                            'rgba(37,254,50,1)',
                            'rgba(254,37,247,1.00)'
                        ]
                    ]
                }
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("bolita_edgeActions.js");
})("EDGE-17298671");
