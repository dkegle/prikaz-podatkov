import DataManager from './datamanager.js';
import Canvas from './canvas.js';
import PlotInfo from './plotinfo.js';

import './css/style.scss';

let dataManager = new DataManager();
let canvas = new Canvas('plot-canvas');
let plotInfo = new PlotInfo('plot-info');

window.onload = async _ => { 
    await dataManager.loadData('podatki/izmerjene_pozicije.csv');

    canvas.setData(dataManager.samples);
    canvas.draw();

    plotInfo.display({
        max: dataManager.max,
        min: dataManager.min,
        mean: dataManager.mean,
        median: dataManager.median,
        std: dataManager.std
    });
}
