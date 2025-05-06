class QuestionDialog extends Dialog
{
	constructor(pos, width, selectionType, imgIcon, txtHeading, headingColour, txt, btnType) 
	{
		super(pos, width, imgIcon, txtHeading, headingColour, txt, btnType);	
		
		this.selectionType = selectionType;
		
		//Feedback text
		this.posFeedback;
		this.txtFeedbackCorrect = "<b>That's correct!<bend> Click the Next button to proceed.";
		this.txtFeedbackIncorrect;
		this.txtFeedbackIncorrectSingle = "<b>That's incorrect.<bend> Try again.";
		this.txtFeedbackIncorrectMultiple = "<b>That's incorrect.<bend> Either one or more of your selections is not correct or you have not selected all of the possible answers. \nTry again.";
		this.txtFeedbackIncorrectMultipleWithIcon = "<b>That's incorrect.<bend> Either one or more of your selections is not correct or you have not selected all of the possible \nanswers. Try again.";
		this.feedbackIsVisible;		
		
		this.init();
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- General ---------------------------------------------- */
		
	init()
	{
		super.init();
				
		if (this.selectionType == "multiple")
		{
			if (this.imgIcon == "")
			{
				this.txtFeedbackIncorrect = this.txtFeedbackIncorrectMultiple;
			}
			else
			{
				this.txtFeedbackIncorrect = this.txtFeedbackIncorrectMultipleWithIcon;
			}
		}
		else
		{
			this.txtFeedbackIncorrect = this.txtFeedbackIncorrectSingle;
		}
	}		
		
	reset()
	{
		super.reset();
		
		this.setFeedbackToVisible(false);
	}	
		
	
	/* ------------------------------------------------------------ */
	/* ----- Answer & Feedback Text ------------------------------- */
	
	addSpaceForTextAnswers(numAnswers)
	{
		this.height = (this.buffer * 1.5) + (this.txtLines.length * this.lineHeight) + this.buffer/3;
		this.height += (numAnswers * this.lineHeight) + (this.paddingV * 2);
		
		//Update button position based on new height
		this.updateButtonPos();
	}
	
	addSpaceForFeedback()
	{	
		this.height += this.lineHeight * 2;		
		this.posFeedback = {x:this.posTxt.x, y:this.pos.y + this.height - (this.paddingV * 0.75) - this.lineHeight};
		
		//Update button position based on new height
		this.updateButtonPos();
	}
	
	addSpaceForIconsAndFeedback()
	{ 
		this.height += 155 + (this.lineHeight * 2) + 5;		
		this.posFeedback = {x:this.posTxt.x, y:this.pos.y + this.height + this.txtOffset - (this.lineHeight * 2.75)/* - (this.paddingV * 0.75) - this.lineHeight*/};
		
		//Update button position based on new height
		this.updateButtonPos();
	}
	
	setFeedbackToVisible(bln)
	{
		this.feedbackIsVisible = bln;
	}
	
	setCorrectFeedback(txt)
	{
		this.txtFeedbackCorrect = txt;
	}
	
	setIncorrectFeedback(txt)
	{
		this.txtFeedbackIncorrect = txt;
	}
	
	setFeedbackType(isCorrect)
	{
		//Set feedback and split lines at line breaks
		if (isCorrect)
		{
			this.txtFeedback = this.txtFeedbackCorrect.split("\n");
		}
		else
		{
			this.txtFeedback = this.txtFeedbackIncorrect.split("\n");
		}
	}
	
	clearFeedback()
	{
		this.txtFeedback = "";
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	draw() 
	{				
		super.draw();
	
		if (this.feedbackIsVisible)
		{
			let pos = this.posFeedback;
			for (let i = 0; i < this.txtFeedback.length; i++)
			{
				this.drawTextLine(this.txtFeedback[i], pos);
				
				//Update position for next line
				pos = {x:pos.x, y:pos.y  + this.lineHeight};
			}
			
		}
	}		
}