class Slide11 extends DragDropSlide
{
	constructor() 
	{	
		super();
		
		//General
		this.slideType = this.slideTypeDragDrop;
		this.txtSectionHeading = "Urgent Care Centre";
		this.txt = "Drag then drop the ECG Leads, the IV bag, the Nasal Cannula, and the Blood Collection images on the right to their proper \nplacement locations.\n\nIf you drop the image on the correct area of George's body, it will automatically attach to him. If you drop it on the wrong \nlocation, it will return to its original position.";
		this.txtHeadingComplete = "Drag and Drop Complete"
		this.txtComplete = "You have correctly attached all of the medical equipment. Click the Next button to proceed.";
		
		//Dragger Area
		this.posDraggerArea = {x: 635, y: 325};
		this.widthDraggerArea = 240;
		this.heightDraggerArea = 240;
		
		//Dropped Equipment
		this.posECG = {x: 333, y: 417};
		this.posIV = {x: 410.5, y: 286};
		this.posNC = {x:319, y:340};
		this.posVAC = {x: 277, y:418};
		this.ecgIsVisible;
		this.ivIsVisible;
		this.ncIsVisible;
		this.vacIsVisible;
				
		//Glossary
		this.curTerms = [];		
		
		this.init();
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Slide-Specific Actions ------------------------------- */
	
	loadImages()
	{	
		this.totalImages = 17;
		this.loadBackgroundImage("bg7");
		
		//Draggers
		this.loadDraggerImages("ECG");
		this.loadDraggerImages("IV");
		this.loadDraggerImages("NC");
		this.loadDraggerImages("VAC");
		
		//Dropped images			
		this.imgDroppedECG = new Image();
		this.imgDroppedECG.src = "img/other/equip_ECG.png"; 
		this.imgDroppedECG.onload = () => { this.onImageLoaded(); }
		this.imgDroppedIV = new Image();
		this.imgDroppedIV.src = "img/other/equip_IV.png"; 
		this.imgDroppedIV.onload = () => { this.onImageLoaded(); }
		this.imgDroppedNC = new Image();
		this.imgDroppedNC.src = "img/other/equip_NC.png"; 
		this.imgDroppedNC.onload = () => { this.onImageLoaded(); }
		this.imgDroppedVAC = new Image();
		this.imgDroppedVAC.src = "img/other/equip_VAC.png"; 
		this.imgDroppedVAC.onload = () => { this.onImageLoaded(); }
		
		super.loadImages();
	}	
		
	setup()
	{		
		//Add targets
		let tWidth = 70;
		let tHeight = 100;
		this.target1 = new Target({x:245,y:365}, tWidth, tHeight);
		this.target2 = new Target({x:315,y:280}, tWidth, tHeight);
		this.target3 = new Target({x:315,y:325}, tWidth, tHeight + 20);
		this.target4 = new Target({x:450,y:210}, tWidth, tHeight);
		this.target5 = new Target({x:400,y:370}, tWidth, tHeight);
		this.targets = [this.target1, this.target2, this.target3, this.target4, this.target5];
		
		//Add draggers
		this.dragger1 = new DraggerImage("ECG", this.imgDraggerECGInactive, this.imgDraggerECGActive, [this.target3]);	
		this.dragger2 = new DraggerImage("IV", this.imgDraggerIVInactive, this.imgDraggerIVActive, [this.target4, this.target5]);		
		this.dragger3 = new DraggerImage("NC", this.imgDraggerNCInactive, this.imgDraggerNCActive, [this.target2]);		
		this.dragger4 = new DraggerImage("VAC", this.imgDraggerVACInactive, this.imgDraggerVACActive, [this.target1]);				
		this.draggers = [this.dragger1, this.dragger2, this.dragger3, this.dragger4];
			
		//Position draggers
		let pos = {x:this.posDraggerArea.x + 30, y:this.posDraggerArea.y + 30};
		this.draggers = main.shuffle(this.draggers); //Randomize dragger order		
		for (let i = 0; i < this.draggers.length; i++) 
		{	
			this.draggers[i].setDefaultPosition(pos);
			
			//Update position for next dragger
			if (i == 1)
			{
				pos = {x:pos.x + 100, y:pos.y - 100};
			}
			else
			{
				pos = {x:pos.x, y:pos.y + 100};
			}
		}
		
		//Prep equipment
		this.ecgIsVisible = false;
		this.ivIsVisible = false;
		this.ncIsVisible = false;
		this.vacIsVisible = false;
		
		//Add dialog
		this.addDialog("", "Instructions", this.colourDefault, this.txt, "Start");	
		
		this.setCompletionStatus(true); //This slide is optional so set it to complete.
		super.setup();	
	}
	
	updateStatus(equipment)
	{
		//Set equipment to visible
		let id = equipment.getID();
		switch (id)
		{
			case "ECG": this.ecgIsVisible = true; break;
			case "IV": this.ivIsVisible = true; break;
			case "NC": this.ncIsVisible = true; break;
			case "VAC": this.vacIsVisible = true; break;
		}
		
		//Set completion status
		if ((this.ecgIsVisible) && (this.ivIsVisible) &&
			(this.ncIsVisible) && (this.vacIsVisible))
		{
			this.setCompletionStatus(true);
			this.addDialog("", this.txtHeadingComplete, this.colourDefault, this.txtComplete, "");
		}
	}
		
	
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	draw()
	{
		this.drawDraggerAreaBackground();
		this.drawDroppedEquipment();
		
		super.draw(); 				
	}
	
	drawDraggerAreaBackground()
	{		
		let pos = this.posDraggerArea;
		let width = this.widthDraggerArea;
		let height = this.heightDraggerArea;
		let borderColor = "#000000";
		let borderWidth = "2";
		
		//Draw rectangle
		canvasMidground.saveState();
		canvasMidground.setAlpha(0.9);
		canvasMidground.drawRectangle(pos, width, height, "#ffffff", "", "");
		canvasMidground.restoreState();
		
		//Draw border
		canvasMidground.drawDashedLine(pos, {x:pos.x + width, y:pos.y}, 12, 7, borderColor, borderWidth);
		canvasMidground.drawDashedLine({x:pos.x + width, y:pos.y}, {x:pos.x + width, y:pos.y + height}, 12, 7, borderColor, borderWidth);
		canvasMidground.drawDashedLine({x:pos.x + width, y:pos.y + height}, {x:pos.x, y:pos.y + height}, 12, 7, borderColor, borderWidth);
		canvasMidground.drawDashedLine({x:pos.x, y:pos.y + height}, pos, 12, 7, borderColor, borderWidth);
	}
	
	drawDroppedEquipment()
	{
		if (this.ecgIsVisible)	canvasMidground.drawImage(this.imgDroppedECG, this.posECG);
		if (this.ivIsVisible)	canvasMidground.drawImage(this.imgDroppedIV, this.posIV);
		if (this.ncIsVisible)	canvasMidground.drawImage(this.imgDroppedNC, this.posNC);
		if (this.vacIsVisible)	canvasMidground.drawImage(this.imgDroppedVAC, this.posVAC);		
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Dragging and Dropping -------------------------------- */
		
	onDragEnd(dragger)
	{		
		dragger.onMouseUp();
		
		//Drop or reset target
		let dropTarget = this.checkIfDraggerIsOverTarget(dragger);
		if ((dropTarget) &&
			(dragger.isTargetACorrectTarget(dropTarget)))
		{		
			dragger.dropOn(dropTarget);			
			dragger.setToEnabled(false);
			dragger.setToVisible(false);
			dropTarget.setToOccupied(dragger);
			
			this.updateStatus(dragger);
		}
		else
		{
			dragger.reset();
		}	
	}
}