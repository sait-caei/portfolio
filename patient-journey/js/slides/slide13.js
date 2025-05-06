class Slide13 extends Slide
{
	constructor() 
	{	
		super();
		
		//General
		this.slideType = this.slideTypeInfo;	
		this.txtSectionHeading = "Urgent Care Centre";
		this.txtHeading = "Update";
		this.txt = "Additional lab results have come back. The ECG performed by the Medical Laboratory Assistant (MLA) has \nbeen interpreted as “irregular” by the physician and the blood sample tested by the Medical Laboratory \nTechnologist (MLT) shows an \nabnormal value for a cardiac \nmarker. George has been \ndiagnosed with a myocardial \ninfarction, more commonly \nknown as a heart attack. \n\nClick the Next button to learn \nwhat happens next. ";
		this.posGraph = {x: this.pos.x + 337, y: this.pos.y + 140};
				
		//Glossary
		this.curTerms = ["Medical Laboratory Assistant", "Registered Medical Laboratory Technologist", "Medical Laboratory Technologist", "Physician", "Medical Doctor"];
		
		this.init();
	}
	
	/* ------------------------------------------------------------ */
	/* ----- General Setup ---------------------------------------- */
	
	loadImages()
	{		
		this.totalImages = 7;	
		this.loadBackgroundImage("bg8");
		this.loadDialogIconImage("ECGMachine", "Equipment");

		//ECG Graph
		this.imgECGGraph = new Image();
		this.imgECGGraph.src = "img/other/ecgGraph.png"; 
		this.imgECGGraph.onload = () => { this.onImageLoaded(); }
		
		super.loadImages();
	}
	
	setup()
	{			
		this.addDialog(this.imgDialogECGMachine, this.txtHeading, this.colourDefault, this.txt, "");
		this.dialog.setHeight(350);
		
		super.setup();
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	draw()
	{
		super.draw(); 
		
		canvasDialog.drawImage(this.imgECGGraph, this.posGraph);
	}
}