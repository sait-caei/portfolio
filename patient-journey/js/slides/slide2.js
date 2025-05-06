class Slide2 extends Slide
{
	constructor() 
	{	
		super();
		
		//General
		this.slideType = this.slideTypeInfo;
		this.txtSectionHeading = "Background";
		this.txtHeading = "Instructions";	
		this.txt = "Select the icons for each healthcare role on the screen to learn more.";
		this.txtOPT = "Opticians and vision care professionals focus on eye care and vision correction. I provide this service in several \ndifferent ways. First, I provide preventative care which helps patients take care of their own eye health before \nproblems can develop. Second, I provide retroactive care for problems that have already occurred. This type of \ncare can include pre- and post-surgery care, prescribing ophthalmic devices for vision correction, and providing \ncontinuing care to stop problems from getting worse. ";
		this.txtDA = "•	I welcome patients to the clinic and support the dental team.\n• I help prepare the patient by taking their history and vital information. I then provide chair-side assistance for \n  the dentist during dental procedures. I also educate patients to make sure they understand the fundamentals of \n  good oral hygiene.";
		
		//Icons 
		this.posIcon1 = {x:this.pos.x + 100, y:this.pos.y + 180};
		this.posIcon2 = {x:this.pos.x + 450, y:this.pos.y + 180};
				
		//Glossary
		this.curTerms = ["Optician", "Dental Assistant"];
		
		this.init();
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Slide-Specific Actions ------------------------------- */
	
	loadImages()
	{			
		this.totalImages = 12;
		this.loadBackgroundImage("bg2");
		this.loadDialogIconImage("Patient");
		this.loadDialogIconImage("OPT");
		this.loadDialogIconImage("DA");
		this.loadEnvironmentIconImages("OPT");
		this.loadEnvironmentIconImages("DA");
				
		super.loadImages();
	}
	
	setup()
	{		
		//Add icons
		let icon1 = this.addEnvironmentIcon("OPT", "Optician", this.posIcon1, this.imgEnviroOPTInactive, this.imgEnviroOPTActive);
		let icon2 = this.addEnvironmentIcon("DA", "Dental Assistant (DA)", this.posIcon2, this.imgEnviroDAInactive, this.imgEnviroDAActive);
				
		//Add progression conditions
		this.addToItemsThatNeedToBeInteractedWith(icon1);
		this.addToItemsThatNeedToBeInteractedWith(icon2);
		
		//Add dialog
		this.addDialog(this.imgDialogPatient, this.patientName, this.colourPatient, this.txt, "Continue");
		
		super.setup();
	}
}