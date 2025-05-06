class GlossaryDialog extends Dialog
{
	constructor(pos, width) 
	{	
		super(pos, width, "", "GLOSSARY", "#ffffff", "", "");
		
		//General	
		this.cornerRadius = 0; //In pixels
		this.alpha = 1;
		this.txtNoTerms = "There are no glossary terms used on this slide.";
		this.termsData;
		
		//Pagination
		this.curPage;
		this.totalPages;
		this.posTxtPage;
		this.btnPrevPage;
		this.btnNextPage
		
		this.init();
		
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- General Set-up --------------------------------------- */
	
	init()
	{		
		super.init();
		
		this.curPage = 1;
		this.height = 531;
		this.posTxt = {x: this.posTxt.x, y:this.posTxt.y - 5};
		this.posTxtPage = {x: this.pos.x + this.width/2, y:this.pos.y + this.height - 30};
								
		//Setup canvas buttons
		let width = 10;
		let height = 12;;
		let x = this.posTxtPage.x - 20;
		let y = this.posTxtPage.y - 17;
		this.btnPrevPage = new Button(canvasDialog, "btnPrevPage", "◄",  width, height, {x:x - (width * 2) - 40, y: y});	
		this.btnNextPage = new Button(canvasDialog, "btnNextPage", "►",  width, height, {x:x + (width * 2) + 40, y: y});
	}
	
	setTerms(terms)
	{	
		this.termsData = terms.sort(this.sortAlphabetically);				
		this.breakInToPages();		
		this.update();
	}	
	
	sortAlphabetically(a, b) 
	{ 
	   if (a[0] < b[0]) return -1;
	   if (a[0] > b[0]) return 1;
	   return 0;
	 }

	/*sortTerms(data)
	{
		return data;
	}*/
	
	breakInToPages()
	{
		this.termPageGroupings = [];
		
		let i = 0;
		let curPage = 0;
		let lines = 0;
		let lineLimit = 22;
		while (i < this.termsData.length)
		{
			//Count number of lines the current term will add to the page
			let curTermData = this.termsData[i]; 
			let curTermDataDefinition = curTermData[2]; 
			let countOfLineBreaks = (curTermDataDefinition.match(/\n/g) || []).length;
			let linesForCurrentTerm = (countOfLineBreaks + 2);
			lines += linesForCurrentTerm;
				
			//If the number of lines is past the line limit, start a new page grouping for the current term
			if (lines > lineLimit)	
			{
				curPage++;
				lines = linesForCurrentTerm;
			}
			
			//Push the term to the current page grouping
			if (!this.termPageGroupings[curPage])
			{
				this.termPageGroupings[curPage] = [];
			}
			this.termPageGroupings[curPage].push(curTermData);			
			i++;
		}
		this.totalPages = this.termPageGroupings.length;
	}
	
	update()
	{
		//Clear text
		this.txt = "";
		
		//Set text for visible terms
		if (this.termsData.length > 0)
		{			
			let curGrouping = this.termPageGroupings[this.curPage-1];
			for (let i = 0; i < curGrouping.length; i++)
			{
				let curTermData = curGrouping[i]; 				
				let curTerm = curTermData[0];
				let curTermAbbreviation = curTermData[1];
				let curTermDescription = curTermData[2];
				this.txt += "<b>"+curTerm;
				if (curTermAbbreviation)
				{
					this.txt += " ("+curTermAbbreviation+")";
				}
				this.txt += ":<bend> "+curTermDescription+"\n\n";
			}
		}
		else
		{
			this.txt = this.txtNoTerms;
		}
		this.txtLines = this.txt.split('\n');	
		
		this.updateNavButtons();
	}	
	
	getButton(id)
	{
		if (id == "btnPrevPage")
		{
			return this.btnPrevPage;
		}
		else if (id == "btnNextPage")
		{
			return this.btnNextPage;
		}
		return null;
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Pagination ------------------------------------------- */
				
	updateNavButtons()
	{
		this.btnPrevPage.setToEnabled(false);
		this.btnNextPage.setToEnabled(false);		
		if (this.curPage > 1)
		{
			this.btnPrevPage.setToEnabled(true);
		}
		if (this.curPage < this.totalPages)
		{
			this.btnNextPage.setToEnabled(true);
		}
	}
	
	prevPage()
	{
		this.curPage--;
		this.update();
	}
	
	nextPage()
	{
		this.curPage++;
		this.update();
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Drawing ---------------------------------------------- */
	
	draw() 
	{						
		super.draw();
		
		if (this.totalPages > 1)
		{
			this.drawPaginationElements();
		}
	}	
	
	drawPaginationElements()
	{
		let txt = this.curPage + " of "+this.totalPages;
		canvasDialog.drawText(txt, this.posTxtPage, "Bold 16px Arial", "#000000", "center");
		
		this.btnPrevPage.draw();
		this.btnNextPage.draw();
	}
}