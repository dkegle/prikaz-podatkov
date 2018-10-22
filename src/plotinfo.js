export default class PlotInfo{
    constructor(id){
        this.node = document.getElementById(id);
    }

    display({max, min, mean, median, std}){
        let title = document.createElement('h2');
        title.innerText = "Statistične informacije";
        this.node.appendChild(title);

        let child = (text, number) => {
            let el = document.createElement('div');
            el.innerText = text;
            let child = document.createElement('span');
            child.innerText = number;
            el.appendChild(child);
            return el;
        }

        this.node.appendChild(child("Max: ", max.toFixed(3)));
        this.node.appendChild(child("Min: ", min.toFixed(3)));
        this.node.appendChild(child("Povprečje: ", mean.toFixed(3)));
        this.node.appendChild(child("Mediana: ", median.toFixed(3)));
        this.node.appendChild(child("Standardni odklon: ", std.toFixed(3)));
    }
}
