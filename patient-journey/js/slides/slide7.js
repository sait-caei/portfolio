class Slide7 extends QuestionSlide
{
	constructor() 
	{	
		super();
		
		//General
		this.slideType = this.slideTypeQuestion;
		this.questionType = this.questionTypeSingle;
		this.selectionType = this.selectionTypeSingle;
		this.answerType = this.answerTypeIcons;
		this.submissionType = this.submissionTypeSingle;
		this.txtSectionHeading = "Transport";
		this.txtHeading = "Question:";
		this.txt = "After my initial assessment I was transported to the nearest urgent care facility."
		this.txtQuestion = "Who would be driving the ambulance in this scenario? An EMR/PCP/ACP or anyone with a Class 4 license?";
		
		//Animation
		this.intervalAnimation;
		this.intervalFrequency = 1;
		this.increment = 1.5;
		this.posAmbulance;
		this.posStart = {x: this.pos.x - 200, y: this.pos.y + 255};
		this.posMid = {x: this.posStart.x + 405, y: this.posStart.y};
		this.posEnd = {x: this.posMid.x + 200, y: this.posMid.y};
		this.wheelRotation;
		this.rotIncrements = 2;
		
		//Answers
		this.answer1 = "EMRPCPACP";
		this.answer2 = "C4License";
		this.possibleAnswers = [this.answer1, this.answer2];
		this.correctAnswers = [this.answer1];
		
		//Feedback
		this.txtFeedbackEMRPCPACP = "Anyone with a Class 4 license would be capable of driving an ambulance but in this scenario, the \nambulance would have to be driven by an Emergency Medical Responder (EMR) or a \nparamedic (PCP/ACP). These are trained healthcare professionals who specialize in pre-hospital \nemergency medical care. While the driver of an ambulance is responsible for safely navigating the \nvehicle through traffic, their primary role is to transport patients to the appropriate medical facility as \nquickly and safely as possible. \n\nThe PCP/ACP working at camp would not leave due to Occupational Health and Safety regulations, \ninstead they would call for an ambulance and transfer care. An EMR would drive the ambulance and a \n PCP/ACP would treat the patient en route. ";
		this.txtFeedbackC4License = this.txtFeedbackEMRPCPACP;
				
		//Glossary
		this.curTerms = ["Advanced Care Paramedic", "Primary Care Paramedic"];
		
		this.init(); 
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Slide-Specific Actions ------------------------------- */
	
	loadImages()
	{		
		this.totalImages = 17;
		this.loadBackgroundImage("bg5");
		this.loadDialogIconImage("Patient");
		this.loadDialogIconImage("EMRPCPACP");
		this.loadDialogIconImage("C4License");
		this.loadEnvironmentIconImages("QuestionTilted", "Question");
		this.loadOptionIconImage("EMRPCPACP");
		this.loadOptionIconImage("C4License");
		
		//Ambulance and wheels images			
		this.imgAmbulance = new Image();
		this.imgAmbulance.src = "img/vehicles/ambulance_large.png"; 
		this.imgAmbulance.onload = () => { this.onImageLoaded(); }
		this.imgWheel = new Image();
		this.imgWheel.src = "img/vehicles/ambulance_wheel.png"; 
		this.imgWheel.onload = () => { this.onImageLoaded(); }
		this.imgWheelBlur = new Image();
		this.imgWheelBlur.src = "img/vehicles/ambulance_wheel_blur.png"; 
		this.imgWheelBlur.onload = () => { this.onImageLoaded(); }
		
		super.loadImages();
	}
	
	reset()
	{
		super.reset();
		
		this.posAmbulance = this.posStart;
		this.wheelRotation = 0;
	}
	
	setup()
	{			
		this.startAnimation();
		
		super.setup();
	}
	
	onContinue()
	{
		this.clearDialog();		
		this.resumeAnimation();
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Progression ------------------------------------------ */
	
	evaluateQuestionSingleAnswer()
	{
		super.evaluateQuestionSingleAnswer();

		this.removeDialogButton();
		this.questionCompleted = true;
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Animation ---------------------------=---------------- */
	
	startAnimation()
	{
		this.intervalAnimation = setInterval(this.updateAnimationStage1, this.intervalFrequency);
		this.animationInProgress = true;
	}
	
	updateAnimationStage1()
	{
		let target = main.curSlide;
		target.posAmbulance = {x: target.posAmbulance.x + target.increment, y:target.posAmbulance.y};		
		if (target.posAmbulance.x > target.posMid.x) target.pauseAnimation();
		target.rotateWheels();
		
		main.draw();
	}
	
	rotateWheels()
	{
		this.wheelRotation += this.rotIncrements; 
		if (this.wheelRotation > 359)	this.wheelRotation = 0;
	}
	
	pauseAnimation()
	{
		super.stopAnimation();	
		this.addDialog(this.imgDialogPatient, this.patientName, this.colourPatient, this.txt, "Continue");
	}
	
	resumeAnimation()
	{
		this.intervalAnimation = setInterval(this.updateAnimationStage2, this.intervalFrequency);
	}
	
	updateAnimationStage2()
	{
		let target = main.curSlide;
		target.posAmbulance = {x: target.posAmbulance.x + target.increment, y:target.posAmbulance.y};
		if (target.posAmbulance.x > target.posEnd.x) 
		{
			target.stopAnimation();
			target.posAmbulance = target.posEnd;
			this.wheelRotation = 88;
		}
		target.rotateWheels();
		
		main.draw();
	}
	
	stopAnimation()
	{
		super.stopAnimation();	
		
		//Add icon
		let pos = {x:this.posAmbulance.x - 115, y:this.posAmbulance.y - 120};
		let icon = this.addEnvironmentIcon("QuestionTilted", "", pos, this.imgEnviroQuestionTiltedInactive, this.imgEnviroQuestionTiltedActive);
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	draw()
	{
		super.draw();
		
		canvasMidground.drawImage(this.imgAmbulance, this.posAmbulance);
		
		//Draw back wheel
		let posWheel = {x:this.posAmbulance.x + 104, y:this.posAmbulance.y + 192};
		let posWheelCentre = {x:posWheel.x + this.imgWheel.width/2, y:posWheel.y + this.imgWheel.height/2};		
		canvasMidground.saveState();
		canvasMidground.translate(posWheelCentre);
		canvasMidground.rotate(this.wheelRotation*Math.PI/180);
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
		
		//Draw front wheel
		posWheel = {x:this.posAmbulance.x + 471, y:this.posAmbulance.y + 192};
		posWheelCentre = {x:posWheel.x + this.imgWheel.width/2, y:posWheel.y + this.imgWheel.height/2};		
		canvasMidground.saveState();
		canvasMidground.translate(posWheelCentre);
		canvasMidground.rotate(this.wheelRotation*Math.PI/180);
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