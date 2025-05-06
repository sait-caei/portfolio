class ServiceIcon extends ServiceTable
{
	constructor(pos, type, subType)
	{	
		super(pos, type, subType);	
		
		this.width = 70*diagramScale;
		this.length = this.width;
		this.fColor = "#2e7c51";	
		//this.fColor = "#62416c";	
		this.sColor = ""; 
		
		this.init();		
	}
	
	/* ------------------------------------------------------------ */
	/* ----- General Set-up --------------------------------------- */
		
	init()
	{				
		//Set-up icon images		
		this.imagesLoaded = 0;		
		this.imgIconFood = new Image();
		this.imgIconFood.src = "img/roomDiagram/iconFoodAlt.png";
		this.imgIconFood.onload = () => { this.onImageLoaded(); }
		this.imgIconBeverage = new Image();
		this.imgIconBeverage.src = "img/roomDiagram/iconBeverage.png";
		this.imgIconBeverage.onload = () => { this.onImageLoaded(); }
		
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	draw()
	{
		//Draw background	
		let posBG = [this.pos[0] + this.width/2, this.pos[1] + this.length/2];		
		canvasTables.drawCircle(posBG, this.width/2, 0, 2, this.fColor, this.sColor, this.sWidth);
		
		//Draw icon
		if (this.img) 
		{			
			let imgWidth = this.img.width * diagramScale;
			let imgHeight = this.img.height * diagramScale;	
			let xPos = this.pos[0] + this.width/2 - imgWidth/2;
			let yPos = this.pos[1] + this.length/2 - imgHeight/2;
			if (this.type.includes("Beverage"))
			{
				xPos += 2*diagramScale;
				yPos += 3*diagramScale;
			}
			let pos = [xPos, yPos];			
			canvasTables.drawImageScaled(this.img, pos, imgWidth, imgHeight); 				
		}
	}
	
	drawHighlight()
	{
		let highlightPos = [this.pos[0] + this.width/2, this.pos[1] + this.length/2];
		canvasBackground.drawCircle(highlightPos, (this.width + this.highlightOutline)/2, 0, 2, this.outlineColor, "", "");
	}	
}
