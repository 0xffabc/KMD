# KMD Api Docs

## About
What is KMD?

KMD is a dynamic scripts patcher, to monkeypatch a library.

Why KMD?

This library is lightweight and understandable by a beginner, everyone can use it without recesses to technical details.

## Usage

How to use KMD?
Let's say, we want to monkeypatch a library "victim.js" (view it [here](<https://github.com/0xffabc/KMD/tree/main/tests/victim.js>)
For some reason, we want to replace alert by console log.
In KMD we can do it by multiple ways:
1. "TEXT_HOOK"
   - TEXT_HOOK is standart way to replace something in the file.
     ```js
     // Example of "TEXT_HOOK"
     const kmd = new KMDApi;
     // Load our victim.js
     kmd.SetScript("victim.js");
     // Apply patch
     kmd.AddHook("TEXT_HOOK", "alert", "console.log");
     // Patch the script
     kmd.PatchScript();

     // And now, in the developer console, we see logged "Hey" !
     ```
2. "GLOBAL_HOOK"
   - Replaces property in "window" by your own.
   - ```js
     // ... Init code
     kmd.AddHook("GLOBAL_HOOK", "alert", console.log);
     kmd.PatchScript();
     ```
3. "PROP_HOOK"
   - Patches only "Object" instances that will be created after running the patch
   - ```js
     // ... Init code
     kmd.AddHook("PROP_HOOK", "someValue", true);
     kmd.PatchScript();
     // We would use script as data:url,
     // And now all object instances created after patch will have "someValue" property with value "true".
     ```
## Patching a script
The process of patching a script is:
1. You create instance of KMDApi
2. You set script URL with KMDApi.prototype.SetScript
3. You add patches by KMDApi.prototype.AddHook
4. You commit patch by KMDApi.prototype.PatchScript
## Planned features
The features planned to be added:
- Automatically disable library if it's patched
- Fix all bugs and problems reported to issues.
## Download

CDN Urls:
