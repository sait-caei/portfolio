const canvasBackground = new CanvasManager(document.getElementById("canvasBackground"));  
const canvasMidground = new CanvasManager(document.getElementById("canvasMidground"));
const canvasForeground = new CanvasManager(document.getElementById("canvasForeground"));
const canvasInterface = new CanvasManager(document.getElementById("canvasInterface"));
const canvasDialog = new CanvasManager(document.getElementById("canvasDialog")); 
		
class Main 
{
	constructor() 
	{			
		//General 	
		this.divActivity = document.getElementById("activity");				//Div containing activity
		this.divHeader = document.getElementById("activity-header");		//Div containing header	
		this.divContent = document.getElementById("activity-content");		//Div containing main content
		this.sectionHeading = document.getElementById("sectionHeading");	
		this.divCanvas = document.getElementById("canvasGroup");							
		this.activityWidth = 1000;
		this.activityHeight = 668;	
		this.posInterface = {x:0, y:0};	
		
		//Header
		this.sectionTitle;
		this.posSectionTitle = {x:this.posInterface.x + 565, y:this.posInterface.y + 41};
		this.activityTitle = "PATIENT JOURNEY";
		this.posTitle = {x:this.posInterface.x + 700, y:this.posInterface.y + 40};
		this.imgInterface;	
		
		//Slides
		this.totalSlides;
		this.slideNum;
		this.furthestSlideReached;
		this.slideManager;
		this.curSlide;
		this.curInteractableItems;	
			
		//Progress Bar
		this.posProgressBar = {x:this.posInterface.x + 266, y:this.posInterface.y + this.activityHeight - 50};		
		this.widthProgressBar = 400;
		this.heightProgressBar = 30;
		this.colourProgressBar = "#D6EFF8";
		this.posProgressBarTxt = {x:this.posProgressBar.x + this.widthProgressBar - 6, y: this.posProgressBar.y + 16};	
		this.progressBarTxtStyle ="Bold 18px Arial";
			
		//Canvas Buttons 
		this.btnGlossary;
		this.btnPrev;
		this.btnNext;
		this.btnRestart;
		
		//Glossary
		this.glossary;
		this.dialogGlossary;
		this.posGlossary = {x:73, y:63};
		this.glossaryWidth = 855;
		this.glossaryAvailable;
						
		//User Interaction
		this.mouseX;				//Current x position of mouse	
		this.mouseY;				//Current y position of mouse	
		this.curDragger;
	}
	
	/* ------------------------------------------------------------ */
	/* ----- General Setup ---------------------------------------- */
	
	init()	
	{		
		//Load interface image
		this.imgInterface = new Image();
		this.imgInterface.src = "img/backgrounds/interface.png"; 
		this.imgInterface.onload = () => { }
		
		//Setup canvases
		canvasBackground.setSize(this.activityWidth, this.activityHeight);
		canvasMidground.setSize(this.activityWidth, this.activityHeight);
		canvasForeground.setSize(this.activityWidth, this.activityHeight);
		canvasInterface.setSize(this.activityWidth, this.activityHeight);
		canvasDialog.setSize(this.activityWidth, this.activityHeight);
		this.divActivity.style.width = this.activityWidth + 50; //Update the canvases' parent div's width in css
		this.divCanvas.style.height = this.activityHeight; //Update canvases' height in css
												
		//Setup canvas buttons
		let width = 65;
		let height = 12;
		let xMod1 = -279;
		let xMod2 = xMod1 + 110;
		let yMod = -51;
		this.btnGlossary = new Button(canvasInterface, "btnGlossary", "Glossary",  width + 55, height, {x:this.posInterface.x + 69, y: this.activityHeight + yMod});
		this.btnPrev = new Button(canvasInterface, "btnPrev", "◄ Previous",  width, height, {x:this.activityWidth + xMod1, y: this.activityHeight + yMod});	
		this.btnNext = new Button(canvasInterface, "btnNext", "Next ►",  width, height, {x:this.activityWidth + xMod2, y: this.activityHeight + yMod});
		this.btnRestart = new Button(canvasInterface, "btnRestart", "Restart",  width, height, {x:this.activityWidth + xMod2, y: this.activityHeight + yMod});
				
		//Load glossary
		this.glossary = new Glossary();
				
		//Setup slides
		this.slideManager = new SlideManager();
		this.totalSlides = this.slideManager.getNumSlides();
		this.slidesLoaded = 0;	
	}
	
	onSlideLoaded()
	{			
		this.slidesLoaded++; 
		if (this.slidesLoaded >= this.totalSlides)
		{
			this.addEvents();
			this.reset();
		}
	}
	
	addEvents()
	{
		//Add mouse/touch events
		canvasDialog.src.addEventListener('mousemove', this.onMouseMove, false); 
		canvasDialog.src.addEventListener('mousedown', this.onMouseDown, false);	
		canvasDialog.src.addEventListener('mouseup', this.onMouseUp, false);
		canvasDialog.src.addEventListener ("mouseout", this.onMouseUp, false);		
		canvasDialog.src.addEventListener('touchstart', this.onTouchStart, false);
		canvasDialog.src.addEventListener('touchmove', this.onTouchMove, false); 	
		canvasDialog.src.addEventListener('touchend', this.onTouchEnd, false);	
	}
		
	reset()
	{
		if ((this.imagesLoaded < this.totalImages) || 
			(this.slidesLoaded < this.totalSlides)) 
		{
			return;
		}
		
		this.slideNum = 1;
		this.furthestSlideReached = 1;
		
		this.setupSlide();
	}
	
	update()
	{
		if (this.curSlide) this.curInteractableItems = this.curSlide.getInteractableItems();
		this.updateGlossary();
		this.updateNavButtons();
		this.onMove(null);
		this.draw();
	}
	
				
			
	/* ------------------------------------------------------------ */
	/* ----- Slide Setup ------------------------------------------ */
	
	setupSlide()
	{	
		if (this.curSlide) this.curSlide.wrapup();
		
		this.curSlide = this.slideManager.getCurrentSlide(this.slideNum);
		this.curSlide.reset();
		this.curSlide.setup();
		this.hideGlossary();
		this.updateGlossaryButton();
		this.update();
	}
	
	setSectionHeading(txtHeading)
	{		
		this.sectionTitle = txtHeading;
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Slide Navigation ------------------------------------- */
		
	onInteractableClicked(interactable)
	{
		if (!interactable) return;
	
		switch (interactable.getID())
		{
			case "btnGlossary": 	this.toggleGlossary(); break;
			case "btnNext": 		this.nextSlide(); break;
			case "btnNextPage": 	this.nextPage(); break;
			case "btnPrev": 		this.prevSlide(); break;
			case "btnPrevPage": 	this.prevPage(); break;
			case "btnRestart": 		this.reset(); break;
			default:				this.curSlide.onInteractableClicked(interactable); break;
		}
		
		if ((this.curSlide.isProgressionCriteriaSatisfied()) &&
			(this.slideNum == this.furthestSlideReached))
		{
			this.furthestSlideReached++; 
		}
		this.showPointer(false);		
		
		this.update();
	}
		
	updateNavButtons()
	{		
		let prevButtonEnabled = false;
		let nextButtonEnabled = false;
				
		//Determine previous and next button availability
		if (this.slideNum > 1)	prevButtonEnabled = true;
		if ((this.curSlide.isProgressionCriteriaSatisfied()) ||
			(this.slideNum < this.furthestSlideReached))
		{	
			nextButtonEnabled = true;
		}	
		
		//Set button availability
		this.btnGlossary.setToEnabled(this.glossaryAvailable);
		this.btnPrev.setToEnabled(prevButtonEnabled);
		if (this.slideNum == this.totalSlides)
		{
			this.btnNext.setToEnabled(false);
			this.btnRestart.setToEnabled(nextButtonEnabled);
		}
		else
		{
			this.btnNext.setToEnabled(nextButtonEnabled);
			this.btnRestart.setToEnabled(false);
		}
	}
	
	prevSlide()
	{
		this.slideNum--;
		this.setupSlide();
	}
	
	nextSlide()
	{
		this.slideNum++;
		if (this.slideNum > this.furthestSlideReached)
		{
			this.furthestSlideReached = this.slideNum;
		}
		this.setupSlide();
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Glossary  -------------------------------------------- */
		
	updateGlossary()
	{
		this.glossaryAvailable = false;
		
		let slideType = this.curSlide.getSlideType();
		if (slideType == "info")
		{
			this.glossaryAvailable = true;
		}
		else
		{
			let slideComplete = this.curSlide.getCompletionStatus();
			if (slideComplete) this.glossaryAvailable = true;
		}
	}
	
	updateGlossaryButton()
	{	
		//Get number of terms
		let numTerms;
		if (this.slideNum  == this.totalSlides)
		{
			numTerms = this.glossary.getAllTermData().length;
		}
		else
		{
			numTerms = this.curSlide.getGlossaryTerms().length;
		}
		
		//Set text
		if (this.dialogGlossary)
		{
			this.btnGlossary.setText("Hide Glossary ("+numTerms+")");
		}
		else
		{
			this.btnGlossary.setText("Show Glossary ("+numTerms+")");
		}
	}
	
	toggleGlossary()
	{
		if (this.dialogGlossary)
		{
			this.hideGlossary();
		}
		else
		{
			this.showGlossary();
		}
		this.updateGlossaryButton();
	}
	
	showGlossary()
	{			
		//Get terms for current slide
		let curTermsData = [];
		if (this.slideNum  == this.totalSlides)
		{
			curTermsData = this.glossary.getAllTermData();
		}
		else
		{
			let curTerms = this.curSlide.getGlossaryTerms();
			
			for (let i = 0; i < curTerms.length; i++)
			{
				let termData = this.glossary.getTermData(curTerms[i]);
				if (termData) curTermsData.push(termData);
			}
		}			
		
		//Create glossary dialog
		this.dialogGlossary = new GlossaryDialog(this.posGlossary, this.glossaryWidth);	
		this.dialogGlossary.setTerms(curTermsData);
		this.addGlossaryButton("btnPrevPage");
		this.addGlossaryButton("btnNextPage");
	}
	
	addGlossaryButton(id)
	{
		if (this.dialogGlossary == null) return;
		let btn = this.dialogGlossary.getButton(id); 
		if (btn) this.curSlide.addToInteractableItems(btn);
	}
	
	hideGlossary()
	{	
		this.removeGlossaryButton("btnPrevPage");
		this.removeGlossaryButton("btnNextPage");
		this.dialogGlossary = null;	
	}
	
	removeGlossaryButton(id)
	{
		if (this.dialogGlossary == null) return;
		let btn = this.dialogGlossary.getButton(id); 
		if (btn) this.curSlide.removeFromInteractables(btn);
	}
	
	prevPage()
	{
		if (this.dialogGlossary)
		{
			this.dialogGlossary.prevPage();
		}
	}
	
	nextPage()
	{
		if (this.dialogGlossary)
		{
			this.dialogGlossary.nextPage();
		}
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	draw()
	{		
		if (!this.curSlide) return;
	
		canvasBackground.clearAll();				
		canvasMidground.clearAll();
		canvasDialog.clearAll();
		canvasForeground.clearAll();
		canvasInterface.clearAll();	
				
		//Draw current slide
		this.curSlide.drawBackground();		
		this.curSlide.draw();
				
		//Draw surrounding elements
		canvasInterface.drawImage(this.imgInterface, this.posInterface);
		canvasInterface.drawText(this.sectionTitle, this.posSectionTitle, "Bold 16px Arial", "#000000", "center");		
		canvasInterface.drawText(this.activityTitle, this.posTitle, "Bold 20px Arial", "#000000", "left");	

		this.drawProgressBar();
		this.drawNavButtons();		
		if (this.dialogGlossary != null) this.dialogGlossary.draw();
	}	
	
	drawProgressBar()
	{		
		//Draw background
		canvasInterface.drawRectangle(this.posProgressBar, this.widthProgressBar, this.heightProgressBar,  "#ffffff", "", "");
		
		//Draw fill
		let completionPercentage = this.slideNum/this.totalSlides;
		canvasInterface.drawRectangle(this.posProgressBar, this.widthProgressBar * completionPercentage, this.heightProgressBar,  this.colourProgressBar, "", "");
		
		//Draw bar
		canvasInterface.drawRectangle(this.posProgressBar, this.widthProgressBar, this.heightProgressBar,  "", "#000000", "2");
		
		//Draw slide num
		let colour = "#000000";
		canvasInterface.drawText(this.slideNum+"/"+this.totalSlides, this.posProgressBarTxt, this.progressBarTxtStyle, colour, "right");
	}
	
	drawNavButtons()
	{
		this.btnGlossary.draw();
		this.btnPrev.draw();
		if (this.slideNum == this.totalSlides)
		{
			this.btnRestart.draw();
		}
		else
		{
			this.btnNext.draw();
		}		
	}
	
		
			
	/* ------------------------------------------------------------ */
	/* ----- General Events --------------------------------------- */
			
	onInteractStart()
	{		
		this.mouseDown = true;
		
		//Check if mouse/finger is over an intertable item
		if (this.curInteractableItems)
		{
			for (let i=0; i < this.curInteractableItems.length; i++)
			{
				let curInteractable = this.curInteractableItems[i];
				if (curInteractable.isMouseOver(this.mouseX, this.mouseY))
				{	
					if (curInteractable instanceof Dragger)
					{	
						this.curDragger = curInteractable;
						this.curSlide.onDragStart(this.curDragger, this.mouseX, this.mouseY);
					}
					else
					{					
						this.onInteractableClicked(curInteractable);
					}
					break;
				}
			}
		}
		
		//Check if mouse/finger is over nav buttons
		if (this.btnGlossary.isMouseOver(this.mouseX, this.mouseY))
		{	
			this.onInteractableClicked(this.btnGlossary);
			this.btnGlossary.setToDown(true);
		}
		else if (this.btnPrev.isMouseOver(this.mouseX, this.mouseY))
		{	
			this.onInteractableClicked(this.btnPrev);
			this.btnPrev.setToDown(true);
		}
		else if (this.btnNext.isMouseOver(this.mouseX, this.mouseY))
		{	
			this.onInteractableClicked(this.btnNext);
			this.btnNext.setToDown(true);
		}
		else if (this.btnRestart.isMouseOver(this.mouseX, this.mouseY))
		{	
			this.onInteractableClicked(this.btnRestart);
			this.btnRestart.setToDown(true);
		}
		
		this.draw()
		this.update();		
	}		
		
	onMove()
	{	
		//Update interactable and cursor style if mouse is over an interactable item
		this.showPointer(false);		
		if (this.curInteractableItems)
		{
			for (let i=0; i < this.curInteractableItems.length; i++)
			{
				let curInteractable = this.curInteractableItems[i];
				if (curInteractable.isMouseOver(this.mouseX, this.mouseY))
				{	
					this.showPointer(true);
					curInteractable.setToOver(true);
				}
				else 
				{	
					curInteractable.setToOver(false);
				}
			}
		}
		
		//Update cursor style if mouse is over a nav button		
		if ((this.btnGlossary.isMouseOver(this.mouseX, this.mouseY)) ||
			(this.btnPrev.isMouseOver(this.mouseX, this.mouseY)) ||
			(this.btnNext.isMouseOver(this.mouseX, this.mouseY)) ||
			(this.btnRestart.isMouseOver(this.mouseX, this.mouseY)))
		{	
			this.showPointer(true);
		}
							
		//If dragger is being dragged, update it
		if ((this.mouseDown) && (this.curDragger))
		{	
			this.curSlide.onDrag(this.curDragger, this.mouseX, this.mouseY);			
		}		
		
		this.draw();
	}
	
	onInteractEnd()
	{	
		this.mouseDown = false;	
		
		if (this.curDragger)
		{
			this.curSlide.onDragEnd(this.curDragger);
		}
		this.curDragger = null;
				
		//Update nav buttons
		this.btnGlossary.setToDown(false);
		this.btnPrev.setToDown(false);
		this.btnNext.setToDown(false);
		this.btnRestart.setToDown(false);
		
		this.draw();	
		this.update();		
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Mouse Events ----------------------------------------- */
						
	onMouseMove(e) 
	{		
		e.preventDefault(); //Prevent dragging of canvas				
		main.calculateMousePos(e);
		main.onMove(e);
	}
	
	onMouseDown(e) 
	{ 		
		e.preventDefault(); //Prevent dragging of canvas
		main.calculateMousePos(e);
		main.onInteractStart(e);
	}
	
	onMouseUp(e) 
	{ 	
		e.preventDefault(); //Prevent dragging of canvas
		main.onInteractEnd(e);
	}
	
	calculateMousePos(e)
	{
		main.mouseX = e.clientX - e.target.getBoundingClientRect().left;		
		main.mouseY = e.clientY - e.target.getBoundingClientRect().top;
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Touch Events ----------------------------------------- */
			
	onTouchMove(e) 
	{
		e.preventDefault(); //Prevent scrolling					
		main.calculateTouchPosition(e);
		main.onMove(e);
	}	
	
	onTouchStart(e) 
	{ 		
		e.preventDefault(); //Prevent scrolling	
		main.calculateTouchPosition(e);	
		main.onInteractStart(e);
	}
	
	onTouchEnd(e) 
	{ 			
		e.preventDefault(); //Prevent scrolling		
		main.onInteractEnd(e);
	}	
	
	calculateTouchPosition(e)
	{
		main.mouseX = e.touches[0].clientX - target.getBoundingClientRect().left;
		main.mouseY = e.touches[0].clientY - target.getBoundingClientRect().top; 	
	}	


	/* ------------------------------------------------------------ */
	/* ----- Utility Functions ------------------------------------ */
	
	showPointer(bool)
	{
		if (bool) //Show pointer cursor
		{
			this.divActivity.style.cursor = "pointer";
		}
		else //Show default cursor
		{
			this.divActivity.style.cursor = "default";
		}
	}	
	
	showElemBlock(elem, show)
	{	
		if (show)
		{
			elem.style.visibility = "visible";
		}
		else
		{
			elem.style.visibility = "hidden";
		}
	}
	
	showElem(elem, show)
	{	
		if (show)
		{
			elem.style.display = "block";
		}
		else
		{
			elem.style.display = "none";
		}
	}
	
	clearElem(elem)
	{
		while(elem.firstChild)
		{
			elem.removeChild(elem.firstChild);
		}
	}
	
	setToEnabledElem(elem, bool)
	{
		elem.disabled = !bool;
	}
	
	fadeElem(elem, fade)
	{	
		if (fade)
		{
			elem.style.opacity = 0.5; //Set image to half faded
		}
		else
		{
			elem.style.opacity = 1;
		}
	}
	
	generateRandomNumber(min, max)
	{
		return Math.round(Math.random() * (max - min) + min);
	}		
	
	shuffle (array) 
	{
		let currentIndex = array.length, temporaryValue, randomIndex;
		while (0 !== currentIndex) 
		{
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}	
}

const main = new Main();
main.init();