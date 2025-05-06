class Chair extends RoomComponent
{
	constructor(type, pos, width, rotation) 
	{		
		super(pos, type);
		
		//Size variables			
		this.posBack = this.pos;				
		this.posSeat = this.pos;
		this.width = width;						//Full width of the chair
		this.length = this.width;				//Full length/depth of the chair
		this.angle = rotation;					//Angle the chair is rotated to
		this.backWidth = this.width;			//Width of the back of the chair
		this.backDepth =this.length/5*1.25;		//Depth of the back of the chair
		this.armWidth;							//Width of the chair arms
		this.armDepth;							//Depth of the chair arms
		this.seatWidth = this.width;			//Width of the chair seat
		this.seatDepth;							//Depth of the chair seat
	
		//Fill and stroke colors
		this.fColorBack = "#f15a24";
		this.fColorArm = this.fColorBack; 
		this.fColorSeat = "#f7931e";
		this.spacerColor = "#333333";	//Part of office chair that connects back and seat
		this.sColor = "";
		this.sWidth = "";		
		
		this.init();		
	}
	
	/* ------------------------------------------------------------ */
	/* ----- General Set-up --------------------------------------- */
	
	init() 
	{
		//Hide chairs if no chairs are required
		if ((this.type == null) || (this.type == "N/A") || 
			(this.type == "No Seating Required"))
		{
			this.setToHidden(true);
		}
		
		if (this.type == "Office Chair")
		{
			this.length = this.length + this.backDepth*2;
			this.pos = [this.pos[0], this.pos[1] - this.backDepth*2];
		}
		else if (this.type == "Soft Furniture Couch")
		{
			this.width = this.width/2.5;			
			this.backWidth = this.width/5*1.25;			
			this.seatWidth = this.width;	
		}
	}	
	
	getPosForIndicator()
	{
		if (this.type == "Office Chair")
		{
			let adjustedPos = this.pos;
			if (this.angle != 0)
			{
				adjustedPos = [adjustedPos[0], adjustedPos[1] + this.backDepth*2];
			}
			return adjustedPos;
		}
		return this.pos;
	}	
		
	getType()
	{
		if (this.type == "Soft Furniture Couch")
		{
			return "Soft Furniture";
		}
		return this.type;
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	draw()
	{
		//Draw chair
		switch (this.type)
		{	 				
			case "Bar Stool": 				this.drawBarStool(); break;			
			case "Office Chair": 			this.drawOfficeChair(false); break;					
			case "Soft Furniture Couch": 	this.drawSoftFurnitureCouch(); break;
											
			case "Stackable Chair":					
			case "Stackable Wedding Chair":						
			case "Soft Furniture": 			
				this.drawStackableChair(); 
				break;	
		}		
		
		//For testing only - shows the area the chair occupies
		//this.rotateAndAdjustCanvas(canvasTables);  
		//canvasTables.drawRectangle(this.pos, this.width, this.length, "", "#ff0000", "2");
		//canvasTables.restoreState();			
	}		
	
	drawBarStool()
	{	
		//Draw stool (does not need to be rotated like square chairs)
		this.posSeat = [this.pos[0] + this.seatWidth/2, this.pos[1] + this.length/2];
		canvasTables.drawCircle(this.posSeat, this.seatWidth/2, 0, 2, this.fColorSeat, this.sColor, this.sWidth);
	}
	
	drawOfficeChair()
	{			
		//Set position references
		let spacer = this.backDepth;
		this.seatDepth = this.length - this.backDepth*2;
		this.posBack = this.pos;	
		let posSpacer = [this.posBack[0] + this.width/2 - spacer/2, this.posBack[1] + this.backDepth];
		this.posSeat = [this.posBack[0], this.posBack[1] + this.backDepth + spacer];
				
		//Draw chair 
		this.rotateAndAdjustCanvas(canvasTables);  
		canvasTables.drawRectangle(this.posSeat, this.seatWidth, this.seatDepth, this.fColorSeat, this.sColor, this.sWidth);
		canvasTables.drawRectangle(this.posBack, this.backWidth, this.backDepth, this.fColorBack, this.sColor, this.sWidth);
		canvasTables.drawRectangle(posSpacer, spacer, spacer, this.spacerColor, this.sColor, this.sWidth);
		canvasTables.restoreState();		
	}
	
	drawStackableChair()
	{			
		//Set position references
		this.backDepth = this.length/5*1.25;	
		this.seatDepth = this.length;	
		this.posSeat = [this.pos[0] + this.width/2 - this.seatWidth/2, this.pos[1] + this.length - this.seatDepth];
		
		//Draw chair    
		this.rotateAndAdjustCanvas(canvasTables);  
		canvasTables.drawRectangle(this.posSeat, this.seatWidth, this.seatDepth, this.fColorSeat, this.sColor, this.sWidth);
		canvasTables.drawRectangle(this.posBack, this.backWidth, this.backDepth, this.fColorBack, this.sColor, this.sWidth);	
		canvasTables.restoreState();		
	}
		
	drawSoftFurnitureCouch()
	{
		//Set position references				
		this.backDepth = this.length;	
		this.seatDepth = this.length;	
		if (this.angle == -90)
		{
			this.posBack = [this.pos[0] + this.seatWidth - this.backWidth, this.pos[1]];
		}
		
		//Draw couch    
		canvasTables.drawRectangle(this.posSeat, this.seatWidth, this.seatDepth, this.fColorSeat, this.sColor, this.sWidth);
		canvasTables.drawRectangle(this.posBack, this.backWidth, this.backDepth, this.fColorBack, this.sColor, this.sWidth);	
	}
	
	rotateAndAdjustCanvas(canvas)
	{						 		
		canvas.saveState(); 	
		let cPosX = this.posSeat[0] + 0.5 * this.seatWidth;
		let cPosY = this.posSeat[1] + 0.5 * this.seatDepth;    
		canvas.translate([cPosX, cPosY]);              
		canvas.rotate((Math.PI / 180) * -this.angle);  
		canvas.translate([-cPosX, -cPosY]);  
	}

	drawHighlight()
	{
		if ((this.type == "Office Chair") || (this.type == "Stackable Chair") || (this.type == "Soft Furniture"))
		{

			let highlightPos = [this.pos[0] - this.highlightOutline/2, this.pos[1] - this.highlightOutline/2];
			this.rotateAndAdjustCanvas(canvasBackground);  
			canvasBackground.drawRectangle(highlightPos, this.width + this.highlightOutline,  this.length + this.highlightOutline, this.outlineColor, "", "");
			canvasBackground.restoreState();				
		}
		else if ((this.type == "Bar Stool"))
		{
			let highlightPos = [this.pos[0] + this.width/2, this.pos[1] + this.length/2];
			canvasBackground.drawCircle(highlightPos, (this.seatWidth + this.highlightOutline)/2, 0, 2, this.outlineColor, "", "");
		}
		else
		{
			super.drawHighlight();
		}
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
		
		if (this.type == "Office Chair")
		{
			let width = this.width;
			let length = this.length;
			if ((this.angle == -90) || (this.angle == 90))
			{
				width = this.length;
				length = this.width;
			}	
			
			if (this.angle == 90)
			{
				xMin = xMin - this.backDepth*2;
			}
			if (this.angle != 0)
			{
				yMin = yMin + this.backDepth*2;
			}
			xMax = xMin + width;
			yMax = yMin + length;
		}			
		
		let isOver = false;	
		if ((mouseX > xMin) && (mouseX < xMax) &&
			(mouseY > yMin) && (mouseY < yMax)) 
		{
			isOver = true;
		}
		return isOver;
	}
}