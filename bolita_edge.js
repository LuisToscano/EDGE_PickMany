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
            js+"jquery-1.10.2.js",
            js+"pickManyUtilities.js",
            js+"timerUtilities.js",
            js+"interactionUtilities.js",
            js+"utility.js"
        ],
        symbols = {
            "stage": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "both",
                centerStage: "both",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'PICK_1',
                            symbolName: 'PICK_1',
                            type: 'rect',
                            rect: ['45px', '129px', '54', '54', 'auto', 'auto']
                        },
                        {
                            id: 'PICK_2',
                            symbolName: 'PICK_2',
                            type: 'rect',
                            rect: ['168px', '129px', 'undefined', 'undefined', 'auto', 'auto']
                        },
                        {
                            id: 'PICK_3',
                            symbolName: 'PICK_3',
                            type: 'rect',
                            rect: ['294px', '129px', 'undefined', 'undefined', 'auto', 'auto']
                        },
                        {
                            id: 'PICK_4',
                            symbolName: 'PICK_4',
                            type: 'rect',
                            rect: ['416px', '129px', 'undefined', 'undefined', 'auto', 'auto']
                        },
                        {
                            id: 'Submit',
                            symbolName: 'Submit',
                            type: 'rect',
                            rect: ['390', '303px', '128', '31', 'auto', 'auto']
                        },
                        {
                            id: 'TIMER_CONTAINER',
                            symbolName: 'TIMER_CONTAINER',
                            type: 'rect',
                            rect: ['390', '0', '161', '34', 'auto', 'auto']
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
                            "eid39",
                            "left",
                            500,
                            0,
                            "linear",
                            "${PICK_4}",
                            '416px',
                            '416px'
                        ],
                        [
                            "eid38",
                            "top",
                            500,
                            0,
                            "linear",
                            "${PICK_3}",
                            '129px',
                            '129px'
                        ],
                        [
                            "eid36",
                            "top",
                            500,
                            0,
                            "linear",
                            "${PICK_1}",
                            '129px',
                            '129px'
                        ],
                        [
                            "eid35",
                            "left",
                            500,
                            0,
                            "linear",
                            "${PICK_1}",
                            '45px',
                            '45px'
                        ],
                        [
                            "eid37",
                            "left",
                            500,
                            0,
                            "linear",
                            "${PICK_3}",
                            '294px',
                            '294px'
                        ],
                        [
                            "eid40",
                            "top",
                            500,
                            0,
                            "linear",
                            "${PICK_4}",
                            '129px',
                            '129px'
                        ],
                        [
                            "eid42",
                            "top",
                            500,
                            0,
                            "linear",
                            "${Submit}",
                            '303px',
                            '303px'
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
                            rect: [null, null, '54px', '54px']
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
            },
            "PICK_2": {
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
                            fill: ['rgba(255,0,0,1.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '54px', '54px']
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
                            'rgba(255,0,0,1.00)',
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
                            'rgba(255,0,0,1.00)'
                        ]
                    ]
                }
            },
            "PICK_3": {
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
                            fill: ['rgba(255,151,0,1.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '54px', '54px']
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
                            'rgba(255,151,0,1.00)',
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
                            'rgba(255,151,0,1.00)'
                        ]
                    ]
                }
            },
            "PICK_4": {
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
                            fill: ['rgba(0,191,197,1.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '54px', '54px']
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
                            'rgba(0,191,197,1.00)',
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
                            'rgba(0,191,197,1.00)'
                        ]
                    ]
                }
            },
            "Submit": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            type: 'rect',
                            id: 'Rectangle',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            rect: ['0px', '0px', '128px', '31px', 'auto', 'auto'],
                            fill: ['rgba(241,248,33,1.00)']
                        },
                        {
                            rect: ['9px', '3px', '112px', '20px', 'auto', 'auto'],
                            id: 'Text',
                            text: '<p style=\"margin: 0px;\">​otro botón</p>',
                            font: ['Arial, Helvetica, sans-serif', [24, ''], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'normal'],
                            type: 'text'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '128px', '31px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "TIMER_CONTAINER": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            type: 'rect',
                            id: 'Rectangle',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            rect: ['0px', '0px', '161px', '31px', 'auto', 'auto'],
                            fill: ['rgba(192,192,192,1)']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [24, ''], 'rgba(0,0,0,1)', 'normal', 'none', '', 'break-word', 'normal'],
                            type: 'text',
                            id: 'Text',
                            text: '<p style=\"margin: 0px;\">​TIMER</p>',
                            align: 'center',
                            rect: ['18px', '3px', '128px', '31px', 'auto', 'auto']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '161px', '34px']
                        }
                    }
                },
                timeline: {
                    duration: 500,
                    autoPlay: false,
                    labels: {
                        "normal": 0,
                        "10": 250
                    },
                    data: [
                        [
                            "eid46",
                            "background-color",
                            0,
                            250,
                            "linear",
                            "${Rectangle}",
                            'rgba(192,192,192,1)',
                            'rgba(255,0,0,1.00)'
                        ],
                        [
                            "eid47",
                            "background-color",
                            250,
                            250,
                            "linear",
                            "${Rectangle}",
                            'rgba(255,0,0,1.00)',
                            'rgba(192,192,192,1)'
                        ],
                        [
                            "eid51",
                            "color",
                            0,
                            250,
                            "linear",
                            "${Text}",
                            'rgba(0,0,0,1)',
                            'rgba(255,255,255,1.00)'
                        ],
                        [
                            "eid52",
                            "color",
                            250,
                            250,
                            "linear",
                            "${Text}",
                            'rgba(255,255,255,1.00)',
                            'rgba(0,0,0,1)'
                        ]
                    ]
                }
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("bolita_edgeActions.js");
})("EDGE-17298671");
