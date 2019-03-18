/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Control','sap/ui/Device','./library',"./BlockLayoutCellRenderer","sap/base/Log","sap/ui/thirdparty/jquery"],function(C,D,l,B,L,q){"use strict";var a=C.extend("sap.ui.layout.BlockLayoutCell",{metadata:{library:"sap.ui.layout",properties:{title:{type:"string",group:"Appearance",defaultValue:null},titleAlignment:{type:"sap.ui.core.HorizontalAlign",group:"Appearance",defaultValue:"Begin"},titleLevel:{type:"sap.ui.core.TitleLevel",group:"Appearance",defaultValue:"Auto"},width:{type:"int",group:"Appearance",defaultValue:0},backgroundColorSet:{type:"sap.ui.layout.BlockLayoutCellColorSet",group:"Appearance"},backgroundColorShade:{type:"sap.ui.layout.BlockLayoutCellColorShade",group:"Appearance"}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},titleLink:{type:"sap.ui.core.Control",multiple:false}},designtime:"sap/ui/layout/designtime/BlockLayoutCell.designtime"}});a.prototype.setLayoutData=function(o){this.setAggregation("layoutData",o,true);var r=this.getParent();if(r){var e=q.Event("LayoutDataChange");e.srcControl=this;r._handleEvent(e);}if(this.getWidth()!=0){this.getLayoutData().setSize(this.getWidth());}return this;};a.prototype.setTitleLink=function(o){if(o&&o.getMetadata().getName()!=="sap.m.Link"){L.warning("sap.ui.layout.BlockLayoutCell "+this.getId()+": Can't add value for titleLink aggregation different than sap.m.Link.");return;}this.setAggregation("titleLink",o);return this;};a.prototype._setParentRowScrollable=function(s){this._parentRowScrollable=s;};a.prototype._getParentRowScrollable=function(){return this._parentRowScrollable;};a.prototype._setFlexWidth=function(f){this._flexWidth=f;};a.prototype._getFlexWidth=function(){if(D.browser.internet_explorer){return this._flexWidth+' 1 auto';}return this._flexWidth;};return a;});
