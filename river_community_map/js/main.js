let unityInstance = UnityLoader.instantiate("unityContainer", "Build/Build.json");
let impExpTextarea;
let codeTxt;
let isLoaded;

function init()
{
	impExpTextarea = document.getElementById("impExpTextarea");
	impExpTextarea.value = "";	
	
	disableSelection(impExpTextarea);
}
window.onload = init;

function setToLoaded() 
{
	isLoaded = true;			
}

function importCode()
{
	if (!isLoaded) return;
	
	//Pass code string to unity
	let code = impExpTextarea.value;
	unityInstance.SendMessage("Manager", "importCode", code);
	//console.log("code imported");
}


function exportCode()
{
	if (!isLoaded) return;
	
	//Get code string from unity
	unityInstance.SendMessage("Manager", "exportCode");
}

function setExportCode(codeTxt)
{		
	impExpTextarea.value = codeTxt;
	document.querySelector("#impExpTextarea").select();
	
	//Copy code string
	if (navigator.clipboard) //Check if browser supports navigator.clipboard
	{
		navigator.clipboard.writeText(codeTxt).then(function() 
		{
			//console.log("code copied");
		}, function() 
		{
			document.execCommand('copy'); //fallback
		});
	}
	else //If not, fall back to old method
	{
		document.execCommand('copy');
	} 
}	

function clearCode()
{
	impExpTextarea.value = "";
}

function disableSelection(element) 
{
	if (typeof element.onselectstart != 'undefined') 
	{
		element.onselectstart = function() { return false; };
	} 
	else if (typeof element.style.MozUserSelect != 'undefined') 
	{
		element.style.MozUserSelect = 'none';
	} 
	else 
	{
		element.onmousedown = function() { return false; };
	}
}