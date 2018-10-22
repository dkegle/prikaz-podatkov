export default class DataManager{
    constructor(){
        this.samples = [];
        this.mean = 0;
        this.median = 0;
        this.max = undefined;
        this.min = undefined;
        this.std = 0; // standard deviation
        this.calcMean = this.calcMean.bind(this);
        this.calcMedian = this.calcMedian.bind(this);
        this.calcStd = this.calcStd.bind(this);
        this.parseCSV = this.parseCSV.bind(this);
    }

    calcMean(samples){
        return samples.reduce((acc, x) => acc + x)/samples.length;
    }

    calcMedian(samples){
        let index = Math.floor(samples.length/2);
        return samples.slice().sort((a,b) => a-b)[index];
    }

    calcStd(samples){
        let n = samples.length;
        let mean = this.calcMean(samples);
        let std = 0;
        for(let i=0; i<n; i++)
            std += Math.pow(samples[i]-mean, 2)/(n-1);
        return Math.sqrt(std);
    }

    // one column
    parseCSV(csv_str){
        return csv_str.split('\n').map(x => parseFloat(x)).filter(x => !isNaN(x));
    }

    async loadData(url){
        try{
            let raw = await fetch(url);
            if(!raw.ok)
                throw raw.status;
            let csv_str = await raw.text();
            this.samples = this.parseCSV(csv_str);
            
            this.max = Math.max(...this.samples);
            this.min = Math.min(...this.samples);
            this.mean = this.calcMean(this.samples);
            this.median = this.calcMedian(this.samples);
            this.std = this.calcStd(this.samples);
        }
        catch(err){
            console.log("Error while loading " + url, ", " + err);
            return;
        }
    }
}