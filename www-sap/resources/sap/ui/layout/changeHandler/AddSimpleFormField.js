/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/Utils","sap/ui/fl/changeHandler/ChangeHandlerMediator","sap/ui/fl/changeHandler/Base"],function(U,C,B){"use strict";var A={};var t="sap.ui.core.Title";var T="sap.m.Toolbar";var s="sap.m.Label";var a="sap.ui.comp.smartfield.SmartLabel";A.applyChange=function(c,S,p){var o=c.getDefinition();var b=c.getDependentControl("targetContainerHeader",p);var m=C.getChangeHandlerSettings({"scenario":"addODataFieldWithLabel","oDataServiceVersion":o.content&&o.content.oDataServiceVersion});var f=m&&m.content&&m.content.createFunction;var d=function(o){var x=o.content;var y=false;if(x){y=o.content.newFieldSelector&&(o.content.newFieldIndex!==undefined)&&o.content.bindingPath&&o.content.oDataServiceVersion&&f;}return x&&y;};var M=p.modifier,e=p.appComponent;if(d(o)){var g=o.content;var F=g.newFieldSelector;var h=g.bindingPath;var k=g.newFieldIndex;var l=M.getAggregation(S,"content");var n=l.slice();var I=l.indexOf(b);var N=0;var q=0;var r;if(l.length===1||l.length===I+1){N=l.length;}else{var j=0;for(j=I+1;j<l.length;j++){var u=M.getControlType(l[j]);if(u===s||u===a){if(q==k){N=j;break;}q++;}if(u===t||u===T){N=j;break;}if(j===(l.length-1)){N=l.length;}}}var v={"appComponent":e,"view":p.view,"fieldSelector":F,"bindingPath":h};if(M.bySelector(F,e)){return B.markAsNotApplicable("Control to be created already exists:"+F);}r=f(M,v);var w={};if(r.label&&r.control){w.label=M.getSelector(r.label,e);}w.control=M.getSelector(r.control,e);c.setRevertData(w);n.splice(N,0,r.label,r.control);M.removeAllAggregation(S,"content");for(var i=0;i<n.length;++i){M.insertAggregation(S,"content",n[i],i,p.view);}return true;}else{U.log.error("Change does not contain sufficient information to be applied or ChangeHandlerMediator could not be retrieved: ["+o.layer+"]"+o.namespace+"/"+o.fileName+"."+o.fileType);}};A.completeChangeContent=function(c,S,p){var o=p.appComponent;var v=p.view;var b=c.getDefinition();if(!b.content){b.content={};}if(S.parentId){var f=p.modifier.bySelector(S.parentId,o,v);var d=f.getTitle()||f.getToolbar();if(d){c.addDependentControl(d.getId(),"targetContainerHeader",p);}}else{throw new Error("oSpecificChangeInfo.parentId attribute required");}if(S.bindingPath){b.content.bindingPath=S.bindingPath;}else{throw new Error("oSpecificChangeInfo.bindingPath attribute required");}if(S.newControlId){b.content.newFieldSelector=p.modifier.getSelector(S.newControlId,o);}else{throw new Error("oSpecificChangeInfo.newControlId attribute required");}if(S.index===undefined){throw new Error("oSpecificChangeInfo.targetIndex attribute required");}else{b.content.newFieldIndex=S.index;}if(S.oDataServiceVersion===undefined){throw new Error("oSpecificChangeInfo.oDataServiceVersion attribute required");}else{b.content.oDataServiceVersion=S.oDataServiceVersion;}};A.revertChange=function(c,S,p){var o=p.appComponent;var v=p.view;var m=p.modifier;var b=c.getRevertData();var f=m.bySelector(b.control,o,v);if(b.label){var l=m.bySelector(b.label,o,v);m.removeAggregation(S,"content",l);m.destroy(l);}m.removeAggregation(S,"content",f);m.destroy(f);c.resetRevertData();return true;};return A;},true);
