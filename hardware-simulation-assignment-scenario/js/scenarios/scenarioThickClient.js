class ScenarioThickClient extends Scenario
{
	constructor() 
	{		
		super();
		
		this.description = "<p>You are part of a large help desk team at a major corporation. Your supervisor needs you to assemble a new workstation that will be used as a thick client. You have been provided with a case, a motherboard and a power supply but you need to select which additional components to install. You think that your supervisor gave you this task to test your knowledge of the components required for a thick client to function properly.</p><p>The motherboard:</p><ul><li>Has an LGA-1151 CPU socket</li><li>Supports DDR4 RAM</li><li>Has a 1 GBps network interface card</li><li>Has four USB 3.2 ports</li></ul><p>Based on what you know, and keeping cost in mind, select and install the most appropriate components for a thick client workstation.</p>";
	
		this.preselectedComponents = [
			{type:"Case", name:"Generic"},
			{type:"Motherboard", name:"Basic MB3888"},
			{type:"PowerSupply", name:"PS 1000"},
			{type:"ChassisFan", name:"CF Air shuffler 5k"}
		];
		
		//Options for draggable components. The IDs of each option must match an id from the component details master list. Feedback is only neccesary for correct and incorrect options, not invalid ones.
		this.cpuAndFanOptions = [
			{id:"CPU0", status: "correct", feedback: "This is the correct processor for the thick client. It has the cores and the speed to support running all necessary applications locally."},
			{id:"CPU1", status: "invalid"},
			{id:"CPU2", status: "incorrect", feedback: "While this processor will fit in the LGA1151 socket, a thick client requires a powerful processor because it is primarily used to access applications on the local machine and must be capable of supporting those applications."},
			{id:"CPU3", status: "invalid"},
		];	
		this.ramOptions = [
			{id:"RAM0", status: "invalid"},
			{id:"RAM1", status: "invalid"},
			{id:"RAM2", status: "incorrect", feedback: "While this DDR4 RAM will fit the slots on the motherboard, it runs at a slower frequency than what is best for a thick client."},
			{id:"RAM3", status: "incorrect", feedback: "While this DDR4 RAM will fit the slots on the motherboard, it runs at a slower frequency than what is best for a thick client."},
			{id:"RAM4", status: "incorrect", feedback: "This RAM set fits into the slot on the motherboard, and runs at the maximum frequency for the CPU, which means it is capable of running the required applications locally. However, it’s not the best choice for a thick client; it will run more slowly because it is running through a single channel."},
			{id:"RAM5", status: "correct", feedback: "This RAM set fits into the slot on the motherboard, and runs at the maximum frequency for the CPU, which means it is capable of running the required applications locally. It has the additional benefit of using two channels, which allows it to transfer data to and from the motherboard more quickly than a single channel could."}
		];	
		this.gpuOptions = [
			{id:"GPU0", status: "invalid"},
			{id:"GPU1", status: "incorrect", feedback: "This graphics card fits into the slot on the motherboard but it may not be powerful enough to render everything required for a thick client to run."},
			{id:"GPU2", status: "correct", feedback: "This graphics card  has enough memory to render all the applications that could reasonably be expected of a thick client, without overusing resources."},
			{id:"GPU3", status: "incorrect", feedback: "While this graphics card  would fit the PCIe x16 slot on the motherboard and would render the required applications locally, it is more expensive than necessary."}
		];	
		this.cardsOptions = [
			{id:"Card0", status: "incorrect", feedback: "This network interface card matches the capabilities of the integrated NIC on the motherboard and so it is not required for this thick client."},
			{id:"Card1", status: "incorrect", feedback: "This card will fit the slots available on the motherboard, but a high-speed connection is not a requirement for a thick client."},
			{id:"Card2", status: "invalid"},
			{id:"Card3", status: "invalid"},
			{id:"Card4", status: "incorrect", feedback: "This motherboard already has integrated USB 3.2 ports, which are sufficient to connect keyboard/mouse, and up to two more temporary devices."}
		];	
		this.driveOptions = [
			{id:"Drive0", status: "invalid"},
			{id:"Drive1", status: "incorrect", feedback: "This hard drive has a low capacity and a slow read/write speed, which makes it a poor choice for the thick client."},
			{id:"Drive2", status: "correct", feedback: "This hard drive has the correct connections to match with the motherboard, as well having the speed and capacity to support running applications locally."},
			{id:"Drive3", status: "incorrect", feedback: "While this card will connect to the motherboard without issue, the extreme read/write speed is not required for this thick client and is better suited to a server or other high-needs machine."},
		];		
			
		//Options for wiring components/connectors. The IDs of each option must match an id from the component details master list.
		this.pscOptions = [
			{id:"24pin", status: "correct", target1:"powerSupply", target2:"24pin", feedback: "Motherboards need power to operate properly, and this connection will supply that power."},
			{id:"68pin", status: "invalid", feedback: this.connectorNotNeeded },
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