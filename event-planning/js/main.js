class Main 
{
	constructor() 
	{		
		//General Variables
		this.progressBar; //Reference to the script which controls the progress bar
		this.stepDisplay; //Reference to the script which controls the adding/displaying of steps
		this.divActivity = document.getElementById("activity"); //Main div containing the activity		
		this.divBottomSection = document.getElementById("bottomSection"); //Div containing the bottom section of the activity (everything below the progress bar)
		this.divPopup;	//Dynamically created div that displays instructions or feedback text	
		this.activeInputs;	//All inputs (checkboxes/radio buttons) on the screen at a given time
		this.curStep;		//The current step the user is on
		this.curTime;
		
		//Buttons 
		this.btnInstructions = document.getElementById("btnInstructions");
		this.btnBack = document.getElementById("btnBack");
		this.btnNext = document.getElementById("btnNext");
		this.btnRestart = document.getElementById("btnRestart");
		
		//Instructions
		this.instructionsText = "<p>The purpose of this activity is to help you learn about the multitude of options you need to consider when planning events of different types and sizes.</p><p>Begin by selecting the number of guests that will be attending your event and click next to continue to the next selection.  Proceed through the other ten selection steps and make the appropriate choices for your event. When an option is not recommended based on the previous selections you made it will be clearly marked as not selectable. Some steps will ask you to select multiple options or to select options for more than one category. Simply follow the directions for each step and click next when you have finished making your selection(s).</p>You can change selections you have made by hitting the back button or clicking on the completed green circles on the progress bar.</p><p><strong>Please note:</strong> The options available to you in later steps of this activity are dependent on the choices you made before them. So, editing your selection for an earlier step may cause some or all your selections for later steps to be no longer valid. When this happens, those selections will be reset, and you will have to select them again.</p>";

		//Activity Steps
		this.stepData = [
			//Selection steps: step type(selSingle/selMultiple), step topic, step directions, selection optional (true/false)
			//Review steps: step type, img src, step directions pt1, step directions pt2
			[["selSingle"], 	["numGuests"], ["Select the number of guests that will be attending this event."], [false]],
			[["selSingle"], 	["functionType"], ["Select what type of function the event will be. Make sure you consider what the purpose of the event is when making this decision."], [false]],	
			[["selSingle"], 	["functionSubType"], ["Select what type of _______ this event will fall under."], [false]],
			[["selSingle"], 	["roomLayout"], ["Select a room layout for the event."], [false]],
			[["selSingle", "selSingle"],	["tableType", "seatingType"], ["Select the type of tables to use at the event.", "Select the type of seating for the event."], [false, false]],		
			[["selMulti"], 	["equipment"], ["Select all the audio/visual and other equipment needed for the event. Check all that apply."], [true]],
			[["midwayReview"], ["img/reviewMidway.png", 645, 348], ["Below you can see a visual representation of the event that you are planning, with icons representing all of the choices you've made so far. If you are unsure what any of the icons represent then you can hover over them with your mouse (on computers) or tap them with your finger (on mobile devices) to view an identifying label.", "When you are done reviewing your choices, click the Next button to proceed to the next step."]],
			[["selSingle"], 	["foodType"], ["Select what type of food will be served. Food needs to reflect the function or the meeting and be presented accordingly."], [false]],
			[["selSingle"], 	["foodServiceType"], ["Select a food service style."], [false]],
			[["selSingle"], 	["beverageType"], ["Select what type of beverages will be offered."], [false]],
			[["selSingle"], 	["beverageServiceType"], ["Select a beverage service style."], [false]],			
			[["finalReview"], ["img/reviewFinal.png", 645, 452], ["You have completed planning an event. Below you can see a visual representation of that event, with icons representing all of the choices that you made. Remember, if you are unsure what any of the icons represent then you can hover over them with your mouse (on computers) or tap them with your finger (on mobile devices) to view an identifying label.", "Click the restart button if you would like to plan another event."]]			
		]
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- General Set-up --------------------------------------- */
	
	init()	
	{	
		//Setup supporting classes
		this.progressBar = new ProgressBar(this.stepData);
		this.stepDisplay = new StepDisplay(this.stepData);
		
		//Setup buttons
		this.btnInstructions.onclick = () => { this.toggleInstructions(); }
		this.btnBack.onclick = () => { this.prevStep(); }
		this.btnRestart.onclick = () => { this.reset(); }
				
		//Setup event listener that is called when the window is resized
		this.delta = 200;		
		window.addEventListener("resize", this.onResize);

		this.reset();
		//this.toggleInstructions(); //Show instructions once on activity start
	}	

	reset()
	{		
		this.curStep = 0;
		this.timeout = false;
		
		//Reset supporting classes
		userSelections.reset();
		this.progressBar.reset();
		this.stepDisplay.reset();
		
		//Show step 1 
		this.displayStep();
	}
	
	onResize()
	{
		 main.curTime = new Date();
		if (main.timeout == false) 
		{
			main.timeout = true;
			setTimeout(main.onResizeEnd, main.delta);
		}
	}
	
	onResizeEnd() 
	{
		if (new Date() - main.curTime < main.delta) 
		{
			setTimeout(main.onResizeEnd, main.delta);
		} 
		else 
		{
			main.timeout = false;
			main.stepDisplay.updateRoomDiagram();
		}               
}
	
	/* ------------------------------------------------------------ */
	/* ----- Progression ------------------------------------------ */
		
	prevStep()
	{
		if (this.curStep == 0) return;
		
		this.curStep--;			
		this.displayStep();			
	}
	
	nextStep()
	{	
		if (this.curStep == this.stepData.length) return;
						
		this.curStep++;	
		this.displayStep();
	}
	
	goToStep(stepNum)
	{		
		this.curStep = stepNum;
		this.displayStep();
	}	
	
	displayStep()
	{			
		userSelections.clearInvalidSelections();	
		this.progressBar.update(this.curStep);
		this.stepDisplay.update(this.curStep);	
		
		this.updateButtonVisibility(); //Sets which buttons are visible
		this.btnInstructions.scrollIntoView();	//Reset page position so top of the activity is in view	
	}	

	
	/* ------------------------------------------------------------ */
	/* ----- Pop-up Dialog ---------------------------------------- */
	
	//In this case the popup is a dynamically created div that sits in front of the other activity 
	//content, not a browser dialog
	showPopup(heading, txt, type)
	{
		if (this.divPopup) this.clearPopup();
		
		//Create popup div
		this.divPopup = document.createElement("div");	
		this.divPopup.id = "popup";
		
		//Add heading, text, and buttons
		if (type == "default") this.addButton(this.divPopup, "btnClose", "x");
		if (heading) this.divPopup.innerHTML += "<h3>"+heading+"</h3>";
		if (txt) this.addParagraph(this.divPopup, txt);
		if (type == "warning")
		{
			this.addButton(this.divPopup, "btnProceed", "Proceed");
			this.addButton(this.divPopup, "btnCancel", "Cancel");			
		}
		
		//Add to page and position
		this.divActivity.appendChild(this.divPopup);
		this.divPopup.style.width = (this.divActivity.offsetWidth*0.9)+"px"; //Sets width
		this.divPopup.style.marginLeft = ((this.divActivity.offsetWidth * 0.1) / 2) +"px";  //Centres activity horizontally 
								
		//Add button events
		if (type == "default")
		{
			let btnClose  = document.getElementById("btnClose");
			btnClose.onclick = () => { this.clearPopup(); }	
		}
		else if (type == "warning")
		{
			//Add cancel button event. Proceed button event is added elsewhere so that what happens after the user clicks proceed
			//can change depending on this situation
			let btnCancel  = document.getElementById("btnCancel");
			btnCancel.onclick = () => { this.clearPopup(); }	
		}
		
		//Get active inputs (all radio buttons and checkboxes that are currently on the page)
		let allInputs = document.getElementsByTagName('input');
		this.activeInputs = [];
		for (let i = 0; i < allInputs.length; i++) 
		{
			if (!allInputs[i].disabled) this.activeInputs.push(allInputs[i]);
		}
		
		//Fade everything behind the pop-up dialog, disable buttons and active inputs
		this.fadeElem(this.divBottomSection, true);		
		this.updateInputs();	
		this.updateButtonStatuses();	
	}
	
	clearPopup()
	{
		//Remove popup
		if (this.divPopup) this.divActivity.removeChild(this.divPopup);
		this.divPopup = null;
		
		//Remove fade, re-enable buttons and active inputs
		this.fadeElem(this.divBottomSection, false);
		this.updateInputs();	
		this.updateButtonStatuses();
	}
		
	addParagraph(parentObj, txt)
	{
		if (txt.includes("<p"))
		{
			parentObj.innerHTML += txt;
		}
		else
		{
			parentObj.innerHTML += "<p>"+txt+"</p>";
		}
	}
			
	addButton(parentObj, id, txt)
	{
		//Create button
		let btn = document.createElement("button");
		btn.type = "button";
		btn.id = id;
		
		//Populate button text
		let txtContent = document.createTextNode(txt);		
		btn.appendChild(txtContent);
		
		parentObj.appendChild(btn);
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
	
	toggleInstructions()
	{
		if (this.divPopup) //Instructions dialog already open
		{
			this.clearPopup();
		}
		else //Instructions dialog NOT already open
		{
			this.showPopup("Instructions", this.instructionsText, "default");
		}
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Inputs ----------------------------------------------- */
	
	updateInputs()
	{			
		//When the popup dialog is present, inputs fields (checkboxes and radio buttons) are disabled
		if (this.divPopup)
		{
			//Disable input fields
			for (let i = 0; i < this.activeInputs.length; i++) 
			{
				this.activeInputs[i].disabled = true;
			}
		}
		else
		{
			//Enable input fields
			for (let i = 0; i < this.activeInputs.length; i++) 
			{
				this.activeInputs[i].disabled = false;
			}
		}
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Buttons ---------------------------------------------- */
				
	updateButtonVisibility()
	{		
		//Hide all buttons
		this.showButton(this.btnBack, false);
		this.showButton(this.btnNext, false);
		this.showButton(this.btnRestart, false);	
					
		//Show active buttons	
		if (this.curStep < (this.stepData.length-1)) //User is on any step before the last step
		{
			if (this.curStep > 0)	this.showButton(this.btnBack, true);
			this.showButton(this.btnNext, true);
		}
		else //User is on the last step
		{
			this.showButton(this.btnBack, true);
			this.showButton(this.btnRestart, true);
		}
	}
	
	updateButtonStatuses()
	{		
		//When the popup dialog is present, some buttons are disabled
		if (this.divPopup) //Dialog is open
		{
			this.enableButton(this.btnBack, false);
			this.enableButton(this.btnNext, false);
			this.enableButton(this.btnRestart, false);
		}
		else //Dialog is not open
		{
			this.enableButton(this.btnBack, true);
			this.enableButton(this.btnNext, true);
			this.enableButton(this.btnRestart, true);
		}
	}
	
	enableButton(btn, enable)
	{
		btn.disabled = !enable;
	}
	
	showButton(btn, show)
	{
		if (show)
		{
			btn.style.display = "block";
		}
		else
		{
			btn.style.display = "none";
		}
	}	
}

const main = new Main();
main.init();