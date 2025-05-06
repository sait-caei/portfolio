const canvasBackground = new CanvasManager(document.getElementById("canvasBackground"));
const canvasTables = new CanvasManager(document.getElementById("canvasTables"));
const canvasEquipment = new CanvasManager(document.getElementById("canvasEquipment"));
const canvasForeground = new CanvasManager(document.getElementById("canvasForeground"));
let diagramScale; //A scale based on (a) the size of the canvas container, which is determined by the width
				  //of the browser and (b) the relative size of the furniture/equipment in the room, which is
				  //set manually based on how much needs to fit in that room
const tableScale = 16;


class Room
{
	constructor() 
	{	
		//Sizing variables
		this.canvasDiv = document.getElementById("canvasContainer");
		this.canvasWidth;
		this.canvasHeight;	
		this.roomWidth;
		this.roomHeight;	
		this.maxRoomWidth  = 600;
		this.maxRoomHeight = 500;
		this.containerScale; //Scale based on the size of the canvas container, multiplied with contentScale to determine the overall diagramScale
		this.contentScale;   //Scale based on how much furniture/equipment needs to fit in the room, multiplied with containerScale to determine the overall diagramScale
		
		//Position Variables
		this.posRoom = [1, 1];	 	//Position to draw the room
		this.posCentre;
		this.posGuestTables;		//Position to draw guest tables
		
		//Tables, Chairs and Equipment
		this.guestTables;
		this.guestTablesH;
		this.guestTablesV;
		this.numChairsH;
		this.numChairsV;		
		this.serviceTablesAndIcons;
		this.tableType;
		this.tLength;
		this.tWidth;		
		this.tSpacingH;
		this.tSpacingV;
		this.cArrangement;
		this.equipment;	
		
		//Indicator
		this.indicator;
		this.indicatorTarget;
			
		//User Selections	
		this.functionType;
		this.roomLayout;
		this.numGuests;	
		this.tableType;
		this.seatType;
		this.equipmentType
		this.danceFloor;		
		
		//Images
		this.imagesLoaded;
		this.imgFlipChart;
		this.imgFlipChartTurned;
		this.imgMicrophone;
		this.music;
		this.imgPodium;
		this.imgProjector;
		this.imgProjectorNoTable;
		this.imgProjectorStage;
		this.imgProjectorStageOffset;
		this.imgSpeaker;
		this.imgSpeakerFlipped;
		this.imgWhiteBoard;
		this.imgWhiteBoardTurned;
		this.imgWhiteBoardTurnedAlt;
		this.imgIconFood;
		this.imgIconBeverage;
		this.imgDoor;
		this.imgDoorFlipped;
		
		//Interaction		
		this.mouseX;			//Current x position of mouse/finger
		this.mouseY;			//Current y position of mouse/finger
		this.mouseDown;			//Boolean tracking whether or not the mouse/finger is down		
	}
	
	/* ------------------------------------------------------------ */
	/* ----- General Set-up --------------------------------------- */
	
	init()
	{				
		//Set-up equipment images		
		this.imagesLoaded = 0;
		this.imgFlipChart = new Image();
		this.imgFlipChart.src = "img/roomDiagram/flipChart.png";
		this.imgFlipChart.onload = () => { this.onImageLoaded(); }
		this.imgFlipChartTurned = new Image();
		this.imgFlipChartTurned.src = "img/roomDiagram/flipChartTurned.png";
		this.imgFlipChartTurned.onload = () => { this.onImageLoaded(); }
		this.imgMicrophone = new Image();
		this.imgMicrophone.src = "img/roomDiagram/microphone.png";
		this.imgMicrophone.onload = () => { this.onImageLoaded(); }
		this.imgMusic = new Image();
		this.imgMusic.src = "img/roomDiagram/music.png";
		this.imgMusic.onload = () => { this.onImageLoaded(); }
		this.imgPodium = new Image();
		this.imgPodium.src = "img/roomDiagram/podium.png";
		this.imgPodium.onload = () => { this.onImageLoaded(); }
		this.imgProjector = new Image();
		this.imgProjector.src = "img/roomDiagram/projector.png";
		this.imgProjector.onload = () => { this.onImageLoaded(); }
		this.imgProjectorStage = new Image();
		this.imgProjectorStage.src = "img/roomDiagram/projectorStage.png";
		this.imgProjectorStage.onload = () => { this.onImageLoaded(); }
		this.imgSpeaker = new Image();
		this.imgSpeaker.src = "img/roomDiagram/speaker.png";
		this.imgSpeaker.onload = () => { this.onImageLoaded(); }
		this.imgSpeakerFlipped = new Image();
		this.imgSpeakerFlipped.src = "img/roomDiagram/speakerFlipped.png";
		this.imgSpeakerFlipped.onload = () => { this.onImageLoaded(); }
		this.imgWhiteBoard = new Image();
		this.imgWhiteBoard.src = "img/roomDiagram/intWhiteBoard.png";
		this.imgWhiteBoard.onload = () => { this.onImageLoaded(); }		
		this.imgWhiteBoardTurned = new Image();
		this.imgWhiteBoardTurned.src = "img/roomDiagram/intWhiteBoardTurned.png";
		this.imgWhiteBoardTurned.onload = () => { this.onImageLoaded(); }	
		this.imgWhiteBoardTurnedAlt = new Image();
		this.imgWhiteBoardTurnedAlt.src = "img/roomDiagram/intWhiteBoardTurnedAlt.png";
		this.imgWhiteBoardTurnedAlt.onload = () => { this.onImageLoaded(); }
				
		//Add mouse/touch events
		canvasForeground.src.addEventListener('mousemove', this.onMouseMove, false); 
		canvasForeground.src.addEventListener('mousedown', this.onMouseDown, false);	
		canvasForeground.src.addEventListener('mouseup', this.onMouseUp, false);
		canvasForeground.src.addEventListener ("mouseout", this.onMouseUp, false);		
		canvasForeground.src.addEventListener('touchstart', this.onTouchStart, false);
		canvasForeground.src.addEventListener('touchmove', this.onTouchMove, false); 	
		canvasForeground.src.addEventListener('touchend', this.onTouchEnd, false);
	}
	
	onImageLoaded()
	{
		this.imagesLoaded++;
		
		if (this.imagesLoaded >= 12)
		{
			//Re-draw diagram after all images loaded just in case the diagram was drawn
			//before the images were done loading
			this.reset();
		}
	}
	
	reset() 
	{	
		//Reset variables
		this.guestTables = [];
		this.serviceTablesAndIcons = [];	
		this.equipment = [];	
		this.functionType = userSelections.getCurSelection("functionType");
		this.functionSubType = userSelections.getCurSelection("functionSubType"); 
		this.roomLayout = userSelections.getCurSelection("roomLayout");
		this.numGuests = userSelections.getCurSelection("numGuests");	
		this.tableType = userSelections.getCurSelection("tableType");
		this.seatType = userSelections.getCurSelection("seatingType");
		this.equipmentType = userSelections.getCurSelection("equipment");
		this.foodType = userSelections.getCurSelection("foodType");
		this.foodServiceType = userSelections.getCurSelection("foodServiceType");
		this.beverageType = userSelections.getCurSelection("beverageType");
		this.beverageServiceType = userSelections.getCurSelection("beverageServiceType");
		this.danceFloor = null;
		this.indicator = null;		
		this.mouseX = 0;
		this.mouseY = 0;
		
		//Set size and scale
		this.setCanvasSize();
		this.setCanvasScale();
		this.setTableSize(this.tableType);
				
		//Prep for drawing
		this.setupRoomLayout();	
		this.setupFoodService();
		this.setupBeverageService();	
		this.setupEquipment();	
						
		this.draw();
	}
	
	setCanvasSize()
	{					
		//Set canvas dimensions	
		this.roomWidth = 600;
		if (this.roomWidth > this.maxRoomWidth ) this.roomWidth = this.maxRoomWidth ;
		this.containerScale = this.roomWidth/this.maxRoomWidth ;
		this.roomHeight = this.maxRoomHeight * this.containerScale;			
		
		//Set canvas centre position
		this.posCentre = [this.posRoom[0] + this.roomWidth/2, this.posRoom[1] + this.roomHeight/2];
	}
	
	setCanvasScale()
	{
		switch(this.numGuests)
		{
			case "8 to 32":	 
				this.contentScale = 0.9;			
				if (this.roomLayout == "Boardroom") 
				{
					if (this.functionType == "Social Event") 
					{
						this.contentScale = 0.6;
					}
					else
					{
						this.contentScale = 0.75;
					}
				}
				else if (this.roomLayout == "Hollow square")
				{
					if (this.functionType == "Social Event") 
					{
						this.contentScale = 0.7;
					}
					else
					{
						this.contentScale = 0.9;
					}
				}
				else if (this.roomLayout == "U shape")
				{
					if (this.functionType == "Social Event") 
					{
						this.contentScale = 0.85;
					}
					else
					{
						this.contentScale = 0.9;
					}
				}
				break;
			case "32 to 100":	this.contentScale = 0.75; break;
			case "100 to 500":	this.contentScale = 0.40; break;
			case "500+":		this.contentScale = 0.25; break;
		}	
		if (this.roomLayout == "Reception") this.contentScale *= 0.90;
		if (this.functionType == "Tradeshow") this.contentScale *= 0.60;		
		
		diagramScale = this.containerScale * this.contentScale;
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	draw()
	{		
		canvasBackground.clearAll();
		canvasTables.clearAll();
		canvasEquipment.clearAll();
		canvasForeground.clearAll();
	
		//Draw tables and equipment
		this.drawGuestTables();
		this.drawServiceTablesAndIcons();
		this.drawEquipment();
		this.drawWallsAndDoors();	
	}
	
	drawGuestTables()
	{		
		let drawnTables = 0;
		if (this.guestTables != null)
		{	
			for(let i = 0; i < this.guestTables.length; i++ ) 
			{	
				let table = this.guestTables[i];
				let overlapsDanceFloor = this.doesTableOverlapDanceFloor(table);
				if (!overlapsDanceFloor)
				{	
					table.draw();	
					drawnTables++;
				}
			}
		}
		
		if ((this.roomLayout == "Hollow square") && ((this.equipmentType) && (this.equipmentType.includes("Projector and Screen"))))
		{
			for(let i = 0; i < this.equipment.length; i++) 
			{			
				if (this.equipment[i].type =="Projector and Screen") this.equipment[i].draw();
			}
		}
		
		//For testing only
		//console.log(this.numGuests, drawnTables);
		//console.log("General:", this.numGuests,drawnTables*4, this.guestTables.length*4);
		//console.log("Banquet:", this.numGuests,drawnTables*8, this.guestTables.length*8);
		//console.log("Classroom:", this.numGuests,drawnTables*2, this.guestTables.length*2);
		//console.log("Crescents:", this.numGuests,drawnTables*6, this.guestTables.length*6);
		//console.log("Reception:", this.numGuests,drawnTables, this.guestTables.length);
		//console.log("Theatre:", this.numGuests,drawnTables, this.guestTables.length);
		//console.log("Tradeshow:", this.numGuests, this.guestTables.length);
	}
	
	drawServiceTablesAndIcons()
	{		
		if (this.serviceTablesAndIcons != null)
		{	
			for(let i = 0; i < this.serviceTablesAndIcons.length; i++ ) 
			{	
				this.serviceTablesAndIcons[i].draw("");	
			}
		}
	}
	
	drawEquipment()
	{				
		//Draw floor level equipment
		for(let i = 0; i < this.equipment.length; i++) 
		{	
			if ((!this.isMidLevelEquipment(this.equipment[i])) && (!this.isTopLevelEquipment(this.equipment[i])))
			{
				this.equipment[i].draw();
			}				
		}		
		
		//If target is a mid-level equipment item, draw the highlight now	
		if (this.isMidLevelEquipment(this.indicatorTarget)) this.drawTargetHighlight();
		
		//Draw mid-level equipment that may be sitting on top of floor-level equipment
		for(let i = 0; i < this.equipment.length; i++) 
		{	
			if (this.isMidLevelEquipment(this.equipment[i]))
			{
				this.equipment[i].draw();
			}				
		}
		
		//If target is a top-level equipment item, draw the highlight now
		if (this.isTopLevelEquipment(this.indicatorTarget))	this.drawTargetHighlight();
		
		//Draw top-level equipment that may be sitting on top of mid-level equipment
		for(let i = 0; i < this.equipment.length; i++) 
		{	
			if (this.isTopLevelEquipment(this.equipment[i]))
			{
				this.equipment[i].draw();
			}				
		}
		
		//Centering guide - for set-up/testing only
		//canvasForeground.drawRectangle([1,1], this.roomWidth-2, this.roomHeight/2, "", "#000000", "2");
		//canvasForeground.drawRectangle([1,1], this.roomWidth/2, this.roomHeight - 2, "", "#000000", "2");	
	}
		
	drawWallsAndDoors()
	{
		let roomPos = [1,1];
		let doorWidth = 30*diagramScale;
		let xPosDoorL = 50*diagramScale;
		let xPosDoorR = this.roomWidth - roomPos[0] - xPosDoorL;
		
		//Draw walls
		let wallColor = "#000000";
		canvasForeground.drawLine([roomPos[0]-1,roomPos[1]], [this.roomWidth, 1], wallColor, "2");	
		canvasForeground.drawLine([roomPos[0],roomPos[1]], [roomPos[0], this.roomHeight-2], wallColor, "2");	
		canvasForeground.drawLine([this.roomWidth-1,roomPos[1]], [this.roomWidth-1, this.roomHeight-2], wallColor, "2");		
		canvasForeground.drawLine([roomPos[0]-1,this.roomHeight-1], [xPosDoorL, this.roomHeight-1], wallColor, "2");	
		canvasForeground.drawLine([xPosDoorL + doorWidth,this.roomHeight-1], [xPosDoorR-doorWidth, this.roomHeight-1], wallColor, "2");	
		canvasForeground.drawLine([xPosDoorR,this.roomHeight-1], [roomPos[0] + this.roomWidth, this.roomHeight-1], wallColor, "2");	
		
		//Draw door		
		let pos = [xPosDoorR, this.roomHeight-1];
		canvasForeground.drawOval(pos, doorWidth, 1, 1.5, 1, 0.9, "#ffffff", wallColor, "2");
		canvasForeground.drawLine(pos, [pos[0], pos[1] - 27*diagramScale], wallColor, "2");	
		
		//Draw a second door in larger rooms
		if (diagramScale <= 0.5)
		{
			pos = [xPosDoorL, pos[1]];
			canvasForeground.drawOval(pos, doorWidth, 1.5, 2, 1, 0.9, "#ffffff", wallColor, "2");
			canvasForeground.drawLine(pos, [pos[0], pos[1] - 27*diagramScale], wallColor, "2");	
		}
		else
		{
			canvasForeground.drawLine([xPosDoorL,this.roomHeight-1], [xPosDoorL + doorWidth, this.roomHeight-1], wallColor, "2");
		}
				
		//Centering guide - for setup only
		//canvasForeground.drawRectangle([1,1], this.roomWidth-2, this.roomHeight/2, "", "#000000", "2");
		//canvasForeground.drawRectangle([1,1], this.roomWidth/2, this.roomHeight-2, "", "#000000", "2");
	}
	
	//Draw an text label for an object that the user is hovering over or has clicked
	drawIndicator()
	{		
		canvasBackground.clearAll();
		canvasEquipment.clearAll();
		canvasForeground.clearAll();
					
		if (this.indicator) 
		{	
			let targType = this.indicatorTarget.type;
			if ((!this.isMidLevelEquipment(this.indicatorTarget)) && (!this.isTopLevelEquipment(this.indicatorTarget)))
			{
				this.drawTargetHighlight();
			}
			this.drawEquipment();
			this.drawWallsAndDoors();
			this.indicator.draw(); 
		}
		else
		{
			this.drawEquipment();
			this.drawWallsAndDoors();
		}
	}
	
	//Draw highlight for an object that the user is hovering over or has clicked
	drawTargetHighlight()
	{
		this.indicatorTarget.drawHighlight();
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Room Layouts ----------------------------------------- */
		
	setupRoomLayout()
	{
		if (this.functionType == "Tradeshow")
		{
			this.setupTradeshowLayout();
		}
		else
		{	
			switch (this.roomLayout)
			{
				case "Banquet":			this.setupBanquetLayout(); break;
				case "Boardroom":		this.setupBoardRoomLayout(); break;
				case "Booths":			this.setupBoothsLayout(); break;
				case "Classroom":		this.setupClassroomLayout(); break;
				case "Crescents":		this.setupCrescentsLayout(); break;
				case "Hollow square":	this.setupHollowSquareLayout(); break;
				case "Reception":		this.setupReceptionLayout(); break;
				case "Theatre":			this.setupTheatreLayout(); break;
				case "U shape":			this.setupUShapeLayout(); break;
			}
		}
	}
		
	setupBanquetLayout()
	{							
		//Determine number of tables to use depending on number of guests
		
		switch(this.numGuests)
		{
			case "8 to 32":		this.setNumberOfTables(3, 1);  break;				
			case "32 to 100":	this.setNumberOfTables(4, 2); break;
			case "100 to 500":	this.setNumberOfTables(7, 4); break;
			case "500+": 		this.setNumberOfTables(12, 7); break;
		}
				
		//Set table and chair parameters
		if (this.tableType == "Rectangles")
		{
			this.tSpacingH = this.tWidth*3.5;
			this.tSpacingV = this.tLength*1.5;
			this.cArrangement = "LR";
			this.numChairsV = 4;
		}
		else if (this.tableType == "Round")
		{
			this.tSpacingH = this.tWidth*1.35;
			this.tSpacingV = this.tLength*2.5;
			this.cArrangement = "roundArrangement";	
		}
		
		//Determine table position		
		let posX = this.posCentre[0] - (this.guestTablesH*this.tWidth + (this.guestTablesH-1)*this.tSpacingH)/2;	
		let posY =  this.posCentre[1] - (this.tLength + (this.guestTablesV-1)*this.tSpacingV)/2 + this.tLength/4;	
		if (this.numGuests == "8 to 32")
		{
			if ((this.equipmentType) && (this.equipmentType.includes("Dance Floor")))
			{
				posY += 46 * diagramScale;
			}
			if (this.tableType == "Round") posY += 6 * diagramScale;
		}
		else
		{
			posY -= 12 * diagramScale;
		}
		if (this.areNoFoodOrBeverageTablesPresent())
		{
			switch(this.numGuests)
			{			
				case "8 to 32":		posY += 40*diagramScale; break;
				case "32 to 100":	posY += 55*diagramScale; break;
				case "100 to 500":	posY += 65*diagramScale; break;
				case "500+": 		posY += 65*diagramScale; break;
			}
		}	
		let posT = [posX, posY]; 
		
		//Add tables
		for(let i = 1; i <= this.guestTablesV; i++ ) 
		{	
			this.addHorizontalTableSequence(this.cArrangement, posT); 
			posT = [posT[0], posT[1] + this.tSpacingV];
		}
	}
		
	setupBoardRoomLayout()
	{		
		//Set table and chair parameters
		 this.setNumberOfTables(2, 3); 
		 this.numChairsH = 1;
		 this.numChairsV = 4;
	
		//Determine table position
		let posX = this.posCentre[0] - this.tWidth;
		let posY = this.posCentre[1] - this.tLength*1.5 - this.tSpacingV - 20*diagramScale;
		if ((this.equipmentType) && (this.equipmentType.includes("Dance Floor")))
		{
			posY += 105*diagramScale;			
		}
		if ((this.functionType == "Social Event") && (this.areNoFoodOrBeverageTablesPresent()))
		{
			posY += 40*diagramScale;
		}
		let posT = [posX, posY];
		
		//Add tables
		this.addHorizontalTableSequence("TLR", posT); //Topmost row
		this.addHorizontalTableSequence("LR", [posT[0], posT[1] + this.tLength + this.tSpacingV]); //Middle row
		this.addHorizontalTableSequence("BLR", [posT[0], posT[1] + this.tLength*2 + this.tSpacingV*2]); //Bottom row
	}
	
	setupClassroomLayout()
	{	
		//Determine number of tables and chairs to use depending on number of guests
		switch(this.numGuests)
		{
			case "8 to 32": 	this.setNumberOfTables(5, 3); break;
			case "32 to 100": 	this.setNumberOfTables(6, 4); break;
			case "100 to 500":	this.setNumberOfTables(12, 8); break;
			case "500+":		this.setNumberOfTables(20, 14); break;
		}
		
		//Set table and chair parameters
		this.tSpacingV = this.tLength*4;
		this.cArrangement = "B";
		this.numChairsH = 2;
			
		//Set aisle parameters
		let numAisles;
		switch(this.numGuests)
		{
			case "8 to 32":		numAisles = 0; break;
			case "32 to 100":	numAisles = 1; break;
			case "100 to 500":	numAisles = 2; break;
			case "500+": 		numAisles = 3; break;;
		}	
		let aisleWidth = this.tWidth*0.75;
			
		//Determine table position
		let posX = this.posCentre[0] - ((this.tWidth + this.tSpacingH) * this.guestTablesH)/2;
		let posY =  this.posCentre[1] - (this.tLength + (this.guestTablesV-1)*this.tSpacingV)/2 - 10*diagramScale;	
		if (this.areNoFoodOrBeverageTablesPresent())
		{
			switch(this.numGuests)
			{			
				case "8 to 32":		posY += 35*diagramScale; break;
				case "32 to 100":	posY += 50*diagramScale; break;
				case "100 to 500":	posY += 50*diagramScale; break;
				case "500+": 		posY += 60*diagramScale; break;
			}
		}			
		let posT = [posX, posY];
		
		//Add tables	 
		for(let i = 1; i <= this.guestTablesV; i++ ) 
		{	
			this.addHorizontalTableSequenceWithAisles(this.cArrangement, posT, numAisles, aisleWidth); 
			posT = [posT[0], posT[1] + this.tSpacingV];
		}
	}
			
	setupCrescentsLayout()
	{		
		//Determine number of tables to use depending on number of guests
		switch(this.numGuests)
		{
			case "8 to 32": 	this.setNumberOfTables(2, 2); break;
			case "32 to 100": 	this.setNumberOfTables(4, 2); break;
			case "100 to 500": 	this.setNumberOfTables(7, 5); break;
			case "500+": 		this.setNumberOfTables(11, 8); break;
		}		
		
		//Set table and chair parameters
		this.tSpacingH = this.tWidth*1.5;
		this.tSpacingV = this.tLength*2;			
		this.cArrangement = "crescentsArrangement";
				
		//Determine table position			
		let posX = this.posCentre[0] - (this.guestTablesH*this.tWidth + (this.guestTablesH-1)*this.tSpacingH)/2;
		let posY =  this.posCentre[1] - ((this.guestTablesV-1)*this.tSpacingV)/2 - this.tSpacingV/3;
		if (this.areNoFoodOrBeverageTablesPresent())
		{
			switch(this.numGuests)
			{			
				case "8 to 32":		posY += 40*diagramScale; break;
				case "32 to 100":	posY += 55*diagramScale; break;
				case "100 to 500":	posY += 55*diagramScale; break;
				case "500+": 		posY += 60*diagramScale; break;
			}
		}		
		let posT = [posX, posY]; 
		
		//Add tables	
		for(let i = 1; i <= this.guestTablesV; i++ ) 
		{	
			this.addHorizontalTableSequence(this.cArrangement, posT); 
			posT = [posT[0], posT[1] + this.tSpacingV];
		}
	}
	
	setupHollowSquareLayout()
	{			
		//Set table and chair parameters
		this.setNumberOfTables(2, 2);
		this.numChairsH = 4;
		this.numChairsV = 4;	
	
		//Determine table position
		let posX = this.posCentre[0] - this.tWidth - this.tSpacingH/2;
		let posY = this.posCentre[1] - this.tWidth;
		if (this.functionType == "Meeting")
		{
			posY -= 30*diagramScale;
		}
		else if ((this.functionType == "Social Event") &&
			(this.equipmentType) && (this.equipmentType.includes("Dance Floor")))
		{
			posY += 80*diagramScale;
		}	
		if ((this.functionType == "Social Event") && (this.areNoFoodOrBeverageTablesPresent()))
		{
			posY += 50*diagramScale;
		}	
		let posT = [posX, posY];
				
		//Add tables
		let combinedWidth = this.tWidth*this.guestTablesH;
		this.addHorizontalTableSequence("T", posT); 		
		this.addVerticalTableSequence("L", [posT[0] - this.tLength - this.tSpacingH, posT[1]]); 	
		this.addVerticalTableSequence("R", [posT[0] + (this.tWidth + this.tSpacingH)*this.guestTablesH, posT[1]]);
		this.addHorizontalTableSequence("B", [posT[0], posT[1] + this.tWidth*this.guestTablesV + this.tSpacingV - this.tLength]); 
	}
			
	setupReceptionLayout()
	{		
		//Set table parameters
		this.tSpacingH = this.tWidth*2;
		this.tSpacingV = this.tLength*2.75;	
		
		//Set chair parameters
		let seatType = this.seatType;
		let hasSoftFurniture = false;
		if ((seatType) && (seatType.includes("Soft Furniture")))
		{
			hasSoftFurniture = true;
			this.addSoftFurniture();			
		}
		if ((seatType) && (seatType.includes("Bar Stool")))
		{
			this.seatType = "Bar Stool";
		}
		else
		{
			this.seatType = "";
		}
		
		//Determine number of tables use depending on number of guests
		//and whether or not there is soft furniture also being used	
		let posY =  this.posCentre[1];
		switch(this.numGuests)
		{
			case "8 to 32": 
				if (hasSoftFurniture)
				{					
					this.setNumberOfTables(2, 1); 
					posY += 20*diagramScale;	
				}
				else
				{
					this.setNumberOfTables(3, 2);
					posY -= 70*diagramScale;	
				}
				this.tSpacingH = this.tWidth*4;
				this.tSpacingV = this.tLength*3.5;
				break;
				
			case "32 to 100":				
				if (hasSoftFurniture)
				{					
					this.setNumberOfTables(3, 2); 
					this.tSpacingH = this.tWidth*4.5;
					posY -= 10*diagramScale;		
				}
				else
				{
					this.setNumberOfTables(5, 2);
					this.tSpacingH = this.tWidth*3.5;
				}				 
				if ((this.equipmentType) && (this.equipmentType.includes("Dance Floor")))	
				{
					this.tSpacingV = this.tLength*3.5;
				}
				else
				{
					this.tSpacingV = this.tLength*5;
					posY -= 120*diagramScale;						
				}	
				break;
				
			case "100 to 500": 	
				if (hasSoftFurniture)
				{					
					this.setNumberOfTables(4, 2); 
					if ((this.equipmentType) && (this.equipmentType.includes("Dance Floor")))
					{
					this.tSpacingV = this.tLength*6;
					}
					else
					{
						this.tSpacingV = this.tLength*8;
						posY -= 200*diagramScale;	
					}
				}
				else
				{
					this.setNumberOfTables(6, 3);
					this.tSpacingV = this.tLength*6;
					posY -= 240*diagramScale;		
				}	
				this.tSpacingH = this.tWidth*5;
				break;
				
			case "500+": 
				if (hasSoftFurniture)
				{					
					this.setNumberOfTables(5, 3); 
				}
				else
				{
					this.setNumberOfTables(7, 3);
				}
				this.tSpacingH = this.tWidth*8;
				this.tSpacingV = this.tLength*11;
				posY -= 400*diagramScale;				
				break;
		}	
		if (this.areNoFoodOrBeverageTablesPresent())
		{
			switch(this.numGuests)
			{			
				case "8 to 32":		posY += 110*diagramScale; break;
				case "32 to 100":	posY += 60*diagramScale; break;
				case "100 to 500":	posY += 160*diagramScale; break;
				case "500+": 		posY += 145*diagramScale; break;
			}
		}
		
		//Add cocktail tables
		let posX = this.posCentre[0] - (this.guestTablesH*this.tWidth + (this.guestTablesH-1)*this.tSpacingH)/2;
		let posT = [posX, posY]; 
		for(let i = 1; i <= this.guestTablesV; i++ ) 
		{	
			this.addHorizontalTableSequence("cocktailArrangement", posT); 
			posT = [posT[0], posT[1] + this.tSpacingV];
		}	
	}
			
	setupTheatreLayout()
	{			
		//Determine number of 'tables' to use depending on number of guests - the tables in the theatre layout
		//are invible and just used to position the chairs
		switch(this.numGuests)
		{
			case "8 to 32":		this.setNumberOfTables(10, 3); break;
			case "32 to 100":	this.setNumberOfTables(14, 4); break;
			case "100 to 500":	
				if (this.functionSubType == "Wedding")
				{
					this.setNumberOfTables(30, 11);
				}
				else
				{
					this.setNumberOfTables(27, 11);
				}
				break;
			case "500+": 		this.setNumberOfTables(40, 18); break;
		}	
		
		//Set 'table' and chair parameters
		this.tSpacingV = this.tLength*1.75;
		this.cArrangement = "B";
		this.numChairsH = 1;
		
		//Set aisle parameters
		let numAisles = 1;
		switch(this.numGuests)
		{
			case "100 to 500":	
				if (this.functionSubType != "Wedding")	numAisles = 2;
				break;
			case "500+":  numAisles = 3; break;
		}
		let aisleWidth = this.tWidth*2;
		
					
		//Determine 'table' position			
		let posX = this.posCentre[0] - (this.guestTablesH*this.tWidth + (this.guestTablesH-1)*this.tSpacingH)/2;
		let posY =  this.posCentre[1] - this.tLength*1 - (this.tSpacingV * (this.guestTablesV-1))/2;	
		if (this.areNoFoodOrBeverageTablesPresent())
		{
			posY += 30*diagramScale; 
		}		
		let posT = [posX, posY]; 
		
		//Add 'tables'
		for(let i = 1; i <= this.guestTablesV; i++ ) 
		{	
			this.addHorizontalTableSequenceWithAisles(this.cArrangement, posT, numAisles, aisleWidth); 
			posT = [posT[0], posT[1] + this.tSpacingV];
		}
	}
	
	setupTradeshowLayout()
	{						
		//Determine number of tables and chairs to use depending on number of guests
		switch(this.numGuests)
		{
			case "8 to 32":		this.setNumberOfTables(4, 2); break;
			case "32 to 100":	this.setNumberOfTables(6, 4); break;
			case "100 to 500":	this.setNumberOfTables(8, 8); break;
			case "500+": 		this.setNumberOfTables(8, 12); break;
		}	
				
		//Set table and chair parameters
		this.tWidth = tableScale * 2.5 * diagramScale;
		this.tLength = tableScale * 6 * diagramScale;
		let cWidth = this.tWidth*1.25;
		let boothWidth = this.roomWidth / (this.guestTablesH/2) - this.tWidth*2 - cWidth*2;
		let aisleHWidth = cWidth*2;
		let boothHeight = this.tLength*1.9;
		let aisleVWidth = this.tLength*2;
		this.numChairsV = 2;
						
		//Determine booth position		
		let posX = this.posRoom[0] + cWidth - 1;
		let posY =  this.posCentre[1] - (this.tLength + (this.guestTablesV-1)*boothHeight)/2 - boothHeight*0.1;
		if (this.guestTablesV > 4)
		{
			posY -= Math.round((this.guestTablesV - 4)/4) * aisleVWidth*0.75; 
		}
		if (this.areNoFoodOrBeverageTablesPresent())
		{
			switch(this.numGuests)
			{			
				case "8 to 32":		posY += 25*diagramScale; break;
				case "32 to 100":	posY += 35*diagramScale; break;
				case "100 to 500":	posY += 80*diagramScale; break;
				case "500+": 		posY += 145*diagramScale; break;
			}
		}	
		let posT = [posX, posY]; 
		
		//Add booths		
		for(let i = 1; i <= this.guestTablesV; i++ ) 
		{	
			//Add horizontal row of booths
			let pos = posT;			
			for(let j = 1; j <= this.guestTablesH; j++ ) 
			{				
				this.setupBooth(j, pos, cWidth);
				
				//Update position for next booth
				if (j % 2) //Put large space between booths which have aisles between them
				{
					pos = [pos[0] + this.tWidth + boothWidth, pos[1]];
				}
				else //Put small space between booths that are set back-to-back
				{
					pos = [pos[0] + this.tWidth + aisleHWidth, pos[1]];
				}
			}
			
			//Add horizontal aisles when there are more than 4 rows of booths
			if ((i % 4) == 0)
			{
				posT = [posT[0], posT[1] + boothHeight + aisleVWidth];		
			}
			else
			{
				posT = [posT[0], posT[1] + boothHeight];		
			}				
		}
	}
		
	setupUShapeLayout()
	{			
		//Set table and chair parameters
		this.setNumberOfTables(2, 2);
		this.numChairsH = 4;
		this.numChairsV = 4;
	
		//Determine table position
		let posX = this.posCentre[0] - this.tWidth - this.tSpacingH/2;
		let posY = this.posCentre[1] - this.tWidth;
		if (this.functionType == "Meeting")
		{
			posY -= 30*diagramScale;
		}
		if (this.areNoFoodOrBeverageTablesPresent())
		{
			posY += 35*diagramScale;
		}		
		let posT = [posX, posY];
		
		//Add tables
		this.addVerticalTableSequence("L", [posT[0] - this.tLength - this.tSpacingH, posT[1]]); 	
		this.addVerticalTableSequence("R", [posT[0] + (this.tWidth + this.tSpacingH)*this.guestTablesH, posT[1]]);
		this.addHorizontalTableSequence("B", [posT[0], posT[1] + this.tWidth*this.guestTablesV + this.tSpacingV - this.tLength]); 
	}
	
		
	/* ------------------------------------------------------------ */
	/* ----- Guest Tables ----------------------------------------- */
	
	setTableSize(tableType)
	{
		switch(tableType)
		{
			case "Classroom Rectangles": 
				this.tWidth = tableScale * 6 * diagramScale;
				this.tLength = tableScale * 1.5 * diagramScale;
				break;
				
			case "Cocktail Table": 
				this.tWidth = tableScale * 2.5 * diagramScale;
				this.tLength = this.tWidth;
				break;
				
			case "Round": 
				this.tWidth = tableScale * 5 * diagramScale;
				this.tLength = this.tWidth;
				break;
				
			case "Rectangles": 
				if ((this.functionType == "Tradeshow") || 
					(this.roomLayout == "Boardroom") || (this.roomLayout == "Banquet"))
				{
					this.tWidth = tableScale * 2.5 * diagramScale;
					this.tLength = tableScale * 8 * diagramScale;
				}
				else
				{
					this.tWidth = tableScale * 8 * diagramScale;
					this.tLength = tableScale * 2.5 * diagramScale;
				}
				break;	
				
			case "Beverage Service": 
			case "Food Service": 
				this.tWidth = tableScale * 7 * diagramScale;
				this.tLength = tableScale * 2.5 * diagramScale;
				break;	
				
			case "Cash": 
				this.tWidth = tableScale * 3 * diagramScale;
				this.tLength = tableScale * 2.5 * diagramScale;
				break;		
			
			default:
				this.tWidth = tableScale * 2.5 * diagramScale;
				this.tLength = tableScale * 2.5 * diagramScale;
				break;
		}	
		this.tSpacingH = 3 * diagramScale;	
		this.tSpacingV = 3 * diagramScale;
	}
	
	setNumberOfTables(tablesH, tablesV)
	{
		this.guestTablesH = tablesH; 
		this.guestTablesV = tablesV;
	}
	
	addGuestTable(type, width, length, chairArrangement, numChairsH, numChairsV, pos)
	{
		let table = new GuestTable(pos, type, width, length, this.seatType, chairArrangement, numChairsH, numChairsV);
		this.guestTables.push(table);
		return table;
	}
	
	addHorizontalTableSequence(cArrangement, pos)
	{
		for(let i = 0; i < this.guestTablesH; i++ ) 
		{			
			let chairArrangement = this.determineChairArrangement(i, this.guestTablesH, cArrangement); 
			this.addGuestTable(this.tableType, this.tWidth, this.tLength, chairArrangement, this.numChairsH, this.numChairsV, pos);			
			pos = [pos[0] + this.tWidth + this.tSpacingH, pos[1]];	
		}
	}
	
	addHorizontalTableSequenceWithAisles(cArrangement, pos, numOfAisles, aisleWidth)
	{
		//Determine number of tables between aisles
		let tablesBetweenAisles = Math.round(this.guestTablesH/(numOfAisles + 1));
		
		//Update x position to accomodate aisles
		pos = [pos[0] - (numOfAisles*aisleWidth)/2, pos[1]];
		
		//Draw table
		for(let i = 1; i <= this.guestTablesH; i++ ) 
		{		
			let chairArrangement = this.determineChairArrangement(i, this.guestTablesH, cArrangement); 
			this.addGuestTable(this.tableType, this.tWidth, this.tLength, chairArrangement, this.numChairsH, this.numChairsV, pos);		

			//Update position for next table
			if ((numOfAisles >= 1) && ((i % tablesBetweenAisles) == 0))
			{
				pos = [pos[0] + this.tWidth + this.tSpacingH + aisleWidth, pos[1]];
			}
			else
			{	
				pos = [pos[0] + this.tWidth + this.tSpacingH, pos[1]];	
			}
		}
	}
	
	addVerticalTableSequence(cArrangement, pos)
	{		
		for(let i = 0; i < this.guestTablesV; i++ ) 
		{			
			let chairArrangement = this.determineChairArrangement(i, this.guestTablesV, cArrangement); 		
			this.addGuestTable(this.tableType, this.tLength, this.tWidth, chairArrangement, this.numChairsH, this.numChairsV, pos);
			pos = [pos[0], pos[1] + this.tWidth + this.tSpacingV];
		}
	}
	
	doesTableOverlapDanceFloor(table)
	{
		//if (this.roomLayout == "Hollow square") return false;
		
		let doesOverlap = false;
		if (this.danceFloor)
		{
			//Determine buffer area around tables (where chairs will likely be)
			let buffer = 32 * diagramScale;		
			let bufferT = buffer;
			let bufferR = buffer;
			let bufferB = buffer; 
			let bufferL = buffer;
			let chairs = table.chairArrangement; 
			if (this.tableType == "Rectangles")
			{			
				if (!chairs.includes("T")) bufferT = 0;
				if (!chairs.includes("R")) bufferR = 0;
				if (!chairs.includes("B")) bufferB = 0;
				if (!chairs.includes("L")) bufferL = 0;
			}
			
			//Determine areas occupied by table and dance floor
			let tCorners = [[table.pos[0] - bufferL, table.pos[1] - bufferT],
							[table.pos[0] + table.width/2, table.pos[1] - bufferT],
							[table.pos[0] + table.width + bufferR, table.pos[1] - bufferT],							
							[table.pos[0] + table.width + bufferR, table.pos[1] + table.length/2],
							[table.pos[0] + table.width + bufferR, table.pos[1] + table.length + bufferB],							
							[table.pos[0] + table.width/2, table.pos[1] + table.length + bufferB],
							[table.pos[0] - bufferL, table.pos[1] + table.length + bufferB],							
							[table.pos[0] - bufferL, table.pos[1] + table.length/2]];				
			let dFLowPos =[this.danceFloor.pos[0], this.danceFloor.pos[1]];
			let dFHighPos = [this.danceFloor.pos[0] + this.danceFloor.width, this.danceFloor.pos[1] + this.danceFloor.length];

			//Test for overlap
			for(let i = 0; i < tCorners.length; i++ ) 
			{
				if ((tCorners[i][0] >= dFLowPos[0]) && (tCorners[i][0] <= dFHighPos[0]) &&
					(tCorners[i][1] >= dFLowPos[1]) && (tCorners[i][1] <= dFHighPos[1]))
				{
					doesOverlap = true;
					table.setToHidden(true);
					table.setChairsToHidden(true);
					
					//For testing only - visual display of occupied area
					//canvasTables.drawRectangle(tCorners[0], table.width + bufferL + bufferR, table.length + bufferT + bufferB, "", "#ff0000", "2");
					//canvasEquipment.drawRectangle(dFLowPos, this.danceFloor.width, this.danceFloor.length, "", "#ff0000", "2");
				}
			}
		}		
		return doesOverlap;
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Service Tables --------------------------------------- */
	
	setupFoodService()
	{	
		if ((!this.foodServiceType) || (this.foodServiceType == "NA")) return; 
	
		//Some food service options do not need dedicated table(s), instead food will be delivered directly
		//to the table by waiters. We will represent the former with table(s) against the back wall of the 
		//room and the latter with an icon just outside the door.
		if (this.getFoodServiceType().includes("tables")) 
		{
			this.addFoodServiceTables();
		}
		if (this.getFoodServiceType().includes("icon")) 
		{
			this.addFoodServiceIcon();
		}
	}
	
	getFoodServiceType()
	{
		//Did the user select no food option or an option that will be delivered by waiters? Neither
		//of these options will require food service tables to be added
		if ((!this.foodServiceType) || (this.foodServiceType == "N/A"))
		{
			return "none";
		}
		else if (this.foodServiceType == "Combination of Stationed and Passed")
		{
			return "tables;icon";
		}
		else if ((this.foodServiceType == "Family Style") || (this.foodServiceType.includes("Plated")) ||
			(this.foodServiceType == "Passed"))
		{
			return "icon";
		}
		return "tables";
	}
	
	addFoodServiceTables()
	{
		//Determine number of food service tables needed, depending on number of guests
		let numTables;
		switch(this.numGuests)
		{
			case "8 to 32":		numTables = 1; break;
			case "32 to 100":	numTables = 2; break;
			case "100 to 500":	numTables = 3; break;
			case "500+": 		numTables = 4; break;
		}
	
		//Set table parameters
		this.setTableSize("Food Service");
		let tableGap = this.tWidth/12;
		let wallGap	= this.tLength/3;			
		
		//Add table(s)
		let posX;					
		if (this.getBeverageServiceType().includes("tables"))
		{
			posX = this.posCentre[0] + tableGap/2;
		}
		else
		{
			posX = this.posCentre[0] - (this.tWidth*numTables)/2 - (tableGap * (numTables-1))/2;
		}
		let posY = this.posRoom[1] + this.roomHeight - this.tLength - wallGap;
		let posT = [posX, posY];			
		for(let i = 1; i <= numTables; i++ ) 
		{	
			let table = this.addServiceTable("Food Table", this.foodType, posT);
			posT = [posT[0] + this.tWidth + tableGap, posT[1]];	
		}
	}
	
	addFoodServiceIcon()
	{			
		//Set icon position
		let posX = this.posRoom[0] + this.roomWidth - 100*diagramScale;
		let posY = this.posRoom[1] + this.roomHeight + 5*diagramScale;
		let posT = [posX, posY];	
		
		//Add icon
		this.addServiceIcon("Food Service", this.foodType, posT);
	}
		
	setupBeverageService()
	{
		if ((!this.beverageServiceType) || (this.beverageServiceType == "NA")) return; 
	
		//Some beverage service options do not need dedicated table(s), instead food will be delivered 
		//directly to the table by waiters. We will represent the former with table(s) against the back
		//wall of the room and the latter with an icon just outside the door.
		if (this.getBeverageServiceType().includes("tables")) 
		{
			this.addBeverageServiceTables();
		}
		if (this.getBeverageServiceType().includes("icon")) 
		{
			this.addBeverageServiceIcon();
		}
	}
	
	getBeverageServiceType()
	{ 
		//Did the user select no beverage option or an option that will be delivered by waiters? Neither
		//of these options will require beverage service tables to be added
		if ((!this.beverageServiceType) || (this.beverageServiceType == "N/A"))
		{
			return "none";
		}
		else if (this.beverageType == "Combination of Bar and Passed or Butler")
		{
			return "tables;icon";
		}
		else if ((this.beverageServiceType == "Serviced") || (this.beverageServiceType == "Host(Passed or Butler)") ||
				(this.beverageServiceType == "Pre-set") || (this.beverageServiceType == "Table Service"))
		{
			return "icon";
		}
		return "tables";
	}
	
	addBeverageServiceTables()
	{					
		//Determine number of beverage service tables needed, depending on number of guests
		let numTables;
		switch(this.numGuests)
		{
			case "8 to 32":		numTables = 1; break;
			case "32 to 100":	numTables = 2; break;
			case "100 to 500":	numTables = 3; break;
			case "500+": 		numTables = 4; break;
		}
		
		//Set table parameters
		this.setTableSize("Beverage Service");
		let tableGap = this.tWidth/12;
		let wallGap	= this.tLength/3;	
	
		//Add table(s)
		let posX;
		if (this.getFoodServiceType().includes("tables"))
		{
			posX = this.posCentre[0] - this.tWidth - tableGap/2;
		}
		else
		{
			posX = this.posCentre[0] - this.tWidth + (this.tWidth*numTables)/2 + (tableGap * (numTables-1))/2;
			if ((this.functionSubType == "Wedding") && (this.roomLayout == "Theatre"))
			{
				posX -= (this.tWidth*numTables)/2 + this.tWidth;
			}
		}
		let posY = this.posRoom[1] + this.roomHeight - this.tLength - wallGap;
		let posT = [posX, posY];			
		for(let i = 1; i <= numTables; i++ ) 
		{	
			this.addServiceTable("Beverage Table", this.beverageType, posT);	
			posT = [posT[0] - this.tWidth - tableGap, posT[1]];
		}
	
		//Add an extra cash table if the beverage service type is cash
		if (this.beverageServiceType.includes("Cash"))
		{		
			//Set table size and adjust position
			posT = [posT[0] + this.tWidth, posT[1]];
			this.setTableSize("Cash");
			posT = [posT[0] - this.tWidth, posT[1]];
			
			for(let i = 1; i <= numTables; i++ ) 
			{	
				this.addServiceTable("Cash Table", "", posT);	
				posT = [posT[0] - this.tWidth - tableGap, posT[1]];
			}
		}
	}
	
	addBeverageServiceIcon()
	{
		//Set icon position
		let posX;		
		if (this.getFoodServiceType().includes("icon"))
		{
			posX = this.posRoom[0] + this.roomWidth - 180*diagramScale;
		}
		else
		{
			posX = this.posRoom[0] + this.roomWidth - 100*diagramScale;
		}
		let posY = this.posRoom[1] + this.roomHeight + 5*diagramScale;
		let posT = [posX, posY];	
		
		//Add icon	
		this.addServiceIcon("Beverage Service", this.beverageType, posT);
	}
	
	addServiceTable(type, subType, pos)
	{			
		let table = new ServiceTable(pos, type, subType, this.tWidth, this.tLength);
		this.serviceTablesAndIcons.push(table);
		return table;
	}
	
	addServiceIcon(type, subType, pos)
	{	
		let icon = new ServiceIcon(pos, type, subType);
		this.serviceTablesAndIcons.push(icon);
		return icon;
	}
	
	areNoFoodOrBeverageTablesPresent()
	{
		if ((!(this.getFoodServiceType().includes("tables"))) && (!(this.getBeverageServiceType().includes("tables"))))
		{
			return true;
		}
		return false;
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Tradeshow Booths ------------------------------------- */
	
	setupBooth(num, pos, cWidth)
	{
		//Determine backside of booth
		let backSide;
		if (num % 2) 
		{
			backSide = "L";
		}
		else
		{
			backSide = "R";
		}		
		
		//Add booth table
		let table = this.addGuestTable(this.tableType, this.tWidth, this.tLength, backSide, this.numChairsH, this.numChairsV, pos);	
		
		//Add booth equipment
		if (this.equipmentType)
		{
			if (this.equipmentType.includes("Pipe and Drape"))
			{						
				this.setupPipeAndDrapeBooth(pos, this.tWidth, this.tLength, cWidth, backSide);
			}
			if (this.equipmentType.includes("Interactive White Board"))
			{	
				this.setupWhiteBoardBooth(pos, cWidth, backSide);
			}
		} 
	}
	
	setupPipeAndDrapeBooth(pos, tWidth, tLength, cWidth, boothBackSide)
	{		
		//Calculate spacing/size elements
		let spacingH = (tWidth + cWidth)*0.1;
		let spacingV = tLength/2;		
		if ((this.equipmentType) && (this.equipmentType.includes("Interactive White Board")))
		{
			spacingV = spacingV*1.5;
		}	
		let boothWidth = tWidth + cWidth + spacingH*2;
		let boothLength = tLength + tLength*0.9;
		
		//Determine position references
		let posXL;
		if (boothBackSide == "L")
		{
			posXL = pos[0] - cWidth;
		}
		else if (boothBackSide == "R")
		{
			posXL = pos[0] - spacingH*2;
		}
		let posXR = posXL + boothWidth
		let posYT = pos[1] - spacingV;
		let posYB = posYT + boothLength;
		
		//Add all three sides of the pipe and drape as seperate elements (this allows the roll-over
		//indicator position to be more accurate)
		this.addPipeAndDrape([posXL, posYT], boothWidth, 0, "horizontal");
		this.addPipeAndDrape([posXL, posYB], boothWidth, 0, "horizontal");
		if (boothBackSide == "L")
		{
			this.addPipeAndDrape([posXL, posYT], 0, boothLength, "vertical");
		}
		else if (boothBackSide == "R")
		{
			this.addPipeAndDrape([posXR, posYT], 0, boothLength, "vertical");
		}
	}
	
	setupWhiteBoardBooth(pos, cWidth, boothBackSide)
	{
		let img = this.imgWhiteBoardTurned;
		let imgWidth = img.width * diagramScale;
		let imgHeight = img.height * diagramScale;
		let buffer = imgHeight/12;
		if (boothBackSide == "L")
		{
			img = this.imgWhiteBoardTurnedAlt;			
			pos = [pos[0] - cWidth/3*2, pos[1] - imgHeight - buffer];
		}
		else if (boothBackSide =="R")
		{		
			pos = [pos[0], pos[1] - imgHeight - buffer];
		}
		
		this.addEquipment("Interactive White Board", pos, img);
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Chairs ----------------------------------------------- */
		
	//Make sure chairs are not placed on sides of the table where another table will be sitting
	determineChairArrangement(curTable, totalTables, cSides)
	{
		if (this.tSpacingH > 6 * diagramScale) return cSides;
			
		if (curTable == 0)
		{
			switch (cSides)
			{
				case "TLR": cSides = "TL"; break;
				case "LR": 	cSides = "L"; break;
				case "BLR": cSides = "BL"; break;
			}
		}
		else if (curTable == (totalTables-1))
		{ 
			switch (cSides)
			{
				case "TLR": cSides = "TR"; break;
				case "LR": 	cSides = "R"; break;
				case "BLR": cSides = "BR"; break;
			}
		}
		else
		{
			switch (cSides)
			{
				case "TLR": cSides = "T"; break;
				case "BLR": cSides = "B"; break;
			}
		}
		return cSides;
	}
	
	addSoftFurniture()
	{
		let posT;
		let tWidth = tableScale * 2 * diagramScale;
		let tLength = tableScale * 4 * diagramScale;
		let tableType = "Rectangles";
		this.seatType = "Soft Furniture";
		
		//Add soft furniture (comes with rectangle tables)
		switch(this.numGuests)
		{
			case "8 to 32": 	 		
				posT = [this.posRoom[0] + 40*diagramScale, this.posCentre[1] - 100*diagramScale];
				this.addGuestTable(tableType, tWidth, tLength, "TLB", 1, 1, posT);
				
				posT = [posT[0], this.posCentre[1] + 75*diagramScale];
				this.addGuestTable(tableType, tWidth, tLength, "TLB", 1, 1, posT);
				
				posT = [this.posRoom[0] + this.roomWidth - 75*diagramScale, this.posCentre[1] - 100*diagramScale];
				this.addGuestTable(tableType, tWidth, tLength, "TRB", 1, 1, posT);
				
				posT = [posT[0], this.posCentre[1] + 75*diagramScale];
				this.addGuestTable(tableType, tWidth, tLength, "TRB", 1, 1, posT);
				break;
				break;
				
			case "32 to 100": 						
				posT = [this.posRoom[0] + 40*diagramScale, this.posCentre[1] - 150*diagramScale];
				this.addGuestTable(tableType, tWidth, tLength, "TLB", 1, 1, posT);
				
				posT = [posT[0], this.posCentre[1] + 150*diagramScale];
				this.addGuestTable(tableType, tWidth, tLength, "TLB", 1, 1, posT);
				
				posT = [this.posRoom[0] + this.roomWidth - 75*diagramScale, this.posCentre[1] - 150*diagramScale];
				this.addGuestTable(tableType, tWidth, tLength, "TRB", 1, 1, posT);
				
				posT = [posT[0], this.posCentre[1] + 150*diagramScale];
				this.addGuestTable(tableType, tWidth, tLength, "TRB", 1, 1, posT);
				break;
			case "100 to 500":
			case "500+": 
				posT = [this.posRoom[0] + 60*diagramScale, this.posCentre[1] - 500*diagramScale];
				this.addGuestTable(tableType, tWidth, tLength, "TLB", 1, 1, posT);
				
				posT = [posT[0], this.posCentre[1] - 200*diagramScale];
				this.addGuestTable(tableType, tWidth, tLength, "TLB", 1, 1, posT);
				
				posT = [posT[0], this.posCentre[1] + 100*diagramScale];
				this.addGuestTable(tableType, tWidth, tLength, "TLB", 1, 1, posT);
				
				posT = [posT[0], this.posCentre[1] + 400*diagramScale];
				this.addGuestTable(tableType, tWidth, tLength, "TLB", 1, 1, posT);
									
				posT = [this.posRoom[0] + this.roomWidth - 95*diagramScale, this.posCentre[1] - 500*diagramScale];
				this.addGuestTable(tableType, tWidth, tLength, "TRB", 1, 1, posT);
				
				posT = [posT[0], this.posCentre[1] - 200*diagramScale];
				this.addGuestTable(tableType, tWidth, tLength, "TRB", 1, 1, posT);
				
				posT = [posT[0], this.posCentre[1] + 100*diagramScale];
				this.addGuestTable(tableType, tWidth, tLength, "TRB", 1, 1, posT);
				
				posT = [posT[0], this.posCentre[1] + 400*diagramScale];
				this.addGuestTable(tableType, tWidth, tLength, "TRB", 1, 1, posT);
				break;
		}	
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Equipment -------------------------------------------- */
	
	setupEquipment(equipment)
	{
		if (this.equipmentType == null) return;
		
		//Add floor level equipment first (so it gets drawn first)
		let equipList = this.equipmentType.split(";");
		for(let i = 0; i < equipList.length; i++) 
		{	
			switch (equipList[i])
			{
				case "Dance Floor":					this.setupDanceFloor(); break;
				case "Flip Chart":					this.setupFlipChart(); break;					
				case "Interactive White Board":		this.setupInteractiveWhiteBoard(); break;	
				case "Microphone":					this.setupMicrophone(); break;						
				case "Music":						this.setupMusic(); break;	
				case "Podium":						this.setupPodium(); break;	
				case "Projector and Screen":		this.setupProjectorAndScreen(); break;					
				case "Stage":						this.setupStage(); break;
			}
		}
	}
	
	setupDanceFloor()
	{
		let danceFloor = this.addEquipment("Dance Floor", null, null);
		let pos = [this.posCentre[0] - danceFloor.width/2, this.posRoom[1] + 129*diagramScale + 1];
		danceFloor.setPos(pos);
		this.danceFloor = danceFloor;
	}
	
	setupFlipChart()
	{
		let img = this.imgFlipChart;	
		let pos, posX, posY;
		if ((this.roomLayout == "Boardroom") || (this.roomLayout == "Hollow square") || 
		(this.roomLayout == "U shape"))
		{
			img = this.imgFlipChartTurned;	
			pos = [this.posCentre[0] - 220*diagramScale, this.posRoom[1] + 15*diagramScale];
		}
		else
		{
			switch(this.numGuests)
			{
				case "8 to 32": 	posX = this.posCentre[0] - 220*diagramScale; break;					
				case "32 to 100": 	posX = this.posCentre[0] - 200*diagramScale; break;
				case "100 to 500": 	posX = this.posCentre[0] - 290*diagramScale; break;
				case "500+": 		posX = this.posCentre[0] - 440*diagramScale; break;
			}	
			posY = this.posRoom[1] + 10*diagramScale;
			pos = [posX, posY]
		}
		this.addEquipment("Flip Chart", pos, img);
	}
	
	setupInteractiveWhiteBoard()
	{
		if (this.functionType == "Tradeshow") return;
		
		let img = this.imgWhiteBoard;
		let pos, posX, posY;
		if ((this.roomLayout == "Boardroom") || (this.roomLayout == "Hollow square") || 
		(this.roomLayout == "U shape"))
		{
			img = this.imgWhiteBoardTurned;
			pos = [this.posCentre[0] + 160*diagramScale, this.posRoom[1] + 12*diagramScale];
		}
		else
		{
			switch(this.numGuests)
			{
				case "8 to 32": 	posX = this.posCentre[0] + 130*diagramScale; break;					
				case "32 to 100": 	posX = this.posCentre[0] + 130*diagramScale; break;
				case "100 to 500": 	posX = this.posCentre[0] + 230*diagramScale; break;
				case "500+": 		posX = this.posCentre[0] + 380*diagramScale; break;
			}
			posY = this.posRoom[1] + 12*diagramScale;
			pos = [posX, posY]
		}
		this.addEquipment("Interactive White Board", pos, img);
	}
	
	setupMicrophone()
	{
		//Setup microphone
		let img = this.imgMicrophone;
		let imgWidth = img.width * diagramScale;
		let imgHeight = img.height * diagramScale;
		let posX = this.posCentre[0] - imgWidth/2 - 115*diagramScale;
		let posY = this.posRoom[1] - imgHeight/2 + 70*diagramScale;
		let pos = [posX, posY]
		this.addEquipment("Microphone", pos, img);
	}
	
	setupMusic()
	{
		let img = this.imgMusic;
		let imgWidth = img.width * diagramScale;
		let imgHeight = img.height * diagramScale;
		
		//Set position
		let posX, posY;
		if ((this.functionSubType == "Wedding") && 
			(this.roomLayout == "Theatre"))
		{
			posX = this.posCentre[0];
			posY = this.posRoom[1] + 90*diagramScale;
			switch(this.numGuests)
			{
				case "8 to 32":		posX += 210*diagramScale; break;
				case "32 to 100":	posX += 235*diagramScale; break;
				case "100 to 500":	posX += 390*diagramScale; break;
				case "500+":		posX += 620*diagramScale; break;
			}	
		}
		else
		{
			posX = this.posCentre[0] - imgWidth/2 + 130*diagramScale;
			posY = this.posRoom[1] - imgHeight/2 + 71*diagramScale;
		}		
		let pos = [posX, posY];		
		this.addEquipment("Music", pos, img);
		
		//If we add music we also need to add speakers
		this.setupSpeakers();
	}
	
	setupPodium()
	{
		let img = this.imgPodium;
		let imgWidth = img.width * diagramScale;
		let imgHeight = img.height * diagramScale;
		let posX = this.posCentre[0]  - imgWidth/2 - 115*diagramScale;		
		let posY = this.posRoom[1] - imgHeight/2 + 72*diagramScale;
		let pos = [posX, posY];		
		this.addEquipment("Podium", pos, img);
	}
	
	setupProjectorAndScreen()
	{
		let img = this.imgProjectorStage;		
		if (((this.equipmentType) && (!this.equipmentType.includes("Stage"))) &&
			((this.roomLayout == "Boardroom") || (this.roomLayout == "Hollow square") || 
			 (this.roomLayout == "U shape")))
		{
			img = this.imgProjector;							
		}
		let imgWidth = img.width * diagramScale;
		let imgHeight = img.height * diagramScale;
		let pos = [this.posCentre[0] - imgWidth/2, this.posRoom[1]];				
		
		let projectorAndScreen = new ProjectorAndScreen("Projector and Screen", pos);
		projectorAndScreen.setImage(img);
		this.equipment.push(projectorAndScreen);
	}
	
	setupSpeakers()
	{
		let img = this.imgSpeaker;
		let imgWidth = img.width * diagramScale;
		let imgHeight = img.height * diagramScale;
		let posXL, posXR, posYF, posYB;
		if (this.numGuests == "32 to 100")
		{
			posXL = this.posCentre[0] - 250*diagramScale - imgWidth;
			posXR = this.posCentre[0] + 250*diagramScale;
			
		}
		else if (this.numGuests == "100 to 500")
		{
			posXL = this.posCentre[0] - 560*diagramScale - imgWidth;
			posXR = this.posCentre[0] + 560*diagramScale;
		}
		else if (this.numGuests == "500+")
		{
			posXL = this.posCentre[0] - 950*diagramScale - imgWidth;
			posXR = this.posCentre[0] + 950*diagramScale;
		}
		else
		{
			posXL = this.posCentre[0] - 210*diagramScale - imgWidth;
			posXR = this.posCentre[0] + 210*diagramScale;
		}
		posYF = this.posRoom[1];
		
		this.addEquipment("Speaker1", [posXL, posYF], img);	
		this.addEquipment("Speaker2", [posXR, posYF], img);	
		if ((this.numGuests == "100 to 500") || (this.numGuests == "500+"))
		{
			img = this.imgSpeakerFlipped; 
			posYB = this.posRoom[1] + this.roomHeight - imgHeight - 8*diagramScale;
			this.addEquipment("Speaker3", [posXL, posYB], img);	
			this.addEquipment("Speaker4", [posXR, posYB], img);	
		}	
	}
	
	setupStage()
	{	
		let stage = this.addEquipment("Stage", null, null);
		let pos = [this.posCentre[0] - stage.width/2, this.posRoom[1]];
		stage.setPos(pos);		
	}
	
	addEquipment(type, pos, img)
	{
		let newEquipment = new Equipment(type, pos);
		newEquipment.setImage(img);
		this.equipment.push(newEquipment);
		return newEquipment;
	}
	
	addPipeAndDrape(pos, width, length, side)
	{		
		let newPipeAndDrape = new PipeAndDrape(pos, side, width, length);
		this.equipment.push(newPipeAndDrape);
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Hover Indicator -------------------------------------- */
	
	setupIndicator(target)
	{
		this.indicator = new Indicator(target);
	}
	
	isBottomLevelEquipment(item)
	{		
		let isBottomLevel = false;	
		if (!item) return isBottomLevel;
	
		let itemType = item.type;	
		if ((itemType == "Dance Floor") || (itemType == "Pipe and Drape") || (itemType.includes("Speaker")) || 
			(itemType == "Stage"))
		{
			isBottomLevel = true;
		}
		return isBottomLevel;
	}
	
	isMidLevelEquipment(item)
	{		
		let isMidLevel = false;	
		if (!item) return isMidLevel;
	
		let itemType = item.type;		
		if ((itemType == "Flip Chart") || (itemType == "Interactive White Board") || (itemType == "Music") || 
			(itemType == "Podium") || (itemType == "Projector and Screen"))
		{
			isMidLevel = true;
		}
		return isMidLevel;
	}
	
	isTopLevelEquipment(item)
	{
		let isTopLevel = false;
		if (!item) return isTopLevel;
		
		let itemType = item.type;		
		if ((itemType == "Microphone"))
		{
			isTopLevel = true;
		}
		return isTopLevel;
	}
	
	/* ------------------------------------------------------------ */
	/* ----- General Events --------------------------------------- */
		
	onInteractStart()
	{
		let prevIndicatorTarget = this.indicatorTarget;
		this.indicatorTarget = null;	
		this.indicator = null;
				
		if (roomDiagram.equipment)
		{
			//Check if the user's mouse/finger is over a top-level equipment item
			for(let i = 0; i < this.equipment.length; i++) 
			{
				let item = roomDiagram.equipment[i];
				if ((item.isMouseOver(roomDiagram.mouseX, roomDiagram.mouseY))  && 
					(this.isTopLevelEquipment(item)))
				{	
					this.indicatorTarget = roomDiagram.equipment[i]; 
				}				
			}
			
			//Check if the user's mouse/finger is over a mid-level equipment item
			if (!this.indicatorTarget)
			{
				for(let i = 0; i < this.equipment.length; i++) 
				{	
					let item = roomDiagram.equipment[i];
					if ((item.isMouseOver(roomDiagram.mouseX, roomDiagram.mouseY)) && 
						(this.isMidLevelEquipment(item)))
					{
						this.indicatorTarget = roomDiagram.equipment[i];
					}		
				}
			}
			
			//Check if the user's mouse/finger is over a floor-level equipment item
			if (!this.indicatorTarget)
			{
				for(let i = 0; i < this.equipment.length; i++) 
				{	
					let item = roomDiagram.equipment[i];
					if ((item.isMouseOver(roomDiagram.mouseX, roomDiagram.mouseY)) &&
						(this.isBottomLevelEquipment(item)))
					{
						this.indicatorTarget = roomDiagram.equipment[i]; 
					}				
				}
			}
		}
		
		//Check if the user's mouse/finger is over a guest table
		if ((!this.indicatorTarget) && (roomDiagram.guestTables))
		{
			for (let i = 0; i < roomDiagram.guestTables.length; i++) 
			{				
				if (roomDiagram.guestTables[i].isMouseOver(roomDiagram.mouseX, roomDiagram.mouseY))
				{	
					this.indicatorTarget = roomDiagram.guestTables[i];
				}	
				
				let chairs = roomDiagram.guestTables[i].chairs;
				if (chairs)
				{
					for (let j = 0; j < chairs.length; j++) 
					{				
						if (chairs[j].isMouseOver(roomDiagram.mouseX, roomDiagram.mouseY))
						{	
							this.indicatorTarget = chairs[j]; 
						}
					}
				}
			} 
		}
		
		//Check if the user's mouse/finger is over a food or beverage table
		if ((!this.indicatorTarget) && (roomDiagram.serviceTablesAndIcons))
		{
			for (let i = 0; i < roomDiagram.serviceTablesAndIcons.length; i++) 
			{				
				if (roomDiagram.serviceTablesAndIcons[i].isMouseOver(roomDiagram.mouseX, roomDiagram.mouseY))
				{	
					this.indicatorTarget = roomDiagram.serviceTablesAndIcons[i];
				}		
			}
		}
		
		if (this.indicatorTarget != prevIndicatorTarget)
		{
			if (this.indicatorTarget != null)	
			{
				this.setupIndicator(this.indicatorTarget);
			}
			this.drawIndicator();
		}	
	}
	
	onMove()
	{
		this.onInteractStart();
	}
	
	onInteractEnd()
	{		
		this.indicator = null;
		this.drawIndicator();	
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Mouse Events ----------------------------------------- */
						
	onMouseMove(e) 
	{
		e.preventDefault(); //Prevent dragging of canvas
		roomDiagram.mouseX = e.clientX - roomDiagram.canvasDiv.getBoundingClientRect().left;
		roomDiagram.mouseY = e.clientY - roomDiagram.canvasDiv.getBoundingClientRect().top; 
			
		roomDiagram.onMove();		
	}
	
	onMouseDown(e) 
	{ 		
		e.preventDefault(); //Prevent dragging of canvas
		//roomDiagram.onInteractStart();
	}
	
	onMouseUp(e) 
	{ 	
		e.preventDefault(); //Prevent dragging of canvas
		//roomDiagram.onInteractEnd();
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Touch Events ----------------------------------------- */
			
	onTouchMove(e) 
	{
		e.preventDefault(); //Prevent scrolling				
		/*roomDiagram.mouseX = e.touches[0].clientX - roomDiagram.canvasDiv.getBoundingClientRect().left;
		roomDiagram.mouseY = e.touches[0].clientY - roomDiagram.canvasDiv.getBoundingClientRect().top; 
					
		roomDiagram.onMove();	*/		
	}	
	
	onTouchStart(e) 
	{ 		
		e.preventDefault(); //Prevent scrolling	
		roomDiagram.mouseX = e.touches[0].clientX - roomDiagram.canvasDiv.getBoundingClientRect().left;
		roomDiagram.mouseY = e.touches[0].clientY - roomDiagram.canvasDiv.getBoundingClientRect().top; 
			
		if (this.indicator)
		{
			roomDiagram.onInteractEnd();	
		}
		else
		{
			roomDiagram.onInteractStart();
		}
	}
	
	onTouchEnd(e) 
	{ 			
		e.preventDefault(); //Prevent scrolling		
		//roomDiagram.onInteractEnd();	
	}	
	
}
const roomDiagram = new Room();
roomDiagram.init();