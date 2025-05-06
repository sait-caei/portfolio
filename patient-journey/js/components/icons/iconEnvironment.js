class EnvironmentIcon extends ClickableIcon
{
	constructor(id, name, pos, img, imgActive)  
	{
		super(id, name, pos, img, imgActive); 
		this.canvas = canvasMidground;		
		
		this.init();
	}
}