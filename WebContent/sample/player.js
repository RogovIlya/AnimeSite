/*
* Uppod Player API v.0.1
* Автор сего чуда (Uppod) http://uppod.ru/
* Модифицировал подключение (alex-borisi)
*/

var ua = navigator.userAgent.toLowerCase();
var flashInstalled = 0;

if (typeof(navigator.plugins) != "undefined" && typeof(navigator.plugins["Shockwave Flash"]) == "object") {
     flashInstalled = 1;
} else if (typeof window.ActiveXObject != "undefined") {
     try {
          if (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) {
               flashInstalled = 1;
          }
     } catch(e) {};
};

function uppodEvent(playerID, event) { 
	switch(event){
		case 'init': 
			break;
		case 'start': 
			break;
		case 'play': 
			break;
		case 'pause': 
			break;
		case 'stop': 
			break;
		case 'seek': 
			break;
		case 'loaded':
			break;
		case 'end':
			break;
		case 'download':
			break;
		case 'quality':
			break;
		case 'error':
			break;
		case 'ad_end':
			break;
		case 'pl':
			break;
		case 'volume':
			break;
	}
}

function uppodSend(playerID, com, callback) {
	  document.getElementById(playerID).sendToUppod(com);
}

function uppodGet(playerID, com, callback) {
	  return document.getElementById(playerID).getUppod(com);
}

function Player(e, callback) {
    vars = {
        m: e.type, 
        id: e.id,
        uid: e.id,
        finder: e.finder,
        detect: e.detect,
    };
    
    if (e.file) { vars.file = e.file; }
    if (e.pl) { vars.pl = e.pl; }
    if (e.st) { vars.st = e.st; }
    if (e.st5) { vars.st5 = e.st5; }
    if (e.screen) { vars.poster = e.screen; }
    if (!e.style) { e.style = {w: '480px', h: '360px'}; }
    
    if ((e.finder === 'flash' && !flashInstalled) || (e.finder === 'html5' && flashInstalled)) {
        callback();
    }
    
    else if ((ua.indexOf("iphone") != -1 || ua.indexOf("ipad") != -1 || ua.indexOf("android") != -1 || ua.indexOf("windows phone") != -1 || ua.indexOf("blackberry") != -1 || e.detect == 'html5') && e.detect != 'flash') {
         htm5Player(e);
    } 
    
    else {
        if(!flashInstalled && e.detect != 'flash') {
            htm5Player(e);
        } 
        
        else {
            params = {
                "id": e.id,
                "allowFullScreen": "true", 
                "allowScriptAccess": "always",
            }
            
            new swfobject.embedSWF(e.swf, vars.id, e.style.w, e.style.h, "9.0.115", false, vars, params);
        }
    }
}

function htm5Player(e) {
    vars = {
        m: e.type, 
        uid: e.id,
    };
    
    if (e.screen) { vars.poster = e.screen; }
    if (e.file) { vars.file = e.file; }
    if (e.pl) { vars.pl = e.pl; }
    if (e.st5) { vars.st = e.st5; }
    
  	player = new Uppod(vars);
    uppodDetect(e.id, 'html5');
    
    var doc = document.getElementById(e.id);
    doc.style.width = e.style.w;
    doc.style.height = e.style.h;	    
}

function uppodDetect(id, type) {
    doc = document.getElementById(id);
    if (type) { 
        doc.setAttribute('data-uppod-detect', type); 
    }
    detect = doc.getAttribute('data-uppod-detect');
    if (detect == 'html5') { 
        return 'html5'; 
    }
    return 'flash';
}

function sendPlayer(id, com, callback) {
    if (uppodDetect(id) == 'flash') {
        document.getElementById(id).sendToUppod(com);
    } 
    
    else {
      	if (com == 'play') {
           player.Play()
        } else if (com == 'pause') {
           player.Pause()
        } else if (com == 'toggle') {
           player.Toggle()
        } else if (com == 'stop') {
           player.Stop()
        } else if (com.match(/file:/i)) {
           com = com.replace(/file:/g, '');
           player.Play(com);
        } else if (com.match(/v/i)) {
           com = com.replace(/v/g, '');
           player.Volume(com / 100);
        } else if (com == 'download') {
           player.Download();
        }
    }
}
