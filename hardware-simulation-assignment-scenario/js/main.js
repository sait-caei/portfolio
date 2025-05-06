const canvasBackground = new CanvasManager(document.getElementById("canvasBackground"));
const canvasDropTargets = new CanvasManager(document.getElementById("canvasDropTargets"));
const canvasWireTargets = new CanvasManager(document.getElementById("canvasWireTargets"));
const canvasWires = new CanvasManager(document.getElementById("canvasWires"));
const canvasMagnification = new CanvasManager(document.getElementById("canvasMagnification"));
const canvasForeground = new CanvasManager(document.getElementById("canvasForeground"));
		
class Main 
{
	constructor() 
	{	
		//Mode - activity or assignment or assignmentDemo. (assignment connects to LMS, activity and assignmentDemo do not)
		//this.simulationMode = "activity";
		//this.simulationMode = "assignment"; 
		this.simulationMode = "assignmentDemo"; 
		
		//General elements
		this.divContent = document.getElementById("content");		//Div containing all the content (simulation content and dynamically generated dialogs)
		this.divActivity = document.getElementById("activity");		//Div containing the simulation content
		this.divCanvas = document.getElementById("canvas");			//Div containing the build diagram canvas
		this.stepNum = document.getElementById("stepNum");			//Step number text
		
		//Learning Management System (LMS) connection
		this.maxConnAttemps = 15;	//Max number of times to attempt to connect to the LMS
		this.connAttempts;			//Current number of attempts made to connect to the LMS
		this.connectedToLMS;		//Whether or not the simulation is currently connected to the LMS
		this.API;					//Reference to the LMS API
		
		//Supporting classes
		this.curScenario;			//Class containing details for the currently active scenario
		this.buildDiagram;			//Class governing canvas-generated diagram on leftside of the activity
		this.componentList;			//Class governing the component table listing all currently installed components, below the build diagram
		this.componentShelf;		//Class governing expandable menu on rightside of the activity
 					
		//Status
		this.curPart;				//Part A (component installation) or part B (wiring connections)
		this.totalScore;			//Total possible score of parts A and B together
		this.scorePartA;			//What the user scored on part A
		this.scorePartB;			//What the user scored on part B
		this.finalScore;			//What the user scored in total
		this.finalScorePercent;		//The total score, as a percentage
		this.imgCheck = "<img src=\"img/general/checkmark.png\" alt=\"Checkmark\" title=\"Checkmark\" style=\"width:15px; height:12px;\" />";
		this.imgX = "<img src=\"img/general/x.png\" alt=\"X\" title=\"X\" style=\"width:12px; height:12px;\" />";
		
		//User interaction	
		this.mouseX;
		this.mouseY;
		this.cursorIsOverDiagram;
		this.interactableComponent = document.getElementById("interactableComponent");
		this.draggableImage = document.getElementById("detailsImageDrag");	
		this.btnInstructions = document.getElementById("btnInstructions");			
		this.btnBuildScenario = document.getElementById("btnBuildScenario");						
		this.btnReset = document.getElementById("btnReset");					
		this.btnSubmit = document.getElementById("btnSubmit");
		
		//Dialogs
		this.dialogOpen;			//Tracks if a dialog is open
		this.activeDialog;			//Tracks which dialog is currently active when one is open
		this.imgExample = "<div class=\"exampleLink\"><img src=\"img/general/instructions_example.png\" alt=\"Click for an example video of these instructions.\" title=\"Click for an example video of these instructions.\" style=\"width:181px; height:136px;\" onclick=\"main.showExampleDialog()\" /></div>";
		this.txtWelcome = "<p>As an IT professional, it’s important that you know how to configure a computer’s hardware system. In this activity, you’ll practice the skills you’ll use when you rebuild a computer.<p><strong>Note:</strong> For best performance, complete this activity on a PC rather than a touchscreen device.</p><h4>Build Scenario</h4>";
		this.txtInstructionsPartA = "<p>In this half of the activity, you will <strong>select and install components in a computer with a pre-installed motherboard</strong>. There are multiple components to choose from, so you may need to do some research to determine which components will work best together and which are most appropriate for the build scenario.</p><p><strong>Note:</strong> Only install as many components as you need for the current build scenario; you don’t have to install a component in every space.<p><h4>To install a component</h4>"+this.imgExample+"<ol><li>Click a component category under the <strong>Component Shelf</strong> menu on the right side of the screen to display all the component options for that category.</li><li>Select a component to see its image and description.</li><li><p>Click and drag the image of the component you want to install to the <strong>Build Assembly</strong> diagram on the left side of the screen.</p><p><strong>Note: </strong>Potential targets  are highlighted as you move the component over the diagram.</p></li><li><p>Release the component over the target  where you want to install it.</p><p>If the component snaps to the diagram, it has been installed. If it returns to the Component Shelf, you can’t install the component at that location.</p></li></ol><h4>To remove an installed component</h4><p>Click an installed component on the Build Assembly diagram once to return it to the Component Shelf.</p><h4>To submit your completed installation</h4><ol><li>Once you are confident you have installed all the necessary components for the build scenario, click the <strong>Submit</strong> button.</li><li><p>Click <strong>Confirm</strong> to complete Part A or click <strong>Cancel</strong> to make further changes.</p><p><strong>Note:</strong> Once you click <strong>Confirm</strong> you can’t change your component selections.</p></li><li><p>Review the feedback on your component selections.</li><li>Click <strong>Continue</strong> to proceed to Part B.</p><p><strong>Note:</strong> Any incorrect selections you made in Part A will be automatically updated to the correct selections for Part B.</p></li></ol>";
		this.txtInstructionsPartB = "<p>In this half of the activity, you will <strong>install the power and data connections</strong> to the correct points on the motherboard and other components so that they function correctly.</p><p><strong>Note:</strong> The connection points from the power supply unit and the data connection cables will be available but not every connection point is necessary for the build scenario. </p><h4>To add a wiring connection</h4>"+this.imgExample+"<ol><li><p>Select connector options from the <strong>Component Shelf</strong> menu.</p><p>A border appears around the selected connector and potential connection targets appear as semi-transparent circles on the Build Assembly diagram. These targets change depending on which connector you select.</p></li><li><p>Click a connection target on the <strong>Build Assembly</strong> diagram.</li><li>Without releasing your mouse, drag your cursor to a second connection target.</p><p>A wire appears as you drag.</p></li><li><p>Stop dragging when you reach the second connection target.</p><p>If the wire remains connected between the two connection targets, the wiring connection was successful. If the wire disappears, the ends of the connector did not fit one or both connections and could not be installed. Use the magnifier button to examine the connection targets on the motherboard and try again.</p></li></ol><h4>To remove wiring connections</h4><ol><li>Make sure no connectors are selected in the <strong>Component Shelf</strong> menu.</li><li><p>On the <strong>Build Assembly</strong> diagram, click the wiring connector target you want to remove once.</p><p>All wiring components connected to that target return to the Component Shelf.</p></li></ol><h4>To submit your completed connections</h4><ol><li>Once you are confident you have made all the necessary connections for the build scenario, click the <strong>Submit</strong> button.</li><li><p>Click <strong>Confirm</strong> to complete Part B or click <strong>Cancel</strong> to make further changes.</p><p><strong>Note: </strong>Once you click <strong>Confirm</strong> you can’t change your connection selections.</p></li><li>Review the feedback on your connection selections.</li></ol>";
		this.txtConfirmPartA = "<p>Are you sure you want to submit your configuration? Once you click <strong>Confirm</strong>, you can’t return to Part A.</p>";
		this.txtConfirmPartB = "<p>Are you sure you want to submit your configuration? Once you click <strong>Confirm</strong>, you can’t return to Part B.</p>";
		this.txtAssignmentComplete = "<p>You have completed this assignment. Your score will be submitted to your instructor once you exit this assignment.</p>";
		this.txtAssignmentCompleteRevisit = "<p>You have already completed this assignment on a previous occasion.</p>";
		this.txtLMSError = "<p>Cannot connect to the Brightspace API. Contact your instructor for assistance.</p><p><strong>Note:</strong> this assignment cannot be previewed in the LOR. It must be added to a course to function properly.</p>";
		this.txtStepFeedback;
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- General ---------------------------------------------- */
	
	init()	
	{	
		//Set up supporting classes
		this.buildDiagram = new BuildDiagram();
		this.componentList = new ComponentList();
		this.componentShelf = new ComponentShelf();
		
		//Set up buttons		
		this.btnInstructions.onclick = () => { this.toggleInstructions(); }	
		this.btnBuildScenario.onclick = () => { this.toggleDialog("Build Scenario", this.txtBuildScenario, "X"); }	
		this.btnReset.onclick = () => { this.resetStep(); }	
		this.btnSubmit.onclick = () => { this.onSubmit(); }

		//Add dragging events
		this.interactableComponent.addEventListener('dragstart', main.handleDragStart, false);
		this.interactableComponent.addEventListener('dragend', main.handleDragEnd, false);
		canvasForeground.src.addEventListener('dragenter', main.handleDragEnter, false);
		canvasForeground.src.addEventListener('dragover', main.handleDragOver, false);
		canvasForeground.src.addEventListener('dragleave', main.handleDragLeave, false);
				
		//Add canvas mouse events
		canvasForeground.src.addEventListener('mousemove', this.onMouseMove, false); 
		this.interactableComponent.addEventListener('mousemove', this.onMouseMove, false); 			
		canvasForeground.src.addEventListener('mousedown', this.onInteractStart, false);	
		canvasForeground.src.addEventListener('mouseup', this.onInteractEnd, false);
		canvasForeground.src.addEventListener('mouseout', this.onInteractEnd, false); 		
		
		//Final steps
		this.componentList.setSimulationMode(this.simulationMode);
		this.chooseScenario();
		if (this.simulationMode != "assignment")
		{
			//If the simulation is not in assignment mode, we don't have to wait for the LMS to connect to get started
			this.reset(); 
		}
		
		//For testing only
		/*this.beginStep();
		this.clearDialog();
		/*this.setDroppedComponent(componentsDetails[3], "cpu");
		this.setDroppedComponent(componentsDetails[5], "ram");
		this.setDroppedComponent(componentsDetails[10], "cardWideA");
		this.setDroppedComponent(componentsDetails[16], "cardWideB");
		this.setDroppedComponent(componentsDetails[17], "cardWideC");
		this.setDroppedComponent(componentsDetails[19], "driveBay");*/
		/*this.setDroppedComponent(componentsDetails[2], "cpu");
		this.setDroppedComponent(componentsDetails[6], "ram");
		this.setDroppedComponent(componentsDetails[11], "cardWideA");
		this.setDroppedComponent(componentsDetails[15], "cardNarrowA");
		this.setDroppedComponent(componentsDetails[20], "driveBay");
		/*this.setDroppedComponent(componentsDetails[0], "cpu");
		this.setDroppedComponent(componentsDetails[9], "ramA");
		this.setDroppedComponent(componentsDetails[12], "cardWideA");
		this.setDroppedComponent(componentsDetails[21], "driveBay");*/
		/*this.setDroppedComponent(componentsDetails[1], "cpu");
		this.setDroppedComponent(componentsDetails[9], "ramA");
		this.setDroppedComponent(componentsDetails[13], "cardWideA");
		this.setDroppedComponent(componentsDetails[22], "driveBay");*/
		/*this.onSubmit();
		this.onSubmitConfirmation();
		this.beginStep();
		this.clearDialog();
		/*this.onSubmit();
		this.onSubmitConfirmation();*/
	}
		
	reset()
	{		
		this.clearDialog();	
		this.curPart = "A";
		this.resetStep();
		this.beginScenario();
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Scenario --------------------------------------------- */
		
	chooseScenario()
	{
		if (this.simulationMode == "activity")
		{			
			this.setupScenario(0);
		}
		else
		{
			//Randomly select a scenario from 1-3
			let randomNum = Math.floor((Math.random() * 3) + 1); 
			//this.setupScenario(randomNum);
			
			this.setupScenario(1); //For testing only
		}		
	}
	
	setupScenario(scenario)
	{		
		switch(scenario)
		{
			case 0:		this.curScenario = new ScenarioOlderComputer(); break;
			case 1:		this.curScenario = new ScenarioThinClient(); break;
			case 2:		this.curScenario = new ScenarioThickClient(); break;
			case 3:		this.curScenario = new ScenarioCADCAM(); break;
		}
		this.buildDiagram.setScenario(scenario);
		
		//Get current build scenario details
		this.txtBuildScenario = this.curScenario.getDescription();
		
		//Lock preselected components		
		let preselectedComponents = this.curScenario.getPreSelectedComponents();		
		for (let i = 0; i < preselectedComponents.length; i++)
		{
			let curComponent = preselectedComponents[i];
			this.componentList.addLockedComponent(curComponent.type, curComponent.name);
		}	
	}
	
	beginScenario()
	{
		//Set heading
		let mode = this.simulationMode;	
		if (mode == "assignmentDemo") mode = "assignment";
		let modeName = mode.charAt(0).toUpperCase() + mode.slice(1); 	//Capitalize mode type for display purposes
		let heading = "Welcome to the Hardware Simulation ("+ modeName+")";
		
		this.toggleDialog(heading, this.txtWelcome + this.txtBuildScenario, "Continue"); 		//Show welcome/build scenario dialog at scenario start		
		this.componentShelf.clearShelfSidebar();												//Start with component shelf sidebar empty
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Step Progression ------------------------------------- */
		
	resetStep()
	{	
		//Reset supporting classes
		this.buildDiagram.reset(this.curPart);
		this.componentList.reset(this.curPart);
		this.componentShelf.reset(this.curPart);
		
		//Reset this class
		this.clearDialog();	
		this.activeDialog = null;
		this.cursorIsOverDiagram = false; 
		this.showPointer(false);	
	}	
	
	beginStep()
	{		
		this.resetStep();
		
		//Setup supporting classes
		this.buildDiagram.setup(this.curPart);
		this.componentShelf.setup(this.curPart, this.curScenario);
		
		//Show part heading and instructions dialog
		if (this.curPart == "A")
		{
			this.stepNum.innerHTML = "Part A";
			this.toggleDialog("Part A Instructions: Installing Components", this.txtInstructionsPartA, "Begin Part A");
		}
		else if (this.curPart == "B")
		{
			this.stepNum.innerHTML = "Part B";
			this.toggleDialog("Part B Instructions: Connecting Cables", this.txtInstructionsPartB, "Begin Part B");
			this.fixIncorrectSelections();
		}
	}	
	
	onSubmit()
	{
		this.buildDiagram.clearMagnification();		
		this.buildDiagram.clearFeedback();
		
		//Show confirmation dialog
		if (this.curPart == "A")
		{
			this.toggleDialog("Confirm Submission", this.txtConfirmPartA, "Confirm");	
		}
		else if (this.curPart == "B")
		{
			this.toggleDialog("Confirm Submission", this.txtConfirmPartB, "Confirm");	
		}
	}
	
	onSubmitConfirmation()
	{
		this.checkAnswers();
		
		//Show feedback dialog
		if (this.curPart == "A")
		{			
			this.toggleDialog("Part A Feedback", this.txtStepFeedback, "Continue");
			this.curPart = "B";
		}
		else if (this.curPart == "B")
		{
			if (this.simulationMode == "activity")
			{
				this.toggleDialog("Part B Feedback", this.txtStepFeedback, "Restart Activity");
			}
			else
			{
				this.toggleDialog("Part B Feedback", this.txtStepFeedback, "End Assignment");
								
				//Calculate final score
				this.finalScore = (this.scorePartA + this.scorePartB);
				this.finalScorePercent = (this.finalScore/this.totalScore) * 100;
				this.finalScorePercent = Math.round(this.finalScorePercent * 100)/100;
				
				//Update LMS with user score and assignment status	
				if (this.simulationMode == "assignment")
				{
					this.updateLMS();
				}					
			}
		}
	}
			
	onCompleted()
	{
		//Show assignment completed dialog
		let scoreTxt = "<p><strong>Final Score: "+this.finalScore+"/"+this.totalScore+" or "+this.finalScorePercent+"%</strong></p>";
		this.toggleDialogCentered("Assignment Complete", scoreTxt + this.txtAssignmentComplete, "");
	}
	
	onRevisitAfterCompletion()
	{
		//Show assignment completed dialog (revisited version)
		this.toggleDialogCentered("Assignment Complete", this.txtAssignmentCompleteRevisit, "");
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Step Evaluation -------------------------------------- */
	
	checkAnswers()
	{
		if (this.curPart == "A")
		{	
			this.checkPartAAnswers();
		}
		else if (this.curPart == "B")
		{
			this.checkPartBAnswers();
		}		
	}
	
	checkPartAAnswers()
	{
		//Calculate score
		let score = this.calculateScore(this.curPart);
		this.scorePartA = score;
		this.totalScore = this.curScenario.getTotalScore(this.curPart);
		
		//Display feedback text
		this.txtStepFeedback = "";
		this.txtStepFeedback += "<p><strong>Score: "+score+"/"+this.curScenario.getTotalScore(this.curPart)+"</strong></p>";	
		this.checkDroppedComponents("CPU", "CPU and CPU Fan");
		this.checkDroppedComponents("RAM", "RAM");
		this.checkDroppedComponents("GPU", "Graphics Cards");
		this.checkDroppedComponents("Cards", "Expansion Cards");
		this.checkDroppedComponents("Drives", "Hard Drives");		
		this.txtStepFeedback += "<p>Click <strong>Continue</strong> to proceed to the second half of the activity.</p>";			
	}
	
	checkPartBAnswers()
	{
		//Calculate score
		let score = this.calculateScore(this.curPart);	
		this.scorePartB = score;
		this.totalScore += this.curScenario.getTotalScore(this.curPart);
		
		//Display feedback text
		this.txtStepFeedback = "";
		this.txtStepFeedback += "<p><strong>Score: "+score+"/"+this.curScenario.getTotalScore(this.curPart)+"</strong></p>";	
		this.checkWiringConnections("PSC", "Power Supply Connectors");
		this.checkWiringConnections("FPC", "Front Panel Connectors");
		this.checkWiringConnections("OC", "Other Connectors");		
		if (this.simulationMode == "activity")
		{		
			this.txtStepFeedback += "<p>Congratulations, you've reached the end of the activity! Click <strong>Restart Activity</strong> to try again.</p>";
		}	
	}	
	
	calculateScore(curPart)
	{
		//Add up score for current part
		let score = 0;
		if (curPart == "A")
		{
			score += this.calculateScoreForCategory("dragDrop", "CPU");
			score += this.calculateScoreForCategory("dragDrop", "RAM");
			score += this.calculateScoreForCategory("dragDrop", "GPU");
			score += this.calculateScoreForCategory("dragDrop", "Cards");
			score += this.calculateScoreForCategory("dragDrop", "Drives");
		}
		else if (curPart == "B")
		{
			score += this.calculateScoreForCategory("wiring", "PSC");
			score += this.calculateScoreForCategory("wiring", "FPC");
			score += this.calculateScoreForCategory("wiring", "OC");
		}	
		return score;
	}
	
	calculateScoreForCategory(type, categoryID)
	{
		//Add up score for selected category
		let score = 0;
		if (type == "dragDrop")
		{
			let selectedComponents = this.componentList.getComponents(categoryID);
			score = this.curScenario.calculateScoreForDragDropCategory(categoryID, selectedComponents);
		}
		else if (type == "wiring")
		{
			let wiringConnections = this.buildDiagram.getWiringConnectionsForCategory(categoryID);
			score = this.curScenario.calculateScoreForWiringCategory(categoryID, wiringConnections);
		}
		return score;
	}
	
	checkDroppedComponents(categoryID, categoryName)
	{		
		//Determine score for category
		let selectedComponents = this.componentList.getComponents(categoryID);
		let score = this.curScenario.calculateScoreForDragDropCategory(categoryID, selectedComponents); 
		let totalScore = this.curScenario.getTotalScoreForCategory(categoryID);
		let strFeedback;

		//Add category heading
		/*if (totalScore == 0)
		{
			strFeedback = "<h4>"+categoryName+"</h4><div class=\"box\">";
		}
		else
		{
			strFeedback = "<h4>"+categoryName+" ("+score+"/"+totalScore+")</h4><div class=\"box\">";
		}*/
		
		//Add category heading
		if (totalScore == 0)
		{
			strFeedback = "<h4>"+categoryName+"</h4><div class=\"box\">";
		}
		else
		{
			strFeedback = "<h4>"+categoryName+" ("+score+"/"+totalScore+")</h4><div class=\"box\">";
		}
				
		//Add selected components heading	
		strFeedback += "<p>Your Answer";
		if (selectedComponents.length> 1) strFeedback += "s";
		strFeedback += ":</p><ul>";
			
		//Add selected components for category and component-specific feedback
		if (selectedComponents.length == 0)
		{
			if (totalScore == 0)
			{
				strFeedback += "<li>"+this.imgCheck+"None selected</li>";
			}
			else
			{
				strFeedback += "<li>"+this.imgX+"None selected</li>";
			}
		}
		else
		{
			for (let i = 0; i < selectedComponents.length; i++)
			{				
				let component = this.curScenario.getEvaluationDetails(categoryID, selectedComponents[i]);
				strFeedback += this.listSelection(component, true);
			}
		}
		strFeedback += "</ul></div>";
		
		//Add correct answer heading
		let correctComponents = this.curScenario.getCorrectOptions(categoryID);
		if ((totalScore == 0) || (score != totalScore))	
		{
			strFeedback += "<div class=\"box\"><p>Correct Answer";
			if (correctComponents.length> 1) strFeedback += "s";
			strFeedback += ":</p><ul>";
		}
			
		//Add correct answers
		if (totalScore == 0)
		{
			strFeedback += "<li>No components were needed for this category in the current build scenario.</li>"
		}
		else if (score != totalScore)
		{		
			//List answers	
			for (let i = 0; i < correctComponents.length; i++)
			{
				let alreadyListed = false;
				for (let j = 0; j < selectedComponents.length; j++)
				{
					if (selectedComponents[j].id == correctComponents[i].id)	alreadyListed = true;
				}	
				if (!alreadyListed)	strFeedback += this.listSelection(correctComponents[i], false);
			}	
		}
		strFeedback += "</ul></div>";	
		
		//Display feedback
		this.txtStepFeedback += strFeedback;
	}
	
	listSelection(component, showCheckOrX)
	{
		let componentName = this.curScenario.getComponentDetails(component).name;
		let strFeedback = "<li>";
		if (showCheckOrX)
		{
			if (component.status == "correct") 
			{
				strFeedback += this.imgCheck;
			}
			else
			{
				strFeedback += this.imgX;
			}
		}				
		strFeedback += "<strong>" +componentName+ "</strong>";
		if (component.feedback)	strFeedback += " - "+component.feedback;
		strFeedback += "</li>";
		return strFeedback;
	}
	
	checkWiringConnections(categoryID, categoryName)
	{
		//Determine score for category
		let wiringConnections = this.buildDiagram.getWiringConnectionsForCategory(categoryID);
		let score = this.curScenario.calculateScoreForWiringCategory(categoryID, wiringConnections); 
		let totalScore = this.curScenario.getTotalScoreForCategory(categoryID);
		let strFeedback = "<h4>"+categoryName+" ("+score+"/"+totalScore+")</h4><div class=\"box\">";
	
		//Add heading	
		let selectedComponents = this.componentList.getComponents(categoryID);	
		strFeedback += "<p>Your Answer";
		if (selectedComponents.length> 1)strFeedback += "s";
		strFeedback += ":</p><ul>";
		
		//Add selected components for category and component-specific feedback
		if (selectedComponents.length == 0)
		{
			strFeedback += "<li>"+this.imgX+"None selected</li>";
		}
		else
		{
			for (let i = 0; i < wiringConnections.length; i++)
			{				
				let conn = wiringConnections[i];
				let comp = this.curScenario.getEvaluationDetails(categoryID, conn.component);
				strFeedback += this.listConnection(comp, conn.target1.id, conn.target2.id, true);
			}
		}
		strFeedback += "</ul></div>";

		//Add Correct Answers
		if (score != totalScore)
		{
			//Add heading
			let correctComponents = this.curScenario.getCorrectOptions(categoryID);		
			strFeedback += "<div class=\"box\"><p>Correct Answer";
			if (correctComponents.length> 1) strFeedback += "s";
			strFeedback += ":</p><ul>";
			
			//List answers
			for (let i = 0; i < correctComponents.length; i++)
			{
				let alreadyListed = false;
				let comp = correctComponents[i]; 
				for (let j = 0; j < wiringConnections.length; j++)
				{
					let conn = wiringConnections[j];
					if ((comp.id == conn.component.id) && 
						(((comp.target1 == conn.target1.id) && (comp.target2 == conn.target2.id)) ||
						 ((comp.target1 == conn.target2.id) && (comp.target2 == conn.target1.id))))
					{
						alreadyListed = true;
					}
				}		
				if (!alreadyListed)	strFeedback += this.listConnection(comp, comp.target1, comp.target2, false);
			}	
			strFeedback += "</ul></div>";	
		}
		strFeedback += "</ul>";					
		
		//Display feedback
		this.txtStepFeedback += strFeedback;
	}
	
	listConnection(component, target1, target2, showCheckOrX)
	{
		let componentName =  this.editDisplayText(this.curScenario.getComponentDetails(component).name);
		componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
		let target1Name = this.editDisplayText(this.buildDiagram.getWiringTarget(target1).name);
		let target2Name = this.editDisplayText(this.buildDiagram.getWiringTarget(target2).name);		
		let strFeedback = "<li>";
		if (showCheckOrX)
		{
			if ((component.status == "correct") && 
				(((component.target1 == target1) && (component.target2 == target2)) ||
				 ((component.target1 == target2) && (component.target2 == target1))))
			{
				strFeedback += this.imgCheck;
			}
			else
			{
				strFeedback += this.imgX;
			}
		}
		strFeedback += "<strong>" + componentName+" connecting the "+target1Name+" to the "+target2Name + "</strong>";
		if (component.feedback)	strFeedback += " - "+component.feedback;
		strFeedback += "</li>";
		return strFeedback;
	}
	
	editDisplayText(txt)
	{
		if (txt.includes("Option"))
		{
			txt = txt.replace("Option", "option");
		}
		else
		{
			txt = txt.toLowerCase();
			txt = txt.replace(" atx ", " ATX ");
			txt = txt.replace("cpu ", "CPU ");
			txt = txt.replace("sata ", "SATA ");
			txt = txt.replace("edie ", "EDIE ");
		}
		
		return txt;
	}
	
	fixIncorrectSelections()
	{
		//Clear drop targets with incorrect components dropped on them
		let dropTargets = this.buildDiagram.getDropTargets();
		let correctComponents = this.curScenario.getAllCorrectOptionsForPartA();
		for (let i = 0; i < dropTargets.length; i++)
		{
			let droppedComponentIsValid = false;
			if (dropTargets[i].isItOccupied())
			{
				let occupyingDragger = dropTargets[i].getOccupyingDragger(); 
				for (let j = 0; j < correctComponents.length; j++)
				{ 
					if (correctComponents[j].id == occupyingDragger.id)
					{
						droppedComponentIsValid = true;
						break;
					}
				}
				
				if (!droppedComponentIsValid) this.removeDroppedComponent(dropTargets[i]);
			} 
		}
		
		//Add correct selection to drop targets
		this.dropCorrectSelectionsForCategory("CPU");	
		this.dropCorrectSelectionsForCategory("RAM");	
		this.dropCorrectSelectionsForCategory("GPU");	
		this.dropCorrectSelectionsForCategory("Cards");	
		this.dropCorrectSelectionsForCategory("Drives");		
	}
	
	dropCorrectSelectionsForCategory(categoryID)
	{	
		//Get correct components and already dropped components
		let correctComponents = this.curScenario.getCorrectOptions(categoryID);
		let droppedComponents = this.componentList.getComponents(categoryID);
				
		//Drop correct components on one of their potential drop targets (if they haven't
		//been already)
		for (let i = 0; i < correctComponents.length; i++)
		{	
			//Check if correct component was already dropped
			let correctComponentWasDropped = false;
			for (let j = 0; j < droppedComponents.length; j++)
			{
				if (correctComponents[i].id == droppedComponents[j].id)
				{
					correctComponentWasDropped = true;
					break;
				}
			}
			
			//If it wasn't, drop it on an unoccupied potential drop targets
			if (!correctComponentWasDropped)
			{
				let component = this.curScenario.getComponentDetails(correctComponents[i]);				
				let potentialDropTargets = component.potentialDropTargets;	
				for (let j = 0; j < potentialDropTargets.length; j++)
				{		
					let dropTarget = main.buildDiagram.getDropTarget(potentialDropTargets[j]);
					if (!dropTarget.isItOccupied())
					{
						this.setDroppedComponent(component, dropTarget.id);
						break;
					}
				}
			}
		}	
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Mouse/Touch Events ----------------------------------- */
	
	onInteractStart(e)
	{
		if (main.dialogOpen) return;
		e.preventDefault(); 
		
		let build = main.buildDiagram;	
		build.clearFeedback();
		if (build.isOverMagnificationButton())
		{
			build.displayMagnification();
		}
		else if (build.isOverMagnifierPanel())
		{
			build.setMagnifierToBeingDragged(true);
		}		
		else if (!build.magnificationIsVisible)
		{
			if (main.curPart == "A")
			{
				//Is mouse over occupied drop target? If so remove component
				if (build.isMouseOverOccupiedDropTarget())
				{ 
					let dropTarget = main.buildDiagram.getActiveTarget();
					main.removeDroppedComponent(dropTarget);
				}
			}
			else if (main.curPart == "B")
			{			
				if (build.isMouseOverTarget())
				{
					if (main.componentShelf.isInteractableComponentSelected())
					{
						let connector = main.componentShelf.getActiveComponent();
						build.startConnection(connector);
					}
					else
					{								
						let activeTarget = build.getActiveTarget().id;
						let connections = build.getWiringConnections();
						for (let i = connections.length - 1; i >= 0; i--)
						{
							let conn = connections[i];
							if ((activeTarget == conn.target1.id) || (activeTarget == conn.target2.id))
							{							
								let component = conn.getConnectingComponent();
								build.clearConnection(conn);
								main.componentList.removeWiringComponent(conn);			
								main.componentShelf.setOptionAsSelected(component, false);
							}			
						}
					}
				}
			}
		}
	}
	
	onInteractEnd(e)
	{
		if (main.dialogOpen) return;		
		let build = main.buildDiagram;	
		if (build.isMagnifierBeingDragged())
		{
			build.setMagnifierToBeingDragged(false);
		}
		
		if (main.curPart == "B")
		{
			//If a connection is currently being drawn
			if (build.isConnectionInProgress())
			{
				//Was the connection successful?
				let component = main.componentShelf.getActiveComponent();
				if (build.endConnection(component))
				{			
					let component = main.componentShelf.getActiveComponent();
					let conn = build.getWiringConnection(component);					
					main.componentList.addWiringComponent(conn);
					main.componentShelf.setOptionAsSelected(component, true);	
					main.enableAllWiringTargets();
				}
			}
		}
	}
	
	onMove()
	{
		if (main.dialogOpen) return;
		let build = main.buildDiagram;	
		if (build.isMagnifierBeingDragged())
		{
			build.updateMagnifierPosition();
		}
		else if ((build.isOverMagnificationButton()) || (build.isOverMagnifierPanel()))
		{
			main.showPointer(true);
		}
		else if (!build.magnificationIsVisible)
		{			
			if (build.isMouseOverTarget()) //Show pointer and info dialog
			{
				main.showPointer(true);
				build.showInfoDialog();
			}
			else //Hide pointer and info dialog
			{		
				main.showPointer(false);
				build.hideInfoDialog();
			}
		}	
		else
		{
			main.showPointer(false);
		}
			
		if (build.isConnectionInProgress())
		{
			main.buildDiagram.drawInProgressConnection();
		}
	}	
	
	onMouseMove(e) 
	{
		if (main.dialogOpen) return;		
		e.preventDefault(); //Prevent dragging of canvas
				
		//Calculate mouse position
		main.mouseX = e.clientX - main.divCanvas.getBoundingClientRect().left;		
		main.mouseY = e.clientY - main.divCanvas.getBoundingClientRect().top;			
		main.onMove();
	}	
	
	showPointer(bool)
	{		
		if (bool)
		{
			canvasForeground.src.classList.add("pointer");
		}
		else
		{
			canvasForeground.src.classList.remove("pointer");
		}
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Dragging and Dropping -------------------------------- */
		
	handleDragStart(e) 
	{	
		if (main.dialogOpen) return;	
		main.buildDiagram.clearMagnification();
		main.buildDiagram.clearFeedback();
		
		//Set up dragging
		let component = e.target;
		component.style.opacity = '0.4';
		main.cursorIsOverDiagram = false; 		
		e.dataTransfer.effectAllowed = 'copymove';
		
		//Swap ghost image for the dragging version of the image
		let img = document.createElement('img');
        img.src = main.draggableImage.src; 
		e.dataTransfer.setDragImage(img, 0, 0);
	}
	
	handleDragEnter(e) 
	{
		if (main.dialogOpen) return;	
		main.cursorIsOverDiagram = true; 
	}
	
	handleDragOver(e) 
	{		
		if (main.dialogOpen) return;	
		main.calculateMousePosition(e);

		//Stop dragging
		if ((main.cursorIsOverDiagram) && (main.buildDiagram.isMouseOverTarget()))			
		{
			if (e.preventDefault) e.preventDefault();
			e.dataTransfer.dropEffect = 'copy';
		}
		else
		{		
			e.dataTransfer.dropEffect = '';
		}
		
		main.onMove();
	}

	handleDragLeave(e) 
	{	
		if (main.dialogOpen) return;		
		main.cursorIsOverDiagram = false;
	}
	
	handleDragEnd(e) 
	{	
		if (main.dialogOpen) return;		
		
		let component = e.target;
		component.style.opacity = '1';
		
		if (main.cursorIsOverDiagram)
		{	
			//Check to make sure component is over a valid drop target and if it can fit
			//on said drop target
			let build = main.buildDiagram;	
			let component = main.componentShelf.getActiveComponent();	
			if ((build.isDraggerOverAcceptableDropTarget(component)) &&
				(main.curScenario.willComponentFitDropTarget(component)))
			{
				let dropTarget = build.getActiveTarget();
				if (dropTarget) main.dropComponent(dropTarget, component);
			}	
			else
			{
				build.showInvalidDropMessage();
			}
			main.cursorIsOverDiagram = false;
		}
	}	
	
	calculateMousePosition(e)
	{
		main.mouseX = e.pageX - main.divCanvas.getBoundingClientRect().left;
		main.mouseY = e.pageY - main.divCanvas.getBoundingClientRect().top;	
	}
	
	setDroppedComponent(component, dropTargetID)
	{
		let dropTarget = this.buildDiagram.getDropTarget(dropTargetID);
		this.dropComponent(dropTarget, component); 
	}
	
	dropComponent(dropTarget, component)
	{
		let build = main.buildDiagram;	
		if (component.id == "RAM5") //If the component is RAM5, it occupies two drop targets
		{
			let dropTargetRamA = build.getDropTarget("ramA");
			let dropTargetRamB = build.getDropTarget("ramB");
			main.removeDroppedComponent(dropTargetRamA);
			main.removeDroppedComponent(dropTargetRamB);
			build.addComponent(dropTargetRamA, component);
			dropTargetRamB.enable(false); //Disable so this target cannot be used
		}
		else //All other components occupy a single drop target
		{		
			main.removeDroppedComponent(dropTarget);	
			build.addComponent(dropTarget, component);
		}
		main.componentList.addComponent(component);
		main.componentShelf.setOptionAsSelected(component, true);
	}
	
	removeDroppedComponent(dropTarget)
	{
		let build = main.buildDiagram;	
		if ((dropTarget) && (dropTarget.isItOccupied()))
		{
			let droppedComponent = dropTarget.getOccupyingDragger();			
			if (droppedComponent.id == "RAM5") //If the component is RAM5, it was occupying two drop targets
			{
				let dropTargetRamA = build.getDropTarget("ramA");
				let dropTargetRamB = build.getDropTarget("ramB");
				build.removeComponent(dropTargetRamA);
				dropTargetRamB.enable(true); //Renable this target
			}
			else //All other components only occupied a single drop target
			{
				build.removeComponent(dropTarget);
			}
			main.componentList.removeComponent(droppedComponent);
			main.componentShelf.setOptionAsSelected(droppedComponent, false);
			main.showPointer(false);
		}
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Wire Connections ------------------------------------- */
		
	limitWiringTargets(selectedConnector)
	{
		if (this.curPart != "B") return;
		
		main.buildDiagram.enableAllTargets("wiring", false);			
		main.buildDiagram.enableTarget(selectedConnector.fixedStart, true);
		main.buildDiagram.draw();
	}
	
	enableAllWiringTargets()
	{
		if (this.curPart != "B") return;
		
		this.buildDiagram.enableAllTargets("wiring", true);
		this.buildDiagram.draw();
	}
	
	limitToNonPartialWiringTargets()
	{
		this.enableAllWiringTargets();
		this.buildDiagram.disablePartialWiringTargets();
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Dialogs ---------------------------------------------- */
	
	//In this case the popup is a dynamically created div that sits in front of the other activity 
	//content, not a browser dialog
	toggleDialog(heading, txt, btnLabel)
	{
		if (this.divDialog) //Dialog already open
		{
			this.clearDialog();
			
			//A different dialog was open - run this function once more to show the new dialog
			if (this.activeDialog != heading)
			{
				this.toggleDialog(heading, txt, btnLabel);
			}
		}
		else //Dialog NOT already open
		{
			this.showDialog(heading, txt, btnLabel);
			this.activeDialog = heading;
		}
	}
	
	toggleDialogCentered(heading, txt, btnLabel)
	{
		this.toggleDialog(heading, txt, btnLabel);
		this.divDialog.classList.add("complete");
	}
	
	showDialog(heading, txt, btnLabel)
	{
		if (this.dialogOpen) this.clearDialog();
		
		//Create popup div
		this.divDialog = document.createElement("div");	
		this.divDialog.id = "dialog";
		this.dialogOpen = true;
		
		//Populate dialog
		if (btnLabel == "")
		{
			this.populateDialogWithNoButton(heading, txt);
		}
		else if (btnLabel == "X")
		{
			this.populateDialogWithTopButton(heading, txt);
		}
		else
		{
			this.populateDialogWithBottomButton(heading, txt, btnLabel);
			if (heading.includes("Feedback"))
			{
				this.divDialog.classList.add("feedback");
			}
		}
						
		//Position dialog
		this.divDialog.style.width = (this.divActivity.offsetWidth*0.9)+"px"; //Sets width
		this.divDialog.style.marginLeft = ((this.divActivity.offsetWidth * 0.1) / 2) +"px";  //Centres activity horizontally 
		
		//Fade everything behind the pop-up dialog, disable buttons and active inputs
		this.fadeElem(this.divActivity, true);		
		this.lockAllnteractiveElements(true);	
	}
	
	populateDialogWithNoButton(heading, txt)
	{			
		//Add heading and text, append to dialog
		if (heading) this.divDialog.innerHTML += "<h3>"+heading+"</h3>";
		if (txt) this.divDialog.innerHTML += txt;	
		this.divContent.appendChild(this.divDialog);
	}
	
	populateDialogWithTopButton(heading, txt)
	{
		//Add close button
		let btn = document.createElement("button");
		btn.type = "button";
		btn.id = "btnClose";
		let txtContent = document.createTextNode("x");
		btn.appendChild(txtContent);	
		this.divDialog.appendChild(btn);
				
		//Add heading and text, append to dialog
		if (heading) this.divDialog.innerHTML += "<h3>"+heading+"</h3>";
		if (txt) this.divDialog.innerHTML += txt;	
		this.divContent.appendChild(this.divDialog);
		
		//Add button event
		let btnClose  = document.getElementById("btnClose");
		btnClose.onclick = () => { this.clearDialog(); }
	}
	
	populateDialogWithBottomButton(heading, txt, btnLabel)
	{
		//Add heading and text
		if (heading) this.divDialog.innerHTML += "<h3>"+heading+"</h3>";
		if (txt) this.divDialog.innerHTML += txt;	
				
		//Add continue button	
		let btn = document.createElement("button");
		btn.type = "button";
		btn.id = "btnContinue";
		let txtContent = document.createTextNode(btnLabel);
		btn.appendChild(txtContent);	
		this.divDialog.appendChild(btn);
		
		//Add cancel button
		if (btnLabel == "Confirm")
		{
			btn = document.createElement("button");
			btn.type = "button";
			btn.id = "btnCancel";
			let txtContent = document.createTextNode("Cancel");
			btn.appendChild(txtContent);	
			this.divDialog.appendChild(btn);
		}
				
		//Append to dialog
		this.divContent.appendChild(this.divDialog);
		
		//Add button event		
		let btnContinue  = document.getElementById("btnContinue");
		if (btnLabel == "Continue")
		{	
			btnContinue.onclick = () => { this.beginStep(); }	
		}
		else if (btnLabel == "Confirm")
		{	
			btnContinue.onclick = () => { this.onSubmitConfirmation(); }	
			let btnCancel  = document.getElementById("btnCancel");
			btnCancel.onclick = () => { this.clearDialog(); }	
		}
		else if (btnLabel == "Restart Activity")
		{	
			btnContinue.onclick = () => { this.reset(); }	
		}
		else if (btnLabel == "End Assignment")
		{	
			btnContinue.onclick = () => { this.onCompleted(); }	
		}
		else
		{
			btnContinue.onclick = () => { this.clearDialog(); }	
		}
	}
	
	clearDialog()
	{
		//Remove popup
		if (this.dialogOpen) this.divContent.removeChild(this.divDialog);
		this.divDialog = null;
		this.dialogOpen = false;
		
		//Remove fade, re-enable buttons and active inputs
		this.fadeElem(this.divActivity, false);
		this.lockAllnteractiveElements(false);	
	}
	
	toggleInstructions()
	{
		if (this.curPart == "A")
		{			
			this.toggleDialog("Part A Instructions: Component Installation", this.txtInstructionsPartA, "X");
		}
		else if (this.curPart == "B")
		{			
			this.toggleDialog("Part B Instructions: Connecting Cables", this.txtInstructionsPartB, "X");
		}
	}	
	
	lockAllnteractiveElements(bool)
	{
		this.componentShelf.enableMenu(bool);
		
		let buttons = this.divContent.getElementsByTagName('button');
		for (let i = 0; i < buttons.length; i++)
		{ console.log(buttons[i]);
			let btn = document.getElementById(buttons[i].id); 
			if ((btn.id != "btnClose") && (btn.id != "btnContinue") && (btn.id != "btnCancel"))
			{
				btn.disabled = bool;
			}
		}
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
	
	showExampleDialog()
	{		
		//Create dialog
		this.clearExampleDialog();
		this.divDialogExample = document.createElement("div");	
		this.divDialogExample.id = "dialogExample";
				
		//Add close button
		let btnClose = document.createElement("button");
		btnClose.type = "button";
		btnClose.id = "btnCloseExample";
		let txtContent = document.createTextNode("x");
		btnClose.appendChild(txtContent);	
		this.divDialogExample.appendChild(btnClose);
				
		//Add video 
		let vid = document.createElement("video");
		vid.width = 960;
		vid.height = 540;
		vid.controls = true;
		let vidName; 
		if (this.curPart == "A")
		{
			vidName = "instructions_installation";
		}
		else if (this.curPart == "B")
		{
			vidName = "instructions_wiring";
		}	
		
		//Add video sources	
		let sourceMP4 = document.createElement("source");
		sourceMP4.src = "vids/"+vidName+".mp4";
		sourceMP4.type="video/mp4";	
		vid.appendChild(sourceMP4);
		let sourceWebm = document.createElement("source");
		sourceWebm.src = "vids/"+vidName+".webm";
		sourceWebm.type="video/webm";	
		vid.appendChild(sourceWebm);
		let sourceOGG = document.createElement("source");
		sourceOGG.src = "vids/"+vidName+".ogg";
		sourceOGG.type="video/ogg";	
		vid.appendChild(sourceOGG);

		//Add and position dialog
		this.divDialogExample.appendChild(vid);		
		this.divContent.appendChild(this.divDialogExample);
		this.divDialogExample.style.width = (this.divActivity.offsetWidth*0.9)+"px"; //Sets width
		this.divDialogExample.style.marginLeft = ((this.divActivity.offsetWidth * 0.1) / 2) +"px";  //Centres activity horizontally 
				
		//Add button event
		btnClose  = document.getElementById("btnCloseExample");
		btnClose.onclick = () => { this.clearExampleDialog(); }
	}
	
	clearExampleDialog()
	{
		if (this.divDialogExample) this.divContent.removeChild(this.divDialogExample);
		this.divDialogExample = null;
	}


	/* ------------------------------------------------------------ */
	/* ----- Prepping LMS Communication --------------------------- */
	
	connectToLMS()
	{
		//Don't worry about connecting to the LMS if the simulation is not set to assignment mode
		if (main.simulationMode != "assignment") return;
		
		this.connAttempts = 0;
		this.connectedToLMS = false;
		this.API = null;
		main.toggleDialogCentered("Loading...", "", "");
		
		this.attemptToConnect();
	}
	
	attemptToConnect()
	{			
		main.connAttempts++;		
		main.getAPI(window);		
		if (this.API == null) //LMS API not found
		{
			if(main.connAttempts < main.maxConnAttemps)
			{
				setTimeout(main.attemptToConnect, 250); //Try to connect again after a slight delay
			}
			else
			{ 
				console.log("connection: unsuccessful"); //For testing only
				
				//Show error message dialog (revisited version)
				main.toggleDialogCentered("Connection Error", main.txtLMSError, "");
			}
		}
		else //LMS API found
		{
			this.connectedToLMS = true;
			let result = this.LMSInitialize();
			console.log("connection: successful") //For testing only
			//console.log(result, this.LMSGetValue("cmi.core.student_name")); //For testing only
			
			if (this.getLessonStatus() == "completed") //Don't let them start the simulation
			{
				this.onRevisitAfterCompletion();
			}
			else //Start the simulation
			{
				this.reset();	
			}
		}
	}
	
	getAPI(win)
	{
		if ((win.parent != null) && (win.parent != win))
		{
			this.API = this.scanForAPI(win.parent);
		}
		if ((this.API == null) && (win.opener != null))
		{
			this.API = this.scanForAPI(win.opener);
		}
		//console.log("API: "+this.API);
	}
	
	scanForAPI(win)
	{
		let nTries = 0;
		while ((win.API == undefined) && (win.parent != null) && (win.parent != win))
		{
			nTries = nTries++;
			if (nTries > 99)
			{
				return null;
			}
			win = win.parent;
		}
	   return win.API;
	}	
	
	isItConnectedToLMS()
	{
		if (this.connectedToLMS)
		{
			return true;
		}
		return false;
	}
	
	updateLMS()
	{			
		if(this.isItConnectedToLMS())
		{			
			//Submit user score as a percentage
			this.setScoreRange(0, 100);			
			this.setScore(this.finalScorePercent);				

			//Mark assignment as completed
			this.setLessonStatus("completed");
		}
	}
	
	setLessonStatus(status)
	{		
		//Status options: passed, completed, failed, incomplete, browsed, not attempted
		this.LMSSetValue("cmi.core.lesson_status", status);
	}
	
	getLessonStatus()
	{
		let status = this.LMSGetValue("cmi.core.lesson_status");
		return status;
	}
		
	setScoreRange (min, max)
	{  
		this.LMSSetValue("cmi.core.score.min", ""+min);
		this.LMSSetValue("cmi.core.score.max", ""+max);
	}
		
	setScore(score) 
	{
		this.LMSSetValue("cmi.core.score.raw", ""+score);
	}
			
	getScore()
	{
		let score = this.LMSGetValue("cmi.core.score.raw");
		return score;
	}

	disconnectFromLMS()
	{
		if (this.isItConnectedToLMS())
		{
			this.LMSFinish();
			this.connectedToLMS = false;
		}
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Talking to LMS --------------------------------------- */
	
	LMSInitialize()
	{
		if(this.isItConnectedToLMS())
		{
			return this.API.LMSInitialize("");
		}
	}
		
	LMSGetValue(cmdString)
	{
		if(this.isItConnectedToLMS())
		{
			let value = this.API.LMSGetValue(cmdString);
			if(value == "")
			{
				let errCode = this.LMSGetLastError();
				if(errCode!=0)
				{
					let errStr = this.LMSGetErrorString(errCode);
					console.log("Error retrieving value for " + cmdString + ". " + errStr);
				}
			}
			return value;
		}
	}
		
	LMSSetValue(cmdString, value)
	{
		if (this.isItConnectedToLMS())
		{
			let errCode = "";
			let errStr = "";
			let success = this.API.LMSSetValue(cmdString, value); 
			if(success == "false")
			{
				errCode = this.LMSGetLastError();
				errStr = this.LMSGetErrorString(errCode);
				//console.log("Error setting value for " + cmdString + " // " + errStr); //For testing only
			}
			else
			{	
				success = this.LMSCommit();
				if (success == "false")
				{
					errCode = this.LMSGetLastError();
					errStr = this.LMSGetErrorString(errCode);
					//console.log("Error committing value for " + cmdString + ". " + errStr); //For testing only
				}
				else
				{
					console.log("commit:", cmdString, value); //For testing only
				}
			}
			return success;
		}		
	}
		
	LMSCommit()
	{
		if (this.isItConnectedToLMS())
		{
			return this.API.LMSCommit("");
		}		
	}
	
	LMSGetLastError()
	{
		if(this.isItConnectedToLMS())
		{
			return this.API.LMSGetLastError();
		}
	}
		
	LMSGetErrorString(errorNumber)
	{
		if(this.isItConnectedToLMS())
		{
			return this.API.LMSGetErrorString(errorNumber);
		}
	}

	LMSFinish()
	{
		if(this.isItConnectedToLMS())
		{
			return this.API.LMSFinish("");
		}			
	}
}
const main = new Main();
main.init();