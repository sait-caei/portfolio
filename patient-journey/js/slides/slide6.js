class Slide6 extends Slide
{
	constructor() 
	{	
		super();
		
		//General
		this.slideType = this.slideTypeInfo;
		this.txtSectionHeading = "Camp";
		this.txtHeading = "More Info: Role Clarity";
		this.txt = "Many healthcare professionals other than EMRs/PCPs/ACPs also perform these tests. Click on the icon of \neach healthcare member below to understand how their roles are unique to each profession and how roles can \noverlap.";
		this.txtLabels = "\n\n     <b>Blood Oxygen     Blood Pressure        Heart Rate       Respiration Rate    Blood Glucose<bend>";
		this.txtRN = "I would perform all of these tests because they are within my scope of practice. The information from these tests \nallows me to complete my physical assessment. "+this.txtLabels;
		this.txtRRT = "I would perform all of these tests because they are all within my scope of practice. However, it is unlikely that I \nwould work in a camp setting. The information from these tests allows me to complete my physical assessment."+this.txtLabels;
		this.txtMRT = "I do not perform these tests. While helping George, I would take photographs of certain areas of his body to help \nthe physician assess the issue. "+this.txtLabels;
		this.txtMLT = "I would have an indirect role helping this patient. I could perform the point of care glucose if I was on site but I \nwould not be able to perform any of the other tests because they are not within my scope of practice. In a larger \ncenter, I would use a chemistry analyzer to test the glucose levels and perform additional blood analysis if \nrequested."+this.txtLabels;		
		this.txtMOA = "Medical office assistants learn fundamental clinical skills like taking blood pressure and resting heart rate but the \nother tests are not within our scope of practice."+this.txtLabels;
				
		//Glossary
		this.curTerms = ["Registered Nurse", "Registered Respiratory Therapist", "Medical Radiologic Technologist", "Registered Medical Laboratory Technologist", "Medical Laboratory Technologist", "Medical Office Assistant"];
				
		this.init();
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Slide-Specific Actions ------------------------------- */
	
	loadImages()
	{	
		this.totalImages = 26;
		this.loadBackgroundImage("bg4");
		this.loadDialogIconImage("EmployeeID", "Other");
		this.loadOptionIconImage("RN");
		this.loadOptionIconImage("RRT");
		this.loadOptionIconImage("MRT");
		this.loadOptionIconImage("MLT");
		this.loadOptionIconImage("MOA");
		this.loadDialogIconImage("RN");		
		this.loadDialogIconImage("RRT");		
		this.loadDialogIconImage("MRT");		
		this.loadDialogIconImage("MLT");		
		this.loadDialogIconImage("MOA");	
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
		this.addDialog(this.imgDialogEmployeeID, this.txtHeading, this.colourDefault, this.txt, "");
		this.dialog.addSpaceForIconRow();
		
		//Add icons
		let iconWidth = this.imgOptionRNActive.width;
		let posIcon1 = this.dialog.getIconRowPos();
		posIcon1 = {x:posIcon1.x - (iconWidth * 5/2), y:posIcon1.y};
		let posIcon2 = {x:posIcon1.x + iconWidth, y:posIcon1.y};
		let posIcon3 = {x:posIcon1.x + (iconWidth * 2), y:posIcon1.y};
		let posIcon4 = {x:posIcon1.x + (iconWidth * 3), y:posIcon1.y};
		let posIcon5 = {x:posIcon1.x + (iconWidth * 4), y:posIcon1.y};
		let icon1 = this.addOptionDialogIcon("RN", "Registered Nurse (RN)", posIcon1, this.imgOptionRNInactive);
		let icon2 = this.addOptionDialogIcon("RRT", "Registered Respiratory Therapist (RRT)", posIcon2, this.imgOptionRRTInactive);
		let icon3 = this.addOptionDialogIcon("MRT", "Medical Radiologic Technologist (MRT)", posIcon3, this.imgOptionMRTInactive);
		let icon4 = this.addOptionDialogIcon("MLT", "Registered Medical Laboratory Technologist (MLT)", posIcon4, this.imgOptionMLTInactive);
		let icon5 = this.addOptionDialogIcon("MOA", "Medical Office Assistant (MOA)", posIcon5, this.imgOptionMOAInactive);
		
		//Add progression conditions
		this.addToItemsThatNeedToBeInteractedWith(icon1);
		this.addToItemsThatNeedToBeInteractedWith(icon2);
		this.addToItemsThatNeedToBeInteractedWith(icon3);
		this.addToItemsThatNeedToBeInteractedWith(icon4);
		this.addToItemsThatNeedToBeInteractedWith(icon5);
		
		super.setup();
	}
	
	onIconClicked(icon)
	{					
		this.removeAllDialogInteractables();
		super.onIconClicked(icon);
		//this.dialog.offsetMainIcon();
			
		//Prep for icons
		let role = icon.getProperID();
		this.dialog.addSpaceForIconRow();
		
		//Add blood oxygen icon
		let iconWidth = this.imgDialogBO.width;
		let posIcon = this.dialog.getIconRowPos();
		posIcon = {x:posIcon.x - (iconWidth * 5/2), y:posIcon.y};
		let icon1 = this.addDialogIcon("BO", "", posIcon, this.imgDialogBO);
		if ((role == "MRT") || (role == "MLT") || (role == "MOA"))	icon1.setToFaded(true);
		
		//Add blood pressure icon
		posIcon = {x:posIcon.x + iconWidth, y:posIcon.y};
		let icon2 = this.addDialogIcon("BP", "", posIcon, this.imgDialogBP);
		if ((role == "MRT") || (role == "MLT"))	icon2.setToFaded(true);
		
		//Add heart rate icon
		posIcon = {x:posIcon.x + iconWidth, y:posIcon.y};
		icon = this.addDialogIcon("HR", "", posIcon, this.imgDialogHR);
		if ((role == "MRT") || (role == "MLT") || (role == "MOA"))	icon.setToFaded(true);
		
		//Add respiration rate icon
		posIcon = {x:posIcon.x + iconWidth, y:posIcon.y};
		icon = this.addDialogIcon("RR", "", posIcon, this.imgDialogRR);
		if ((role == "MRT") || (role == "MLT") || (role == "MOA"))	icon.setToFaded(true);
		
		//Add blood glucose level icon
		posIcon = {x:posIcon.x + iconWidth, y:posIcon.y};
		icon = this.addDialogIcon("BGL", "", posIcon, this.imgDialogBGL);
		if ((role == "MRT") || (role == "MOA"))	icon.setToFaded(true);
		
		this.setDialogAsActive(true);
	}	
	
	onReturn()
	{
		super.onReturn();
		
		this.removeAllInteractables();
		this.setup();
	}
}