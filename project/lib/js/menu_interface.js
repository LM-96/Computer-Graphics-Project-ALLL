const settings = {
    Active_Menu: false,
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

//TODO. Input of menu do not update the slider
function menu() {
    webglLessonsUI.setupUI(document.querySelector('#ui'), settings, [
        { type: 'checkbox', key: 'Active_Menu', },
        { type: 'slider',   key: 'cameraX',    min: -10, max: 10, precision: 2, step: 0.001, },
        { type: 'slider',   key: 'cameraY',    min:   -10, max: 10, precision: 2, step: 0.001, },
        { type: 'slider',   key: 'cameraZ',    min:   -10, max: 10, precision: 2, step: 0.001, },
        { type: 'slider',   key: 'posX',       min: -10, max: 10, precision: 2, step: 0.001, },
        { type: 'slider',   key: 'posY',       min:   -10, max: 10, precision: 2, step: 0.001, },
        { type: 'slider',   key: 'posZ',       min:   0.25, max: 5, precision: 2, step: 0.001, },
        { type: 'slider',   key: 'targetX',    min: -10, max: 10, precision: 2, step: 0.001, },
        { type: 'slider',   key: 'targetY',    min:   0, max: 20, precision: 2, step: 0.001, },
        { type: 'slider',   key: 'targetZ',    min: -10, max: 20, precision: 2, step: 0.001, },
        { type: 'slider',   key: 'fieldOfView', min:  0, max: 180,  },
    ]);


}