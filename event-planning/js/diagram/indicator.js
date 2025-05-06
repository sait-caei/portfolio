class Indicator
{
	constructor(target)
	{	
		this.target = target;
		this.label;
		this.labelLine2;
		this.pos;
		this.width = 200;
		this.height;		
		this.arrowHeight = 10;		
		this.gapHeight = (this.arrowHeight * 1.25);	
		this.fColor = "#000000";	
		
		this.init();		
	}
	
	/* ------------------------------------------------------------ */
	/* ----- General Set-up --------------------------------------- */
		
	init()
	{		
		this.setLabel();
		this.setSize();
		this.determineSide();	
		this.setPosition(); 
	}
	
	setLabel()
	{
		this.label = this.target.getType();
		if (((this.label.includes("Table")) && (this.label != "Cash Table")) ||
			(this.label.includes("Service")))
		{
			this.labelLine2 = "("+this.target.getSubtype()+")";
		}
	}
	
	setSize()
	{	
		//Set label to reference for width
		let refLabel = this.label;
		if ((this.labelLine2) && (this.labelLine2.length > this.label.length))
		{
			refLabel = this.labelLine2;
		}
		
		//Set width based on the length of the label		
		let labelLength = refLabel.length;
		if (labelLength > 39)
		{
			this.width = 325;
		}
		else if (labelLength > 34)
		{
			this.width = 250;
		}
		else if (labelLength > 29)
		{
			this.width = 225;
		}
		else if (labelLength > 21)
		{
			this.width = 200;
		}	
		else if (labelLength > 19)
		{
			this.width = 175;
		}
		else if (labelLength > 14)
		{
			this.width = 150;
		}		
		else if (labelLength > 9)
		{
			this.width = 125;
		}
		else
		{
			this.width = 100;
		}
		
		//Set height based on number of lines
		this.height = 28;
		if (this.labelLine2)
		{	
			this.height += 26;
		}
	}
	
	determineSide()
	{		
		//Set indicator side based on where target is located
		let targetPos = this.target.getPosForIndicator(); 
		let posX = targetPos[0] - (this.width - this.target.width)/2;
		let posY = targetPos[1];
		if (posX < 3)
		{
			this.side = "right";
		}
		else if ((posX + this.width) > roomDiagram.roomWidth - 3)
		{
			this.side = "left";
		}
		else if (((posY > 100) || (this.label.includes("Table")) || (this.label.includes("Chair"))) && 
			(this.label != "Dance Floor"))
		{
			this.side = "top";	
			if (posY < 40) this.side = "bottom";
		}
		else
		{
			this.side = "bottom";
		}
		
		//These items should always labels in a specific location
		if (this.label.includes("Service"))
		{
			this.side = "left";
		}		
		
		//Check if indicator is vertical pipe and drape, because that will be handled slightly differently
		let isVerticalPipeAndDrape = false;
		if ((this.label == "Pipe and Drape") && (this.target.direction == "vertical"))
		{
			let adjustedPosX = posX + this.width/2 + this.width + this.gapHeight + this.arrowHeight;
			if (adjustedPosX   > roomDiagram.roomWidth - 3)
			{
				this.side = "left";
			}
			else
			{
				this.side = "right";
			}
		}	
		
		this.pos = [posX, posY]; //Use this position going forward to set the final position
	}
	
	setPosition()
	{		
		//Set indicator position 
		let posX = this.pos[0]; 
		let posY = this.pos[1];
		if (this.side == "right")
		{
			posX = posX + this.width/2 + this.target.width/2 + this.gapHeight;
			posY = posY + this.target.length/2 - this.height/2;		
		}
		else if (this.side == "left")
		{
			posX = posX - this.width/2 - this.target.width/2 - this.gapHeight;
			posY = posY + this.target.length/2 - this.height/2;
		}
		else if (this.side == "top")
		{			
			posY = posY - this.height - this.gapHeight;
		}
		else if (this.side == "bottom")
		{
			posY = posY + this.target.length + this.gapHeight;
		}				
		
		//Adjust x position for when the projector is offset
		if (this.target.img)
		{
			let imgSrc = this.target.img.src;
			if (imgSrc.includes("projectorStageOffset"))
			{
				posX += 20 *diagramScale;
			}
		}
		
		
		//The stage can get a bit cluttered so offset its label slightly to make it more clear
		if (this.label == "Stage") posX += this.target.width/4;
		
		this.pos = [posX, posY];
	}
	
			
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	draw()
	{			
		//Draw indicator body
		canvasForeground.drawRectangle(this.pos, this.width, this.height, this.fColor, "", "");
		let labelPos = [this.pos[0] + this.width/2, this.pos[1] + this.height/2];
		if (this.labelLine2)
		{
			let label2Pos = [labelPos[0], labelPos[1] + 10];
			labelPos = [labelPos[0], labelPos[1] - 10];
			canvasForeground.drawText(this.labelLine2, label2Pos, "15px Arial", "#ffffff", "center");
		}
		canvasForeground.drawText(this.label, labelPos, "15px Arial", "#ffffff", "center");
	
		//Draw indicator arrow
		let pos1, pos2, pos3;
		let buffer = 5;
		if (this.side == "right")
		{
			pos1 = [this.pos[0] - this.arrowHeight, this.pos[1] + this.height/2];
			pos2 = [pos1[0] + this.arrowHeight + buffer, pos1[1] - this.arrowHeight];
			pos3 = [pos2[0], pos1[1] + this.arrowHeight];
		} 
		else if (this.side == "left")
		{
			pos1 = [this.pos[0] + this.width + this.arrowHeight, this.pos[1] + this.height/2];
			pos2 = [pos1[0] - this.arrowHeight - buffer, pos1[1] - this.arrowHeight];
			pos3 = [pos2[0], pos1[1] + this.arrowHeight];
		}
		else if (this.side == "top")
		{			
			pos1 = [this.pos[0] + this.width/2 - this.arrowHeight, this.pos[1] + this.height - buffer];
			pos2 = [pos1[0] + this.arrowHeight, pos1[1] + buffer + this.arrowHeight];
			pos3 = [pos1[0] + this.arrowHeight*2, pos1[1]];
		}
		else
		{
			pos1 = [this.pos[0] + this.width/2 - this.arrowHeight, this.pos[1] + buffer];
			pos2 = [pos1[0] + this.arrowHeight, pos1[1] - buffer - this.arrowHeight];
			pos3 = [pos1[0] + this.arrowHeight*2, pos1[1]];
		}
		canvasForeground.drawTriangle(pos1, pos2, pos3, this.fColor, "", "");	
	}
}
