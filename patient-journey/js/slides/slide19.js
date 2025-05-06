class Slide19 extends Slide
{
	constructor() 
	{	
		super();
		
		//General
		this.slideType = this.slideTypeInfo;
		this.txtSectionHeading = "Tertiary Care Facility";
		this.txtHeading = "Update";
		this.txt = "George is undergoing a coronary artery bypass. \n\nTo learn more about this surgery, take a look at the Additional Resources section below this activity.";
				
		//Glossary
		this.curTerms = [];
		
		this.init();
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Slide-Specific Actions ------------------------------- */
	
	loadImages()
	{		
		this.totalImages = 5;
		this.loadBackgroundImage("bg11");
		
		super.loadImages();
	}
	
	setup()
	{	
		//Add dialog
		this.addDialog("", this.txtHeading, this.colourDefault, this.txt, "");
		this.dialog.setBackgroundToFaded(false);
		
		super.setup();
	}
}