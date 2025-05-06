class Slide1 extends Slide
{
	constructor() 
	{	
		super();
		
		//General
		this.slideType = this.slideTypeInfo;	
		this.txtSectionHeading = "Background";
		this.txtHeading = "PATIENT BACKGROUND";
		this.txt1 = "Hi my name is George and I am from central Saskatchewan.  Last year I went through \nquite an adventure in healthcare, and I learned a lot about the healthcare system and \nthe many different professions that support our health and wellness.  I wanted to share \nmy story with you so you could also learn from this.";
		this.txt2 = "But first let me tell you a little bit more about me. I've been working as a Safety Engineer \nat the Red Sands Project for about 11 years now. I work 10 days on and then 4 days off.\n\nWhat I really like about my job is that I get to train new staff. When they first come on \nsite, I do the safety orientation and make sure every new employee knows what’s \nexpected. We have been accident free for about 428 days now – a great \naccomplishment for us and a real feeling of accomplishment for me knowing I did the \norientation and set expectation for safety. ";
		this.txt3 = "I feel my work/life balance is pretty good. These guys who I’ve worked with for so long \nare my buds; we are good friends and colleagues.  I love my job, it means everything to \nme. \n\nWhen I’m off work, I fly home to Edmonton. I have a small apartment with my partner. I \ngo home every 2 weeks. This last time I went home, I had some routine appointments \nbooked. \n\nClick the Next button to proceed.";
		this.dialogWidth = 580;
		this.curStep;
		
		//Glossary
		this.curTerms = [];
		
		this.init();
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Slide-Specific Actions ------------------------------- */
		
	loadImages()
	{		
		this.totalImages = 5;
		this.loadBackgroundImage("bg1");
		
		super.loadImages();
	}
	
	setup()
	{			
		this.curStep = 1;
		this.displayStep();		
		this.setCompletionStatus(false);
		
		super.setup();
	}	
	
	displayStep()
	{
		if (this.curStep == 1)
		{
			this.addDialog("", this.txtHeading, this.colourDefault, this.txt1, "Continue");
			this.dialog.setBackgroundToFaded(false);
		}
		else if (this.curStep == 2)
		{
			this.addDialog("", this.txtHeading, this.colourDefault, this.txt2, "Return/Continue");
			this.dialog.setBackgroundToFaded(false);
		}
		else if (this.curStep == 3)
		{
			this.addDialog("", this.txtHeading, this.colourDefault, this.txt3, "ReturnL");
			this.dialog.setBackgroundToFaded(false);
			
			this.setCompletionStatus(true);
			main.update();
		}
	}
	
	onContinue()
	{		
		super.onContinue();
		
		this.curStep++;
		this.displayStep();
	}
	
	onReturn()
	{		
		super.onContinue();
		
		this.curStep--;
		this.displayStep();
	}
}