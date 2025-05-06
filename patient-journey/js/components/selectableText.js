class SelectableText extends Interactable
{
	constructor(canvas, name, txt, pos) 
	{				
		super(canvas, name, pos);
		
		this.txt = txt;
		this.isSelected;
		this.isACorrectAnswer;
		this.feedbackIsVisible;
		this.isSelectionCorrect;
		
		//Selection circle
		this.txtColour = "#000000";
		this.radius = 8;
		this.posCircle = {x:this.pos.x, y:this.pos.y + this.radius + 1};
				
		//Size and position
		this.width = 300;
		this.height = 20;
		this.paddingH = 20;
		this.posOffset = {x:this.pos.x + this.radius + (this.paddingH * 0.4), y:this.pos.y + 10};
		
		//Feedback
		this.posFeedback = {x:this.pos.x - (this.paddingH * 1.75), y:this.pos.y - 2};
		this.imgCheck;
		this.imgX;		
	}
	
	/* ------------------------------------------------------------ */
	/* ----- General  --------------------------------------------- */
	
	init()
	{
		super.init();
		
		//Load image
		this.imgCheck = new Image();
		this.imgCheck.src = "img/feedback/check_small.png"; 
		this.imgX = new Image();
		this.imgX.src = "img/feedback/x_small.png"; 
			
		this.setToSelected(false);
		this.setToIsACorrectAnswer(false);
		this.setFeedbackToVisible(false);
		this.setSelectionToCorrect(false);
	}
	
	getText()
	{
		return this.txt;
	}
	
	displayFeedback(bln)
	{
		this.setFeedbackToVisible(true);
		this.setSelectionToCorrect(bln);
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
		this.setFeedbackToVisible(false);
	}
	
	isItSelected()
	{
		return this.isSelected;
	}
	
	setToIsACorrectAnswer(bln)
	{
		this.isACorrectAnswer = bln;
	}
	
	isItACorrectAnswer()
	{
		return this.isACorrectAnswer;
	}
	
	setFeedbackToVisible(bln)
	{
		this.feedbackIsVisible = bln;
	}
	
	setSelectionToCorrect(bln)
	{
		this.isSelectionCorrect = bln;
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	draw() 
	{		
		//Draw selection circle
		this.canvas.drawCircle(this.posCircle, this.radius, "", this.txtColour, "1");
		if (this.isSelected)
		{
			this.canvas.drawCircle(this.posCircle, this.radius*0.55, this.txtColour, "", "");
		}		
		
		//Draw text
		if (this.isActive)
		{
			this.canvas.drawText(this.txt, this.posOffset, "Bold 14px Arial", this.txtColour, "left");
		}
		else
		{
			this.canvas.drawText(this.txt, this.posOffset, "14px Arial", this.txtColour, "left");			
		}
		
		if (this.feedbackIsVisible)
		{
			if (this.isSelectionCorrect)
			{
				this.canvas.drawImage(this.imgCheck, this.posFeedback);
			}
			else
			{
				this.canvas.drawImage(this.imgX, this.posFeedback);
			}
		}
	}	
}