class Interactable
{
	constructor(canvas, id, pos) 
	{
		//General
		this.canvas = canvas;
		this.id = id;			//Interactable id
		this.pos = pos;			//Interactable position
		
		//Interaction
		this.isEnabled;		//Whether or not the interactable is currently enabled
		this.isOver;		//Whether or not mouse is currently over interactable
		this.isActive;		//Whether or not interactable is currently active
		
		this.init();
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- General Set-up --------------------------------------- */
		
	init()
	{		
		this.reset();
	}	
	
	reset()
	{	
		this.setToEnabled(false);	
		this.setToOver(false);	
		this.setToActive(false);	
	}	
	
	getCanvas()
	{
		return this.canvas;
	}
	
	getID()
	{
		return this.id;
	}
	getText() { }
	
	getWidth()
	{
		return this.width;
	}
	
	getHeight()
	{
		return this.height;
	}
	
		
	/* ------------------------------------------------------------ */
	/* ----- State ------------------------------------------------ */
		
	setToEnabled(bln)
	{
		this.isEnabled = bln; 
		if (!bln) this.setToActive(false);
	}
	
	isItEnabled()
	{
		return this.isEnabled;
	}
	
	setToOver(bool)
	{
		this.isOver = bool;
	}
	
	setToActive(bool)
	{
		this.isActive = bool;
	}
	
	
	
	/* ------------------------------------------------------------ */
	/* ----- User Interaction ------------------------------------- */
	
	isMouseOver(mouseX, mouseY) 
	{		
		if (!this.isItEnabled()) return;	
		this.setToOver(false);	
	
		let xMin = this.pos.x;
		let xMax = this.pos.x + this.width;
		let yMin = this.pos.y;
		let yMax = this.pos.y + this.height;	
		if ((mouseX > xMin) && (mouseX < xMax) &&
			(mouseY > yMin) && (mouseY < yMax)) 
		{ 
			this.setToOver(true);
		} 
		
		return this.isOver;
	}

	setToOver(bln)
	{
		this.isOver = bln;
	}	
}