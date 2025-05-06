class Slide4 extends QuestionSlide
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
		this.txtSectionHeading = "Camp";
		this.txtHeading = "Question:";
		this.txtQuestion = "Which healthcare professional would be the <b>most likely<bend> first point of contact for George at the camp?";
		
		//Answers
		this.answer1 = "MOA";
		this.answer2 = "PCPACP";
		this.answer3 = "MLA";
		this.answer4 = "RRT";
		this.possibleAnswers = [this.answer1, this.answer2, this.answer3, this.answer4];
		this.correctAnswers = [this.answer2];
		
		//Feedback
		this.txtFeedbackMOA = "Medical Office Assistants (MOA) do not directly treat patients.";
		this.txtFeedbackPCPACP = "A paramedic (EMR/PCP/ACP) is often the first healthcare professional a patient will encounter during \na medical event. Paramedics may also be the first professional to perform a physical assessment of a \npatient. This can be performed outside of the traditional hospital or medical clinic. Paramedics are \nresponsible for patients until definitive care can be provided by the hospital. Paramedics are classified \nas EMR, PCP, or ACP depending on their education and skill level. \n\nHowever, an EMR would not work at a camp like this one due to the higher levels of care that could be \nrequired for workplace accidents.";
		this.txtFeedbackMLA = "Medical Laboratory Assistants (MLA) do not directly treat patients.";
		this.txtFeedbackRRT = "Registered Respiratory Technicians (RRT) would not typically be involved at this stage of treatment. ";
		this.posIcon = {x:this.pos.x + 300, y:this.pos.y + 220};
				
		//Glossary
		this.curTerms = ["Medical Office Assistant", "Advanced Care Paramedic", "Primary Care Paramedic", "Medical Laboratory Assistant", "Registered Respiratory Therapist"];
		
		this.init(); 
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Slide-Specific Actions ------------------------------- */
	
	loadImages()
	{		
		this.totalImages = 15;
		this.loadBackgroundImage("bg4");
		this.loadEnvironmentIconImages("Question");
		this.loadOptionIconImage(this.answer1);
		this.loadOptionIconImage(this.answer2);
		this.loadOptionIconImage(this.answer3);
		this.loadOptionIconImage(this.answer4);	
		
		super.loadImages();
	}
	
	setup()
	{		
		//Add icon
		let icon = this.addEnvironmentIcon("Question", "", this.posIcon, this.imgEnviroQuestionInactive, this.imgEnviroQuestionActive);
		
		super.setup();
	}	
}