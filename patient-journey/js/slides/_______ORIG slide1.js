class Slide1 extends Slide
{
	constructor() 
	{	
		super();
		
		this.slideType = this.slideTypeInfo;	
		this.txtSectionHeading = "Background";
		this.txtHeading = "PATIENT BACKGROUND";
		this.txt = "Hi, my name is George and I’m from central Saskatchewan. I’ve been working as a \nSafety Engineer at the Red Sands Project for about 11 years now. I generally work day \nshifts. About 10 on and 4 off but I have done some evening rotations in my time too. I \nworked my way up from a rig hand to this job, taking some courses in the time I had to \nbecome an inspector and look at the workplace safety systems. What I really like about \nmy job now is that I get to train new staff on their orientation. When they first come on \nsite, I orient them to safety expectations and make sure they know what’s expected. We \nhave been accident free for about 428 days now – a great accomplishment for us.\n\nWhen I’m off work, I fly home to Edmonton. I have a small apartment with my partner. I\nfeel my work/life balance is pretty good. These guys who I’ve worked with for so long are \nmy buds, we have really tight friendships. Now that I’m the safety engineer I work \nprimarily a 10 hr day shift and do the training and walk throughs to make sure things are \nas they need to be, which is easier on my body than the hands- on rig work I used to do.  \nI love my job and - being in camp with my colleagues means everything to me. I lead a \nsimple life but a good one.\n\nI started to get indigestion last time I was home in a big city. Since I do the cooking at \nhome, but the camp has chefs, I attributed this to my lack of expertise in the kitchen. \nSome heaviness and burping but it went away after 2 days so I didn’t really consider it a \nproblem. Until about 8 months ago, when I was home this time catching up with my \nroutine check-ups...";
		this.dialogWidth = 580;
		
		this.init();
	}
	
	/* ------------------------------------------------------------ */
	/* ----- General Setup ---------------------------------------- */
	
	loadImages()
	{		
		this.loadBackgroundImage("bg1");
		
		super.loadImages();
	}
	
	setup()
	{			
		this.addDialog("", this.txtHeading, this.colourDefault, this.txt, "");
		this.dialog.setBackgroundToFaded(false);
		
		super.setup();
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Dialogs ---------------------------------------------- */
	
	addDialog(iconImg, txtHeading, headingColour, txt, btnType)
	{	
		let pos = {x:this.posDialog.x, y:this.posDialog.y - 20};
		this.dialog = new Dialog(pos, this.dialogWidth, iconImg, txtHeading, headingColour, txt, btnType);
		this.setupDialog();
	}	
}