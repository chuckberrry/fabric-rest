/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./Bar','./InstanceManager','./AssociativeOverflowToolbar','./ToolbarSpacer','./library','sap/ui/core/Control','sap/ui/core/IconPool','sap/ui/core/Popup','sap/ui/core/delegate/ScrollEnablement','sap/ui/core/RenderManager','sap/ui/core/InvisibleText','sap/ui/core/ResizeHandler','sap/ui/Device','sap/ui/base/ManagedObject','sap/ui/core/library','./TitlePropagationSupport','./DialogRenderer',"sap/base/Log","sap/ui/thirdparty/jquery","sap/ui/core/Core","sap/ui/core/Configuration","sap/ui/dom/jquery/control","sap/ui/dom/jquery/Focusable"],function(B,I,A,T,l,C,a,P,S,R,b,c,D,M,d,f,g,L,q,h,j){"use strict";var O=d.OpenState;var k=l.DialogType;var V=d.ValueState;var s=h.getConfiguration().getAnimationMode();var u=s!==j.AnimationMode.none&&s!==j.AnimationMode.minimal;var m=u?300:10;var n=C.extend("sap.m.Dialog",{metadata:{interfaces:["sap.ui.core.PopupInterface"],library:"sap.m",properties:{icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},title:{type:"string",group:"Appearance",defaultValue:null},showHeader:{type:"boolean",group:"Appearance",defaultValue:true},type:{type:"sap.m.DialogType",group:"Appearance",defaultValue:k.Standard},state:{type:"sap.ui.core.ValueState",group:"Appearance",defaultValue:V.None},stretchOnPhone:{type:"boolean",group:"Appearance",defaultValue:false,deprecated:true},stretch:{type:"boolean",group:"Appearance",defaultValue:false},contentWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},contentHeight:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},horizontalScrolling:{type:"boolean",group:"Behavior",defaultValue:true},verticalScrolling:{type:"boolean",group:"Behavior",defaultValue:true},resizable:{type:"boolean",group:"Behavior",defaultValue:false},draggable:{type:"boolean",group:"Behavior",defaultValue:false},escapeHandler:{type:"any",group:"Behavior",defaultValue:null}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},subHeader:{type:"sap.m.IBar",multiple:false},customHeader:{type:"sap.m.IBar",multiple:false},beginButton:{type:"sap.m.Button",multiple:false},endButton:{type:"sap.m.Button",multiple:false},buttons:{type:"sap.m.Button",multiple:true,singularName:"button"},_header:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_title:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_icon:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_toolbar:{type:"sap.m.OverflowToolbar",multiple:false,visibility:"hidden"},_valueState:{type:"sap.ui.core.InvisibleText",multiple:false,visibility:"hidden"}},associations:{leftButton:{type:"sap.m.Button",multiple:false,deprecated:true},rightButton:{type:"sap.m.Button",multiple:false,deprecated:true},initialFocus:{type:"sap.ui.core.Control",multiple:false},ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{beforeOpen:{},afterOpen:{},beforeClose:{parameters:{origin:{type:"sap.m.Button"}}},afterClose:{parameters:{origin:{type:"sap.m.Button"}}}},designtime:"sap/m/designtime/Dialog.designtime"}});f.call(n.prototype,"content",function(){return this._headerTitle?this._headerTitle.getId():false;});n._bPaddingByDefault=(sap.ui.getCore().getConfiguration().getCompatibilityVersion("sapMDialogWithPadding").compareTo("1.16")<0);n._mIcons={};n._mIcons[V.Success]=a.getIconURI("message-success");n._mIcons[V.Warning]=a.getIconURI("message-warning");n._mIcons[V.Error]=a.getIconURI("message-error");n._mIcons[V.Information]=a.getIconURI("hint");n.prototype.init=function(){var t=this;this._externalIcon=undefined;this._oManuallySetSize=null;this._oManuallySetPosition=null;this._bRTL=sap.ui.getCore().getConfiguration().getRTL();this._scrollContentList=["sap.m.NavContainer","sap.m.Page","sap.m.ScrollContainer","sap.m.SplitContainer","sap.m.MultiInput"];this.oPopup=new P();this.oPopup.setShadow(true);this.oPopup.setNavigationMode("SCOPE");if(D.os.ios&&D.system.phone&&!this._bMessageType){this.oPopup.setModal(true,"sapMDialogTransparentBlk");}else{this.oPopup.setModal(true,"sapMDialogBlockLayerInit");}this.oPopup.setAnimations(q.proxy(this._openAnimation,this),q.proxy(this._closeAnimation,this));this.oPopup._applyPosition=function(p,F){var e;var i;t._setDimensions();t._adjustScrollingPane();p.at={};if(t._oManuallySetPosition){p.at.left=t._oManuallySetPosition.x;p.at.top=t._oManuallySetPosition.y;}else{if(window.scrollY===undefined){e=window.pageYOffset;}else{e=window.scrollY;}if(D.os.ios||e<0){e=0;}p.at.top='calc(50% + '+e+'px)';if(t._bRTL){p.at.left='auto';}else{if(window.scrollX===undefined){i=window.pageXOffset;}else{i=window.scrollX;}if(D.os.ios||i<0){i=0;}p.at.left='calc(50% + '+i+'px)';}}t._deregisterContentResizeHandler();P.prototype._applyPosition.call(this,p);t._registerContentResizeHandler();};if(n._bPaddingByDefault){this.addStyleClass("sapUiPopupWithPadding");}this._initTitlePropagationSupport();};n.prototype.onBeforeRendering=function(){if(this._hasSingleScrollableContent()){this.setProperty("verticalScrolling",false);this.setProperty("horizontalScrolling",false);L.info("VerticalScrolling and horizontalScrolling in sap.m.Dialog with ID "+this.getId()+" has been disabled because there's scrollable content inside");}else if(!this._oScroller){this._oScroller=new S(this,this.getId()+"-scroll",{horizontal:this.getHorizontalScrolling(),vertical:this.getVerticalScrolling()});}this._createToolbarButtons();if(sap.ui.getCore().getConfiguration().getAccessibility()&&this.getState()!=V.None){var v=new b({text:this.getValueStateString(this.getState())});this.setAggregation("_valueState",v);this.addAriaLabelledBy(v.getId());}};n.prototype.onAfterRendering=function(){this._$scrollPane=this.$("scroll");this._$content=this.$("cont");this._$dialog=this.$();if(this.isOpen()){this._setInitialFocus();}if(this.getType()===k.Message){this.$("footer").removeClass("sapContrast sapContrastPlus");}};n.prototype.exit=function(){I.removeDialogInstance(this);this._deregisterContentResizeHandler();this._deregisterResizeHandler();if(this.oPopup){this.oPopup.detachOpened(this._handleOpened,this);this.oPopup.detachClosed(this._handleClosed,this);this.oPopup.destroy();this.oPopup=null;}if(this._oScroller){this._oScroller.destroy();this._oScroller=null;}if(this._header){this._header.destroy();this._header=null;}if(this._headerTitle){this._headerTitle.destroy();this._headerTitle=null;}if(this._iconImage){this._iconImage.destroy();this._iconImage=null;}if(this._toolbarSpacer){this._toolbarSpacer.destroy();this._toolbarSpacer=null;}};n.prototype.open=function(){var p=this.oPopup;p.setInitialFocusId(this.getId());var e=p.getOpenState();switch(e){case O.OPEN:case O.OPENING:return this;case O.CLOSING:this._bOpenAfterClose=true;break;default:}this._oCloseTrigger=null;this.fireBeforeOpen();p.attachOpened(this._handleOpened,this);this._iLastWidthAndHeightWithScroll=null;p.setContent(this);p.open();this._registerResizeHandler();I.addDialogInstance(this);return this;};n.prototype.close=function(){this._bOpenAfterClose=false;this.$().removeClass('sapDialogDisableTransition');this._deregisterResizeHandler();var p=this.oPopup;var e=this.oPopup.getOpenState();if(!(e===O.CLOSED||e===O.CLOSING)){l.closeKeyboard();this.fireBeforeClose({origin:this._oCloseTrigger});p.attachClosed(this._handleClosed,this);this._bDisableRepositioning=false;this._oManuallySetPosition=null;this._oManuallySetSize=null;p.close();this._deregisterContentResizeHandler();}return this;};n.prototype.isOpen=function(){return this.oPopup&&this.oPopup.isOpen();};n.prototype._handleOpened=function(){this.oPopup.detachOpened(this._handleOpened,this);this._setInitialFocus();this.fireAfterOpen();};n.prototype._handleClosed=function(){if(!this.oPopup){return;}this.oPopup.detachClosed(this._handleClosed,this);if(this.getDomRef()){R.preserveContent(this.getDomRef());this.$().remove();}I.removeDialogInstance(this);this.fireAfterClose({origin:this._oCloseTrigger});if(this._bOpenAfterClose){this._bOpenAfterClose=false;this.open();}};n.prototype.onfocusin=function(e){var i=e.target;if(i.id===this.getId()+"-firstfe"){var p=this.$("footer").lastFocusableDomRef()||this.$("cont").lastFocusableDomRef()||(this.getSubHeader()&&this.getSubHeader().$().firstFocusableDomRef())||(this._getAnyHeader()&&this._getAnyHeader().$().lastFocusableDomRef());if(p){p.focus();}}else if(i.id===this.getId()+"-lastfe"){var F=(this._getAnyHeader()&&this._getAnyHeader().$().firstFocusableDomRef())||(this.getSubHeader()&&this.getSubHeader().$().firstFocusableDomRef())||this.$("cont").firstFocusableDomRef()||this.$("footer").firstFocusableDomRef();if(F){F.focus();}}};n.prototype._getPromiseWrapper=function(){var t=this;return{reject:function(){t.currentPromise.reject();},resolve:function(){t.currentPromise.resolve();}};};n.prototype.onsapescape=function(e){var E=this.getEscapeHandler(),p={},t=this;if(e.originalEvent&&e.originalEvent._sapui_handledByControl){return;}this._oCloseTrigger=null;if(typeof E==='function'){new window.Promise(function(r,i){p.resolve=r;p.reject=i;t.currentPromise=p;E(t._getPromiseWrapper());}).then(function(r){t.close();}).catch(function(){L.info("Disallow dialog closing");});}else{this.close();}e.stopPropagation();};n.prototype._openAnimation=function(r,i,e){r.addClass("sapMDialogOpen");r.css("display","block");setTimeout(e,m);};n.prototype._closeAnimation=function(r,i,e){r.removeClass("sapMDialogOpen");setTimeout(e,m);};n.prototype._setDimensions=function(){var $=this.$(),e=this.getStretch(),i=this.getStretchOnPhone()&&D.system.phone,p=this._bMessageType,r={};if(!e){if(!this._oManuallySetSize){r.width=this.getContentWidth()||undefined;r.height=this.getContentHeight()||undefined;}else{r.width=this._oManuallySetSize.width;r.height=this._oManuallySetSize.height;}}if(r.width=='auto'){r.width=undefined;}if(r.height=='auto'){r.height=undefined;}if((e&&!p)||(i)){this.$().addClass('sapMDialogStretched');}$.css(r);if(!e&&!this._oManuallySetSize&&!this._bDisableRepositioning){this._applyCustomTranslate();}if(window.navigator.userAgent.toLowerCase().indexOf("chrome")!==-1&&this.getStretch()){$.find('> footer').css({bottom:'0.001px'});}};n.prototype._adjustScrollingPane=function(){if(this._oScroller){this._oScroller.refresh();}};n.prototype._reposition=function(){};n.prototype._repositionAfterOpen=function(){};n.prototype._reapplyPosition=function(){this._adjustScrollingPane();};n.prototype._onResize=function(){var $=this.$(),e=this.$('cont'),i=e[0].clientWidth,p,r=this.getContentHeight(),t=this.getContentWidth(),v,w=Math.floor(window.innerWidth*0.9),x=2,y=D.browser,z=0;if(this._oManuallySetSize){e.css({width:'auto'});return;}if(!r||r=='auto'){p=e.scrollTop();e.css({height:'auto'});$.children().each(function(){z+=q(this).outerHeight(true);});if(this.getStretch()||z>$.innerHeight()){v=parseFloat($.height())+x;e.height(Math.round(v));}e.scrollTop(p);}if(D.system.desktop&&!y.chrome){var E=Math.ceil(e.outerWidth()-i),F=e.width()+"x"+e.height();if(F!==this._iLastWidthAndHeightWithScroll){if(E>0&&(!t||t=='auto')&&!this.getStretch()&&e.width()<w){$.addClass("sapMDialogVerticalScrollIncluded");e.css({"padding-right":E});this._iLastWidthAndHeightWithScroll=F;}else{$.removeClass("sapMDialogVerticalScrollIncluded");e.css({"padding-right":""});this._iLastWidthAndHeightWithScroll=null;}}}if(!this.getStretch()&&!this._oManuallySetSize&&!this._bDisableRepositioning){this._applyCustomTranslate();}};n.prototype._applyCustomTranslate=function(){var $=this.$(),t,e,i=$.innerWidth(),p=$.innerHeight();if(D.system.desktop&&(i%2!==0||p%2!==0)){if(!this._bRTL){t='-'+Math.floor(i/2)+"px";}else{t=Math.floor(i/2)+"px";}e='-'+Math.floor(p/2)+"px";var r='translate('+t+','+e+') scale(1) ';$.css('transform',r);$.css('-webkit-transform',r+' translateZ(0px)');}else{$.css('transform','');$.css('-webkit-transform','');}};n.prototype._createHeader=function(){if(!this._header){this._header=new B(this.getId()+"-header");this._header._setRootAccessibilityRole("heading");this.setAggregation("_header",this._header,false);}};n.prototype._hasSingleScrollableContent=function(){var e=this.getContent();while(e.length===1&&e[0]instanceof C&&e[0].isA("sap.ui.core.mvc.View")){e=e[0].getContent();}if(e.length===1&&e[0]instanceof C&&e[0].isA(this._scrollContentList)){return true;}return false;};n.prototype._initBlockLayerAnimation=function(){this.oPopup._hideBlockLayer=function(){var $=q("#sap-ui-blocklayer-popup");$.removeClass("sapMDialogTransparentBlk");P.prototype._hideBlockLayer.call(this);};};n.prototype._clearBlockLayerAnimation=function(){if(D.os.ios&&D.system.phone&&!this._bMessageType){delete this.oPopup._showBlockLayer;this.oPopup._hideBlockLayer=function(){var $=q("#sap-ui-blocklayer-popup");$.removeClass("sapMDialogTransparentBlk");P.prototype._hideBlockLayer.call(this);};}};n.prototype._getFocusId=function(){return this.getInitialFocus()||this._getFirstFocusableContentSubHeader()||this._getFirstFocusableContentElementId()||this._getFirstVisibleButtonId()||this.getId();};n.prototype._getFirstVisibleButtonId=function(){var e=this.getBeginButton(),E=this.getEndButton(),p=this.getButtons(),r="";if(e&&e.getVisible()){r=e.getId();}else if(E&&E.getVisible()){r=E.getId();}else if(p&&p.length>0){for(var i=0;i<p.length;i++){if(p[i].getVisible()){r=p[i].getId();break;}}}return r;};n.prototype._getFirstFocusableContentSubHeader=function(){var $=this.$().find('.sapMDialogSubHeader');var r;var F=$.firstFocusableDomRef();if(F){r=F.id;}return r;};n.prototype._getFirstFocusableContentElementId=function(){var r="";var $=this.$("cont");var F=$.firstFocusableDomRef();if(F){r=F.id;}return r;};n.prototype._setInitialFocus=function(){var F=this._getFocusId();var e=sap.ui.getCore().byId(F);var i;if(e){if(e.getVisible&&!e.getVisible()){this.focus();return;}i=e.getFocusDomRef();}i=i||((F?window.document.getElementById(F):null));if(!i){this.setInitialFocus("");i=sap.ui.getCore().byId(this._getFocusId());}if(!this.getInitialFocus()){this.setAssociation('initialFocus',i?i.id:this.getId(),true);}if(D.system.desktop||(i&&!/input|textarea|select/i.test(i.tagName))){if(i){i.focus();}}else{this.focus();}};n.prototype.getScrollDelegate=function(){return this._oScroller;};n.prototype._composeAggreNameInHeader=function(p){var H;if(p==="Begin"){H="contentLeft";}else if(p==="End"){H="contentRight";}else{H="content"+p;}return H;};n.prototype._isToolbarEmpty=function(){var e=this._oToolbar.getContent().filter(function(i){return i.getMetadata().getName()!=='sap.m.ToolbarSpacer';});return e.length===0;};n.prototype._setButton=function(e,p,i){return this;};n.prototype._getButton=function(p){var e=p.toLowerCase()+"Button",i="_o"+this._firstLetterUpperCase(p)+"Button";if(D.system.phone){return this.getAggregation(e,null,true);}else{return this[i];}};n.prototype._getButtonFromHeader=function(p){if(this._header){var H=this._composeAggreNameInHeader(this._firstLetterUpperCase(p)),e=this._header.getAggregation(H);return e&&e[0];}else{return null;}};n.prototype._firstLetterUpperCase=function(v){return v.charAt(0).toUpperCase()+v.slice(1);};n.prototype._getAnyHeader=function(){var e=this.getCustomHeader();if(e){return e._setRootAccessibilityRole("heading");}else{var i=this.getShowHeader();if(!i){return null;}this._createHeader();return this._header;}};n.prototype._deregisterResizeHandler=function(){if(this._resizeListenerId){c.deregister(this._resizeListenerId);this._resizeListenerId=null;}D.resize.detachHandler(this._onResize,this);};n.prototype._registerResizeHandler=function(){var _=this.$("scroll");this._resizeListenerId=c.register(_.get(0),q.proxy(this._onResize,this));D.resize.attachHandler(this._onResize,this);this._onResize();};n.prototype._deregisterContentResizeHandler=function(){if(this._sContentResizeListenerId){c.deregister(this._sContentResizeListenerId);this._sContentResizeListenerId=null;}};n.prototype._registerContentResizeHandler=function(){if(!this._sContentResizeListenerId){this._sContentResizeListenerId=c.register(this.getDomRef("scrollCont"),q.proxy(this._onResize,this));}this._onResize();};n.prototype._attachHandler=function(e){var t=this;if(!this._oButtonDelegate){this._oButtonDelegate={ontap:function(){t._oCloseTrigger=this;},onkeyup:function(){t._oCloseTrigger=this;},onkeydown:function(){t._oCloseTrigger=this;}};}if(e){e.addDelegate(this._oButtonDelegate,true,e);}};n.prototype._createToolbarButtons=function(){var t=this._getToolbar();var e=this.getButtons();var i=this.getBeginButton();var p=this.getEndButton(),r=this,v=[i,p];v.forEach(function(w){if(w&&r._oButtonDelegate){w.removeDelegate(r._oButtonDelegate);}});t.removeAllContent();if(!("_toolbarSpacer"in this)){this._toolbarSpacer=new T();}t.addContent(this._toolbarSpacer);v.forEach(function(w){r._attachHandler(w);});if(e&&e.length){e.forEach(function(w){t.addContent(w);});}else{if(i){t.addContent(i);}if(p){t.addContent(p);}}};n.prototype._getToolbar=function(){if(!this._oToolbar){this._oToolbar=new A(this.getId()+"-footer").addStyleClass("sapMTBNoBorders");this.setAggregation("_toolbar",this._oToolbar);}return this._oToolbar;};n.prototype.getValueStateString=function(v){var r=sap.ui.getCore().getLibraryResourceBundle("sap.m");switch(v){case(V.Success):return r.getText("LIST_ITEM_STATE_SUCCESS");case(V.Warning):return r.getText("LIST_ITEM_STATE_WARNING");case(V.Error):return r.getText("LIST_ITEM_STATE_ERROR");case(V.Information):return r.getText("LIST_ITEM_STATE_INFORMATION");default:return"";}};n.prototype.setSubHeader=function(e){this.setAggregation("subHeader",e);if(e){e.setVisible=function(i){this.$().toggleClass('sapMDialogWithSubHeader',i);e.setProperty("visible",i);}.bind(this);}return this;};n.prototype.setLeftButton=function(v){if(typeof v==="string"){v=sap.ui.getCore().byId(v);}this.setBeginButton(v);return this.setAssociation("leftButton",v);};n.prototype.setRightButton=function(v){if(typeof v==="string"){v=sap.ui.getCore().byId(v);}this.setEndButton(v);return this.setAssociation("rightButton",v);};n.prototype.getLeftButton=function(){var e=this.getBeginButton();return e?e.getId():null;};n.prototype.getRightButton=function(){var e=this.getEndButton();return e?e.getId():null;};n.prototype.setBeginButton=function(e){var t=h.getConfiguration().getTheme();if(e&&e.isA("sap.m.Button")&&t.startsWith("sap_fiori_")){e.setType("Emphasized");e.addStyleClass("sapMDialogBeginButton");}return this.setAggregation("beginButton",e);};n.prototype.setEndButton=function(e){var t=h.getConfiguration().getTheme();if(e&&e.isA("sap.m.Button")&&t.startsWith("sap_fiori_")){e.setType("Transparent");e.addStyleClass("sapMDialogEndButton");}return this.setAggregation("endButton",e);};n.prototype.getAggregation=function(e,i,p){var r=C.prototype.getAggregation.apply(this,Array.prototype.slice.call(arguments,0,2));if(e==='buttons'&&r.length===0){this.getBeginButton()&&r.push(this.getBeginButton());this.getEndButton()&&r.push(this.getEndButton());}return r;};n.prototype.getAriaLabelledBy=function(){var e=this._getAnyHeader(),i=this.getAssociation("ariaLabelledBy",[]).slice();var p=this.getSubHeader();if(p){i.unshift(p.getId());}if(e){var t=e.findAggregatedObjects(true,function(r){return r.isA("sap.m.Title");});if(t.length){i=t.map(function(r){return r.getId();}).concat(i);}else{i.unshift(e.getId());}}return i;};n.prototype.setTitle=function(t){this.setProperty("title",t,true);if(this._headerTitle){this._headerTitle.setText(t);}else{this._headerTitle=new sap.m.Title(this.getId()+"-title",{text:t,level:"H2"}).addStyleClass("sapMDialogTitle");this._createHeader();this._header.addContentMiddle(this._headerTitle);}return this;};n.prototype.setState=function(e){var F={},$=this.$(),N;F[e]=true;this.setProperty("state",e,true);for(N in g._mStateClasses){$.toggleClass(g._mStateClasses[N],!!F[N]);}this.setIcon(n._mIcons[e],true);return this;};n.prototype.setIcon=function(i,e){if(!e){this._externalIcon=i;}else{if(this._externalIcon){i=this._externalIcon;}}if(i){if(i!==this.getIcon()){if(this._iconImage){this._iconImage.setSrc(i);}else{this._iconImage=a.createControlByURI({id:this.getId()+"-icon",src:i,useIconTooltip:false},sap.m.Image).addStyleClass("sapMDialogIcon");this._createHeader();this._header.insertAggregation("contentMiddle",this._iconImage,0);}}}else{var p=this.getState();if(!e&&p!==V.None){if(this._iconImage){this._iconImage.setSrc(n._mIcons[p]);}}else{if(this._iconImage){this._iconImage.destroy();this._iconImage=null;}}}this.setProperty("icon",i,true);return this;};n.prototype.setType=function(t){var e=this.getType();if(e===t){return this;}this._bMessageType=(t===k.Message);return this.setProperty("type",t,false);};n.prototype.setStretch=function(e){this._bStretchSet=true;return this.setProperty("stretch",e);};n.prototype.setStretchOnPhone=function(e){if(this._bStretchSet){L.warning("sap.m.Dialog: stretchOnPhone property is deprecated. Setting stretchOnPhone property is ignored when there's already stretch property set.");return this;}this.setProperty("stretchOnPhone",e);return this.setProperty("stretch",e&&D.system.phone);};n.prototype.setVerticalScrolling=function(v){var e=this.getVerticalScrolling(),H=this._hasSingleScrollableContent();if(H){L.warning("sap.m.Dialog: property verticalScrolling automatically reset to false. See documentation.");v=false;}if(e===v){return this;}this.$().toggleClass("sapMDialogVerScrollDisabled",!v);this.setProperty("verticalScrolling",v);if(this._oScroller){this._oScroller.setVertical(v);}return this;};n.prototype.setHorizontalScrolling=function(v){var e=this.getHorizontalScrolling(),H=this._hasSingleScrollableContent();if(H){L.warning("sap.m.Dialog: property horizontalScrolling automatically reset to false. See documentation.");v=false;}if(e===v){return this;}this.$().toggleClass("sapMDialogHorScrollDisabled",!v);this.setProperty("horizontalScrolling",v);if(this._oScroller){this._oScroller.setHorizontal(v);}return this;};n.prototype.setInitialFocus=function(i){return this.setAssociation("initialFocus",i,true);};n.prototype.forceInvalidate=C.prototype.invalidate;n.prototype.invalidate=function(e){if(this.isOpen()){this.forceInvalidate(e);}};function o(e){var $=q(e);var i=$.control(0);if(!i||i.getMetadata().getInterfaces().indexOf("sap.m.IBar")>-1){return true;}return $.hasClass('sapMDialogTitle');}if(D.system.desktop){n.prototype.ondblclick=function(e){if(o(e.target)){var $=this.$('cont');this._bDisableRepositioning=false;this._oManuallySetPosition=null;this._oManuallySetSize=null;this.oPopup&&this.oPopup._applyPosition(this.oPopup._oLastPosition,true);this._$dialog.removeClass('sapMDialogTouched');$.css({height:'100%'});}};n.prototype.onmousedown=function(e){if(e.which===3){return;}if(this.getStretch()||(!this.getDraggable()&&!this.getResizable())){return;}var t;var i=this;var $=q(document);var p=q(e.target);var r=p.hasClass('sapMDialogResizeHandler')&&this.getResizable();var v=function(K){t=t?clearTimeout(t):setTimeout(function(){K();},0);};var w=window.innerWidth;var x=window.innerHeight;var y={x:e.pageX,y:e.pageY,width:i._$dialog.width(),height:i._$dialog.height(),outerHeight:i._$dialog.outerHeight(),offset:{x:e.offsetX?e.offsetX:e.originalEvent.layerX,y:e.offsetY?e.offsetY:e.originalEvent.layerY},position:{x:i._$dialog.offset().left,y:i._$dialog.offset().top}};function z(){var K=i.$(),N=i.$('cont'),Q,U;$.off("mouseup mousemove");if(r){i._$dialog.removeClass('sapMDialogResizing');Q=parseInt(K[0].style.height)||parseInt(K.height());U=parseInt(K.css("border-top-width"))+parseInt(K.css("border-bottom-width"));N.height(Q+U);}}if((o(e.target)&&this.getDraggable())||r){i._bDisableRepositioning=true;i._$dialog.addClass('sapDialogDisableTransition');i._$dialog.addClass('sapMDialogTouched');i._oManuallySetPosition={x:y.position.x,y:y.position.y};i._$dialog.css({left:Math.min(Math.max(0,i._oManuallySetPosition.x),w-y.width),top:Math.min(Math.max(0,i._oManuallySetPosition.y),x-y.height),width:y.width,height:y.height,transform:""});}if(o(e.target)&&this.getDraggable()){$.on("mousemove",function(K){if(K.buttons===0){z();return;}v(function(){i._bDisableRepositioning=true;i._oManuallySetPosition={x:K.pageX-e.pageX+y.position.x,y:K.pageY-e.pageY+y.position.y};i._$dialog.css({left:Math.min(Math.max(0,i._oManuallySetPosition.x),w-y.width),top:Math.min(Math.max(0,i._oManuallySetPosition.y),x-y.outerHeight),transform:""});});});}else if(r){i._$dialog.addClass('sapMDialogResizing');var E={};var F=parseInt(i._$dialog.css('min-width'));var G=y.x+y.width-F;var H=p.width()-e.offsetX;var J=p.height()-e.offsetY;$.on("mousemove",function(K){v(function(){i._bDisableRepositioning=true;i.$('cont').height('').width('');if(K.pageY+J>x){K.pageY=x-J;}if(K.pageX+H>w){K.pageX=w-H;}i._oManuallySetSize={width:y.width+K.pageX-y.x,height:y.height+K.pageY-y.y};if(i._bRTL){E.left=Math.min(Math.max(K.pageX,0),G);E.transform="";i._oManuallySetSize.width=y.width+y.x-Math.max(K.pageX,0);}E.width=i._oManuallySetSize.width;E.height=i._oManuallySetSize.height;i._$dialog.css(E);});});}else{return;}$.on("mouseup",z);e.preventDefault();e.stopPropagation();};}n.prototype._applyContextualSettings=function(){M.prototype._applyContextualSettings.call(this,M._defaultContextualSettings);};return n;});
