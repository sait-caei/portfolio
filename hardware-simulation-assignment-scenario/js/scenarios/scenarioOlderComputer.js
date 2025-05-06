class ScenarioOlderComputer extends Scenario
{
	constructor() 
	{		
		super();
		
		this.description = "<p>You work at a computer repair shop and a customer arrives with a desktop computer that is running very slowly. In particular, the customer is frustrated by slow data access times and slow read/write on the hard drive. After disassembling the computer and testing the components, your colleague says that the issue is resolved and asks you to re-assemble the device. However, your colleague was working on multiple devices and didn’t label which components came from the desktop you need to re-assemble.</p><p>This means that you must re-assemble the computer based on what you know about the device:</p><ul><li>It’s an older model with an AM3 CPU socket</li><li>It accepts DDR3 RAM</li><li>It uses a parallel data bus for storage</li><li>It has no USB ports</li><li>It has an integrated network interface card with a bandwidth of 100 MBps</li></ul><p>Based on what you know, install the components that are most compatible with the system while keeping cost in mind.</p>";
	
		this.preselectedComponents = [
			{type:"Case", name:"Generic"},
			{type:"Motherboard", name:"Basic MB1337"},
			{type:"PowerSupply", name:"PS 1000"},
			{type:"ChassisFan", name:"CF Air shuffler 5k"}
		];
		
		//Options for draggable components. The IDs of each option must match an id from the component details master list. Feedback is only neccesary for correct and incorrect options, not invalid ones.
		this.cpuAndFanOptions = [
			{id:"CPU0", status: "invalid"},
			{id:"CPU1", status: "invalid"},
			{id:"CPU2", status: "invalid"},
			{id:"CPU3", status: "correct", feedback: "This is the correct processor for the AM3 socket."},
		];	
		this.ramOptions = [
			{id:"RAM0", status: "invalid"},
			{id:"RAM1", status: "correct", feedback: "This motherboard/processor combination will support DDR3 RAM up to 1866MHz, which makes this the correct choice."},
			{id:"RAM2", status: "invalid"},
			{id:"RAM3", status: "invalid"},
			{id:"RAM4", status: "invalid"},
			{id:"RAM5", status: "invalid"}
		];	
		this.gpuOptions = [
			{id:"GPU0", status: "correct", feedback: "This motherboard does not support PCI express devices, which makes this PCI graphics card the correct choice."},
			{id:"GPU1", status: "invalid"},
			{id:"GPU2", status: "invalid"},
			{id:"GPU3", status: "invalid"}
		];	
		this.cardsOptions = [
			{id:"Card0", status: "invalid"},
			{id:"Card1", status: "invalid"},
			{id:"Card2", status: "correct", feedback: "This motherboard does not feature an integrated soundcard, so a sound card is a great addition to this home computer."},
			{id:"Card3", status: "correct", feedback: "With many peripherals having USB connections, these ports will be helpful for connecting devices."},
			{id:"Card4", status: "invalid"}
		];	
		this.driveOptions = [
			{id:"Drive0", status: "correct", feedback: "Since the motherboard does not support serial ATA connections, this parallel connected drive is the best choice."},
			{id:"Drive1", status: "invalid"},
			{id:"Drive2", status: "invalid"},
			{id:"Drive3", status: "invalid"},
		];
		
		//Options for wiring components/connectors. The IDs of each option must match an id from the component details master list.
		this.pscOptions = [
			{id:"24pin", status: "correct", target1:"powerSupply", target2:"24pin", feedback: "Motherboards need power to operate properly, and this connection will supply that power."},
			{id:"68pin", status: "incorrect", feedback: this.connectorNotNeeded },
			{id:"4pin", status: "correct", target1:"powerSupply", target2:"4pin", feedback: "The CPU needs a 3.3V connection to be able to process, and this connector will provide that."},
			{id:"sataPower", status: "incorrect", feedback: this.connectorNotNeeded },
			{id:"molex", status: "correct", target1:"powerSupply", target2:"driveMolex", feedback: "The Molex connector provides 5V and 12V power to legacy peripheral devices inside computers. This connector is correct for older legacy devices such as optical drives and hard disk drives."}
		];
		this.fpcOptions = [
			{id:"fpcHarness", status: "correct", target1:"fpcHarness", target2:"fpc", feedback: "The front panel connections connect the buttons, LEDs and case speaker to the motherboard."}
		];
		this.ocOptions = [
			{id:"edie", status: "correct", target1:"driveMolex", target2:"driveDataEDIE", feedback: "The 40 individual wires in this parallel cable allow data to be transferred quickly, 16 bits at a time. This PATA connection was commonly used before SATA was developed."},
			{id:"sataData", status: "incorrect", feedback: this.connectorNotNeeded },
			{id:"chassisFan", status: "correct", target1:"chassisFan", target2:"chassisPower", feedback: "Cooling is important, which makes this small connector important because it powers chassis fans to cool the computer."},
			{id:"cpuFan", status: "correct", target1:"cpuFan", target2:"cpuPower",  feedback: "Because heat has a negative effect on electronics, cooling the processor is especially important. This power connection between the motherboard and the heat sink fan allows the fan to be controlled through the motherboard, which allows for efficient cooling."}
		];
	}	
}