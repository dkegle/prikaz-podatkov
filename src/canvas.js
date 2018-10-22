export default class Canvas {
    constructor(id){
        this.canvas = document.getElementById(id);
        this.canvas.width = 2056;
        this.canvas.height = 1024;
        this.data = undefined;
        this.scale_x = undefined;
        this.scale_y = undefined;
        this.min = undefined;
        this.max = undefined;
        this.setData = this.setData.bind(this);
        this.auxDrawData = this.auxDrawData.bind(this);
        this.auxDrawLine = this.auxDrawLine.bind(this);
    }

    setData(data){
        this.data = data;
       
        let make_scale = ([a,b], [c,d]) => {
            let diff = d-c;
            return x => c + diff*(x-a)/(b-a);
        }

        let cdx = [this.canvas.width*0.2, this.canvas.width*0.92];
        this.scale_x = make_scale([0, data.length-1], cdx);

        this.max = Math.max(...this.data);
        this.min = Math.min(...this.data);

        let cdy = [this.canvas.height*0.7, this.canvas.height*0.2];
        this.scale_y = make_scale([this.min, this.max], cdy);
    }

    auxDrawData(ctx){
        let r = this.canvas.width/250;
        for(let i=0; i<this.data.length; i++){
            let blue = ((i/this.data.length)*255).toString();
            ctx.fillStyle='rgba(80,80,' + blue + ',0.75)';
            ctx.beginPath();
            ctx.arc(this.scale_x(i), this.scale_y(this.data[i]), r, 0, Math.PI*2);
            ctx.fill();
        }
    }

    auxDrawLine(ctx, x1, y1, x2, y2){
        ctx.lineWidth = 1.75;
        ctx.strokeStyle = 'rgb(50, 50, 50)';
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    draw(){
        if(!this.canvas.getContext || !this.data)
            return;

        let ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.auxDrawData(ctx);

        let start_x = this.scale_x(-this.data.length*0.025);
        let end_x = this.scale_x(this.data.length-1);
        let start_y = this.canvas.height*0.75;
        let end_y = this.canvas.height*0.2;

        this.auxDrawLine(ctx, start_x, start_y, end_x, start_y); // x axis
        this.auxDrawLine(ctx, start_x, start_y, start_x, end_y); // y axis

        // axis labels
        let text_size = (this.canvas.width/33).toString() + "px";
        ctx.font = "bold " + text_size + " Comic Sans MS";
        ctx.textAlign = "center";
        ctx.fillStyle = "rgb(30,30,30)";
        ctx.fillText("Meritev", (start_x+end_x)/2, start_y*1.25);
        ctx.fillText("Vrednost", start_x*0.55, end_y*0.6);

        let num_ticks = 5;

        // ticks on x axis
        ctx.fillStyle = "rgb(60,60,60)";
        for(let i=0; i<num_ticks; i++){
            let cur_x = this.scale_x(i*(this.data.length-1)/4);
            this.auxDrawLine(ctx, cur_x, start_y, cur_x, start_y*1.025);

            let label = (Math.floor(i*(this.data.length-1)/(num_ticks-1)) + 1).toString();
            ctx.fillText(label, cur_x, start_y*1.1); 
        }

        // ticks on y axis
        for(let i=0; i<num_ticks; i++){
            let cur_y = this.min + i/(num_ticks-1)*(this.max-this.min);
            let canvas_y = this.scale_y(cur_y);
            this.auxDrawLine(ctx, start_x, canvas_y, start_x*0.925, canvas_y);

            let label = cur_y.toFixed(3);
            ctx.fillText(label, start_x*0.5, canvas_y + this.canvas.height*0.02); 
        }
    }
}
