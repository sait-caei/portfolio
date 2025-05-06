class Slide18 extends DragDropSlide
{
	constructor() 
	{	
		super();
		
		//General
		this.slideType = this.slideTypeDragDrop;
		this.txtSectionHeading = "Teriary Care Centre";
		this.txt = "The pre-surgery workup involves a variety of team members who are directly or indirectly involved in patient care. Indirect \npatient care involves professionals who do not have personal or direct contact with the patient. Direct patient care involves \nprofessionals having personal contact with the patient, often related to the diagnosis and treatment of the patient’s condition. \n\nDrag then drop the team members on the appropriate table column to indicate whether their role in this process is direct or \nindirect. \n\nClick the Submit button to check your answers.";
		
		//Draggers and Targets
		this.tWidth = 275;
		this.tHeight = 70;
		this.dWidth = this.tWidth;
		this.dHeight = this.tHeight;
		this.posDraggers = {x: 80, y: 90};
		
		//Target Table 
		this.posTable = {x: this.posDraggers.x + 285, y: this.posDraggers.y};
		this.tHeadingHeight = 30;
		this.widthTable =  (this.dWidth * 2);
		this.heightTable = this.tHeight*4 + this.tHeadingHeight;
		this.txtColour = "#ffffff";
		this.borderColor = "#000000";
		this.borderWidth = "4";
		this.txtStyleHeading = "Bold 16px Arial";
		this.txtAlign = "center";
		this.posBtn = {x: this.posTable.x + this.widthTable - 95, y: this.posTable.y + this.heightTable + 12};	
				
		//Glossary
		this.curTerms = ["Medical Laboratory Assistant", "Diagnostic Medical Sonographer", "Registered Respiratory Therapist", "Medical Radiologic Technologist", "Registered Medical Laboratory Technologist", "Medical Laboratory Technologist", "Medical Device Reprocessing Technician", "Medical Office Assistant"];	
		
		this.init();
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Slide-Specific Actions ------------------------------- */
	
	loadImages()
	{	
		this.totalImages = 5;
		this.loadBackgroundImage("bg10");
		
		super.loadImages();
	}
	
	reset()
	{
		super.reset();
		
		this.removeSubmitButton();
	}
		
	setup()
	{	
		//Add draggers and targets
		this.addTargets();
		this.addDraggers();
		this.positionDraggers();
		this.setupDraggers();
		this.addSubmitButton();
		
		//Add dialog
		this.addDialog("", "Instructions", this.colourDefault, this.txt, "Start");	
		
		super.setup();	
	}
	
	addTargets()
	{		
		let pos = {x:this.posTable.x, y:this.posTable.y + 30};
		let vPadding = this.dHeight;
		this.target1 = new Target(pos, this.tWidth, this.tHeight);
		this.target2 = new Target({x:pos.x,y:pos.y + vPadding}, this.tWidth, this.tHeight);
		this.target3 = new Target({x:pos.x,y:pos.y + (vPadding * 2)}, this.tWidth, this.tHeight);
		this.target4 = new Target({x:pos.x,y:pos.y + (vPadding * 3)}, this.tWidth, this.tHeight);
		pos = {x:pos.x + this.widthTable/2, y:pos.y};
		this.target5 = new Target(pos, this.tWidth, this.tHeight);
		this.target6 = new Target({x:pos.x,y:pos.y + vPadding}, this.tWidth, this.tHeight);
		this.target7 = new Target({x:pos.x,y:pos.y + (vPadding * 2)}, this.tWidth, this.tHeight);
		this.target8 = new Target({x:pos.x,y:pos.y + (vPadding * 3)}, this.tWidth, this.tHeight);
		this.targets = [this.target1, this.target2, this.target3, this.target4, this.target5, this.target6, this.target7, this.target8];		
		this.setTargetBordersToVisible(true);	
	}
	
	addDraggers()
	{
		this.dragger1 = new DraggerText("MLA", this.dWidth, this.dHeight, "Medical Lab Assistant (MLA): Performs \nphlebotomy for analysis.", [this.target1, this.target2, this.target3, this.target4]);	
		this.dragger2 = new DraggerText("DMS", this.dWidth, this.dHeight,  "Diagnostic Medical Sonographer (DMS): \nThe subspecialty of cardiac sonography. \nThey capture images to observe function.", [this.target1, this.target2, this.target3, this.target4]);	
		this.dragger3 = new DraggerText("RRT", this.dWidth, this.dHeight,  "Registered Respiratory Therapist (RRT): \nPerforms pulmonary function testing.", [this.target1, this.target2, this.target3, this.target4]);		
		this.dragger4 = new DraggerText("MRT", this.dWidth, this.dHeight,  "Medical Radiation Technician (MRT): \nPerforms x-rays to identify issues.", [this.target1, this.target2, this.target3, this.target4]);
		this.dragger5 = new DraggerText("MLT", this.dWidth, this.dHeight,  "Medical Lab Technologist (MLT): Cross \nmatches blood and runs blood analysis.", [this.target5, this.target6, this.target7, this.target8]);		
		this.dragger6 = new DraggerText("MDRT", this.dWidth, this.dHeight,  "Medical Device Reprocessing Technician \n(MDRT): Sterilizes and prepares surgical \nequipment for the Operating Room (OR).", [this.target5, this.target6, this.target7, this.target8]);		
		this.dragger7 = new DraggerText("MOA", this.dWidth, this.dHeight,  "Medical Office Assistant (MOA): Books \nthe OR suite and coordinates and \ncommunicates with the team.", [this.target5, this.target6, this.target7, this.target8]);		
		this.dragger8 = new DraggerText("House Keeping", this.dWidth, this.dHeight,  "House Keeping: Ensures OR suite and \nlinens and garments are clean and ready \nfor use.", [this.target5, this.target6, this.target7, this.target8]);					
		this.draggers = [this.dragger1, this.dragger2, this.dragger3, this.dragger4, this.dragger5, this.dragger6, this.dragger7, this.dragger8];
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
			if (i == 5)
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
		//Draw rectangle to fade background
		canvasMidground.saveState();
		canvasMidground.setAlpha(0.6);
		canvasMidground.drawRectangle({x:this.pos.x, y:this.pos.y}, 860, 535, "#ffffff", "", "");
		canvasMidground.restoreState();
		
		this.drawTargetTable();		
		
		super.draw(); 				
	}
	
	drawTargetTable()
	{
		let pos = this.posTable;
		let width = this.widthTable;
		let height = this.heightTable;
		
		//Draw rectangles
		canvasMidground.drawRectangle(pos, width, height, "#000000", this.borderColor, this.borderWidth);
		pos = {x:pos.x, y:pos.y + this.tHeadingHeight};
		canvasMidground.drawRectangle(pos, width, height - + this.tHeadingHeight, "#dddddd", "", "");
		
		//Draw column labels
		pos = {x:pos.x + width/4, y:this.posTable.y + 16};
		canvasMidground.drawText("DIRECT", pos, this.txtStyleHeading, this.txtColour, this.txtAlign);
		pos = {x:pos.x + (width/2), y:pos.y};
		canvasMidground.drawText("INDIRECT", pos, this.txtStyleHeading, this.txtColour, this.txtAlign);
		
		//Draw dividers	
		pos = {x:this.posTable.x + (width/2), y:this.posTable.y};
		canvasMidground.drawLine(pos, {x:pos.x, y:pos.y + height}, this.borderColor, this.borderWidth/2);
	}
}