class CanvasManager 
{
	constructor(src) 
	{		
		this.src = src;
		this.ctx = src.getContext("2d");
		
		this.height = src.height;
		this.maxWidth;
		this.maxHeight;		
		
		this.dT = new CanvasDrawTool(this.ctx);
		this.setWidth(src.width);
		this.setHeight(src.height);
	}
	
	setParameters(maxWidth, maxHeight) 
	{
		this.maxWidth = maxWidth;
		this.maxHeight = maxHeight;	
		
		this.setWidth(this.maxWidth);
		this.setHeight(this.maxHeight);		
	}
	
	setWidth(width) 
	{		
		this.width = width;
		if ((this.maxWidth) && (this.width > this.maxWidth)) this.width = this.maxWidth;
		this.ctx.canvas.width = this.width;
		this.dT.width = this.width;
	}
	
	getWidth()
	{
		return this.width;
	}
	
	setHeight(height) 
	{		
		this.height = height;
		if ((this.maxHeight) && (this.height > this.maxHeight)) this.height = this.maxHeight;
		this.ctx.canvas.height = this.height;
		this.dT.height = this.height;
	}
	
	getHeight()
	{
		return this.height;
	}
	
	setScale(x, y)
	{
		this.ctx.scale(x, y);
	}
	
	getScale()
	{
		return this.ctx.scale;
	}
	
	setAlpha(alpha)
	{
		this.ctx.globalAlpha = alpha;
	}

	saveState()
	{
		this.ctx.save(); 
	}
	
	restoreState()
	{
		this.ctx.restore(); 
	}
	
	translate(pos)
	{
		this.ctx.translate(pos[0], pos[1]); 
		
	}
	
	rotate(angle)
	{	
		this.ctx.rotate(angle);			
	}
	
	measureText(txt)
	{	
		return this.ctx.measureText(txt);
	}
		
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
		
	drawText(txt, pos, font, color, alignment)
	{
		if (!alignment) alignment = "center";
		this.dT.drawText(txt, pos, font, color, alignment);
	}
	
	drawImage(img, pos)
	{
		this.dT.drawImage(img, pos);
	}
	
	drawImageScaled(img, pos, width, height)
	{
		this.dT.drawImageScaled(img, pos, width, height);
	}
	
	drawLine(startPos, endPos, strokeColor, strokeWidth)
	{
		this.dT.drawLine(startPos, endPos, strokeColor, strokeWidth);
	}
	
	drawDashedLine(startPos, endPos, dashLength, spaceLength, strokeColor, strokeWidth)
	{
		this.dT.drawDashedLine(startPos, endPos, dashLength, spaceLength, strokeColor, strokeWidth)
	}
	
	drawRectangle(startPos, width, height, fillColor, strokeColor, strokeWidth)
	{
		this.dT.drawRectangle(startPos, width, height, fillColor, strokeColor, strokeWidth);
	}
	
	drawCircle(startPos, radius, startAngleRadians, endAngleRadians, fillColor, strokeColor, strokeWidth)
	{
		this.dT.drawCircle(startPos, radius, startAngleRadians, endAngleRadians, fillColor, strokeColor, strokeWidth);			
	}
	
	drawOval(startPos, radius, startAngleRadians, endAngleRadians, xScalePercent, yScalePercent, fillColor, strokeColor, strokeWidth)
	{
		this.dT.drawOval(startPos, radius, startAngleRadians, endAngleRadians, xScalePercent, yScalePercent, fillColor, strokeColor, strokeWidth);
	}
	
	drawTriangle(pos1, pos2, pos3, fillColor, strokeColor, strokeWidth)
	{
		this.dT.drawTriangle(pos1, pos2, pos3, fillColor, strokeColor, strokeWidth);
	}
	
	drawShape(cornerPos, fillColor, strokeColor, strokeWidth)
	{
		this.dT.drawShape(cornerPos, fillColor, strokeColor, strokeWidth);
	}
	
	clearAll()
	{
		this.dT.clearAll();
	}
}

class CanvasDrawTool 
{
	constructor(ctx) 
	{
		this.ctx = ctx;
		this.width;
		this.height;
		this.defaultStrokeWidth = 3;
	}
	
	drawFill(fillColor)
	{
		if (this.isColorValid(fillColor))
		{
			this.ctx.fillStyle = fillColor;
			this.ctx.fill();	
		}
	}	
	
	drawStroke(strokeColor, strokeWidth)
	{
		if (this.isColorValid(strokeColor))
		{
			this.ctx.strokeStyle = strokeColor;			
			if (!strokeWidth)	strokeWidth = this.defaultStrokeWidth;
			this.ctx.lineWidth = strokeWidth;
			this.ctx.stroke();	
		}		
	}
	
	isColorValid(color)
	{
		//if (/^#[0-9A-F]{6}$/i.test(color) == false) console.log("ERROR: Color ("+color+") not valid");
		let isValid = false;
		if (/^#[0-9A-F]{6}$/i.test(color)) isValid = true;
		if (color.includes("rgb")) isValid = true;
		
		return isValid;		
	}
	
		
	drawText(txt, pos, font, color, alignment) 
	{
		this.ctx.beginPath();	
		this.ctx.font = font;
		this.ctx.textAlign = alignment;
		this.ctx.textBaseline = "middle";
		this.ctx.fillStyle = color;	
		this.ctx.fillText(txt, pos[0], pos[1],);
		this.ctx.closePath();
	}	
	
	drawImage(img, pos)
	{		
		this.ctx.drawImage(img, pos[0], pos[1], img.width, img.height);
	}
	
	drawImageScaled(img, pos, width, height)
	{		
		this.ctx.drawImage(img, pos[0], pos[1], width, height);
	}
	
	drawLine(startPos, endPos, strokeColor, strokeWidth) 
	{ 		
		this.ctx.beginPath();	
		this.ctx.moveTo(startPos[0], startPos[1]);
		this.ctx.lineTo(endPos[0], endPos[1]);
		this.drawStroke(strokeColor, strokeWidth);	
		this.ctx.closePath();
	}

	drawDashedLine(startPos, endPos, dashLength, spaceLength, strokeColor, strokeWidth)
	{
		this.ctx.setLineDash([dashLength, spaceLength]);
		this.ctx.beginPath();
		this.ctx.moveTo(startPos[0], startPos[1]);
		this.ctx.lineTo(endPos[0], endPos[1]);
		this.drawStroke(strokeColor, strokeWidth);
		this.ctx.closePath();
		this.ctx.setLineDash([]); //Clear dash
	}	
	
	drawRectangle(startPos, width, height, fillColor, strokeColor, strokeWidth) 
	{ 		
		this.ctx.beginPath();	
		this.ctx.rect(startPos[0], startPos[1], width, height);
		this.drawFill(fillColor);
		this.drawStroke(strokeColor, strokeWidth);	
		this.ctx.closePath();		
	}
	
	drawCircle(startPos, radius, startAngleRadians, endAngleRadians, fillColor, strokeColor, strokeWidth) 
	{			
		this.ctx.beginPath();
		this.ctx.arc(startPos[0], startPos[1], radius, startAngleRadians * Math.PI, endAngleRadians * Math.PI);
		this.drawFill(fillColor);
		this.drawStroke(strokeColor, strokeWidth);	
		this.ctx.closePath();
	}
	
	drawOval(startPos, radius, startAngleRadians, endAngleRadians, xScalePercent, yScalePercent, fillColor, strokeColor, strokeWidth) 
	{
		if (xScalePercent > 1) xScalePercent = xScalePercent/100;
		if (yScalePercent > 1) yScalePercent = yScalePercent/100;
		this.ctx.save();
		this.ctx.beginPath();
        this.ctx.scale(xScalePercent, yScalePercent);
		this.ctx.arc(startPos[0]/xScalePercent, startPos[1]/yScalePercent, radius, startAngleRadians * Math.PI, endAngleRadians * Math.PI);
		this.drawFill(fillColor);		
		this.drawStroke(strokeColor, strokeWidth);	
		this.ctx.closePath();
		this.ctx.restore();
	}
	
	drawTriangle(pos1, pos2, pos3, fillColor, strokeColor, strokeWidth) {
		this.ctx.beginPath();
		this.ctx.moveTo(pos1[0], pos1[1]);
		this.ctx.lineTo(pos2[0], pos2[1]);
		this.ctx.lineTo(pos3[0], pos3[1]);
		this.ctx.lineTo(pos1[0], pos1[1]);
		this.ctx.lineTo(pos2[0], pos2[1]);
		this.drawFill(fillColor);
		this.drawStroke(strokeColor, strokeWidth);	
		this.ctx.closePath();	
	}
	
	drawShape(cornerPos, fillColor, strokeColor, strokeWidth) 
	{
		this.ctx.beginPath();
		for (let i = 0; i < cornerPos.length; i++) 
		{
			if (i == 0)
			{
				this.ctx.moveTo(cornerPos[0][0], cornerPos[0][1]);
			} 
			else 
			{
				this.ctx.lineTo(cornerPos[i][0], cornerPos[i][1]);
			}
		}
		//Closes shape between final corner and first corner and redraws 
		//path between first corner and second corner so it looks completely connected
		if (cornerPos.length >= 3)
		{
			//this.ctx.lineTo(cornerPos[0][0], cornerPos[0][1]);
			//this.ctx.lineTo(cornerPos[1][0], cornerPos[1][1]);
		}
		
		this.drawFill(fillColor);
		this.drawStroke(strokeColor, strokeWidth);	
		this.ctx.closePath();	
	}
		
	clearAll() 
	{
		this.ctx.clearRect(0, 0, this.width, this.height);
	}
}