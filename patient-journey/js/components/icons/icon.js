class Icon extends Interactable
{
	constructor(id, name, pos, img)  
	{
		super(canvasDialog, id, pos); 
			
		this.name = name;
		
		//Images
		this.img = img;
		this.width = this.img.width;
		this.height = this.img.height;
		this.alpha;
		
		this.init();
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- General  --------------------------------------------- */
	
	init()
	{		
		super.init();
		
		this.setToFaded(false);
	}
	
	getID()
	{
		return "icon_"+this.id;
	}
	
	getProperID()
	{
		return this.id;
	}	
	
	getName()
	{
		return this.name;
	}	
	
	
	setPos(pos)
	{
		this.pos = pos;
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- State ------------------------------------------------ */
	
	setToFaded(bln)
	{
		if (bln)
		{
			this.alpha = 0.5;
		}
		else
		{
			this.alpha = 1;
		}
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	draw() 
	{			
		this.canvas.saveState();
		this.canvas.setAlpha(this.alpha);
		this.canvas.drawImage(this.img, this.pos);
		this.canvas.restoreState();
	}
}