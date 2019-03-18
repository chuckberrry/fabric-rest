/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine('sap/m/designtime/ActionSheet.designtime',[],function(){"use strict";return{aggregations:{buttons:{domRef:":sap-domref",actions:{move:"moveControls"}}}};},false);
sap.ui.predefine('sap/m/designtime/Bar.designtime',[],function(){"use strict";return{aggregations:{contentLeft:{domRef:":sap-domref > .sapMBarLeft",actions:{move:"moveControls"}},contentMiddle:{domRef:":sap-domref > .sapMBarMiddle > .sapMBarPH",actions:{move:"moveControls"}},contentRight:{domRef:":sap-domref > .sapMBarRight",actions:{move:"moveControls"}}}};},false);
sap.ui.predefine('sap/m/designtime/Breadcrumbs.designtime',[],function(){"use strict";return{palette:{group:"ACTION",icons:{svg:"sap/m/designtime/Breadcrumbs.icon.svg"}},templates:{create:"sap/m/designtime/Breadcrumbs.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/BusyDialog.designtime',[],function(){"use strict";return{name:{singular:"BUSY_DIALOG_NAME",plural:"BUSY_DIALOG_NAME_PLURAL"},palette:{group:"DIALOG"}};},false);
sap.ui.predefine('sap/m/designtime/Button.designtime',[],function(){"use strict";return{palette:{group:"ACTION",icons:{svg:"sap/m/designtime/Button.icon.svg"}},actions:{combine:{changeType:"combineButtons",changeOnRelevantContainer:true,isEnabled:true},remove:{changeType:"hideControl"},rename:{changeType:"rename",domRef:function(c){return c.$().find(".sapMBtnContent")[0];}},reveal:{changeType:"unhideControl"}},templates:{create:"sap/m/designtime/Button.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/Carousel.designtime',[],function(){"use strict";return{name:{singular:"CAROUSEL_NAME",plural:"CAROUSEL_NAME_PLURAL"},palette:{group:"DISPLAY",icons:{svg:"sap/m/designtime/Carousel.icon.svg"}},templates:{create:"sap/m/designtime/Carousel.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/CheckBox.designtime',[],function(){"use strict";return{name:{singular:"CHECKBOX_NAME",plural:"CHECKBOX_NAME_PLURAL"},palette:{group:"INPUT",icons:{svg:"sap/m/designtime/CheckBox.icon.svg"}},actions:{remove:{changeType:"hideControl"},rename:{changeType:"rename",domRef:function(c){return c.$().find(".sapMCbLabel")[0];}},reveal:{changeType:"unhideControl"}},templates:{create:"sap/m/designtime/CheckBox.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/Column.designtime',["sap/ui/dt/ElementUtil"],function(U){"use strict";return{isVisible:function(c){return c.getVisible();},actions:{remove:"hideControl",reveal:{changeType:"unhideControl",getLabel:function(c){return U.getLabelForElement(c.getHeader());}}}};},false);
sap.ui.predefine('sap/m/designtime/ComboBox.designtime',[],function(){"use strict";return{palette:{group:"INPUT",icons:{svg:"sap/m/designtime/ComboBox.icon.svg"}},templates:{create:"sap/m/designtime/ComboBox.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/CustomListItem.designtime',[],function(){"use strict";return{aggregations:{content:{domRef:":sap-domref > .sapMLIBContent",actions:{move:"moveControls"}}}};},false);
sap.ui.predefine('sap/m/designtime/CustomTile.designtime',[],function(){"use strict";return{palette:{group:"TILE",icons:{svg:"sap/m/designtime/CustomTile.icon.svg"}},aggregations:{content:{domRef:":sap-domref"}}};},false);
sap.ui.predefine('sap/m/designtime/DatePicker.designtime',[],function(){"use strict";return{name:{singular:"DATEPICKER_NAME",plural:"DATEPICKER_NAME_PLURAL"},palette:{group:"INPUT",icons:{svg:"sap/m/designtime/DatePicker.icon.svg"}},actions:{remove:{changeType:"hideControl"},reveal:{changeType:"unhideControl"}},templates:{create:"sap/m/designtime/DatePicker.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/DateRangeSelection.designtime',[],function(){"use strict";return{name:{singular:"DATERANGESELECTION_NAME",plural:"DATERANGESELECTION_NAME_PLURAL"},palette:{group:"INPUT",icons:{svg:"sap/m/designtime/DateRangeSelection.icon.svg"}},templates:{create:"sap/m/designtime/DateRangeSelection.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/DateTimeInput.designtime',[],function(){"use strict";return{palette:{group:"INPUT",icons:{svg:"sap/m/designtime/DateTimeInput.icon.svg"}},templates:{create:"sap/m/designtime/DateTimeInput.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/DateTimePicker.designtime',[],function(){"use strict";return{name:{singular:"DATETIMEPICKER_NAME",plural:"DATETIMEPICKER_NAME_PLURAL"},palette:{group:"INPUT",icons:{svg:"sap/m/designtime/DateTimePicker.icon.svg"}},templates:{create:"sap/m/designtime/DateTimePicker.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/Dialog.designtime',[],function(){"use strict";return{name:{singular:"DIALOG_NAME",plural:"DIALOG_NAME_PLURAL"},palette:{group:"DIALOG"},actions:{rename:function(d){if(d.getCustomHeader()){return;}return{changeType:"rename",domRef:function(d){return d.getDomRef("title");}};}},aggregations:{content:{domRef:"> .sapMDialogSection",actions:{move:"moveControls"}},customHeader:{domRef:function(c){if(c._getAnyHeader()){return c._getAnyHeader().getDomRef();}}},subHeader:{domRef:":sap-domref > .sapMDialogSubHeader"},beginButton:{domRef:function(c){return c.getBeginButton().getDomRef();},ignore:function(c){return!c.getBeginButton()||!!c.getButtons().length;}},endButton:{domRef:function(c){return c.getEndButton().getDomRef();},ignore:function(c){return!c.getEndButton()||!!c.getButtons().length;}},buttons:{domRef:function(c){if(c.getButtons().length){return c._oToolbar.getDomRef();}}}}};},false);
sap.ui.predefine('sap/m/designtime/DraftIndicator.designtime',[],function(){"use strict";return{palette:{group:"DISPLAY",icons:{svg:"sap/m/designtime/DraftIndicator.icon.svg"}},templates:{create:"sap/m/designtime/DraftIndicator.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/FeedInput.designtime',[],function(){"use strict";return{palette:{group:"INPUT",icons:{svg:"sap/m/designtime/FeedInput.icon.svg"}}};},false);
sap.ui.predefine('sap/m/designtime/FeedListItem.designtime',[],function(){"use strict";return{palette:{group:"LIST",icons:{svg:"sap/m/designtime/FeedListItem.icon.svg"}}};},false);
sap.ui.predefine('sap/m/designtime/FlexBox.designtime',[],function(){"use strict";return{actions:{remove:{changeType:"hideControl"},reveal:{changeType:"unhideControl"}},aggregations:{items:{domRef:":sap-domref",actions:{move:"moveControls"}}},name:{singular:"FLEX_BOX_NAME",plural:"FLEX_BOX_NAME_PLURAL"},templates:{create:"sap/m/designtime/FlexBox.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/HBox.designtime',[],function(){"use strict";return{name:{singular:"HBOX_NAME",plural:"HBOX_NAME_PLURAL"},palette:{group:"LAYOUT",icons:{svg:"sap/m/designtime/HBox.icon.svg"}},templates:{create:"sap/m/designtime/HBox.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/IconTabBar.designtime',[],function(){"use strict";return{name:{singular:"ICON_TAB_BAR_NAME",plural:"ICON_TAB_BAR_NAME_PLURAL"},palette:{group:"CONTAINER",icons:{svg:"sap/m/designtime/IconTabBar.icon.svg"}},aggregations:{items:{domRef:":sap-domref > .sapMITH > .sapMITBScrollContainer > .sapMITBHead",actions:{move:"moveControls"}},content:{domRef:function(c){var s=c._getIconTabHeader().oSelectedItem;if(s&&s.getContent().length){return;}return c.getDomRef("content");},actions:{move:"moveControls"}}},templates:{create:"sap/m/designtime/IconTabBar.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/IconTabFilter.designtime',[],function(){"use strict";return{palette:{group:"CONTAINER",icons:{svg:"sap/m/designtime/IconTabFilter.icon.svg"}},actions:{rename:function(p){return{changeType:"rename",domRef:function(c){return c.$().find(".sapMITBText")[0];}};}},aggregations:{content:{domRef:function(c){var i=c.getParent(),I=i&&i.getParent(),C=c.getContent()||[];if(i.oSelectedItem===c&&C.length>0&&I){return I.getDomRef("content");}},actions:{move:"moveControls"}}}};},false);
sap.ui.predefine('sap/m/designtime/IconTabSeparator.designtime',[],function(){"use strict";return{palette:{group:"CONTAINER",icons:{svg:"sap/m/designtime/IconTabSeparator.icon.svg"}}};},false);
sap.ui.predefine('sap/m/designtime/Image.designtime',[],function(){"use strict";return{name:{singular:"IMAGE_NAME",plural:"IMAGE_NAME_PLURAL"},palette:{group:"DISPLAY",icons:{svg:"sap/m/designtime/Image.icon.svg"}},aggregations:{detailBox:{ignore:true}},actions:{remove:{changeType:"hideControl"},reveal:{changeType:"unhideControl"}},templates:{create:"sap/m/designtime/Image.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/Input.designtime',[],function(){"use strict";return{name:{singular:"INPUT_NAME",plural:"INPUT_NAME_PLURAL"},palette:{group:"INPUT",icons:{svg:"sap/m/designtime/Input.icon.svg"}},templates:{create:"sap/m/designtime/Input.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/InputBase.designtime',[],function(){"use strict";return{name:{singular:"INPUT_BASE_NAME",plural:"INPUT_BASE_NAME_PLURAL"},palette:{group:"INPUT",icons:{svg:"sap/m/designtime/InputBase.icon.svg"}},actions:{remove:{changeType:"hideControl"},reveal:{changeType:"unhideControl"}},templates:{create:"sap/m/designtime/Input.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/InputListItem.designtime',[],function(){"use strict";return{aggregations:{content:{domRef:":sap-domref > .sapMLIBContent",actions:{move:"moveControls"}}},actions:{rename:{changeType:"rename",domRef:function(c){return c.$().find(".sapMLIBContent > .sapMILILabel")[0];}}},name:{singular:"LIST_ITEM_BASE_NAME",plural:"LIST_ITEM_BASE_NAME_PLURAL"}};},false);
sap.ui.predefine('sap/m/designtime/Label.designtime',[],function(){"use strict";return{name:{singular:"LABEL_NAME",plural:"LABEL_NAME_PLURAL"},palette:{group:"DISPLAY",icons:{svg:"sap/m/designtime/Label.icon.svg"}},actions:{remove:{changeType:"hideControl"},rename:{changeType:"rename",domRef:function(c){return c.$()[0];}},reveal:{changeType:"unhideControl"}},templates:{create:"sap/m/designtime/Label.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/LightBox.designtime',[],function(){"use strict";return{name:{singular:"LIGHT_BOX_NAME",plural:"LIGHT_BOX_NAME_PLURAL"},palette:{group:"CONTAINER"}};},false);
sap.ui.predefine('sap/m/designtime/Link.designtime',[],function(){"use strict";return{name:{singular:"LINK_NAME",plural:"LINK_NAME_PLURAL"},palette:{group:"ACTION",icons:{svg:"sap/m/designtime/Link.icon.svg"}},actions:{remove:{changeType:"hideControl"},reveal:{changeType:"unhideControl"}},templates:{create:"sap/m/designtime/Link.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/ListBase.designtime',[],function(){"use strict";return{name:{singular:"LIST_BASE_NAME",plural:"LIST_BASE_NAME_PLURAL"},palette:{group:"LIST",icons:{svg:"sap/m/designtime/ListBase.icon.svg"}},aggregations:{items:{domRef:":sap-domref > .sapMListUl:not(.sapMGrowingList)",actions:{move:"moveControls"}},swipeContent:{domRef:":sap-domref > .sapMListSwp",ignore:true},headerToolbar:{domRef:":sap-domref > .sapMListHdrTBar"},infoToolbar:{domRef:":sap-domref .sapMListInfoTBar"},contextMenu:{ignore:true}},actions:{remove:{changeType:"hideControl"},reveal:{changeType:"unhideControl"}}};},false);
sap.ui.predefine('sap/m/designtime/ListItemBase.designtime',[],function(){"use strict";return{name:{singular:"LIST_ITEM_BASE_NAME",plural:"LIST_ITEM_BASE_NAME_PLURAL"},palette:{group:"LIST",icons:{svg:"sap/m/designtime/ListItemBase.icon.svg"}},actions:{remove:{changeType:"hideControl"},reveal:{changeType:"unhideControl"}}};},false);
sap.ui.predefine('sap/m/designtime/MenuButton.designtime',[],function(){"use strict";return{palette:{group:"ACTION",icons:{svg:"sap/m/designtime/MenuButton.icon.svg"}},aggregations:{menu:{ignore:true}},actions:{split:{changeType:"splitMenuButton",changeOnRelevantContainer:true,getControlsCount:function(m){return m.getMenu().getItems().length;}},rename:{changeType:"rename",domRef:function(c){return c.$().find('.sapMBtn > .sapMBtnInner > .sapMBtnContent')[0];}}},templates:{create:"sap/m/designtime/MenuButton.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/MessagePage.designtime',[],function(){"use strict";return{templates:{create:"sap/m/designtime/MessagePage.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/MessageStrip.designtime',[],function(){"use strict";return{palette:{group:"TILE",icons:{svg:"sap/m/designtime/MessageStrip.icon.svg"}},templates:{create:"sap/m/designtime/MessageStrip.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/MultiComboBox.designtime',[],function(){"use strict";return{palette:{group:"INPUT",icons:{svg:"sap/m/designtime/MultiComboBox.icon.svg"}},templates:{create:"sap/m/designtime/MultiComboBox.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/MultiInput.designtime',[],function(){"use strict";return{palette:{group:"INPUT"},templates:{create:"sap/m/designtime/MultiInput.create.fragment.xml"},name:{singular:"MULTIINPUT_NAME",plural:"MULTIINPUT_NAME_PLURAL"}};},false);
sap.ui.predefine('sap/m/designtime/NewsContent.designtime',[],function(){"use strict";return{palette:{group:"TILE",icons:{svg:"sap/m/designtime/NewsContent.icon.svg"}}};},false);
sap.ui.predefine('sap/m/designtime/ObjectAttribute.designtime',[],function(){"use strict";return{palette:{group:"DISPLAY",icons:{svg:"sap/m/designtime/ObjectAttribute.icon.svg"}},templates:{create:"sap/m/designtime/ObjectAttribute.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/ObjectHeader.designtime',[],function(){"use strict";return{palette:{group:"INPUT",icons:{svg:"sap/m/designtime/ObjectHeader.icon.svg"}},templates:{create:"sap/m/designtime/ObjectHeader.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/ObjectIdentifier.designtime',['sap/m/library',"sap/base/Log"],function(M,L){"use strict";var w;return{palette:{group:"DISPLAY",icons:{svg:"sap/m/designtime/ObjectIdentifier.icon.svg"}},registerSettingsHandler:function(W){w=W;},getStableElements:function(o){return w?w.getStableElements(o):null;},actions:{settings:function(){if(!w){return;}if(!w.isSettingsAvailable()){L.error("sap.ui.comp.navpopover.ObjectIdentifier.designtime: 'settings' action is not available");return;}return{handler:function(o,g){return w.execute(o,g);}};}},templates:{create:"sap/m/designtime/ObjectIdentifier.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/ObjectListItem.designtime',[],function(){"use strict";return{aggregations:{firstStatus:{domRef:":sap-domref .sapMObjLStatus1DivEmpty"},secondStatus:{domRef:":sap-domref .sapMObjLStatus2DivEmpty"},attributes:{domRef:":sap-domref .sapMObjLAttrDivEmpty"}}};},false);
sap.ui.predefine('sap/m/designtime/ObjectMarker.designtime',[],function(){"use strict";return{palette:{group:"DISPLAY",icons:{svg:"sap/m/designtime/ObjectMarker.icon.svg"}},templates:{create:"sap/m/designtime/ObjectMarker.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/ObjectNumber.designtime',[],function(){"use strict";return{palette:{group:"DISPLAY",icons:{svg:"sap/m/designtime/ObjectNumber.icon.svg"}},templates:{create:"sap/m/designtime/ObjectNumber.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/ObjectStatus.designtime',[],function(){"use strict";return{palette:{group:"DISPLAY",icons:{svg:"sap/m/designtime/ObjectStatus.icon.svg"}},templates:{create:"sap/m/designtime/ObjectStatus.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/OverflowToolbar.designtime',[],function(){"use strict";return{templates:{create:"sap/m/designtime/OverflowToolbar.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/Page.designtime',[],function(){"use strict";return{palette:{group:"CONTAINER",icons:{svg:"sap/m/designtime/Page.icon.svg"}},actions:{rename:function(p){if(p.getCustomHeader()){return;}return{changeType:"rename",domRef:function(c){return c.$("title-inner")[0];}};}},aggregations:{headerContent:{domRef:":sap-domref > .sapMPageHeader .sapMBarRight",actions:{move:"moveControls"}},subHeader:{domRef:":sap-domref > .sapMPageSubHeader"},customHeader:{domRef:":sap-domref > .sapMPageHeader"},content:{domRef:":sap-domref > section",actions:{move:"moveControls"}},footer:{domRef:":sap-domref > .sapMPageFooter"},landmarkInfo:{ignore:true}},name:{singular:"PAGE_NAME",plural:"PAGE_NAME_PLURAL"},templates:{create:"sap/m/designtime/Page.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/Panel.designtime',[],function(){"use strict";return{name:{singular:"PANEL_NAME",plural:"PANEL_NAME_PLURAL"},palette:{group:"CONTAINER",icons:{svg:"sap/m/designtime/Panel.icon.svg"}},actions:{remove:{changeType:"hideControl"},rename:function(p){if(p.getHeaderToolbar()){return;}return{changeType:"rename",domRef:".sapMPanelHdr"};},reveal:{changeType:"unhideControl",getLabel:function(c){var l,h=c.getHeaderToolbar();if(h&&h.getTitleControl()){l=h.getTitleControl().getText();}else{l=c.getHeaderText();}return l||c.getId();}}},aggregations:{headerToolbar:{domRef:":sap-domref > .sapMPanelHeaderTB, :sap-domref > .sapMPanelWrappingDivTb .sapMPanelHeaderTB, :sap-domref > .sapUiDtEmptyHeader"},infoToolbar:{domRef:":sap-domref > .sapMPanelInfoTB, :sap-domref > .sapUiDtEmptyInfoToolbar"},content:{domRef:":sap-domref > .sapMPanelContent",show:function(){this.setExpanded(true);},actions:{move:"moveControls"}}},templates:{create:"sap/m/designtime/Panel.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/PlanningCalendar.designtime',[],function(){"use strict";return{name:{singular:"PLANNINGCALENDAR_NAME",plural:"PLANNINGCALENDAR_NAME_PLURAL"},palette:{group:"DISPLAY",icons:{svg:"sap/m/designtime/PlanningCalendar.icon.svg"}},templates:{create:"sap/m/designtime/PlanningCalendar.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/PlanningCalendarLegend.designtime',[],function(){"use strict";return{name:{singular:"PLANNINGCALENDARLEGEND_NAME",plural:"PLANNINGCALENDARLEGEND_NAME_PLURAL"},palette:{group:"DISPLAY",icons:{svg:"sap/m/designtime/PlanningCalendarLegend.icon.svg"}},templates:{create:"sap/m/designtime/PlanningCalendarLegend.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/Popover.designtime',[],function(){"use strict";return{actions:{rename:function(p){if(p.getCustomHeader()){return;}return{changeType:"rename",domRef:function(p){return p.getDomRef("title");}};}},aggregations:{content:{domRef:":sap-domref > .sapMPopoverCont",actions:{move:"moveControls"}},customHeader:{domRef:":sap-domref > .sapMPopoverHeader"},subHeader:{domRef:":sap-domref > .sapMPopoverSubHeader"},footer:{domRef:":sap-domref > .sapMPopoverFooter"},beginButton:{domRef:":sap-domref > header.sapMPopoverHeader .sapMBarLeft"},endButton:{domRef:":sap-domref > header.sapMPopoverHeader .sapMBarRight"}}};},false);
sap.ui.predefine('sap/m/designtime/ProgressIndicator.designtime',[],function(){"use strict";return{palette:{group:"DISPLAY",icons:{svg:"sap/m/designtime/ProgressIndicator.icon.svg"}},templates:{create:"sap/m/designtime/ProgressIndicator.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/QuickView.designtime',[],function(){"use strict";return{name:{singular:"QUICK_VIEW_NAME",plural:"QUICK_VIEW_NAME_PLURAL"},palette:{group:"DISPLAY"}};},false);
sap.ui.predefine('sap/m/designtime/QuickViewCard.designtime',[],function(){"use strict";return{name:{singular:"QUICK_VIEW_CARD_NAME",plural:"QUICK_VIEW_CARD_NAME_PLURAL"},palette:{group:"DISPLAY"}};},false);
sap.ui.predefine('sap/m/designtime/RadioButton.designtime',[],function(){"use strict";return{name:{singular:"RADIOBUTTON_NAME",plural:"RADIOBUTTON_NAME_PLURAL"},palette:{group:"INPUT",icons:{svg:"sap/m/designtime/RadioButton.icon.svg"}},actions:{remove:{changeType:"hideControl"},rename:{changeType:"rename",domRef:function(c){return c.$().find(".sapMRbBLabel")[0];}},reveal:{changeType:"unhideControl"}},templates:{create:"sap/m/designtime/RadioButton.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/RadioButtonGroup.designtime',[],function(){"use strict";return{name:{singular:"RADIO_BUTTON_GROUP_NAME",plural:"RADIO_BUTTON_GROUP_NAME_PLURAL"},palette:{group:"INPUT",icons:{svg:"sap/m/designtime/RadioButtonGroup.icon.svg"}},templates:{create:"sap/m/designtime/RadioButtonGroup.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/RangeSlider.designtime',[],function(){"use strict";return{palette:{group:"INPUT"},templates:{create:"sap/m/designtime/RangeSlider.create.fragment.xml"},name:{singular:"RANGESLIDER_NAME",plural:"RANGESLIDER_NAME_PLURAL"}};},false);
sap.ui.predefine('sap/m/designtime/RatingIndicator.designtime',[],function(){"use strict";return{name:{singular:"RATINGINDICATOR_NAME",plural:"RATINGINDICATOR_NAME_PLURAL"},palette:{group:"INPUT",icons:{svg:"sap/m/designtime/RatingIndicator.icon.svg"}},actions:{remove:{changeType:"hideControl"},reveal:{changeType:"unhideControl"}},templates:{create:"sap/m/designtime/RatingIndicator.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/ScrollContainer.designtime',[],function(){"use strict";return{palette:{group:"CONTAINER",icons:{svg:"sap/m/designtime/ScrollContainer.icon.svg"}},actions:{remove:{changeType:"hideControl"},reveal:{changeType:"unhideControl"}},aggregations:{content:{domRef:":sap-domref",actions:{move:"moveControls"}}},name:{singular:"SCROLL_CONTAINER_CONTROL_NAME",plural:"SCROLL_CONTAINER_CONTROL_NAME_PLURAL"}};},false);
sap.ui.predefine('sap/m/designtime/SearchField.designtime',[],function(){"use strict";return{name:{singular:"SEARCH_FIELD_NAME",plural:"SEARCH_FIELD_NAME_PLURAL"},palette:{group:"INPUT",icons:{svg:"sap/m/designtime/SearchField.icon.svg"}},templates:{create:"sap/m/designtime/SearchField.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/SegmentedButton.designtime',[],function(){"use strict";return{palette:{group:"ACTION",icons:{svg:"sap/m/designtime/SegmentedButton.icon.svg"}},templates:{create:"sap/m/designtime/SegmentedButton.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/Select.designtime',[],function(){"use strict";return{palette:{group:"INPUT",icons:{svg:"sap/m/designtime/Select.icon.svg"}},aggregations:{items:{domRef:":sap-domref"}},templates:{create:"sap/m/designtime/Select.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/Slider.designtime',[],function(){"use strict";return{name:{singular:"SLIDER_NAME",plural:"SLIDER_NAME_PLURAL"},palette:{group:"INPUT",icons:{svg:"sap/m/designtime/Slider.icon.svg"}},actions:{remove:{changeType:"hideControl"},reveal:{changeType:"unhideControl"}},aggregations:{scale:{domRef:":sap-domref > .sapMSliderTickmarks"},customTooltips:{ignore:true}},templates:{create:"sap/m/designtime/Slider.create.fragment.xml"}};},true);
sap.ui.predefine('sap/m/designtime/SplitApp.designtime',[],function(){"use strict";return{name:{singular:"SPLIT_APP_NAME",plural:"SPLIT_APP_NAME_PLURAL"},palette:{group:"CONTAINER"}};},false);
sap.ui.predefine('sap/m/designtime/SplitContainer.designtime',[],function(){"use strict";return{name:{singular:"SPLIT_CONTAINER_NAME",plural:"SPLIT_CONTAINER_NAME_PLURAL"},palette:{group:"CONTAINER"},aggregations:{masterPages:{domRef:":sap-domref > .sapMSplitContainerMaster, :sap-domref > .sapMSplitContainerMobile"},detailPages:{domRef:":sap-domref > .sapMSplitContainerDetail"}}};},false);
sap.ui.predefine('sap/m/designtime/StandardListItem.designtime',[],function(){"use strict";return{actions:{rename:{changeType:"rename",domRef:function(c){return c.$().find(".sapMLIBContent > .sapMSLITitleDiv > .sapMSLITitleOnly")[0]||c.$().find(".sapMLIBContent > .sapMSLIDiv > .sapMSLITitleDiv > .sapMSLITitle")[0];}}}};},false);
sap.ui.predefine('sap/m/designtime/StepInput.designtime',[],function(){"use strict";return{palette:{group:"INPUT",icons:{svg:"sap/m/designtime/StepInput.icon.svg"}},templates:{create:"sap/m/designtime/StepInput.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/Switch.designtime',[],function(){"use strict";return{palette:{group:"ACTION",icons:{svg:"sap/m/designtime/Switch.icon.svg"}},templates:{create:"sap/m/designtime/Switch.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/TabContainer.designtime',[],function(){"use strict";return{name:{singular:"TABCONTAINER_NAME",plural:"TABCONTAINER_NAME_PLURAL"},palette:{group:"CONTAINER"},templates:{create:"sap/m/designtime/TabContainer.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/Table.designtime',["sap/ui/fl/changeHandler/ChangeHandlerMediator"],function(C){"use strict";var c=function(t){return!!(t&&t._hasTablePersoController&&t._hasTablePersoController());};return{name:{singular:"TABLE_NAME",plural:"TABLE_NAME_PLURAL"},palette:{group:"LIST",icons:{svg:"sap/m/designtime/Table.icon.svg"}},aggregations:{columns:{propagateMetadata:function(e){if(e.isA("sap.m.Column")&&c(e.getParent())){return{actions:null};}},childNames:{singular:"COLUMN_NAME",plural:"COLUMN_NAME_PLURAL"},domRef:":sap-domref .sapMListTblHeader",actions:{move:function(o){return c(o.getParent())?null:"moveTableColumns";},addODataProperty:function(t){var m=C.getAddODataFieldSettings(t);if(m&&!c(t)){return{changeType:"addTableColumn",changeHandlerSettings:m};}}}},items:{domRef:":sap-domref .sapMListItems"},contextMenu:{ignore:true}}};},false);
sap.ui.predefine('sap/m/designtime/Text.designtime',[],function(){"use strict";return{name:{singular:"TEXT_NAME",plural:"TEXT_NAME_PLURAL"},palette:{group:"DISPLAY",icons:{svg:"sap/m/designtime/Text.icon.svg"}},actions:{remove:{changeType:"hideControl"},rename:{changeType:"rename",domRef:function(c){return c.$()[0];}},reveal:{changeType:"unhideControl"}},templates:{create:"sap/m/designtime/Text.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/TextArea.designtime',[],function(){"use strict";return{palette:{group:"INPUT",icons:{svg:"sap/m/designtime/TextArea.icon.svg"}},templates:{create:"sap/m/designtime/TextArea.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/TimePicker.designtime',[],function(){"use strict";return{palette:{group:"INPUT",icons:{svg:"sap/m/designtime/TimePicker.icon.svg"}},templates:{create:"sap/m/designtime/TimePicker.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/Title.designtime',[],function(){"use strict";return{name:{singular:"TITLE_NAME",plural:"TITLE_NAME_PLURAL"},palette:{group:"DISPLAY",icons:{svg:"sap/m/designtime/Title.icon.svg"}},actions:{remove:{changeType:"hideControl"},rename:{changeType:"rename",domRef:function(c){return c.$().find("span")[0];}},reveal:{changeType:"unhideControl"}},templates:{create:"sap/m/designtime/Title.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/ToggleButton.designtime',[],function(){"use strict";return{palette:{group:"ACTION",icons:{svg:"sap/m/designtime/ToggleButton.icon.svg"}},templates:{create:"sap/m/designtime/ToggleButton.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/Toolbar.designtime',[],function(){"use strict";return{aggregations:{content:{domRef:":sap-domref",actions:{move:"moveControls"}}},templates:{create:"sap/m/designtime/Toolbar.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/VBox.designtime',[],function(){"use strict";return{name:{singular:"VBOX_NAME",plural:"VBOX_NAME_PLURAL"},palette:{group:"LAYOUT",icons:{svg:"sap/m/designtime/VBox.icon.svg"}},templates:{create:"sap/m/designtime/VBox.create.fragment.xml"}};},false);
sap.ui.predefine('sap/m/designtime/Wizard.designtime',[],function(){"use strict";return{palette:{group:"CONTAINER"},templates:{create:"sap/m/designtime/Wizard.create.fragment.xml"},name:{singular:"WIZARD_NAME",plural:"WIZARD_NAME_PLURAL"}};},false);
sap.ui.predefine('sap/m/designtime/library.designtime',[],function(){"use strict";return{};});
sap.ui.predefine('sap/m/designtime/semantic/DetailPage.designtime',[],function(){"use strict";return{aggregations:{content:{domRef:":sap-domref > .sapMPage > section"}}};},false);
sap.ui.predefine('sap/m/designtime/semantic/SemanticPage.designtime',[],function(){"use strict";return{aggregations:{content:{domRef:":sap-domref > .sapMPage > section"}}};},false);
sap.ui.predefine('sap/m/designtime/semantic/ShareMenuPage.designtime',[],function(){"use strict";return{aggregations:{content:{domRef:":sap-domref > .sapMPage > section"}}};},false);
//# sourceMappingURL=library-preload.designtime.js.map