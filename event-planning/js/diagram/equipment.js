class Equipment extends RoomComponent
{
	constructor(type, pos) 
	{
		super(pos, type);
		
		//Fill and stroke colors
		this.fColor = "#8e8a7e";
		this.sColor = "#000000";
		this.sWidth;	
		
		this.init();
	}
	
	/* ------------------------------------------------------------ */
	/* ----- General Set-up --------------------------------------- */
	
	init()
	{			
		//Set stroke width depending on diagram scale (thinner stroke when zoomed out further)
		if (diagramScale < 0.3)
		{
			this.sWidth = "1";	
		}
		else
		{
			this.sWidth = "2";	
		}
		
		//Set up for specific equipment
		switch (this.type)
		{
			case "Dance Floor": this.setupDanceFloor(); break;
			case "Stage": 		this.setupStage(); break;
		}
	}	
		
	getType()
	{
		if (this.type.includes("Speaker"))
		{
			//Return speaker without number
			return "Speaker";
		}
		return this.type;
	}
	
	setImage(img)
	{
		super.setImage(img);
		
		//Set equipment width based on img size
		if (this.img)
		{
			this.width = this.img.width * diagramScale;
			this.length = this.img.height * diagramScale;
		}
	}
	
	setupDanceFloor()
	{
		//Set dance floor size based on number of guests
		let numGuests = userSelections.curSelections.numGuests;
		switch(numGuests)
		{
			case "8 to 32":	
				this.width = 175*diagramScale; 
				this.length = 125*diagramScale;	
				break;
				
			case "32 to 100":	
				this.width = 270*diagramScale; 
				this.length = 190*diagramScale;	
				break;
				
			case "100 to 500":	
				this.width = 500*diagramScale; 
				this.length = 470*diagramScale;	
				break;
				
			case "500+": 		
				this.width =900*diagramScale;
				this.length = 700*diagramScale;	 
				break;
		}	
		this.highlightOutline = 12;
	}
	
	setupStage()
	{
		//Set stage size based on number of guests
		let numGuests = userSelections.curSelections.numGuests;
		switch(numGuests)
		{
			case "32 to 100":	this.width = 450*diagramScale; break;
			case "100 to 500":	this.width = 750*diagramScale; break;
			case "500+": 		this.width = 1200*diagramScale; break;
			default:			this.width = 400*diagramScale; break;
		}	
		this.length = 130*diagramScale;
		this.highlightOutline = 12;
	}
	
		
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	draw()
	{	
		switch (this.type)
		{			
			case "Flip Chart": 					
			case "Interactive White Board": 
			case "Microphone":		
			case "Music":		
			case "Podium": 			
			case "Projector and Screen": 
			case "Speaker1": 			
			case "Speaker2": 			
			case "Speaker3": 			
			case "Speaker4": 	
				this.drawImage(); 
				break; 				
			
			case "Dance Floor": 	this.drawDanceFloor(); break;	
			case "Stage": 			this.drawStage(); break;
		}
		
		//For testing only - shows the area the equipment occupies
		//canvasTables.drawRectangle(this.pos, this.width, this.length, "", "#ff0000", "2");
	}
	
	drawImage()
	{
		if (this.img) 
		{		
			canvasEquipment.drawImageScaled(this.img, this.pos, this.width, this.length); 
		}		
	}	
	
	drawDanceFloor()
	{		
		//Draw two squares to represent a dance floor on table canvas (which is below the equipment canvas) so that 
		//it doesn't partially obscure the highlight for the stage
		/*let borderPos = [this.pos[0] - this.width *0.05, this.pos[1] - this.length*0.05];
		canvasTables.drawRectangle(borderPos, this.width*1.1, this.length*1.11, "#5b5b5b", "#000000", "2");
		let innerSquarePos = [this.pos[0] - this.width *0.05, this.pos[1] - this.length*0.05];
		canvasTables.drawRectangle(this.pos, this.width, this.length, "#7e817a", "#000000", "3");*/
		
		
		canvasTables.drawRectangle(this.pos, this.width, this.length, "#5b5b5b", "#000000", "2");
		let innerSquareWidth = this.width*0.9;
		let innerSquareLength = this.length*0.95;
		let innerSquarePos = [this.pos[0] + (this.width - innerSquareWidth)/2, this.pos[1]];
		canvasTables.drawRectangle(innerSquarePos, innerSquareWidth, innerSquareLength, "#7e817a", "#000000", "3");
		
		
		//Determine number of squares for check pattern
		let numSquares;
		let numGuests = userSelections.getCurSelection("numGuests");		
		switch(numGuests)
		{
			case "8 to 32":		numSquares = 5;  break;				
			case "32 to 100":	numSquares = 6; break;
			case "100 to 500":	numSquares = 8; break;
			case "500+": 		numSquares = 12; break;
		}
		
		//Draw check pattern on top
		let color;
		let mainColor = "#7e817a";
		let altColour = "#c2c5be";			
		let squareWidth = innerSquareWidth/numSquares;
		let squareLength = innerSquareLength/numSquares;		
		let pos = innerSquarePos;
		let altSquare = false;
		for(let i = 1; i <= numSquares; i++ ) 
		{	
			//Draw current row of squares for check pattern
			for(let j = 1; j <= numSquares; j++ ) 
			{	
				//Draw current square
				if (altSquare)
				{
					color = altColour;
				}
				else
				{
					color = mainColor;
				}
				canvasTables.drawRectangle(pos, squareWidth, squareLength, color, "", "2");
				
				//Prep for next square
				pos =  [pos[0] + squareWidth, pos[1]];
				altSquare = !altSquare;
			}
			
			//Prep for next row of squares
			if ((numSquares % 2) == 0) altSquare = !altSquare;				
			pos =  [innerSquarePos[0], pos[1] + squareLength];
		}
	}
	
	drawStage()
	{		
		canvasEquipment.drawRectangle(this.pos, this.width, this.length, "#7e817a", "#000000", "2");
	}
	
	drawHighlight()
	{		
		let highlightPos = [this.pos[0] - this.highlightOutline/2, this.pos[1] - this.highlightOutline/2];
		
		let canvas = canvasEquipment;
		if (this.type == "Dance Floor")	canvas = canvasBackground;
		canvas.drawRectangle(highlightPos, this.width + this.highlightOutline,  this.length + this.highlightOutline, this.outlineColor, "", "");
	}
}
