class EventOptions
{
	constructor() { }
	
	/* ------------------------------------------------------------ */
	/* ----- General Set-up --------------------------------------- */
	
	init()
	{
		this.setupSelectionOptions();
		this.setupSupplementaryInfo();
	}
	
	setupSelectionOptions()
	{	
		//Options for basic steps
		this.opGuest = ["8 to 32", "32 to 100", "100 to 500", "500+"];			
		this.opFunc = ["Meeting", "Social Event", "Tradeshow"];		
		this.opFuncMeeting = ["Business", "Seminar", "Training"];
		this.opFuncSocial = ["Wedding", "Other Social Event"];
		this.opFuncTradeshow = ["Industry", "Consumer"];
		
		//Options for room layouts, based on function type and number of guests
		this.opRL = ["Banquet", "Boardroom", "Booths", "Classroom", "Crescents", "Hollow square", "Reception", "Theatre", "U shape"];
		this.opRLMeetingBusiness32Under = ["Boardroom", "Classroom", "Crescents", "Hollow square", "Theatre", "U shape"];
		this.opRLMeetingSeminar32Under = ["Classroom", "Crescents", "Theatre", "U shape"];
		this.opRLMeetingTraining32Under = ["Classroom", "Crescents", "U shape"];
		this.opRLMeeting33Plus = ["Classroom", "Crescents", "Theatre"];
		this.opRLMeetingTraining33Plus = ["Classroom", "Crescents"];
		this.opRLSocialParty32Under = ["Banquet", "Boardroom", "Hollow square", "Reception", "U shape"];
		this.opRLSocialParty33Plus = ["Banquet", "Reception"];
		this.opRLSocialWedding32Under = ["Banquet", "Boardroom", "Hollow square", "Reception", "Theatre", "U shape"];
		this.opRLSocialWedding33Plus = ["Banquet", "Reception", "Theatre"];
		this.opRLTradeshow = ["Booths"];		
		
		//Options for tables, based on room layout
		this.opTables = ["Round", "Classroom Rectangles", "Cocktail Table", "Rectangles"];
		this.opTablesStandard = ["Rectangles"];
		this.opTablesClassroom = ["Classroom Rectangles"];
		this.opTablesCrescents = ["Round"];
		this.opTablesBanquet = ["Rectangles", "Round"];
		this.opTablesReception = ["No Tables Required", "Cocktail Table"];
		this.opTablesTheatre = ["N/A"];
		this.opTablesTradeshow = ["No Tables Required", "Rectangles"];
				
		//Options for seating, based on function type
		this.opSeat = ["Bar Stool", "Office Chair", "Soft Furniture", "Stackable Chair", "Stackable Wedding Chair"];
		this.opSeatStandard = ["Stackable Chair"];
		this.opSeatProfessional = ["Office Chair", "Stackable Chair"];
		this.opSeatReception = ["Bar Stool", "Soft Furniture"];
		this.opSeatWedding = ["Stackable Chair", "Stackable Wedding Chair"];
		this.opSeatTradeshow = ["No Seating Required", "Stackable Chair"];
		
		//Options for equipment, based on function type and room layout
		this.opEquip = ["Dance Floor", "Flip Chart", "Interactive White Board", "Microphone", "Music", "Pipe and Drape", "Podium", "Projector and Screen", "Stage"];
		this.opEquipMeetingSmall = ["Flip Chart", "Interactive White Board", "Projector and Screen"];		
		this.opEquipMeetingMed = ["Flip Chart", "Interactive White Board", "Microphone", "Podium", "Projector and Screen"];
		this.opEquipMeetingLarge = ["Flip Chart", "Interactive White Board", "Microphone", "Podium", "Projector and Screen", "Stage"];
		this.opEquipSocialDefault = ["Dance Floor", "Microphone", "Music", "Podium", "Projector and Screen", "Stage"];
		this.opEquipSocialTheatre = ["Microphone", "Music", "Podium", "Stage"];
		this.opEquipTradeshow = ["Interactive White Board", "Pipe and Drape"];
		
		//Options for food, based on function type and room layout
		this.opFood = ["No Food Required", "Break", "Breakfast", "Lunch", "Dinner", "Reception Food", "Late Night Snack"];
		this.opFoodMeeting = ["No Food Required", "Break", "Breakfast", "Lunch"];
		this.opFoodMeetingTheatre = ["No Food Required", "Break", "Lunch"];
		this.opFoodSocialDefault = ["No Food Required", "Lunch", "Dinner"];
		this.opFoodSocialReception = ["No Food Required", "Reception Food", "Late Night Snack"];
		this.opFoodSocialTheatre = ["N/A"];
		this.opFoodTradeshow = ["No Food Required", "Break"];
				
		//Options for food service, based on food type
		this.opFoodSBreak = ["Stationed(Break)"];
		this.opFoodSBreakfast = ["Boxed", "Plated(Breakfast)", "Family Style", "Buffet", "Action Stations", "Combination of Buffet and Action Stations"];
		this.opFoodSLunch = ["Boxed", "Plated(Lunch)", "Family Style", "Buffet", "Action Stations", "Combination of Buffet and Action Stations"];
		this.opFoodSDinner = ["Boxed", "Plated(Dinner)", "Family Style", "Buffet", "Action Stations", "Combination of Buffet and Action Stations"];
		this.opFoodSLunchNoBoxed = ["Plated(Lunch)",  "Family Style", "Buffet", "Action Stations", "Combination of Buffet and Action Stations"];
		this.opFoodSDinnerNoBoxed = ["Plated(Dinner)",  "Family Style", "Buffet", "Action Stations", "Combination of Buffet and Action Stations"];
		this.opFoodSTheatre = ["Boxed"];
		this.opFoodSReception = ["Stationed(Reception)", "Passed", "Combination of Stationed and Passed"];
		this.opFoodSLateNightSnack = ["Buffet(Late Night Snack)"];
		this.opFoodSNone = ["N/A"];
		
		//Options for beverages, based on function type
		this.opBev = ["No Beverages Required", "Non Alcoholic", "Bar", "Passed or Butler", "Wine"];
		this.opBevNonAlcoholic = ["No Beverages Required", "Non Alcoholic"];
		this.opBevDefault = ["No Beverages Required", "Non Alcoholic", "Bar", "Wine"];
		this.opBevSocialReceptionDefault = ["No Beverages Required", "Non Alcoholic", "Bar", "Passed or Butler", "Combination of Bar and Passed or Butler"];
		this.opBevSocialReceptionLateNight = ["No Beverages Required", "Non Alcoholic", "Bar"];
		
		//Options for beverage service, based on beverage type and room layout
		this.opBevSNonAlcholic = ["Stationed(NonAlcoholic)", "Serviced"];
		this.opBevSNonAlcholicNoService = ["Stationed(NonAlcoholic)"];
		this.opBevSBar = ["Host(Bar)", "Cash", "Combination of Host and Cash"];
		this.opBevSPassedOrButler = ["Host(Passed or Butler)"];
		this.opBevSWine = ["Pre-set", "Table Service"];
		this.opBevSNone = ["N/A"];
	}
	
	setupSupplementaryInfo()
	{		
		//Supplementary info for options. Information being passed, in order: option name, option image location, option description text
		this.optionsSupplementaryInfo = [						
			//Info for basic steps
			["Meeting", "functionMeetings.jpg", "<ul><li>Discuss</li><li>Make Decisions</li><li>Collaborate</li><li>Presentation</li><li>Learn</li></ul>"],
			["Social Event", "functionSocial.jpg", "<ul><li>Celebrate</li><li>Honor</li><li>Socialize</li></ul>"],
			["Tradeshow", "functionTradeshow.jpg", "<ul><li>Buy</li><li>Sell</li><li>Market</li></ul>"],
			
			//Info for room layouts
			["Banquet", "roomBanquet.jpg", "<p>Typically, a full meal for groups of people that has a pre-selected set menu.</p>"],
			["Boardroom", "roomBoard.jpg", "<p>Boardroom setup works well for meetings and intimate dinner parties, allowing all participants  to sit around one long, large table. If the focus requires sightlines and discussion, it's best to limit seating.</p>"],
			["Booths", "roomBooths.jpg", "<p>A space created, typically using pipe and drape, for a vendor to directly connect with visitors as they demonstrate, display and talk about what they are aiming to sell.</p>"],
			["Classroom", "roomClassroom.jpg", "<p>Like theatre, classroom style is focused on one point at the front of the room. It's best for participants who are taking notes or using other materials during a presentation. To maximize sightlines, a chevron shape can be used.</p>"],
			["Crescents", "roomCrescents.jpg", "<p>Crescent or cabaret seating leaves some of the seats in a round table empty, allowing for guests to interact while still able to see a speaker. Guests can take notes or use other material in this seating arrangement.</p>"],
			["Hollow square", "roomHollowSquare.jpg", "<p>A hollow square format is similar to a boardroom except the centre space remains open and can be used for much larger groups. There is no head of the table and all people seated are equal in the seating arrangement. The centre space remains open. This layout is good for meetings, conversation, debate and dinner.</p>"],
			["Reception", "roomReception.jpg", "<p>Typically a stand-up event for gathering after a meeting or ceremony. It can also be used for pre-event gathering to socialize. Typically, beverages and food are served and people mingle around cocktail tables or socialize on soft furniture.</p>"],
			["Theatre", "roomTheatre.jpg", "<p>Used for lecture or presentation-type events where guests are not required to interact with others. Note-taking is not a focus here and sightlines can be improved with chevron or V-shaped positioning offsetting the  positioning of chairs. Groups of more than 100 people should include aisles.</p>"],
			["U shape", "roomUShape.jpg", "<p>A U-shaped setup is used for sessions that combine elements of discussion with presentations.  Sightlines are limited for people seated in the corners.</p>"],			
			
			//Info for tables
			["No Tables Required", "tablesNone.jpg", ""],
			["Round", "tablesBanquet.jpg", "<p>These tables are used for meal functions or events where small groups interact such as workshops, training sessions or weddings. These tables fit 8 people maximum on a 5-foot round or 10 people maximum on a 6-foot round.</p>"],
			["Classroom Rectangles", "tablesClassroom.jpg", "<p>Classroom tables are narrower than standard rectangle tables (1.5 feet to 2 feet)  and used in single-sided seating in a classroom situation. Tables can be stored on moveable racks for easy transport.</p>"],
			["Cocktail Table", "tablesCocktail.jpg", "<p>These tables are typically a 2.5-foot round and are used at receptions for drinks and small plates, allowing people to stand and mingle. The tops, bases and support posts often come apart and can be stored on moveable racks for easy transport.</p>"],
			["Rectangles", "tablesRectangular.jpg", "<p>Rectangle tables are the most versatile shape and are typically found at most event venues. They are used as head tables, buffets, registration desks and back bars.  Standard sizes are  a length of 4 feet,  6 feet or 8 feet by a width of 2.5 feet for all. Tables can be stored on moveable racks for easy transport.</p>"],
			
			//Info for seating
			["No Seating Required", "seatNone.jpg", ""],
			["Bar Stool", "seatBarStool.jpg", "<p>A raised seat that can be pulled up to a cocktail table to create casual, short-term seating.</p>"],
			["Office Chair", "seatOffice.jpg", "<p>Office chairs are typically used for smaller meetings and increase the comfort for the guest. Due to their size, it is difficult to store large numbers of this style of chair.</p>"],
			["Soft Furniture", "seatSoft.jpg", "<p>Seating such as couches and arm chairs are arranged to provide a more welcoming environment and offer different levels of seating in a reception space.</p>"],
			["Stackable Chair", "seatStackable.jpg", "<p>Stackable chairs come in a range of colors, styles and fabrics. They are designed to stack to maximize storage. </p>"],
			["Stackable Wedding Chair", "seatWedding.jpg", "<p>These chairs can be decorated to align with an event. </p>"],
						
			//Info for equipment
			["Dance Floor", "equipDanceFloor.jpg", "<p>Dance floor is typically portable and can be placed over low-pile carpet, concrete, tile or existing wood floors. Portable dance floors can create a space for dancing in any event.  Often dance floors are modular and are stored in moveable racks or are built with wheels.</p>"],
			["Flip Chart", "equipFlipChart.jpg", "<p>A flip chart stand with large pieces of paper fixed to the top which can be turned over, used for writing ideas or showing information to small groups of people.</p>"],	
			["Interactive White Board", "equipIntWhiteBoard.jpg", "<p>Interactive white boards or plasma displays are commonly used at trade shows or smaller meetings where a big screen is not appropriate. This technology allows for simultaneous projection on multiple screens.</p>"],	
			["Microphone", "equipMicrophone.jpg", "<p>Allows for a speaker to be heard throughout a gathering. A remote  microphone will also allow for questions and comments to be amplified and allow everyone in the room to hear. </p>"],	
			["Music", "equipMusic.jpg", "<p>A sound system is a set of equipment used to play recorded music or to ensure music from a band or a DJ is heard by everyone at an event. This can be built in or externally added to a space.</p>"],
			["Pipe and Drape", "equipPipeDrape.jpg", "<p>A portable system used to divide, hide or decorate a space.  Pipe and drape consists of steel bases, aluminum pipes that create both vertical uprights and horizontal crossbars (drape support rods), and fabric drapes. Black drapes are standard.</p>"],
			["Podium", "equipPodium.jpg", "<p>Creates a focal point for a presenter or speaker to address the session.  A podium can be placed on a stage. If a microphone is required, the podium location must have access to a sound outlet. </p>"],
			["Projector and Screen", "equipScreenProjector.jpg", "<p>Portable or permanently mounted equipment that allows for presentations to be displayed on a large screen that is often mounted in the room.</p>"],
			["Stage", "equipStage.jpg", "<p>Allows for an elevated presentation and for more than one person to present at a time. The most popular stage heights are 16\" and 24\" high. Stages are often modular so you can change the size, shape or height as needed.  Stairs and handrails must be considered as stage height grows.</p>"],
						
			//Info for food
			["No Food Required", "foodNone.jpg", ""],
			["Break", "foodBreak.jpg", ""],
			["Breakfast", "foodBreakfast.jpg", ""],
			["Lunch", "foodLunch.jpg", ""],
			["Dinner", "foodDinner.jpg", ""],
			["Reception Food", "foodReception.jpg", ""],
			["Late Night Snack", "foodLateNight.jpg", ""],
			
			//Info for food service			
			["Stationed(Break)", "foodServiceBreakStationed.jpg", "<p>Stationed breaks are used to allow the guest to self-serve food or drinks while attending an event. Typically like small buffets, they are meant for snack food or small portions.  Food should reflect the function of the meeting and be presented accordingly.</p>"],			
			["Boxed", "foodServiceBLDBoxed.jpg", "<p>Meals provided in a to-go container that can be consumed where and when the guest prefers.</p>"],			
			["Plated(Breakfast)", "foodBreakfast.jpg", "<p>Plates of food are prepared in the kitchen, with an entire table of guests served at the same time. This may come in courses and is typically more time-consuming and labour intense.</p>"],			
			["Plated(Lunch)", "foodLunch.jpg", "<p>Plates of food are prepared in the kitchen, with an entire table of guests served at the same time. This may come in courses and is typically more time-consuming and labour intense.</p>"],				
			["Plated(Dinner)", "foodDinner.jpg", "<p>Plates of food are prepared in the kitchen, with an entire table of guests served at the same time. This may come in courses and is typically more time-consuming and labour intense.</p>"],				
			["Buffet", "foodServiceBLDBuffet.jpg", "<p>Guests will leave their table and choose their food from a central buffet table. This service style can increase the guest's food choices and is usually less labour intensive.</p>"],
			["Action Stations", "foodServiceBLDActionStations.jpg", "<p>Action stations have a staff member who creates or finishes a food item at a buffet.</p>"],			
			["Combination of Buffet and Action Stations", "foodServiceBLDCombo.jpg", ""],			
			["Family Style", "foodServiceBLDFamilyStyle.jpg", "<p>Large platters and bowls of food are placed in the middle of a table to be passed around and shared. This meal service requires extra space in the middle of a table, which impacts the number of people who can be seated at the space. Family style service reduces staffing requirements, falling somewhere between a buffet and a full plate service. </p>"],			
			["Stationed(Reception)", "foodServiceReceptionStationed.jpg", "<p>Typically a variety of items for  guests to choose from located in one or more areas of the event to create a social dining experience.  Allows the guest to self-serve their choice of food similar to buffet style. </p>"],
			["Passed", "foodServiceReceptionPassed.jpg", "<p>This service style involves passing hors d'oeuvres (small portions of finger food) by the service staff through the crowd of guests on trays. Paper napkins  are required as there is typically guest debris (e.g., shrimp tails or ceramic Chinese spoons). This style provides the guest the opportunity to mix and mingle with other guests.</p>"],
			["Combination of Stationed and Passed", "foodServiceReceptionCombination.jpg", "<p>Stationed and passed service styles can be used at the same event to allow guests options in consuming both food and beverages.</p>"],
			["Buffet(Late Night Snack)", "foodServiceLateNightSnackBuffet.jpg", "<p> Guests will leave their table and choose food from a central buffet table. Late-night buffet options are typically smaller and are meant to fill up guests as they consume alcohol more than as a snack or meal.</p>"],
			
			//Info for beverages
			["No Beverages Required", "beverageNone.jpg", ""],
			["Non Alcoholic", "beverageNonAlcoholic.jpg", ""],
			["Bar", "beverageBar.jpg", ""],
			["Passed or Butler", "beveragePassedOrButler.jpg", ""],
			["Wine", "beverageWine.jpg", ""],
			["Combination of Bar and Passed or Butler", "beverageCombination.jpg", ""],	
			
			//Info for beverage service
			["Stationed(NonAlcoholic)", "beverageServiceNonAlcoholicStationed.jpg", "<p>Beverage stations are a very important part of any meeting setup. The organization and flow of the items are critical. The station could include coffee, tea, soft drinks or juice and the appropriate service items for each. This could include beverage dispensers, cups, coffee and tea condiments, something to stir and the ability to dispose of garbage.</p>"],		
			["Serviced", "beverageServiceNonAlcoholicServiced.jpg", "<p>Beverages are brought to the table for the guest by a server and are replenished as needed.</p>"],		
			["Host(Bar)", "beverageServiceBarHost.jpg", "<p>Host bars are open bars, which means the client pays for the alcohol and other beverages served. The bill is calculated based on an inventory count at the end of the event. The inventory count will determine the number of drinks served.</p>"],			
			["Cash", "beverageServiceBarCash.jpg", "<p>Guests pay for their drinks at a cash bar. This can be through tickets that are purchased in advance from a cashier and given to the bartender. Each drink type (beer, wine) or price would be assigned a different colour ticket. </p>"],		
			["Combination of Host and Cash", "beverageServiceBarCombination.jpg", "<p>Clients can chose to pay for a portion of the bar bill. An example could be decreasing the price of the drinks for the guests and the client pays the rest (example: twoonie bar). Another presentation option could have the client handing out a set number of drink tickets to be used before the guest pays cash for subsequent drinks. </p>"],	
			["Host(Passed or Butler)", "beverageServicePassedOrButlerHost.jpg", "<p>Passed beverages must be host as no payment can be taken from the guest while servicing.  The bill is calculated based on how many passed beverages are consumed.</p>"],	
			["Pre-set", "beverageServiceWinePreset.jpg", "<p>Wine is placed on the guest table for the guest to help themselves. Typically a red and a white bottle would be opened and left for the guests. This is typically wine hosted by the client.</p>"],	
			["Table Service", "beverageServiceWineTableService.jpg", "<p>Wine is served to the guests at their tables after they are seated and will continue to be topped up as the event continues.  This is typically wine hosted by the client.</p>"]			
		];
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Get Basic Options ------------------------------------ */
	
	getGuestOptions()
	{
		return this.opGuest;
	}
	
	getFunctionOptions()
	{
		return this.opFunc;
	}
	
	getFunctionSubTypeOptions()
	{
		//Get previous selections that influence the available options
		let functionType = userSelections.getCurSelection("functionType");
		
		//Get available options
		let opFuncST;
		switch(functionType)
		{
			case "Meeting":			opFuncST = this.opFuncMeeting; break;
			case "Social Event":	opFuncST = this.opFuncSocial; break;
			case "Tradeshow":		opFuncST = this.opFuncTradeshow; break;
		}		
		return opFuncST;
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Room Layout Options ---------------------------------- */
	
	getAllRoomLayoutOptions()
	{
		return this.opRL;
	}
	
	getRecommendedRoomLayoutOptions()
	{
		//Get previous selections that influence the available options
		let numGuests = userSelections.getCurSelection("numGuests");
		let functionType = userSelections.getCurSelection("functionType");
		let functionSubType = userSelections.getCurSelection("functionSubType");
		
		//Get available options
		let opRL;		
		if (functionType == "Meeting")
		{			
			if (numGuests == "8 to 32")
			{
				switch (functionSubType)
				{
					case "Business":	opRL = this.opRLMeetingBusiness32Under; break;
					case "Seminar":		opRL = this.opRLMeetingSeminar32Under; break;
					case "Training":	opRL = this.opRLMeetingTraining32Under; break;
				}
			}
			else
			{
				switch (functionSubType)
				{
					case "Training":	opRL = this.opRLMeetingTraining33Plus; break;
					default:			opRL = this.opRLMeeting33Plus; break;
				}
			}
		}
		else if (functionType == "Social Event")
		{			
			if (numGuests == "8 to 32")
			{
				switch (functionSubType)
				{
					case "Wedding":		opRL = this.opRLSocialWedding32Under; break;
					default:			opRL = this.opRLSocialParty32Under; break;
				}
			}
			else
			{
				switch (functionSubType)
				{
					case "Wedding":		opRL = this.opRLSocialWedding33Plus; break;
					default:			opRL = this.opRLSocialParty33Plus; break;
				}
			}
		}
		else if (functionType == "Tradeshow")
		{
			opRL = this.opRLTradeshow;
		}
		return opRL;
	}
		
	/* ------------------------------------------------------------ */
	/* ----- Table Options ---------------------------------------- */
	
	getAllTableOptions()
	{
		return this.opTables;
	}
	
	getRecommendedTableOptions()
	{
		//Get previous selections that influence the available options
		let functionType = userSelections.getCurSelection("functionType");
		let roomLayout = userSelections.getCurSelection("roomLayout");
		
		//Get available options
		let opTable;
		if (functionType == "Tradeshow")
		{
			opTable = this.opTablesTradeshow;
		}
		else
		{
			switch(roomLayout)
			{				
				case "Boardroom":
				case "Hollow square":
				case "U shape": 		opTable = this.opTablesStandard; break; 
					
				case "Banquet":  		opTable = this.opTablesBanquet; break;	
				case "Classroom":		opTable = this.opTablesClassroom; break;
				case "Crescents": 		opTable = this.opTablesCrescents; break;
				case "Reception": 		opTable = this.opTablesReception; break;
				case "Theatre": 		opTable = this.opTablesTheatre; break;
				default:		 		opTable = this.opTablesStandard; break; 
			}			
		}	
		return opTable;
	}	
	
	/* ------------------------------------------------------------ */
	/* ----- Seating Options -------------------------------------- */
	
	getAllSeatingOptions()
	{
		return this.opSeat;
	}
	
	getRecommendedSeatingOptions()
	{
		//Get previous selections that influence the available options
		let functionType = userSelections.getCurSelection("functionType");
		let functionSubType = userSelections.getCurSelection("functionSubType");
		let roomLayout = userSelections.getCurSelection("roomLayout");
		
		//Get available options
		let opSeat;		
		if (functionType == "Tradeshow")
		{
			opSeat = this.opSeatTradeshow;
		}
		else
		{
			switch(roomLayout)
			{				
				case "Banquet": 
				case "Theatre":
					if (functionSubType == "Wedding")
					{
						opSeat = this.opSeatWedding; 
					}
					else
					{
						opSeat = this.opSeatStandard; 
					}
					break;
					
				case "Boardroom": 
				case "Hollow square":
				case "U shape": 
					if (functionType == "Meeting")
					{
						opSeat = this.opSeatProfessional; 
					}
					else
					{
						if (functionSubType == "Wedding")
						{
							opSeat = this.opSeatWedding; 
						}
						else
						{
							opSeat = this.opSeatStandard; 
						}
					}
					break; 
					 
				case "Reception":	opSeat = this.opSeatReception; break;	
				default:			opSeat = this.opSeatStandard; break;
			}	
		}		
		return opSeat;
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Equipment Options ------------------------------------ */
	
	getAllEquipmentOptions()
	{
		return this.opEquip;
	}
	
	getRecommendedEquipmentOptions()
	{
		//Get previous selections that influence the available options
		let numGuests = userSelections.getCurSelection("numGuests");
		let functionType = userSelections.getCurSelection("functionType");
		let roomLayout = userSelections.getCurSelection("roomLayout");
		
		//Get available options
		let opEquipment;
		if (functionType == "Meeting")
		{
			if (numGuests == "8 to 32")
			{					
				switch (roomLayout)
				{
					case "Boardroom":	
					case "Hollow square":	
					case "U shape":			opEquipment = this.opEquipMeetingSmall; break;
						
					default: 				opEquipment = this.opEquipMeetingMed; break;
				}
			}	
			else
			{	
				opEquipment = this.opEquipMeetingLarge;
			}	
		}
		else if (functionType == "Social Event")
		{			
			switch (roomLayout)
			{
				case "Theatre":		opEquipment = this.opEquipSocialTheatre; break;					
				default: 			opEquipment = this.opEquipSocialDefault; break;
			}	
		}
		else if (functionType == "Tradeshow")
		{
			opEquipment = this.opEquipTradeshow;
		}
		return opEquipment;
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Food Options ----------------------------------------- */
	
	getFoodOptions()
	{
		return this.opFood;
	}
	
	getRecommendedFoodOptions()
	{
		//Get previous selections that influence the available options
		let functionType = userSelections.getCurSelection("functionType");
		let functionSubType = userSelections.getCurSelection("functionSubType");
		let roomLayout = userSelections.getCurSelection("roomLayout");
		
		//Get available options
		let opFood;
		if (functionType == "Meeting")
		{
			switch(roomLayout)
			{							 
				case "Theatre":	opFood = this.opFoodMeetingTheatre; break;					
				default:		opFood = this.opFoodMeeting; break;	
			}			
		}
		else if (functionType == "Social Event")
		{	
			switch(roomLayout)
			{							 					
				case "Reception":	opFood = this.opFoodSocialReception; break;	
				case "Theatre":		opFood = this.opFoodSocialTheatre; break;
				default:			opFood = this.opFoodSocialDefault; break;
			}	
		}
		else if (functionType == "Tradeshow")
		{
			opFood = this.opFoodTradeshow;
		}	
		return opFood;
	}	
	
	getFoodServiceOptions()
	{
		//Get previous selections that influence the available options
		let foodType = userSelections.getCurSelection("foodType");
		
		//Get available options
		let opFoodS;
		switch(foodType)
		{						
			case "Break":				opFoodS = this.opFoodSBreak; break;
			case "Breakfast":			opFoodS = this.opFoodSBreakfast; break;
			case "Dinner": 				opFoodS = this.opFoodSDinner; break;	
			case "Late Night Snack":	opFoodS = this.opFoodSLateNightSnack; break;						
			case "Lunch": 				opFoodS = this.opFoodSLunch; break;		
			case "Reception Food": 		opFoodS = this.opFoodSReception; break;
			default: 					opFoodS = this.opFoodSNone; break;
		}		
		return opFoodS;
	}
						
	getRecommendedFoodServiceOptions()
	{
		//Get previous selections that influence the available options
		let roomLayout = userSelections.getCurSelection("roomLayout");
		let functionType = userSelections.getCurSelection("functionType");
		let foodType = userSelections.getCurSelection("foodType"); 
		
		//Get available options
		let opFoodS;
		switch(foodType)
		{					
			case "Breakfast": 	
				if (roomLayout == "Theatre")
				{
					opFoodS = this.opFoodSTheatre;
				}	
				else
				{
					opFoodS = this.opFoodSBreakfast; 
				}
				break; 
				
			case "Lunch": 		
				if (roomLayout == "Theatre")
				{
					opFoodS = this.opFoodSTheatre;
				}	
				else
				{
					if (functionType == "Social Event")
					{	
						opFoodS = this.opFoodSLunchNoBoxed; 
					}
					else
					{
						opFoodS = this.opFoodSLunch;
					}
				}
				break; 			
										
			case "Dinner": 		
				if (roomLayout == "Theatre")
				{
					opFoodS = this.opFoodSTheatre;
				}	
				else
				{
					opFoodS = this.opFoodSDinnerNoBoxed; 
				}
				break; 	
				
			case "Break":				opFoodS = this.opFoodSBreak; break;
			case "Late Night Snack":	opFoodS = this.opFoodSLateNightSnack; break;		
			case "Reception Food": 		opFoodS = this.opFoodSReception; break;
			default: 					opFoodS = this.opFoodSNone; break;
		}	
		return opFoodS;
	}
		
	
	/* ------------------------------------------------------------ */
	/* ----- Beverage Options ------------------------------------- */
	
	getBeverageOptions(curSelections)
	{
		return this.opBev;
	}
	
	getRecommendedBeverageOptions(curSelections)
	{
		//Get previous selections that influence the available options
		let functionType = userSelections.getCurSelection("functionType");
		let roomLayout = userSelections.getCurSelection("roomLayout");
		let foodType = userSelections.getCurSelection("foodType");	
		let foodServiceType = userSelections.getCurSelection("foodServiceType");
		
		//Get available options
		let opBev;
		if (functionType == "Meeting")
		{
			if ((roomLayout != "Theatre") && (foodType == "Lunch") && (foodServiceType != "Boxed"))
			{
				opBev = this.opBevDefault;
			}
			else
			{
				opBev = this.opBevNonAlcoholic;
			}
		}
		else if (functionType == "Social Event")
		{	
			if (roomLayout == "Theatre")
			{
				opBev = this.opBevNonAlcoholic;
			}
			else if (roomLayout == "Reception")
			{
				if (foodType == "Late Night Snack")
				{
					opBev = this.opBevSocialReceptionLateNight;
				}
				else
				{
					opBev = this.opBevSocialReceptionDefault;
				}			
			}
			else
			{
				opBev = this.opBevDefault;
			}	
		}
		else
		{
			opBev = this.opBevNonAlcoholic;
		}	
		return opBev;
	}	
	
	getBeverageServiceOptions(curSelections)
	{
		//Get previous selections that influence the available options
		let beverageType = userSelections.getCurSelection("beverageType");
		
		//Get available options
		let opBevS;
		switch(beverageType)
		{
			case "Non Alcoholic":		opBevS = this.opBevSNonAlcholic; break;
			
			case "Bar": 			
			case "Combination of Bar and Passed or Butler":
				opBevS = this.opBevSBar; 
				break;
			
			case "Passed or Butler": 	opBevS = this.opBevSPassedOrButler; break;
			case "Wine": 				opBevS = this.opBevSWine; break;
			default: 					opBevS = this.opBevSNone; break;
		}
		return opBevS;
	}
	
	getRecommendedBeverageServiceOptions(curSelections)
	{
		//Get previous selections that influence the available options
		let functionType = userSelections.getCurSelection("functionType");
		let roomLayout = userSelections.getCurSelection("roomLayout");
		let foodType = userSelections.getCurSelection("foodType");
		let foodServiceType = userSelections.getCurSelection("foodServiceType");
		let beverageType = userSelections.getCurSelection("beverageType");
		
		//Get available options
		let opBevS;
		switch(beverageType)
		{
			case "Non Alcoholic":	
				if (functionType == "Tradeshow")
				{
					opBevS = this.opBevSNonAlcholicNoService;
				}	
				else
				{
					if ((roomLayout == "Reception")  || (roomLayout == "Theatre") || 
						(foodType == "No Food Required") || (foodType == "Break") || 
						(foodServiceType == "Boxed"))
					{
						opBevS = this.opBevSNonAlcholicNoService;
					}
					else
					{
						opBevS = this.opBevSNonAlcholic;
					}
				}	
				break;
				
			case "Bar": 				
			case "Combination of Bar and Passed or Butler":
				opBevS = this.opBevSBar;  
				break;
				
			case "Passed or Butler": 	opBevS = this.opBevSPassedOrButler; break;
			case "Wine": 				opBevS = this.opBevSWine; break;
			default: 					opBevS = this.opBevSNone; break;
		}		
		return opBevS;
	}
		
	
	/* ------------------------------------------------------------ */
	/* ----- Double-Check Selected Options ------------------------ */
	
	//Single selection 	questions
	isSelectedOptionARecommendedOption(topic, selectedOp)
	{
		if (!selectedOp) return true;
		
		//Get recommended options		
		let recommendedOptions;
		switch (topic)
		{
			case "numGuests": 			recommendedOptions = this.getGuestOptions(); break;
			case "functionType": 		recommendedOptions = this.getFunctionOptions(); break;
			case "functionSubType": 	recommendedOptions = this.getFunctionSubTypeOptions(); break;
			case "roomLayout": 			recommendedOptions = this.getRecommendedRoomLayoutOptions(); break;
			case "tableType": 			recommendedOptions = this.getRecommendedTableOptions(); break;
			case "seatingType": 		recommendedOptions = this.getRecommendedSeatingOptions(); break;
			case "foodType": 			recommendedOptions = this.getRecommendedFoodOptions(); break;
			case "foodServiceType": 	recommendedOptions = this.getRecommendedFoodServiceOptions(); break;
			case "beverageType": 		recommendedOptions = this.getRecommendedBeverageOptions(); break;
			case "beverageServiceType": recommendedOptions = this.getRecommendedBeverageServiceOptions(); break;
		}
		
		//Check if selected option matches one of the recommended options
		let isRecommended = false;
		if (recommendedOptions)
		{
			for(let i = 0; i < recommendedOptions.length; i++ ) 
			{ 
				if (selectedOp == recommendedOptions[i]) isRecommended = true;				
			}	
		}	
		
		return isRecommended;		
	}
	
	//Multiple selection questions
	areSelectedOptionsAllRecommendedOptions(topic, selectedOps)
	{
		if (!selectedOps) return true;
		
		//Get recommended options
		let selectedOptions = selectedOps.split(";"); 
		let recommendedOptions;
		switch (topic)
		{
			case "equipment": 			recommendedOptions = this.getRecommendedEquipmentOptions(); break;
		}
				
		//Check if selected options match recommended options
		let allSelectionsRecommended = true;
		if (recommendedOptions)
		{		
			for(let i = 0; i < selectedOptions.length; i++ ) 
			{ 
				let isRecommended;
				for(let j = 0; j < recommendedOptions.length; j++ ) 
				{ 
					if (selectedOptions[i] == recommendedOptions[j]) 
					{
						isRecommended = true;
					}						
				}
				if (!isRecommended) allSelectionsRecommended = false;
			}	
		}	
		
		return allSelectionsRecommended;
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Get Supplementary Information ------------------------ */
	
	getOption(opt)
	{
		for(let i = 0; i < this.optionsSupplementaryInfo.length; i++ ) 
		{
			if (opt == this.optionsSupplementaryInfo[i][0]) return this.optionsSupplementaryInfo[i];
		}
		return null;
	}
	
	getOptionImage(opt)
	{
		let optionInfo = this.getOption(opt);
		
		if (optionInfo)
		{
			return optionInfo[1];
		}
		return null;
	}
	
	getOptionInfo(opt)
	{
		let optionInfo = this.getOption(opt);

		if (optionInfo)
		{
			return optionInfo[2];
		}
		return null;
	}
}
const eventOptions = new EventOptions();
eventOptions.init();