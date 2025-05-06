class InfoDialog 
{
	constructor() 
	{				
		this.pos;
		this.posBackground;
		this.width;
		this.height;
		this.tailHeight = 10;
		this.txtLines = [];
		
		this.fillColor = "#ffffff";
		this.strokeColor = "#000000";
		this.strokeWidth = "2";
		this.fontStyle = "12px Arial";
		this.fontStyleBold = "Bold 12px Arial";
		this.fontColor = "#000000";
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- General ---------------------------------------------- */
		
	setTarget(target)
	{
		if (target == null) return;
			
		//Set dialog text
		this.txtLines = [];
		this.pos = target.getPos();		
		if (target.type == "wiringTarget")
		{
			this.setWiringTargetText(target);
		}
		else if (target.type == "dropTarget")
		{
			this.setDropTargetText(target);
		}
		
		//Resize dialog width
		let textWidth = 0;
		let fontStyle = this.fontStyleBold;
		for (let i = 0; i < this.txtLines.length; i++)
		{
			let lineWidth = canvasWires.measureText(fontStyle, this.txtLines[i]);
			if (lineWidth > textWidth) textWidth = lineWidth;
			if (i == 0) fontStyle = this.fontStyle;
		}		
		this.width = textWidth + 24; 
		
		//Resize dialog height
		this.height = 16 * this.txtLines.length + 10;	

		//Set general position
		this.pos = {x: target.getPos().x, y: target.getPos().y - this.height - this.tailHeight*1.5 + 1};		
		if (target.type == "wiringTarget")
		{
			this.pos = {x: this.pos.x - this.width/2, y: this.pos.y};
		}
		else if (target.type == "dropTarget")
		{
			this.pos = {x: this.pos.x + target.getWidth()/2 - this.width/2, y: this.pos.y};
		}
		
		//Set background position
		this.posBackground = this.pos; 
		if (this.posBackground.x < 15)
		{
			this.posBackground = {x: 15, y:this.posBackground.y};
		}		
	}
	
	setDropTargetText(target)
	{	
		this.txtLines.push(target.name + ": ");
			
		if (target.getOccupyingDragger())
		{
			this.txtLines.push(target.getOccupyingDragger().name);
		}
		else
		{
			this.txtLines.push("No component installed");
		}
	}
	
	setWiringTargetText(target)
	{	
		let targetName = this.setDisplayText(target);
		this.txtLines.push(targetName + ": ");
		
		let connections = target.getConnections(); 
		if (connections.length > 0)
		{
			for (let i = 0; i < connections.length; i++)
			{
				let txt = "-Connected to ";				
				let connection = connections[i];
				if (connection.target1.id ==  target.id)
				{
					let target = this.setDisplayText(connection.target2)
					txt += main.editDisplayText(target);
				}
				else if (connection.target2.id ==  target.id)
				{
					let target = this.setDisplayText(connection.target1)
					txt += main.editDisplayText(target);
				}
				txt += " with "+main.editDisplayText(connection.getConnectingComponent().name);
				
				this.txtLines.push(txt);
				txt = "";
			}
		}
		else
		{
			this.txtLines.push("No connections");
		}
	}
	
	setDisplayText(target)
	{	
		let txt;	
		if (main.simulationMode == "activity")
		{
			txt = target.name;
		}
		else
		{
			txt = target.option;
		}
		
		return txt;
	}
	
	
	
	/* ------------------------------------------------------------ */
	/* ----- Draw ------------------------------------------------- */
	
	draw()
	{			
		//Draw dialog background
		canvasForeground.drawRectangle(this.posBackground, this.width, this.height, this.fillColor, this.strokeColor, this.strokeWidth);
		
		//Draw dialog tail
		let pos2 = {x: this.pos.x + this.width/2, y: this.pos.y + this.height + this.tailHeight};
		let pos1 = {x: pos2.x - this.tailHeight, y: pos2.y - this.tailHeight - 3};
		let pos3 = {x: pos2.x + this.tailHeight, y: pos2.y - this.tailHeight - 3};
		canvasForeground.drawTriangle(pos1, pos2, pos3, this.fillColor, this.strokeColor, this.strokeWidth);
		
		//Mask the top of the dialog tail
		let pos = {x: pos1.x - this.strokeWidth, y: pos1.y - this.strokeWidth};
		canvasForeground.drawRectangle(pos, 24, 4, this.fillColor, "", "");
		
		//Draw dialog text
		let txtPos = {x: this.posBackground.x + this.width/2, y: this.posBackground.y + 14};
		let fontStyle = this.fontStyleBold;
		for (let i = 0; i < this.txtLines.length; i++)
		{
			canvasForeground.drawText(this.txtLines[i], txtPos, fontStyle, this.fontColor, "center");
			txtPos = {x: txtPos.x, y: txtPos.y + 14};
			if (i == 0) fontStyle = this.fontStyle;
		}
	}
}