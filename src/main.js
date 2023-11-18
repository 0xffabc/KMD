class KMDApi {
    // Environment
    KMD_BUILD = "0.1";
    KMD_SCRIPT_URL = "";
    KMD_SCRIPT = "";
    KMD_HOOKS = [];
    KMD_LOCK = [];
    
    
    SetScript(script) {
        this.KMD_SCRIPT_URL = script;
    }

    ExecuteScript() {
        if (this.KMD_SCRIPT in this.KMD_LOCK) {
          return;
        }
        this.KMD_LOCK.push(this.KMD_SCRIPT);
        
        const VirtualMachine = new Function(this.KMD_SCRIPT);
        VirtualMachine();
    }

    AddHook(type, target, injection) {
        this.KMD_HOOKS.push(Object.freeze({
            type: type,
            target: target,
            injection: injection
        }));
    }

    PatchScript() {
        fetch(this.KMD_SCRIPT_URL).then(responce => responce.text()).then(function(script) {
            this.KMD_HOOKS.forEach(function(hookType) {
                switch (hookType.type) {
                    case "TEXT_HOOK":
                        script = script.replaceAll(hookType.target, hookType.injection);
                        break;
                    case "PROP_HOOK":
                        Object.defineProperty(Object.prototype, hookType.target, {
                            get() {
                                return hookType.injection;
                            }, set(value) { }
                        });
                        break;
                    case "SET_HOOK":
                        Object.prototype[hookType.target] = hookType.injection;
                        break;
                    case "GLOBAL_HOOK":
                        window[hookType.target] = hookType.injection;
                        break;
                }
            });
            this.KMD_SCRIPT = script;
            this.ExecuteScript();
        }.bind(this));
    };

    constructor() {
        if ("GM_info" in window && "KMD_LATEST" in GM_info) {
            throw new TypeError("KMD Versions Mismatch");
        }
    
                                              }
};
