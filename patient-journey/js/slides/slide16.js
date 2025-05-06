class Slide16 extends Slide
{
	constructor() 
	{	
		super();
		
		//General
		this.slideType = this.slideTypeInfo;	
		this.txtSectionHeading = "Transport";
		this.txtHeading = "Update";
		this.txt = "George has been stabilized and is now being transported to a tertiary care center. The cardiac catherization lab has been \nnotified and the interprofessional team is ready for catherization. \n\nClick the Next button to proceed.";
		
		//Animation
		this.intervalAnimation;
		this.intervalFrequency = 1;
		this.increment = 0.75;
		this.incrementHelicopterX = 0.65;
		this.incrementHelicopterY = 0.4;
		this.posExterior;
		this.posHelicopter;
		this.posStart = {x: this.pos.x, y: this.pos.y - 400};
		this.posEnd = {x: this.posStart.x, y: this.posStart.y + 400};
		this.posStartHelicopter = {x: this.posStart.x - 50, y: this.posStart.y + 750};
				
		//Glossary
		this.curTerms = [];
		
		this.init();
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Slide-Specific Actions ------------------------------- */
	
	loadImages()
	{			
		this.totalImages = 6;
		
		//Exterior image and helicopter image
		this.imgExterior = new Image();
		this.imgExterior.src = "img/backgrounds/bg9.png"; 
		this.imgExterior.onload = () => { this.onImageLoaded(); }
		this.imgHelicopter = new Image();
		this.imgHelicopter.src = "img/vehicles/helicopter_large.png"; 
		this.imgHelicopter.onload = () => { this.onImageLoaded(); }
				
		super.loadImages();
	}
	
	reset()
	{
		super.reset();
		
		this.posExterior = this.posStart;		
		this.posHelicopter = this.posStartHelicopter;
	}
	
	setup()
	{			
		this.setCompletionStatus(false);	
		this.startAnimation();
		
		super.setup();
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Animation ---------------------------=---------------- */
	
	updateAnimation()
	{
		let target = main.curSlide;
		target.posExterior = {x: target.posExterior.x, y:target.posExterior.y + target.increment};		
		target.posHelicopter = {x: target.posHelicopter.x + target.incrementHelicopterX, y:target.posHelicopter.y - target.incrementHelicopterY};
		if (target.posExterior.y > target.posEnd.y) target.stopAnimation();
		
		main.draw();
	}	
	
	stopAnimation()
	{
		this.setCompletionStatus(true);
		
		super.stopAnimation();
		
		this.addDialog("", this.txtHeading, this.colourDefault, this.txt, "");
		this.dialog.setBackgroundToFaded(false);
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	draw()
	{
		super.draw(); 
		
		canvasBackground.drawImage(this.imgExterior, this.posExterior);	
		canvasBackground.drawImage(this.imgHelicopter, this.posHelicopter);		
	}
}