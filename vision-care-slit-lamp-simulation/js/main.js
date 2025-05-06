function init()
{
	var unityInstance = UnityLoader.instantiate("unity-container", "%UNITY_WEBGL_BUILD_URL%", {onProgress: updateProgress});
}
init();

function updateProgress(unityInstance, progress) 
{
	//Update fill of the progress bar
	const progressBarFill = document.getElementById("progressBarFill");
	progressBarFill.style.width = progress * 100 + "%";
	console.log(progress);
  
	//Remove loader div once simulation is loaded
	if (progress === 1) 
	{
		const loader = document.getElementById("loader");
		loader.remove();
	}
}
