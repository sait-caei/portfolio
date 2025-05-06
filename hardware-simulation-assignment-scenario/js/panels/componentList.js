class ComponentList 
{
	constructor() 
	{	
		this.simulationMode;
		
		//Current Build Components
		this.curCase;
		this.curMotherboard;
		this.curPowerSupply;
		this.curChassisFan;
		this.curCPU;
		this.curGPU;
		this.curRAM;
		this.curCards;
		this.curDrives;
		this.curPSC;
		this.curFPC;
		this.curOC;
				
		//Current Build Connections
		this.curMotherboardConnections;
		this.curPowerSupplyConnections;
		this.curChassisFanConnections;
		this.curCPUConnections;
		this.curRamConnections;
		this.curGPUConnections;
		this.curCardConnections;
		this.curDriveConnections;
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- General ---------------------------------------------- */
					
	reset(curPart)
	{
		//Reset installed components
		if (curPart == "A")
		{			
			this.curCPU = []; 
			this.curRAM = [];
			this.curGPU = [];
			this.curCards = [];
			this.curDrives = [];
		}			
		this.curPSC = []; 
		this.curFPC = []; 
		this.curOC = [];
		
		//Reset connections
		this.curMotherboardConnections = [];
		this.curPowerSupplyConnections = [];
		this.curChassisFanConnections = [];
		this.curCPUConnections = [];
		this.curRamConnections = [];
		this.curGPUConnections = [];
		this.curCardConnections = [];
		this.curDriveConnections = [];
		
		//Update text displayed in component list
		this.updateAllListCategories();	
	}
	
	setSimulationMode(mode)
	{
		this.simulationMode = mode;
	}
	
	/* ------------------------------------------------------------ */
	/* ----- Populate Table  -------------------------------------- */
	
	updateAllListCategories()
	{
		this.updateListCategory("Case");
		this.updateListCategory("Motherboard");
		this.updateListCategory("PowerSupply");
		this.updateListCategory("ChassisFan");
		this.updateListCategory("CPU");
		this.updateListCategory("RAM");
		this.updateListCategory("GPU");
		this.updateListCategory("Cards");
		this.updateListCategory("Drives");
		this.updateListCategory("PSC");
		this.updateListCategory("FPC");
		this.updateListCategory("OC");
	}
	
	updateListCategory(category)
	{				
		//Get installed component name(s)	
		let componentInfo = "";	
		let componentList = this.getComponents(category); 
		if (componentList)
		{
			if (typeof componentList == "string") //String
			{
				componentInfo = componentList;
			}
			else //Array
			{
				for (let i = 0; i < componentList.length; i++)
				{
					if (i > 0) componentInfo += ", ";
					componentInfo += componentList[i].name;
				}
			}
		}	
		
		//Create tooltip (only for activity mode)	
		let strTooltip = "";	
		if (this.simulationMode == "activity")
		{
			let connectionList = this.getConnections(category); 
			if (connectionList)
			{
				strTooltip = this.createTooltip(category, connectionList);
			}	
		}		
		
		//Update component list table
		let spanComponentInfo = document.getElementById("item" + category); 
		if (spanComponentInfo) spanComponentInfo.innerHTML = componentInfo;			
		if (this.simulationMode == "activity")
		{
			let divConnectionInfo = document.getElementById("conn" + category); 
			if (divConnectionInfo) divConnectionInfo.innerHTML = strTooltip;
		}
	}
	
	createTooltip(category, connectionList)
	{
		//Set position of tooltip. For the CPU setting its tooltip to the top would cause
		//it to be slightly cut off so set that one to bottom. The rest should be top.
		let tooltipClass = "tooltipText ";
		if (category == "CPU")
		{
			tooltipClass += "bottom";
		}
		else
		{
			tooltipClass += "top";
		}
		
		//Connections list may have duplicates because some components can be connected multiple
		//times. But we don't want duplicates displayed here, so create a version of the connections
		//array with no duplicates.
		let connectionListNoDuplicates = [...new Set(connectionList)];
		
		//Now create the tooltip 'icon' which will display in the component list table
		let strTooltip = "";
		for (let i = 0; i < connectionListNoDuplicates.length; i++)
		{				
			strTooltip += " <div class=\"tooltip\"><span class=\"tooltipNum\">"+(i+1)+"</span><span class=\""+tooltipClass+"\">Connected to "+connectionListNoDuplicates[i]+"</span></div>";
		}
		return strTooltip;
	}
	
	
	/* ------------------------------------------------------------ */
	/* ----- Components ------------------------------------------- */
			
	getComponents(category)
	{
		let component;
		switch (category)
		{
			case "Case": 			component = this.curCase; break;
			case "Motherboard": 	component = this.curMotherboard; break;
			case "PowerSupply": 	component = this.curPowerSupply; break;
			case "ChassisFan": 		component = this.curChassisFan; break;
			
			case "CPU": 			component = this.curCPU; break;
			case "RAM": 			component = this.curRAM; break;
			case "GPU": 			component = this.curGPU; break;
			case "Cards": 			component = this.curCards;  break;
			case "Drives": 			component = this.curDrives; break;
			
			case "PSC": 			component = this.curPSC; break;
			case "FPC": 			component = this.curFPC; break;
			case "OC": 				component = this.curOC; break;
		}			
		return component;
	}
	
	addComponent(component)
	{
		switch (component.category)
		{						
			case "CPU": 			this.addComponentToArray(this.curCPU, component); break;
			case "RAM": 			this.addComponentToArray(this.curRAM, component); break;
			case "GPU": 			this.addComponentToArray(this.curGPU, component); break;
			case "Cards": 			this.addComponentToArray(this.curCards, component); break;
			case "Drives": 			this.addComponentToArray(this.curDrives, component); break;
			
			case "PSC": 			this.addComponentToArray(this.curPSC, component); break;
			case "FPC": 			this.addComponentToArray(this.curFPC, component); break;
			case "OC": 				this.addComponentToArray(this.curOC, component); break;
		}			
		this.updateListCategory(component.category);
	}
	
	addComponentToArray(arr, component)
	{	
		arr.push(component);
	}
	
	addWiringComponent(connection)
	{
		this.addComponent(connection.component);			
		this.addComponentConnection(connection.target1.name, connection.target2.name);
		this.addComponentConnection(connection.target2.name, connection.target1.name);		
	}
	
	//Locked components are installed by default and cannot be uninstalled by the user
	addLockedComponent(category, component)
	{		
		switch (category)
		{			
			case "Case": 			this.curCase = component; break;
			case "Motherboard": 	this.curMotherboard = component; break;
			case "PowerSupply": 	this.curPowerSupply = component; break;
			case "ChassisFan": 		this.curChassisFan = component; break;
		}	
		this.updateListCategory(category);
	}
	
	removeComponent(component)
	{		
		switch (component.category)
		{			
			case "Case": 			this.curCase = null; break;
			case "Motherboard": 	this.curMotherboard = null; break;
			case "PowerSupply": 	this.curPowerSupply = null; break;
			case "ChassisFan": 		this.curChassisFan = null; break;
				
			case "CPU": 			this.removeComponentFromArray(this.curCPU, component); break;
			case "RAM": 			this.removeComponentFromArray(this.curRAM, component); break;
			case "GPU": 			this.removeComponentFromArray(this.curGPU, component); break;
			case "Cards": 			this.removeComponentFromArray(this.curCards, component); break;
			case "Drives": 			this.removeComponentFromArray(this.curDrives, component); break;
			
			case "PSC": 			this.removeComponentFromArray(this.curPSC, component); break;
			case "FPC": 			this.removeComponentFromArray(this.curFPC, component); break;
			case "OC": 				this.removeComponentFromArray(this.curOC, component); break;
		}	
		this.updateListCategory(component.category);
	}
	
	removeComponentFromArray(arr, component)
	{
		for (let i = 0; i < arr.length; i++)
		{
			if (arr[i] == component)
			{
				arr.splice(i, 1);
			}
		}
	}
	
	removeWiringComponent(connection)
	{
		this.removeComponent(connection.component);		
		this.removeComponentConnection(connection.target1.name, connection.target2.name);
		this.removeComponentConnection(connection.target2.name, connection.target1.name);	
	}
	

	/* ------------------------------------------------------------ */
	/* ----- Wiring Connections ----------------------------------- */
			
	getConnections(category)
	{
		let connections;
		switch (category)
		{
			case "Motherboard": 	connections = this.curMotherboardConnections; break;
			case "PowerSupply": 	connections = this.curPowerSupplyConnections; break;
			case "ChassisFan": 		connections = this.curChassisFanConnections; break;
			
			case "CPU": 			connections = this.curCPUConnections; break;
			case "RAM": 			connections = this.curRamConnections; break;
			case "GPU": 			connections = this.curGPUConnections; break;
			case "Cards": 			connections = this.curCardConnections;  break;
			case "Drives": 			connections = this.curDriveConnections; break;
		}			
		return connections;
	}
	
	addComponentConnection(target1, target2)
	{
		target1 = this.editTarget1Name(target1);
		target2 = this.editTarget2Name(target2);	
	
		switch (target1)
		{		
			case "Motherboard": 	this.addComponentToArray(this.curMotherboardConnections, target2);  break;				
			case "Power Supply": 	this.addComponentToArray(this.curPowerSupplyConnections, target2); break;
			case "Chassis Fan": 	this.addComponentToArray(this.curChassisFanConnections, target2); break;
			
			case "CPU Fan": this.addComponentToArray(this.curCPUConnections, target2); break;			
			case "RAM": 	this.addComponentToArray(this.curRamConnections, target2); break;			
			case "GPU": 	this.addComponentToArray(this.curGPUConnections, target2); break;			
			case "Cards": 	this.addComponentToArray(this.curCardConnections, target2); break;		
			case "Drives": 	this.addComponentToArray(this.curDriveConnections, target2); break;
		}	
		this.updateAllListCategories();
	}

	removeComponentConnection(target1, target2)
	{ 			
		target1 = this.editTarget1Name(target1);
		target2 = this.editTarget2Name(target2);
		
		switch (target1)
		{		
			case "Motherboard":	
				if (target2 == "power supply")
				{
				}
				this.removeComponentFromArray(this.curMotherboardConnections, target2);  
				break;	
				
			case "Power Supply": 	this.removeComponentFromArray(this.curPowerSupplyConnections, target2); break;
			case "Chassis Fan": 	this.removeComponentFromArray(this.curChassisFanConnections, target2); break;
			
			case "CPU": 	this.removeComponentFromArray(this.curCPUConnections, target2); break;			
			case "RAM": 	this.removeComponentFromArray(this.curRamConnections, target2); break;			
			case "GPU": 	this.removeComponentFromArray(this.curGPUConnections, target2); break;			
			case "Cards": 	this.removeComponentFromArray(this.curCardConnections, target2); break;		
			case "Drives": 	this.removeComponentFromArray(this.curDriveConnections, target2); break;
		}	
		this.updateAllListCategories();
	}
	
	editTarget1Name(targetName)
	{
		//Edit target name to display in a certain way
		switch (targetName)
		{
			case "4-Pin ATX Power Connection":	
			case "24-Pin ATX Power Connection":
			case "CPU Fan Power Connection":
			case "Chassis Fan Power Connection":
			case "Hard Drive Cable Connection": 	
			case "Front Panel Connection":	
				targetName = "Motherboard";
				break;
				
			case "CPU Fan Power Connection":		targetName = "CPU"; break;
			case "Chassis Fan Power Connection": 	targetName = "Chassis Fan"; break;			
			case "Installed Hard Drive":  			targetName = "Drives";  break;
		}		
		return targetName;
	}
	
	editTarget2Name(targetName)
	{		
		//Edit target name to display in a certain way
		targetName = targetName.toLowerCase();
		targetName = targetName.replace(" atx ", " ATX ");
		targetName = targetName.replace("cpu", "CPU");
		targetName = targetName.replace("sata ", "SATA ");
		targetName = targetName.replace("edie ", "EDIE ");		
		
		switch (targetName)
		{	
			case "4-pin ATX power connection":
			case "24-pin ATX power connection":	
			case "CPU fan power connection":
			case "chassis fan power connection":	
			case "hard drive cable connection":			
			case "front panel connection":	
				targetName = "motherboard ("+targetName+")"; 
				break;
			
			case "CPU fan power connection":		targetName = "CPU"; break;
			case "Chassis fan power connection": 	targetName = "chassis fan"; break;
		}
		
		return targetName;
	}
}