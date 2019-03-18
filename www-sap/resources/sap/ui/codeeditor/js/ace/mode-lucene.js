ace.define("ace/mode/lucene_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules"],function(r,e,m){"use strict";var o=r("../lib/oop");var l=r("../lib/lang");var T=r("./text_highlight_rules").TextHighlightRules;var L=function(){this.$rules={"start":[{token:"constant.language.escape",regex:/\\[\+\-&\|!\(\)\{\}\[\]^"~\*\?:\\]/},{token:"constant.character.negation",regex:"\\-"},{token:"constant.character.interro",regex:"\\?"},{token:"constant.character.required",regex:"\\+"},{token:"constant.character.asterisk",regex:"\\*"},{token:'constant.character.proximity',regex:'~(?:0\\.[0-9]+|[0-9]+)?'},{token:'keyword.operator',regex:'(AND|OR|NOT|TO)\\b'},{token:"paren.lparen",regex:"[\\(\\{\\[]"},{token:"paren.rparen",regex:"[\\)\\}\\]]"},{token:"keyword",regex:"(?:[^\\s:]+|\\\\ )*[^\\\\]:"},{token:"string",regex:'"(?:\\\\"|[^"])*"'},{token:"term",regex:"\\w+"},{token:"text",regex:"\\s+"}]};};o.inherits(L,T);e.LuceneHighlightRules=L;});ace.define("ace/mode/lucene",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/lucene_highlight_rules"],function(r,e,m){'use strict';var o=r("../lib/oop");var T=r("./text").Mode;var L=r("./lucene_highlight_rules").LuceneHighlightRules;var M=function(){this.HighlightRules=L;this.$behaviour=this.$defaultBehaviour;};o.inherits(M,T);(function(){this.$id="ace/mode/lucene";}).call(M.prototype);e.Mode=M;});(function(){ace.require(["ace/mode/lucene"],function(m){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=m;}});})();
