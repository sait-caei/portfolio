class AnswerIcon extends ClickableIcon
{
	constructor(id, name, pos, img, imgActive)  
	{
		super(id, name, pos, img, imgActive);
		
		this.isCorrect;
		this.isSelected;
		
		this.init();
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- General Set-up --------------------------------------- */
		
	init()
	{
		super.init(); 	
			
		this.setToCorrect(false);
		this.setToSelected(false);
	}
	
	getAnswer()
	{
		let answer = super.getID();		
		answer = answer.replace("icon_Answer", "");
		return answer;
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- State ------------------------------------------------ */
		
	setToSelected(bln)
	{
		this.isSelected = bln;
	}
	
	toggleSelectedState()
	{
		this.setToSelected(!this.isSelected);
	}
	
	isItSelected()
	{
		return this.isSelected;
	}
	
	setToCorrect(bln)
	{
		this.isCorrect = bln;
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	draw() 
	{	
		this.canvas.saveState();
		this.canvas.setAlpha(this.alpha);
		
		//Draw icon
		if (this.isSelected)
		{ 
			if (this.isOver)
			{	
				this.drawIconScaled(this.imgActive);
			}
			else
			{
				this.drawIcon(this.imgActive);
			}
			
		}
		else
		{
			if (this.isOver)
			{	
				this.drawIconScaled(this.img);
			}
			else
			{
				this.drawIcon(this.img);
			}
		}
		this.drawSelectionFeedback();	
		
		this.canvas.restoreState();
	}
	
	drawSelectionFeedback()
	{
		if (this.hasBeenClicked)
		{
			//Set position
			let posFeedback = {x:this.pos.x + this.width/2 - 10, y:this.pos.y + this.height/2 + 5};
			if ((this.name == "Ambulance") || (this.name == "Helicopter"))
			{
				posFeedback = {x:this.pos.x + this.width/2, y:this.pos.y + this.height - 25};
			}
			
			
			//Draw feedback
			if (this.isCorrect)
			{
				this.canvas.drawImage(this.imgCheck, posFeedback);
			}
			else
			{
				posFeedback = {x:posFeedback.x - 2, y:posFeedback.y };
				this.canvas.drawImage(this.imgX, posFeedback);
			}
		}	
			
	}
}