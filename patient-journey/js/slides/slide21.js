class Slide21 extends DragDropSlide
{
	constructor() 
	{
		super();
		
		//General
		this.slideType = this.slideTypeDragDrop;
		this.txtSectionHeading = "Tertiary Care Facility";
		this.txt = "Great news, I'm finally on the mend! \n\nThe interprofessional team that has seen me through my journey has grown even larger now that I am in \npost-operative care. \n\nClick the Continue button to further explore the team roles.";
		this.txtInstructions = "Drag then drop the role descriptions on the empty space located to the right of the correct role. \n\nClick the Submit button to check your answers. ";
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
		this.curTerms = ["Physician", "Medical Doctor", "Pharmacist", "Registered Social Worker", "Registered Dietician"];	
		
		this.init();		
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Slide-Specific Actions ------------------------------- */
	
	loadImages()
	{		
		this.totalImages = 14;
		this.loadBackgroundImage("bg12");	
		this.loadDialogIconImage("Patient");
		this.loadOptionIconImage("MD");
		this.loadOptionIconImage("Pharmacist");
		this.loadOptionIconImage("RD");
		this.loadOptionIconImage("RSW");
		
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
		this.posTarget1 = {x:this.posTable.x + this.imgOptionMDInactive.width - 10, y:this.posTable.y + 30};
		this.target1 = new Target(this.posTarget1, this.tWidth, this.tHeight);		
		this.posTarget2 = {x:this.posTarget1.x, y:this.posTarget1.y + this.imgOptionMDInactive.height};
		this.target2 = new Target(this.posTarget2, this.tWidth, this.tHeight);
		this.posTarget3 = {x:this.posTarget1.x + this.widthTable/2, y:this.posTarget1.y};
		this.target3 = new Target(this.posTarget3, this.tWidth, this.tHeight);		
		this.posTarget4 = {x:this.posTarget3.x, y:this.posTarget3.y + this.imgOptionMDInactive.height};
		this.target4 = new Target(this.posTarget4, this.tWidth, this.tHeight);
		this.targets = [this.target1, this.target2, this.target3, this.target4];
		this.setTargetBordersToVisible(true);		
	}
	
	addDraggers()
	{
		this.dragger1 = new DraggerText("MD", this.dWidth, this.dHeight, "Team Lead.  Manages the prognosis \nand treatments of the condition and \nconsults the cardiologist for patient \ndischarge from hospital.", [this.target1]);
		this.dragger2 = new DraggerText("Pharmacist", this.dWidth, this.dHeight, "Suggests and manages the \npharmaceutical care of the patient, \nincluding pain management and \ninfection control.", [this.target2]);
		this.dragger3 = new DraggerText("RSW", this.dWidth, this.dHeight, "Sets up community supports for the \npatient and ensures open \ncommunication and dialogue among \nthe Interprofessional Team.", [this.target3]);
		this.dragger4 = new DraggerText("RD", this.dWidth, this.dHeight, "Creates a heart-healthy diet for the \npatient, both in the hospital and at \nhome.", [this.target4]);			
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
		pos = {x:this.posTable.x, y:this.posTable.y + this.imgOptionMDInactive.height + 5};
		canvasMidground.drawLine(pos, {x:pos.x + width, y:pos.y}, this.borderColor, this.borderWidth/2);
	}

	drawTableImages()
	{
		//Draw MD image
		let pos = {x:this.posTable.x, y:this.posTable.y};
		canvasMidground.drawImage(this.imgOptionMDInactive, pos);
		
		//Draw Pharmacist image
		pos = {x:pos.x, y:pos.y + this.imgOptionMDInactive.height + 10};
		canvasMidground.drawImage(this.imgOptionPharmacistInactive, pos);
		
		//Draw RWS image
		pos = {x:pos.x + this.widthTable/2, y:pos.y - this.imgOptionMDInactive.height - 10};
		canvasMidground.drawImage(this.imgOptionRSWInactive, pos);
		
		//Draw RD image
		pos = {x:pos.x, y:pos.y + this.imgOptionRSWInactive.height + 10};
		canvasMidground.drawImage(this.imgOptionRDInactive, pos);
	}
}