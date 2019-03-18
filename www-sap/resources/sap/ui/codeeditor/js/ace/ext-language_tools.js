ace.define("ace/snippets",["require","exports","module","ace/lib/oop","ace/lib/event_emitter","ace/lib/lang","ace/range","ace/anchor","ace/keyboard/hash_handler","ace/tokenizer","ace/lib/dom","ace/editor"],function(a,b,d){"use strict";var o=a("./lib/oop");var E=a("./lib/event_emitter").EventEmitter;var l=a("./lib/lang");var R=a("./range").Range;var A=a("./anchor").Anchor;var H=a("./keyboard/hash_handler").HashHandler;var T=a("./tokenizer").Tokenizer;var f=R.comparePoints;var S=function(){this.snippetMap={};this.snippetNameMap={};};(function(){o.implement(this,E);this.getTokenizer=function(){function c(s,_,i){s=s.substr(1);if(/^\d+$/.test(s)&&!i.inFormatString)return[{tabstopId:parseInt(s,10)}];return[{text:s}];}function e(i){return"(?:[^\\\\"+i+"]|\\\\.)";}S.$tokenizer=new T({start:[{regex:/:/,onMatch:function(v,s,i){if(i.length&&i[0].expectIf){i[0].expectIf=false;i[0].elseBranch=i[0];return[i[0]];}return":";}},{regex:/\\./,onMatch:function(v,s,i){var j=v[1];if(j=="}"&&i.length){v=j;}else if("`$\\".indexOf(j)!=-1){v=j;}else if(i.inFormatString){if(j=="n")v="\n";else if(j=="t")v="\n";else if("ulULE".indexOf(j)!=-1){v={changeCase:j,local:j>"a"};}}return[v];}},{regex:/}/,onMatch:function(v,s,i){return[i.length?i.shift():v];}},{regex:/\$(?:\d+|\w+)/,onMatch:c},{regex:/\$\{[\dA-Z_a-z]+/,onMatch:function(s,i,j){var t=c(s.substr(1),i,j);j.unshift(t[0]);return t;},next:"snippetVar"},{regex:/\n/,token:"newline",merge:false}],snippetVar:[{regex:"\\|"+e("\\|")+"*\\|",onMatch:function(v,s,i){i[0].choices=v.slice(1,-1).split(",");},next:"start"},{regex:"/("+e("/")+"+)/(?:("+e("/")+"*)/)(\\w*):?",onMatch:function(v,s,i){var t=i[0];t.fmtString=v;v=this.splitRegex.exec(v);t.guard=v[1];t.fmt=v[2];t.flag=v[3];return"";},next:"start"},{regex:"`"+e("`")+"*`",onMatch:function(v,s,i){i[0].code=v.splice(1,-1);return"";},next:"start"},{regex:"\\?",onMatch:function(v,s,i){if(i[0])i[0].expectIf=true;},next:"start"},{regex:"([^:}\\\\]|\\\\.)*:?",token:"",next:"start"}],formatString:[{regex:"/("+e("/")+"+)/",token:"regex"},{regex:"",onMatch:function(v,s,i){i.inFormatString=true;},next:"start"}]});S.prototype.getTokenizer=function(){return S.$tokenizer;};return S.$tokenizer;};this.tokenizeTmSnippet=function(s,c){return this.getTokenizer().getLineTokens(s,c).tokens.map(function(x){return x.value||x;});};this.$getDefaultValue=function(e,c){if(/^[A-Z]\d+$/.test(c)){var i=c.substr(1);return(this.variables[c[0]+"__"]||{})[i];}if(/^\d+$/.test(c)){return(this.variables.__||{})[c];}c=c.replace(/^TM_/,"");if(!e)return;var s=e.session;switch(c){case"CURRENT_WORD":var r=s.getWordRange();case"SELECTION":case"SELECTED_TEXT":return s.getTextRange(r);case"CURRENT_LINE":return s.getLine(e.getCursorPosition().row);case"PREV_LINE":return s.getLine(e.getCursorPosition().row-1);case"LINE_INDEX":return e.getCursorPosition().column;case"LINE_NUMBER":return e.getCursorPosition().row+1;case"SOFT_TABS":return s.getUseSoftTabs()?"YES":"NO";case"TAB_SIZE":return s.getTabSize();case"FILENAME":case"FILEPATH":return"";case"FULLNAME":return"Ace";}};this.variables={};this.getVariableValue=function(e,v){if(this.variables.hasOwnProperty(v))return this.variables[v](e,v)||"";return this.$getDefaultValue(e,v)||"";};this.tmStrFormat=function(s,c,e){var j=c.flag||"";var r=c.guard;r=new RegExp(r,j.replace(/[^gi]/,""));var m=this.tokenizeTmSnippet(c.fmt,"formatString");var _=this;var p=s.replace(r,function(){_.variables.__=arguments;var t=_.resolveVariables(m,e);var u="E";for(var i=0;i<t.length;i++){var c=t[i];if(typeof c=="object"){t[i]="";if(c.changeCase&&c.local){var v=t[i+1];if(v&&typeof v=="string"){if(c.changeCase=="u")t[i]=v[0].toUpperCase();else t[i]=v[0].toLowerCase();t[i+1]=v.substr(1);}}else if(c.changeCase){u=c.changeCase;}}else if(u=="U"){t[i]=c.toUpperCase();}else if(u=="L"){t[i]=c.toLowerCase();}}return t.join("");});this.variables.__=null;return p;};this.resolveVariables=function(s,e){var r=[];for(var i=0;i<s.length;i++){var c=s[i];if(typeof c=="string"){r.push(c);}else if(typeof c!="object"){continue;}else if(c.skip){j(c);}else if(c.processed<i){continue;}else if(c.text){var v=this.getVariableValue(e,c.text);if(v&&c.fmtString)v=this.tmStrFormat(v,c);c.processed=i;if(c.expectIf==null){if(v){r.push(v);j(c);}}else{if(v){c.skip=c.elseBranch;}else j(c);}}else if(c.tabstopId!=null){r.push(c);}else if(c.changeCase!=null){r.push(c);}}function j(c){var m=s.indexOf(c,i+1);if(m!=-1)i=m;}return r;};this.insertSnippetForSelection=function(e,s){var c=e.getCursorPosition();var m=e.session.getLine(c.row);var r=e.session.getTabString();var u=m.match(/^\s*/)[0];if(c.column<u.length)u=u.slice(0,c.column);s=s.replace(/\r/g,"");var v=this.tokenizeTmSnippet(s);v=this.resolveVariables(v,e);v=v.map(function(x){if(x=="\n")return x+u;if(typeof x=="string")return x.replace(/\t/g,r);return x;});var w=[];v.forEach(function(p,i){if(typeof p!="object")return;var B=p.tabstopId;var D=w[B];if(!D){D=w[B]=[];D.index=B;D.value="";}if(D.indexOf(p)!==-1)return;D.push(p);var C=v.indexOf(p,i+1);if(C===-1)return;var j=v.slice(i+1,C);var x=j.some(function(t){return typeof t==="object";});if(x&&!D.value){D.value=j;}else if(j.length&&(!D.value||typeof D.value!=="string")){D.value=j.join("");}});w.forEach(function(D){D.length=0;});var y={};function z(t){var x=[];for(var i=0;i<t.length;i++){var p=t[i];if(typeof p=="object"){if(y[p.tabstopId])continue;var j=t.lastIndexOf(p,i-1);p=x[j]||{tabstopId:p.tabstopId};}x[i]=p;}return x;}for(var i=0;i<v.length;i++){var p=v[i];if(typeof p!="object")continue;var B=p.tabstopId;var C=v.indexOf(p,i+1);if(y[B]){if(y[B]===p)y[B]=null;continue;}var D=w[B];var F=typeof D.value=="string"?[D.value]:z(D.value);F.unshift(i+1,Math.max(0,C-i));F.push(p);y[B]=p;v.splice.apply(v,F);if(D.indexOf(p)===-1)D.push(p);}var G=0,I=0;var J="";v.forEach(function(t){if(typeof t==="string"){var j=t.split("\n");if(j.length>1){I=j[j.length-1].length;G+=j.length-1;}else I+=t.length;J+=t;}else{if(!t.start)t.start={row:G,column:I};else t.end={row:G,column:I};}});var K=e.getSelectionRange();var L=e.session.replace(K,J);var M=new g(e);var N=e.inVirtualSelectionMode&&e.selection.index;M.addTabstops(w,K.start,L,N);};this.insertSnippet=function(e,s){var c=this;if(e.inVirtualSelectionMode)return c.insertSnippetForSelection(e,s);e.forEachSelection(function(){c.insertSnippetForSelection(e,s);},null,{keepOrder:true});if(e.tabstopManager)e.tabstopManager.tabNext();};this.$getScope=function(e){var s=e.session.$mode.$id||"";s=s.split("/").pop();if(s==="html"||s==="php"){if(s==="php"&&!e.session.$mode.inlinePhp)s="html";var c=e.getCursorPosition();var i=e.session.getState(c.row);if(typeof i==="object"){i=i[0];}if(i.substring){if(i.substring(0,3)=="js-")s="javascript";else if(i.substring(0,4)=="css-")s="css";else if(i.substring(0,4)=="php-")s="php";}}return s;};this.getActiveScopes=function(e){var s=this.$getScope(e);var c=[s];var i=this.snippetMap;if(i[s]&&i[s].includeScopes){c.push.apply(c,i[s].includeScopes);}c.push("_");return c;};this.expandWithTab=function(e,c){var s=this;var r=e.forEachSelection(function(){return s.expandSnippetForSelection(e,c);},null,{keepOrder:true});if(r&&e.tabstopManager)e.tabstopManager.tabNext();return r;};this.expandSnippetForSelection=function(e,c){var i=e.getCursorPosition();var j=e.session.getLine(i.row);var m=j.substring(0,i.column);var p=j.substr(i.column);var s=this.snippetMap;var r;this.getActiveScopes(e).some(function(t){var u=s[t];if(u)r=this.findMatchingSnippet(u,m,p);return!!r;},this);if(!r)return false;if(c&&c.dryRun)return true;e.session.doc.removeInLine(i.row,i.column-r.replaceBefore.length,i.column+r.replaceAfter.length);this.variables.M__=r.matchBefore;this.variables.T__=r.matchAfter;this.insertSnippetForSelection(e,r.content);this.variables.M__=this.variables.T__=null;return true;};this.findMatchingSnippet=function(c,e,j){for(var i=c.length;i--;){var s=c[i];if(s.startRe&&!s.startRe.test(e))continue;if(s.endRe&&!s.endRe.test(j))continue;if(!s.startRe&&!s.endRe)continue;s.matchBefore=s.startRe?s.startRe.exec(e):[""];s.matchAfter=s.endRe?s.endRe.exec(j):[""];s.replaceBefore=s.triggerRe?s.triggerRe.exec(e)[0]:"";s.replaceAfter=s.endTriggerRe?s.endTriggerRe.exec(j)[0]:"";return s;}};this.snippetMap={};this.snippetNameMap={};this.register=function(c,e){var i=this.snippetMap;var j=this.snippetNameMap;var m=this;if(!c)c=[];function w(s){if(s&&!/^\^?\(.*\)\$?$|^\\b$/.test(s))s="(?:"+s+")";return s||"";}function p(s,t,u){s=w(s);t=w(t);if(u){s=t+s;if(s&&s[s.length-1]!="$")s=s+"$";}else{s=s+t;if(s&&s[0]!="^")s="^"+s;}return new RegExp(s);}function r(s){if(!s.scope)s.scope=e||"_";e=s.scope;if(!i[e]){i[e]=[];j[e]={};}var t=j[e];if(s.name){var u=t[s.name];if(u)m.unregister(u);t[s.name]=s;}i[e].push(s);if(s.tabTrigger&&!s.trigger){if(!s.guard&&/^\w/.test(s.tabTrigger))s.guard="\\b";s.trigger=l.escapeRegExp(s.tabTrigger);}if(!s.trigger&&!s.guard&&!s.endTrigger&&!s.endGuard)return;s.startRe=p(s.trigger,s.guard,true);s.triggerRe=new RegExp(s.trigger);s.endRe=p(s.endTrigger,s.endGuard,true);s.endTriggerRe=new RegExp(s.endTrigger);}if(c&&c.content)r(c);else if(Array.isArray(c))c.forEach(r);this._signal("registerSnippets",{scope:e});};this.unregister=function(c,e){var j=this.snippetMap;var m=this.snippetNameMap;function r(s){var p=m[s.scope||e];if(p&&p[s.name]){delete p[s.name];var t=j[s.scope||e];var i=t&&t.indexOf(s);if(i>=0)t.splice(i,1);}}if(c.content)r(c);else if(Array.isArray(c))c.forEach(r);};this.parseSnippetFile=function(s){s=s.replace(/\r/g,"");var c=[],i={};var r=/^#.*|^({[\s\S]*})\s*$|^(\S+) (.*)$|^((?:\n*\t.*)+)/gm;var m;while(m=r.exec(s)){if(m[1]){try{i=JSON.parse(m[1]);c.push(i);}catch(e){}}if(m[4]){i.content=m[4].replace(/^\t/gm,"");c.push(i);i={};}else{var j=m[2],v=m[3];if(j=="regex"){var p=/\/((?:[^\/\\]|\\.)*)|$/g;i.guard=p.exec(v)[1];i.trigger=p.exec(v)[1];i.endTrigger=p.exec(v)[1];i.endGuard=p.exec(v)[1];}else if(j=="snippet"){i.tabTrigger=v.match(/^\S*/)[0];if(!i.name)i.name=v;}else{i[j]=v;}}}return c;};this.getSnippetByName=function(c,e){var s=this.snippetNameMap;var i;this.getActiveScopes(e).some(function(j){var m=s[j];if(m)i=m[c];return!!i;},this);return i;};}).call(S.prototype);var g=function(e){if(e.tabstopManager)return e.tabstopManager;e.tabstopManager=this;this.$onChange=this.onChange.bind(this);this.$onChangeSelection=l.delayedCall(this.onChangeSelection.bind(this)).schedule;this.$onChangeSession=this.onChangeSession.bind(this);this.$onAfterExec=this.onAfterExec.bind(this);this.attach(e);};(function(){this.attach=function(e){this.index=0;this.ranges=[];this.tabstops=[];this.$openTabstops=null;this.selectedTabstop=null;this.editor=e;this.editor.on("change",this.$onChange);this.editor.on("changeSelection",this.$onChangeSelection);this.editor.on("changeSession",this.$onChangeSession);this.editor.commands.on("afterExec",this.$onAfterExec);this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler);};this.detach=function(){this.tabstops.forEach(this.removeTabstopMarkers,this);this.ranges=null;this.tabstops=null;this.selectedTabstop=null;this.editor.removeListener("change",this.$onChange);this.editor.removeListener("changeSelection",this.$onChangeSelection);this.editor.removeListener("changeSession",this.$onChangeSession);this.editor.commands.removeListener("afterExec",this.$onAfterExec);this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler);this.editor.tabstopManager=null;this.editor=null;};this.onChange=function(c){var e=c;var j=c.action[0]=="r";var s=c.start;var m=c.end;var p=s.row;var t=m.row;var u=t-p;var v=m.column-s.column;if(j){u=-u;v=-v;}if(!this.$inChange&&j){var w=this.selectedTabstop;var x=w&&!w.some(function(r){return f(r.start,s)<=0&&f(r.end,m)>=0;});if(x)return this.detach();}var y=this.ranges;for(var i=0;i<y.length;i++){var r=y[i];if(r.end.row<s.row)continue;if(j&&f(s,r.start)<0&&f(m,r.end)>0){this.removeRange(r);i--;continue;}if(r.start.row==p&&r.start.column>s.column)r.start.column+=v;if(r.end.row==p&&r.end.column>=s.column)r.end.column+=v;if(r.start.row>=p)r.start.row+=u;if(r.end.row>=p)r.end.row+=u;if(f(r.start,r.end)>0)this.removeRange(r);}if(!y.length)this.detach();};this.updateLinkedFields=function(){var t=this.selectedTabstop;if(!t||!t.hasLinkedRanges)return;this.$inChange=true;var s=this.editor.session;var c=s.getTextRange(t.firstNonLinked);for(var i=t.length;i--;){var r=t[i];if(!r.linked)continue;var e=b.snippetManager.tmStrFormat(c,r.original);s.replace(r,e);}this.$inChange=false;};this.onAfterExec=function(e){if(e.command&&!e.command.readOnly)this.updateLinkedFields();};this.onChangeSelection=function(){if(!this.editor)return;var c=this.editor.selection.lead;var e=this.editor.selection.anchor;var j=this.editor.selection.isEmpty();for(var i=this.ranges.length;i--;){if(this.ranges[i].linked)continue;var m=this.ranges[i].contains(c.row,c.column);var p=j||this.ranges[i].contains(e.row,e.column);if(m&&p)return;}this.detach();};this.onChangeSession=function(){this.detach();};this.tabNext=function(c){var m=this.tabstops.length;var i=this.index+(c||1);i=Math.min(Math.max(i,1),m);if(i==m)i=0;this.selectTabstop(i);if(i===0)this.detach();};this.selectTabstop=function(c){this.$openTabstops=null;var t=this.tabstops[this.index];if(t)this.addTabstopMarkers(t);this.index=c;t=this.tabstops[this.index];if(!t||!t.length)return;this.selectedTabstop=t;if(!this.editor.inVirtualSelectionMode){var s=this.editor.multiSelect;s.toSingleRange(t.firstNonLinked.clone());for(var i=t.length;i--;){if(t.hasLinkedRanges&&t[i].linked)continue;s.addRange(t[i].clone(),true);}if(s.ranges[0])s.addRange(s.ranges[0].clone());}else{this.editor.selection.setRange(t.firstNonLinked);}this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler);};this.addTabstops=function(t,s,e){if(!this.$openTabstops)this.$openTabstops=[];if(!t[0]){var p=R.fromPoints(e,e);n(p.start,s);n(p.end,s);t[0]=[p];t[0].index=0;}var i=this.index;var c=[i+1,0];var r=this.ranges;t.forEach(function(j,m){var u=this.$openTabstops[m]||j;for(var i=j.length;i--;){var p=j[i];var v=R.fromPoints(p.start,p.end||p.start);k(v.start,s);k(v.end,s);v.original=p;v.tabstop=u;r.push(v);if(u!=j)u.unshift(v);else u[i]=v;if(p.fmtString){v.linked=true;u.hasLinkedRanges=true;}else if(!u.firstNonLinked)u.firstNonLinked=v;}if(!u.firstNonLinked)u.hasLinkedRanges=false;if(u===j){c.push(u);this.$openTabstops[m]=u;}this.addTabstopMarkers(u);},this);if(c.length>2){if(this.tabstops.length)c.push(c.splice(2,1)[0]);this.tabstops.splice.apply(this.tabstops,c);}};this.addTabstopMarkers=function(t){var s=this.editor.session;t.forEach(function(r){if(!r.markerId)r.markerId=s.addMarker(r,"ace_snippet-marker","text");});};this.removeTabstopMarkers=function(t){var s=this.editor.session;t.forEach(function(r){s.removeMarker(r.markerId);r.markerId=null;});};this.removeRange=function(r){var i=r.tabstop.indexOf(r);r.tabstop.splice(i,1);i=this.ranges.indexOf(r);this.ranges.splice(i,1);this.editor.session.removeMarker(r.markerId);if(!r.tabstop.length){i=this.tabstops.indexOf(r.tabstop);if(i!=-1)this.tabstops.splice(i,1);if(!this.tabstops.length)this.detach();}};this.keyboardHandler=new H();this.keyboardHandler.bindKeys({"Tab":function(e){if(b.snippetManager&&b.snippetManager.expandWithTab(e)){return;}e.tabstopManager.tabNext(1);},"Shift-Tab":function(e){e.tabstopManager.tabNext(-1);},"Esc":function(e){e.tabstopManager.detach();},"Return":function(e){return false;}});}).call(g.prototype);var h={};h.onChange=A.prototype.onChange;h.setPosition=function(r,c){this.pos.row=r;this.pos.column=c;};h.update=function(p,c,$){this.$insertRight=$;this.pos=p;this.onChange(c);};var k=function(p,c){if(p.row==0)p.column+=c.column;p.row+=c.row;};var n=function(p,s){if(p.row==s.row)p.column-=s.column;p.row-=s.row;};a("./lib/dom").importCssString(".ace_snippet-marker {    -moz-box-sizing: border-box;    box-sizing: border-box;    background: rgba(194, 193, 208, 0.09);    border: 1px dotted rgba(211, 208, 235, 0.62);    position: absolute;}");b.snippetManager=new S();var q=a("./editor").Editor;(function(){this.insertSnippet=function(c,e){return b.snippetManager.insertSnippet(this,c,e);};this.expandSnippet=function(c){return b.snippetManager.expandWithTab(this,c);};}).call(q.prototype);});ace.define("ace/autocomplete/popup",["require","exports","module","ace/virtual_renderer","ace/editor","ace/range","ace/lib/event","ace/lib/lang","ace/lib/dom"],function(r,a,m){"use strict";var R=r("../virtual_renderer").VirtualRenderer;var E=r("../editor").Editor;var b=r("../range").Range;var c=r("../lib/event");var l=r("../lib/lang");var d=r("../lib/dom");var $=function(e){var f=new R(e);f.$maxLines=4;var g=new E(f);g.setHighlightActiveLine(false);g.setShowPrintMargin(false);g.renderer.setShowGutter(false);g.renderer.setHighlightGutterLine(false);g.$mouseHandler.$focusTimeout=0;g.$highlightTagPending=true;return g;};var A=function(p){var f=d.createElement("div");var g=new $(f);if(p)p.appendChild(f);f.style.display="none";g.renderer.content.style.cursor="default";g.renderer.setStyle("ace_autocomplete");g.setOption("displayIndentGuides",false);g.setOption("dragDelay",150);var n=function(){};g.focus=n;g.$isFocused=true;g.renderer.$cursorLayer.restartTimer=n;g.renderer.$cursorLayer.element.style.opacity=0;g.renderer.$maxLines=8;g.renderer.$keepTextAreaAtCursor=false;g.setHighlightActiveLine(false);g.session.highlight("");g.session.$searchHighlight.clazz="ace_highlight-marker";g.on("mousedown",function(e){var i=e.getDocumentPosition();g.selection.moveToPosition(i);s.start.row=s.end.row=i.row;e.stop();});var h;var j=new b(-1,0,-1,Infinity);var s=new b(-1,0,-1,Infinity);s.id=g.session.addMarker(s,"ace_active-line","fullLine");g.setSelectOnHover=function(v){if(!v){j.id=g.session.addMarker(j,"ace_line-hover","fullLine");}else if(j.id){g.session.removeMarker(j.id);j.id=null;}};g.setSelectOnHover(false);g.on("mousemove",function(e){if(!h){h=e;return;}if(h.x==e.x&&h.y==e.y){return;}h=e;h.scrollTop=g.renderer.scrollTop;var i=h.getDocumentPosition().row;if(j.start.row!=i){if(!j.id)g.setRow(i);o(i);}});g.renderer.on("beforeRender",function(){if(h&&j.start.row!=-1){h.$pos=null;var e=h.getDocumentPosition().row;if(!j.id)g.setRow(e);o(e,true);}});g.renderer.on("afterRender",function(){var e=g.getRow();var t=g.renderer.$textLayer;var i=t.element.childNodes[e-t.config.firstRow];if(i==t.selectedNode)return;if(t.selectedNode)d.removeCssClass(t.selectedNode,"ace_selected");t.selectedNode=i;if(i)d.addCssClass(i,"ace_selected");});var k=function(){o(-1);};var o=function(e,i){if(e!==j.start.row){j.start.row=j.end.row=e;if(!i)g.session._emit("changeBackMarker");g._emit("changeHoverMarker");}};g.getHoveredRow=function(){return j.start.row;};c.addListener(g.container,"mouseout",k);g.on("hide",k);g.on("changeSelection",k);g.session.doc.getLength=function(){return g.data.length;};g.session.doc.getLine=function(i){var e=g.data[i];if(typeof e=="string")return e;return(e&&e.value)||"";};var q=g.session.bgTokenizer;q.$tokenizeRow=function(e){var t=g.data[e];var u=[];if(!t)return u;if(typeof t=="string")t={value:t};var v=t.caption||t.value||t.name;function w(F,G){F&&u.push({type:(t.className||"")+(G||""),value:F});}var x=v.toLowerCase();var y=(g.filterText||"").toLowerCase();var z=0;var B=0;for(var i=0;i<=y.length;i++){if(i!=B&&(t.matchMask&(1<<i)||i==y.length)){var C=y.slice(B,i);B=i;var D=x.indexOf(C);if(D==-1)continue;w(v.slice(z,D),"");z=D+C.length;w(v.slice(D,z),"completion-highlight");}}w(v.slice(z,v.length),"");if(t.meta)u.push({type:"completion-meta",value:t.meta});return u;};q.$updateOnChange=n;q.start=n;g.session.$computeWidth=function(){return this.screenWidth=0;};g.isOpen=false;g.isTopdown=false;g.autoSelect=true;g.filterText="";g.data=[];g.setData=function(e,i){g.filterText=i||"";g.setValue(l.stringRepeat("\n",e.length),-1);g.data=e||[];g.setRow(0);};g.getData=function(e){return g.data[e];};g.getRow=function(){return s.start.row;};g.setRow=function(e){e=Math.max(this.autoSelect?0:-1,Math.min(this.data.length,e));if(s.start.row!=e){g.selection.clearSelection();s.start.row=s.end.row=e||0;g.session._emit("changeBackMarker");g.moveCursorTo(e||0,0);if(g.isOpen)g._signal("select");}};g.on("changeSelection",function(){if(g.isOpen)g.setRow(g.selection.lead.row);g.renderer.scrollCursorIntoView();});g.hide=function(){this.container.style.display="none";this._signal("hide");g.isOpen=false;};g.show=function(e,i,t){var f=this.container;var u=window.innerHeight;var v=window.innerWidth;var w=this.renderer;var x=w.$maxLines*i*1.4;var y=e.top+this.$borderSize;var z=y>u/2&&!t;if(z&&y+i+x>u){w.$maxPixelHeight=y-2*this.$borderSize;f.style.top="";f.style.bottom=u-y+"px";g.isTopdown=false;}else{y+=i;w.$maxPixelHeight=u-y-0.2*i;f.style.top=y+"px";f.style.bottom="";g.isTopdown=true;}f.style.display="";this.renderer.$textLayer.checkForSizeChanges();var B=e.left;if(B+f.offsetWidth>v)B=v-f.offsetWidth;f.style.left=B+"px";this._signal("show");h=null;g.isOpen=true;};g.getTextLeftOffset=function(){return this.$borderSize+this.renderer.$padding+this.$imageSize;};g.$imageSize=0;g.$borderSize=1;return g;};d.importCssString(".ace_editor.ace_autocomplete .ace_marker-layer .ace_active-line {    background-color: #CAD6FA;    z-index: 1;}.ace_dark.ace_editor.ace_autocomplete .ace_marker-layer .ace_active-line {    background-color: #3a674e;}.ace_editor.ace_autocomplete .ace_line-hover {    border: 1px solid #abbffe;    margin-top: -1px;    background: rgba(233,233,253,0.4);    position: absolute;    z-index: 2;}.ace_dark.ace_editor.ace_autocomplete .ace_line-hover {    border: 1px solid rgba(109, 150, 13, 0.8);    background: rgba(58, 103, 78, 0.62);}.ace_completion-meta {    opacity: 0.5;    margin: 0.9em;}.ace_editor.ace_autocomplete .ace_completion-highlight{    color: #2d69c7;}.ace_dark.ace_editor.ace_autocomplete .ace_completion-highlight{    color: #93ca12;}.ace_editor.ace_autocomplete {    width: 300px;    z-index: 200000;    border: 1px lightgray solid;    position: fixed;    box-shadow: 2px 3px 5px rgba(0,0,0,.2);    line-height: 1.4;    background: #fefefe;    color: #111;}.ace_dark.ace_editor.ace_autocomplete {    border: 1px #484747 solid;    box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.51);    line-height: 1.4;    background: #25282c;    color: #c1c1c1;}","autocompletion.css");a.AcePopup=A;});ace.define("ace/autocomplete/util",["require","exports","module"],function(r,e,m){"use strict";e.parForEach=function(a,f,c){var b=0;var d=a.length;if(d===0)c();for(var i=0;i<d;i++){f(a[i],function(g,h){b++;if(b===d)c(g,h);});}};var I=/[a-zA-Z_0-9\$\-\u00A2-\uFFFF]/;e.retrievePrecedingIdentifier=function(t,p,a){a=a||I;var b=[];for(var i=p-1;i>=0;i--){if(a.test(t[i]))b.push(t[i]);else break;}return b.reverse().join("");};e.retrieveFollowingIdentifier=function(t,p,a){a=a||I;var b=[];for(var i=p;i<t.length;i++){if(a.test(t[i]))b.push(t[i]);else break;}return b;};e.getCompletionPrefix=function(a){var p=a.getCursorPosition();var l=a.session.getLine(p.row);var b;a.completers.forEach(function(c){if(c.identifierRegexps){c.identifierRegexps.forEach(function(i){if(!b&&i)b=this.retrievePrecedingIdentifier(l,p.column,i);}.bind(this));}}.bind(this));return b||this.retrievePrecedingIdentifier(l,p.column);};});ace.define("ace/autocomplete",["require","exports","module","ace/keyboard/hash_handler","ace/autocomplete/popup","ace/autocomplete/util","ace/lib/event","ace/lib/lang","ace/lib/dom","ace/snippets"],function(r,c,m){"use strict";var H=r("./keyboard/hash_handler").HashHandler;var A=r("./autocomplete/popup").AcePopup;var u=r("./autocomplete/util");var d=r("./lib/event");var l=r("./lib/lang");var f=r("./lib/dom");var s=r("./snippets").snippetManager;var g=function(){this.autoInsert=false;this.autoSelect=true;this.exactMatch=false;this.gatherCompletionsId=0;this.keyboardHandler=new H();this.keyboardHandler.bindKeys(this.commands);this.blurListener=this.blurListener.bind(this);this.changeListener=this.changeListener.bind(this);this.mousedownListener=this.mousedownListener.bind(this);this.mousewheelListener=this.mousewheelListener.bind(this);this.changeTimer=l.delayedCall(function(){this.updateCompletions(true);}.bind(this));this.tooltipTimer=l.delayedCall(this.updateDocTooltip.bind(this),50);};(function(){this.$init=function(){this.popup=new A(document.body||document.documentElement);this.popup.on("click",function(e){this.insertMatch();e.stop();}.bind(this));this.popup.focus=this.editor.focus.bind(this.editor);this.popup.on("show",this.tooltipTimer.bind(null,null));this.popup.on("select",this.tooltipTimer.bind(null,null));this.popup.on("changeHoverMarker",this.tooltipTimer.bind(null,null));return this.popup;};this.getPopup=function(){return this.popup||this.$init();};this.openPopup=function(e,p,k){if(!this.popup)this.$init();this.popup.autoSelect=this.autoSelect;this.popup.setData(this.completions.filtered,this.completions.filterText);e.keyBinding.addKeyboardHandler(this.keyboardHandler);var a=e.renderer;this.popup.setRow(this.autoSelect?0:-1);if(!k){this.popup.setTheme(e.getTheme());this.popup.setFontSize(e.getFontSize());var b=a.layerConfig.lineHeight;var h=a.$cursorLayer.getPixelPosition(this.base,true);h.left-=this.popup.getTextLeftOffset();var i=e.container.getBoundingClientRect();h.top+=i.top-a.layerConfig.offset;h.left+=i.left-e.renderer.scrollLeft;h.left+=a.gutterWidth;this.popup.show(h,b);}else if(k&&!p){this.detach();}};this.detach=function(){this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler);this.editor.off("changeSelection",this.changeListener);this.editor.off("blur",this.blurListener);this.editor.off("mousedown",this.mousedownListener);this.editor.off("mousewheel",this.mousewheelListener);this.changeTimer.cancel();this.hideDocTooltip();this.gatherCompletionsId+=1;if(this.popup&&this.popup.isOpen)this.popup.hide();if(this.base)this.base.detach();this.activated=false;this.completions=this.base=null;};this.changeListener=function(e){var a=this.editor.selection.lead;if(a.row!=this.base.row||a.column<this.base.column){this.detach();}if(this.activated)this.changeTimer.schedule();else this.detach();};this.blurListener=function(e){var a=document.activeElement;var t=this.editor.textInput.getElement();var b=e.relatedTarget&&this.tooltipNode&&this.tooltipNode.contains(e.relatedTarget);var h=this.popup&&this.popup.container;if(a!=t&&a.parentNode!=h&&!b&&a!=this.tooltipNode&&e.relatedTarget!=t){this.detach();}};this.mousedownListener=function(e){this.detach();};this.mousewheelListener=function(e){this.detach();};this.goTo=function(w){var a=this.popup.getRow();var b=this.popup.session.getLength()-1;switch(w){case"up":a=a<=0?b:a-1;break;case"down":a=a>=b?-1:a+1;break;case"start":a=0;break;case"end":a=b;break;}this.popup.setRow(a);};this.insertMatch=function(a,o){if(!a)a=this.popup.getData(this.popup.getRow());if(!a)return false;if(a.completer&&a.completer.insertMatch){a.completer.insertMatch(this.editor,a);}else{if(this.completions.filterText){var b=this.editor.selection.getAllRanges();for(var i=0,e;e=b[i];i++){e.start.column-=this.completions.filterText.length;this.editor.session.remove(e);}}if(a.snippet)s.insertSnippet(this.editor,a.snippet);else this.editor.execCommand("insertstring",a.value||a);}this.detach();};this.commands={"Up":function(e){e.completer.goTo("up");},"Down":function(e){e.completer.goTo("down");},"Ctrl-Up|Ctrl-Home":function(e){e.completer.goTo("start");},"Ctrl-Down|Ctrl-End":function(e){e.completer.goTo("end");},"Esc":function(e){e.completer.detach();},"Return":function(e){return e.completer.insertMatch();},"Shift-Return":function(e){e.completer.insertMatch(null,{deleteSuffix:true});},"Tab":function(e){var a=e.completer.insertMatch();if(!a&&!e.tabstopManager)e.completer.goTo("down");else return a;},"PageUp":function(e){e.completer.popup.gotoPageUp();},"PageDown":function(e){e.completer.popup.gotoPageDown();}};this.gatherCompletions=function(e,a){var b=e.getSession();var p=e.getCursorPosition();var h=u.getCompletionPrefix(e);this.base=b.doc.createAnchor(p.row,p.column-h.length);this.base.$insertRight=true;var j=[];var t=e.completers.length;e.completers.forEach(function(k,i){k.getCompletions(e,b,p,h,function(n,o){if(!n&&o)j=j.concat(o);a(null,{prefix:u.getCompletionPrefix(e),matches:j,finished:(--t===0)});});});return true;};this.showPopup=function(e){if(this.editor)this.detach();this.activated=true;this.editor=e;if(e.completer!=this){if(e.completer)e.completer.detach();e.completer=this;}e.on("changeSelection",this.changeListener);e.on("blur",this.blurListener);e.on("mousedown",this.mousedownListener);e.on("mousewheel",this.mousewheelListener);this.updateCompletions();};this.updateCompletions=function(k){if(k&&this.base&&this.completions){var p=this.editor.getCursorPosition();var a=this.editor.session.getTextRange({start:this.base,end:p});if(a==this.completions.filterText)return;this.completions.setFilter(a);if(!this.completions.filtered.length)return this.detach();if(this.completions.filtered.length==1&&this.completions.filtered[0].value==a&&!this.completions.filtered[0].snippet)return this.detach();this.openPopup(this.editor,a,k);return;}var _=this.gatherCompletionsId;this.gatherCompletions(this.editor,function(e,b){var h=function(){if(!b.finished)return;return this.detach();}.bind(this);var a=b.prefix;var i=b&&b.matches;if(!i||!i.length)return h();if(a.indexOf(b.prefix)!==0||_!=this.gatherCompletionsId)return;this.completions=new F(i);if(this.exactMatch)this.completions.exactMatch=true;this.completions.setFilter(a);var j=this.completions.filtered;if(!j.length)return h();if(j.length==1&&j[0].value==a&&!j[0].snippet)return h();if(this.autoInsert&&j.length==1&&b.finished)return this.insertMatch(j[0]);this.openPopup(this.editor,a,k);}.bind(this));};this.cancelContextMenu=function(){this.editor.$mouseHandler.cancelContextMenu();};this.updateDocTooltip=function(){var p=this.popup;var a=p.data;var b=a&&(a[p.getHoveredRow()]||a[p.getRow()]);var e=null;if(!b||!this.editor||!this.popup.isOpen)return this.hideDocTooltip();this.editor.completers.some(function(h){if(h.getDocTooltip)e=h.getDocTooltip(b);return e;});if(!e)e=b;if(typeof e=="string")e={docText:e};if(!e||!(e.docHTML||e.docText))return this.hideDocTooltip();this.showDocTooltip(e);};this.showDocTooltip=function(i){if(!this.tooltipNode){this.tooltipNode=f.createElement("div");this.tooltipNode.className="ace_tooltip ace_doc-tooltip";this.tooltipNode.style.margin=0;this.tooltipNode.style.pointerEvents="auto";this.tooltipNode.tabIndex=-1;this.tooltipNode.onblur=this.blurListener.bind(this);this.tooltipNode.onclick=this.onTooltipClick.bind(this);}var t=this.tooltipNode;if(i.docHTML){t.innerHTML=i.docHTML;}else if(i.docText){t.textContent=i.docText;}if(!t.parentNode)document.body.appendChild(t);var p=this.popup;var a=p.container.getBoundingClientRect();t.style.top=p.container.style.top;t.style.bottom=p.container.style.bottom;t.style.display="block";if(window.innerWidth-a.right<320){if(a.left<320){if(p.isTopdown){t.style.top=a.bottom+"px";t.style.left=a.left+"px";t.style.right="";t.style.bottom="";}else{t.style.top=p.container.offsetTop-t.offsetHeight+"px";t.style.left=a.left+"px";t.style.right="";t.style.bottom="";}}else{t.style.right=window.innerWidth-a.left+"px";t.style.left="";}}else{t.style.left=(a.right+1)+"px";t.style.right="";}};this.hideDocTooltip=function(){this.tooltipTimer.cancel();if(!this.tooltipNode)return;var e=this.tooltipNode;if(!this.editor.isFocused()&&document.activeElement==e)this.editor.focus();this.tooltipNode=null;if(e.parentNode)e.parentNode.removeChild(e);};this.onTooltipClick=function(e){var a=e.target;while(a&&a!=this.tooltipNode){if(a.nodeName=="A"&&a.href){a.rel="noreferrer";a.target="_blank";break;}a=a.parentNode;}};}).call(g.prototype);g.startCommand={name:"startAutocomplete",exec:function(e){if(!e.completer)e.completer=new g();e.completer.autoInsert=false;e.completer.autoSelect=true;e.completer.showPopup(e);e.completer.cancelContextMenu();},bindKey:"Ctrl-Space|Ctrl-Shift-Space|Alt-Space"};var F=function(a,b){this.all=a;this.filtered=a;this.filterText=b||"";this.exactMatch=false;};(function(){this.setFilter=function(e){if(e.length>this.filterText&&e.lastIndexOf(this.filterText,0)===0)var h=this.filtered;else var h=this.all;this.filterText=e;h=this.filterCompletions(h,this.filterText);h=h.sort(function(a,b){return b.exactMatch-a.exactMatch||b.$score-a.$score||(a.caption||a.value)<(b.caption||b.value);});var p=null;h=h.filter(function(i){var a=i.snippet||i.caption||i.value;if(a===p)return false;p=a;return true;});this.filtered=h;};this.filterCompletions=function(a,n){var b=[];var e=n.toUpperCase();var h=n.toLowerCase();loop:for(var i=0,k;k=a[i];i++){var o=k.caption||k.value||k.snippet;if(!o)continue;var p=-1;var q=0;var t=0;var v,w;if(this.exactMatch){if(n!==o.substr(0,n.length))continue loop;}else{var x=o.toLowerCase().indexOf(h);if(x>-1){t=x;}else{for(var j=0;j<n.length;j++){var y=o.indexOf(h[j],p+1);var z=o.indexOf(e[j],p+1);v=(y>=0)?((z<0||y<z)?y:z):z;if(v<0)continue loop;w=v-p-1;if(w>0){if(p===-1)t+=10;t+=w;q=q|(1<<j);}p=v;}}}k.matchMask=q;k.exactMatch=t?0:1;k.$score=(k.score||0)-t;b.push(k);}return b;};}).call(F.prototype);c.Autocomplete=g;c.FilteredList=F;});ace.define("ace/autocomplete/text_completer",["require","exports","module","ace/range"],function(r,e,m){var R=r("../range").Range;var s=/[^a-zA-Z_0-9\$\-\u00C0-\u1FFF\u2C00-\uD7FF\w]+/;function g(d,p){var t=d.getTextRange(R.fromPoints({row:0,column:0},p));return t.split(s).length-1;}function w(d,p){var a=g(d,p);var b=d.getValue().split(s);var c=Object.create(null);var f=b[a];b.forEach(function(h,i){if(!h||h===f)return;var j=Math.abs(a-i);var k=b.length-j;if(c[h]){c[h]=Math.max(k,c[h]);}else{c[h]=k;}});return c;}e.getCompletions=function(a,b,p,c,d){var f=w(b,p);var h=Object.keys(f);d(null,h.map(function(i){return{caption:i,value:i,score:f[i],meta:"local"};}));};});ace.define("ace/ext/language_tools",["require","exports","module","ace/snippets","ace/autocomplete","ace/config","ace/lib/lang","ace/autocomplete/util","ace/autocomplete/text_completer","ace/editor","ace/config"],function(r,a,b){"use strict";var c=r("../snippets").snippetManager;var A=r("../autocomplete").Autocomplete;var d=r("../config");var l=r("../lib/lang");var u=r("../autocomplete/util");var t=r("../autocomplete/text_completer");var k={getCompletions:function(e,s,i,m,q){if(s.$mode.completer){return s.$mode.completer.getCompletions(e,s,i,m,q);}var v=e.session.getState(i.row);var w=s.$mode.getCompletions(v,s,i,m);q(null,w);}};var f={getCompletions:function(e,m,q,v,w){var x=[];var y=m.getTokenAt(q.row,q.column);if(y&&y.type.match(/(tag-name|tag-open|tag-whitespace|attribute-name|attribute-value)\.xml$/))x.push('html-tag');else x=c.getActiveScopes(e);var z=c.snippetMap;var B=[];x.forEach(function(C){var D=z[C]||[];for(var i=D.length;i--;){var s=D[i];var F=s.name||s.tabTrigger;if(!F)continue;B.push({caption:F,snippet:s.content,meta:s.tabTrigger&&!s.name?s.tabTrigger+"\u21E5 ":"snippet",type:"snippet"});}},this);w(null,B);},getDocTooltip:function(i){if(i.type=="snippet"&&!i.docHTML){i.docHTML=["<b>",l.escapeHTML(i.caption),"</b>","<hr></hr>",l.escapeHTML(i.snippet)].join("");}}};var g=[f,t,k];a.setCompleters=function(v){g.length=0;if(v)g.push.apply(g,v);};a.addCompleter=function(e){g.push(e);};a.textCompleter=t;a.keyWordCompleter=k;a.snippetCompleter=f;var h={name:"expandSnippet",exec:function(e){return c.expandWithTab(e);},bindKey:"Tab"};var o=function(e,i){j(i.session.$mode);};var j=function(m){var i=m.$id;if(!c.files)c.files={};n(i);if(m.modes)m.modes.forEach(j);};var n=function(i){if(!i||c.files[i])return;var s=i.replace("mode","snippets");c.files[i]={};d.loadModule(s,function(m){if(m){c.files[i]=m;if(!m.snippets&&m.snippetText)m.snippets=c.parseSnippetFile(m.snippetText);c.register(m.snippets||[],m.scope);if(m.includeScopes){c.snippetMap[m.scope].includeScopes=m.includeScopes;m.includeScopes.forEach(function(x){n("ace/mode/"+x);});}}});};var p=function(e){var i=e.editor;var m=i.completer&&i.completer.activated;if(e.command.name==="backspace"){if(m&&!u.getCompletionPrefix(i))i.completer.detach();}else if(e.command.name==="insertstring"){var q=u.getCompletionPrefix(i);if(q&&!m){if(!i.completer){i.completer=new A();}i.completer.autoInsert=false;i.completer.showPopup(i);}}};var E=r("../editor").Editor;r("../config").defineOptions(E.prototype,"editor",{enableBasicAutocompletion:{set:function(v){if(v){if(!this.completers)this.completers=Array.isArray(v)?v:g;this.commands.addCommand(A.startCommand);}else{this.commands.removeCommand(A.startCommand);}},value:false},enableLiveAutocompletion:{set:function(v){if(v){if(!this.completers)this.completers=Array.isArray(v)?v:g;this.commands.on('afterExec',p);}else{this.commands.removeListener('afterExec',p);}},value:false},enableSnippets:{set:function(v){if(v){this.commands.addCommand(h);this.on("changeMode",o);o(null,this);}else{this.commands.removeCommand(h);this.off("changeMode",o);}},value:false}});});(function(){ace.require(["ace/ext/language_tools"],function(m){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=m;}});})();
