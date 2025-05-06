class Target 
{
	constructor(pos, width, height) 
	{
		//General
		this.pos = pos;
		this.curDragger;
		this.width = width;
		this.height = height;
		
		//Border
		this.dashedBorderIsVisible;
		this.borderColor = "#000000";
		this.borderWidth = "4";
		
		this.init();
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- General Set-up --------------------------------------- */
	
	init()
	{	
		this.setDashedBorderToVisible(false);
	
		this.reset();	
	}
	
	reset()
	{
		this.curDragger = null;
	}
	
	setDashedBorderToVisible(bln)
	{
		this.dashedBorderIsVisible = bln;
	}
	
	/* ------------------------------------------------------------ */
	/* ----- User Interaction ------------------------------------- */
			
	isMouseOver(mouseX, mouseY) 
	{
		
		let xMin = this.pos.x;
		let xMax = this.pos.x + this.width;
		let yMin = this.pos.y;
		let yMax = this.pos.y + this.height;
		
		let isOver = false;	
		if ((mouseX > xMin) && (mouseX < xMax) &&
			(mouseY > yMin) && (mouseY < yMax)) 
		{ 
			isOver = true;
		} 
		return isOver;
	}
	
	setToOccupied(dragger)
	{
		if (this.isItOccupied())
		{
			this.curDragger.reset();
		}		
		this.curDragger = dragger;
	}
	
	isItOccupied()
	{
		let isOccupied = false;
		if (this.curDragger) isOccupied = true;
		return isOccupied;
	}
	
		
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	draw() 
	{	
		//For testing and placement only
		/*canvasMidground.saveState();
		canvasMidground.setAlpha(0.2);
		canvasMidground.drawRectangle(this.pos, this.width, this.height, "#00ffff", "", "");
		canvasMidground.restoreState();*/
		
		//Draw dashed border
		if (this.dashedBorderIsVisible) 
		{
			let pos = this.pos;
			canvasMidground.drawDashedLine(pos, {x:pos.x + this.width, y:pos.y}, 12, 7, this.borderColor, this.borderWidth/2);
			canvasMidground.drawDashedLine({x:pos.x + this.width, y:pos.y}, {x:pos.x + this.width, y:pos.y + this.height}, 12, 7, this.borderColor, this.borderWidth/2);
			canvasMidground.drawDashedLine({x:pos.x + this.width, y:pos.y + this.height}, {x:pos.x, y:pos.y + this.height}, 12, 7, this.borderColor, this.borderWidth/2);
			canvasMidground.drawDashedLine({x:pos.x, y:pos.y + this.height}, pos, 12, 7, this.borderColor, this.borderWidth/2);
		}
	}
	
}