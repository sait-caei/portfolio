class FeedbackDialog extends Dialog
{
	constructor(pos, width, imgIcon, txtHeading, headingColour, txt, btnType)
	{
		super(pos, width, imgIcon, txtHeading, headingColour, txt, btnType)
				
		this.init();
	}	
	
	
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	drawHeading()
	{	
		if ((this.txtHeading == "") || (this.imgCheck == null)) return;
	
		canvasDialog.drawText(this.txtHeading, this.posHeading, this.txtStyleHeading, this.headingColour, this.txtAlign);
		
		if (this.txtHeading == "Correct")
		{
			canvasDialog.drawImage(this.imgCheck, this.posFeedback);
		}
		else if (this.txtHeading == "Incorrect")
		{
			canvasDialog.drawImage(this.imgX, this.posFeedback);
		}
	}
}