const KMD_INSTANCES = { };

class KMDHook {
  constructor(type, callback) {
    KMD_INSTANCES[type] = Object.freeze({
      type: type,
      processor: callback
    });
  }
}
window.KMDApi = class KMDApi {
    // Environment
    KMD_BUILD = "0.1";
    KMD_SCRIPT_URL = "";
    KMD_SCRIPT = "";
    KMD_HOOKS = [];
    KMD_LOCK = [];
    
    StopLoad() {
      window.stop();
      fetch(location.href).then(function DocumentProcessor(inner) {
        const content = inner.replaceAll(this.KMD_SCRIPT_URL, "");
        document.write(content);
      });
    }
    
    SetScript(script) {
        this.KMD_SCRIPT_URL = script;
    }

    ExecuteScript() {
        if (this.KMD_SCRIPT in this.KMD_LOCK) {
          return;
        }
        this.KMD_LOCK.push(this.KMD_SCRIPT);
        
        const VirtualMachine = new Function(this.KMD_SCRIPT);
        const isolatedWindow = new(function IsolatedWindowConstructor() { 
          this.prototype = Window.prototype 
        });
        VirtualMachine.bind(isolatedWindow)();
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
                const HookProcessor = KMD_INSTANCES[hookType.type].processor;
                script = HookProcessor(script, hookType.target, hookType.injection);
            });
            this.KMD_SCRIPT = script;
            this.ExecuteScript();
        }.bind(this));
    };

    constructor() {
      console.log(KMD_INSTANCES);
    }
};

const TEXT_HOOK = new KMDHook("TEXT_HOOK", function TextProcessor(script, target, injection) {
  return script.replaceAll(target, injection);
});

const PROP_HOOK = new KMDHook("PROP_HOOK", function PropertyProcessor(script, target, injection) {
  delete Object.prototype[target];
  
  Object.defineProperty(Object.prototype, target, {
    get: injection,
    set: value => value
  });
});

const SET_HOOK = new KMDHook("SET_HOOK", function SetHook(script, target, injection) {
  Object.defineProperty(Object.prototype, target, {
    value: injection,
  });
});

const GLOBAL_HOOK = new KMDHook("GLOBAL_HOOK", function GlobalHook(script, target, injection) {
  delete Object.prototype[target];
  
  Object.defineProperty(Object.prototype, target, {
    value: injection,
    writable: false,
  });
});

const HTML_HOOK = new KMDHook("HTML_HOOK", async function HtmlHook(script, targets) {
  const responce = await fetch(location.href);
  const html = await responce.text();
  let replacedHtml = html;
  for (const key of targets) {
    const target = key;
    const injection = target[key];
    
    replacedHtml = replacedHtml.replaceAll(target, injection);
  };
  
  document.write(replacedHtml);
  
  return script;
});

const PROP_REMOVE = new KMDHook("PROP_REMOVE", function PropertyRemoval(script, target, injection) {
  delete Object.prototype[target];
  
  return script;
});

const DEFEND_HOOK = new KMDHook("DEFEND_HOOK", function HookDefender(script, target, injection) {
  Object.hasOwnPropertyDescriptor = new Proxy(Object.hasOwnPropertyDescriptor, {
    apply(target, that, args) {
      return Object.freeze({ });
    }
  });
  
  return script;
});

const DEFEND_STACK = new KMDApi("DEFEND_STACK", function StackDefender(script, target, injection) {
  const filename = (new Error).stack;
  Error = new Proxy(Error, {
    construct(target, args) {
      const errorObj = new target(args);
      const ffarr = filename.split(".js")[0].split(" ");
      errorObj.stack = errorObj.replaceAll(ffarr[ffarr.length - 1], "*.js");
      
      return errorObj;
    }
  });
  
  return script;
});
