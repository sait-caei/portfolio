class GuestTable extends RoomComponent
{
	constructor(pos, type, width, length, chairType, chairArrangement, numChairsH, numChairsV)
	{	
		super(pos, type);
		
		//General Variables
		this.width = width;
		this.length = length;
		
		//Chairs
		this.chairs;								//List of chairs with table
		this.chairType = chairType;					//Types of chairs with table
		this.chairArrangement = chairArrangement;	//How chairs are arranged around table
		this.numChairsH = numChairsH;				//Number of chairs arranged horizontally
		this.numChairsV = numChairsV;				//Number of chairs arranged vertically
		this.cWidth;								//Chair width/height
		this.cDistance;								//Space between chair and table
				
		//Fill and stroke colors
		this.fColor = "#c9cbbf"; 
		this.sColor = ""; 
		this.sWidth = ""; //A white stroke provides a tiny seperation between tables right next to each other

		this.init();
	}
	
	/* ------------------------------------------------------------ */
	/* ----- General Set-up --------------------------------------- */
		
	init()
	{						
		//Set chair width and distance
		this.cWidth = (tableScale * 8 * diagramScale / 4) * 0.8;
		this.cDistance = (5 * diagramScale);
		
		//Hide table if no tables are required - this allows chairs to be drawn without a table
		if ((this.type == null) || (this.type == "N/A") || 
			(this.type == "No Tables Required"))
		{
			this.setToHidden(true);
		}
		
		this.addChairs();
	}
	
	getType()
	{
		return "Guest Table";
	}
	
	getSubtype()
	{
		return this.type;
	}
		
	setChairsToHidden(bool)
	{
		if (this.chairs)
		{	
			for(let i = 0; i < this.chairs.length; i++ ) 
			{	
				this.chairs[i].setToHidden(true);
			}
		}	
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	draw()
	{
		//Draw table
		if ((this.type == "Rectangles") || (this.type == "Classroom Rectangles"))
		{
			canvasTables.drawRectangle(this.pos, this.width, this.length, this.fColor, this.sColor, this.sWidth);	
		}
		else if ((this.type == "Round") || (this.type == "Cocktail Table"))
		{					
			let pos = [this.pos[0] + this.width/2, this.pos[1] + this.length/2];
			canvasTables.drawCircle(pos, this.width/2, 0, 2, this.fColor, "", "");
		}				
		
		//Draw chairs
		if (this.chairs)
		{	
			for(let i = 0; i < this.chairs.length; i++ ) 
			{	
				this.chairs[i].draw();
			}
		}
		
		//For testing only - shows the area the table occupies
		//canvasTables.drawRectangle(this.pos, this.width, this.length, "", "#ff0000", "2");	
	}
	
	drawHighlight()
	{		
		if ((this.type == "Rectangles") || (this.type == "Classroom Rectangles"))
		{
			super.drawHighlight();
		}
		else if ((this.type == "Round") || (this.type == "Cocktail Table"))
		{					
			let pos = [this.pos[0] + this.width/2, this.pos[1] + this.length/2];
			canvasBackground.drawCircle(pos, this.width/2 + this.highlightOutline/2, 0, 2, this.outlineColor, "", "");				
		}		
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Chairs ----------------------------------------------- */
			
	addChairs()
	{		
		if ((this.chairType == null) || (this.chairType == "") ||
			(this.chairArrangement == null) || (this.chairArrangement == "")) return;
			
		this.chairs = [];
		switch (this.chairArrangement)
		{
			case "crescentsArrangement":	this.addCrescentChairArrangement(); break;
			case "cocktailArrangement":		this.addCocktailChairArrangement(); break;
			case "roundArrangement":		this.addRoundChairArrangement(); break;
			default:						this.addRectangleChairArrangement(); break;
		}	
	}
	
	addChair(pos, rotation)
	{	
		if ((this.chairType == "Soft Furniture") &&
			((rotation == 90) || (rotation == -90)))
		{
			pos = [pos[0], pos[1] - 19*diagramScale];
			this.chairType = "Soft Furniture Couch";
			this.cWidth *= 2.5;
		}
	
		let chair = new Chair(this.chairType, pos, this.cWidth, rotation);
		this.chairs.push(chair);
		return chair;
	}
	
	//Arrangement of six chairs around a round table with a space on one side of the table, facing the stage/speaker
	addCrescentChairArrangement()
	{		
		let pos = this.pos;
		this.addChair([this.pos[0] + this.width, this.pos[1]], -60);
		this.addChair([this.pos[0] + this.width + this.cWidth/6, this.pos[1] + this.length/2 + this.cWidth/6], -110);
		this.addChair([this.pos[0] + this.width/2 + this.cWidth/2, this.pos[1] + this.length], -160);
		this.addChair([this.pos[0], this.pos[1] + this.length], 160);
		this.addChair([this.pos[0] - this.cWidth - this.cWidth/6, this.pos[1] + this.length/2 + this.cWidth/6], 110);
		this.addChair([this.pos[0] - this.cWidth, this.pos[1]], 60);
	}
	
	//Arrangement of four stools around a small table
	addCocktailChairArrangement()
	{		
		this.addChair([this.pos[0] + this.width - this.cDistance, this.pos[1] - this.cWidth + this.cDistance], 0);
		this.addChair([this.pos[0] + this.width - this.cDistance, this.pos[1] + this.width - this.cDistance], 0);
		this.addChair([this.pos[0] - this.cWidth + this.cDistance, this.pos[1] + this.width - this.cDistance], 0);
		this.addChair([this.pos[0] - this.cWidth + this.cDistance, this.pos[1] - this.cWidth + this.cDistance], 0);		
	}	
	
	//Arrangement of eight chairs around a round table
	addRoundChairArrangement()
	{
		this.addChair([this.pos[0] + this.width/2 - this.cWidth/2, this.pos[1] - this.cWidth - this.cDistance], 0);
		this.addChair([this.pos[0] + this.width - this.cWidth/2, this.pos[1] - this.cWidth/2 - this.cDistance], -45);
		this.addChair([this.pos[0] + this.width + this.cDistance, this.pos[1] + this.width/2 - this.cWidth/2], -90);
		this.addChair([this.pos[0] + this.width - this.cWidth/2, this.pos[1] + this.width - this.cWidth/2 + this.cDistance/2], -135);
		this.addChair([this.pos[0] + this.width/2 - this.cWidth/2, this.pos[1] + this.width + this.cDistance], 180);
		this.addChair([this.pos[0] - this.cWidth/2, this.pos[1] + this.width - this.cWidth/2 + this.cDistance/2], 135);
		this.addChair([this.pos[0] - this.cWidth - this.cDistance, this.pos[1] + this.width/2 - this.cWidth/2], 90);
		this.addChair([this.pos[0] - this.cWidth/2, this.pos[1] - this.cWidth/2 - this.cDistance], 45);
	}
	
	//Arrangement of chairs on 1 or more sides of a rectangular tables	
	addRectangleChairArrangement()
	{
		//Set space between chairs, horizontally and vertically
		let cSpacingH = (this.width - (this.cWidth * this.numChairsH))/this.numChairsH;
		let cSpacingV = (this.length - (this.cWidth * this.numChairsV))/this.numChairsV;
		
		let pos, newChair;
		if (this.chairArrangement.includes("T")) //Chairs on top side
		{				
			pos = [this.pos[0] + cSpacingH/2, this.pos[1] - this.cWidth - this.cDistance];
			for(let i = 0; i < this.numChairsH; i++ ) 
			{	
				this.addChair(pos, 0);
				pos = [pos[0] + this.cWidth + cSpacingH, pos[1]]; //Adjust position for next chair
			}
		} 
		if (this.chairArrangement.includes("B")) //Chairs on bottom side
		{		
			pos = [this.pos[0] + cSpacingH/2, this.pos[1] + this.length + this.cDistance];
			for(let i = 0; i < this.numChairsH; i++ ) 
			{	
				this.addChair(pos, 180);
				pos = [pos[0] + this.cWidth + cSpacingH, pos[1]]; //Adjust position for next chair
			}
		}
		if (this.chairArrangement.includes("L")) //Chairs on left side
		{	
			pos = [this.pos[0] - this.cWidth - this.cDistance, this.pos[1] + cSpacingV/2];			
			for(let i = 0; i < this.numChairsV; i++ ) 
			{	
				this.addChair(pos, 90);
				pos = [pos[0], pos[1] + this.cWidth + cSpacingV]; //Adjust position for next chair
			}
		}
		if (this.chairArrangement.includes("R")) //Chairs on right side
		{	
			pos = [this.pos[0] + this.width + this.cDistance, this.pos[1] + cSpacingV/2];
			for(let i = 0; i < this.numChairsV; i++ ) 
			{	
				this.addChair(pos, -90);
				pos = [pos[0], pos[1] + this.cWidth + cSpacingV]; //Adjust position for next chair
			}
		}
	}
}
