class StepDisplay
{
	constructor(stepData) 
	{		
		//General Variables
		this.stepData = stepData; //Details about the activity steps	
		this.divRoomDiagram = document.getElementById("roomDiagram"); //Div where room diagram is added
		this.divStepDisplay = document.getElementById("stepDisplay"); //Div where step information and selection options are added
		this.pFeedback = document.getElementById("feedback"); //Paragraph where feedback for the user is added	
		this.pRoomDiagramTxt1 = document.getElementById("pRoomDiagramTxt1"); //Paragraph where information about the room diagram is added
		this.pRoomDiagramTxt2 = document.getElementById("pRoomDiagramTxt2"); //Paragraph where information about the room diagram is added
				
		//Buttons 
		this.btnBack = document.getElementById("btnBack");
		this.btnNext = document.getElementById("btnNext");
		this.btnRestart = document.getElementById("btnRestart");
		
		//Step details
		this.displayedStep;		//Displayed step number
		this.curStep;			//Current step number
		this.curStepDetails; 	//Reference to the stepData for the current step
		this.curStepType;		//Is the step selSingle (only one option can be selected), selMultiple (multiple options can be selected) or
								//a review step (information only)
		this.curStepInfo;		//Additional information for the current step. For selection steps it contains the 'topic' of each part of the 
								//step - basically what the user is selecting the option for. Ie. If the user is asked to select a type of meeting, 
								//the topic is meeting. This is not being used for review steps at the moment.
		this.curStepDirections;		//Directions for the current step
		this.curStepSelectionOptional;
		this.curStepParts;		//Steps can have multiple parts where selections need to be made. Right now only the Tables & Seating step is
								//using this functionality.
		this.curStepSelectionOptional;		//Is selection optional for the current step? (True/false).  For most steps this will be false button
											//when it is true the user can proceed past a step without making a seleciton
				
		this.init();
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- General Set-up --------------------------------------- */
	
	init()	
	{			
		this.btnNext.onclick = () => { this.validateSelection(); }
	}

	reset()
	{	
		//Clear the divs where the room diagram and step selection info are added to
		this.divStepDisplay.innerHTML = "";
		//this.divRoomDiagram.innerHTML = "";
	}
	
	update(curStep)
	{
		this.curStep = curStep;
		
		this.getStepDetails();
		this.displayStep();
	}
	
	/* ------------------------------------------------------------ */
	/* ----- All Steps -------------------------------------------- */
			
	getStepDetails()
	{
		this.curStepDetails = this.stepData[this.curStep];
		this.curStepType = this.curStepDetails[0];
		this.curStepInfo = this.curStepDetails[1];
		this.curStepDirections = this.curStepDetails[2];
		this.curStepSelectionOptional = this.curStepDetails[3];		
		
		//Special change for the tables/seting step when they select Reception for the room layout
		if (this.curStepInfo[0] == "tableType")
		{
			if (userSelections.curSelections.roomLayout == "Reception")
			{
				this.curStepType[1] = "selMulti"
				this.curStepSelectionOptional[1] = true;
			}	
			else
			{
				this.curStepType[1] = "selSingle"
				this.curStepSelectionOptional[1] = false;
			}
		}		
				
		//Determine the displayed step number - this is different then the curStep because review steps
		//are not counted towards it
		this.displayedStep = 0;
		for(let i = 0; i <= this.curStep; i++ ) 	
		{
			if (!this.stepData[i][0][0].includes("Review")) 
			{
				this.displayedStep++; 
			}
		}
	}
	
	displayStep()
	{		
		this.reset();
		
		//Display step
		if (this.curStepType[0].includes("Review"))		
		{
			this.displayReviewStep();			
		}
		else
		{
			this.displaySelectionStep();
		}
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Review Steps ----------------------------------------- */

	displayReviewStep()
	{	
		//Popluate explanations/instructions text
		let imgInfo = this.curStepDetails[1];
		if (this.curStepDirections[0]) this.addText(this.pRoomDiagramTxt1, this.curStepDirections[0]); //Instructions above canvas
		if (this.curStepDirections[1]) this.addText(this.pRoomDiagramTxt2, this.curStepDirections[1]); //Instructions below canvas

		//Update and then show diagram
		this.updateRoomDiagram();
		this.showRoomDiagram(true);			
	}
	
	showRoomDiagram(show)
	{
		if (show)
		{
			this.divRoomDiagram.style.display = "block";
		}
		else
		{
			this.divRoomDiagram.style.display = "none";
		}
	}
	
	updateRoomDiagram()
	{
		if (!roomDiagram) return;		
		roomDiagram.reset();
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Selection Steps -------------------------------------- */
	
	displaySelectionStep()
	{		
		//Get selection step specific info and set room diagram div to hidden
		this.curStepParts = this.curStepInfo.length; 
		this.showRoomDiagram(false);	
				
		this.getStepOptions();
		for(let i = 0; i < this.curStepParts; i++ ) 
		{				
			//Add directions for this part of the step
			let newSection = this.showStepDetails(i, this.curStepDetails[2][i]);
			this.divStepDisplay.appendChild(newSection);
										
			//Check if the only recommended option for this topic matches 'N/A'. If it does, this topic does not require 
			//any selection to be made and a message is shown to the user instead.			
			if (this['stepRecommendedOptions'+i] == "N/A") //No options available
			{	
				switch (this.curStepInfo[i])
				{
					case "functionSubType":		
						this.addParagraph(newSection, "<p class=\"notRecommended\">A subtype does not need to be selected for this type of event. Click the Next button to continue.</p>"); 
						break;
					case "roomLayout":			
						this.addParagraph(newSection, "<p class=\"notRecommended\">A room layout does not need to be selected for this type of event. Click the Next button to continue.</p>"); 
						break;
					case "tableType":			
						this.addParagraph(newSection, "<p class=\"notRecommended\">Tables are not needed for this type of event. Pick your seating type and then click the Next button to continue.</p>"); 
						break;
					case "seatingType":			
						this.addParagraph(newSection, "<p class=\"notRecommended\">Seating is not needed for this type of event. Click the Next button to continue.</p>"); 
						break;
					case "foodType":			
						this.addParagraph(newSection, "<p class=\"notRecommended\">Food is not needed for this type of event. Click the Next button to continue.</p>"); 
						break;
					case "foodServiceType":		
						this.addParagraph(newSection, "<p class=\"notRecommended\">Food service is not needed for this event. Click the Next button to continue.</p>"); 
						break;
					case "beverageType":		
						this.addParagraph(newSection, "<p class=\"notRecommended\">Beverages are not needed for this type of event. Click the Next button to continue.</p>"); 
						break;
					case "beverageServiceType":	
						this.addParagraph(newSection, "<p class=\"notRecommended\">Beverage service is not needed for this event. Click the Next button to continue.</p>"); 
						break;
				}
			}
			else //Options available
			{
				this.addStepOptions(i, newSection);
			}
		
		}		
		this.showFeedback(""); //Clear any feedback already on the page
	}
	
	validateSelection()
	{
		//There's no need to validate if this a review step
		if ((this.curStepType[0] == "midwayReview") || (this.curStepType[0] == "finalReview"))			
		{
			main.nextStep();
			return;
		}
		
		//Determine the option(s) the user selected for each part of the step
		let selectedOptions = [];		
		for (let i = 0; i < this.curStepParts; i++)
		{
			let options = document.getElementsByName("stepOptions"+ i);
			let optionSelected;
			for (let j = 0; j < options.length; j++)
			{
				if(options[j].checked) 
				{
					selectedOptions.push([i, options[j].value]);
					optionSelected = true;
				}
			}
			
			//If this part of the step had no options available for the user, push a placeholder value instead
			if ((!optionSelected) && (this['stepRecommendedOptions'+i] == "N/A"))
			{	
				selectedOptions.push([i, "N/A"]);
			}
		}
		
		//Check that the user's selection(s) are valid		
		let isValid = true;	
		for (let i = 0; i < this.curStepParts; i++)
		{
			if (!this.curStepSelectionOptional[i])
			{			
				let selectionMade;
				for (let j = 0; j < selectedOptions.length; j++)
				{
					if (selectedOptions[j][0] == i) selectionMade = true;
				}
				if (!selectionMade) isValid = false;
			}
		}
		
		//If selection is valid, submit selection and proceed to next step. If it is not, show 
		//user feedback to let them know.
		if (isValid)
		{
			for (let i = 0; i < this.curStepParts; i++)
			{				
				if (selectedOptions[0])
				{
					if (this.curStepType[i] == "selMulti") //For steps where the user can select multiple options
					{
						let optList = "";
						for (let j = 0; j < selectedOptions.length; j++)
						{
							if (selectedOptions[j][0] == i)
							{
								if (optList != "") optList += ";";
								optList += selectedOptions[j][1];
							}
							
						}
						
						userSelections.submitSelection(this.curStepInfo[i], optList);	
					}
					else //For steps where the user can only select a single option
					{
						userSelections.submitSelection(this.curStepInfo[i], selectedOptions[i][1]);	
					}
				}
				else
				{
					//Clear user selection instead of submitting if selections options is empty (this may happen for steps where
					//user has options but selecting one is optional)
					userSelections.clearSelection(this.curStepInfo[i]);
				}
			}
			
			main.nextStep();
		}
		else
		{
			if (this.curStepParts > 1)
			{
				//'All parts' would make sense if there was ever more than 2 parts of any given step. But right now
				//the most we have is 2 parts, so 'both' sounds better
				this.showFeedback("You must select an option for both parts of the step before you can proceed.");
				//this.showFeedback("You must select an option for all parts of the step before you can proceed.");
			}
			else
			{
				this.showFeedback("You must select an option before you can proceed.");
			}
		}
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Populating Step Details ------------------------------ */
		
	showStepDetails(num, txt)
	{
		let newDiv = document.createElement("div");	
		newDiv.className = "stepPart";	

		//Update text for step 3
		if (this.curStepInfo[0] == "functionSubType")
		{
			let functionType = userSelections.getCurSelection("functionType");
			txt = txt.replace("_______", functionType.toLowerCase());
		}	
		
		//Determine how to display step number and part, then add directions
		let txtStep = "Step " + this.displayedStep;
		if (this.curStepParts > 1)
		{
			switch (num)
			{
				case 0: txtStep += " (Part A)"; break;
				case 1: txtStep += " (Part B)"; break;
				case 2: txtStep += " (Part C)"; break;
			}
		}		
		let p = this.addParagraph(newDiv, "<p class=\"stepDirections\"><strong>"+txtStep+"</strong>: "+txt+"</p>");			
		return newDiv;
	}	

	showFeedback(txt)
	{
		this.pFeedback.innerHTML = txt;
	}

	
	/* ------------------------------------------------------------ */
	/* ----- Populating Step Options ------------------------------ */
				
	getStepOptions()
	{	
		for(let i = 0; i < this.curStepParts; i++ ) 
		{			
			this['stepAllOptions'+i] = null; //All options for this topic (to compare and determine the non-recommended options)
			this['stepRecommendedOptions'+i] = null; //Recommended options for this topic
						
			//Get the options for this topic
			let topic = this.curStepInfo[i];		
			switch (topic)
			{							
				case "beverageServiceType":	
					this['stepAllOptions'+i] = eventOptions.getBeverageServiceOptions(this.curSelections);  
					this['stepRecommendedOptions'+i] = eventOptions.getRecommendedBeverageServiceOptions(this.curSelections);  
					break;		
					
				case "beverageType":		
					this['stepAllOptions'+i] = eventOptions.getBeverageOptions(this.curSelections);  
					this['stepRecommendedOptions'+i] = eventOptions.getRecommendedBeverageOptions(this.curSelections); 
					break;
				
				case "equipment":		
					this['stepAllOptions'+i] = eventOptions.getAllEquipmentOptions(this.curSelections);
					this['stepRecommendedOptions'+i] = eventOptions.getRecommendedEquipmentOptions(this.curSelections); 
					break;
										
				case "foodServiceType":
					this['stepAllOptions'+i] = eventOptions.getFoodServiceOptions(this.curSelections); 
					this['stepRecommendedOptions'+i] = eventOptions.getRecommendedFoodServiceOptions(this.curSelections);
					break;
					
				case "foodType":		
					this['stepAllOptions'+i] = eventOptions.getFoodOptions(this.curSelections); 
					this['stepRecommendedOptions'+i] = eventOptions.getRecommendedFoodOptions(this.curSelections); 
					break;
					
				case "functionSubType":	this['stepAllOptions'+i] = eventOptions.getFunctionSubTypeOptions(this.curSelections); break;
				case "functionType":	this['stepAllOptions'+i] = eventOptions.getFunctionOptions(this.curSelections); break;
				case "numGuests":		this['stepAllOptions'+i] = eventOptions.getGuestOptions(this.curSelections); break;			
					
				case "roomLayout":		
					this['stepAllOptions'+i] = eventOptions.getAllRoomLayoutOptions(this.curSelections); 
					this['stepRecommendedOptions'+i] = eventOptions.getRecommendedRoomLayoutOptions(this.curSelections); 
					break;
					
				case "seatingType":
					this['stepAllOptions'+i] = eventOptions.getAllSeatingOptions(this.curSelections); 
					this['stepRecommendedOptions'+i] = eventOptions.getRecommendedSeatingOptions(this.curSelections); 
					break;
					
				case "tableType":		
					this['stepAllOptions'+i] = eventOptions.getAllTableOptions(this.curSelections); 
					this['stepRecommendedOptions'+i] = eventOptions.getRecommendedTableOptions(this.curSelections); 
					break;			
			}
			
			//If no recommended options have been declared we are assuming all options are available
			if (this['stepRecommendedOptions'+i] == null) 
			{
				this['stepRecommendedOptions'+i] = this['stepAllOptions'+i];
			}
		}
	}
	
	addStepOptions(num, parentObj)
	{
		//Add recommended options
		let curOptionNum = 0;
		for(let i = 0; i < this['stepRecommendedOptions'+num].length; i++ ) 
		{													
			this.addStepOption(parentObj, num, curOptionNum, this['stepRecommendedOptions'+num][i], true);
			curOptionNum++;
		}		
		
		//Add non-recommended options
		for(let i = 0; i < this['stepAllOptions'+num].length; i++ ) 
		{	
			//Check if option was already one of the recommended options. If it was, do not add it again
			let alreadyAdded = false;
			for(let j = 0; j < this['stepRecommendedOptions'+num].length; j++ ) 
			{		
				if (this['stepAllOptions'+num][i] == this['stepRecommendedOptions'+num][j]) alreadyAdded = true;
			}
			if (!alreadyAdded)	
			{
				this.addStepOption(parentObj, num, curOptionNum, this['stepAllOptions'+num][i], false);
				curOptionNum++;
			}
		}
	}	
	
	addStepOption(parentObj, stepPart, optNum, optName, recommended)
	{			
		//Create new div to hold option
		let newDiv = document.createElement("div");	
		newDiv.className = "stepOption";
		if ((optNum % 2) == 0)	newDiv.className += " odd";
		if (!recommended)	newDiv.className += " notSelectable";
		parentObj.appendChild(newDiv);			
					
		//Add input and input label
		let opt = "option"+stepPart+"-"+optNum;
		this.addOptionInput(newDiv, stepPart, opt, optName, recommended);		
		let label = document.createElement("label");	
		if (opt) label.htmlFor = opt;	
		newDiv.appendChild(label);	
			
		//Add note for non-recommended options		
		if (!recommended) 
		{
			this.addParagraph(label, "<p class=\"notRecommended\">This is not a recommended option for this event.</p>");	
		}
		
		//Set display name by removing unwanted identifiers (used elsewhere to distinguish between similarly named options)
		let substringsToRemove = ["(Food)", "(Beverages)", "(Break)", "(Breakfast)", "(Lunch)", "(Dinner)", "(Reception)", "(Late Night Snack)", "(NonAlcoholic)", "(Bar)", "(Passed or Butler)"];
		let displayName = this.replaceBulk(optName, substringsToRemove, "");		
			
		//Add option image and description	
		let optImg = eventOptions.getOptionImage(optName);
		let optDesc = eventOptions.getOptionInfo(optName);
		this.addOptionImage(label, optImg, displayName)
		this.addOptionDescription(label, displayName, optDesc, recommended);
	}
	
	addOptionInput(parentObj, stepPart, opt, optName, recommended)
	{		
		//Determine input type for option (either radio button or checkbox)
		let inputType;
		switch (this.curStepType[stepPart])
		{
			case "selSingle": inputType = "radio"; break;
			case "selMulti": inputType = "checkbox"; break;
		}
		
		//Add input
		let input = document.createElement("input");
		input.type = inputType;
		input.id = opt;
		input.name = "stepOptions"+stepPart;
		input.value = optName;
		if (!recommended) input.disabled = true;	//Disable input if it is not a recommended option
		
		//Check if input was previously selected by the user. Set it to checked if it was.
		for(let i = 0; i < this.curStepParts; i++ ) 
		{	
			let optTopic = this.curStepInfo[i];
			let optValue = userSelections.getCurSelection(optTopic); 
			if (optValue)
			{
				let optList = optValue.split(";");
				for(let j = 0; j < optList.length; j++ ) 
				{	
					if (optName == optList[j]) input.checked = true;
				}
			}
		}
		
		parentObj.appendChild(input);
	}
	
	addOptionImage(parentObj, src, txt)
	{
		if (!src) return;
		
		//Create container dic
		let imgDiv = document.createElement("div");
		imgDiv.className += "stepOptionImage";
			
		//Create and add img
		let img = document.createElement("img");
		img.src = "img/options/"+src;
		img.style = "width:370px; height:278px;";
		imgDiv.appendChild(img);	
		
		//Create and add image caption	(display in front of image and positioned at it's top edge)	
		let caption = document.createElement("figcaption");	
		let txtContent = document.createTextNode(txt);		
		caption.appendChild(txtContent);	
		imgDiv.appendChild(caption);	
			
		parentObj.appendChild(imgDiv);
	}

	addOptionDescription(parentObj, name, desc, recommended)
	{
		//Add warning for options that are not recommended for this event
		let infoDiv = document.createElement("div");
		infoDiv.className += "stepOptionInfo";	
				
		//Add option description
		if (desc)
		{
			if ((desc.includes("<p>")) || (desc.includes("<ol>")) || (desc.includes("<ul>")))
			{
				this.addParagraph(infoDiv, "<strong>"+name+"</strong>:");
				infoDiv.innerHTML += desc;
			}
			else 
			{
				this.addParagraph(infoDiv, "<strong>"+name+"</strong>: "+desc);
			}
		}
		else
		{
			this.addParagraph(infoDiv, name);
		}		
		parentObj.appendChild(infoDiv);	
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
	
	addText(obj, txt)
	{
		obj.innerHTML = txt;
	}		
	
	replaceBulk (str, findArray, replacement)
	{
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
}