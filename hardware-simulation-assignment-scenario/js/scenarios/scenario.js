class Scenario
{
	constructor() 
	{	
		this.description;				//Scenario description, displayed in build scenario dialog at simulation start
		this.preselectedComponents;		//Default components for the scenario that can not be changed or uninstalled
		this.connectorNotNeeded = "This connector is not needed in this build scenario.";
		
		//Component options
		this.cpuAndFanOptions;
		this.ramOptions;
		this.gpuOptions;
		this.cardsOptions;
		this.driveOptions;
		this.pscOptions;
		this.fpcOptions;
		this.ocOptions;		
	}	
	
	/* ------------------------------------------------------------ */
	/* ----- General ---------------------------------------------- */
	
	getDescription()
	{
		return this.description;
	}
	
	getPreSelectedComponents()
	{
		return this.preselectedComponents;
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Components ------------------------------------------- */
	
	getOptions(categoryID)
	{
		let options;
		switch (categoryID)
		{
			case "CPU":		options = this.cpuAndFanOptions; break;
			case "RAM": 	options = this.ramOptions; break;
			case "GPU": 	options = this.gpuOptions; break;
			case "Cards":	options = this.cardsOptions; break;
			case "Drives": 	options = this.driveOptions; break;
			case "PSC": 	options = this.pscOptions; break;
			case "FPC": 	options = this.fpcOptions; break;
			case "OC": 		options = this.ocOptions; break;
		}
		return options;
	}	
	
	getAllCorrectOptionsForPartA()
	{
		let correctOptions = [];		
		correctOptions = correctOptions.concat(this.getCorrectOptions("CPU"));
		correctOptions = correctOptions.concat(this.getCorrectOptions("RAM"));
		correctOptions = correctOptions.concat(this.getCorrectOptions("GPU"));
		correctOptions = correctOptions.concat(this.getCorrectOptions("Cards"));
		correctOptions = correctOptions.concat(this.getCorrectOptions("Drives"));
	
		return correctOptions;
	}
	
	getCorrectOptions(categoryID)
	{
		let correctOptions = [];
		let options = this.getOptions(categoryID);
		if (options)
		{
			for (let i = 0; i < options.length; i++)
			{
				if (options[i].status == "correct")
				{
					correctOptions.push(options[i]);
				}
			}
		}
		return correctOptions;
	}
	
	getComponentDetails(component)
	{
		let details = null;
		for (let i = 0; i < componentsDetails.length; i++)
		{
			if (componentsDetails[i].id == component.id)
			{
				details = componentsDetails[i];
			}
		}
		return details;
	}
	
	getEvaluationDetails(categoryID, component)
	{
		let options = this.getOptions(categoryID);
		for (let i = 0; i < options.length; i++)
		{
			if (options[i].id == component.id)	return options[i];
		}
		return "";
	}
		
	willComponentFitDropTarget(component)
	{
		let options = this.getOptions(component.category);
		for (let i = 0; i < options.length; i++)
		{
			if ((component.id == options[i].id) &&  (options[i].status == "invalid"))
			{
				return false;
			}
		}
		return true;
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Scoring ---------------------------------------------- */
		
	getTotalScore(curPart)
	{
		let totalScore = 0;
		if (curPart == "A")
		{
			totalScore += this.getTotalScoreForCategory("CPU");
			totalScore += this.getTotalScoreForCategory("RAM");
			totalScore += this.getTotalScoreForCategory("GPU");
			totalScore += this.getTotalScoreForCategory("Cards");
			totalScore += this.getTotalScoreForCategory("Drives"); 
		}
		else if (curPart == "B")
		{
			totalScore += this.getTotalScoreForCategory("PSC");
			totalScore += this.getTotalScoreForCategory("FPC");
			totalScore += this.getTotalScoreForCategory("OC");
		}	
		return totalScore;
	}
	
	getTotalScoreForCategory(categoryID)
	{
		let score = 0;					
		let options = this.getOptions(categoryID);
		for (let i = 0; i < options.length; i++)
		{
			if (options[i].status == "correct") score++;
		}
		return score;
	}
	
	calculateScoreForDragDropCategory(categoryID, selectedComponents)
	{
		let score = 0;	
		if (selectedComponents)
		{
			let options = this.getOptions(categoryID); 
			for (let i = 0; i < selectedComponents.length; i++)
			{		
				for (let j = 0; j < options.length; j++)
				{
					if ((options[j].id == selectedComponents[i].id) && (options[j].status == "correct"))
					{
						score++;
					}
				}
			}
		}
		return score;
	}	
	
	calculateScoreForWiringCategory(categoryID, wiringConnections)
	{
		let score = 0;	
		if (wiringConnections)
		{
			let options = this.getOptions(categoryID);
			for (let i = 0; i < wiringConnections.length; i++)				
			{	
				let connection = wiringConnections[i];
				for (let j = 0; j < options.length; j++)
				{
					let opt = options[j];
					if ((opt != undefined) && (opt.target1 != undefined) && (connection!= undefined))
					{
						if ((opt.id == connection.component.id) &&
						(((opt.target1 == connection.target1.id) && (opt.target2 == connection.target2.id)) ||
						 ((opt.target1 == connection.target2.id) && (opt.target2 == connection.target1.id))))
						{
							score++;
						}
					}
				}
			}
		}
		return score;
	}
}