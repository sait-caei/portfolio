class Slide9 extends Slide
{
	constructor() 
	{	
		super();
		
		//General
		this.slideType = this.slideTypeInfo;	
		this.txtSectionHeading = "Urgent Care Centre";
		this.txt = "The ambulance brought me to the nearest urgent care center for additional tests. \n\nSelect the icons for both of the healthcare workers to learn more about their roles in this situation. ";
		this.txtRNb = "The Registered Nurse (RN) is collecting and recording information on the chart. ";
		this.txtPCPACPb = "The PCP or ACP who attended the patient in the ambulance is debriefing the nurse on the patient's condition \nand any treatments that have already been done. They need to provide a detailed description of the event, as \nwell as relevant patient information obtained by assessment on arrival to the hospital. This will allow the receiving \nteam to proceed with the best course of action for the patient's care.";
		
		//Animation
		this.intervalAnimation;
		this.intervalFrequency = 1;
		this.increment = 1.25;
		this.posHospital;
		this.posStart = {x: this.pos.x - 1030, y: this.pos.y};
		this.posEnd = {x: this.posStart.x + 1030, y: this.posStart.y};
		
		//Icons
		this.icon1;
		this.icon2;
		this.icon3;
		this.posIcon1;
		this.posIcon2;
		this.posIcon3;
				
		//Glossary
		this.curTerms = ["Registered Nurse", "Advanced Care Paramedic", "Primary Care Paramedic"];
		
		this.init();
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Slide-Specific Actions ------------------------------- */
	
	loadImages()
	{		
		this.totalImages = 14;
		this.loadDialogIconImage("Patient");
		this.loadDialogIconImage("RNb", "RN");
		this.loadDialogIconImage("PCPACPb", "PCPACP");
		this.loadEnvironmentIconImages("RNb", "RN");
		this.loadEnvironmentIconImages("PCPACPb", "PCPACP");
		this.loadEnvironmentIconImages("MOAb", "MOA"); 
		
		//Hospital panning image			
		this.imgHospital = new Image();
		this.imgHospital.src = "img/backgrounds/bg6.png"; 
		this.imgHospital.onload = () => { this.onImageLoaded(); }
		
		super.loadImages();
	}
	
	reset()
	{	
		super.reset();
		
		this.posHospital = this.posStart;
	}
	
	setup()
	{				
		//Add icons
		this.posIcon1 = {x:this.posStart.x + 70, y:this.posStart.y + 150};
		this.posIcon2 = {x:this.posStart.x + 520, y:this.posStart.y + 150};
		this.posIcon3 = {x:this.posStart.x + 1135, y:this.posStart.y + 150};
		this.icon1 = this.addEnvironmentIcon("RNb", "Registered Nurse (RN)", this.posIcon1, this.imgEnviroRNbInactive, this.imgEnviroRNbActive);
		this.icon2 = this.addEnvironmentIcon("PCPACPb", "Paramedic (PCP/ACP)", this.posIcon2, this.imgEnviroPCPACPbInactive, this.imgEnviroPCPACPbActive);
		this.icon3 = this.addEnvironmentIcon("MOA", "Medical Office Assistant (MOA)", this.posIcon3, this.imgEnviroMOAbInactive, this.imgEnviroMOAbActive);
		this.setInteractablesAsActive(false);
		
		//Add progression conditions
		this.addToItemsThatNeedToBeInteractedWith(this.icon1);
		this.addToItemsThatNeedToBeInteractedWith(this.icon2);
		
		this.startAnimation();
		
		super.setup();
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Animation ---------------------------=---------------- */
	
	updateAnimation()
	{
		//Update background
		let target = main.curSlide;
		target.posHospital = {x: target.posHospital.x + target.increment, y:target.posHospital.y};		
		if (target.posHospital.x > target.posEnd.x) target.stopAnimation();
		
		//Update icon
		target.posIcon1 = {x: target.posIcon1.x + target.increment, y: target.posIcon1.y};
		target.posIcon2 = {x: target.posIcon2.x + target.increment, y: target.posIcon2.y};
		target.posIcon3 = {x: target.posIcon3.x + target.increment, y: target.posIcon3.y};
		target.icon1.setPos(target.posIcon1);
		target.icon2.setPos(target.posIcon2);
		target.icon3.setPos(target.posIcon3);
		
		main.draw();
	}	
	
	stopAnimation()
	{
		super.stopAnimation()
				
		//Add dialog
		this.addDialog(this.imgDialogPatient, this.patientName, this.colourPatient, this.txt,  "Continue");
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	draw()
	{
		super.draw(); 
		
		canvasBackground.drawImage(this.imgHospital, this.posHospital);
	}
}