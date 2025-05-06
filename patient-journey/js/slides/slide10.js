class Slide10 extends QuestionSlide
{
	constructor() 
	{	
		super();
		
		//General
		this.slideType = this.slideTypeQuestion;
		this.questionType = this.questionTypeSingle;
		this.selectionType = this.selectionTypeMultiple;
		this.answerType = this.answerTypeText;
		this.submissionType = this.submissionTypeUnlimited;	
		this.txtSectionHeading = "Urgent Care Centre";
		this.txtHeading = "Question:"
		this.txtQuestion = "The medical office assistant (MOA) does which of the following? Select all that apply.";
		
		//Animation
		this.intervalAnimation;
		this.intervalFrequency = 1;
		this.increment = -1.25;
		this.posHospital;
		this.posStart = {x: this.pos.x, y: this.pos.y};
		this.posEnd = {x: this.posStart.x - 1030, y: this.posStart.y};
		
		//Icons
		this.icon1;
		this.icon2;
		this.icon3;
		this.posIcon1;
		this.posIcon2;
		this.posIcon3;
		
		//Answers
		this.answer1 = "Educates patients on medications";
		this.answer2 = "Collects personal information on a patient";
		this.answer3 = "Collects data and contributes to quality improvement";
		this.answer4 = "Answers phones and performs administrative duties";
		this.possibleAnswers = [this.answer1, this.answer2, this.answer3, this.answer4];
		this.correctAnswers = [this.answer2, this.answer3, this.answer4];
				
		//Glossary
		this.curTerms = ["Medical Office Assistant"];
		
		this.init();
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Slide-Specific Actions ------------------------------- */
	
	loadImages()
	{		
		this.totalImages = 13;
		this.loadDialogIconImage("Patient");
		this.loadDialogIconImage("MOAb", "MOA");
		this.loadEnvironmentIconImages("RNb", "RN");
		this.loadEnvironmentIconImages("PCPACPb", "PCPACP");
		this.loadEnvironmentIconImages("QuestionMOAb", "MOA"); 
		
		//Hospital panning image		
		this.imgHospital = new Image();
		this.imgHospital.src = "img/backgrounds/bg6.png"; 
		this.imgHospital.onload = () => { this.onImageLoaded(); }
		
		super.loadImages();
	}
	
	reset()
	{
		super.reset();
		
		this.posHospital = this.posStart;
	}
	
	setup()
	{				
		//Add icons
		this.posIcon1 = {x:this.posStart.x + 70, y:this.posStart.y + 150};
		this.posIcon2 = {x:this.posStart.x + 520, y:this.posStart.y + 150};
		this.posIcon3 = {x:this.posStart.x + 1135, y:this.posStart.y + 150};
		this.icon1 = this.addEnvironmentIcon("RNb", "Registered Nurse (RN)", this.posIcon1, this.imgEnviroRNbInactive, this.imgEnviroRNbActive);
		this.icon2 = this.addEnvironmentIcon("PCPACPb", "Paramedic (PCP/ACP)", this.posIcon2, this.imgEnviroPCPACPbInactive, this.imgEnviroPCPACPbActive);
		this.icon3 = this.addEnvironmentIcon("Question", "Medical Office Assistant (MOA)", this.posIcon3, this.imgEnviroQuestionMOAbInactive, this.imgEnviroQuestionMOAbActive);	
		this.setInteractablesAsActive(false);
		
		//Add progression conditions
		this.addToItemsThatNeedToBeInteractedWith(this.icon3);
		
		this.startAnimation();
		
		super.setup();
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Animation ---------------------------=---------------- */
	
	updateAnimation()
	{
		//Update background
		let target = main.curSlide;
		target.posHospital = {x: target.posHospital.x + target.increment, y:target.posHospital.y};		
		if (target.posHospital.x < target.posEnd.x) target.stopAnimation();
		
		//Update icon
		target.posIcon1 = {x: target.posIcon1.x + target.increment, y: target.posIcon1.y};
		target.posIcon2 = {x: target.posIcon2.x + target.increment, y: target.posIcon2.y};
		target.posIcon3 = {x: target.posIcon3.x + target.increment, y: target.posIcon3.y};
		target.icon1.setPos(target.posIcon1);
		target.icon2.setPos(target.posIcon2);
		target.icon3.setPos(target.posIcon3);
		
		main.draw();
	}	
	
	stopAnimation()
	{
		super.stopAnimation();	
		
		this.setInteractablesAsActive(true);			
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Slide Navigation ------------------------------------- */
	
	onQuestionIconClicked(icon)
	{		
		this.removeFromInteractables(icon);	
		
		//Display dialog
		this.addQuestionDialog(this.imgDialogMOAb, this.txtHeading, this.colourDefault, this.txtQuestion);
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	draw()
	{
		super.draw(); 
		
		canvasBackground.drawImage(this.imgHospital, this.posHospital);
	}	
}