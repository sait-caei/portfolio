class BuildDiagram
{
	constructor() 
	{			
		//Canvases
		this.canvasWidth = 622;
		this.canvasHeight = 465;
		
		//Images
		this.totalImages = 28;		
		this.imagesLoaded;
		this.imageLoadingIsComplete;
		this.imgMagnifier;
		this.imgCase0; 
		this.imgCase1; 
		this.imgCase3; 
		this.imgCase4; 
		this.imgCPU0;
		this.imgCPU1;
		this.imgCPU2;
		this.imgCPU3;
		this.imgRAM0;
		this.imgRAM1;
		this.imgRAM2;
		this.imgRAM3;
		this.imgRAM4;
		this.imgRAM5;
		this.imgGPU0;	
		this.imgGPU1;	
		this.imgGPU2;	
		this.imgGPU3;		
		this.imgCard0;	
		this.imgCard1;
		this.imgCard2;
		this.imgCard3;	
		this.imgCard4;	
		this.imgDrive0;
		this.imgDrive1;
		this.imgDrive2;
		this.imgDrive3;

		//Diagram	
		this.scaleNormal = 0.5;
		this.posCase = {x:70, y:10};
		this.targets;						//Active target list (dropTargets in part A, wiringTargets in partB)
		this.dropTargets;					//List of currrent wiring drop targets 
		this.wiringTargets;					//List of currrent wiring wiring targets
		this.wiringConnections;				//List of currrent wiring connections
		this.infoDialog;					//Dialog that appears to show information about a drop/wiring target the mouse is currently over
		this.connectionInProgress;			//A wiring connection is currently being created
		this.connectionTarget1;				//Starting target of the in-progress wiring connection
		this.posConnectionStart;			//Position of in-progress wiring connection's starting target
		
		//Diagram feedback messages
		this.feedbackIsVisible;
		this.feedbackWidth = 580;			//Width of feedback dialog
		this.feedbackHeight;				//Height of feedback dialog, dynamically determined based on amount of text
		this.txtFeedback;					//Feedback text string
		this.bgColour = "#ffffff";			//Background colour of feedback background rectangle
		this.bgStrokeColour = "#000000";	//Stroke colour of feedback background rectangle
		this.bgStrokeWidth = "2"			//Stroke width of feedback background rectangle
		this.fontStyle = "12px Arial";		
		this.fontColor = "#000000";
		this.feedbackAlpha;					//Current alpha of feedback dialog background/text
		
		//Magnification
		this.scaleMag = 1;
		this.magnificationIsVisible;
		this.posMagnifier;
		this.magBoundaryWidth = 200;
		this.magBoundaryHeight = 200;
		this.magBtnWidth;
		this.magBtnHeight;
		this.posMagnifierBtn;
		
		this.init();
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- General ---------------------------------------------- */
	
	init()	
	{	
		//Set up canvases
		canvasBackground.setSize(this.canvasWidth, this.canvasHeight);	
		canvasDropTargets.setSize(this.canvasWidth, this.canvasHeight);	
		canvasWireTargets.setSize(this.canvasWidth, this.canvasHeight);
		canvasWires.setSize(this.canvasWidth, this.canvasHeight);
		canvasMagnification.setSize(this.canvasWidth, this.canvasHeight);
		canvasForeground.setSize(this.canvasWidth, this.canvasHeight);
		
		//Set up images, targets, and info dialog		
		this.setupImages();
		this.infoDialog = new InfoDialog();
	}	
	
	setupImages()
	{
		this.imagesLoaded = 0;
		this.imageLoadingIsComplete = false;
		
		//Magnifier image
		this.imgMagnifier = new Image();
		this.imgMagnifier.onload = () => { this.onImageLoaded(); }
		this.imgMagnifier.src = "img/general/Magnifier.png";	
		
		//Case images
		this.imgCase0 = new Image();
		this.imgCase0.src = "img/case/case0_activity_older_computer.png";	
		this.imgCase0.onload = () => { this.onImageLoaded(); }	
		this.imgCase1 = new Image();
		this.imgCase1.src = "img/case/case1_scenario1_thin_client.png";	
		this.imgCase1.onload = () => { this.onImageLoaded(); }	
		this.imgCase2 = new Image();
		this.imgCase2.src = "img/case/case2_scenario2_thick_client.png";	
		this.imgCase2.onload = () => { this.onImageLoaded(); }	
		this.imgCase3 = new Image();
		this.imgCase3.src = "img/case/case3_scenario3_CAD_CAM.png";	
		this.imgCase3.onload = () => { this.onImageLoaded(); }			
		
		//Component images
		this.imgCPU0 = new Image();
		this.imgCPU0.src = "img/cpu/cpu0_install.png";	
		this.imgCPU0.onload = () => { this.onImageLoaded(); }
		this.imgCPU1 = new Image();
		this.imgCPU1.src = "img/cpu/cpu1_install.png";	
		this.imgCPU1.onload = () => { this.onImageLoaded(); }
		this.imgCPU2 = new Image();
		this.imgCPU2.src = "img/cpu/cpu2_install.png";	
		this.imgCPU2.onload = () => { this.onImageLoaded(); }
		this.imgCPU3 = new Image();
		this.imgCPU3.src = "img/cpu/cpu3_install.png";	
		this.imgCPU3.onload = () => { this.onImageLoaded(); }
		this.imgRAM0 = new Image();
		this.imgRAM0.src = "img/ram/ram0_install.png";	
		this.imgRAM0.onload = () => { this.onImageLoaded(); }
		this.imgRAM1 = new Image();
		this.imgRAM1.src = "img/ram/ram1_install.png";	
		this.imgRAM1.onload = () => { this.onImageLoaded(); }
		this.imgRAM2 = new Image();
		this.imgRAM2.src = "img/ram/ram2_install.png";	
		this.imgRAM2.onload = () => { this.onImageLoaded(); }
		this.imgRAM3 = new Image();
		this.imgRAM3.src = "img/ram/ram3_install.png";	
		this.imgRAM3.onload = () => { this.onImageLoaded(); }
		this.imgRAM4 = new Image();
		this.imgRAM4.src = "img/ram/ram4_install.png";	
		this.imgRAM4.onload = () => { this.onImageLoaded(); }
		this.imgRAM5 = new Image();
		this.imgRAM5.src = "img/ram/ram5_install.png";	
		this.imgRAM5.onload = () => { this.onImageLoaded(); }
		this.imgGPU0 = new Image();
		this.imgGPU0.src = "img/gpu/gpu0_install.png";	
		this.imgGPU0.onload = () => { this.onImageLoaded(); }
		this.imgGPU1 = new Image();
		this.imgGPU1.src = "img/gpu/gpu1_install.png";	
		this.imgGPU1.onload = () => { this.onImageLoaded(); }
		this.imgGPU2 = new Image();
		this.imgGPU2.src = "img/gpu/gpu2_install.png";	
		this.imgGPU2.onload = () => { this.onImageLoaded(); }
		this.imgGPU3 = new Image();
		this.imgGPU3.src = "img/gpu/gpu3_install.png";	
		this.imgGPU3.onload = () => { this.onImageLoaded(); }
		this.imgCard0 = new Image();
		this.imgCard0.src = "img/cards/card0_install.png";	
		this.imgCard0.onload = () => { this.onImageLoaded(); }
		this.imgCard1 = new Image();
		this.imgCard1.src = "img/cards/card1_install.png";	
		this.imgCard1.onload = () => { this.onImageLoaded(); }
		this.imgCard2 = new Image();
		this.imgCard2.src = "img/cards/card2_install.png";	
		this.imgCard2.onload = () => { this.onImageLoaded(); }
		this.imgCard3 = new Image();
		this.imgCard3.src = "img/cards/card3_install.png";	
		this.imgCard3.onload = () => { this.onImageLoaded(); }
		this.imgCard4 = new Image();
		this.imgCard4.src = "img/cards/card4_install.png";	
		this.imgCard4.onload = () => { this.onImageLoaded(); }
		this.imgDrive0 = new Image();
		this.imgDrive0.src = "img/drives/drive0_install.png";	
		this.imgDrive0.onload = () => { this.onImageLoaded(); }
		this.imgDrive1 = new Image();
		this.imgDrive1.src = "img/drives/drive1_install.png";	
		this.imgDrive1.onload = () => { this.onImageLoaded(); }
		this.imgDrive2 = new Image();
		this.imgDrive2.src = "img/drives/drive2_install.png";	
		this.imgDrive2.onload = () => { this.onImageLoaded(); }
		this.imgDrive3 = new Image();
		this.imgDrive3.src = "img/drives/drive3_install.png";	
		this.imgDrive3.onload = () => { this.onImageLoaded(); }
	}
				
	onImageLoaded()
	{
		this.imagesLoaded++; 	
		
		if (this.imagesLoaded >= this.totalImages)
		{		
			this.imageLoadingIsComplete = true;
			
			//Calculate magnifier button size and position
			this.magBtnWidth = this.imgMagnifier.width;
			this.magBtnHeight = this.imgMagnifier.height;
			this.posMagnifierBtn = {x:this.canvasWidth - this.magBtnWidth - 7, y:this.canvasHeight - this.magBtnHeight - 10};
			this.posMagnifier = {x:this.canvasWidth - this.magBoundaryWidth - 7, y:this.canvasHeight - this.magBoundaryHeight - this.magBtnHeight - 20};
			
			//Start drawing			
			this.drawBackground();
			this.draw();
		}
	}
	
	reset(curPart)
	{
		//Reset magnifier
		this.clearMagnification();
		this.posMagnifier = {x:this.canvasWidth - this.magBoundaryWidth - 7, y:this.canvasHeight - this.magBoundaryHeight - this.magBtnHeight - 20};
		
		//Reset drop targets
		if (curPart == "A")
		{	
			for (let i = 0; i < this.dropTargets.length; i++)
			{
				this.dropTargets[i].reset();
			}
		}
		
		//Reset wiring connections
		this.wiringConnections = [];
		this.enableAllTargets("wiring", false);
		this.connectionInProgress = false;
		this.posConnectionStart = null;
		
		//Reset feedback
		this.feedbackVisible = false;
		
		this.draw();
	}
	
	setup(curPart)
	{
		if (curPart == "A")
		{	
			this.targets = this.dropTargets;
			this.enableAllTargets("wiring", false);
			this.enableAllTargets("drop", true);
		}	
		else if (curPart == "B")
		{
			this.targets = this.wiringTargets;
			this.enableAllTargets("drop", false);
			this.enableAllTargets("wiring", true);
			this.wiringConnections = [];
		}	
		
		this.draw();
	}	
	
	enableAllTargets(type, bool)
	{
		if (type == "drop")
		{
			for (let i = 0; i < this.dropTargets.length; i++)
			{
				this.enableTarget(this.dropTargets[i], bool);
			}
		}
		else if (type == "wiring")
		{
			for (let i = 0; i < this.wiringTargets.length; i++)
			{
				this.enableTarget(this.wiringTargets[i], bool);
			}
		}		
	}
	
	enableTarget(target, bool)
	{
		if (!this.targets) return;
		
		for (let i = 0; i < this.dropTargets.length; i++)
		{
			if ((this.dropTargets[i] == target) || (this.dropTargets[i].id == target))
			{
				this.dropTargets[i].enable(bool);
			}
		}
		for (let i = 0; i < this.wiringTargets.length; i++)
		{
			if ((this.wiringTargets[i] == target) || (this.wiringTargets[i].id == target))
			{
				this.wiringTargets[i].enable(bool);
			}
		}
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Scenario Setup --------------------------------------- */
	
	setScenario(scenarioNum)
	{
		this.imgCase = this["imgCase"+scenarioNum]; //Pick case image based on current scenario number
		
		this.setupDropTargets(scenarioNum);
		this.setupWireTargets(scenarioNum);		
	}
	
	setupDropTargets(scenarioNum)
	{		
		//Setup drop targets based on current scenario number
		let dT1, dT2, dT3, dT4, dT5, dT6, dT7;
		if (scenarioNum == 0)
		{
			dT1 = new DropTarget("cpu", "CPU + Fan", 59, 59, {x: 92, y: 74});
			dT2 = new DropTarget("ramA", "RAM Slot", 25, 156, {x: 225.5, y: 44.5});
			dT3 = new DropTarget("cardWideA", "Card Slot (A)", 113, 11, {x: 54.5, y: 207.5});
			dT4 = new DropTarget("cardWideB", "Card Slot (B)", 113, 11, {x: 54.5, y: 248.5});
			dT5 = new DropTarget("cardWideC", "Card Slot (C)", 113, 11, {x: 54.5, y: 288.5});
			dT6 = new DropTarget("driveBay", "Drive Bay", 116, 28, {x: 310, y: 252});
			this.dropTargets = [dT1, dT2, dT3, dT4, dT5, dT6];
		}
		else if (scenarioNum == 1)
		{
			dT1 = new DropTarget("cpu", "Option A", 76, 75, {x: 90, y: 55});
			dT2 = new DropTarget("ramA", "Option B", 25, 157, {x: 228, y: 45});
			dT3 = new DropTarget("cardWideA", "Option C", 126, 14, {x: 44.5, y: 218});
			dT4 = new DropTarget("cardNarrowA", "Option D", 34, 12, {x: 102, y: 256.5});
			dT5 = new DropTarget("cardNarrowB", "Option E", 34, 12, {x: 102, y: 294});
			dT6 = new DropTarget("driveBay", "Option F", 116, 28, {x: 310, y: 252});
			this.dropTargets = [dT1, dT2, dT3, dT4, dT5, dT6];
		}
		else if (scenarioNum == 2)
		{
			dT1 = new DropTarget("cpu", "Option A", 67, 93, {x: 88, y: 64});
			dT2 = new DropTarget("ramA", "Option B", 24, 157, {x: 204.5, y: 46});
			dT3 = new DropTarget("ramB", "Option C", 25, 157, {x: 227, y: 46});
			dT4 = new DropTarget("cardWideA", "Option D", 125, 14, {x: 45.5, y: 219.5});
			dT5 = new DropTarget("cardNarrowA", "Option E",  34, 12, {x: 102, y: 268});
			dT6 = new DropTarget("driveBay", "Option F", 116, 28, {x: 310, y: 252});
			this.dropTargets = [dT1, dT2, dT3, dT4, dT5, dT6];			
		}
		else if (scenarioNum == 3)
		{		
			dT1 = new DropTarget("cpu", "Option A", 70, 96, {x: 88, y: 64});
			dT2 = new DropTarget("ramA", "Option B", 24, 157, {x: 211, y: 42});
			dT3 = new DropTarget("ramB", "Option C", 25, 157, {x: 233, y: 42});
			dT4 = new DropTarget("cardWideA", "Option D", 126, 14, {x: 42, y: 208});
			dT5 = new DropTarget("cardNarrowA", "Option E",  36, 12, {x: 101.5, y: 272});
			dT6 = new DropTarget("cardNarrowB", "Option F",  36, 12, {x: 101.5, y: 307});
			dT7 = new DropTarget("driveBay", "Option G", 116, 28, {x: 310, y: 252});
			this.dropTargets = [dT1, dT2, dT3, dT4, dT5, dT6, dT7];				
		}
		
		//Set case position as reference position
		for (let i = 0; i < this.dropTargets.length; i++)
		{
			this.dropTargets[i].setPosRef(this.posCase);
		}
	}
	
	setupWireTargets(scenarioNum)
	{	
		//Setup wiring targets based on current scenario number
		let wT1, wT2, wT3, wT4, wT5, wT6, wT7, wT8, wT9, wT10, wT11, wT12;
		if (scenarioNum == 0)
		{		
			wT1 = new WiringTarget("4pin", "4-Pin ATX Power Connection", "Option A", {x: 67, y: 84});
			wT2 = new WiringTarget("chassisPower", "Chassis Fan Power Connection", "Option B", {x: 68, y: 128});
			wT3 = new WiringTarget("cpuPower", "CPU Fan Power Connection", "Option C", {x: 67, y: 106});
			wT4 = new WiringTarget("chassisFan", "Chassis Fan", "Option D", {x: 55, y: 165});
			wT5 = new WiringTarget("cpuFan", "CPU Fan", "Option E", {x: 102, y: 154});
			wT6 = new WiringTarget("24pin", "24-Pin ATX Power Connection", "Option F", {x: 271.5, y: 89});
			wT7 = new WiringTarget("driveDataEDIE", "Hard Drive Cable Connection", "Option G", {x: 271.5, y: 142});
			wT8 = new WiringTarget("driveMolex", "Installed Hard Drive", "Option H", {x: 305, y: 265});
			wT9 = new WiringTarget("fpc", "Front Panel Connection", "Option I", {x: 258, y: 300});
			wT10 = new WiringTarget("powerSupply", "Power Supply", "Option J", {x: 190, y: 370});
			wT11 = new WiringTarget("fpcHarness", "Front Panel Harness", "Option K", {x: 272, y: 400});
			this.wiringTargets = [wT1, wT2, wT3, wT4, wT5, wT6, wT7, wT8, wT9, wT10, wT11];
		}
		else if (scenarioNum == 1)
		{		
			wT1 = new WiringTarget("4pin", "4-Pin ATX Power Connection", "Option A", {x: 70, y: 58.25});
			wT2 = new WiringTarget("chassisPower", "Chassis Fan Power Connection", "Option B", {x: 71, y: 86.5});
			wT3 = new WiringTarget("cpuPower", "CPU Fan Power Connection", "Option C", {x: 71, y: 124});
			wT5 = new WiringTarget("chassisFan", "Chassis Fan", "Option D", {x: 55, y: 170});
			wT4 = new WiringTarget("cpuFan", "CPU Fan", "Option E", {x: 111, y: 142});
			wT6 = new WiringTarget("24pin", "24-Pin ATX Power Connection", "Option F", {x: 272, y: 110});
			wT7 = new WiringTarget("driveDataSATA", "Hard Drive Cable Connection", "Option G", {x: 265, y: 262});
			wT8 = new WiringTarget("driveSATA", "Installed Hard Drive", "Option H", {x: 305, y: 265});
			wT9 = new WiringTarget("fpc", "Front Panel Connection", "Option I", {x: 260, y: 302.5});
			wT10 = new WiringTarget("powerSupply", "Power Supply", "Option J", {x: 190, y: 370});
			wT11 = new WiringTarget("fpcHarness", "Front Panel Harness", "Option K", {x: 272, y: 398});
			this.wiringTargets = [wT1, wT2, wT3, wT4, wT5, wT6, wT7, wT8, wT9, wT10, wT11];
		}
		else if (scenarioNum == 2)
		{
			wT1 = new WiringTarget("4pin", "4-Pin ATX Power Connection", "Option A", {x: 64, y: 81});
			wT2 = new WiringTarget("chassisPower", "Chassis Fan Power Connection", "Option B", {x: 64, y: 103});
			wT3 = new WiringTarget("cpuPower", "CPU Fan Power Connection", "Option C", {x: 65, y: 124});
			wT4 = new WiringTarget("chassisFan", "Chassis Fan", "Option D", {x: 53, y: 169});
			wT5 = new WiringTarget("cpuFan", "CPU Fan", "Option E", {x: 106, y: 155});
			wT6 = new WiringTarget("24pin", "24-Pin ATX Power Connection", "Option F", {x: 274, y: 169});
			wT7 = new WiringTarget("driveDataSATA", "Hard Drive Cable Connection", "Option G", {x: 250, y: 258});
			wT8 = new WiringTarget("driveSATA", "Installed Hard Drive", "Option H", {x: 305, y: 265});
			wT9 = new WiringTarget("fpc", "Front Panel Connection", "Option I", {x: 251.5, y: 296});
			wT10 = new WiringTarget("powerSupply", "Power Supply", "Option J", {x: 190, y: 370});
			wT11 = new WiringTarget("fpcHarness", "Front Panel Harness", "Option K", {x: 272, y: 396});			
			this.wiringTargets = [wT1, wT2, wT3, wT4, wT5, wT6, wT7, wT8, wT9, wT10, wT11];
		}
		else if (scenarioNum == 3)
		{		
			wT1 = new WiringTarget("4pin", "4-Pin ATX Power Connection", "Option A", {x: 66, y: 80.5});
			wT2 = new WiringTarget("chassisPower", "Chassis Fan Power Connection", "Option B", {x: 66, y: 102.5});
			wT3 = new WiringTarget("cpuPower", "CPU Fan Power Connection", "Option C", {x: 67, y: 124});
			wT5 = new WiringTarget("chassisFan", "Chassis Fan", "Option D", {x: 55, y: 168});
			wT4 = new WiringTarget("cpuFan", "CPU Fan", "Option E", {x: 107, y: 154});
			wT6 = new WiringTarget("24pin", "24-Pin ATX Power Connection", "Option F", {x: 276, y: 169});
			wT7 = new WiringTarget("68pin", "6/8-Pin ATX Power Connection", "Option G", {x: 244, y: 220});
			wT8 = new WiringTarget("driveDataSATA", "Installed Hard Drive", "Option H", {x: 233, y: 308});
			wT9 = new WiringTarget("driveSATA", "Hard Drive Cable Connection", "Option I", {x: 305, y: 265});
			wT10 = new WiringTarget("fpc", "Front Panel Connection", "Option J", {x: 259.5, y: 328});
			wT11 = new WiringTarget("powerSupply", "Power Supply", "Option K", {x: 190, y: 370});
			wT12 = new WiringTarget("fpcHarness", "Front Panel Harness", "Option L", {x: 272, y: 398});
		this.wiringTargets = [wT1, wT2, wT3, wT4, wT5, wT6, wT7, wT8, wT9, wT10, wT11, wT12];
		}
		
		//Set case position as reference position
		for (let i = 0; i < this.wiringTargets.length; i++)
		{
			this.wiringTargets[i].setPosRef(this.posCase);
		}
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Draw ------------------------------------------------- */
	
	drawBackground()
	{
		canvasBackground.clearAll();
				
		canvasBackground.drawImageScaled(this.imgCase, this.posCase, this.imgCase.width * this.scaleNormal, this.imgCase.height * this.scaleNormal);
	}	
	
	draw()
	{
		if (!this.imageLoadingIsComplete) return;
		
		//Clear canvases
		canvasDropTargets.clearAll();
		canvasWireTargets.clearAll();
		canvasWires.clearAll();
		canvasMagnification.clearAll();
		canvasForeground.clearAll();
		
		//Draw various elements of the diagram when they are active
		if (this.dropTargets)				this.drawDropTargets();
		if (this.wiringTargets)				this.drawWiringTargets();
		if (this.wiringConnections)			this.drawWiringConnections();
		if (this.infoDialogIsVisible)		this.infoDialog.draw();	
		if (this.magnificationIsVisible) 	this.drawMagnification();
		if (this.feedbackIsVisible)			this.drawFeedbackDialog();

		//Draw magnification button
		canvasMagnification.drawImage(this.imgMagnifier, this.posMagnifierBtn);
	}
		
	drawDropTargets()
	{
		for (let i = 0; i < this.dropTargets.length; i++)
		{ 
			this.dropTargets[i].draw();
		}		
	}
	
	drawWiringTargets()
	{
		for (let i = 0; i < this.wiringTargets.length; i++)
		{
			this.wiringTargets[i].draw();
		}
	}
	
	drawWiringConnections()
	{
		for (let i = 0; i < this.wiringConnections.length; i++)
		{
			this.wiringConnections[i].draw();
		}	
	}
		
	drawInProgressConnection()
	{
		//Draw a wire that is currently being connected
		canvasForeground.clearAll();
		canvasForeground.drawLine(this.posConnectionStart, {x:main.mouseX, y:main.mouseY}, "#ff0000", "4");
		if (this.infoDialogIsVisible)	this.infoDialog.draw();	
	}
	
	drawMagnification()
	{
		//Fade out everything behind magnification
		canvasWires.drawRectangle({x: 0, y: 0}, this.canvasWidth, this.canvasHeight, "rgba(255, 255, 255, 0.5)", "", "");
		
		//Draw magnified version of the case
		let offsetX = this.posMagnifier.x; 
		let offsetY = this.posMagnifier.y + this.magBoundaryHeight/2; 		
		let posCaseMag = {x: this.posCase.x - offsetX, y: this.posCase.y - offsetY}
		canvasMagnification.drawImageScaled(this.imgCase, posCaseMag, this.imgCase.width * this.scaleMag, this.imgCase.height * this.scaleMag);
		
		//Draw various magnified elements of the diagram when they are active
		if (this.dropTargets)			this.drawDropTargetsMagnified(posCaseMag);
		if (this.wiringTargets)			this.drawWiringTargetsMagnified(posCaseMag);
		if (this.wiringConnections)		this.drawWiringConnectionsMagnified(posCaseMag);				
		
		//Clear everything outside magnification area
		canvasMagnification.clear({x: 0, y: 0}, this.posMagnifier.x, this.canvasHeight); 
		canvasMagnification.clear({x: 0, y: 0}, this.canvasWidth, this.posMagnifier.y); 
		canvasMagnification.clear({x: this.posMagnifier.x + this.magBoundaryWidth, y: 0}, this.canvasWidth - this.magBoundaryWidth - this.posMagnifier.x, this.canvasHeight);  
		canvasMagnification.clear({x: 0, y: this.posMagnifier.y + this.magBoundaryHeight}, this.canvasWidth, this.canvasHeight - this.magBoundaryHeight - this.posMagnifier.y);	

		//Draw magnification boundary
		canvasWires.drawRectangle({x: this.posMagnifier.x, y: this.posMagnifier.y}, this.magBoundaryWidth, this.magBoundaryHeight, "rgba(209, 211, 212, 1)", "", "");
		canvasMagnification.drawRectangle({x: this.posMagnifier.x, y: this.posMagnifier.y}, this.magBoundaryWidth, this.magBoundaryHeight, "", "#000000", "2");
	}
	
	drawDropTargetsMagnified(posRefMag)
	{
		for (let i = 0; i < this.dropTargets.length; i++)
		{
			this.dropTargets[i].drawMagnified(posRefMag);
		}	
	}
	
	drawWiringTargetsMagnified(posRefMag)
	{
		for (let i = 0; i < this.wiringTargets.length; i++)
		{
			this.wiringTargets[i].drawMagnified(posRefMag);
		}
	}
	
	drawWiringConnectionsMagnified()
	{
		for (let i = 0; i < this.wiringConnections.length; i++)
		{
			this.wiringConnections[i].drawMagnified();
		}	
	}
	
	drawFeedbackDialog()
	{		
		//Draw background rectangle
		let posCenter = {x:this.canvasWidth/2, y: this.canvasHeight/2};
		let posBG = {x: posCenter.x - this.feedbackWidth/2, y: posCenter.y - this.feedbackHeight/2};
		canvasForeground.drawRectangle(posBG, this.feedbackWidth, this.feedbackHeight, "rgba(255,255,255, "+this.feedbackAlpha+")", "rgba(0, 0, 0, "+this.feedbackAlpha+")", this.bgStrokeWidth);
		
		//Draw text
		let posText = {x: posCenter.x, y: posBG.y + 20}
		for(let i = 0; i < this.txtFeedback.length; i++)
		{
			canvasForeground.drawText(this.txtFeedback[i], posText, this.fontStyle, "rgba(0, 0, 0, "+this.feedbackAlpha+")", "center");
			posText = {x: posText.x, y: posText.y + 16};
		}
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Magnification ---------------------------------------- */	
	
	isOverMagnificationButton()
	{
		if (! this.posMagnifierBtn) return;
		
		let xMin = this.posMagnifierBtn.x;
		let xMax = this.posMagnifierBtn.x + this.magBtnWidth;
		let yMin = this.posMagnifierBtn.y;
		let yMax = this.posMagnifierBtn.y + this.magBtnHeight;		
				
		if ((main.mouseX > xMin) && (main.mouseX < xMax) &&
			(main.mouseY > yMin) && (main.mouseY < yMax)) 
		{ 
			return true;
		}
		return false;
	}
	
	isOverMagnifierPanel()
	{
		if (!this.magnificationIsVisible) return false;
		
		let xMin = this.posMagnifier.x;
		let xMax = this.posMagnifier.x + this.magBoundaryWidth;
		let yMin = this.posMagnifier.y;
		let yMax = this.posMagnifier.y + this.magBoundaryHeight;		
				
		if ((main.mouseX > xMin) && (main.mouseX < xMax) &&
			(main.mouseY > yMin) && (main.mouseY < yMax)) 
		{ 
			return true;
		}
		return false;
	}
	
	displayMagnification()
	{
		if (this.magnificationIsVisible)
		{
			this.clearMagnification();
			return;
		}
		
		this.magnificationIsVisible = true;
		this.draw();
	}
	
	clearMagnification()
	{
		this.magnificationIsVisible = false;
		this.draw();
	}
	
	updateMagnifierPosition()
	{
		let x = main.mouseX - this.magBoundaryWidth/2;
		let y = main.mouseY - this.magBoundaryHeight/2;
		this.posMagnifier = {x:x, y:y};
		this.draw();
	}
		
	setMagnifierToBeingDragged(bool)
	{
		this.magnifierIsBeingDragged = bool;
	}
	
	isMagnifierBeingDragged()
	{
		return this.magnifierIsBeingDragged;
	}
	
		
	/* ------------------------------------------------------------ */
	/* ----- Dropping/Dropping ------------------------------------- */
	
	isMouseOverTarget(dragger)
	{	
		let isOverTarget = false; 
		let diagram = main.buildDiagram; 
		if (diagram.targets)
		{
			//Show highlight over active target
			let activeTarget;
			for (let i = 0; i < diagram.targets.length; i++)
			{
				if (diagram.targets[i].isMouseOver(main.mouseX, main.mouseY)) 
				{			
					activeTarget = diagram.targets[i];	
					activeTarget.showHighlight(true)
					isOverTarget = true;
				}
			}	
			
			//Hide highlight for all other targets
			for (let i = 0; i < diagram.targets.length; i++)
			{
				if (diagram.targets[i] != activeTarget)
				{
					diagram.targets[i].showHighlight(false);
				}
			}	
			
			this.draw();
		}
		
		return isOverTarget;
	}		
	
	isDraggerOverAcceptableDropTarget(dragger)
	{		
		let isOverAcceptableDropTarget = false; 
		let diagram = main.buildDiagram; 
		for (let i = 0; i < diagram.targets.length; i++)
		{
			if (diagram.targets[i].isMouseOver(main.mouseX, main.mouseY)) 
			{			
				for (let j = 0; j < dragger.potentialDropTargets.length; j++)
				{
					if (dragger.potentialDropTargets[j] == diagram.targets[i].id)
					{
						diagram.targets[i].showHighlight(true)
						isOverAcceptableDropTarget = true;
					}
				}
			}
		}		
		this.draw();
		
		return isOverAcceptableDropTarget;
	}
	
	isMouseOverOccupiedDropTarget()
	{		
		let isOverOccupiedDropTarget = false; 
		let diagram = main.buildDiagram; 
		for (let i = 0; i < diagram.targets.length; i++)
		{
			diagram.targets[i].showHighlight(false);
			
			if (diagram.targets[i].isMouseOver(main.mouseX, main.mouseY)) 
			{
				let target = diagram.targets[i];
				if (target.isItOccupied())
				{
					isOverOccupiedDropTarget = true;
					diagram.targets[i].showHighlight(true);
				}
			}
		}	
		return isOverOccupiedDropTarget;
	}
	
	getActiveTarget()
	{
		let target = null;
		for (let i = 0; i < this.targets.length; i++)
		{
			if (this.targets[i].isMouseOver(main.mouseX, main.mouseY)) 
			{
				target = this.targets[i];
			}
		}	
		return target;
	}
	
	getDropTargets()
	{
		return this.dropTargets;
	}
	
	getDropTarget(targetID)
	{
		for (let i = 0; i < this.dropTargets.length; i++)
		{
			if (this.dropTargets[i].id == targetID)
			{
				return this.dropTargets[i];
			}
		}
		return null;		
	}
	
	addComponent(dropTarget, component)
	{		
		//Add component to drop target		
		let img = this["img"+component.id]; 
		if ((dropTarget) && (img))
		{
			dropTarget.addDragger(component, img);
		}
		
		this.updateInfoDialog();	
		this.draw();		
	}
	
	removeComponent(dropTarget)
	{
		dropTarget.removeDragger();
		this.updateInfoDialog();
		this.draw();
	}	


	/* ------------------------------------------------------------ */
	/* ----- Wiring ----------------------------------------------- */
	
	startConnection(connector)
	{
		this.connectionInProgress = true;	
		
		this.connectionTarget1 = this.getActiveTarget();		
		this.posConnectionStart = this.connectionTarget1.getPos();
		main.limitToNonPartialWiringTargets();		
		
		//If this connector is a partial connection (ie. one end is already installed in //the computer), re-enable starting target
		if (connector.connectionType == "partial")
		{			
			let fixedStart = connector.fixedStart;	
			let target = this.getWiringTarget(fixedStart);
			main.buildDiagram.enableTarget(target, true);
		}
		this.draw()	
	}
	
	endConnection(component)
	{
		let connectionSuccessful = false;		
		if (this.isMouseOverTarget())
		{
			let connectionTarget2 = this.getActiveTarget();
			if (this.isConnectionValid(component, this.connectionTarget1, connectionTarget2)) //Connection valid, proceed
			{
				connectionSuccessful = true;				
				this.addConnection(component, this.connectionTarget1, connectionTarget2);
			}
			else //Connection invalid, stop
			{
				if (this.connectionTarget1 != connectionTarget2)
				{					
					this.showInvalidConnectionMessage();
				}
			}
		}
		
		//Reset in progress connection
		if (component.connectionType == "partial")
		{
			main.limitWiringTargets(component);
		}
		this.connectionTarget1 = false;
		this.connectionInProgress = false;	
		
		return connectionSuccessful;
	}
	
	isConnectionInProgress()
	{
		return this.connectionInProgress;
	}
	
	isConnectionValid(connector, target1, target2)
	{
		let isValid = true;
		
		//Are target1 and target2 the same target?
		if (target1 == target2) isValid = false;
		
		//Does a connection between these two targets already exist? This shouldn't happen with
		//the combination of connectors that we are using, but let's make sure just in case.
		for (let i = 0; i < this.wiringConnections.length; i++)
		{
			let conn = this.wiringConnections[i];
			if (((conn.target1 == target1) && (conn.target2 == target2)) ||
				((conn.target1 == target2) && (conn.target2 == target1)))
			{
					isValid = false;
			}					
		}
		
		//Are both of the targets permitted targets for this connector?		
		let targets = connector.permittedTargets;
		let matchingTargets = 0;
		for (let i = 0; i < targets.length; i++)
		{
			if ((targets[i] == target1.id) || (targets[i] == target2.id))	

			{
				matchingTargets++;
			}				
		}
		if (matchingTargets < 2) isValid = false;
		
		return isValid;		
	}	
	
	addConnection(component, target1, target2)
	{
		let connection = new WiringConnection(component, target1, target2);		
		this.wiringConnections.push(connection);
	}
	
	clearConnection(conn)
	{	
		for (let i = 0; i < this.wiringConnections.length; i++)
		{
			if (this.wiringConnections[i] == conn)
			{	
				conn.reset();		
				this.wiringConnections.splice(i, 1);				
				this.infoDialog.setTarget(this.getActiveTarget());
				this.draw();
			}				
		}
	}
		
	getWiringTarget(targetID)
	{
		for (let i = 0; i < this.wiringTargets.length; i++)
		{
			if (this.wiringTargets[i].id == targetID)
			{
				return this.wiringTargets[i];
			}
		}
		return null;	
	}
	
	getWiringConnections()
	{
		return this.wiringConnections;
	}

	getWiringConnectionsForCategory(categoryID)
	{
		let connections = [];
		for (let i = 0; i < this.wiringConnections.length; i++)
		{
			let connector = this.wiringConnections[i]; 
			if (connector.component.category == categoryID)	connections.push(connector);
		}
		return connections;
	}		

	getWiringConnection(component)
	{
		let connection = null;
		for (let i = 0; i < this.wiringConnections.length; i++)
		{
			if (this.wiringConnections[i].component.id == component.id)
			{
				connection = this.wiringConnections[i];
			}
		}		
		return connection;
	}

	disablePartialWiringTargets()
	{
		let targetChassisFan = this.getWiringTarget("chassisFan");
		main.buildDiagram.enableTarget(targetChassisFan, false);		
		
		let targetCPUFan = this.getWiringTarget("cpuFan");
		main.buildDiagram.enableTarget(targetCPUFan, false);
		
		let targetFPC = this.getWiringTarget("fpcHarness");
		main.buildDiagram.enableTarget(targetFPC, false);
		
		let targetPowerSupply = this.getWiringTarget("powerSupply");
		main.buildDiagram.enableTarget(targetPowerSupply, false);
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Info Dialog ------------------------------------------ */

	updateInfoDialog()
	{
		this.infoDialog.setTarget(this.getActiveTarget());
	}

	showInfoDialog()
	{
		this.updateInfoDialog();
		this.infoDialogIsVisible = true;
	}

	hideInfoDialog()
	{
		this.infoDialogIsVisible = false;
	}


	/* ------------------------------------------------------------ */
	/* ----- Feedback Messages ------------------------------------ */
	
	showInvalidDropMessage()
	{
		this.txtFeedback = [];
		this.txtFeedback.push("This component cannot be installed at that location because it doesn’t fit. Try a different combination.");
		this.feedbackHeight = 40;
		
		this.startFeedbackFade();
	}
	
	showInvalidConnectionMessage()
	{
		this.txtFeedback = [];
		this.txtFeedback.push("This connector cannot be installed here because at least one of its ends");
		this.txtFeedback.push("doesn’t fit. Try a different combination.");
		this.feedbackHeight = 56;
		
		this.startFeedbackFade();
	}
	
	clearFeedback()
	{
		this.stopFeedbackFade();
		this.draw();
	}
	
	startFeedbackFade()
	{
		this.stopFeedbackFade();
		
		this.feedbackIsVisible = true;	
		this.feedbackAlpha = 1;	
		this.feedbackTimeout = setTimeout(this.fadeFeedback, 8000); //Start fading out feedback after 5 seconds
	}
	
	fadeFeedback()
	{
		let build = main.buildDiagram;
		if (!build.feedbackIsVisible) return;
		
		build.feedbackAlpha -= 0.025;
		build.draw();
		if (build.feedbackAlpha > 0) 
		{
			setTimeout(build.fadeFeedback, 50);		
		}	
		else
		{
			build.stopFeedbackFade();
		}
	}
	
	stopFeedbackFade()
	{
		this.feedbackIsVisible = false;
		clearTimeout(this.feedbackTimeout);
	}
}