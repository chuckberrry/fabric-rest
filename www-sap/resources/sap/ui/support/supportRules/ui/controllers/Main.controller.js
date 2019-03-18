/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/support/supportRules/ui/controllers/BaseController","sap/ui/model/json/JSONModel","sap/ui/support/supportRules/WindowCommunicationBus","sap/ui/support/supportRules/ui/models/SharedModel","sap/ui/support/supportRules/WCBChannels","sap/ui/support/supportRules/Constants","sap/ui/support/supportRules/Storage","sap/ui/thirdparty/URI","sap/ui/support/supportRules/ui/models/Documentation"],function(B,J,C,S,c,a,s,U,D){"use strict";return B.extend("sap.ui.support.supportRules.ui.controllers.Main",{onInit:function(){this.model=S;this.getView().setModel(this.model);this.resizeDown();this.setCommunicationSubscriptions();this.initSettingsPopoverModel();this.hidden=false;this.model.setProperty("/hasNoOpener",window.opener?false:true);this.model.setProperty("/constants",a);this.updateShowButton();this._setContextSettings();this._zoomUI();this.bAdditionalViewLoaded=false;C.subscribe(c.UPDATE_SUPPORT_RULES,function(){if(!this.bAdditionalViewLoaded){this.bAdditionalViewLoaded=true;this.loadAdditionalUI();}},this);},_zoomUI:function(){try{var z=window.localStorage.getItem("support-assistant-zoom-ui");var f="100%";switch(z){case"S":f="90%";break;default:}document.querySelector("html").style.fontSize=f;}catch(e){}},loadAdditionalUI:function(){this._issuesPage=sap.ui.xmlview(this.getView().getId()+"--issues","sap.ui.support.supportRules.ui.views.Issues");this.byId("navCon").insertPage(this._issuesPage);},onAfterRendering:function(){C.publish(c.POST_UI_INFORMATION,{version:sap.ui.getVersionInfo(),location:new U(jQuery.sap.getModulePath("sap.ui.support"),window.location.origin+window.location.pathname).toString()});},initSettingsPopoverModel:function(){var b=new U(sap.ui.resource('sap.ui.support',''),window.location.origin+window.location.pathname)._string,d=sap.ui.version;this.model.setProperty("/supportAssistantOrigin",b);this.model.setProperty("/supportAssistantVersion",d);},copySupportAssistantOriginToClipboard:function(e){var b=this.model.getProperty("/supportAssistantOrigin"),d=function(e){if(e.clipboardData){e.clipboardData.setData('text/plain',b);}else{e.originalEvent.clipboardData.setData('text/plain',b);}e.preventDefault();};if(window.clipboardData){window.clipboardData.setData("text",b);}else{document.addEventListener('copy',d);document.execCommand('copy');document.removeEventListener('copy',d);}},setCommunicationSubscriptions:function(){var p;C.subscribe(c.CURRENT_LOADING_PROGRESS,function(d){var i=d.value,P=this.byId("progressIndicator");if(d.value<100){this.model.setProperty("/showProgressIndicator",true);clearTimeout(p);p=setTimeout(function(){this.model.setProperty("/showProgressIndicator",false);}.bind(this),2500);}else{setTimeout(function(){this.model.setProperty("/showProgressIndicator",false);}.bind(this),2000);}P.setDisplayValue(a.RULESET_LOADING+" "+i+"%");this.model.setProperty("/progress",i);},this);C.subscribe(c.ON_ANALYZE_FINISH,function(d){this._clearProcessIndicator();this.ensureOpened();this.model.setProperty("/showProgressIndicator",false);this.model.setProperty("/coreStateChanged",false);this.model.setProperty("/lastAnalysisElapsedTime",d.elapsedTime);this.goToIssues();this.model.setProperty("/analyzedFinish",true);},this);C.subscribe(c.ON_PROGRESS_UPDATE,function(d){var b=d.currentProgress,e=this.byId("progressIndicator");e.setDisplayValue(b+"/"+100);this.model.setProperty("/progress",b);},this);C.subscribe(c.ON_CORE_STATE_CHANGE,function(){this.model.setProperty("/coreStateChanged",true);},this);},resizeUp:function(){C.publish(c.RESIZE_FRAME,{bigger:true});},ensureOpened:function(){C.publish(c.ENSURE_FRAME_OPENED);},resizeDown:function(){C.publish(c.RESIZE_FRAME,{bigger:false});},onSettings:function(e){C.publish(c.ENSURE_FRAME_OPENED);if(!this._settingsPopover){this._settingsPopover=sap.ui.xmlfragment("sap.ui.support.supportRules.ui.views.StorageSettings",this);this.getView().addDependent(this._settingsPopover);}var t=this,o=e.getSource();setTimeout(function(){t._settingsPopover.openBy(o);});},goToAnalysis:function(e){this._setActiveView("analysis");},goToIssues:function(e){this._setActiveView("issues");},goToWiki:function(){D.openTopic("57ccd7d7103640e3a187ed55e1d2c163");},setRulesLabel:function(l){var b=0;if(l===null){return"Rules ("+b+")";}else{l.forEach(function(d,e){b+=d.rules.length;});return"Rules ("+b+")";}},updateShowButton:function(){this.byId("sapSTShowButtonBar").setVisible(this.hidden);},toggleHide:function(){this.hidden=!this.hidden;this.updateShowButton();C.publish(c.TOGGLE_FRAME_HIDDEN,this.hidden);},_clearProcessIndicator:function(){var p=this.byId("progressIndicator");p.setDisplayValue("None");this.model.setProperty("/progress",0.1);},_setContextSettings:function(){var b=s.readPersistenceCookie(a.COOKIE_NAME);if(b){this.model.setProperty("/persistingSettings",true);var d=s.getSelectedContext();if(d){this.model.setProperty("/analyzeContext",d.analyzeContext);this.model.setProperty("/subtreeExecutionContextId",d.subtreeExecutionContextId);}else{this.model.setProperty("/analyzeContext",this.model.getProperty("/analyzeContext"));this.model.setProperty("/subtreeExecutionContextId","");}}},_setActiveView:function(i){this.byId("issuesBtn").setType(sap.m.ButtonType.Default);this.byId("analysisBtn").setType(sap.m.ButtonType.Default);this.byId(i+"Btn").setType(sap.m.ButtonType.Emphasized);this.byId("navCon").to(this.byId(i),"show");this.ensureOpened();}});});
