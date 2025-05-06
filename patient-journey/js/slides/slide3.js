class Slide3 extends Slide
{
	constructor() 
	{	
		super();
		
		//General
		this.slideType = this.slideTypeInfo;
		this.txtSectionHeading = "Camp";
		this.txt = "I’m back at work today but I’m not feeling well. I’m feeling some heaviness in my chest and stomach. I’m \nsweating a lot and I’ve been burping excessively. My friend at work is taking me to the infirmary.";
				
		//Glossary
		this.curTerms = [];
				
		this.init();
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Slide-Specific Actions ------------------------------- */
	
	loadImages()
	{	
		this.totalImages = 6;
		this.loadBackgroundImage("bg3");
		this.loadDialogIconImage("Patient");	
				
		super.loadImages();
	}
	
	setup()
	{				
		//Add dialog
		this.addDialog(this.imgDialogPatient, this.patientName, this.colourPatient, this.txt, "");
		this.dialog.setBackgroundToFaded(false);
		
		super.setup();
	}
}