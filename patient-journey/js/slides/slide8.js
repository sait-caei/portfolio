class Slide8 extends QuestionSlide
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
		this.txtSectionHeading = "Transport";
		this.txtHeading = "Question:";
		this.txtQuestion = "Which factors contributed to the decision to transport George to the nearest urgent care facility? Select all that apply.";
		this.posAmbulance = {x: this.pos.x + 405, y: this.pos.y + 255};
		
		//Answers
		this.answer1 = "Physical assessment results";
		this.answer2 = "Advanced treatment needs";
		this.answer3 = "Requires multiple disciplinary care";
		this.answer4 = "Requires specialized services";
		this.possibleAnswers = [this.answer1, this.answer2, this.answer3, this.answer4];
		this.correctAnswers = [this.answer1, this.answer2, this.answer3, this.answer4];
				
		//Glossary
		this.curTerms = [];
		
		this.init(); 
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Slide-Specific Actions ------------------------------- */
	
	loadImages()
	{		
		this.totalImages = 7;
		this.loadBackgroundImage("bg5");
		
		//Ambulance image			
		this.imgAmbulance = new Image();
		this.imgAmbulance.src = "img/vehicles/ambulance_large.png"; 
		this.imgAmbulance.onload = () => { this.onImageLoaded(); }
		this.imgWheel = new Image();
		this.imgWheel.src = "img/vehicles/ambulance_wheel.png"; 
		this.imgWheel.onload = () => { this.onImageLoaded(); }
				
		super.loadImages();
	}
	
	setup()
	{		
		this.addQuestionDialog("", this.txtHeading, this.colourDefault, this.txtQuestion);
		
		super.setup();
	}	
	
	
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	draw()
	{
		super.draw(); 
		
		canvasMidground.drawImage(this.imgAmbulance, this.posAmbulance);
		
		//Draw back wheel at rotation from previous slide
		let posWheel = {x:this.posAmbulance.x + 104, y:this.posAmbulance.y + 192};
		let posWheelCentre = {x:posWheel.x + this.imgWheel.width/2, y:posWheel.y + this.imgWheel.height/2};		
		canvasMidground.saveState();
		canvasMidground.translate(posWheelCentre);
		canvasMidground.rotate(88*Math.PI/180);
		canvasMidground.translate({x:-posWheelCentre.x, y:-posWheelCentre.y}); 
		if (this.animationInProgress)
		{
			canvasMidground.drawImage(this.imgWheelBlur, posWheel);
		}
		else
		{
			canvasMidground.drawImage(this.imgWheel, posWheel);
		}
		canvasMidground.restoreState();
		
	}		
}