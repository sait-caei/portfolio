class Slide5 extends Slide
{
	constructor() 
	{	
		super();
		
		//General
		this.slideType = this.slideTypeInfo;
		this.txtSectionHeading = "Camp";
		this.txt = "I’m still not feeling well. My digestion problems have gotten worse and they’re getting more painful. I’ve \ncompleted the initial intake assessment.  \n\nClick the Continue button to look at <b>some<bend> of the results.";
				
		//Glossary
		this.curTerms = [];
		
		this.init();
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Slide-Specific Actions ------------------------------- */
	
	loadImages()
	{		
		this.totalImages = 12;
		this.loadBackgroundImage("bg4");
		this.loadDialogIconImage("Patient");		
		this.loadDialogIconImage("Clipboard", "Other");	
		this.loadDialogIconImage("HR", "Chart");
		this.loadDialogIconImage("BP", "Chart");
		this.loadDialogIconImage("RR", "Chart");
		this.loadDialogIconImage("BO", "Chart");
		this.loadDialogIconImage("BGL", "Chart");
		
		super.loadImages();
	}
	
	setup()
	{		
		//Add dialog
		this.addDialog(this.imgDialogPatient, this.patientName, this.colourPatient, this.txt, "Continue");
		
		//Add progression conditions
		this.addToItemsThatNeedToBeInteractedWith(this.dialog.getButton());
		
		super.setup();
	}
	
	onContinue()
	{	
		super.onContinue();
	
		//Add chart dialog
		this.dialog = new ChartDialog(this.posDialog, this.dialogWidth, this.imgDialogClipboard, this.imgDialogHR, this.imgDialogBP, this.imgDialogRR, this.imgDialogBO, this.imgDialogBGL);
	}
}