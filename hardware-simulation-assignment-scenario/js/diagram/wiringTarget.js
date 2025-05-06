class WiringTarget extends Target
{
	constructor(id, name, option, posOffset) 
	{		
		super(id, name, posOffset);
		this.option = option;	
		
		this.type = "wiringTarget";
		this.shape = "circle";	
		this.radius = 8;
		this.posMagnified;
		this.connections; //List of connections currently attached to this wiring target
		
		this.fillColor = "rgba(193, 243, 89, 0.5)";
		this.strokeColor = "rgba(255, 255, 255, 0.5)";
		this.fillColorHover = "rgba(193, 243, 89, 0.7)";
		this.strokeColorHover = "rgba(255, 255, 255, 0.7)";
		this.strokeWidth = "2";
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- General ---------------------------------------------- */
	
	reset()
	{	
		super.reset();
		
		this.enable(false);
		this.connections = [];
		this.posMagnified = null;
	}	
	
	getPosMagnified()
	{		
		return this.posMagnified;
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Draw ------------------------------------------------- */
	
	draw()
	{			
		if (this.isEnabled)
		{
			if (this.highlightIsVisible)
			{		
				canvasWireTargets.drawCircle(this.pos, this.radius, this.fillColorHover, this.strokeColorHover, this.strokeWidth);
			}
			else
			{
				canvasWireTargets.drawCircle(this.pos, this.radius, this.fillColor, this.strokeColor, this.strokeWidth);
			}
		}	
	}	
	
	drawMagnified(posRefMag)
	{	
		//Set position even if target is not enabled so wires be drawn to target location
		let posX = posRefMag.x + this.posOffset.x * (this.scaleMag/this.scaleNormal);
		let posY = posRefMag.y + this.posOffset.y * (this.scaleMag/this.scaleNormal);
		this.posMagnified = {x:posX, y:posY};
			
		if (this.isEnabled)
		{
			let radiusMag = this.radius * (this.scaleMag/this.scaleNormal)
			if (this.highlightIsVisible)
			{		
				canvasMagnification.drawCircle(this.posMagnified, radiusMag, this.fillColorHover, this.strokeColorHover, this.strokeWidth);
			}
			else
			{
				canvasMagnification.drawCircle(this.posMagnified, radiusMag, this.fillColor, this.strokeColor, this.strokeWidth);
			}
		}	
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Connections ------------------------------------------ */
	
	getConnections()
	{
		return this.connections;
	}
	
	addConnection(conn)
	{	
		this.connections.push(conn);
	}
	
	removeConnection(conn)
	{
		for (let i = 0; i < this.connections.length; i++)
		{
			if (this.connections[i] == conn)
			{	
				this.connections.splice(i, 1);
			}				
		}
	}
	
	/* ------------------------------------------------------------ */
	/* ----- User Interaction ------------------------------------- */
	
	isMouseOver(mouseX, mouseY)
	{
		if (!this.isEnabled) return;
		
		let buffer = 2;
		let xMin = this.pos.x - this.radius - buffer;
		let	xMax = this.pos.x + this.radius + buffer;
		let	yMin = this.pos.y - this.radius - buffer;
		let	yMax = this.pos.y + this.radius + buffer;
		//console.log(xMin, xMax, yMin, yMax);
		//console.log(mouseX, mouseY);
		
		let isOver = false;	
		if ((mouseX > xMin) && (mouseX < xMax) &&
			(mouseY > yMin) && (mouseY < yMax)) 
		{
			isOver = true;
		} 
		return isOver;
	}
}