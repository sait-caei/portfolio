class DragDropSlide extends Slide
{
	constructor() 
	{	
		super();
	
		//General
		this.slideType = this.slideTypeDragDrop;	
		this.txtHeadingCorrect = "Drag and Drop Complete"
		this.txtCorrect = "<b>That's correct!<bend> You have dropped all the draggers in the correct locations. Click the Next button to proceed to the next step. ";
		this.txtHeadingIncorrect = "Incorrect Combination"
		this.txtIncorrect = "<b>That's incorrect.<bend> One or more of the draggers was not dropped in the correct location. All incorrectly placed draggers have \nbeen reset to their original positions. Try again!";

		//Draggers and Targets
		this.targets;
		this.draggers;

		//Submit Button
		this.btnSubmit;
		this.posBtn;
		this.btnWidth = 65;
		this.btnHeight = 12;
		this.btnPaddingH = 30;
		this.hasSubmitButton = false;
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Slide-Specific Actions ------------------------------- */
	
	reset() 
	{
		super.reset();
		
		this.targets = [];
		this.draggers = [];
	}
	
	loadDraggerImages(name)
	{		
		//Inactive image
		this["imgDragger"+name+"Inactive"] = new Image();
		this["imgDragger"+name+"Inactive"].src = "img/icons/draggers/dragger_"+name+"_inactive.png"; 
		this["imgDragger"+name+"Inactive"].onload = () => { this.onImageLoaded(); }
		
		//Active image
		this["imgDragger"+name+"Active"] = new Image();
		this["imgDragger"+name+"Active"].src = "img/icons/draggers/dragger_"+name+"_active.png"; 
		this["imgDragger"+name+"Active"].onload = () => { this.onImageLoaded(); }	
	}		
	
	setup()
	{	
		super.setup();
		
		this.setupDraggers();
	}
	
	setupDraggers()
	{		
		if (this.draggers)
		{
			for (let i = 0; i < this.draggers.length; i++) 
			{	
				this.addToInteractableItems(this.draggers[i]);	
			}
		}
	}
	
	setTargetBordersToVisible(bln)
	{		
		for (let i = 0; i < this.targets.length; i++) 
		{	
			this.targets[i].setDashedBorderToVisible(bln);	
		}		
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Button ----------------------------------------------- */
	
	addSubmitButton()
	{			
		this.btn = new Button(canvasMidground, "btnSubmit", "Submit", this.btnWidth, this.btnHeight, this.posBtn);
		this.addToInteractableItems(this.btn);
	}
	
	removeSubmitButton()
	{			
		this.removeFromInteractables(this.btn);
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Question Evaluation ---------------------------------- */
	
	evaluate() 
	{ 
		let allAnswersCorrect = true;
		for (let i = 0; i < this.draggers.length; i++) 
		{
			if (!this.draggers[i].isItOnCorrectTarget())
			{
				allAnswersCorrect = false;
				this.draggers[i].reset();
			}				
		}
		
		if (allAnswersCorrect)
		{
			this.setCompletionStatus(true);
			this.addDialog("", this.txtHeadingCorrect, this.colourDefault, this.txtCorrect, "");
		}
		else
		{
			this.addDialog("", this.txtHeadingIncorrect, this.colourDefault, this.txtIncorrect, "Return");
		}
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	draw()
	{
		super.draw();
		
		if (this.targets)
		{
			for (let i = 0; i < this.targets.length; i++) 
			{	
				this.targets[i].draw();
			}
		}
		
		//Draw all draggers except the current dragger
		if (this.draggers)
		{
			for (let i = 0; i < this.draggers.length; i++) 
			{
				if (this.draggers[i] != main.curDragger)
				{
					this.draggers[i].draw();
				}				
			}
		}
		
		
		//Draw current dragger last so it's on top
		if (main.curDragger) main.curDragger.draw();
	}	
	
	
	
	/* ------------------------------------------------------------ */
	/* ----- Dragging and Dropping -------------------------------- */
			
	onDragStart(dragger, mouseX, mouseY)
	{				
		dragger.onMouseDown(mouseX, mouseY);
	}

	onDrag(dragger, mouseX, mouseY)
	{
		dragger.setDragPosition(mouseX, mouseY);	
	}
		
	onDragEnd(dragger)
	{		
		dragger.onMouseUp();
		
		//Drop or reset target
		let dropTarget = this.checkIfDraggerIsOverTarget(dragger);			
		if (dropTarget)
		{
			dragger.dropOn(dropTarget);
			dropTarget.setToOccupied(dragger);
		}
		else
		{
			dragger.reset();
		}	
	}
	
	checkIfDraggerIsOverTarget(dragger)
	{
		let target;	
		let targets = this.targets;		
		for (let i = 0; i < targets.length; i++) 
		{	
			if (targets[i].isMouseOver(main.mouseX, main.mouseY))
			{
				target = targets[i];
			}
		}
		return target;
	}
}