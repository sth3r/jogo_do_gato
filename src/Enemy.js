import Circle from "./geometries/Circle";
import { loadImage } from "./loaderAssets";

export default class Enemy extends Circle{
	constructor(x, y, size, speed = 10, color = "#00f") {
		super()
		loadImage('/assets/sprites/red-shroom-run.png').then(img=>this.img = img)

		this.x = x;
		this.y = y;
		this.size = size;
		this.speed = speed;
		this.color = color;
		this.status = null;
		this.line = 3
	}

	move(limits,key){
		this.y +=this.speed
		this.limits(limits)
	}

	limits(limits){

		if(this.y - this.size > limits.height+this.size ){
			this.y = -this.size
			this.x = Math.random()*limits.width;
		}
	}
}