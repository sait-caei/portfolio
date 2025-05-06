class Slide17 extends Slide
{
	constructor() 
	{	
		super();
		
		this.slideType = this.slideTypeInfo;	
		this.txtSectionHeading = "Tertiary Care Facility";
		this.txtHeading = "Update";
		this.txt = "George has arrived in the tertiary care facility and has undergone additional tests. Information from the catheter \nlab indicates that he must undergo coronary bypass surgery. The surgery is scheduled to happen within the next \n24 hours. \n\nClick the Next button to continue.";
		this.posIcon = {x:this.pos.x + 300, y:this.pos.y + 250};
				
		//Glossary
		this.curTerms = [];
		
		this.init();
	}
	
	/* ------------------------------------------------------------ */
	/* ----- General Setup ---------------------------------------- */
	
	loadImages()
	{		
		this.totalImages = 6;
		this.loadBackgroundImage("bg10");
		this.loadDialogIconImage("Clipboard", "Other");
		
		super.loadImages();
	}
	
	setup()
	{				
		//Display dialog
		this.addDialog(this.imgDialogClipboard, this.txtHeading, this.colourUrgent, this.txt, "");	
		this.dialog.setBackgroundToFaded(false);
		
		super.setup();
	}
}