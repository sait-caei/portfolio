class Slide15 extends QuestionSlide
{
	constructor() 
	{	
		super();
		
		//General
		this.slideType = this.slideTypeQuestion;
		this.questionType = this.questionTypeSingle;
		this.selectionType = this.selectionTypeSingle;
		this.answerType = this.answerTypeIcons;
		this.submissionType = this.submissionTypeUnlimited;
		this.txtSectionHeading = "Transport";
		this.txtHeading = "Question:";
		this.txtQuestion = "There are two options for transferring patients to acute settings. Which option would be the best transportation method for \nGeorge?";
		this.posExterior = {x: this.pos.x, y: this.pos.y - 400};
				
		//Answers
		this.answer1 = "Ambulance";
		this.answer2 = "Helicopter";
		this.possibleAnswers = [this.answer1, this.answer2];
		this.correctAnswers = [this.answer2];
		
		//Feedback
		this.txtFeedbackAmbulance = "Ground transport could take too long if there is a large distance between the facilities.  \nAdditionally, George’s diagnosis suggests that his condition could deteriorate rapidly. He needs \nto be transported as quickly as possible.";
		this.txtFeedbackHelicopter = "Given George’s urgent condition, air transport is the optimal choice. It is much faster because \nit allows the transport team to avoid geographical and traffic conditions that can delay transport \nto the new hospital.";
				
		//Glossary
		this.curTerms = [];
		
		this.init(); 
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Slide-Specific Actions ------------------------------- */
	
	loadImages()
	{		
		this.totalImages = 9;
		this.loadOptionIconImage("Ambulance", "Vehicles");	
		this.loadOptionIconImage("Helicopter", "Vehicles");

		//Exterior image
		this.imgExterior = new Image();
		this.imgExterior.src = "img/backgrounds/bg9.png"; 
		this.imgExterior.onload = () => { this.onImageLoaded(); }
				
		super.loadImages();
	}
	
	setup()
	{			
		//Display dialog
		this.addQuestionDialog("", this.txtHeading, this.colourDefault, this.txtQuestion);	
		
		super.setup();
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Dialogs ---------------------------------------------- */
		
	addQuestionDialog(iconName, txtHeading, headingColour, txt)
	{
		super.addQuestionDialog(iconName, txtHeading, headingColour, txt);
		this.dialog.setBackgroundToFaded(false);		
	}	
	
	addFeedbackDialog(imgIcon, txtHeading, headingColour, txt, btnType)
	{		
		super.addFeedbackDialog(imgIcon, txtHeading, headingColour, txt, btnType);
		this.dialog.setBackgroundToFaded(false);
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	draw()
	{
		super.draw(); 
		
		canvasBackground.drawImage(this.imgExterior, this.posExterior);		
	}
}