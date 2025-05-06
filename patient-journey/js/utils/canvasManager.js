class CanvasManager 
{
	constructor(src) 
	{		
		this.src = src;
		this.ctx = src.getContext("2d");
		
		this.height = src.height;
		this.width;
		this.height;
		this.defaultStrokeWidth = 3;	
	}
	
	/* ------------------------------------------------------------ */
	/* ----- General Set-up --------------------------------------- */
	
	setSize(width, height) 
	{		
		this.width = width;
		this.height = height;
	}
	
	setMargins(marginTop, marginRight, marginBottom, marginLeft)
	{
		this.src.style.marginTop = marginTop;
		this.src.style.marginRight = marginRight;
		this.src.style.marginBottom = marginBottom;
		this.src.style.marginLeft = marginLeft;
	}	
	
	setScale(x, y)
	{
		this.ctx.scale(x, y); 
	}
	
	getScale()
	{
		return this.ctx.scale;
	}
	
	setFont(font)
	{
		this.ctx.font = font;
	}
	
	measureText(font, txt)
	{
		this.setFont(font);
		return this.ctx.measureText(txt).width;
	}
	/* ------------------------------------------------------------ */
	/* ----- Saving Current State --------------------------------- */
	
	saveState()
	{
		this.ctx.save(); 
	}
	
	restoreState()
	{
		this.ctx.restore(); 
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Changing Current State ------------------------------- */
		
	setAlpha(alpha)
	{
		this.ctx.globalAlpha = alpha;
	}

	translate(pos)
	{
		this.ctx.translate(pos.x, pos.y); 		
	}
	
	rotate(angle)
	{	
		this.ctx.rotate(angle);			
	}
	
	setLineDash(dash, gap)
	{
		this.ctx.setLineDash([dash, gap]);
	}
	
	clearLineDash()
	{
		this.ctx.setLineDash([]);
	}
	
	
	
	/* ------------------------------------------------------------ */
	/* ----- Clearing --------------------------------------------- */
		
	clear(pos, width, height)
	{
		this.ctx.clearRect(pos.x, pos.y, width, height);
	}
	
	clearAll()
	{
		this.ctx.clearRect(0, 0, this.width, this.height);
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
		
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
		let rgbRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
		let hexRegex = /^#[0-9A-F]{6}$/i;		
		let isValid;
		if ((color.match(rgbRegex)) || (color.match(hexRegex)))
		{
			isValid = true;
		}
		
		return isValid;		
	}
	
	drawText(txt, pos, font, color, alignment)
	{
		this.ctx.beginPath();	
		this.ctx.font = font;
		this.ctx.textAlign = alignment;
		this.ctx.textBaseline = "middle";
		this.ctx.fillStyle = color;	
		this.ctx.fillText(txt, pos.x, pos.y,);
		this.ctx.closePath();
	}
	
	drawImage(img, pos)
	{
		this.ctx.drawImage(img, pos.x, pos.y, img.width, img.height);
	}
	
	drawImageScaled(img, pos, scale)
	{	
		this.ctx.drawImage(img, pos.x, pos.y, img.width * scale, img.height * scale);
	}
	
	drawLine(posStart, posEnd, strokeColor, strokeWidth)
	{
		this.clearLineDash();
		this.ctx.beginPath();	
		this.ctx.moveTo(posStart.x, posStart.y);
		this.ctx.lineTo(posEnd.x, posEnd.y);
		this.drawStroke(strokeColor, strokeWidth);	
		this.ctx.closePath();
	}	
	
	drawDashedLine(posStart, posEnd, dash, gap, strokeColor, strokeWidth)
	{	
		this.ctx.beginPath();	
		this.setLineDash(dash, gap);
		this.ctx.moveTo(posStart.x, posStart.y);
		this.ctx.lineTo(posEnd.x, posEnd.y);
		this.drawStroke(strokeColor, strokeWidth);	
		this.ctx.closePath();
		this.clearLineDash();
	}	
	
	drawRectangle(pos, width, height, fillColor, strokeColor, strokeWidth)
	{	
		this.ctx.beginPath();	
		this.ctx.rect(pos.x, pos.y, width, height);
		this.drawFill(fillColor);
		this.drawStroke(strokeColor, strokeWidth);	
		this.ctx.closePath();		
	}
	
	drawRoundedRectangle(pos, width, height, radii, fillColor, strokeColor, strokeWidth)
	{
		this.ctx.beginPath();
		this.ctx.roundRect(pos.x, pos.y, width, height, radii);
		this.drawFill(fillColor);
		this.drawStroke(strokeColor, strokeWidth);	
		this.ctx.closePath();	
	}
	
	drawArc(pos, radius, startAngle, endAngle, ccw, fillColor, strokeColor, strokeWidth)
	{
		this.ctx.beginPath();
		this.ctx.arc(pos.x, pos.y, radius, startAngle, endAngle, ccw);
		this.drawFill(fillColor);
		this.drawStroke(strokeColor, strokeWidth);	
		this.ctx.stroke();
	}
	
	drawCircle(pos, radius, fillColor, strokeColor, strokeWidth)
	{			
		this.ctx.beginPath();	
		this.ctx.arc(pos.x, pos.y, radius, 0 * Math.PI, 2 * Math.PI);
		this.drawFill(fillColor);
		this.drawStroke(strokeColor, strokeWidth);	
		this.ctx.closePath();
	}
	
	drawEllipse(pos, radiusX, radiusY, rotation, startAngle, endAngle, ccw, fillColor, strokeColor, strokeWidth)
	{	
		this.ctx.beginPath();		
		this.ctx.ellipse(pos.x, pos.y, radiusX, radiusY, rotation, startAngle * Math.PI, endAngle * Math.PI, ccw);
		this.drawFill(fillColor);
		this.drawStroke(strokeColor, strokeWidth);	
		this.ctx.closePath();
		this.ctx.restore();
	}
	
	drawTriangle(pos1, pos2, pos3, fillColor, strokeColor, strokeWidth)
	{
		this.ctx.beginPath();
		this.ctx.moveTo(pos1.x, pos1.y);
		this.ctx.lineTo(pos2.x, pos2.y);
		this.ctx.lineTo(pos3.x, pos3.y);
		this.ctx.lineTo(pos1.x, pos1.y);
		this.ctx.lineTo(pos2.x, pos2.y);
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
			{//console.log(cornerPos[i].x, cornerPos[i].y);
				this.ctx.moveTo(cornerPos[0].x, cornerPos[0].y);
			} 
			else 
			{//console.log(cornerPos[i].x, cornerPos[i].y);
				this.ctx.lineTo(cornerPos[i].x, cornerPos[i].y);
			}
		}
		
		this.drawFill(fillColor);
		this.drawStroke(strokeColor, strokeWidth);	
		this.ctx.closePath();	
	}
	
	
}