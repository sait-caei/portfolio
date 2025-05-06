class ComponentShelf
{
	constructor() 
	{	
		this.componentCategories = [
			{step: "A", categories: [{id:"CPU", name: "CPU + CPU Fan"}, {id:"RAM", name:"RAM"}, {id:"GPU", name:"Graphics Cards"}, {id:"Cards", name:"Expansion Cards"}, {id:"Drives", name:"Hard Drives"}]},	
			{step: "B", categories: [{id:"PSC", name: "Power Supply Connectors"}, {id:"FPC", name:"Front Panel Connectors"}, {id:"OC", name:"Other Connectors"}]}
		]
	
		//General
		this.curPart;
		this.collapsibleCategories;
		this.selectableOptions;
		this.activeOption;
		this.activeComponent;
		this.detailsPositionTimeout;
		this.detailsPositionTimeout2;
		
		//Component Details
		this.details = document.getElementById("details"); 
		this.detailsInstructions = document.getElementById("detailsInstructions"); 
		this.interactableComponent = document.getElementById("interactableComponent"); 
		this.detailsImage = document.getElementById("detailsImage"); 
		this.detailsImageDrag = document.getElementById("detailsImageDrag"); 
		this.detailsName = document.getElementById("detailsName"); 
		this.detailsDesc = document.getElementById("detailsDesc"); 
		this.interactableComponentIsSelected;
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- General ---------------------------------------------- */
				
	reset(curPart)
	{		
		this.collapseAllCategories();
		this.deselectAllOptions();	
		this.hideDetailsDisplay();
	}
	
	clearShelfSidebar()
	{
		let divCategorySidebar = document.getElementById("componentsShelfSidebar");	
		divCategorySidebar.innerHTML = "";
	}
	
	setup(curPart, curScenario)
	{		
		this.curPart = curPart;
	
		//Clear Sidebar
		let divCategorySidebar = document.getElementById("componentsShelfSidebar");	
		divCategorySidebar.innerHTML = "";
			
		//Generate categories and add listener to show/hide category options
		this.generateCategories();
		this.collapsibleCategories = document.getElementsByClassName("optionCategory");
		for (let i = 0; i < this.collapsibleCategories.length; i++) 
		{
			this.collapsibleCategories[i].addEventListener('click', this.toggleCategory, false);
		}		
				
		//Generate options and add listener to show/hide option details
		this.generateOptions(curScenario);
		this.selectableOptions = document.getElementsByClassName("option");
		for (let i = 0; i < this.selectableOptions.length; i++) 
		{
			this.selectableOptions[i].addEventListener('click', this.onOptionSelected, false);
		}		
	}
	
	getActiveComponent()
	{
		return this.activeComponent;
	}
	
	enableMenu(bool)
	{
		if (this.selectableOptions)
		{
			for (let i = 0; i < this.selectableOptions.length; i++) 
			{
				if (bool)
				{
					this.selectableOptions[i].classList.add("disabled");
				}
				else
				{
					this.selectableOptions[i].classList.remove("disabled");
				}
			}
		}
	}
		
	/* ------------------------------------------------------------ */
	/* ----- Collapsible Categories ------------------------------- */
	
	generateCategories()
	{	
		let divCategorySidebar = document.getElementById("componentsShelfSidebar");		
		for (let i = 0; i < this.componentCategories.length; i++) 
		{
			if (this.componentCategories[i].step == this.curPart)
			{
				let categories = this.componentCategories[i].categories;		
				for (let j = 0; j < categories.length; j++) 
				{
					//Create button
					let btn = document.createElement("button");
					btn.type = "button";
					btn.id = categories[j].id;
					btn.className = "optionCategory";
					btn.innerHTML = categories[j].name;	
					divCategorySidebar.appendChild(btn);	
					
					//Create div that will contain category optiona
					let div = document.createElement("div");
					div.id = categories[j].id+"options";
					div.className = "collapsibleOptions";
					divCategorySidebar.appendChild(div);					
				}
			}
		}	
	}
		
	toggleCategory(e)
	{
		//Check current status of target category
		let categoryOptions = document.getElementById(e.target.id + "options");	
		let currentlyExpanded = (categoryOptions.style.maxHeight != "");
				
		//Reset categories and details div
		let menu = main.componentShelf;
		menu.collapseAllCategories();
		menu.hideDetailsDisplay();		 
		
		//Toggle visibility of targeted category options (simple css sliding transition)
		if (categoryOptions)
		{			
			if ((currentlyExpanded) || (categoryOptions.style.maxHeight)) //Already visible - collapse
			{
				menu.collapseCategory(e.target, categoryOptions);
			} 
			else //Not visible - expand
			{
				menu.expandCategory(e.target, categoryOptions);
			}
		}		
	}
	
	expandCategory(btn, options)
	{		
		btn.classList.add("open");
		options.style.maxHeight = options.scrollHeight + "px";
		
		//Show details for first option automatically
		main.componentShelf.showDetailsDiv(options.firstChild);
	}
	
	collapseCategory(btn, options)
	{
		btn.classList.remove("open");
		options.style.maxHeight = null;
	}
	
	collapseAllCategories()
	{
		if (this.collapsibleCategories)
		{
			for (let i = 0; i < this.collapsibleCategories.length; i++) 
			{
				let categoryOptions = document.getElementById(this.collapsibleCategories[i].id + "options");
				if ((categoryOptions) && (categoryOptions.style.maxHeight)) //Category open - collapse
				{
					this.collapseCategory(this.collapsibleCategories[i], categoryOptions);
				} 
			}	
		}
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Category Options ------------------------------------- */
	
	generateOptions(curScenario)
	{
		if (this.curPart == "A")
		{
			this.addOptions(curScenario, "CPU");
			this.addOptions(curScenario, "RAM");
			this.addOptions(curScenario, "GPU");
			this.addOptions(curScenario, "Cards");
			this.addOptions(curScenario, "Drives");
		}
		else if (this.curPart == "B")
		{
			this.addOptions(curScenario, "PSC");
			this.addOptions(curScenario, "FPC");
			this.addOptions(curScenario, "OC");
		}
	}
	
	addOptions(curScenario, category)
	{		
		let divCategory = document.getElementById(category + "options");
		let options = curScenario.getOptions(category);
		if ((!divCategory) || (!options)) return;
		
		for (let i = 0; i < options.length; i++) 
		{
			let matchFound = false;
			for (let j = 0; j < componentsDetails.length; j++) 
			{
				if ((!matchFound) && (options[i].id == componentsDetails[j].id))
				{
					matchFound = true;
					
					//Create div element
					let component = componentsDetails[j];
					let divOpt = document.createElement("div");
					divOpt.id = component.id;
					divOpt.className = "option";
					
					//Create option name text
					let txtName = document.createElement("p");
					let txt = document.createTextNode(component.name);
					txtName.appendChild(txt);
					divOpt.appendChild(txtName);
					
					//Add to category div
					divCategory.appendChild(divOpt);
				}
			}
		}
	}		
	
	deselectAllOptions()
	{
		if (this.selectableOptions)
		{
			for (let i = 0; i < this.selectableOptions.length; i++) 
			{
				this.setOptionAsSelected(this.selectableOptions[i], false);
			}
		}
	}
	
	setOptionAsSelected(opt, bool)
	{		
		for (let i = 0; i < this.selectableOptions.length; i++) 
		{
			if (this.selectableOptions[i].id == opt.id)
			{
				//Update option div
				let div = document.getElementById(opt.id);
				if (div)
				{
					if (bool)
					{
						div.classList.add("selected");
					}
					else
					{
						div.classList.remove("selected");
					}
				}
			}
		}
		
		this.updateDetailsDisplay(bool);
	}
	
	onOptionSelected(e)
	{	
		if (main.dialogOpen) return;
		
		//Make sure we got the right target
		let target = e.target;
		if (target.tagName == "P") target = target.parentElement;
		
		//Show details for option
		main.componentShelf.showDetailsDiv(target);		
	}
		
	/* ------------------------------------------------------------ */
	/* ----- Component Details Div -------------------------------- */
	
	positionDetailsDiv(opt)
	{	
		//Attempted to program this dynamically but it was unreliable
		let yPos = 0;
		switch(opt.id)
		{			
			case "CPU0":		yPos = "111px"; break;
			case "CPU1":		yPos = "158px"; break;
			case "CPU2":		yPos = "205px"; break;
			case "CPU3":		yPos = "232px"; break;
			case "RAM0":		yPos = "152px"; break;
			case "RAM1":		yPos = "199px"; break;
			case "RAM2":		yPos = "207px"; break;
			case "RAM3":		yPos = "207px"; break;
			case "RAM4":		yPos = "202px"; break;
			case "RAM5":		yPos = "202px"; break;
			case "GPU0":		yPos = "193px"; break;
			case "GPU1":		yPos = "240px"; break;
			case "GPU2":		yPos = "277px"; break;
			case "GPU3":		yPos = "329px"; break;
			case "Card0":		yPos = "233px"; break;
			case "Card1":		yPos = "280px"; break;
			case "Card2":		yPos = "327px"; break;
			case "Card3":		yPos = "335px"; break;
			case "Card4":		yPos = "326px"; break;
			case "Drive0":		yPos = "220px"; break;
			case "Drive1":		yPos = "220px"; break;
			case "Drive2":		yPos = "220px"; break;
			case "Drive3":		yPos = "205px"; break;
			case "24pin":		yPos = "127px"; break;
			case "68pin":		yPos = "189px"; break;
			case "4pin":		yPos = "251px"; break;
			case "sataPower":	yPos = "313px"; break;
			case "molex":		yPos = "374px"; break;
			case "fpcHarness":	yPos = "85px"; break;
			case "edie":		yPos = "223px"; break;
			case "sataData":	yPos = "270px"; break;
			case "chassisFan":	yPos = "317px"; break;
			case "cpuFan":		yPos = "380px"; break;
		}
		this.details.style.top = yPos;		
		this.setDetailDivVisibility(true);
	}
	
	showDetailsDiv(target)
	{				
		//Reset details display
		this.hideDetailsDisplay();
		this.dePopulateDetails();
		
		//Remove active label from all selectable options, then set target option to active
		for (let i = 0; i < this.selectableOptions.length; i++) 
		{
			this.selectableOptions[i].classList.remove("active");
		}
		target.classList.add("active");
		
		//Setup detail div
		this.populateDetails(target);	
		this.activeOption = target.id; 
		
		//If component has already been added to the build, add a note and prevent the image from being dragged		
		let btn = document.getElementById(target.id);
		if ((btn) && (btn.classList.contains("selected"))) //Component has already been added to the build
		{
			this.updateDetailsDisplay(true);
		}
		else //Component has not been added to the build
		{
			this.updateDetailsDisplay(false);
		}
		
		
		this.detailsPositionTimeout = setTimeout(function() { main.componentShelf.positionDetailsDiv(target); }, 200);
		
		//Position detail div after slight delay to allow for menu expanding CSS transition
		//this.detailsPositionTimeout = setTimeout(function() { main.componentShelf.positionDetailsDiv(target); }, 200);
		//this.detailsPositionTimeout2 = setTimeout(function() { main.componentShelf.positionDetailsDiv(target); }, 400); //Second pass to adjust, just in case
	}
	
	setDetailDivVisibility(bool)
	{
		if (bool)
		{
			this.details.style.visibility = "visible";	
		}
		else
		{
			this.details.style.visibility = "hidden";	
		}
	}
	
	hideDetailsDisplay()
	{	
		//Remove active label from all selectable options		
		if (this.selectableOptions)
		{
			for (let i = 0; i < this.selectableOptions.length; i++) 
			{
				this.selectableOptions[i].classList.remove("active");
			}
		}
		
		//Hide detail div
		clearTimeout(this.detailsPositionTimeout);
		clearTimeout(this.detailsPositionTimeout2);
		this.setDetailDivVisibility(false);
		this.activeOption = null;
		this.dePopulateDetails();
		main.enableAllWiringTargets();
	}
	
	populateDetails(opt)
	{
		//Fetch details about current option
		this.activeComponent;
		for (let i = 0; i < componentsDetails.length; i++) 
		{			
			if (componentsDetails[i].id == opt.id)
			{
				this.activeComponent = componentsDetails[i];
			}
		}
		
		//Populate details
		this.detailsImage.src = "img/" + this.activeComponent.img;
		if (this.activeComponent.dragImg) 
		{
			this.detailsImageDrag.src = "img/" + this.activeComponent.dragImg;
		}
		this.detailsName.innerHTML = this.activeComponent.name;
		this.detailsDesc.innerHTML = this.activeComponent.desc;
	}
	
	dePopulateDetails()
	{
		this.detailsImage.src = "";
		this.detailsImageDrag.src = "";
		this.detailsName.innerHTML = "";
		this.detailsDesc.innerHTML = "";
		this.interactableComponentIsSelected = false;
	}
	
	updateDetailsDisplay(componentUsedInBuild)
	{
		//Reset details display appearance/functionality
		this.detailsImage.classList.remove("pointer");
		this.interactableComponent.draggable = false;
		this.interactableComponentIsSelected = false;
		this.interactableComponent.classList.remove("selected");
		this.interactableComponent.onclick = null;
		
		//Update selectable status
		this.updateStatusText(componentUsedInBuild);
		if ((this.curPart == "B") && (!componentUsedInBuild)) //Component not in use, make it selectable
		{
			this.interactableComponent.onclick = () => { this.toggleSelectedConnector(); }
		}
	}
	
	updateStatusText(componentUsedInBuild)
	{
		//Add instructions/functionality relevant to whether or not the component has been used in the build
		if (this.curPart == "A")
		{
			if (componentUsedInBuild)//Component already used
			{
				this.detailsInstructions.innerHTML = "<strong>UNAVAILABLE:</STRONG>  This component has already been added to your build.";
			}
			else //Component not already used
			{
				this.detailsInstructions.innerHTML = "This component can be added to your build.";
				this.detailsImage.classList.add("pointer");
			}		
			this.interactableComponent.draggable = !componentUsedInBuild;
		}
		else
		{			
			if (componentUsedInBuild) //Component already used
			{
				this.detailsInstructions.innerHTML = "<strong>UNAVAILABLE:</STRONG> This connector has already been used in your build.";
			}
			else //Component not already used
			{					
				if (this.interactableComponentIsSelected) //Component currently selected
				{		
					this.detailsInstructions.innerHTML = "This connector is <strong>SELECTED</strong> and ready to be connected in your build.";	
				}
				else //Component currently not selected
				{	
					this.detailsInstructions.innerHTML = "This connector can be used in your build.";
				}
			}				
		}
	}
	
	toggleSelectedConnector()
	{
		this.interactableComponentIsSelected = !this.interactableComponentIsSelected;
		if (this.interactableComponentIsSelected) //Connector is now connected
		{		
			let selectedConnector = this.getActiveComponent();
			if (selectedConnector.connectionType == "partial")
			{
				main.limitWiringTargets(selectedConnector);
			}	
			else
			{
				main.limitToNonPartialWiringTargets();
			}
			this.interactableComponent.classList.add("selected");	
			main.buildDiagram.clearMagnification();
			main.buildDiagram.clearFeedback();
		}
		else //Connector is now disconnected
		{
			main.enableAllWiringTargets();
			this.interactableComponent.classList.remove("selected");
		}
		this.updateStatusText(false);
	}
	
	isInteractableComponentSelected()
	{
		return this.interactableComponentIsSelected;
	}
}