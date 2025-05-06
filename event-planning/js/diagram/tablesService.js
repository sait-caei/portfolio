class ServiceTable extends RoomComponent
{
	constructor(pos, type, subType, width, length)
	{	
		super(pos, type);		
		
		this.subType = subType;
		this.width = width;
		this.length = length;
		
		
		//Fill and stroke colors
		this.fColor = "#373736";
		this.sColor = ""; 
		this.sWidth = "";			
		
		this.init();		
	}
	
	/* ------------------------------------------------------------ */
	/* ----- General Set-up --------------------------------------- */
		
	init()
	{				
		//Set-up icon images		
		this.imagesLoaded = 0;		
		this.imgIconFood = new Image();
		this.imgIconFood.src = "img/roomDiagram/iconFood.png";
		this.imgIconFood.onload = () => { this.onImageLoaded(); }
		this.imgIconBeverage = new Image();
		this.imgIconBeverage.src = "img/roomDiagram/iconBeverage.png";
		this.imgIconBeverage.onload = () => { this.onImageLoaded(); }
		this.imgIconCash = new Image();
		this.imgIconCash.src = "img/roomDiagram/iconCash.png";
		this.imgIconCash.onload = () => { this.onImageLoaded(); }		
	}
	
	onImageLoaded()
	{
		this.imagesLoaded++;
		
		if (this.imagesLoaded >= 3)
		{
			if (this.type.includes("Food"))
			{
				this.setImage(this.imgIconFood);
			}	
			else if (this.type.includes("Beverage"))
			{
				this.setImage(this.imgIconBeverage);
			}
			else if (this.type.includes("Cash"))
			{
				this.setImage(this.imgIconCash);
			}
			this.draw();			
		}
	}
	
	getType()
	{
		return this.type;
	}
	
	getSubtype()
	{
		return this.subType;
	}
				
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	draw()
	{
		//Draw table
		canvasTables.drawRectangle(this.pos, this.width, this.length, this.fColor, this.sColor, this.sWidth);
			
		//Draw table icon
		if (this.img) 
		{			
			let imgWidth = this.img.width * diagramScale;
			let imgHeight = this.img.height * diagramScale;	
			let pos = [this.pos[0] + this.width/2 - imgWidth/2,  this.pos[1] + this.length/2 - imgHeight/2];			
			canvasTables.drawImageScaled(this.img, pos, imgWidth, imgHeight); 				
		}
	}		
}
