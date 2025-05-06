class PipeAndDrape extends Equipment
{
	constructor(pos, direction, width, length) 
	{	
		super("Pipe and Drape", pos);
		
		this.direction = direction;
		this.width = width;
		this.length = length;
		this.highlightOutline = 16 * diagramScale;
		
		this.init();
	}
		
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
		
	draw()
	{				
		if (this.direction == "horizontal")
		{
			canvasEquipment.drawLine(this.pos, [this.pos[0] + this.width, this.pos[1]], this.sColor, this.sWidth);
		}
		else if (this.direction == "vertical")
		{
			canvasEquipment.drawLine(this.pos, [this.pos[0], this.pos[1] + this.length], this.sColor, this.sWidth);
		}
	}

	/* ------------------------------------------------------------ */
	/* ----- Interaction ------------------------------------------ */
	
	isMouseOver(mouseX, mouseY) 
	{			
		let buffer = 10 * diagramScale;
		let xMin = this.pos[0];
		let xMax = this.pos[0] + this.width;
		let yMin = this.pos[1];
		let yMax = this.pos[1] + this.length;

		let isOver = false;	
		if ((this.direction == "horizontal") && (mouseX > xMin) && (mouseX < xMax))
		{
			//Is mouse over pipe and drape on the top side of a booth?
			if ((mouseY > yMin - buffer) && (mouseY < yMin + buffer)) 
			{ 
				isOver = true;
			} 
			
			//Is mouse over pipe and drape on the bottom side of a booth?
			if ((mouseY > yMax - buffer) && (mouseY < yMin + buffer)) 
			{ 
				isOver = true;
			} 
		}
		
		if ((this.direction == "vertical") && ((mouseY > yMin) && (mouseY < yMax)) && (!isOver))
		{
			//Is mouse over pipe and drape on the left side of a booth?
			if (((mouseX > xMin - buffer) && (mouseX < xMin + buffer)))
			{
				isOver = true;					
			}
			
			//Is mouse over pipe and drape on the right side of a booth?
			if (((mouseX > xMax - buffer) && (mouseX < xMax + buffer)))
			{
				isOver = true;					
			}
		}

		return isOver;
	}
}
