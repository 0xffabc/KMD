# KMD Api Docs
<div align="center">
   <p>
      <img src="https://img.shields.io/github/stars/0xffabc/KMD">
   </p>
</div>
## About
What is KMD?

KMD is a dynamic scripts patcher, to monkeypatch a library.

Why KMD?

This library is lightweight and understandable by a beginner, everyone can use it without recesses to technical details.

## Usage

How to use KMD?

Let's say, we want to monkeypatch a library "victim.js" (view it [here](<https://github.com/0xffabc/KMD/tree/main/tests/victim.js>)
For some reason, we want to replace alert by console log.
In KMD we can do it by multiple ways. These are basic KMD hooks:
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
4. "HTML_HOOK"
   - Allows to patch something in HTML, stops document load and reloads HTML content with replaced values.
     ```js
     kmd.AddHook("HTML_HOOK", "something", "replaced");
     ```
5. "PROP_REMOVE"
   - Used to clean getters and setters for property before hooking it.
     ```js
     kmd.AddHook("PROP_REMOVE", "Property");
     ```
More detailed guide will be available [here](<methods.md>) soon.
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
1. Minimifed (terser): <https://rawcdn.githack.com/0xffabc/KMD/8af163d29ae354631d1559c659dcef68784aad1f/dist/browser.min.js>
2. Obfuscated (obfuscator.io): <https://rawcdn.githack.com/0xffabc/KMD/8af163d29ae354631d1559c659dcef68784aad1f/dist/browser.obfs.js>

## KMD Code

Source code is available [here](<https://github.com/0xffabc/KMD/blob/main/src>)
Minimified and obfuscated versions of code are available [here](<https://github.com/0xffabc/KMD/blob/main/dist>)

## License



Copyright 2023 0xffabc

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
