/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/test/_OpaLogger","sap/base/Log"],function(U,_,L){"use strict";var i={};var a=_.getLogger("sap.ui.test._LogCollector");var b=U.extend("sap.ui.test._LogCollector",{constructor:function(m){this._aLogs=[];if(m){this._oListener=g(m,this._aLogs);}else{this._oListener=c(this._aLogs);}},start:function(){L.addLogListener(this._oListener);},getAndClearLog:function(){var j=this._aLogs.join("\n");this._aLogs.length=0;return j;},stop:function(){L.removeLogListener(this._oListener);},destroy:function(){this._aLogs.length=0;this.stop();}});b.getInstance=function(m){var l=m||"noMessagePattern";i[l]=i[l]||new b(m);return i[l];};function g(m,l){return{onLogEntry:function(o){var r=new RegExp(m);if(e(o)&&r.test(o.component)){l.push(d(o));}}};}function c(l){return{onLogEntry:function(o){if(e(o)){l.push(d(o));if(l.length>500){l.length=0;a.error("Opa has received 500 logs without a consumer - "+"maybe you loaded Opa.js inside of an IFrame? "+"The logs are now cleared to prevent memory leaking");}}}};}function d(l){return l.message+" - "+l.details+" "+l.component;}function e(l){return l.component.startsWith("sap.ui.test");}return b;},true);
