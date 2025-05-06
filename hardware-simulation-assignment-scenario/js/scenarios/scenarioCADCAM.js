class ScenarioCADCAM extends Scenario
{
	constructor() 
	{		
		super();
		
		this.description = "<p>You are part of a large help desk team at a major corporation. Your supervisor needs you to assemble a new PC that will be used as a Computer Assisted Modelling (CAM) workstation. You have been provided with a case, a motherboard and a power supply but you need to select which additional components to install. You think that your supervisor gave you this task to test your knowledge of what components are needed for a CAM workstation to function properly.</p><p>The motherboard:</p><ul><li>Has an AM4 CPU socket</li><li>Supports DDR4 RAM</li><li>Has four USB 3.2 ports</li><li>Has connection points for SATA data connections</li></ul><p>Based on what you know, and keeping cost in mind, select and install the most appropriate components for a CAM workstation.</p>";
	
		this.preselectedComponents = [
			{type:"Case", name:"Generic"},
			{type:"Motherboard", name:"Basic MB4212"},
			{type:"PowerSupply", name:"PS 1000"},
			{type:"ChassisFan", name:"CF Air shuffler 5k"}
		];
		
		//Options for draggable components. The IDs of each option must match an id from the component details master list. Feedback is only neccesary for correct and incorrect options, not invalid ones.
		this.cpuAndFanOptions = [
			{id:"CPU0", status: "invalid"},
			{id:"CPU1", status: "correct", feedback: "This processor has the cores and frequency required to run the modelling software, as well as being the processor that correctly fits the socket on the motherboard."},
			{id:"CPU2", status: "invalid"},
			{id:"CPU3", status: "invalid"},
		];	
		this.ramOptions = [
			{id:"RAM0", status: "invalid"},
			{id:"RAM1", status: "invalid"},
			{id:"RAM2", status: "incorrect", feedback: "A CAM workstation requires a great deal of resources to run the applications required. This set of RAM runs at too low a frequency to be the best choice."},
			{id:"RAM3", status: "incorrect", feedback: "A CAM workstation requires a great deal of resources to run the applications required. This set of RAM runs at too low a frequency to be the best choice."},
			{id:"RAM4", status: "incorrect", feedback: "This set of RAM has both the high frequency and the high capacity to support the workstation in its operation. However, it is not the best choice for this scenario; it will run more slowly because it is running through a single channel."},
			{id:"RAM5", status: "correct", feedback: "This set of RAM has both the high frequency and the high capacity to support the workstation’s operation. It has the additional benefit of using two channels, which allow it to transfer data to and from the motherboard more quickly than a single channel could."}
		];	
		this.gpuOptions = [
			{id:"GPU0", status: "invalid"},
			{id:"GPU1", status: "incorrect", feedback: "This graphics card fits the PCIe x16 slot but it doesn’t have the memory or processing power to run the applications the workstation requires. A CAM workstation typically has multiple monitors, which this card does not support."},
			{id:"GPU2", status: "incorrect", feedback: "This graphics card fits the PCIe x16 slot on the motherboard but it is not the best choice because it only supports two HDMI monitors. The card is also under-powered for this application."},
			{id:"GPU3", status: "correct", feedback: "This graphics card has enough memory to support the modelling application required and has enough power for three monitors."}
		];	
		this.cardsOptions = [
			{id:"Card0", status: "incorrect", feedback: "This network interface card matches the capabilities of the integrated NIC on the motherboard and so it is not required for this CAM client."},
			{id:"Card1", status: "incorrect", feedback: "This card will fit the slots available on the motherboard, but a high-speed connection is not part of the requirements for a CAM client."},
			{id:"Card2", status: "invalid"},
			{id:"Card3", status: "invalid"},
			{id:"Card4", status: "incorrect", feedback: "This motherboard already has integrated USB 3.2 ports, which are sufficient to connect a keyboard, mouse and up to two other temporary devices."}
		];	
		this.driveOptions = [
			{id:"Drive0", status: "invalid"},
			{id:"Drive1", status: "incorrect", feedback: "This hard drive has a low capacity and a slow read/write speed, which makes it a poor choice for a CAM client."},
			{id:"Drive2", status: "incorrect", feedback: "While capable of storing large files and connecting correctly to the motherboard, this hard drive’s read/write speed is too slow to be optimal for a CAM workstation."},
			{id:"Drive3", status: "correct", feedback: "This hard drive has the high capacity required to store modelling data and it has a very high read/write speed."},
		];
		
		//Options for wiring components/connectors. The IDs of each option must match an id from the component details master list.
		this.pscOptions = [
			{id:"24pin", status: "correct", target1:"powerSupply", target2:"24pin", feedback: "Motherboards need power to operate properly, and this connection will supply that power."},
			{id:"68pin", status: "correct", target1:"powerSupply", target2:"68pin", feedback: "While capable of storing large files and connecting correctly to the motherboard, this hard drive’s read/write speed is too slow to be optimal for a CAM workstation."},
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
			{id:"cpuFan", status: "correct", target1:"cpuFan", target2:"cpuPower",  feedback: "Because heat has a negative effect on electronics, cooling the processor is especially important. This power connection between the motherboard and the heat sink fan allows the fan to be controlled through the motherboard, which allows for efficient cooling."}
		];
	}	
}