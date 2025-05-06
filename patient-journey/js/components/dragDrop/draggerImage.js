class DraggerImage extends Dragger 
{
	constructor(id, img, imgActive, correctTargets) 
	{
		super(id, correctTargets);
		
		this.img = img;
		this.imgActive = imgActive;
		this.width = this.img.width;
		this.height = this.img.height;
				
		this.init();
	}	
	
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	draw() 
	{
		if (this.isVisible)
		{
			if (this.isActive)
			{
				canvasForeground.drawImage(this.imgActive, this.pos);
			}
			else
			{
				canvasForeground.drawImage(this.img, this.pos);
			}
		}
	}	
}