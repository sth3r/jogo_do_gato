import Circle from './geometries/Circle'
import { loadImage } from "./loaderAssets"

export default class Hero extends Circle {

	constructor(x, y, velocity = 10, width,height, FRAMES = 60) {
		super(x, y, 0)
		loadImage('/assets/sprites/cato/gato1.png').then(img=>this.img = img)
		
		this.cellWidth = 139,5	//largura da celular de recorte
		this.cellHeight = 142	//altura da celula de recorte
		this.cellX = 0
		this.cellY = 0
		
		this.totalSprites = 4	//Total de sprites
		this.spriteSpeed = 0.5
		this.setSprites()
		this.controlSprite(FRAMES)

		this.width = width
		this.height = height
		this.size = this.width/2

		this.speed = velocity*this.spriteSpeed
		this.status = 'up'
		
		this.showHit = true;
		this.setHit()

		this.setControlsKeys()
	}

	controlSprite(FRAMES){ //Controla a animacao do sprite
		setInterval(() => {
			this.cellX = this.cellX < this.totalSprites - 1 ? this.cellX + 1 : 0;
		}, 1000 / (FRAMES*this.spriteSpeed/10))
	}

	draw(CTX) {
		this.cellY = this.sprites[this.status] * this.cellHeight;
	
		CTX.drawImage(
			this.img,
			this.cellX * this.cellWidth, //source
			this.cellY, //source
			this.cellWidth,
			this.cellHeight, //source
			this.x, //draw
			this.y,
			this.width,
			this.height //draw
		);
	
		if (this.showHit) {
			this.hit.draw(CTX);
		}
	}	

	setHit(){
		this.hit = new Circle(
			this.x+this.width/2-50,
			this.y+this.height/2-50,
			this.size*.5,5,
			"rgba(0,0,255,.3)"
			)
	}

	setSprites(){
		this.sprites = {
			'down': 0,
			'up': 2,
			'left': 3,
			'right': 1,
			'idle': 4,
			'dormindo': 5
		}
	}

	setControlsKeys(){
		this.controls = {
			'ArrowDown':'down',
			'ArrowUp':'up',
			'ArrowLeft':'left',
			'ArrowRight':'right',
		}
	}

	setMovements(){
		this.movements = {
			'down': { y: this.y + this.speed },
			'up': 	{ y: this.y - this.speed },
			'left': { x: this.x - this.speed},
			'right':{ x: this.x + this.speed}
		}
	}

	update(){
		this.hit.x=this.x+this.width/2-20
		this.hit.y=this.y+this.height/2-10
	}

	move(limits, key) {
		this.setMovements()

		this.status = this.controls[key] ? this.controls[key] : this.status

		let newx = this.movements[this.status]?.x
		let newy = this.movements[this.status]?.y

		this.x = newx!=undefined?newx:this.x;
		this.y = newy!=undefined?newy:this.y;

		this.limits(limits)
		this.update()
	}

	colide(other){
		return this.hit.colide(other)
	}
}