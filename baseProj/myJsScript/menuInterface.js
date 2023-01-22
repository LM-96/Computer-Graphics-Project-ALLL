const settings = {
    Active_Menu: false, //TODO. change active background color (as hover)
    cameraX: 2.75,
    cameraY: 5,
    cameraZ: 1,
    posX: 0,
    posY: 0,
    posZ: 0.25,
    targetX: 0,
    targetY: 0,
    targetZ: 0,
    fieldOfView: 60
};

var widgets = null;

function menu() {
    widgets = webglLessonsUI.setupUI(document.querySelector('#ui'), settings, [
        { type: 'checkbox', key: 'Active_Menu', change: render, },
        { type: 'slider',   key: 'cameraX',    min: -10, max: 10, change: render, precision: 2, step: 0.001, },
        { type: 'slider',   key: 'cameraY',    min:   -10, max: 10, change: render, precision: 2, step: 0.001, },
        { type: 'slider',   key: 'cameraZ',    min:   -10, max: 10, change: render, precision: 2, step: 0.001, },
        { type: 'slider',   key: 'posX',       min: -10, max: 10, change: render, precision: 2, step: 0.001, },
        { type: 'slider',   key: 'posY',       min:   -10, max: 10, change: render, precision: 2, step: 0.001, },
        { type: 'slider',   key: 'posZ',       min:   0.25, max: 5, change: render, precision: 2, step: 0.001, },
        { type: 'slider',   key: 'targetX',    min: -10, max: 10, change: render, precision: 2, step: 0.001, },
        { type: 'slider',   key: 'targetY',    min:   0, max: 20, change: render, precision: 2, step: 0.001, },
        { type: 'slider',   key: 'targetZ',    min: -10, max: 20, change: render, precision: 2, step: 0.001, },
        { type: 'slider',   key: 'fieldOfView', min:  1, max: 179, change: render, },
    ]);
}