const settings = {
    cameraX: 2.75,
    cameraY: 5,
    posX: 2.5,
    posY: 4.8,
    posZ: 4.3,
    targetX: 2.5,
    targetY: 0,
    targetZ: 3.5,
    projWidth: 1,
    projHeight: 1,
    perspective: true,
    fieldOfView: 45,
};

function menu() {
    webglLessonsUI.setupUI(document.querySelector('#ui'), settings, [
        { type: 'slider',   key: 'cameraX',    min: -10, max: 10, change: render, precision: 2, step: 0.001, },
        { type: 'slider',   key: 'cameraY',    min:   1, max: 20, change: render, precision: 2, step: 0.001, },
        { type: 'slider',   key: 'posX',       min: -10, max: 10, change: render, precision: 2, step: 0.001, },
        { type: 'slider',   key: 'posY',       min:   1, max: 20, change: render, precision: 2, step: 0.001, },
        { type: 'slider',   key: 'posZ',       min:   1, max: 20, change: render, precision: 2, step: 0.001, },
        { type: 'slider',   key: 'targetX',    min: -10, max: 10, change: render, precision: 2, step: 0.001, },
        { type: 'slider',   key: 'targetY',    min:   0, max: 20, change: render, precision: 2, step: 0.001, },
        { type: 'slider',   key: 'targetZ',    min: -10, max: 20, change: render, precision: 2, step: 0.001, },
        { type: 'slider',   key: 'projWidth',  min:   0, max:  2, change: render, precision: 2, step: 0.001, },
        { type: 'slider',   key: 'projHeight', min:   0, max:  2, change: render, precision: 2, step: 0.001, },
        { type: 'checkbox', key: 'perspective', change: render, },
        { type: 'slider',   key: 'fieldOfView', min:  1, max: 179, change: render, },
    ]);

    function render() {
        const cameraPosition = [settings.cameraX, settings.cameraY, 7];
        const target = [0, 0, 0];
        const up = [0, 1, 0];
        //const cameraMatrix = m4.lookAt(cameraPosition, target, up);
    }
    render();
}