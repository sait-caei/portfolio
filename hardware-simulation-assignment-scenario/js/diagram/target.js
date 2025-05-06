class Target 
{
	constructor(id, name, posOffset) 
	{		
		this.id = id;
		this.name = name;
		this.pos;		
		this.posRef;
		this.posOffset = posOffset;	
		this.scaleNormal = 0.5;			//Scale at normal size (half the size of the images)
		this.scaleMag = 1;				//Scale when magnified (actual size of images)
		
		//General
		this.width;
		this.height;	
		this.isEnabled;
		this.highlightIsVisible;
		
		//Fill & stroke
		this.fillColor = "rgba(193, 243, 89, 0.6)";
		this.strokeColor = "";
		this.strokeWidth = "";		
	
		this.reset();
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- General ---------------------------------------------- */
	
	reset()
	{	
		this.enable(true);
		this.showHighlight(false);
	}

	setPosRef(posRef)
	{
		this.posRef = posRef;
		this.pos = {x: this.posRef.x + this.posOffset.x, y: this.posRef.y + this.posOffset.y};
	}	
	
	getPos()
	{
		return this.pos;
	}
	
	getWidth()
	{
		return this.width;
	}	
	
	getHeight()
	{
		return this.height;
	}
	
	showHighlight(bool)
	{
		this.highlightIsVisible = bool;
	}
	
	enable(bool)
	{
		this.isEnabled = bool;
	}	
}