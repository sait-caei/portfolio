class UserSelections 
{
	constructor() 
	{
		this.curSelections;	//A record of what options the user has selected so far for each topic
	}
	
	/* ------------------------------------------------------------ */
	/* ----- General Set-up --------------------------------------- */
	
	init()
	{
		this.reset();
	}
	
	reset()
	{		
		this.curSelections = {};
				
		//FOR TESTING ONLY - everything else in this function
		/*this.submitSelection("numGuests", "8 to 32");
		this.submitSelection("numGuests", "32 to 100");
		this.submitSelection("numGuests", "100 to 500");
		this.submitSelection("numGuests", "500+");
		
		//this.submitSelection("functionType", "Meeting");
		this.submitSelection("functionType", "Social Event");
		//this.submitSelection("functionType", "Tradeshow");
		
		this.submitSelection("functionSubType", "Business");
		//this.submitSelection("functionSubType", "Seminar");
		//this.submitSelection("functionSubType", "Training");
		this.submitSelection("functionSubType", "Wedding");
		//this.submitSelection("functionSubType", "Other Social Event");
		
		this.submitSelection("roomLayout", "Banquet");
		this.submitSelection("roomLayout", "Boardroom");
		//this.submitSelection("roomLayout", "Booths");
		//this.submitSelection("roomLayout", "Classroom");
		//this.submitSelection("roomLayout", "Crescents");
		this.submitSelection("roomLayout", "Hollow square");
		//this.submitSelection("roomLayout", "Reception");
		this.submitSelection("roomLayout", "Theatre");
		//this.submitSelection("roomLayout", "U shape");
		
		//this.submitSelection("tableType", "N/A");
		//this.submitSelection("tableType", "No Tables Required");
		this.submitSelection("tableType", "Cocktail Table");
		//this.submitSelection("tableType", "Classroom Rectangles");
		//this.submitSelection("tableType", "Round");
		this.submitSelection("tableType", "Rectangles");
		
		//this.submitSelection("seatingType", "N/A");
		//this.submitSelection("seatingType", "No Seating Required");
		//this.submitSelection("seatingType", "Bar Stool");
		this.submitSelection("seatingType", "Bar Stool;Soft Furniture");
		//this.submitSelection("seatingType", "Office Chair");
		this.submitSelection("seatingType", "Soft Furniture");
		this.submitSelection("seatingType", "Stackable Chair");
		this.submitSelection("seatingType", "Stackable Wedding Chair");
		
		//this.submitSelection("equipment", "Dance Floor;Flip Chart;Interactive White Board;Microphone;Music;Podium;Pipe and Drape;Projector and Screen;Stage");
		//this.submitSelection("equipment", "Dance Floor;Flip Chart;Interactive White Board;Microphone;Music;Podium;Pipe and Drape;Projector and Screen;Stage");
		this.submitSelection("equipment", "Dance Floor;Flip Chart;Interactive White Board;Microphone;Music;Podium;Pipe and Drape;Projector and Screen;Stage");
		
		//this.submitSelection("foodType", "N/A");
		//this.submitSelection("foodType", "No Food Required");
		this.submitSelection("foodType", "Break");
		//this.submitSelection("foodType", "Breakfast");
		//this.submitSelection("foodType", "Lunch");
		//this.submitSelection("foodType", "Dinner");
		//this.submitSelection("foodType", "Reception Food");
		//this.submitSelection("foodType", "Late Night Snack");
		//this.submitSelection("foodServiceType", "Action Stations");
		//this.submitSelection("foodServiceType", "Boxed");
		this.submitSelection("foodServiceType", "Stationed(Break)");
		//this.submitSelection("foodServiceType", "Family Style");
		//this.submitSelection("foodServiceType", "Stationed(Reception)");
		////this.submitSelection("foodServiceType", "Passed");
		//this.submitSelection("foodServiceType", "Buffet(Late Night Snack)");
		//this.submitSelection("foodServiceType", "Buffet");
		//this.submitSelection("foodServiceType", "Plated(Breakfast)");
		//this.submitSelection("foodServiceType", "Combination of Stationed and Passed");
		
		//this.submitSelection("beverageType", "N/A");
		//this.submitSelection("beverageType", "No Beverages Required");
		this.submitSelection("beverageType", "Non Alcoholic");
		//this.submitSelection("beverageType", "Passed or Butler");
		//this.submitSelection("beverageType", "Combination of Bar and Passed or Butler");
		//this.submitSelection("beverageType", "Bar");
		//this.submitSelection("beverageType", "Wine");
		this.submitSelection("beverageServiceType", "Stationed(NonAlcoholic)");
		//this.submitSelection("beverageServiceType", "Serviced");
		//this.submitSelection("beverageServiceType", "Cash");
		//this.submitSelection("beverageServiceType", "Combination of Host and Cash");
		//this.submitSelection("beverageServiceType", "Host(Passed or Butler)");
		//this.submitSelection("beverageServiceType", "Host(Bar)");
		//this.submitSelection("beverageServiceType", "Pre-set");
		//this.submitSelection("beverageServiceType", "Table Service");

		console.log(this.curSelections);*/
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Current Selections ----------------------------------- */
			
	getCurSelection(topic)
	{
		//Get whatever selection the user has already made for this topic
		switch (topic)
		{							
			case "beverageServiceType": return this.curSelections.beverageServiceType; break;
			case "beverageType": 		return this.curSelections.beverageType; break;								
			case "equipment": 			return this.curSelections.equipment; break;	
			case "foodServiceType": 	return this.curSelections.foodServiceType; break;				
			case "foodType": 			return this.curSelections.foodType; break;		
			case "functionSubType":		return this.curSelections.functionSubType; break;		
			case "functionType":		return this.curSelections.functionType; break;	
			case "numGuests":			return this.curSelections.numGuests; break;						
			case "roomLayout": 			return this.curSelections.roomLayout; break;
			case "seatingType": 		return this.curSelections.seatingType; break;			
			case "tableType": 			return this.curSelections.tableType; break;	
		}
		return null;
	}
	
	isThereAnExistingSelection(topic)
	{
		//Has the user already made a selection for this topic?
		let curSelection = this.getCurSelection(topic);
		if (curSelection != null) 
		{
			return true;
		}		
		return false;
	}
	
	submitSelection(topic, selectedOption)
	{		//console.log(topic, selectedOption);
		//Save user selection for this topic
		switch(topic)
		{						
			case "beverageServiceType":	this.curSelections.beverageServiceType = selectedOption; break;
			case "beverageType":		this.curSelections.beverageType = selectedOption; break;		
			case "equipment":			this.curSelections.equipment = selectedOption; break;		
			case "foodServiceType":		this.curSelections.foodServiceType = selectedOption;  break;	
			case "foodType":			this.curSelections.foodType = selectedOption; break;			
			case "functionType":		this.curSelections.functionType = selectedOption; break;
			case "functionSubType":		this.curSelections.functionSubType = selectedOption; break;	
			case "numGuests":			this.curSelections.numGuests = selectedOption; break;			
			case "roomLayout":			this.curSelections.roomLayout = selectedOption; break;			
			case "seatingType":			this.curSelections.seatingType = selectedOption; break;			
			case "tableType":			this.curSelections.tableType = selectedOption; break;			
		}
	}
		
	
	/* ------------------------------------------------------------ */
	/* ----- Validating Selections -------------------------------- */
	
	clearInvalidSelections()
	{
		//Clear any selections the user has made previously that are now invalid
		this.clearInvalidSelection("numGuests", this.curSelections.numGuests);	
		this.clearInvalidSelection("functionType", this.curSelections.functionType);		
		this.clearInvalidSelection("functionSubType", this.curSelections.functionSubType);		
		this.clearInvalidSelection("roomLayout", this.curSelections.roomLayout);		
		this.clearInvalidSelection("tableType", this.curSelections.tableType);		
		this.clearInvalidSelection("seatingType", this.curSelections.seatingType);		
		this.clearInvalidSelection("equipment", this.curSelections.equipment);		
		this.clearInvalidSelection("foodType", this.curSelections.foodType);		
		this.clearInvalidSelection("foodServiceType", this.curSelections.foodServiceType);		
		this.clearInvalidSelection("beverageType", this.curSelections.beverageType);				
		this.clearInvalidSelection("beverageServiceType", this.curSelections.beverageServiceType);					
	}
	
	//For steps where the user can select multiple options
	clearInvalidSelection(topic, selectedOps)
	{		
		if (!selectedOps) return;
				
		//Get recommended options for this topic
		let selectedOptions = selectedOps.split(";"); //Split all of the user's selected options into an array
		let recommendedOptions;
		switch (topic)
		{			
			case "beverageServiceType":	recommendedOptions = eventOptions.getRecommendedBeverageServiceOptions(); break;
			case "beverageType":		recommendedOptions = eventOptions.getRecommendedBeverageOptions(); break;		
			case "equipment":			recommendedOptions = eventOptions.getRecommendedEquipmentOptions(); break;		
			case "foodServiceType":		recommendedOptions = eventOptions.getRecommendedFoodServiceOptions(); break;	
			case "foodType":			recommendedOptions = eventOptions.getRecommendedFoodOptions(); break;			
			case "functionType":		recommendedOptions = eventOptions.getFunctionOptions(); break;
			case "functionSubType":		recommendedOptions = eventOptions.getFunctionSubTypeOptions(); break;
			case "numGuests":			recommendedOptions = eventOptions.getGuestOptions(); break;			
			case "roomLayout":			recommendedOptions = eventOptions.getRecommendedRoomLayoutOptions(); break;		
			case "seatingType":			recommendedOptions = eventOptions.getRecommendedSeatingOptions(); break;	
			case "tableType":			recommendedOptions = eventOptions.getRecommendedTableOptions(); break;
		}
		
		//Check if the user's selected options match the recommended options
		let modifiedOptions = "";
		if (recommendedOptions)
		{		
			for(let i = 0; i < selectedOptions.length; i++ ) 
			{ 
				for(let j = 0; j < recommendedOptions.length; j++ ) 
				{ 
			
					//If the selected option does match add it to the modified options string. This string will
					//replace the original selected options string so only recommended options remain as selected
					//options
					if (selectedOptions[i] == recommendedOptions[j]) 
					{
						if (modifiedOptions != "") modifiedOptions += ";";
						modifiedOptions += selectedOptions[i];
					}						
				}
			}	
		}
		
		//If none of the selected options matched the recommended options, the modified options string will be empty.
		//If the modified options string is empty, completely clear the user's selection instead of submitting an
		//empty string
		if (modifiedOptions == "")
		{
			this.clearSelection(topic);
		}
		else
		{
			//The modified options string was not empty, replace the user's existing selections with this string
			this.submitSelection(topic, modifiedOptions);	
		}		
	}
	
	//For steps where the user can only select one option
	clearSelection(topic)
	{			
		//Clear user selection for this topic
		this.submitSelection(topic, null);
	}
}
const userSelections = new UserSelections();
userSelections.init();