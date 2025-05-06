class Slide
{
	constructor() 
	{	
		//General
		this.pos = {x:70, y:61};
		this.slideType;
		this.slideTypeInfo = "info";
		this.slideTypeQuestion = "question";
		this.slideTypeDragDrop = "dragDrop";
		this.imagesLoaded;
		this.imgBG;		
		
		//Question Slides
		this.curQuestion;
		this.selectionType;
		this.selectionTypeSingle = "single";
		this.selectionTypeMultiple = "multiple";
		this.answerType;
		this.answerTypeIcons = "icons";
		this.answerTypeText = "text";
		this.submissionType;
		this.submissionTypeUnlimited = "unlimited";
		this.submissionTypeSingle = "single"
		this.slideComplete;
		
		//Dialog	
		this.dialog;
		this.posDialog = {x:this.pos.x + 27, y:this.pos.y + 40};
		this.dialogWidth = 810;	
		this.colourDefault = "#ffffff";
		this.colourPatient = "#04a8c8";
		this.colourDA = "#9fd1b2";
		this.colourMLT = "#8cb100";
		this.colourMOA = "#cdbcd6";
		this.colourMRT = "#b24f53";
		this.colourOPT = "#e67962";
		this.colourPCPACPb = "#ac6759";
		this.colourRN = "#e6775d";
		this.colourRNb = "#b5c5cc";
		this.colourRRT = "#64c383";
		this.colourUrgent = "#ff4a47";
		this.colourCorrect = "#23b643";
		this.colourIncorrect = "#e8737b";
		this.imgCheckSmall;
		this.imgXSmall;
		
		//Icons		
		this.patientID = "Patient"
		this.patientName = "George";
		this.imgCheck;
		this.imgX;
		
		//Animation
		this.animationInProgress;
		
		//Tracking
		this.curInteractableItems;
		this.curDialogInteractableItems;
		this.curEnvironmentInteractableItems;
		this.itemsThatNeedToBeInteractedWith;
		this.itemsThatHaveBeenInteractedWith;
		this.itemsThatAreCurrentlySelected;
		
		//Glossary
		this.curTerms;
	}
	
	/* ------------------------------------------------------------ */
	/* ----- General Setup ---------------------------------------- */
	
	init()	
	{
		this.imagesLoaded = 0;
		this.totalImages = 0;
		this.loadImages();		
	}	
	
	getSlideType()
	{
		return this.slideType;
	}
	
	getCompletionStatus()
	{
		return this.slideComplete;
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Images ----------------------------------------------- */
		
	loadImages() 
	{
		//this.totalImages += 4;
		
		this.imgCheck = new Image();
		this.imgCheck.src = "img/feedback/check.png"; 
		this.imgCheck.onload = () => { this.onImageLoaded(); }
		this.imgCheckSmall = new Image();
		this.imgCheckSmall.src = "img/feedback/check_small.png"; 
		this.imgCheckSmall.onload = () => { this.onImageLoaded(); }
		this.imgX = new Image();
		this.imgX.src = "img/feedback/x.png"; 
		this.imgX.onload = () => { this.onImageLoaded(); }
		this.imgXSmall = new Image();
		this.imgXSmall.src = "img/feedback/x_small.png"; 
		this.imgXSmall.onload = () => { this.onImageLoaded(); }
	}		
	
	onImageLoaded()
	{
		this.imagesLoaded++;
		if (this.imagesLoaded >= this.totalImages)
		{
			main.onSlideLoaded();
		}
	}	
	
	loadBackgroundImage(id)
	{
		this.imgBG = new Image();
		this.imgBG.src = "img/backgrounds/"+id+".png"; 
		this.imgBG.onload = () => { this.onImageLoaded(); }
	}
		
	loadDialogIconImage(id, folder)
	{		
		if (folder == null) folder = id;
		
		this["imgDialog"+id] = new Image();		
		this["imgDialog"+id].src = "img/icons/"+folder+"/dialog_"+id+".png";
		this["imgDialog"+id].onload = () => { this.onImageLoaded(); }
	}
	
	loadOptionIconImage(id, folder)
	{		
		if (folder == null) folder = id;
				
		//Load inactive state img
		this["imgOption"+id+"Inactive"] = new Image();		
		this["imgOption"+id+"Inactive"].src = "img/icons/"+folder+"/label_"+id+"_inactive.png";
		this["imgOption"+id+"Inactive"].onload = () => { this.onImageLoaded(); }
		
		//Load active state img
		this["imgOption"+id+"Active"] = new Image();		
		this["imgOption"+id+"Active"].src = "img/icons/"+folder+"/label_"+id+"_active.png";
		this["imgOption"+id+"Active"].onload = () => { this.onImageLoaded(); }
	}
	
	loadEnvironmentIconImages(id, folder)
	{		
		if (folder == null) folder = id;
		//Load inactive state img
		this["imgEnviro"+id+"Inactive"] = new Image();		
		this["imgEnviro"+id+"Inactive"].src = "img/icons/"+folder+"/enviro_"+id+"_inactive.png";
		this["imgEnviro"+id+"Inactive"].onload = () => { this.onImageLoaded(); }
		
		//Load active state img
		this["imgEnviro"+id+"Active"] = new Image();		
		this["imgEnviro"+id+"Active"].src = "img/icons/"+folder+"/enviro_"+id+"_active.png";
		this["imgEnviro"+id+"Active"].onload = () => { this.onImageLoaded(); }
	}
	
		
	/* ------------------------------------------------------------ */
	/* ----- Slide Setup ------------------------------------------ */
	
	reset() 
	{
		this.dialog = null;
		this.curInteractableItems = [];
		this.curDialogInteractableItems = [];
		this.curEnvironmentInteractableItems = [];
		this.itemsThatNeedToBeInteractedWith = [];
		this.itemsThatHaveBeenInteractedWith = [];
		this.itemsThatAreCurrentlySelected = [];
		this.curQuestion = "";
		
		//Set completion status
		if (this.slideType == this.slideTypeInfo)
		{
			this.setCompletionStatus(true);
		}
		else
		{
			this.setCompletionStatus(false);
		}
	}	
	
	setup()	
	{	
		this.setSectionHeading(this.txtSectionHeading);
	}
	
	setSectionHeading(txtHeading)
	{		
		main.setSectionHeading(txtHeading);
	}	
	
	wrapup()
	{
		this.stopAnimation();
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Slide Navigation ------------------------------------- */
	
	onInteractableClicked(interactable)
	{			
		let intID = interactable.getID();
		//console.log("clicked:", intID); //Fot testing only
		
		if (intID.includes("btn"))
		{
			this.addToItemsThatHaveBeenInteractedWith(interactable);
			switch (intID)
			{
				case "btnContinue": 	
				case "btnStart": 		this.onContinue(); break;
				
				case "btnReturn": 		
				case "btnTryAgain": 	this.onReturn(); break;
				
				case "btnSubmit": 		this.onSubmit(); break;
			}
		} 
		else if ((intID.includes("icon_Answer")) || (intID.includes("txtAnswer")))
		{
			this.onAnswerSelected(interactable);
		}
		else if (intID.includes("icon_Question"))
		{
			this.addToItemsThatHaveBeenInteractedWith(interactable);
			this.onQuestionIconClicked(interactable);
		}
		else if (intID.includes("icon"))
		{	
			this.addToItemsThatHaveBeenInteractedWith(interactable);
			this.onIconClicked(interactable);
			interactable.setToHasBeenClicked(true);
		}			
	}
	
	onContinue()
	{
		this.clearDialog();
		this.setInteractablesAsActive(true);
	}
	
	onReturn()
	{
		this.onContinue();
		
		if (this.slideType == this.slideTypeQuestion)
		{
			this.addQuestionDialog("", this.txtHeading, this.colourDefault, this.txtQuestion);
		}
	}
	
	onSubmit()
	{	
		if (this.slideType == this.slideTypeDragDrop)
		{
			this.evaluate();
		}
		else
		{
			if (this.answerType == this.answerTypeIcons)
			{
				this.evaluateIconQuestion();
			}
			else
			{
				this.evaluateTextQuestion();		
			}
		}		
	}
	
	onIconClicked(icon)
	{			
		let id = icon.getProperID();
		let name = icon.getName(); 
		let headingColour = this["colour"+id];
		let img = this["imgDialog"+id];
		if (img == null) img = this["imgOption"+id+"Inactive"];
		let txt = this["txt"+id];
						
		//Display dialog
		this.addDialog(img, name, headingColour, txt, "Return");
	}
	
	onQuestionIconClicked(icon)
	{			
		this.removeFromInteractables(icon);	
		
		//Display dialog
		this.addQuestionDialog("", this.txtHeading, this.colourDefault, this.txtQuestion);
	}
	
	onAnswerSelected(ans)
	{	
		//Toggle selected state of target answer and deselect all other answers
		if (this.selectionType == this.selectionTypeSingle)
		{
			this.deselectAllOtherInteractables(ans); //Deselect other interactables
			this.itemsThatAreCurrentlySelected = []; //Reset selected answers
		}
		ans.toggleSelectedState();
		
		//Update selected interactables
		if (ans.isItSelected()) 
		{
			this.addtoInteractablesThatAreCurrentlySelected(ans);
		}
		else
		{
			this.removeFromInteractablesThatAreCurrentlySelected(ans);
		}
		
		//If an answer has been selected, make the submit button available
		if (this.itemsThatAreCurrentlySelected.length > 0)
		{
			this.dialog.setToEnabled(true);
		}
		else
		{
			this.dialog.setToEnabled(false);
		}
		
		//Clear feedback
		this.dialog.clearFeedback();
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Progression ------------------------------------------ */
	
	isProgressionCriteriaSatisfied()
	{		
		if (this.slideType == this.slideTypeInfo) //Information slides
		{
			//Check that all items that NEED to be interacted with HAVE been interacted with
			if (this.itemsThatNeedToBeInteractedWith.length == 0) 
			{
				if (this.slideComplete)return true;
			}
			else
			{
				let allItemsMatched = true;
				for (let i=0; i < this.itemsThatNeedToBeInteractedWith.length; i++)
				{
					let matchFound = false;
					for (let j=0; j < this.itemsThatHaveBeenInteractedWith.length; j++)
					{
						if (this.itemsThatNeedToBeInteractedWith[i].getID() == this.itemsThatHaveBeenInteractedWith[j].getID())
						{
							matchFound = true;
						}
					}
					if (!matchFound) allItemsMatched = false;			
				}
				
				if (allItemsMatched) return true;
			}
		}
		else
		{
			//Check if the slide has been completed
			if (this.slideComplete) return true;
		}
		return false;
	}	
	
	addToItemsThatHaveBeenInteractedWith(interactable)
	{
		let alreadyInteractedWith = this.hasItemAlreadyBeenInteractedWith(interactable);
		if (!alreadyInteractedWith) this.itemsThatHaveBeenInteractedWith.push(interactable);	
	}
	
	hasItemAlreadyBeenInteractedWith(interactable)
	{
		let alreadyInteractedWith = false;
		for (let i=0; i < this.itemsThatHaveBeenInteractedWith.length; i++)
		{
			if (this.itemsThatHaveBeenInteractedWith[i].getID() == interactable.getID()) 
			{
				alreadyInteractedWith = true;
			}
		}
		return alreadyInteractedWith;	
	}
	
	addToItemsThatNeedToBeInteractedWith(interactable)
	{
		let alreadyAdded = false;
		for (let i=0; i < this.itemsThatNeedToBeInteractedWith.length; i++)
		{
			if (this.itemsThatNeedToBeInteractedWith[i].getID() == interactable.getID()) alreadyAdded = true;
		}
		if (!alreadyAdded) this.itemsThatNeedToBeInteractedWith.push(interactable);
	}
	
	addtoInteractablesThatAreCurrentlySelected(interactable)
	{
		let alreadySelected = this.isItemCurrentlySelected(interactable);
		if (!alreadySelected) this.itemsThatAreCurrentlySelected.push(interactable);
	}
	
	isItemCurrentlySelected(interactable)
	{
		let currentlySelected = false;
		for (let i=0; i < this.itemsThatAreCurrentlySelected.length; i++)
		{
			if (this.itemsThatAreCurrentlySelected[i].getID() == interactable.getID()) 
			{
				currentlySelected = true;
			}
		}
		return currentlySelected;	
	}
	
	removeFromInteractablesThatAreCurrentlySelected(interactable)
	{
		const indexOfInteractable = this.itemsThatAreCurrentlySelected.indexOf(interactable);
		if (indexOfInteractable > -1) 
		{ 
			this.itemsThatAreCurrentlySelected.splice(indexOfInteractable, 1); 
		}
	}
	
	clearSelectedItems()
	{
		this.itemsThatAreCurrentlySelected = [];
	}
		
	setCompletionStatus(isComplete)
	{		
		this.slideComplete = isComplete;
	}
	
		
	/* ------------------------------------------------------------ */
	/* ----- Dialogs ---------------------------------------------- */
	
	addDialog(iconImg, txtHeading, headingColour, txt, btnType)
	{	
		this.dialog = new Dialog(this.posDialog, this.dialogWidth, iconImg, txtHeading, headingColour, txt, btnType);
		this.setupDialog();
	}	
	
	addQuestionDialog(iconImg, txtHeading, headingColour, txt)
	{	
		this.dialog = new QuestionDialog(this.posDialog, this.dialogWidth, this.selectionType, iconImg, txtHeading, headingColour, txt, "Submit");
		this.setupDialog();
		
		//Add answers icons or text
		if (this.answerType == this.answerTypeIcons)
		{	
			this.dialog.addSpaceForIconRow();	
			this.addAnswerIcons();	
		}
		else if (this.answerType == this.answerTypeText)
		{
			this.dialog.addSpaceForTextAnswers(this.possibleAnswers.length);
			this.addSelectableTextAnswers();
			this.dialog.addSpaceForFeedback();
		}
	}	
	
	addFeedbackDialog(imgIcon, txtHeading, headingColour, txt, btnType)
	{		
		this.dialog = new FeedbackDialog(this.posDialog, this.dialogWidth, imgIcon, txtHeading, headingColour, txt, btnType);
		this.dialog.offsetMainIcon();
		this.dialog.setFeedbackImages(this.imgCheckSmall, this.imgXSmall);
		this.setupDialog();	
	}
	
	setupDialog()
	{
		this.setDialogAsActive(true);
		
		//Add dialog button to interactables
		let btn = this.dialog.getButton(1); 
		if (btn) this.addToInteractableItems(btn);
		let btn2 = this.dialog.getButton(2);
		if (btn2) this.addToInteractableItems(btn2); 
	}
	
	addDialogButton(btnType)
	{
		this.dialog.addButton(btnType);
		this.setupDialog();
	}
	
	removeDialogButtons()
	{
		//Remove dialog button to interactables
		let btn = this.dialog.getButton(1); 
		if (btn) this.removeFromInteractables(btn);
		let btn2 = this.dialog.getButton(2);
		if (btn2) this.removeFromInteractables(btn2); 
		
		this.dialog.removeButton();
	}
	
	clearDialog()
	{
		if (!this.dialog) return;
		
		this.removeDialogButtons();		
		this.dialog = null;
		
		//this.setInteractablesAsActive(true);	
	}
	
	setDialogAsActive(bln)
	{
		if (bln) this.setInteractablesAsActive(false);
		if (this.dialog)  this.dialog.setToEnabled(bln);
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Interactables ---------------------------------------- */
	
	addToInteractableItems(interactable)
	{
		let alreadyAdded = false;
		for (let i=0; i < this.curInteractableItems.length; i++)
		{
			if (this.curInteractableItems[i].getID() == interactable.getID()) alreadyAdded = true;
		}
		if (!alreadyAdded) this.curInteractableItems.push(interactable);
	}
	
	getInteractableItems()
	{
		return this.curInteractableItems;
	}
	
	removeFromInteractables(interactable)
	{
		const indexOfInteractable = this.curInteractableItems.indexOf(interactable);
		if (indexOfInteractable > -1) 
		{ 
			this.curInteractableItems.splice(indexOfInteractable, 1); 
			
		}
		
		//Remove from other interactable lists, if neccessary
		this.removeFromDialogInteractables(interactable);
		this.removeFromEnvironmentInteractables(interactable);
	}
	
	removeAllInteractables()
	{
		for (let i = this.curInteractableItems.length - 1; i >= 0; i--)
		{
			this.removeFromInteractables(this.curInteractableItems[i]);			
		}	
	}
	
	deselectAllOtherInteractables(interactable)
	{
		for (let i=0; i < this.curInteractableItems.length; i++)
		{
			if (this.curInteractableItems[i].id.includes("Answer"))
			{
				if (this.curInteractableItems[i] != interactable)
				{
					this.curInteractableItems[i].setToSelected(false);
				}
			}
		}
	}
	
	setInteractablesAsActive(bln)
	{	
		for (let i=0; i < this.curInteractableItems.length; i++)
		{
			this.curInteractableItems[i].setToEnabled(bln);
		}
		if (bln) this.setDialogAsActive(false);
	}
	
	addToDialogInteractableItems(interactable)
	{
		let alreadyAdded = false;
		for (let i=0; i < this.curDialogInteractableItems.length; i++)
		{
			if (this.curDialogInteractableItems[i].getID() == interactable.getID()) alreadyAdded = true;
		}
		if (!alreadyAdded) this.curDialogInteractableItems.push(interactable);
	}
	
	removeFromDialogInteractables(interactable)
	{
		const indexOfInteractable = this.curDialogInteractableItems.indexOf(interactable);
		if (indexOfInteractable > -1) 
		{ 
			this.curDialogInteractableItems.splice(indexOfInteractable, 1); 
		}
	}
	
	removeAllDialogInteractables()
	{	
		for (let i = this.curDialogInteractableItems.length - 1; i >= 0; i--)
		{
			this.removeFromInteractables(this.curDialogInteractableItems[i]);				//this.removeFromDialogInteractables(this.curDialogInteractableItems[i]);		
		}
	}
	
	addToEnvironmentInteractableItems(interactable)
	{
		let alreadyAdded = false;
		for (let i=0; i < this.curEnvironmentInteractableItems.length; i++)
		{
			if (this.curEnvironmentInteractableItems[i].getID() == interactable.getID()) alreadyAdded = true;
		}
		if (!alreadyAdded) this.curEnvironmentInteractableItems.push(interactable);
	}
	
	setEnvironmentInteractablesAsActive(bln)
	{	
		for (let i=0; i < this.curEnvironmentInteractableItems.length; i++)
		{
			this.curEnvironmentInteractableItems[i].setToEnabled(bln);
		}
	}	
	
	removeFromEnvironmentInteractables(interactable)
	{
		const indexOfInteractable = this.curEnvironmentInteractableItems.indexOf(interactable);
		if (indexOfInteractable > -1) 
		{ 
			this.curEnvironmentInteractableItems.splice(indexOfInteractable, 1); 
		}
	}
			
	
	/* ------------------------------------------------------------ */
	/* ----- Selectable Icons ------------------------------------- */
				
	addDialogIcon(id, name, pos, img)
	{
		let icon = new Icon(id, name, pos, img);	
		this.setupIcon(icon);		
		return icon;
	}	
	
	addOptionDialogIcon(id, name, pos, img)
	{
		let icon = new ClickableIcon(id, name, pos, img);	
		this.setupIcon(icon);
		icon.setFeedbackImages(this.imgCheck, this.imgX);
		this.addToDialogInteractableItems(icon);		
		return icon;
	}
	
	addEnvironmentIcon(id, name, pos, imgInactive, imgActive)
	{
		let icon = new EnvironmentIcon(id, name, pos, imgInactive, imgActive);	
		this.setupIcon(icon);
		icon.setFeedbackImages(this.imgCheck, this.imgX);
		this.addToEnvironmentInteractableItems(icon);		
		return icon;
	}
		
	addAnswerIcons()
	{	
		let numAnswers = this["possibleAnswers"+this.curQuestion].length;		
		let pos = this.dialog.getIconRowPos();		
		for (let i = 1; i <= numAnswers; i++)
		{	
			//Set answer text
			let answer = this["answer"+i]; 
			if (this.curQuestion) answer = this["answer"+i+this.curQuestion];
			
			//Set icon's images
			let imgInactive = this["imgOption"+answer+"Inactive"];
			let imgActive = this["imgOption"+answer+"Active"];
	
			//Add icon
			if (i == 1) 
			{
				pos = {x:pos.x - (imgInactive.width * numAnswers/2), y:pos.y};
			}
			let icon = this.addAnswerIcon(i, pos, imgInactive, imgActive);		
		
			//Update position for next answer
			pos = {x:pos.x + imgInactive.width, y:pos.y}; 
		}
		this.setInteractablesAsActive(true);
	}
	
	addAnswerIcon(num, pos, imgInactive, imgActive)
	{			
		//Add icon
		let name = this["answer"+num];
		let icon = new AnswerIcon("Answer"+num, name, pos, imgInactive, imgActive);		
		this.setupIcon(icon);
		icon.setFeedbackImages(this.imgCheck, this.imgX);
		this.addToDialogInteractableItems(icon);
		
		//If answer has already been selected, set it to selected
		let alreadySelected = this.hasItemAlreadyBeenInteractedWith(icon); 
		if (alreadySelected) icon.setToHasBeenClicked(true);
		
		//If answer is correct, set it to correct
		let isCorrect = this.checkIfAnswerIsCorrect(icon); 
		if (isCorrect) icon.setToCorrect(true);
		
		return icon;
	}
		
	setupIcon(icon)
	{
		this.addToInteractableItems(icon); 
		this.setInteractablesAsActive(true);
		
		//If answer has already been selected, set icon to selected
		let alreadySelected = this.hasItemAlreadyBeenInteractedWith(icon);
		if (alreadySelected) icon.setToHasBeenClicked(true);	
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Selectable Text -------------------------------------- */
			
	addSelectableTextAnswers()
	{
		let numAnswers = this.possibleAnswers.length;
		let pos = this.dialog.getAnswerTextPos(numAnswers);
		for (let i = 1; i <= numAnswers; i++)
		{	
			//Add selectable text
			let txtSelectable = this.addSelectableTextAnswer("txtAnswer"+i, this["answer"+i], pos);				
			//Update position for next answer
			pos = {x:pos.x, y:pos.y + 30};
		}		
	}	
	
	addSelectableTextAnswer(id, txt, pos)
	{	
		let txtSelectable = new SelectableText(canvasDialog, id, txt, pos);			
		this.addToInteractableItems(txtSelectable); 
		this.setInteractablesAsActive(true);
		
		//If answer is correct, set it to correct
		let isCorrect = this.checkIfAnswerIsCorrect(txtSelectable);
		if (isCorrect) txtSelectable.setToIsACorrectAnswer(true);
	}
	
	updateSelectableTextAnswers()
	{
		for (let i = 0; i < this.curInteractableItems.length; i++)
		{			
			if (this.curInteractableItems[i].getID().includes("Answer"))
			{
				let txtSelectable = this.curInteractableItems[i];
				let currentlySelected = this.isItemCurrentlySelected(txtSelectable); 
				if (currentlySelected)
				{
					let isCorrect = this.curInteractableItems[i].isItACorrectAnswer();
					txtSelectable.displayFeedback(isCorrect);
				}
				else
				{
					if (this.curInteractableItems[i].isItACorrectAnswer())
					{
						txtSelectable.displayFeedback(false);
					}
				}
			}
		}
	}
		
	
	/* ------------------------------------------------------------ */
	/* ----- Animation ---------------------------=---------------- */
	
	startAnimation()
	{
		this.intervalAnimation = setInterval(this.updateAnimation, this.intervalFrequency);
		this.animationInProgress = true;
	}
	
	stopAnimation()
	{
		clearInterval(this.intervalAnimation);
		this.animationInProgress = false;
		main.update();
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Glossary --------------------------------------------- */
	
	getGlossaryTerms()
	{
		return this.curTerms;
	}
	
		
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	draw()
	{			
		if (this.dialog) this.dialog.draw();
		
		//Draw interactable items
		for (let i=0; i < this.curInteractableItems.length; i++)
		{
			this.curInteractableItems[i].draw();
		}	
	}
	
	drawBackground()
	{
		if (this.imgBG)
		{
			canvasBackground.drawImage(this.imgBG, this.pos); 
		}
	}
	
	drawImage(canvas, img, pos)
	{
		canvas.drawImage(img, pos);
	}
}