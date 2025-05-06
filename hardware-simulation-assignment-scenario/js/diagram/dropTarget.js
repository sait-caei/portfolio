class DropTarget extends Target
{
	constructor(id, name, width, height, posOffset) 
	{		
		super(id, name, posOffset);
		
		this.type = "dropTarget";
		this.shape = "rectangle";
		this.width = width;
		this.height = height;
		this.occupyingDragger;			//Dragger currently sitting on this drop target
		this.img;						//Image for occupying dragger
		this.posImg;					//Reference position for occupying dragger image when it is dropped on this drop target
		this.posImgOffset;				//Offset of occupying dragger image when it sits on this drop target
	
		this.reset();
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- General ---------------------------------------------- */
	
	reset()
	{	
		super.reset();
		
		this.occupyingDragger = null;
		this.img = null;
		this.posImgOffset = null;
	}	
	
	/* ------------------------------------------------------------ */
	/* ----- Draw ------------------------------------------------- */
	
	draw()
	{					
		if (this.occupyingDragger) //Draw drop target the size of the occupying dragger
		{ 				
			canvasDropTargets.drawImageScaled(this.img, this.posImg, this.img.width * this.scaleNormal, this.img.height * this.scaleNormal);	
			
			if (this.highlightIsVisible)
			{			
				canvasDropTargets.drawRectangle(this.posImg, this.img.width * this.scaleNormal, this.img.height * this.scaleNormal, this.fillColor, this.strokeColor, this.strokeWidth);		
			}
			/*else //For testing only
			{		
				//canvasDropTargets.drawRectangle(this.posImg,this.img.width * this.scaleNormal, this.img.height * this.scaleNormal, "rgba(255, 0, 0, 0.6)", this.strokeColor, this.strokeWidth);
				canvasDropTargets.drawRectangle(this.posImg, this.img.width * this.scaleNormal, this.img.height * this.scaleNormal, this.fillColor, this.strokeColor, this.strokeWidth);		
			} */	
		}	
		else //Draw drop target normal size
		{
			if (this.highlightIsVisible)
			{			
				canvasDropTargets.drawRectangle(this.pos, this.width, this.height, this.fillColor, this.strokeColor, this.strokeWidth);		
			}
			/*else //For testing only
			{		
				//canvasDropTargets.drawRectangle(this.pos, this.width, this.height, "rgba(255, 0, 0, 0.6)", this.strokeColor, this.strokeWidth);
				canvasDropTargets.drawRectangle(this.pos, this.width, this.height, this.fillColor, this.strokeColor, this.strokeWidth);		
			}*/
		}
	}
	
	drawMagnified(posRefMag)
	{
		if (this.occupyingDragger)
		{ 			
			let posImgX = posRefMag.x + (this.posOffset.x + this.posImgOffset.x) * (this.scaleMag/this.scaleNormal);
			let posImgY = posRefMag.y + (this.posOffset.y + this.posImgOffset.y) * (this.scaleMag/this.scaleNormal);
			let posImgMag = {x:posImgX, y:posImgY};
			canvasMagnification.drawImageScaled(this.img, posImgMag, this.img.width * this.scaleMag, this.img.height * this.scaleMag);
		}
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Draggers --------------------------------------------- */
	
	addDragger(dragger, img)
	{
		//Update target to accomodate dropped dragger
		this.occupyingDragger = dragger;
		this.img = img;
		this.showHighlight(false);
		
		//Set posImg and posImgOffset
		this.posImgOffset = dragger.imgOffset; 		 		
		let posImgX = this.pos.x + this.posImgOffset.x;
		let posImgY = this.pos.y + this.posImgOffset.y;
		this.posImg = {x:posImgX, y:posImgY};
	}
	
	removeDragger()
	{
		this.occupyingDragger = null;
	}
	
	isItOccupied()
	{
		if (this.occupyingDragger)
		{
			return true;
		}
		return false;
	}
	
	getOccupyingDragger()
	{
		return this.occupyingDragger;
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- User Interaction ------------------------------------- */
	
	isMouseOver(mouseX, mouseY)
	{		
		if (!this.isEnabled) return;
		
		let buffer = 2;
		let	xMin, xMax, yMin, yMax;
		if (this.occupyingDragger)
		{ 		
			xMin = this.posImg.x - buffer;
			xMax = this.posImg.x + (this.img.width * this.scaleNormal) + buffer;
			yMin = this.posImg.y - buffer;
			yMax = this.posImg.y + (this.img.height * this.scaleNormal) + buffer;
		}
		else
		{
			xMin = this.pos.x - buffer;
			xMax = this.pos.x + this.width + buffer;
			yMin = this.pos.y - buffer;
			yMax = this.pos.y + this.height + buffer;
		}
		//console.log(xMin, xMax, yMin, yMax);
		//console.log(mouseX, mouseY);
		
		let isOver = false;	
		if ((mouseX > xMin) && (mouseX < xMax) &&
			(mouseY > yMin) && (mouseY < yMax)) 
		{
			isOver = true;
		} 
		return isOver;
	}
}