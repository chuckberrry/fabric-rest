/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/Device','sap/ui/base/Object','sap/ui/thirdparty/URI',"sap/base/Log","sap/ui/dom/includeStylesheet","sap/ui/thirdparty/jquery"],function(D,B,U,L,a,q){"use strict";var m=150;var T=B.extend("sap.ui.core.ThemeCheck",{constructor:function(C){this._oCore=C;this._iCount=0;this._CUSTOMCSSCHECK=/\.sapUiThemeDesignerCustomCss/i;this._CUSTOMID="sap-ui-core-customcss";this._customCSSAdded=false;this._themeCheckedForCustom=null;this._sFallbackTheme=null;this._mThemeFallback={};this._oThemeMetaDataCheckElement=null;},getInterface:function(){return this;},fireThemeChangedEvent:function(o){c(this);f.apply(this,[true]);if(!o&&!this._sThemeCheckId){this._oCore.fireThemeChanged({theme:this._oCore.getConfiguration().getTheme()});}}});T.themeLoaded=false;function s(i){try{return i.cssRules;}catch(e){return null;}}function h(e){var C=s(e);return!!C&&C.length>0;}T.checkStyle=function(i,l){var S=document.getElementById(i);try{var n=false,j=false,k=false,I=false;n=!S;j=!!(S&&(S.getAttribute("data-sap-ui-ready")==="true"||S.getAttribute("data-sap-ui-ready")==="false"));k=!!(S&&S.sheet&&S.sheet.href===S.href&&h(S.sheet));I=!!(S&&S.innerHTML&&S.innerHTML.length>0);var r=n||k||I||j;if(l){L.debug("ThemeCheck: "+i+": "+r+" (noLinkElement: "+n+", sheet: "+k+", innerHtml: "+I+", linkElementFinishedLoading: "+j+")");}return r;}catch(e){if(l){L.error("ThemeCheck: "+i+": Error during check styles '"+i+"'",e);}}return false;};function c(t){T.themeLoaded=false;if(t._sThemeCheckId){clearTimeout(t._sThemeCheckId);t._sThemeCheckId=null;t._iCount=0;t._sFallbackTheme=null;t._mThemeFallback={};if(t._oThemeMetaDataCheckElement&&t._oThemeMetaDataCheckElement.parentNode){t._oThemeMetaDataCheckElement.parentNode.removeChild(t._oThemeMetaDataCheckElement);t._oThemeMetaDataCheckElement=null;}}}function b(t){var e=t._oCore.getLoadedLibraries();var j=t._oCore.getConfiguration().getTheme();var p=t._oCore._getThemePath("sap.ui.core",j)+"custom.css";var I=j.indexOf("sap_")===0||j==="base";var r=true;var F=[];if(!!t._customCSSAdded&&t._themeCheckedForCustom===j){e[t._CUSTOMID]={};}function k(n){var S="sap-ui-theme-"+n;var o=T.checkStyle(S,true);if(o){var O=document.querySelectorAll("link[data-sap-ui-foucmarker='"+S+"']");if(O.length>0){for(var i=0,l=O.length;i<l;i++){O[i].parentNode.removeChild(O[i]);}L.debug("ThemeCheck: Old stylesheets removed for library: "+n);}}r=r&&o;if(r){if(t._themeCheckedForCustom!=j){if(!I&&d(t,n)){var C=p;var u=t._oCore._getLibraryCssQueryParams(e["sap.ui.core"]);if(u){C+=u;}a(C,t._CUSTOMID);t._customCSSAdded=true;L.warning("ThemeCheck: delivered custom CSS needs to be loaded, Theme not yet applied");t._themeCheckedForCustom=j;r=false;return false;}else{var v=q("LINK[id='"+t._CUSTOMID+"']");if(v.length>0){v.remove();L.debug("ThemeCheck: Custom CSS removed");}t._customCSSAdded=false;}}}if(!I&&o&&!t._mThemeFallback[n]){var w=document.getElementById(S);if(w&&w.getAttribute("data-sap-ui-ready")==="false"&&!(w.sheet&&h(w.sheet))){F.push(n);}}}q.each(e,k);if(F.length>0){if(!t._sFallbackTheme){if(!t._oThemeMetaDataCheckElement){t._oThemeMetaDataCheckElement=document.createElement("style");q.each(e,function(l){var C="sapThemeMetaData-UI5-"+l.replace(/\./g,"-");t._oThemeMetaDataCheckElement.classList.add(C);});document.head.appendChild(t._oThemeMetaDataCheckElement);}t._sFallbackTheme=g(t._oThemeMetaDataCheckElement);}if(t._sFallbackTheme){F.forEach(function(l){var S="sap-ui-theme-"+l;var o=document.getElementById(S);L.warning("ThemeCheck: Custom theme '"+j+"' could not be loaded for library '"+l+"'. "+"Falling back to its base theme '"+t._sFallbackTheme+"'.");t._oCore._updateThemeUrl(o,t._sFallbackTheme);t._mThemeFallback[l]=true;});r=false;}}if(!r){L.warning("ThemeCheck: Theme not yet applied.");}else{t._themeCheckedForCustom=j;}return r;}function g(t){function e(){var i=window.getComputedStyle(t).getPropertyValue("background-image");var j=/\(["']?data:text\/plain;utf-8,(.*?)['"]?\)/i.exec(i);if(!j||j.length<2){return null;}var M=j[1];if(M.charAt(0)!=="{"&&M.charAt(M.length-1)!=="}"){try{M=decodeURI(M);}catch(k){}}M=M.replace(/\\"/g,'"');M=M.replace(/%20/g," ");try{return JSON.parse(M);}catch(k){return null;}}var o=e();if(o&&o.Extends&&o.Extends[0]){return o.Extends[0];}else{return null;}}function d(t,l){var j=window.document.getElementById("sap-ui-theme-"+l);if(!j){return false;}var k=window.getComputedStyle(j,':after');var n=k?k.getPropertyValue('content'):null;if(!n&&D.browser.safari){var o=document.documentElement;o.classList.add("sapUiThemeDesignerCustomCss");n=window.getComputedStyle(o,":after").getPropertyValue("content");o.classList.remove("sapUiThemeDesignerCustomCss");}if(n&&n!=="none"){try{if(n[0]==="'"||n[0]==='"'){n=n.substring(1,n.length-1);}return n==="true";}catch(e){L.error("Custom check: Error parsing JSON string for custom.css indication.",e);}}var r=j.sheet?s(j.sheet):null;if(!r||r.length===0){L.warning("Custom check: Failed retrieving a CSS rule from stylesheet "+l);return false;}for(var i=0;(i<2&&i<r.length);i++){if(t._CUSTOMCSSCHECK.test(r[i].selectorText)){return true;}}return false;}function f(F){this._iCount++;var e=this._iCount>m;if(!b(this)&&!e){var i;if(this._iCount<=100){i=2;}else if(this._iCount<=110){i=500;}else{i=1000;}this._sThemeCheckId=setTimeout(f.bind(this),i);}else if(!F){c(this);T.themeLoaded=true;this._oCore.fireThemeChanged({theme:this._oCore.getConfiguration().getTheme()});if(e){L.warning("ThemeCheck: max. check cycles reached.");}}else{T.themeLoaded=true;}}return T;});
