class ScenarioThinClient extends Scenario
{
	constructor() 
	{		
		super();
		
		this.description = "<p>You are part of a large help desk team at a major corporation. Your supervisor needs you to assemble a new workstation that will be used as a thin client. You have been provided with a case, a motherboard and a power supply but you need to select which additional components to install. You think that your supervisor gave you this task to test your knowledge of the components required for a thin client to function properly.<p><p>The motherboard:</p><ul><li>Has an LGA-1151 CPU socket</li><li>Supports DDR4 RAM</li><li>Has a 1 GBps network interface card and two USB 3.2 ports</li><li>Has EIDE and SATA data connection points</li></ul><p>Based on what you know and keeping cost in mind, select and install the most appropriate components for this thin client workstation.</p>";
	
		this.preselectedComponents = [
			{type:"Case", name:"Generic"},
			{type:"Motherboard", name:"Basic MB2465"},
			{type:"PowerSupply", name:"PS 1000"},
			{type:"ChassisFan", name:"CF Air shuffler 5k"}
		];
		
		//Options for draggable components. The IDs of each option must match an id from the component details master list. Feedback is only neccesary for correct and incorrect options, not invalid ones.
		this.cpuAndFanOptions = [
			{id:"CPU0", status: "incorrect", feedback: "While this processor will fit in the LGA1151 socket, a thin client doesn’t require a powerful processor because it’s primarily used to access online applications."},
			{id:"CPU1", status: "invalid"},
			{id:"CPU2", status: "correct", feedback: "This processor fits the requirements of a thin client perfectly, since the thin client will access applications hosted on a server."},
			{id:"CPU3", status: "invalid"},
		];	
		this.ramOptions = [
			{id:"RAM0", status: "invalid"},
			{id:"RAM1", status: "invalid"},
			{id:"RAM2", status: "correct", feedback: "This set of RAM modules fits the requirements of a thin client, with enough RAM to operate and with a frequency that works with the motherboard and the correct processor."},
			{id:"RAM3", status: "incorrect", feedback: "This set of RAM modules, while of the correct type (DDR4), has too high a frequency to be compatible with the motherboard and correct processor."},
			{id:"RAM4", status: "incorrect", feedback: "This set of RAM modules, while of the correct type (DDR4), has too high a frequency to be compatible with the motherboard and correct processor."},
			{id:"RAM5", status: "invalid"}
		];	
		this.gpuOptions = [
			{id:"GPU0", status: "invalid"},
			{id:"GPU1", status: "correct", feedback: "This graphics card provides adequate display connection for a thin client, as well as enough processing power to render the applications it is likely to access."},
			{id:"GPU2", status: "incorrect", feedback: "While this graphics card is supported by the motherboard, it is more powerful than necessary to render the applications this thin client is likely to access."},
			{id:"GPU3", status: "incorrect", feedback: "While this graphics card  is supported by the motherboard, it is more powerful than necessary to render the applications this thin client is likely to access."}
		];	
		this.cardsOptions = [
			{id:"Card0", status: "incorrect", feedback: "This network interface card provides the same bandwidth connection as the integrated card, and so is of little benefit to a thin client."},
			{id:"Card1", status: "correct", feedback: "Though it may seem like overkill, a high-bandwidth network connection can only be a benefit for a thin client, which will use the network connection very heavily."},
			{id:"Card2", status: "invalid"},
			{id:"Card3", status: "invalid"},
			{id:"Card4", status: "incorrect", feedback: "The motherboard for this thin client already features USB 3.2 ports and is unlikely to benefit from having additional ports available."}
		];	
		this.driveOptions = [
			{id:"Drive0", status: "invalid"},
			{id:"Drive1", status: "correct", feedback: "This is the best hard drive for this scenario. For a thin client, having high-speed, high-capacity local storage is unnecessary. Files will generally be stored and accessed from an online source."},
			{id:"Drive2", status: "incorrect", feedback: "The higher rotational speed of this disk is unnecessary for a thin client, which will typically access online files."},
			{id:"Drive3", status: "incorrect", feedback: "The higher rotational speed of this disk is unnecessary for a thin client, which will typically access online files."},
		];
		
		//Options for wiring components/connectors. The IDs of each option must match an id from the component details master list.
		this.pscOptions = [
			{id:"24pin", status: "correct", target1:"powerSupply", target2:"24pin", feedback: "Motherboards need power to operate properly, and this connection will supply that power."},
			{id:"68pin", status: "incorrect", feedback: this.connectorNotNeeded },
			{id:"4pin", status: "correct", target1:"powerSupply", target2:"4pin", feedback: "The CPU needs a 3.3V connection to be able to process, and this connector will provide that."},
			{id:"sataPower", status: "correct", target1:"powerSupply", target2:"driveSATA", feedback: "Modern peripheral devices can require multiple voltages to be correctly powered, so this SATA power connector provides all three voltages in one connection."},
			{id:"molex", status: "incorrect", feedback: this.connectorNotNeeded }
		];
		this.fpcOptions = [
			{id:"fpcHarness", status: "correct", target1:"fpcHarness", target2:"fpc", feedback: "The front panel connections connect the buttons, LEDs and case speaker to the motherboard."}
		];
		this.ocOptions = [
			{id:"edie", status: "incorrect",  feedback: this.connectorNotNeeded },
			{id:"sataData", status: "correct", target1:"driveSATA", target2:"driveDataSATA", feedback: "Serial data connections feature a faster data transfer rate because of higher signaling rates. This, along with smaller size and lower cost (It only has seven conductors) is why SATA data cables are typically found in today’s computers."},
			{id:"chassisFan", status: "correct", target1:"chassisFan", target2:"chassisPower", feedback: "Cooling is important, which makes this small connector important because it powers chassis fans to cool the computer."},
			{id:"cpuFan", status: "correct", target1:"cpuFan", target2:"cpuPower", feedback: "Because heat has a negative effect on electronics, cooling the processor is especially important. This power connection between the motherboard and the heat sink fan allows the fan to be controlled through the motherboard, which allows for efficient cooling."}
		];
	}	
}