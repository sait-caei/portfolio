class Slide12 extends QuestionSlide
{
	constructor() 
	{	
		super();
		
		//General
		this.slideType = this.slideTypeQuestion;
		this.questionType = this.questionTypeMultiple;
		this.selectionType;
		this.answerType = this.answerTypeIcons; 
		this.submissionType = this.submissionTypeUnlimited;
		this.curQuestion;
		this.txtSectionHeading = "Urgent Care Centre";
		this.txtHeading = "Instructions";
		this.txt = "Click on the icons of equipment attached to George to answer some questions about the health care workers who are trained \nto use that equipment.";
		this.txtHeadingComplete = "Questions Complete"
		this.txtComplete = "You have correctly answered all of the questions. Click the Next button to proceed.";
		
		//Icons
		this.posIconNC = {x:this.pos.x + 148, y:this.pos.y + 185};
		this.posIconECG = {x:this.pos.x + 323, y:this.pos.y + 184};
		this.posIconVAC = {x:this.pos.x + 98, y:this.pos.y + 430};
		this.posIconIV = {x:this.pos.x + 365, y:this.pos.y + 430};
		this.posLineNC = {x:this.posIconNC.x + 42, y:this.posIconNC.y + 60};
		this.posLineECG = {x:this.posIconECG.x - 30, y:this.posIconECG.y + 60};
		this.posLineVAC = {x:this.posIconVAC.x + 42, y:this.posIconVAC.y - 60};
		this.posLineIV = {x:this.posIconIV.x + 8, y:this.posIconIV.y - 50};
				
		//Question 1A
		this.txtHeading1A = "Question: 1 of 2";
		this.txtQuestion1A = "Which provider is primarily responsible for assessing and providing patients with oxygen therapy?";
		this.answer11A = "RRT";
		this.answer21A = "RN";
		this.answer31A = "MD";
		this.answer41A = "MRT";
		this.possibleAnswers1A = [this.answer11A, this.answer21A, this.answer31A, this.answer41A];
		this.correctAnswers1A = [this.answer11A];
		this.txtCorrectFeedback1A = "<b>That's correct!<bend> Click the Continue button to proceed to the next question.";
		
		//Question 1B
		this.txtHeading1B = "Question: 2 of 2";
		this.txtQuestion1B = "There is overlap in this task. Who else can apply oxygen therapy?";
		this.answer11B = "RN";
		this.answer21B = "MD";
		this.answer31B = "MRT";
		this.possibleAnswers1B = [this.answer11B, this.answer21B, this.answer31B];
		this.correctAnswers1B = [this.answer11B, this.answer21B];
		this.txtCorrectFeedback1B = "<b>That's correct!<bend> Click the Return button and select any remaining equipment in the activity.";
		
		//Question 2A
		this.txtHeading2A = this.txtHeading1A;
		this.txtQuestion2A = "Which provider is primarily responsible for intravenous therapy?";
		this.answer12A = "PCP";
		this.answer22A = "RN";
		this.answer32A = "RRT";
		this.answer42A = "NMT";
		this.possibleAnswers2A = [this.answer12A, this.answer22A, this.answer32A, this.answer42A];
		this.correctAnswers2A = [this.answer22A];
		this.txtCorrectFeedback2A = this.txtCorrectFeedback1A; 
		
		//Question 2B
		this.txtHeading2B = this.txtHeading1B;
		this.txtQuestion2B = "Who else could place an IV?";
		this.answer12B = "PCP";
		this.answer22B = "RRT";
		this.answer32B = "NMT";
		this.possibleAnswers2B = [this.answer12B, this.answer22B, this.answer32B];
		this.correctAnswers2B = [this.answer12B, this.answer22B, this.answer32B];
		this.txtCorrectFeedback2B = this.txtCorrectFeedback1B; 
		
		//Question 3
		this.txtHeading3 = "Question: 1 of 1";
		this.txtQuestion3 = "In this setting, the nurse is the primary health care professional that would place the ECG leads. Who else is trained to \nperform an ECG, either within or outside of a hospital setting?";
		this.answer13 = "MRT";
		this.answer23 = "DMS";
		this.answer33 = "MDRT";
		this.answer43 = "MLA";
		this.possibleAnswers3 = [this.answer13, this.answer23, this.answer33, this.answer43];
		this.correctAnswers3 = [this.answer43];
		this.txtCorrectFeedback3 = "<b>That's correct.<bend>  The PCP, ACP, and RRT are also trained to perform an ECG. Click the Return button and select any \nremaining equipment in the activity"; 
		
		//Question 4
		this.txtHeading4 = this.txtHeading3;
		this.txtQuestion4 = "Blood is collected to assess the patient's condition. What healthcare profession(s) might interpret the results of the blood \ntest?";
		this.answer14 = "MLT";
		this.answer24 = "MLA";
		this.answer34 = "MD";
		this.answer44 = "MOA";
		this.possibleAnswers4 = [this.answer14, this.answer24, this.answer34, this.answer44];
		this.correctAnswers4 = [this.answer14, this.answer34];
		this.txtCorrectFeedback4 = this.txtCorrectFeedback1B;
		
		//Question progress
		this.question1Started;
		this.question2Started;
		this.question3Started;
		this.question4Started;
		this.question1Complete;
		this.question2Complete;
		this.question3Complete;
		this.question4Complete;
				
		
		this.answer14 = "MLT";
		this.answer24 = "MLA";
		this.answer34 = "MD";
		this.answer44 = "MOA";
		
		//Glossary
		this.curTerms = ["Registered Respiratory Therapist", "Registered Nurse", "Medical Doctor", "Physician", "Medical Radiologic Technologist", "Primary Care Paramedic", "Nuclear Medicine Technologist", "Diagnostic Medical Sonographer", "Medical Device Reprocessing Technician", "Medical Laboratory Assistant", "Registered Medical Laboratory Technologist", "Medical Laboratory Technologist", "Medical Office Assistant"];
		
		this.init();
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Slide-Specific Actions ------------------------------- */
	
	loadImages()
	{		
		this.totalImages = 43;	
		this.loadBackgroundImage("bg8");
		this.loadDialogIconImage("ECG", "Equipment");
		this.loadDialogIconImage("IV", "Equipment");
		this.loadDialogIconImage("NC", "Equipment");
		this.loadDialogIconImage("VAC", "Equipment");
		this.loadOptionIconImage("DMS");
		this.loadOptionIconImage("MD");
		this.loadOptionIconImage("MLA");
		this.loadOptionIconImage("MLT");
		this.loadOptionIconImage("MOA");
		this.loadOptionIconImage("MRT");
		this.loadOptionIconImage("NMT");
		this.loadOptionIconImage("MDRT");
		this.loadOptionIconImage("PCP");
		this.loadOptionIconImage("RN");
		this.loadOptionIconImage("RRT");
		this.loadEnvironmentIconImages("ECG", "Equipment");
		this.loadEnvironmentIconImages("IV", "Equipment");
		this.loadEnvironmentIconImages("NC", "Equipment");
		this.loadEnvironmentIconImages("VAC", "Equipment");	
		this.loadIndicatorImage("ECG");	
		this.loadIndicatorImage("IV");	
		this.loadIndicatorImage("NC");	
		this.loadIndicatorImage("VAC");			
				
		super.loadImages();
	}
	
	loadIndicatorImage(id)
	{
		this["imgLine"+id] = new Image();
		this["imgLine"+id].src = "img/icons/equipment/"+id+"_line.png"; 
		this["imgLine"+id].onload = () => { this.onImageLoaded(); }
	}
	
	setup()
	{			
		let icon1 = this.addEnvironmentIcon("NC", "", this.posIconNC, this.imgEnviroNCInactive, this.imgEnviroNCActive);
		let icon2 = this.addEnvironmentIcon("IV", "", this.posIconIV, this.imgEnviroIVInactive, this.imgEnviroIVActive);
		let icon3 = this.addEnvironmentIcon("ECG", "", this.posIconECG, this.imgEnviroECGInactive, this.imgEnviroECGActive);	
		let icon4 = this.addEnvironmentIcon("VAC", "", this.posIconVAC, this.imgEnviroVACInactive, this.imgEnviroVACActive);					
		//Prep progression conditions
		this.question1Started = false;
		this.question2Started = false;
		this.question3Started = false;
		this.question4Started = false;
		this.question1Complete = false;
		this.question2Complete = false;
		this.question3Complete = false;
		this.question4Complete = false;
		
		this.addDialog("", this.txtHeading, this.colourDefault, this.txt, "Start");
		
		super.setup();
	}

	/* ------------------------------------------------------------ */
	/* ----- Slide Navigation ------------------------------------- */
	
	onContinue()
	{
		this.clearDialog();		
		
		if (this.curQuestion)
		{
			//Remove answer icons
			this.removeAllDialogInteractables();
			this.clearSelectedItems();
							
			//Add question dialog
			this.selectionType = this.selectionTypeMultiple;		
			switch (this.curQuestion)
			{
				case "1A":	this.curQuestion = "1B"; break;				
				case "2A":	this.curQuestion = "2B"; break;				
			}	
			this.addQuestionDialog();
		}
		else
		{
			this.setInteractablesAsActive(true);
		}
	}
	
	onReturn()
	{
		//Remove dialog and answer icons
		this.clearDialog();		
		this.removeAllDialogInteractables();
		this.clearSelectedItems();
		
		//Re-activate question icons
		this.setEnvironmentInteractablesAsActive(true);
						
		//Update progression
		switch (this.curQuestion)
		{
			case "1B":	this.question1Complete = true; break;
			case "2B":	this.question2Complete = true; break;
			case "3":	this.question3Complete = true; break;
			case "4":	this.question4Complete = true; break;
		}
		if ((this.question1Complete) && (this.question2Complete) &&
			(this.question3Complete) && (this.question4Complete))
		{
			this.setCompletionStatus(true);
			this.addDialog("", this.txtHeadingComplete, this.colourDefault, this.txtComplete, "");
		}
		this.curQuestion = "";
	}
	
	onIconClicked(icon)
	{	
		let iconID = icon.getProperID();
		this.removeFromInteractables(icon);
			
		//Add question dialog		
		this.selectionType = this.selectionTypeSingle;		
		switch (iconID)
		{
			case "NC":	this.curQuestion = "1A"; break;				
			case "IV":	this.curQuestion = "2A"; break;				
			case "ECG":	this.curQuestion = "3";	break;				
			case "VAC":	
				this.curQuestion = "4";	
				this.selectionType = this.selectionTypeMultiple;	
				break;
		}	
		
		//Update progression
		switch (this.curQuestion)
		{
			case "1A":	this.question1Started = true; break;
			case "2A":	this.question2Started = true; break;
			case "3":	this.question3Started = true; break;
			case "4":	this.question4Started = true; break;
		}
		
		this.addQuestionDialog();
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Dialogs ---------------------------------------------- */
	
	addQuestionDialog()
	{	
		let txt = this["txtQuestion"+this.curQuestion];
		let heading = this["txtHeading"+this.curQuestion];
		this.dialog = new QuestionDialog(this.posDialog, this.dialogWidth, this.selectionType, "", heading, this.colourDefault, txt, "Submit");
		this.setupDialog();
		this.dialog.setCorrectFeedback(this["txtCorrectFeedback"+this.curQuestion]);
		
		//Add answers icons
		this.addAnswerIcons();	
		this.dialog.addSpaceForIconsAndFeedback();
		
		//Deactivate questions icons
		this.setEnvironmentInteractablesAsActive(false);
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Question Evaluation ---------------------------------- */
	
	evaluateIconQuestion()
	{					
		//Check answer
		let isCorrect = false;
		if (this.selectionType == this.selectionTypeSingle)
		{					
			let selectedAnswer = this.itemsThatAreCurrentlySelected[0];
			isCorrect = this.checkIfAnswerIsCorrect(selectedAnswer);		
		}
		else if (this.selectionType == this.selectionTypeMultiple)
		{			
			isCorrect = this.checkIfSelectedAnswersAreCorrect();
		}
		this.displayIconQuestionFeedback(isCorrect);
		
		//Update button
		if (isCorrect)
		{
			this.removeDialogButtons();
			if (this.curQuestion.includes ("A"))
			{
				this.addDialogButton("Continue");
			}
			else
			{
				this.addDialogButton("Return");
			}
		}
	}
	
		
	/* ------------------------------------------------------------ */
	/* ----- Question Feedback ------------------------------------ */
	
	displayIconQuestionFeedback(isCorrect)
	{
		if (this.selectionType == this.selectionTypeSingle)
		{				
			this.dialog.setFeedbackType(isCorrect);
			this.dialog.setFeedbackToVisible(true);
		}
		else if (this.selectionType == this.selectionTypeMultiple)
		{			
			super.displayIconQuestionFeedback(isCorrect);
		}
	}
		
	
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	draw()
	{
		this.drawIndicatorLines();
		
		super.draw(); 				
	}
	
	drawIndicatorLines()
	{
		if (!this.question1Started)	canvasMidground.drawImage(this.imgLineNC, this.posLineNC);
		if (!this.question2Started)	canvasMidground.drawImage(this.imgLineIV, this.posLineIV);
		if (!this.question3Started)	canvasMidground.drawImage(this.imgLineECG, this.posLineECG);
		if (!this.question4Started)	canvasMidground.drawImage(this.imgLineVAC, this.posLineVAC);
	}
}