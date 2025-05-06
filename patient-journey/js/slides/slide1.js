class Slide1 extends Slide
{
	constructor() 
	{	
		super();
		
		//General
		this.slideType = this.slideTypeInfo;	
		this.txtSectionHeading = "Background";
		this.txtHeading = "PATIENT BACKGROUND";
		this.txt1 = "Hi, my name is George and I am from central Saskatchewan. I suffered a major \nhealth problem last year and spent a lot of time at the hospital. While I was there, I \nlearned a lot about our healthcare system and the professionals who support our health \nand wellness. I’m sharing my story to tell you about the nature of their complex work and \nall the different ways they work together to help patients like myself.";
		this.txt2 = "First, I’ll tell you a about my personal background. I've been working as a Safety \nEngineer at the Red Sands Project for about 11 years. I work 10 days on and then 4 \ndays off.\n\nTraining new staff is my favorite part of the job. When new employees first arrive at the \nsite, I give them a safety orientation and make sure they know what’s expected of them. \nWe have been accident free for 428 days now. This is a major accomplishment for our \ncompany, and for me personally because I did the orientation and set expectations for \nsafety. ";
		this.txt3 = "Over the past few years, I’ve maintained a good work/life balance. I’ve worked with my \nteam for so long, they’ve become my good friends and they’re one of the main reasons \nwhy I love my job.  \n\nI fly home to Edmonton every two weeks during time off. I spend that time with my \npartner in our small apartment. During my most recent trip home, I went to a few health \nappointments that I had booked.\n\nClick the Next button to proceed.";
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