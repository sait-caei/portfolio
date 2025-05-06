class WiringConnection
{
	constructor(component, target1, target2) 
	{		
		this.component = component
		this.target1 = target1;
		this.target2 = target2;
		this.strokeColour = "#000000";
		this.strokeWidth = "4";
		
		this.init();
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- General ---------------------------------------------- */
	
	init()
	{		
		this.target1.addConnection(this);
		this.target2.addConnection(this);
	}
	
	reset()
	{
		this.target1.removeConnection(this);
		this.target2.removeConnection(this);
	}
	
	getConnectingComponent()
	{	
		return this.component;
	}	
	
	
	/* ------------------------------------------------------------ */
	/* ----- Draw ------------------------------------------------- */
	
	draw()
	{	
		canvasWires.drawLine(this.target1.getPos(), this.target2.getPos(), this.strokeColour, this.strokeWidth);	
	}	
	
	drawMagnified(posRefMag)
	{		
		canvasMagnification.drawLine(this.target1.getPosMagnified(), this.target2.getPosMagnified(), this.strokeColour, this.strokeWidth * 2);	
	}
}