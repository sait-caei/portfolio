class Dragger
{
	constructor(id, correctTargets) 
	{
		this.id = id;
		this.defaultPos;
		this.pos;
		this.correctTargets = correctTargets;
		this.width = 50;
		this.height = 50;
		
		this.isEnabled;
		this.isOver;
		this.isActive;
		this.curTarget;
		
		this.init();
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- General Set-up --------------------------------------- */
	
	init()
	{			
		this.setToEnabled(false);
		this.setToVisible(true);		
		this.reset();
	}
	
	reset()
	{
		this.setToActive(false);
		this.resetPosition();		
	}
	
	setDefaultPosition(pos)
	{
		this.defaultPos = pos;
		this.reset();
	}
	
	setToEnabled(bool)
	{
		this.isEnabled = bool;
	}
	
	setToOver(bool)
	{
		this.isOver = bool;
	}
	
	setToActive(bln)
	{
		this.isActive = bln; 
	}
	
	setToVisible(bln)
	{
		this.isVisible = bln;
	}
	
	resetPosition()
	{
		this.pos = this.defaultPos;	
		if (this.curTarget) this.curTarget.reset();
		this.curTarget = null;
	}
	
	getID()
	{
		return this.id;
	}
	
	isTargetACorrectTarget(target)
	{
		let isCorrect = false;		
		for (let i = 0; i < this.correctTargets.length; i++) 
		{	
			if (this.correctTargets[i] == target)
			{
				isCorrect = true;
			}	
		}	
		return isCorrect;
	}
	
	isItOnCorrectTarget()
	{
		let isCorrect = false;		
		for (let i = 0; i < this.correctTargets.length; i++) 
		{	
			if (this.correctTargets[i] == this.curTarget)
			{
				isCorrect = true;
			}	
		}	
		return isCorrect;
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	draw() {}	
	
	
	/* ------------------------------------------------------------ */
	/* ----- Dragging & Dropping ---------------------------------- */
	
	isMouseOver(mouseX, mouseY) 
	{
		if (!this.isEnabled) return false;	
		
		let xMin = this.pos.x;
		let xMax = this.pos.x + this.width;
		let yMin = this.pos.y;
		let yMax = this.pos.y + this.height;
		
		let isOver = false;	
		if ((mouseX > xMin) && (mouseX < xMax) &&
			(mouseY > yMin) && (mouseY < yMax)) 
		{ 
			isOver = true;
		} 
		return isOver;
	}	
	
	onMouseDown(mouseX, mouseY)
	{
		if (!this.isEnabled) return false;	
		
		if (this.curTarget) this.curTarget.reset();
		this.curTarget = null;
		this.setToActive(true);
	}
	
	onMouseUp ()
	{
		this.setToActive(false);
	}
	
	setDragPosition(mouseX, mouseY)
	{
		let x = mouseX - this.width/2;
		let y = mouseY - this.height/2;
		this.pos = {x:x, y:y};
	}
		
	dropOn(target)
	{
		this.pos = target.pos;
		this.curTarget = target;
	}
	
}