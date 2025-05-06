class DraggerText extends Dragger 
{
	constructor(id, width, height, txt, correctTargets) 
	{
		super(id, correctTargets);
		
		this.txt = txt;
		this.txtLines;
		this.txtStyle = "14px Arial";
		this.txtColour = "#000000";
		this.txtAlign = "left";
				
		this.width = width;
		this.height = height;
		this.borderColor = "#000000";
		this.borderWidth = "2";
		this.lineHeight = 20;
		
		this.init();
	}	
	
	
	/* ------------------------------------------------------------ */
	/* ----- General ---------------------------------------------- */
		
	init()
	{	
		if (this.txt == undefined) return;
		
		this.txtLines = this.txt.split('\n');
		
		super.init();
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	draw() 
	{		
		//Draw background
		canvasForeground.drawRectangle(this.pos, this.width, this.height, "#ffffff", this.borderColor, this.borderWidth);
		
		//Draw text
		let posTxt = {x:this.pos.x + 10, y:this.pos.y + 15};	
		if (this.txtLines)
		{
			for (let i=0; i < this.txtLines.length; i++)
			{
				canvasForeground.drawText(this.txtLines[i], posTxt, this.txtStyle, this.txtColour, this.txtAlign);
				posTxt = {x: posTxt.x, y:posTxt.y + this.lineHeight};
			}
		}
		else
		{
			canvasForeground.drawText(this.txt, posTxt, this.txtStyle, this.txtColour, this.txtAlign);
		}
	}	
}