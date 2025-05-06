class SlideManager
{
	constructor() 
	{			
		this.init();
	}
	
	/* ------------------------------------------------------------ */
	/* ----- General Setup ---------------------------------------- */
	
	init()	
	{
		this.slide1 = new Slide1();
		this.slide2 = new Slide2();
		this.slide3 = new Slide3();
		this.slide4 = new Slide4();
		this.slide5 = new Slide5();
		this.slide6 = new Slide6();
		this.slide7 = new Slide7();
		this.slide8 = new Slide8();
		this.slide9 = new Slide9();
		this.slide10 = new Slide10();
		this.slide11 = new Slide11();
		this.slide12 = new Slide12();
		this.slide13 = new Slide13();
		this.slide14 = new Slide14();
		this.slide15 = new Slide15();
		this.slide16 = new Slide16();
		this.slide17 = new Slide17();
		this.slide18 = new Slide18();
		this.slide19 = new Slide19();
		this.slide20 = new Slide20();
		this.slide21 = new Slide21();
		this.slide22 = new Slide22();
		this.slide23 = new Slide23();
		this.slides = [this.slide1, this.slide2, this.slide3, this.slide4, this.slide5, this.slide6, this.slide7, this.slide8, this.slide9, this.slide10, this.slide11, this.slide12, this.slide13, this.slide14, this.slide15, this.slide16, this.slide17, this.slide18, this.slide19, this.Slide20, this.Slide21, this.Slide22, this.Slide23];
	}
	
	getNumSlides()
	{
		return this.slides.length;
	}
		
	getCurrentSlide(num)
	{
		let slide = this["slide"+num];
		return slide;
	}
	
	getTotalImages()
	{
		let totalImages = 0;
		for (let i=0; i < this.slides.length; i++)
		{
			totalImages += this.slides[i].getNumImages();
		}
		return totalImages;
	}
}