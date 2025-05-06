class RoomComponent
{
	constructor(pos, type)
	{		
		this.pos = pos;	
		this.type = type;	
		this.width;			
		this.length;	
		this.img;	
		this.isHidden;
		this.highlightOutline = 10 * diagramScale;
		
		this.outlineColor = "rgba(255, 255, 0, 0.25)";
		//this.outlineColor = "rgba(255, 0, 0, 1)"; //For testing only
	}
	
	/* ------------------------------------------------------------ */
	/* ----- General Set-up --------------------------------------- */
	
	init() 
	{ 
		this.setToHidden(false);
	}
	
	setPos(pos)
	{
		this.pos = pos;
	}
	
	getPosForIndicator()
	{
		return this.pos;
	}
	
	getType()
	{
		return this.type;
	}
	
	getWidth()
	{
		return this.width;
	}
	
	getHeight()
	{
		return this.length;
	}
	
	setImage(img)
	{
		this.img = img;
	}
	
	
			
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
		
	//Basic highlight for rectangular objects
	drawHighlight()
	{			
		let highlightPos = [this.pos[0] - this.highlightOutline/2, this.pos[1] - this.highlightOutline/2];
		canvasBackground.drawRectangle(highlightPos, this.width + this.highlightOutline,  this.length + this.highlightOutline, this.outlineColor, "", "");
	}
		
	
	/* ------------------------------------------------------------ */
	/* ----- Interaction ------------------------------------------ */
	
	isMouseOver(mouseX, mouseY) 
	{
		if (this.isHidden) return false;		
		
		let xMin = this.pos[0];
		let xMax = xMin + this.width;
		let yMin = this.pos[1];
		let yMax = yMin + this.length;
				
		let isOver = false;	
		if ((mouseX > xMin) && (mouseX < xMax) &&
			(mouseY > yMin) && (mouseY < yMax)) 
		{
			isOver = true;
		} 
		return isOver;
	}
	
	setToHidden(bool)
	{
		this.isHidden = bool;
	}
}
