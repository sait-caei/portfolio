class ProgressBar
{
	constructor(stepData) 
	{	
		this.stepData = stepData;	 	//Details about the activity steps		
		this.elemProgressBar = document.getElementById("progressBar");		
		this.elemProgressBarA = document.getElementById("progressBarA");	
		this.elemProgressBarB = document.getElementById("progressBarB");				
		this.curStep;					//Current step number
		this.displayStep;  				//Current step number displayed - this is different then the curStep because review steps are not counted towards it	
		this.furthestReachedStep; 		//Furthest step the user has reached
		this.furthestAccessibleStep;	//Furthest step that is currently accessible (a step that was reached before can become accessible if selections
										//made for steps before it are no longer valid
		
		this.init();		
	}
	
	/* ------------------------------------------------------------ */
	/* ----- General Set-up --------------------------------------- */
	
	init() 
	{
		this.reset();
	}
	
	reset()
	{		
		this.curStep = 0;
		this.furthestReachedStep = 0;
		this.furthestAccessibleStep = 0;
	}
	
	update(curStep)
	{				
		//Set current step/display step
		this.curStep = curStep; 
		this.displayStep = 1;		
		
		//Determine furthest step that has been reached
		if (this.furthestReachedStep < this.curStep) 
		{
			this.furthestReachedStep = this.curStep;
		}
		
		//Determine furthest step that is currently accessible
		this.furthestAccessibleStep = this.furthestReachedStep;
		let stepWithoutSelectionFound;
		for (let i = 0; i < this.furthestReachedStep; i++) 
		{
			let curStep = this.stepData[i];
			let selectionsMade = true; 
			for (let j = 0; j < curStep[0].length; j++) 
			{
				let stepType = curStep[0][j]; 			
				if (!stepType.includes("Review"))
				{
					let stepTopic =  curStep[1][j];
					let selectionOptional = curStep[3][j];
					if ((!userSelections.isThereAnExistingSelection(stepTopic)) && (!selectionOptional))
					{
						selectionsMade = false;
					}
				}
				
				if ((!selectionsMade) && (!stepWithoutSelectionFound))
				{
					stepWithoutSelectionFound = true;											
					this.furthestAccessibleStep = i;					
				}
			}
		}
		
		this.populateProgressBar();				
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Populate Progress Bar -------------------------------- */
	
	populateProgressBar()
	{			
		//Clear existing data from the progress bar
		this.elemProgressBarA.innerHTML = "";
		this.elemProgressBarB.innerHTML = "";
		
		//Starting add steps to the progress bar
		let num = 0;
		for(let i = 0; i < this.stepData.length; i++ ) 
		{			
			//Add step to the progress bar
			let stepType = this.stepData[i][0];
			if (stepType == "midwayReview")
			{
				this.addReviewStep([num], stepType, "Review");
				num++;
			}
			else if (stepType == "finalReview")
			{
				this.addReviewStep([num], stepType, "Planning Complete");
				num++;
			}
			else
			{	
				//Add progress details for selection steps
				let stepTopic = this.stepData[i][1][0];
				let selectionOptional = this.stepData[i][3];
				switch (stepTopic)
				{
					case "numGuests":		this.addSelectionStep([num], "Guests", userSelections.curSelections.numGuests, "", selectionOptional); break;					
					case "functionType":	this.addSelectionStep([num, num + 1], "Function Type", userSelections.curSelections.functionType, userSelections.curSelections.functionSubType, selectionOptional); break;				
					case "roomLayout": 		this.addSelectionStep([num], "Room Layout", userSelections.curSelections.roomLayout, "", selectionOptional); break;				
					case "tableType": 		this.addSelectionStep([num], "Tables & Seating", userSelections.curSelections.tableType, userSelections.curSelections.seatingType, selectionOptional); break;					
					case "equipment": 		this.addSelectionStep([num], "A/V & Equipment", userSelections.curSelections.equipment, "", selectionOptional); break;					
					case "foodType": 		this.addSelectionStep([num, num + 1], "Food", userSelections.curSelections.foodType, userSelections.curSelections.foodServiceType, selectionOptional); break;					
					case "beverageType": 	this.addSelectionStep([num, num + 1], "Beverages", userSelections.curSelections.beverageType, userSelections.curSelections.beverageServiceType, selectionOptional); break;
				}
				
				//Update step numbering
				switch (stepTopic)
				{
					case "numGuests":
					case "roomLayout":
					case "tableType":
					case "equipment":
						num++;
						break;
						
					case "functionType":
					case "foodType":
					case "beverageType":
						num = num + 2;						
						break;
				}
			}
		}	
	}
	
	//Steps where the user needs to select an option
	addSelectionStep(subSteps, topic, value, valueSub, stepOptional)
	{			
		let stepStatus = this.determineStepStatus(subSteps); //Get step status
		this.addStepText(stepStatus, subSteps, topic, value, valueSub, stepOptional);		
	}

	//Steps where the user does not need to select an option
	addReviewStep(subSteps, topic, txt)
	{		
		let stepStatus = this.determineStepStatus(subSteps); //Get step status			
		this.addStepText(stepStatus, subSteps, txt, "", "", true);
	}
	
	determineStepStatus(subSteps)
	{		
		//Is this the first or last step?
		let stepStatus = "";		
		for(let i = 0; i < subSteps.length; i++ ) 
		{		
			if (subSteps[i] == 0)
			{
				stepStatus += "first ";
			}
			else if (subSteps[i] == (this.stepData.length-1)) 
			{
				stepStatus += "last ";
			}	
		}
		
		//Has this step been started or completed?
		if (subSteps.length > 1)
		{
			if (subSteps[1] < this.furthestAccessibleStep)
			{
				stepStatus += "completed ";
			}
			else if (subSteps[1] == this.furthestAccessibleStep)
			{ 
				stepStatus += "partial ";
			}
			else if (subSteps[0] == this.furthestAccessibleStep)
			{
				stepStatus += "started ";
			}
		}
		else
		{			
			if (subSteps[0] < this.furthestAccessibleStep)
			{
				stepStatus += "completed ";
			} 
			else if (subSteps[0] == this.furthestAccessibleStep)
			{
				stepStatus += "started ";
			}
		}
		
		return stepStatus;
	}
	
	
	/* ------------------------------------------------------------ */	
	/* ----- Step Text -------------------------------------------- */
	
	//Create table data cell to hold step text. The status tells css what type of background image to use. 
	//(A full grey line for steps not started, a partial green line for current/partially-completed steps, 
	//and a full green line for complete steps.)
	addStepText(stepStatus, subSteps, txtStep, value, valueSub, stepOptional)
	{				
		let td = document.createElement("div");
		if (stepStatus) td.className = stepStatus;
				
		//Add progress bubbles
		let bubbleValue = value;
		for(let i = 0; i < subSteps.length; i++ ) 
		{
			if (i > 0) bubbleValue = valueSub;
			this.addProgressBubble(td, subSteps[i], txtStep, bubbleValue, stepOptional);
		}		
		
		//Set how to display value, depending on type of data it is
		if ((txtStep == "Tables & Seating") && (value == "N/A"))
		{
			value = "No tables";
		}
		else if (value == null)
		{
			value = "Not selected";
		}	
		if ((valueSub != null) && (valueSub != ""))
		{
			if (txtStep == "Tables & Seating")
			{
				value += ", " + valueSub;
			}
			else if (valueSub != "N/A")
			{
				if (valueSub == "Other Social Event") valueSub = "Other";	
				
				value += " (" + valueSub + ")";
			}				
		}			
		if (value.includes(";")) value = value.replaceAll(";", ", ");	
		if (value.includes("Combination")) value = value.replaceAll("Combination", "Combo");
		
		//Remove unwanted identifiers from display value (these are used elsewhere to differentiate between similarly named options)
		let substringsToRemove = ["(Food)", "(Beverages)", "(Break)", "(Breakfast)", "(Lunch)", "(Dinner)", "(Reception)", "(Late Night Snack)", "(NonAlcoholic)", "(Bar)", "(Passed or Butler)"];
		let displayValue = this.replaceBulk(value, substringsToRemove, "");	
				
		//Add step type and value information
		this.addParagraph(td, txtStep, "stepTopic");
		if (displayValue) this.addParagraph(td, displayValue);			
		//this.elemProgressBar.appendChild(td);
		if (subSteps[0] < 6)
		{
			this.elemProgressBarA.appendChild(td);
		}
		else
		{
			this.elemProgressBarB.appendChild(td);
		}
	}
	
	addParagraph(parentObj, txt, className)
	{
		let p = document.createElement("p");
		if (className != null) p.className = className;		
		let txtContent = document.createTextNode(txt);
		p.appendChild(txtContent);		
		parentObj.appendChild(p);	
		return p
	}	
		
	replaceBulk (str, findArray, replacement)
	{
		if (str == null) return; 
		
		let i, regex = [], map = {}; 
		for (i=0; i < findArray.length; i++)
		{ 
			regex.push( findArray[i].replace(/([-[\]{}()*+?.\\^$|#,])/g,'\\$1') );
			map[findArray[i]] = replacement; 
		}
		regex = regex.join('|');
		str = str.replace( new RegExp( regex, 'g' ), function(matched)
		{
			return map[matched];
		});
		return str;
	}	


	/* ------------------------------------------------------------ */	
	/* ----- Progress Bubbles ------------------------------------- */
	
	//Add progress bubble which visually indicates the status of the step. (A grey empty circle for steps that 
	//have not yet been started, a green empty circle for steps that have been started but not completed, a filed 
	//green circle for completed steps, an orange circle for hovering over or editing completed steps.) Other
	//than the checkmark which is added in the loop below, the rest of this is done with css.
	addProgressBubble(parentObj, numStep, txtStep, value, stepOptional)
	{				
		//Set bubble text
		let txtBubble = numStep;
		let bubbleStatus = this.determineBubbleStatus(numStep, value, stepOptional);
		if ((txtStep == "Review") || (txtStep == "Planning Complete"))
		{
			txtBubble = "!"; //Change number to exclamation point
		}
		else
		{
			if ((bubbleStatus.includes("completed")) && (!bubbleStatus.includes("active")))
			{
				txtBubble = "\u2713"; //Change number to checkmark
			}
			else
			{
				txtBubble = this.displayStep;
			}
			this.displayStep++;
		}
		let p = this.addParagraph(parentObj, txtBubble, "progressBubble");		
		
		//Add class so css can update bubble's appearance and add onclick function so user can go back 
		//and edit step if neccesary
		if (bubbleStatus) p.className += bubbleStatus;
		if (((bubbleStatus.includes("completed"))||(bubbleStatus.includes("started"))) &&
			(!bubbleStatus.includes("active")))
		{
			p.onclick = () => { this.showWarningMessage(numStep); }
		}
	}
		
	determineBubbleStatus(stepNum, value, stepOptional)
	{	
		//Is this the active step?
		let subStepStatus = "";	
		if (this.curStep == stepNum) 
		{	
			subStepStatus = " active";	
		}
		
		//Has this step been started or completed?
		if (this.furthestAccessibleStep == stepNum)
		{
			subStepStatus += " started";
		}
		else if (this.furthestAccessibleStep > stepNum)
		{
			if (((value == "Not selected")|| (value == undefined)) && (!stepOptional))
			{
				subStepStatus += " started";
			}
			else
			{
				subStepStatus += " completed";
			}
		}
		return subStepStatus;
	}
	
	
	/* ------------------------------------------------------------ */	
	/* ----- Warning Message for Back-Tracking -------------------- */
	
	showWarningMessage(num)
	{		
		let warningHeading = "Warning";
		let warningMessage = "The options available to you in later steps of this activity are dependent on the choices you made before them. So, editing your selection for an earlier step may cause some or all your selections for later steps to be no longer valid. When this happens, those selections will be reset, and you will have to select them again.";
		main.showPopup(warningHeading, warningMessage, "warning");
		
		//Add confirm button event
		let btnProceed  = document.getElementById("btnProceed");
		btnProceed.onclick = () => { this.proceedWithStepEdit(num); }		
	}
	
	proceedWithStepEdit(num)
	{
		main.clearPopup();
		main.goToStep(num);
	}		
}