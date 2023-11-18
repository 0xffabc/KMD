// Text Hook test

// Create KMD Instance 
const api = new KMDApi;
// Fuzzing our "victim.js"
api.SetScript("victim.js");
// Add a text hook, replace all "Hey" by "Patched"!
api.AddHook("TEXT_HOOK", "Hey", "Patched!");
// Execute the script
api.PatchScript();
