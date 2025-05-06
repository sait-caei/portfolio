class Dialog
{
	constructor(pos, width, imgIcon, txtHeading, headingColour, txt, btnType) 
	{
		//General
		this.txt = txt;
		this.txtLines;
		this.btnType = btnType;
		
		//Size and positioning
		this.pos = pos;
		this.posBackground = {x:70, y:60};
		this.width = width;	
		this.height;	
		this.cornerRadius = 8; //In pixels
		this.minHeight = 95;	
		this.paddingH = 10;		
		this.paddingV = 25;	

		//Background	
		this.alpha = 0.35;	
		this.fadeBackground;
		this.bgColor = "#ffffff";
		this.bgColorFaded = "#000000";
		this.borderWidth = "2.5";
		
		//Icon
		this.imgIcon = imgIcon;	
		this.posIcon;
		
		//Heading
		this.txtHeading = txtHeading; 
		this.heightHeading = 30;
		this.headingColour = headingColour;
		this.defaultColour = "#000000";
		
		//Text
		this.buffer = 35;
		this.lineHeight = 20;
		this.txtOffset = 12;
		this.posHeading = {x: this.pos.x + (this.paddingH * 2), y:this.pos.y + this.paddingV};
		this.posTxt = {x: this.posHeading.x, y:this.pos.x + this.txtOffset + (this.paddingH * 2) + this.heightHeading};
		this.txtStyleHeading = "Bold 16px Arial";
		this.txtStyle = "14px Arial";
		this.txtStyleBold = "Bold 14px Arial";
		this.txtColour = "#000000";
		this.txtAlign = "left";
		
		//Button
		this.btn;
		this.btn2;
		this.btnWidth = 65;
		this.btnHeight = 12;
		this.btnPaddingH = 30;
		
		//Feedback
		this.imgCheck;
		this.imgX;
		this.posFeedback;
		
		this.init();
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- General ---------------------------------------------- */
		
	init()
	{	
		//Set up headingColour
		if (!this.headingColour)	this.headingColour = this.defaultColour;
		
		//Set up text
		this.txtLines = this.txt.split('\n'); 
		this.height = (this.paddingH * 3) + this.heightHeading + (this.txtLines.length * this.lineHeight);
		if (this.height < this.minHeight) this.height = this.minHeight;
		
		//Set up main (top left corner) icon
		if (this.imgIcon) this.addMainIcon();
		
		//Set up button
		this.addButton(this.btnType);
		
		this.reset();
	}	
	
	reset () 
	{
		this.setBackgroundToFaded(true);
	}
			
	setToEnabled(bln)
	{
		if (this.btn) this.btn.setToEnabled(bln);
		if (this.btn2) this.btn2.setToEnabled(bln);
	}
	
	getPos()
	{
		return this.pos;
	}
	
	/*modifyYPos(yMod)
	{
		this.pos = {x:this.pos.x, y:this.pos.y + yMod};
		this.posHeading = {x:this.posHeading.x, y:this.posHeading.y + yMod};
		this.posTxt = {x:this.posTxt.x, y:this.posTxt.y + yMod};
	}*/
	
	getTextPos()
	{
		return this.posTxt;
	}
	
	getHeight()
	{
		return this.height;
	}
	
	setHeight(height)
	{
		this.height = height;
		this.updateButtonPos();
	}
	
	setBackgroundToFaded(bln)
	{
		this.fadeBackground = bln;
	}
	
	setFeedbackImages(imgCheck, imgX)
	{
		this.imgCheck = imgCheck; 
		this.imgX = imgX;	
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Icons ------------------------------------------------ */
	
	addMainIcon()
	{		
		//Add icon
		this.posIcon = {x:this.pos.x - 50, y:this.pos.y - 35};
		this.icon = new Icon("", "", this.posIcon, this.imgIcon);	
		
		//Adjust text position
		this.posHeading = {x: this.posIcon.x + this.imgIcon.width, y:this.posHeading.y};
		this.posTxt = {x: this.posHeading.x, y:this.posTxt.y};
		if (this.txtHeading == "")
		{
			this.posTxt = {x: this.posTxt.x, y:this.posTxt.y - 10};
		}
	}
	
	offsetMainIcon()
	{		
		//Update dialog height
		let curHeight = this.height;
		let newHeight = (this.buffer * 1.5) + (this.txtLines.length * this.lineHeight) + this.buffer/3;
		newHeight += 100 - (this.txtLines.length * this.lineHeight) + this.paddingV/2;
		if (newHeight > curHeight) this.height = newHeight;
		if (this.height < this.minHeight) this.height = this.minHeight;	
		this.updateButtonPos();
		
		//Add icon
		this.posIcon = {x:this.pos.x + 5, y:this.pos.y + 10};
		this.icon = new Icon("", "", this.posIcon, this.imgIcon);	
		
		//Adjust text position
		this.posHeading = {x: this.posIcon.x + this.imgIcon.width + 5, y:this.posHeading.y};
		this.posTxt = {x: this.posHeading.x, y:this.posTxt.y};
		if (this.txtHeading == "")
		{
			this.posTxt = {x: this.posTxt.x, y:this.posTxt.y - 10};
		}
		this.posFeedback = {x: this.posHeading.x + 75, y: this.posHeading.y - 12};
	}
	
	addSpaceForIconRow()
	{
		let pos = this.getIconRowPos();
		
		//Update dialog height
		let posYLower = pos.y + 90;
		this.height = posYLower - this.pos.y;
		if (this.height < this.minHeight) this.height = this.minHeight;		
		this.updateButtonPos();
	}
	
	getIconRowPos()
	{
		let x = this.pos.x + this.width/2;
		let y = this.pos.y + (this.paddingH * 2) + this.heightHeading + (this.txtLines.length * this.lineHeight);
		let pos = {x:x, y:y};
		
		return pos;
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Text ------------------------------------------------- */
	
	getAnswerTextPos(numAnswers)
	{
		let x = this.posTxt.x + 40;
		let y = this.posTxt.y + (this.lineHeight * this.txtLines.length);
		let pos = {x:x, y:y};
		
		return pos;
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Button ----------------------------------------------- */
	
	addButton(btnType)
	{
		this.btnType = btnType;
		
		let posL = {x: this.pos.x, y:this.pos.y + this.height + this.paddingV/2}; 
		let posR = {x: this.pos.x + this.width - this.btnWidth - this.btnPaddingH, y:this.pos.y + this.height + this.paddingV/2}; 
		switch (this.btnType)
		{
			case "Continue":	
				this.btn = new Button(canvasDialog, "btnContinue", "Continue ►", this.btnWidth, this.btnHeight, posR); break;		
			case "Return":		this.btn = new Button(canvasDialog, "btnReturn", "◄ Return", this.btnWidth, this.btnHeight, posR); break;	
			case "Return/Continue":	
				this.btn = new Button(canvasDialog, "btnContinue", "Continue ►", this.btnWidth, this.btnHeight, posR); 
				this.btn2 = new Button(canvasDialog, "btnReturn", "◄ Return", this.btnWidth, this.btnHeight, posL);
				break;	
			case "ReturnL":	
				this.btn = new Button(canvasDialog, "btnReturn", "◄ Return", this.btnWidth, this.btnHeight, posL);
				break;	
				
			case "Start":		this.btn = new Button(canvasDialog, "btnStart", "Start", this.btnWidth, this.btnHeight, posR); break;				
			case "Submit":		this.btn = new Button(canvasDialog, "btnSubmit", "Submit", this.btnWidth, this.btnHeight, posR); break;					
			case "Try Again":	this.btn = new Button(canvasDialog, "btnTryAgain", "Try Again", this.btnWidth, this.btnHeight, posR); break;
		}
	}
	
	getButton(num)
	{
		if (num == 2)
		{
			return this.btn2;
		}
		return this.btn;
	}
	
	updateButtonPos()
	{
		let pos = {x: this.pos.x + this.width - this.btnWidth - this.btnPaddingH, y:this.pos.y + this.height + this.paddingV/2};
		if (this.btn) this.btn.setPos(pos);
	}
	
	removeButton()
	{
		this.btn = null;
		this.btn2 = null;
	}
	
	
	
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	draw() 
	{	
		if (this.fadeBackground)
		{
			//Draw rectangle to fade everything behind dialog
			canvasDialog.saveState();
			canvasDialog.setAlpha(this.alpha);
			canvasDialog.drawRectangle(this.posBackground, 860, 535, this.bgColorFaded, "", "");
			canvasDialog.restoreState();
		}
	
		//Draw background
		canvasDialog.saveState();
		canvasDialog.setAlpha(0.9);
		canvasDialog.drawRoundedRectangle(this.pos, this.width, this.height, [this.cornerRadius], this.bgColor, "#000000", this.borderWidth);
		canvasDialog.restoreState();
				
		this.drawHeading();
		this.drawText();
		if (this.icon) this.icon.draw();
	}
	
	drawHeading()
	{	
		if (this.txtHeading == "") return;
	
		//Draw heading background
		if ((this.headingColour != "") && (this.headingColour != this.defaultColour))
		{
			let pos = {x: this.pos.x + this.paddingH, y: this.posHeading.y - 16};
			canvasDialog.drawRoundedRectangle(pos, this.width - (this.paddingH * 2), this.heightHeading, [this.cornerRadius, this.cornerRadius, 0, 0], "#444445", "", "");
		}	

		//Draw heading text
		canvasDialog.drawText(this.txtHeading, this.posHeading, this.txtStyleHeading, this.headingColour, this.txtAlign);
	}
	
	drawText()
	{		
		let pos = this.posTxt;
		if (this.txtLines)
		{
			for (let i=0; i < this.txtLines.length; i++)
			{
				this.drawTextLine(this.txtLines[i], pos);
				pos = {x: pos.x, y:pos.y + this.lineHeight};
			}
		}
		else
		{
			this.drawTextLine(this.txt, pos);
		}
	}
	
	drawTextLine(txt, pos)
	{
		let txtBroken = txt.split('<b>'); 
		if (txtBroken.length > 1)
		{	
			//Break up text
			let txtBefore = txtBroken[0];
			let txtAfter = txtBroken[1];
			let txtBroken2 = txtAfter.split('<bend>');
			let txtBolded = txtBroken2[0];
			txtAfter = txtBroken2[1]; 

			//Set position
			let txtBeforeWidth = canvasDialog.measureText(this.txtStyle, txtBefore);
			let txtBoldedWidth = canvasDialog.measureText(this.txtStyleBold, txtBolded); 
			let posBold = {x:pos.x + txtBeforeWidth, y:pos.y};
			let posAfter = {x:posBold.x + txtBoldedWidth, y:pos.y};
			
			//Draw text
			canvasDialog.drawText(txtBefore, pos, this.txtStyle, this.txtColour, this.txtAlign);
			canvasDialog.drawText(txtBolded, posBold, this.txtStyleBold, this.txtColour, this.txtAlign);
			canvasDialog.drawText(txtAfter, posAfter, this.txtStyle, this.txtColour, this.txtAlign);
		}
		else
		{
			canvasDialog.drawText(txt, pos, this.txtStyle, this.txtColour, this.txtAlign);
		}
	}
}