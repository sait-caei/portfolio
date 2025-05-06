class Slide14 extends Slide
{
	constructor() 
	{	
		super();
		
		//General		
		this.slideType = this.slideTypeInfo;	
		this.txtSectionHeading = "Urgent Care Centre";
		this.txtHeading = "Urgent";
		this.txt = "Now that George has been diagnosed as having a heart attack, he requires cardiac catherization which is not \navailable at this site. This means that George needs to be transported to a facility that can perform specialized \ntests and treatments, like a tertiary care centre. \n\nA tertiary care centre is any hospital that offers highly specialized services such as neurosurgery and \nradiotherapy, and has complex diagnostic capabilities like imaging, molecular pathology, and genetics. \n\nClick the Next button to follow George as he is transferred to a new hospital. ";
		this.posIcon = {x:this.pos.x + 205, y:this.pos.y + 100};
				
		//Glossary
		this.curTerms = [];
		
		this.init();
	}
	
	/* ------------------------------------------------------------ */
	/* ----- General Setup ---------------------------------------- */
	
	loadImages()
	{		
		this.totalImages = 8;
		this.loadBackgroundImage("bg8");
		this.loadDialogIconImage("Urgent");
		this.loadEnvironmentIconImages("Urgent");

		super.loadImages();
	}
	
	setup()
	{		
		//Add icon
		let icon = this.addEnvironmentIcon("Urgent", "", this.posIcon, this.imgEnviroUrgentInactive, this.imgEnviroUrgentActive);	
		
		//Add progression conditions
		this.addToItemsThatNeedToBeInteractedWith(icon);
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Slide Navigation ------------------------------------- */
	
	onIconClicked(icon)
	{			
		this.removeAllInteractables();
	
		//Display dialog
		this.addDialog(this.imgDialogUrgent, this.txtHeading, this.colourUrgent, this.txt, "");	
		
		super.setup();	
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	draw() 
	{	
		//Draw red rectangle over background to highlight urgency
		canvasMidground.saveState();
		canvasMidground.setAlpha(0.2);
		canvasMidground.drawRectangle({x:this.pos.x, y:this.pos.y}, 860, 535, "#ff0000", "", "");
		canvasMidground.restoreState();
		
		super.draw();
	}
}