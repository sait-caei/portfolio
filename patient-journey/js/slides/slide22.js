class Slide22 extends DragDropSlide
{
	constructor() 
	{	
		super();
		
		//General
		this.slideType = this.slideTypeDragDrop;
		this.txtSectionHeading = "Home";
		this.txt = "I’m relieved now that I’m home but my journey isn't over yet. I’ll still need the help of a team to fully recover. \n\nClick the Continue button to explore the roles of some of the professionals that will be providing ongoing support.";
		this.txtInstructions = "Drag then drop the role descriptions on the empty space located to the right of the correct role. \n\nClick the Submit button to check your answers.";
		this.curStep;
		
		//Draggers and Targets
		this.tWidth = 250;
		this.tHeight = 90;
		this.dWidth = this.tWidth;
		this.dHeight = this.tHeight;
		this.posDraggers = {x: 210, y: 395};
		this.posTarget1;
		this.posTarget2;
		this.posTarget3;
		this.posTarget4;
		
		//Target Table 
		this.posTable = {x: 100, y: 75};
		this.widthTable =  800;
		this.heightTable = 310;
		this.txtColour = "#ffffff";
		this.borderColor = "#000000";
		this.borderWidth = "4";
		this.txtStyleHeading = "Bold 16px Arial";
		this.txtAlign = "center";
		this.posBtn = {x: this.posTable.x + this.widthTable - 95, y: this.posTable.y + this.heightTable + 12};
				
		//Glossary
		this.curTerms = ["Occupational Therapist", "Pharmacy Assistant", "Physiotherapist", "Rehab Assistant", "Rehabilitation Therapy Assistant"];
		
		this.init();		
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Slide-Specific Actions ------------------------------- */
	
	loadImages()
	{		
		this.totalImages = 14;
		this.loadBackgroundImage("bg13");	
		this.loadDialogIconImage("Patient");
		this.loadOptionIconImage("OT");
		this.loadOptionIconImage("PA");
		this.loadOptionIconImage("PT");
		this.loadOptionIconImage("RTA");
		
		super.loadImages();
	}
	
	reset()
	{
		super.reset();
		
		this.curStep = 1;
		this.removeSubmitButton();
	}
	
	setup()
	{			
		//Add dialog
		this.addDialog(this.imgDialogPatient, this.patientName, this.colourPatient, this.txt, "Continue");
		this.dialog.setBackgroundToFaded(false);
		
		super.setup();
	}
	
	onContinue()
	{	
		super.onContinue();
		
		this.curStep++;		
		if (this.curStep == 2)
		{	
			//Add draggers and targets
			this.addTargets();			
			this.addDraggers();			
			this.positionDraggers();
			this.setupDraggers();
			this.addSubmitButton();
			
			//Add dialog
			this.addDialog("", "Instructions", this.colourDefault, this.txtInstructions, "Continue");
		}
	}
	
	addTargets()
	{	
		this.posTarget1 = {x:this.posTable.x + this.imgOptionOTInactive.width - 10, y:this.posTable.y + 30};
		this.target1 = new Target(this.posTarget1, this.tWidth, this.tHeight);		
		this.posTarget2 = {x:this.posTarget1.x, y:this.posTarget1.y + this.imgOptionOTInactive.height};
		this.target2 = new Target(this.posTarget2, this.tWidth, this.tHeight);
		this.posTarget3 = {x:this.posTarget1.x + this.widthTable/2, y:this.posTarget1.y};
		this.target3 = new Target(this.posTarget3, this.tWidth, this.tHeight);		
		this.posTarget4 = {x:this.posTarget3.x, y:this.posTarget3.y + this.imgOptionOTInactive.height};
		this.target4 = new Target(this.posTarget4, this.tWidth, this.tHeight);
		this.targets = [this.target1, this.target2, this.target3, this.target4];
		this.setTargetBordersToVisible(true);		
	}
	
	addDraggers()
	{			
		//Add draggers
		this.dragger1 = new DraggerText("OT", this.dWidth, this.dHeight, "Will assess the home and modify the \nspace to accommodate the patient.", [this.target1]);
		this.dragger2 = new DraggerText("PA", this.dWidth, this.dHeight, "Will assist the community pharmacist \nby organizing the patient's \nmedications for administration at \nhome. ", [this.target2]);
		this.dragger3 = new DraggerText("PT", this.dWidth, this.dHeight, "Creates and manages the cardiac \nrehabilitation plan at the cardiac \nrehabilitation centre.", [this.target3]);
		this.dragger4 = new DraggerText("RTA", this.dWidth, this.dHeight, "Works with the physiotherapist to \nimplement the rehabilitation plan and \nassist the patient with their exercises.", [this.target4]);			
		this.draggers = [this.dragger1, this.dragger2, this.dragger3, this.dragger4];
				
	}
	
	positionDraggers()
	{		
		//Position draggers
		let pos = this.posDraggers;
		this.draggers = main.shuffle(this.draggers); //Randomize dragger order		
		for (let i = 0; i < this.draggers.length; i++) 
		{	
			this.draggers[i].setDefaultPosition(pos);
			
			//Update position for next dragger
			if (i == 1)
			{
				pos = {x:pos.x + this.dWidth + 10, y:pos.y - (this.dHeight + 10)};
			}
			else
			{
				pos = {x:pos.x, y:pos.y + (this.dHeight + 10)};
			}
		}		
	}
	
	
	
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	draw()
	{
		if (this.curStep > 1)
		{
			//Draw rectangle to fade background
			canvasMidground.saveState();
			canvasMidground.setAlpha(0.6);
			canvasMidground.drawRectangle({x:this.pos.x, y:this.pos.y}, 860, 535, "#ffffff", "", "");
			canvasMidground.restoreState();
			
			this.drawTargetTable();	
			this.drawTableImages();
		}
		
		super.draw(); 				
	}
	
	drawTargetTable()
	{
		let pos = this.posTable;
		let width = this.widthTable;
		let height = this.heightTable;
		
		//Draw rectangle
		canvasMidground.drawRectangle(pos, width, height, "#dddddd", this.borderColor, this.borderWidth);
		
		//Draw dividers	
		pos = {x:this.posTable.x + (width/2), y:this.posTable.y};
		canvasMidground.drawLine(pos, {x:pos.x, y:pos.y + height}, this.borderColor, this.borderWidth/2);
		pos = {x:this.posTable.x, y:this.posTable.y + this.imgOptionOTInactive.height + 5};
		canvasMidground.drawLine(pos, {x:pos.x + width, y:pos.y}, this.borderColor, this.borderWidth/2);
	}

	drawTableImages()
	{
		//Draw OT image
		let pos = {x:this.posTable.x, y:this.posTable.y};
		canvasMidground.drawImage(this.imgOptionOTInactive, pos);
		
		//Draw PA image
		pos = {x:pos.x, y:pos.y + this.imgOptionOTInactive.height + 10};
		canvasMidground.drawImage(this.imgOptionPAInactive, pos);
		
		//Draw PT image
		pos = {x:pos.x + this.widthTable/2, y:pos.y - this.imgOptionOTInactive.height - 10};
		canvasMidground.drawImage(this.imgOptionPTInactive, pos);
		
		//Draw RTA image
		pos = {x:pos.x, y:pos.y + this.imgOptionPTInactive.height + 10};
		canvasMidground.drawImage(this.imgOptionRTAInactive, pos);
	}
}