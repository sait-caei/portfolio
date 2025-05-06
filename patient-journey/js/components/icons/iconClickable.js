class ClickableIcon extends Icon
{
	constructor(id, name, pos, img, imgActive)  
	{
		super(id, name, pos, img); 
		
		this.hasBeenClicked;
		this.scale = 1.03;
		
		//Images
		this.imgActive = imgActive;	
		this.imgCheck;
		this.imgX;
		
		this.init();
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- General  --------------------------------------------- */
	
	init()
	{		
		super.init();
			
		this.setToHasBeenClicked(false);
	}
	
	setFeedbackImages(imgCheck, imgX)
	{
		this.imgCheck = imgCheck; 
		this.imgX = imgX;	
	}
	
	/* ------------------------------------------------------------ */
	/* ----- State ------------------------------------------------ */
		
	setToHasBeenClicked(bln)
	{
		this.hasBeenClicked = bln;
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	draw() 
	{	
		this.canvas.saveState();
		this.canvas.setAlpha(this.alpha);
		
		//Draw icon
		if (this.isEnabled)
		{ 
			if (this.imgActive)
			{
				if (this.isOver)
				{	
					this.drawIconScaled(this.imgActive);
				}
				else
				{
					this.drawIcon(this.imgActive);
				}
			}
			else
			{ 
				if (this.isOver)
				{	
					this.drawIconScaled(this.img);
				}
				else
				{
					this.drawIcon(this.img);
				}
			}
			
		}
		else
		{
			this.canvas.drawImage(this.img, this.pos);
		}
		this.drawSelectionFeedback();	
		
		this.canvas.restoreState();
	}
	
	drawIcon(img)
	{
		this.canvas.drawImage(img, this.pos);
	}
	
	drawIconScaled(img)
	{
		let xAdjustment = ((img.width * this.scale) - img.width)/2;
		let yAdjustment = ((img.height * this.scale) - img.height)/2; 
		let posAdjustment = {x: this.pos.x - xAdjustment, y: this.pos.y - yAdjustment};
		this.canvas.drawImageScaled(img, posAdjustment, this.scale);
	}
	
	drawSelectionFeedback()
	{
		//Draw checkmark
		if (this.hasBeenClicked)
		{
			let posCheck = {x:this.pos.x + this.width/2 - 10, y:this.pos.y + this.height/2 + 5};
			this.canvas.drawImage(this.imgCheck, posCheck);
		}
	}
}