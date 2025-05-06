class Button extends Interactable
{
	constructor(canvas, id, txt, width, height, pos) 
	{				
		super(canvas, id, pos);
		
		//General
		this.txt = txt;
		this.paddingH = 15;		//Horizontal padding for button
		this.paddingV = 10;		//Vertical padding for button	
		this.width = width + (this.paddingH * 2);	//Button width, with padding included
		this.height = height + (this.paddingV * 2);	//Button height, with padding included
		this.cornerRadius = 8; //In pixels
		this.borderWidth = "2";
		
		//Colours
		this.btnColourDisabled = "#dddddd";
		this.btnColourActiveGeneral = this.btnColourDisabled;
		this.btnColourOverGeneral = "#B8D5DD";
		this.btnColourActive = "#B8D5DD";
		this.btnColourOver = "#D6EFF8";
		this.btnColourActiveNext = "#ACE8F9";
		
		//Interaction
		this.isDown;		//Whether or not mouse is currently down on button
	}
	
	/* ------------------------------------------------------------ */
	/* ----- General  --------------------------------------------- */
		
	
	reset()
	{	
		super.reset();
		
		this.setToDown(false);	
	}
	
	setPos(pos)
	{
		this.pos = pos; 
	}
	
	setText(txt)
	{
		this.txt = txt;
	}
	
	setToDown(bln)
	{
		this.isDown = bln;
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	draw() 
	{
		this.canvas.saveState(); 
		
		//Set button opacity
		if (!this.isItEnabled())
		{
			this.canvas.setAlpha(0.5);
		}			
		
		//Draw button background
		let btnBG = this.setButtonColour();
		
		
		this.canvas.drawRoundedRectangle(this.pos, this.width, this.height, this.cornerRadius, btnBG, "#000000", this.borderWidth);
				
		//Draw button text
		let posTxt = {x: this.pos.x + this.width/2, y:this.pos.y + this.height/2 + 1};
		this.canvas.drawText(this.txt, posTxt, "14px Arial", "#000000", "center");
				
		this.canvas.restoreState();
	}	
	
	setButtonColour()
	{
		let colour = this.btnColourGeneral;
		if (this.isEnabled)
		{
			if ((this.id == "btnGlossary") || (this.id == "btnPrev") || 
				(this.id == "btnNext") || (this.id == "btnRestart"))
			{
				if ((this.isOver) && (!this.isDown))
				{
					colour = this.btnColourOver;
				}
				else
				{
					colour = this.btnColourActive;
				}
			}
			else
			{
				if ((this.isOver) && (!this.isDown))
				{
					colour = this.btnColourOverGeneral;
				}
				else
				{
					colour = this.btnColourActiveGeneral;
				}
			}
		}
		else
		{
			colour = this.btnColourDisabled;
		}
		return colour;	
	}
}