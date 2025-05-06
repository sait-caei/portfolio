class ChartDialog extends Dialog
{
	constructor(pos, width, imgIconChart, imgIconHR, imgIconBP, imgIconRR, imgIconBO, imgIconBG) 
	{	
		super(pos, width, "", "", "", "", "");
		
		//General	
		this.height = 450;
		
		//images
		this.imgIcon = imgIconChart;
		this.imgIconHR = imgIconHR;
		this.imgIconBP = imgIconBP;
		this.imgIconRR = imgIconRR;
		this.imgIconBO = imgIconBO;
		this.imgIconBG = imgIconBG;
		
		//Text
		this.posTxtHR;
		this.posTxtBP;
		this.txtStyle = "14px Arial";
		this.txtStyleBold = "Bold 14px Arial";		
		this.colourBlack = "#000000";
		this.colourRed = "#ff0000";
		this.colourGreen = "#00ff00";
		
		this.init();
		
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- General Set-up --------------------------------------- */
		
	init()
	{	
		if (!this.imgIcon) return;
		
		this.reset();		
		
		//Set section pos
		let yOffset = 70;
		this.posTxtHR = {x: this.pos.x + 230, y:this.pos.y + yOffset * 0.75};
		this.posTxtBP = {x: this.posTxtHR.x, y:this.posTxtHR.y + yOffset};
		this.posTxtRR = {x: this.posTxtBP.x, y:this.posTxtBP.y + yOffset};
		this.posTxtBO = {x: this.posTxtRR.x, y:this.posTxtRR.y + 110};
		this.posTxtBG = {x: this.posTxtBO.x, y:this.posTxtBO.y + yOffset};
		
		//Setup icons
		let rightMod = 305;
		let leftMod = 120;
		this.addMainIcon();
		let posIconHR = {x:this.posTxtHR.x + rightMod, y:this.posTxtHR.y - 25};
		let posIconBP = {x:this.posTxtBP.x - leftMod, y:this.posTxtBP.y - 35};
		let posIconRR = {x:this.posTxtRR.x + rightMod, y:this.posTxtRR.y};		
		let posIconBO = {x:this.posTxtBO.x - leftMod, y:this.posTxtBO.y - 35};
		let posIconBG = {x:this.posTxtBG.x + rightMod, y:this.posTxtBG.y - 35};
		this.iconHeartRate = new Icon("", "", posIconHR, this.imgIconHR);
		this.iconBloodPressure = new Icon("", "", posIconBP, this.imgIconBP);
		this.iconRespirationRate = new Icon("", "", posIconRR, this.imgIconRR);
		this.iconBloodOxygen = new Icon("", "", posIconBO, this.imgIconBO);
		this.iconBloodGlucose = new Icon("", "", posIconBG, this.imgIconBG);
	}		
		
	
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	draw() 
	{						
		super.draw();
		
		//Draw heart rate information
		this.iconHeartRate.draw();
		canvasDialog.drawText("Heart Rate:", this.posTxtHR, this.txtStyleBold, this.colourBlack, this.txtAlign);
		canvasDialog.drawText("Elevated", {x: this.posTxtHR.x + 80, y:this.posTxtHR.y}, this.txtStyleBold, this.colourRed, this.txtAlign);
		canvasDialog.drawText("Heart: Determine heart rate by checking pulse.", {x: this.posTxtHR.x, y:this.posTxtHR.y + 20}, this.txtStyle, this.colourBlack, this.txtAlign);
		let posLine = {x:this.posTxtHR.x, y:this.posTxtHR.y + 45}
		let lineLength = 300;
		canvasDialog.drawLine(posLine, {x:posLine.x + lineLength, y:posLine.y}, "#000000", "2");
		
		//Draw blood pressure information
		this.iconBloodPressure.draw();
		canvasDialog.drawText("Blood Pressure:", this.posTxtBP, this.txtStyleBold, this.colourBlack, this.txtAlign);
		canvasDialog.drawText("Elevated", {x: this.posTxtBP.x + 115, y:this.posTxtBP.y}, this.txtStyleBold, this.colourRed, this.txtAlign);
		canvasDialog.drawText("Blood pressure cuff: Measures blood pressure.", {x: this.posTxtBP.x, y:this.posTxtBP.y + 20}, this.txtStyle, this.colourBlack, this.txtAlign);
		posLine = {x:this.posTxtBP.x, y:this.posTxtBP.y + 45}
		canvasDialog.drawLine(posLine, {x:posLine.x + lineLength, y:posLine.y}, "#000000", "2");
		
		//Draw respiration rate information
		this.iconRespirationRate.draw();
		canvasDialog.drawText("Respiration Rate:", this.posTxtRR, this.txtStyleBold, this.colourBlack, this.txtAlign);
		canvasDialog.drawText("Elevated", {x: this.posTxtRR.x + 120, y:this.posTxtRR.y}, this.txtStyleBold, this.colourRed, this.txtAlign);
		canvasDialog.drawText("Lung: Count respiration rate (breaths per minute). ", {x: this.posTxtRR.x, y:this.posTxtRR.y + 20}, this.txtStyle, this.colourBlack, this.txtAlign);
		canvasDialog.drawText("An elevated or decreased breathing rate can", {x: this.posTxtRR.x, y:this.posTxtRR.y + 40}, this.txtStyle, this.colourBlack, this.txtAlign);
		canvasDialog.drawText("indicate a health problem.", {x: this.posTxtRR.x, y:this.posTxtRR.y + 60}, this.txtStyle, this.colourBlack, this.txtAlign);
		posLine = {x:this.posTxtRR.x, y:this.posTxtRR.y + 85}
		canvasDialog.drawLine(posLine, {x:posLine.x + lineLength, y:posLine.y}, "#000000", "2");
		
		//Draw blood oxygen information
		this.iconBloodOxygen.draw();
		canvasDialog.drawText("Blood Oxygen:", this.posTxtBO, this.txtStyleBold, this.colourBlack, this.txtAlign);
		canvasDialog.drawText("Typical", {x: this.posTxtBO.x + 105, y:this.posTxtBO.y}, this.txtStyleBold, this.colourGreen, this.txtAlign);
		canvasDialog.drawText("SpO2: Measures the amount of oxygen in the blood.", {x: this.posTxtBO.x, y:this.posTxtBO.y + 20}, this.txtStyle, this.colourBlack, this.txtAlign);
		posLine = {x:this.posTxtBO.x, y:this.posTxtBO.y + 45}
		canvasDialog.drawLine(posLine, {x:posLine.x + lineLength, y:posLine.y}, "#000000", "2");
		
		//Draw blood glucose information
		this.iconBloodGlucose.draw();
		canvasDialog.drawText("Blood Glucose:", this.posTxtBG, this.txtStyleBold, this.colourBlack, this.txtAlign);
		canvasDialog.drawText("Elevated", {x: this.posTxtBG.x + 110, y:this.posTxtBG.y}, this.txtStyleBold, this.colourRed, this.txtAlign);
		canvasDialog.drawText("Plasma separator tube: Determines the glucose ", {x: this.posTxtBG.x, y:this.posTxtBG.y + 20}, this.txtStyle, this.colourBlack, this.txtAlign);
		canvasDialog.drawText("level in the patient plasma.", {x: this.posTxtBG.x, y:this.posTxtBG.y + 40}, this.txtStyle, this.colourBlack, this.txtAlign);
	}	
}