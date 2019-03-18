/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine('sap/ui/layout/designtime/BlockLayout.designtime',[],function(){"use strict";return{palette:{group:"LAYOUT",icons:{svg:"sap/ui/layout/designtime/BlockLayout.icon.svg"}},aggregations:{content:{domRef:":sap-domref",actions:{move:"moveControls"}}}};},false);
sap.ui.predefine('sap/ui/layout/designtime/BlockLayoutCell.designtime',[],function(){"use strict";return{aggregations:{content:{domRef:":sap-domref",actions:{move:"moveControls"}}},actions:{remove:{changeType:"hideControl"},rename:{changeType:"rename",domRef:function(c){return c.$().find(".sapUiBlockCellTitle")[0];}},reveal:{changeType:"unhideControl"}}};},false);
sap.ui.predefine('sap/ui/layout/designtime/BlockLayoutRow.designtime',[],function(){"use strict";return{aggregations:{content:{domRef:":sap-domref",actions:{move:"moveControls"}}},actions:{remove:{changeType:"hideControl"},reveal:{changeType:"unhideControl"}}};},false);
sap.ui.predefine('sap/ui/layout/designtime/DynamicSideContent.designtime',[],function(){"use strict";return{aggregations:{mainContent:{domRef:":sap-domref > div",actions:{move:"moveControls"}},sideContent:{domRef:":sap-domref > [id$='SCGridCell']",actions:{move:"moveControls"}}},actions:{remove:{changeType:"hideControl"},reveal:{changeType:"unhideControl"}}};},false);
sap.ui.predefine('sap/ui/layout/designtime/FixFlex.designtime',[],function(){"use strict";return{aggregations:{fixContent:{domRef:":sap-domref > .sapUiFixFlexFixed",actions:{move:"moveControls"}},flexContent:{domRef:":sap-domref > .sapUiFixFlexFlexible"}},actions:{remove:{changeType:"hideControl"},reveal:{changeType:"unhideControl"}}};},false);
sap.ui.predefine('sap/ui/layout/designtime/Grid.designtime',[],function(){"use strict";return{actions:{remove:{changeType:"hideControl"},reveal:{changeType:"unhideControl"}},aggregations:{content:{domRef:":sap-domref",actions:{move:"moveControls"}}},name:{singular:"GRID_CONTROL_NAME",plural:"GRID_CONTROL_NAME_PLURAL"}};},false);
sap.ui.predefine('sap/ui/layout/designtime/HorizontalLayout.designtime',[],function(){"use strict";return{name:{singular:"HORIZONTAL_LAYOUT_CONTROL_NAME",plural:"HORIZONTAL_LAYOUT_CONTROL_NAME_PLURAL"},palette:{group:"LAYOUT",icons:{svg:"sap/ui/layout/designtime/HorizontalLayout.icon.svg"}},aggregations:{content:{domRef:":sap-domref",actions:{move:"moveControls"}}},actions:{remove:{changeType:"hideControl"},reveal:{changeType:"unhideControl"}}};},false);
sap.ui.predefine('sap/ui/layout/designtime/Splitter.designtime',[],function(){"use strict";return{aggregations:{contentAreas:{domRef:":sap-domref",actions:{move:"moveControls"}}},actions:{remove:{changeType:"hideControl"},reveal:{changeType:"unhideControl"}}};},false);
sap.ui.predefine('sap/ui/layout/designtime/VerticalLayout.designtime',[],function(){"use strict";return{name:{singular:"VERTICAL_LAYOUT_CONTROL_NAME",plural:"VERTICAL_LAYOUT_NAME_PLURAL"},palette:{group:"LAYOUT",icons:{svg:"sap/ui/layout/designtime/VerticalLayout.icon.svg"}},actions:{remove:{changeType:"hideControl"},reveal:{changeType:"unhideControl"}},aggregations:{content:{domRef:":sap-domref",actions:{move:"moveControls"}}}};},false);
sap.ui.predefine('sap/ui/layout/designtime/form/Form.designtime',['sap/ui/layout/form/Form'],function(F){"use strict";
function i(f){if((f instanceof F)&&f.getLayout()&&f.getLayout().getMetadata().getName()==="sap.ui.layout.form.GridLayout"){return false;}return true;}
return{palette:{group:"LAYOUT",icons:{svg:"sap/ui/layout/designtime/form/Form.icon.svg"}},aggregations:{title:{ignore:true},toolbar:{ignore:function(f){return!f.getToolbar();},domRef:function(f){return f.getToolbar().getDomRef();}},formContainers:{childNames:{singular:"GROUP_CONTROL_NAME",plural:"GROUP_CONTROL_NAME_PLURAL"},domRef:":sap-domref",actions:{move:function(f){if(i(f)){return"moveControls";}else{return null;}},createContainer:function(f){if(i(f)){return{changeType:"addGroup",isEnabled:true,getCreatedContainerId:function(n){return n;}};}else{return null;}}}}}};},false);
sap.ui.predefine('sap/ui/layout/designtime/form/FormContainer.designtime',['sap/ui/fl/changeHandler/ChangeHandlerMediator',"sap/ui/thirdparty/jquery",'sap/ui/layout/form/Form'],function(C,q,F){"use strict";
function _(o){return o.getFormElements().every(function(a){return a.getVisible()===false;});}
function f(e){if(e&&!(e instanceof F)){return f(e.getParent());}return e;}
function i(o){var a=f(o);if(a&&a.getLayout()&&a.getLayout().getMetadata().getName()==="sap.ui.layout.form.GridLayout"){return false;}return true;}
return{palette:{group:"LAYOUT",icons:{svg:"sap/ui/layout/designtime/form/FormContainer.icon.svg"}},isVisible:function(o){return o.isVisible();},actions:{remove:function(o){if(i(o)){return{changeType:"hideControl"};}else{return null;}},rename:function(o){if(i(o)){return{changeType:"renameGroup",domRef:function(o){if(!o.getRenderedDomRef()){var t=o.getTitle()||o.getToolbar();return t.getDomRef();}return q(o.getRenderedDomRef()).find(".sapUiFormTitle")[0];},isEnabled:function(o){return!(o.getToolbar()||!o.getTitle());}};}else{return null;}}},aggregations:{formElements:{childNames:{singular:"FIELD_CONTROL_NAME",plural:"FIELD_CONTROL_NAME_PLURAL"},domRef:function(o){var d=o.getRenderedDomRef();var h=o.getTitle()||o.getToolbar();if(d){return d;}if(o.getFormElements().length===0||_(o)){if(h instanceof sap.ui.core.Element){return h.getDomRef();}if(typeof h==="string"){return q(d).find(".sapUiFormTitle").get(0);}}return undefined;},actions:{move:function(o){if(i(o)){return{changeType:"moveControls"};}else{return null;}},addODataProperty:function(o){if(i(o)){var c=C.getAddODataFieldWithLabelSettings(o);if(c){return{changeType:"addFormField",changeOnRelevantContainer:true,changeHandlerSettings:c};}}else{return null;}}}},toolbar:{domRef:function(o){var t=o.getToolbar();if(t){return t.getDomRef();}}}},name:{singular:"GROUP_CONTROL_NAME",plural:"GROUP_CONTROL_NAME_PLURAL"}};},false);
sap.ui.predefine('sap/ui/layout/designtime/form/FormElement.designtime',['sap/ui/layout/form/Form','sap/ui/layout/form/FormContainer','sap/ui/layout/form/ResponsiveGridLayout'],function(F,a,R){"use strict";
function f(e){if(e&&!(e instanceof F)){return f(e.getParent());}return e;}
function i(o){var b=f(o);if(b&&b.getLayout()&&b.getLayout().getMetadata().getName()==="sap.ui.layout.form.GridLayout"){return false;}return true;}
return{palette:{group:"LAYOUT",icons:{svg:"sap/ui/layout/designtime/form/FormElement.icon.svg"}},isVisible:function(o){return o.isVisible();},domRef:function(o){var p=o.getParent();if(p instanceof a){p=p.getParent();if(p instanceof F){var l=p.getLayout();if(l instanceof R){var b=o.getFields();var L=o.getLabelControl();if(L){b.unshift(L);}return b.filter(function(e){return e.getDomRef&&e.getDomRef();}).map(function(e){var d=e.getDomRef();return d.parentNode;});}}}},actions:{remove:function(o){if(i(o)){return{changeType:"hideControl"};}else{return null;}},rename:function(o){if(i(o)){return{changeType:"renameField",domRef:function(c){return c.getLabelControl().getDomRef();}};}else{return null;}},reveal:function(o){if(i(o)){return{changeType:"unhideControl"};}else{return null;}}},name:{singular:"FIELD_CONTROL_NAME",plural:"FIELD_CONTROL_NAME_PLURAL"}};},false);
sap.ui.predefine('sap/ui/layout/designtime/form/SimpleForm.designtime',["sap/ui/fl/changeHandler/ChangeHandlerMediator"],function(C){"use strict";var g=function(e){var s=[];var l;var t;if(e.getMetadata().getName()==="sap.ui.layout.form.FormElement"){l=e.getLabel();if(l){s.push(l);}s=s.concat(e.getFields());}else if(e.getMetadata().getName()==="sap.ui.layout.form.FormContainer"){t=e.getTitle()||e.getToolbar();if(t){s[0]=t;}e.getFormElements().forEach(function(a){l=a.getLabel();if(l){s.push(l);}s=s.concat(a.getFields());});}else if(e.getMetadata().getName()==="sap.ui.layout.form.Form"){s.push(e);}return s;};var f={aggregations:{formContainers:{childNames:{singular:"GROUP_CONTROL_NAME",plural:"GROUP_CONTROL_NAME_PLURAL"},getIndex:function(a,b){var c=a.getFormContainers();if(b){return c.indexOf(b)+1;}if(c.length>0&&c[0].getFormElements().length===0&&c[0].getTitle()===null){return 0;}return c.length;},beforeMove:function(s){if(s){s._bChangedByMe=true;}},afterMove:function(s){if(s){s._bChangedByMe=false;}},actions:{move:{changeType:"moveSimpleFormGroup"},createContainer:{changeType:"addSimpleFormGroup",changeOnRelevantContainer:true,isEnabled:function(a){var b=a.getFormContainers();for(var i=0;i<b.length;i++){if(b[i].getToolbar&&b[i].getToolbar()){return false;}}return true;},getCreatedContainerId:function(n){var t=sap.ui.getCore().byId(n);var p=t.getParent().getId();return p;}}}}},getStableElements:g};var F={name:{singular:"GROUP_CONTROL_NAME",plural:"GROUP_CONTROL_NAME_PLURAL"},aggregations:{formElements:{childNames:{singular:"FIELD_CONTROL_NAME",plural:"FIELD_CONTROL_NAME_PLURAL"},beforeMove:function(s){if(s){s._bChangedByMe=true;}},afterMove:function(s){if(s){s._bChangedByMe=false;}},actions:{move:{changeType:"moveSimpleFormField"},addODataProperty:function(a){var c=C.getAddODataFieldWithLabelSettings(a);if(c){return{changeType:"addSimpleFormField",changeOnRelevantContainer:true,changeHandlerSettings:c};}}}}},actions:{rename:function(r){return{changeType:"renameTitle",changeOnRelevantContainer:true,isEnabled:!(r.getToolbar()||!r.getTitle()),domRef:function(c){if(c.getTitle&&c.getTitle()){return c.getTitle().getDomRef();}}};},remove:function(r){return{changeType:"removeSimpleFormGroup",changeOnRelevantContainer:true,isEnabled:!!(r.getToolbar()||r.getTitle()),getConfirmationText:function(r){var c=false;if(r.getMetadata().getName()==="sap.ui.layout.form.FormContainer"&&r.getToolbar&&r.getToolbar()){var t=r.getToolbar().getContent();if(t.length>1){c=true;}else if((t.length===1)&&(!t[0].getMetadata().isInstanceOf("sap.ui.core.Label")&&!t[0]instanceof sap.ui.core.Title&&!t[0]instanceof sap.m.Title)){c=true;}}if(c){var T=sap.ui.getCore().getLibraryResourceBundle("sap.ui.layout.designtime");return T.getText("MSG_REMOVING_TOOLBAR");}}};}},getStableElements:g};var o={name:{singular:"FIELD_CONTROL_NAME",plural:"FIELD_CONTROL_NAME_PLURAL"},actions:{rename:{changeType:"renameLabel",changeOnRelevantContainer:true,domRef:function(c){return c.getLabel().getDomRef();}},remove:{changeType:"hideSimpleFormField",changeOnRelevantContainer:true},reveal:{changeType:"unhideSimpleFormField",changeOnRelevantContainer:true}},getStableElements:g};return{palette:{group:"LAYOUT",icons:{svg:"sap/ui/layout/designtime/form/SimpleForm.icon.svg"}},aggregations:{content:{ignore:true},title:{ignore:true},toolbar:{ignore:function(s){return!s.getToolbar();},domRef:function(s){return s.getToolbar().getDomRef();}},form:{ignore:false,propagateMetadata:function(e){var t=e.getMetadata().getName();if(t==="sap.ui.layout.form.Form"){return f;}else if(t==="sap.ui.layout.form.FormContainer"){return F;}else if(t==="sap.ui.layout.form.FormElement"){return o;}else{return{actions:null};}},propagateRelevantContainer:true}}};},false);
sap.ui.predefine('sap/ui/layout/designtime/library.designtime',[],function(){"use strict";return{};});
//# sourceMappingURL=library-preload.designtime.js.map