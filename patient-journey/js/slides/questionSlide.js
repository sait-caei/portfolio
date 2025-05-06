class QuestionSlide extends Slide
{
	constructor() 
	{	
		super();
		
		//General
		this.slideType = this.slideTypeQuestion;
		this.questionType = this.questionTypeSingle;
		this.selectionType = this.selectionTypeSingle;
		this.answerType = this.answerTypeIcons; 
		this.submissionType = this.submissionTypeUnlimited;
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Question Evaluation ---------------------------------- */
	
	evaluateIconQuestion()
	{					
		//Check answer
		let isCorrect = false;
		if (this.selectionType == this.selectionTypeSingle)
		{			
			this.clearDialog();
			this.removeAllDialogInteractables();
					
			let selectedAnswer = this.itemsThatAreCurrentlySelected[0];
			isCorrect = this.checkIfAnswerIsCorrect(selectedAnswer);
		}
		else if (this.selectionType == this.selectionTypeMultiple)
		{			
			isCorrect = this.checkIfSelectedAnswersAreCorrect();
		}
		this.displayIconQuestionFeedback(isCorrect);

		//Update slide completion status
		this.evaluateCompletionStatus(isCorrect);
	}
	
	evaluateTextQuestion()
	{		
		//Check answer(s)
		let isCorrect = this.checkIfSelectedAnswersAreCorrect();
		this.displayTextQuestionFeedback(isCorrect);
		
		//If correct, remove submit button
		if (isCorrect)
		{ 
			//Disable selectable text			
			for (let i=0; i < this.curInteractableItems.length; i++)
			{
				if (this.curInteractableItems[i].id.includes("txtAnswer"))
				{
					this.curInteractableItems[i].setToEnabled(false);
				}
			}
						
			this.removeDialogButtons();
		}			

		//Update slide completion status
		this.evaluateCompletionStatus(isCorrect);		
	}
		
	checkIfAnswerIsCorrect(interactable)
	{	
		let answerIsCorrect = false;		
		let correctAnswers = this["correctAnswers"+this.curQuestion]; 
		for (let i = 0; i < correctAnswers.length; i++)
		{
			let answer;
			if (this.answerType == this.answerTypeIcons)
			{		
				let num = interactable.getAnswer();				
				answer = this["answer"+num+this.curQuestion];
			}
			else
			{
				answer = interactable.getText();
			}
			
			if (answer == correctAnswers[i]) answerIsCorrect = true;
		}
		return answerIsCorrect;
	}
	
	checkIfSelectedAnswersAreCorrect()
	{
		let answersAreCorrect = true;
		
		//Check if all correct answers have been selected
		let correctAnswers = this["correctAnswers"+this.curQuestion];
		for (let i = 0; i < correctAnswers.length; i++)
		{			
			let answerIsCorrect = false;			
			for (let j = 0; j < this.itemsThatAreCurrentlySelected.length; j++)
			{
				let selectedAnswer = this.itemsThatAreCurrentlySelected[j]; 
				if (this.answerType == this.answerTypeIcons)
				{				
					let num = selectedAnswer.getProperID().replace("Answer", ""); 
					selectedAnswer = this["answer"+num+this.curQuestion]; 
				}
				else if (this.answerType == this.answerTypeText)
				{
					selectedAnswer = selectedAnswer.getText();
				}
				if (selectedAnswer == correctAnswers[i]) answerIsCorrect = true;
			} 
			if (!answerIsCorrect) answersAreCorrect = false;
		}
		
		//Check if any incorrect answers are selected
		for (let i = 0; i < this.itemsThatAreCurrentlySelected.length; i++)
		{
			let answerIsCorrect = this.checkIfAnswerIsCorrect(this.itemsThatAreCurrentlySelected[i]);
			if (!answerIsCorrect) answersAreCorrect = false;
		}
		
		return answersAreCorrect;
	}
	
	setButtonType(isCorrect)
	{
		let btnType = "";	
		if (this.submissionType == this.submissionTypeUnlimited)
		{
			if (isCorrect)
			{
				btnType = "";
			}
			else
			{
				btnType = "Try Again";
			}
		}
		return btnType;
	}
	
	evaluateCompletionStatus(isCorrect)
	{	
		this.setCompletionStatus(false);
		
		if (isCorrect)
		{
			this.setCompletionStatus(true);
		}
		else
		{
			if (this.submissionType == this.submissionTypeSingle)
			{
				this.setCompletionStatus(true);
			}			
		}
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Question Feedback ------------------------------------ */
	
	displayIconQuestionFeedback(isCorrect)
	{
		if (this.selectionType == this.selectionTypeSingle)
		{									
			//Get selected answer			
			let selectedAnswer = this.itemsThatAreCurrentlySelected[0];
			let selectedAnswerNum = this.itemsThatAreCurrentlySelected[0].getAnswer();
			let selectedAnswerText = this["answer"+selectedAnswerNum];
			this.addToItemsThatHaveBeenInteractedWith(selectedAnswer);
							
			//Display feedback
			let img = this["imgOption"+selectedAnswerText+"Inactive"];
			if (img == null) img = this["imgDialog"+selectedAnswerText];	
			let feedbackTxt = this["txtFeedback"+selectedAnswerText];
			let btnType = this.setButtonType(isCorrect); 
			if (isCorrect)
			{
				this.addFeedbackDialog(img, "Correct", this.colourCorrect, feedbackTxt, btnType);
			}
			else
			{
				this.addFeedbackDialog(img, "Incorrect", this.colourIncorrect, feedbackTxt, btnType);				
			}		
		}
		else if (this.selectionType == this.selectionTypeMultiple)
		{			
			this.dialog.setFeedbackType(isCorrect);
			this.dialog.setFeedbackToVisible(true);
		}
	}
	
	displayTextQuestionFeedback(isCorrect)
	{
		this.updateSelectableTextAnswers();
		this.dialog.setFeedbackType(isCorrect);
		this.dialog.setFeedbackToVisible(true);
	}
	
	
}