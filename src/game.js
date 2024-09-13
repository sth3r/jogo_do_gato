import { keyPress, key } from "./keyboard"
import Circle from "./geometries/Circle"
import Smile from "./Smile"
import Enemy from "./Enemy"
import Hero from "./Hero"
import hud from "./hud"
import { loadAudio, loadImage } from "./loaderAssets"

const FRAMES = 60
const smile = new Smile(300, 100, 20, 5, 'yellow')
const hero = new Hero(700, 500, 6, 82, 89, FRAMES)
// let fish;
let comida;
// fish = await loadImage('assets/Food-01.png');
// comida = ctx.drawImage(fish, 200, 200, 10, 5)
// const comida = ctx.drawImage(fish, 200, 200, 10, 5)
const tangerine = new Circle(200, 200, 10, 5, 'orange')
let enemies = Array.from({ length: 3 });
let ctx
let canvas
let gameover
let boundaries
let score
let anime

let scoreSound
let themeSound
let gameoverSound

let bgImage;
let bgPattern;
let bgPattern2;
let asset1;
let asset2;
let asset3;
let asset4;
let asset5;

const init = async () => {
	score = 0
	gameover = false

	console.log("Initialize Canvas")
	canvas = document.querySelector('canvas')
	ctx = canvas.getContext('2d')

	ctx.clearRect(0, 0, canvas.width, canvas.height)
	hud(ctx, `Carregando... `, "#f00",canvas.height/2-50)
	
	// Load the background image
	bgImage = await loadImage('assets/Forest/Forest_Tilesett_crop-01.png');
	asset1 = await loadImage('assets/Forest/Forest Props-05.png');
	asset2 = await loadImage('assets/Forest/Forest Props-13.png');
	asset3 = await loadImage('assets/Forest/Forest Props-10.png');
	asset4 = await loadImage('assets/Forest/Forest Props-08.png');
	asset5 = await loadImage('assets/Forest/Forest Props-06.png');
	// debugger;
	// console.log('Background image loaded', bgImage);
	
	comida = await loadImage('assets/Food-01.png');

	// Create pattern
	bgPattern = ctx.createPattern(bgImage, 'repeat');
	bgPattern2 = ctx.createPattern(asset1, 'repeat');

	scoreSound = await loadAudio('assets/sounds/eating-sound-effect.mp3')
	scoreSound.volume = .5
	// debugger;
	gameoverSound = await loadAudio('assets/sounds/miau-triste.mp3')
	gameoverSound.volume = .5
	themeSound = await loadAudio('assets/sounds/relaxing-birds-and-piano-music-137153.mp3')
	themeSound.volume = .3
	themeSound.loop = true

	boundaries = {
		width: canvas.width,
		height: canvas.height
	}

	enemies = enemies.map(i => new Enemy(
		Math.random() * canvas.width,
		Math.random() * canvas.height, 10, 4,'red')
	)

	tangerine.restart = () => {
		tangerine.x = tangerine.size + Math.random() * (boundaries.width - tangerine.size)
		tangerine.y = tangerine.size + Math.random() * (boundaries.height - tangerine.size)
	}

	keyPress(window)
	start()
}

const start = () =>{
	let startInterval = setInterval(()=>{
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		hud(ctx, `Pressione ENTER para começar!! `, "#0f0",canvas.height/2-50)
		console.log(key)
		if(key=='Enter'){
			themeSound.play()
			clearInterval(startInterval)
			loop()
		}
	},1000)
}

const loop = () => {
	setTimeout(() => {
		ctx.clearRect(0, 0, canvas.width, canvas.height)

//        Draw the background image
		if (bgPattern) {
			// debugger
			ctx.fillStyle = bgPattern;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		}
		// if (bgPattern2) {
		// 	// debugger
		// 	ctx.fillStyle = bgPattern2;
		// 	ctx.fillRect(0, 0, canvas.width, canvas.height);
		// }

		ctx.drawImage(asset1, 33, 71, 204, 416);
		ctx.drawImage(asset1, 800, 70, 204, 416);
		ctx.drawImage(asset2, 750, 100, 70,100);
		ctx.drawImage(asset2, 400, 60, 70,100);
		ctx.drawImage(asset2, 200, 400, 70,100);
		ctx.drawImage(asset4, 225, 460, 50,50);
		ctx.drawImage(asset3, 700, 470, 50,50);
		ctx.drawImage(asset3, 770, 525, 50,50);
		ctx.drawImage(asset3, 650, 557, 50,50);
		ctx.drawImage(asset5, 850, 300, 70,70);
		ctx.drawImage(asset4, 880, 340, 50,50);

		tangerine.draw(ctx)

		hero.move(boundaries, key)
		hero.draw(ctx)

		enemies.forEach(e => {
			e.move(boundaries, 0)
			e.draw(ctx)
			gameover = !gameover
				? hero.colide(e)
				: true
		})

		if (smile.colide(tangerine) || hero.colide(tangerine)) {
			tangerine.restart()
			console.clear()
			scoreSound.play()
			console.count("PONTOS", ++score)
			
			enemies.forEach(e => {
				e.speed +=6
				// console.log(speed)
			})
		}

		if (gameover) {
			console.error('DEAD!!!')
			hud(ctx, `Pontos: ${score}. GAME OVER !! `, "#f00")
			hud(ctx, `Pressione F5 para reiniciar!`, "#f00",canvas.height/2-50)
			gameoverSound.play()
			themeSound.pause()
			cancelAnimationFrame(anime)
		} else {
			hud(ctx, `Pontos: ${score}`)
			anime = requestAnimationFrame(loop)
		}

	}, 1000 / FRAMES)
}

export { init }

tangerine.draw = (ctx) => {
    const spriteWidth = tangerine.size * 4; 
    const spriteHeight = tangerine.size * 2; 

    ctx.drawImage(
        comida, 
        tangerine.x - spriteWidth / 2, 
        tangerine.y - spriteHeight / 2, 
        spriteWidth,
        spriteHeight  
    );
}