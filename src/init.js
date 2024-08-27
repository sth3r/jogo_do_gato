// import { keyDownUp,hasKey } from "./keyboard"
// import { loadImage } from "./loaderAssets"

// let CTX
// let CANVAS
// const FRAMES = 60

// let catoImage = null
// let bgImage = null
// let bgPattern=null
// let x = 0
// let y = 0

// let cellWidth = 98.3		//largura da celular de recorte
// let cellHeight = 93.77	//altura da celula de recorte
// let totalSprites = 4	//Total de sprites
// let goblinSpeed =  0.5 	//Velocidade de troca de sprites (anime)
// let goblinPositionX = 0
// let goblinPositionY = 0
// let goblinVelocity = 5

// const init = async () => {
// 	console.log("Initialize Canvas")
// 	CANVAS = document.querySelector('canvas')
// 	CTX = CANVAS.getContext('2d')
// 	// catoImage = await loadImage('assets/sprites/cato/gato1.png')
// 	bgImage =  await loadImage('assets/Forest/Forest_Tilesett.png')
// 	bgPattern = CTX.createPattern(bgImage,'repeat')
// 	keyDownUp(CANVAS)
// 	loop()
// 	animeSprite(goblinSpeed)
// }

// const animeSprite = (spriteSpeed)=>{ //Controla a animacao do sprite
// 	setInterval(() => {
// 		x = x < totalSprites - 1 ? x + 1 : 0;
// 	}, 1000 / (FRAMES*spriteSpeed/10))
// }

// const loop = () => {
// 	setTimeout(() => {		
// 		if(hasKey('ArrowDown'))
// 			goblinPositionY = goblinPositionY + goblinVelocity

// 		CTX.fillStyle = bgPattern;
// 		CTX.fillRect(0,0,CANVAS.width,CANVAS.height)

// 		CTX.drawImage(
// 			catoImage,
// 			x * cellWidth,//posicao X de recorte
// 			y, //posicao Y de recorte
// 			cellWidth, //largura celula recorte
// 			cellHeight, //altura celula recorte
// 			goblinPositionX, //posicao X de desenho
// 			goblinPositionY, //posicao X de desenho
// 			75, 142.8 //draw
// 		)

// 		requestAnimationFrame(loop)
// 	}, 1000 / FRAMES)
// }

// export { init }