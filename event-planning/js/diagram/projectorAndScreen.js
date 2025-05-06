class ProjectorAndScreen extends Equipment
{
	constructor(type, pos) 
	{
		super(type, pos);

		this.imgScr;				//Image path
		this.screenHeight; 			//Height of the projector screen
		this.beamSlice1Width;		//Width of the first slice of the projector beam
		this.beamSlice1Height;		//Height of the first slice of the projector beam
		this.beamSlice2Width;		//Width of the second slice of the projector beam
		this.beamSlice2Height;		//Height of the second slice of the projector beam
		this.beamSlice3Width;		//Width of the third slice of the projector beam
		this.beamSlice3Height;		//Height of the third slice of the projector beam
		this.beamSlice4Width;		//Width of the fourth slice of the projector beam
		this.beamSlice4Height;		//Height of the fourth slice of the projector beam
		this.projectorWidth;		//Width of the projector itself
		this.projectorHeight; 		//Height of the projector itself
		this.projectorPos;			//Position of the projector
		this.beamSlice1Pos;			//Position of the first slice of the projector beam
		this.beamSlice2Pos;			//Position of the second slice of the projector beam
		this.beamSlice3Pos;			//Position of the third slice of the projector beam
		this.beamSlice4Pos;			//Position of the fourth slice of the projector beam
		
		this.screenHighlightPos;
		this.projectorHightlightPos;
		this.projectorHighlightHeight;
		this.beamHighlightPos;
		
		this.init();
	}
	
	/* ------------------------------------------------------------ */
	/* ----- General Set-up --------------------------------------- */
	
	setImage(img)
	{
		super.setImage(img);
		
		this.setOccupiedArea();
		this.setHightlightedArea();
		this.drawHighlight();
	}	

	//Specifies what portion of its image area the projector actually occupies, based on what projector image is 
	//currently being used. (Basically this stops most of the white space from being recognized as part of the 
	//projector and screen on rollover.)
	setOccupiedArea()
	{	
		this.imgSrc = this.img.src;
		this.screenHeight = 14 * diagramScale;
		if (this.imgSrc.includes("Stage"))
		{
			this.projectorWidth = 41 * diagramScale;
			this.projectorHeight = 78 * diagramScale;			
			this.beamSlice1Width = 66 * diagramScale;
			this.beamSlice1Height = 20 * diagramScale;
			this.beamSlice2Width = 44 * diagramScale;
			this.beamSlice2Height = 20 * diagramScale;
			this.projectorPos = [this.pos[0] + 72*diagramScale, this.pos[1] + 18 *diagramScale];
			this.beamSlice1Pos = [this.projectorPos[0] - 16 *diagramScale, this.pos[1] + 14 *diagramScale];
			this.beamSlice2Pos = [this.beamSlice1Pos[0] + 12 *diagramScale, this.beamSlice1Pos[1] + this.beamSlice1Height];
		}
		else
		{
			this.projectorWidth = 38 * diagramScale;
			this.projectorHeight = 132 * diagramScale;			
			this.beamSlice1Width = 140 * diagramScale;
			this.beamSlice1Height = 20 * diagramScale;
			this.beamSlice2Width = 115 * diagramScale;
			this.beamSlice2Height = 20 * diagramScale;
			this.beamSlice3Width = 90 * diagramScale;
			this.beamSlice3Height = 18 * diagramScale;
			this.beamSlice4Width = 64 * diagramScale;
			this.beamSlice4Height = 18 * diagramScale;
		
			this.projectorPos = [this.pos[0] + 72 *diagramScale, this.pos[1] + 14 *diagramScale];
			this.beamSlice1Pos = [this.projectorPos[0] - 58 *diagramScale, this.pos[1] + 14 *diagramScale];
			this.beamSlice2Pos = [this.beamSlice1Pos[0] + 13 *diagramScale, this.beamSlice1Pos[1] + this.beamSlice1Height];
			this.beamSlice3Pos = [this.beamSlice2Pos[0] + 13 *diagramScale, this.beamSlice2Pos[1] + this.beamSlice2Height];
			this.beamSlice4Pos = [this.beamSlice3Pos[0] + 13 *diagramScale, this.beamSlice3Pos[1] + this.beamSlice3Height];
			this.beamSlice5Pos = [this.beamSlice4Pos[0] + 12 *diagramScale, this.beamSlice4Pos[1] + this.beamSlice4Height];
		}
	}
	
	setHightlightedArea()
	{
		//Set screen and projector position variables
		this.screenHighlightPos = [this.pos[0] - this.highlightOutline/2, this.pos[1] - this.highlightOutline/2];		
		this.projectorHightlightPos = this.projectorPos;		
		
		//Adjust projector position variables based on individual images
		if (this.imgSrc.includes("Stage"))
		{
			this.projectorHightlightPos = [this.projectorHightlightPos[0] - this.highlightOutline/2, 	this.projectorHightlightPos[1] + 36 * diagramScale];
			this.projectorHighlightHeight = 32 * diagramScale;
		}
		else
		{
			this.projectorHightlightPos = [this.projectorHightlightPos[0] - this.highlightOutline/2, this.projectorHightlightPos[1]];
			this.projectorHightlightPos = [this.projectorHightlightPos[0], this.projectorHightlightPos[1] + 100 * diagramScale];
			this.projectorHighlightHeight = 28 * diagramScale;
		}		
		
		//Set beam position variables
		let beamPos1 = [this.projectorHightlightPos[0], this.screenHighlightPos[1] + this.screenHeight + this.highlightOutline];
		let beamPos2 = [this.projectorHightlightPos[0], this.projectorHightlightPos[1]];
		let beamPos3 = [this.projectorHightlightPos[0] + this.projectorWidth + this.highlightOutline, this.projectorHightlightPos[1]];
		let beamPos4 = [this.projectorHightlightPos[0] + this.projectorWidth + this.highlightOutline, this.screenHighlightPos[1] + this.screenHeight + this.highlightOutline];
		
		//Adjust beam position variables based on individual images
		if (this.imgSrc.includes("Stage"))
		{
			beamPos1 = [beamPos1[0] - 19 * diagramScale, beamPos1[1]]; 
			beamPos2 = [beamPos2[0] + 4 * diagramScale, beamPos2[1]]; 
			beamPos3 = [beamPos3[0] - 18 * diagramScale, beamPos3[1]]; 
			beamPos4 = [beamPos4[0] + 4 * diagramScale, beamPos4[1]]; 
		}
		else
		{
			beamPos1 = [beamPos1[0] - 60 * diagramScale, beamPos1[1]]; 
			beamPos2 = [beamPos2[0] + 2 * diagramScale, beamPos2[1]]; 
			beamPos3 = [beamPos3[0] - 16 * diagramScale, beamPos3[1]]; 
			beamPos4 = [beamPos4[0] + 46 * diagramScale, beamPos4[1]]; 
		}
		this.beamHighlightPos = [beamPos1, beamPos2, beamPos3, beamPos4, beamPos1];	
	}
				
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	drawHighlight()
	{
		//Highlight screen
		canvasEquipment.drawRectangle(this.screenHighlightPos, this.width + this.highlightOutline,  this.screenHeight + this.highlightOutline, this.outlineColor, "", "");
		canvasEquipment.drawShape(this.beamHighlightPos, this.outlineColor, "", "");
		canvasEquipment.drawRectangle(this.projectorHightlightPos, this.projectorWidth + this.highlightOutline,  this.projectorHighlightHeight + this.highlightOutline, this.outlineColor, "", "");		
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Interaction ------------------------------------------ */
	
	isMouseOver(mouseX, mouseY) 
	{			
		this.isHighlighted = false;
		if (this.isHidden) return false;		
		
		//Set screen position references
		let xMin = this.pos[0];
		let xMax = this.pos[0] + this.width;
		let yMin = this.pos[1];
		let yMax = this.pos[1] + this.screenHeight;
		
		//Check if mouse is over screen
		let isOver = false;	
		if ((mouseX > xMin) && (mouseX < xMax) &&
			(mouseY > yMin) && (mouseY < yMax)) 
		{
			isOver = true;
		} 
		
		//Set beam slice 1 position references
		xMin = this.beamSlice1Pos[0];
		xMax = this.beamSlice1Pos[0] + this.beamSlice1Width;
		yMin = this.beamSlice1Pos[1];
		yMax = this.beamSlice1Pos[1] + this.beamSlice1Height;
		
		//Check if mouse is over beam slice 1
		if ((mouseX > xMin) && (mouseX < xMax) &&
			(mouseY > yMin) && (mouseY < yMax)) 
		{
			isOver = true;
		} 
		
		if (this.beamSlice2Width)
		{
			//Set beam slice 2 position references
			xMin = this.beamSlice2Pos[0];
			xMax = this.beamSlice2Pos[0] + this.beamSlice2Width;
			yMin = this.beamSlice2Pos[1];
			yMax = this.beamSlice2Pos[1] + this.beamSlice2Height;
			
			//Check if mouse is over beam slice 2
			if ((mouseX > xMin) && (mouseX < xMax) &&
				(mouseY > yMin) && (mouseY < yMax)) 
			{
				isOver = true;
			} 
		}
		
		if (this.beamSlice3Width)
		{
			//Set beam slice 3 position references
			xMin = this.beamSlice3Pos[0];
			xMax = this.beamSlice3Pos[0] + this.beamSlice3Width;
			yMin = this.beamSlice3Pos[1];
			yMax = this.beamSlice3Pos[1] + this.beamSlice3Height;
			
			//Check if mouse is over beam slice 4
			if ((mouseX > xMin) && (mouseX < xMax) &&
				(mouseY > yMin) && (mouseY < yMax)) 
			{
				isOver = true;
			} 
		}
		
		if (this.beamSlice4Width)
		{
			//Set beam slice 4 position references
			xMin = this.beamSlice4Pos[0];
			xMax = this.beamSlice4Pos[0] + this.beamSlice4Width;
			yMin = this.beamSlice4Pos[1];
			yMax = this.beamSlice4Pos[1] + this.beamSlice4Height;
			
			//Check if mouse is over beam slice 4
			if ((mouseX > xMin) && (mouseX < xMax) &&
				(mouseY > yMin) && (mouseY < yMax)) 
			{
				isOver = true;
			} 
		}
		
		//Set projector position references
		xMin = this.projectorPos[0];
		xMax = this.projectorPos[0] + this.projectorWidth;
		yMin = this.projectorPos[1];
		yMax = this.projectorPos[1] + this.projectorHeight;
		
		//Check if mouse is over projector
		if ((mouseX > xMin) && (mouseX < xMax) &&
			(mouseY > yMin) && (mouseY < yMax)) 
		{
			isOver = true;
		} 
		
		if (isOver) this.isHighlighted = true;		
		return isOver;
	}
}
