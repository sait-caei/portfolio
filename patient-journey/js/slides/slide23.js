class Slide23 extends Slide
{
	constructor() 
	{	
		super();
		
		//General
		this.slideType = this.slideTypeInfo;
		this.txtSectionHeading = "Home";
		this.txt = "Well, as you can see, I’m here. What a journey and what a team!";
		this.txt2 = "I didn’t realize how many people were involved in caring for just one person and one situation. It makes me \ngrateful for all that healthcare workers do, and for their training and commitment to guys like me. I know I \nwouldn’t be here today without all the care I got—from the first moment in camp, where someone recognized I \nneeded to have more tests done, to the preliminary diagnosis, transportation to a bigger hospital, my surgery \nand now my recovery. \n\nThey tell me I’m also part of the care team: my job is to develop better habits and stay on course with my \nrecovery. I’ve been reflecting on what that means and I know I need to make some changes. It’s not going to be \neasy breaking old habits, but this experience has made me aware of how precious life is, so I’m going to work at \ngetting better and staying healthy! Thankfully I have a supportive partner, and I’m grateful to them for \nencouraging me and helping me to stay on track.";
		this.txt3 = "These are some of the new habits I’m working on and the supports I have in place:\n\n    •  <b>I'm going to get more active.<bend> My healthcare team says I need to start by walking so I'm setting what they \n       call a SMART Goal—something that's specific, that I can measure and achieve. I want to start with a \n       30-minute walk four times a week, work up to 45-minute walks and then add some light weight training. My \n       team has set me up for success, I just need to do the work now.\n    •  <b>I’m trying to eat better.<bend> This one will be hard but I'm going to try. My partner and I are taking a cooking \n       class together. We're learning about heart smart meals, less on my plate and eliminating junk and \n       processed food. The dietician has set me up with a plan and we’re doing check-ins on my goals. \n    •  <b>I'm taking my medication.<bend> I have a pill box and a sheet for my pills, so I know when to take each pill and \n       what each pill is for. This is great because some of them look a lot alike. Understanding what they are for \n       reminds me of how important it is to keep taking them. \n    •  My career up until this point has made me used to my independence, but <b>I’m going to try asking for help<bend> \n       <b>when I think I need it<bend>, and also when someone else suggests it. It won’t be easy, but I need to let go and \n       let others take care of a few things at work and around the house. \n    •  The last one will be challenging as well: <b>I need to do some self-care<bend>, whatever that might be. Some \n       people journal, meditate, read or have baths. I need to figure out what works for me.\n\nYou've reached the end of the activity. Click the Show Glossary button to review a list of important terms used in \nthis activity or click the Restart button to start over from the beginning.";
		this.curStep;
				
		//Glossary
		this.curTerms = [];
		
		this.init();
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Slide-Specific Actions ------------------------------- */
	
	loadImages()
	{	
		this.totalImages = 6;
		this.loadBackgroundImage("bg14");
		this.loadDialogIconImage("Patient");	
				
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
			this.addDialog(this.imgDialogPatient, this.patientName, this.colourPatient, this.txt, "Continue");
			this.dialog.setHeight(85);
			this.dialog.setBackgroundToFaded(false);
		}
		else if (this.curStep == 2)
		{
			this.addDialog(this.imgDialogPatient, this.patientName, this.colourPatient, this.txt2, "Return/Continue");
		}
		else if (this.curStep == 3)
		{
			this.addDialog(this.imgDialogPatient, this.patientName, this.colourPatient, this.txt3, "");	
			
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