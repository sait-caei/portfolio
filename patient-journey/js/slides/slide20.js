class Slide20 extends Slide
{
	constructor() 
	{	
		super();
		
		//General
		this.slideType = this.slideTypeInfo;
		this.txtSectionHeading = "Tertiary Care Facility";
		this.txtHeading = "Surgery Complete";
		this.txt = "The surgery was a success! George is headed back to his room for post-op care.";
				
		//Glossary
		this.curTerms = [];
		
		this.init();
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Slide-Specific Actions ------------------------------- */
	
	loadImages()
	{		
		this.totalImages = 6;
		this.loadBackgroundImage("bg11");	
		this.loadDialogIconImage("Balloons", "Other");
		
		super.loadImages();
	}
	
	setup()
	{	
		//Add dialog
		this.addDialog(this.imgDialogBalloons, this.txtHeading, this.colourDefault, this.txt, "");
		
		super.setup();
	}
}