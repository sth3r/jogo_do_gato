import Circle from "./geometries/Circle";
import { loadImage } from "./loaderAssets";

export default class Enemy extends Circle{
	constructor(x, y, size, speed = 10, color = "#00f") {
		super(x, y, size, speed, color)
		// loadImage('/assets/sprites/red-shroom-run.png').then(img=>this.img = img)

		// this.cellWidth = 139,5	
		// this.cellHeight = 142	
		// this.cellX = 0
		// this.cellY = 0
		this.x = x;
		this.y = y;
		this.size = size;
		this.speed = speed;
		this.color = color;
		this.status = null;
		this.line = 3
	}

	move(limits,key){
		this.x +=this.speed
		this.limits(limits)
		// this.updateAnimation();
	}

	limits(limits){

		if(this.x - this.size > limits.width+this.size ){
			this.x = -this.size
			this.y = Math.random()*limits.height;
		}
	}

	// updateAnimation(){

	// }
}