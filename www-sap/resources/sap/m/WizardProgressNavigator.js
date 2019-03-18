/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/ResizeHandler","sap/ui/core/delegate/ItemNavigation","sap/ui/Device","sap/m/ActionSheet","./WizardProgressNavigatorRenderer","sap/ui/thirdparty/jquery"],function(l,C,R,I,D,A,W,q){"use strict";var a=C.extend("sap.m.WizardProgressNavigator",{metadata:{properties:{stepCount:{type:"int",group:"Data",defaultValue:3},stepTitles:{type:"string[]",group:"Appearance",defaultValue:[]},stepIcons:{type:"sap.ui.core.URI[]",group:"Appearance",defaultValue:[]},varyingStepCount:{type:"boolean",group:"Appearance",defaultValue:false}},events:{stepChanged:{parameters:{current:{type:"int"}}}}}});a.CONSTANTS={MINIMUM_STEPS:3,MAXIMUM_STEPS:8,MIN_STEP_WIDTH_NO_TITLE:64,MIN_STEP_WIDTH_WITH_TITLE:200};a.TEXT={SELECTED:"WIZARD_PROG_NAV_SELECTED",PROCESSED:"WIZARD_PROG_NAV_PROCESSED",STEP:"WIZARD_PROG_NAV_STEP_TITLE",OPTIONAL_STEP:"WIZARD_STEP_OPTIONAL_STEP_TEXT"};a.prototype.init=function(){this._currentStep=1;this._activeStep=1;this._cachedSteps=[];this._stepOptionalIndication=[];this._resourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._actionSheet=new A();this._createAnchorNavigation();};a.prototype.onBeforeRendering=function(){if(this.getStepCount()!==this.getStepIcons().filter(String).length){this.setStepIcons([]);}if(this.getStepCount()!==this.getStepTitles().filter(String).length){this.setStepTitles([]);}};a.prototype.onAfterRendering=function(){var p,z=this._activeStep-1,b=this._currentStep-1;this._cacheDOMElements();this._updateStepZIndex();this._updateAnchorNavigation(z);this._updateStepActiveAttribute(z);this._removeAnchorAriaDisabledAttribute(z);this._updateStepCurrentAttribute(b);this._updateAnchorAriaLabelAttribute(b);this._updateOpenSteps();R.register(this.getDomRef(),this._updateOpenSteps.bind(this));if(D.os.name===D.os.OS.IOS){p=this.$().find(".sapMWizardProgressNavStep").css("display","block");setTimeout(p["css"].bind(p,"display",""),0);}};a.prototype.ontap=function(e){if(this._isGroupAtStart(e.target)){return this._showActionSheet(e.target,true);}if(this._isGroupAtEnd(e.target)){return this._showActionSheet(e.target,false);}if(!this._isAnchor(e.target)||!this._isOpenStep(e.target)||!this._isActiveStep(this._getStepNumber(e.target))){return;}this._updateCurrentStep(this._getStepNumber(e.target));this.fireStepChanged({current:this._getStepNumber(e.target)});};a.prototype.onsapspace=function(e){if(this._onEnter){this._onEnter(e,this._anchorNavigation.getFocusedIndex());}this.ontap(e);};a.prototype.onsapenter=a.prototype.onsapspace;a.prototype.exit=function(){R.deregisterAllForControl(this.getId());this.removeDelegate(this._anchorNavigation);this._anchorNavigation.destroy();this._anchorNavigation=null;this._actionSheet.destroy();this._actionSheet=null;this._currentStep=null;this._activeStep=null;this._cachedSteps=null;this._stepOptionalIndication=null;};a.prototype.getCurrentStep=function(){return this._currentStep;};a.prototype.getProgress=function(){return this._activeStep;};a.prototype.previousStep=function(){var c=this.getCurrentStep();if(c<2){return this;}return this._moveToStep(c-1);};a.prototype.nextStep=function(){return this._moveToStep(this.getCurrentStep()+1);};a.prototype.incrementProgress=function(){return this._moveToStep(this.getProgress()+1);};a.prototype.discardProgress=function(i){if(i<=0||i>this._activeStep){return this;}this._updateCurrentStep(i,this._currentStep);this._updateStepActiveAttribute(i-1,this._activeStep-1);this._addAnchorAriaDisabledAttribute(i-1);this._updateAnchorNavigation(i-1);this._currentStep=i;this._activeStep=i;};a.prototype._setOnEnter=function(c){this._onEnter=c;};a.prototype._createAnchorNavigation=function(){var t=this;this._anchorNavigation=new I();this._anchorNavigation.setCycling(false);this._anchorNavigation.setDisabledModifiers({sapnext:["alt"],sapprevious:["alt"]});this._anchorNavigation.attachEvent("AfterFocus",function(p){var e=p.mParameters.event;if(!e||!e.relatedTarget||q(e.relatedTarget).hasClass(W.CLASSES.ANCHOR)){return;}t._anchorNavigation.focusItem(t._currentStep-1);});this.addDelegate(this._anchorNavigation);};a.prototype._cacheDOMElements=function(){var d=this.getDomRef();this._cachedSteps=d.querySelectorAll("."+W.CLASSES.STEP);};a.prototype._updateStepZIndex=function(){var z=this._currentStep-1,s=this._cachedSteps.length,b=a.CONSTANTS.MAXIMUM_STEPS;for(var i=0;i<s;i++){if(i<=z){this._cachedSteps[i].style.zIndex=0;}else{this._cachedSteps[i].style.zIndex=b;b-=1;}}};a.prototype._updateAnchorNavigation=function(b){var n=this.getDomRef(),f=[];for(var i=0;i<=b;i++){if(this._cachedSteps[i]){f.push(this._cachedSteps[i].children[0]);}}this._anchorNavigation.setRootDomRef(n);this._anchorNavigation.setItemDomRefs(f);this._anchorNavigation.setPageSize(b);this._anchorNavigation.setFocusedIndex(b);};a.prototype._updateStepActiveAttribute=function(n,o){if(o!==undefined&&this._cachedSteps[o]){this._cachedSteps[o].removeAttribute(W.ATTRIBUTES.ACTIVE_STEP);}if(this._cachedSteps[n]){this._cachedSteps[n].setAttribute(W.ATTRIBUTES.ACTIVE_STEP,true);}};a.prototype._updateStepCurrentAttribute=function(n,o){if(o!==undefined&&this._cachedSteps[o]){this._cachedSteps[o].removeAttribute(W.ATTRIBUTES.CURRENT_STEP);}if(this._cachedSteps[n]){this._cachedSteps[n].setAttribute(W.ATTRIBUTES.CURRENT_STEP,true);}};a.prototype._addAnchorAriaDisabledAttribute=function(b){var s=this._cachedSteps.length,c;for(var i=b+1;i<s;i++){c=this._cachedSteps[i].children[0];c.setAttribute(W.ATTRIBUTES.ARIA_DISABLED,true);c.removeAttribute(W.ATTRIBUTES.ARIA_LABEL);}};a.prototype._removeAnchorAriaDisabledAttribute=function(i){if(this._cachedSteps[i]){this._cachedSteps[i].children[0].removeAttribute(W.ATTRIBUTES.ARIA_DISABLED);}};a.prototype._updateAnchorAriaLabelAttribute=function(n,o){if(o!==undefined&&this._cachedSteps[o]){this._cachedSteps[o].children[0].setAttribute(W.ATTRIBUTES.ARIA_LABEL,this._resourceBundle.getText(a.TEXT.PROCESSED));}if(this._cachedSteps[n]){this._cachedSteps[n].children[0].setAttribute(W.ATTRIBUTES.ARIA_LABEL,this._resourceBundle.getText(a.TEXT.SELECTED));}};a.prototype._moveToStep=function(n){var s=this.getStepCount(),o=this.getCurrentStep();if(n>s){return this;}if(n>this._activeStep){this._updateActiveStep(n);}return this._updateCurrentStep(n,o);};a.prototype._updateActiveStep=function(n,o){var z=n-1,b=(o||this._activeStep)-1;this._activeStep=n;this._updateAnchorNavigation(z);this._removeAnchorAriaDisabledAttribute(z);this._updateStepActiveAttribute(z,b);};a.prototype._updateCurrentStep=function(n,o){var z=n-1,b=(o||this.getCurrentStep())-1;this._currentStep=n;this._updateStepZIndex();this._updateOpenSteps();this._updateStepCurrentAttribute(z,b);this._updateAnchorAriaLabelAttribute(z,b);return this;};a.prototype._updateOpenSteps=function(){var w=this.$().width(),c=this._currentStep-1,b=0,d=true,s=this.getStepTitles().length?Math.floor(w/a.CONSTANTS.MIN_STEP_WIDTH_WITH_TITLE):Math.floor(w/a.CONSTANTS.MIN_STEP_WIDTH_NO_TITLE);[].forEach.call(this._cachedSteps,function(e){e.setAttribute(W.ATTRIBUTES.OPEN_STEP,false);e.setAttribute(W.ATTRIBUTES.OPEN_STEP_PREV,false);e.setAttribute(W.ATTRIBUTES.OPEN_STEP_NEXT,false);});if(this._cachedSteps[c]){this._cachedSteps[c].setAttribute(W.ATTRIBUTES.OPEN_STEP,true);}for(var i=1;i<s;i++){if(d){b+=1;}if(d&&this._cachedSteps[c+b]){this._cachedSteps[c+b].setAttribute(W.ATTRIBUTES.OPEN_STEP,true);d=!d;}else if(!d&&this._cachedSteps[c-b]){this._cachedSteps[c-b].setAttribute(W.ATTRIBUTES.OPEN_STEP,true);d=!d;}else if(this._cachedSteps[c+b+1]){b+=1;this._cachedSteps[c+b].setAttribute(W.ATTRIBUTES.OPEN_STEP,true);d=true;}else if(this._cachedSteps[c-b]){this._cachedSteps[c-b].setAttribute(W.ATTRIBUTES.OPEN_STEP,true);b+=1;d=false;}}for(i=0;i<this._cachedSteps.length;i++){if(this._cachedSteps[i].getAttribute(W.ATTRIBUTES.OPEN_STEP)=="true"&&this._cachedSteps[i-1]&&this._cachedSteps[i-1].getAttribute(W.ATTRIBUTES.OPEN_STEP)=="false"){this._cachedSteps[i-1].setAttribute(W.ATTRIBUTES.OPEN_STEP_PREV,true);}if(this._cachedSteps[i].getAttribute(W.ATTRIBUTES.OPEN_STEP)=="false"&&this._cachedSteps[i-1]&&this._cachedSteps[i-1].getAttribute(W.ATTRIBUTES.OPEN_STEP)=="true"){this._cachedSteps[i].setAttribute(W.ATTRIBUTES.OPEN_STEP_NEXT,true);break;}}};a.prototype._isGroupAtStart=function(d){var s=q(d).closest("."+W.CLASSES.STEP);var b=this._getStepNumber(s);return s.attr(W.ATTRIBUTES.OPEN_STEP_PREV)==="true"&&b>1;};a.prototype._isGroupAtEnd=function(d){var s=q(d).closest("."+W.CLASSES.STEP);var b=this._getStepNumber(s);return s.attr(W.ATTRIBUTES.OPEN_STEP_NEXT)==="true"&&b<this._cachedSteps.length;};a.prototype._showActionSheet=function(d,b){var f=b?0:this._getStepNumber(d)-1;var t=b?this._getStepNumber(d):this._cachedSteps.length;var c,e;this._actionSheet.removeAllButtons();for(var i=f;i<t;i++){c=this.getStepIcons()[i];e=this._cachedSteps[i].childNodes[0].getAttribute("title");this._actionSheet.addButton(new sap.m.Button({width:"200px",text:e,icon:c,enabled:this._activeStep>=(i+1),press:function(s){this._moveToStep(s);this.fireStepChanged({current:s});}.bind(this,i+1)}));}this._actionSheet.openBy(d);};a.prototype._isAnchor=function(d){return d.className.indexOf(W.CLASSES.ANCHOR)!==-1;};a.prototype._isOpenStep=function(d){var s=q(d).closest("."+W.CLASSES.STEP);return s.attr(W.ATTRIBUTES.OPEN_STEP)==="true"||(s.attr(W.ATTRIBUTES.OPEN_STEP)==="false"&&s.attr(W.ATTRIBUTES.OPEN_STEP_PREV)==="true")||(s.attr(W.ATTRIBUTES.OPEN_STEP)==="false"&&s.attr(W.ATTRIBUTES.OPEN_STEP_NEXT)==="true");};a.prototype._isActiveStep=function(s){return s<=this._activeStep;};a.prototype._getStepNumber=function(d){var s=q(d).closest("."+W.CLASSES.STEP).attr(W.ATTRIBUTES.STEP);return parseInt(s);};return a;});
