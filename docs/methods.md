# KMD Methods
## Here you can learn about every KMD hook and method

### Methods

1. KMDApi.prototype.StopLoad: function
   - Stops window from loading and replaces values in the document.
   - Uses document.write, Fetch api and Location api.
2. KMDapi.prototype.SetScript: function
   - Sets property KMDApi.prototype.KMD_SCRIPT_URL
   - Specifies script to be patched by KMD.
3. KMDApi.prototype.AddHook: function
   - Specifies hook to be applied by KMDApi.prototype.PatchScript.
   - Learn about hooks [here](<hooks.md>)!
4. KMDApi.prototype.PatchScript: function
   - Starts process of patching script which hooks were added by KMDApi.prototype.AddHook and URL specified by KMDApi.prototype.SetScript.

