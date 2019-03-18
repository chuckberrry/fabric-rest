jQuery.sap.registerPreloadedModules({version:"2.0",name:"aqismockup/aqismockup/Component-preload",modules:{"aqismockup/aqismockup/Component.js":'sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","aqismockup/aqismockup/model/models"],function(e,i,t){"use strict";return e.extend("aqismockup.aqismockup.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments),this.getRouter().initialize(),this.setModel(t.createDeviceModel(),"device")}})});',"aqismockup/aqismockup/controller/View1.controller.js":'sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel"],function(t,e){"use strict";return t.extend("aqismockup.aqismockup.controller.View1",{onInit:function(){var t=new e;this.getView().setModel(t),this.loadData(t)},onAfterRendering:function(){this.startCountdown()},loadData:function(t){t.setProperty("/currentDate",new Date),t.setProperty("/countDownTime",31),t.setProperty("/progress",100),t.setProperty("/ziel",18),t.setProperty("/soll",2),t.setProperty("/ist",2),t.setProperty("/info","100 038 06 59 - Rahmen kpl. 351 ROH")},startCountdown:function(){var t=this,e=this,o=new Date,r=o.getTime();this.intervalHandle=setInterval(function(){t.setTimer(r),e.getView().getModel().setProperty("/currentDate",o)},1e3)},setTimer:function(t){var e=this.getView().getModel(),o=(new Date).getTime(),r=6e4*e.getProperty("/countDownTime"),n=t+r,i=n-o,s=100*i/r,a=Math.floor(i%36e5/6e4),u=Math.floor(i%6e4/1e3);if(i<0)return e.setProperty("/countDown","00:00"),void e.setProperty("/progress",0);1===a.toString().length&&(a="0"+a),1===u.toString().length&&(u="0"+u),e.setProperty("/countDown",a.toString()+":"+u.toString()),e.setProperty("/progress",s)}})});',"aqismockup/aqismockup/model/models.js":'sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);return i.setDefaultBindingMode("OneWay"),i}}});',"aqismockup/aqismockup/test/integration/AllJourneys.js":'sap.ui.define(["sap/ui/test/Opa5","./arrangements/Startup","./NavigationJourney"],function(a,e){"use strict";a.extendConfig({arrangements:new e,viewNamespace:"aqismockup.aqismockup.view.",autoWait:!0})});',"aqismockup/aqismockup/test/integration/arrangements/Startup.js":'sap.ui.define(["sap/ui/test/Opa5"],function(t){"use strict";return t.extend("aqismockup.aqismockup.test.integration.arrangements.Startup",{iStartMyApp:function(t){var a=t||{};a.delay=a.delay||50,this.iStartMyUIComponent({componentConfig:{name:"aqismockup.aqismockup",async:!0},hash:a.hash,autoWait:a.autoWait})}})});',"aqismockup/aqismockup/test/integration/NavigationJourney.js":'sap.ui.define(["sap/ui/test/opaQunit","./pages/View1"],function(e){"use strict";QUnit.module("Navigation Journey"),e("Should see the initial page of the app",function(e,i,p){e.iStartMyApp(),p.onTheAppPage.iShouldSeeTheApp(),p.iTeardownMyApp()})});',"aqismockup/aqismockup/test/integration/opaTests.qunit.js":'QUnit.config.autostart=!1,sap.ui.getCore().attachInit(function(){"use strict";sap.ui.require(["aqismockup/aqismockup/test/integration/AllJourneys"],function(){QUnit.start()})});',"aqismockup/aqismockup/test/integration/pages/View1.js":'sap.ui.define(["sap/ui/test/Opa5"],function(e){"use strict";e.createPageObjects({onTheAppPage:{actions:{},assertions:{iShouldSeeTheApp:function(){return this.waitFor({id:"app",viewName:"View1",success:function(){e.assert.ok(!0,"The View1 view is displayed")},errorMessage:"Did not find the View1 view"})}}}})});',"aqismockup/aqismockup/test/testsuite.qunit.js":'window.suite=function(){"use strict";var t=new parent.jsUnitTestSuite,n=location.pathname.substring(0,location.pathname.lastIndexOf("/")+1);return t.addTestPage(n+"unit/unitTests.qunit.html"),t.addTestPage(n+"integration/opaTests.qunit.html"),t};',"aqismockup/aqismockup/test/unit/AllTests.js":'sap.ui.define(["aqismockup/aqismockup/test/unit/controller/View1.controller"],function(){"use strict"});',"aqismockup/aqismockup/test/unit/controller/View1.controller.js":'sap.ui.define(["aqismockup/aqismockup/controller/View1.controller"],function(o){"use strict";QUnit.module("View1 Controller"),QUnit.test("I should test the View1 controller",function(t){var e=new o;e.onInit(),t.ok(e)})});',"aqismockup/aqismockup/test/unit/unitTests.qunit.js":'QUnit.config.autostart=!1,sap.ui.getCore().attachInit(function(){"use strict";sap.ui.require(["aqismockup/aqismockup/test/unit/AllTests"],function(){QUnit.start()})});',"aqismockup/aqismockup/view/View1.view.xml":'<mvc:View controllerName="aqismockup.aqismockup.controller.View1" xmlns:l="sap.ui.layout" xmlns:grid="sap.ui.layout.cssgrid"\n\txmlns:core="sap.ui.core" xmlns:mvc="sap.ui.core.mvc" xmlns:si="sap.suite.ui.commons.statusindicator" displayBlock="true" xmlns="sap.m"><Shell id="shell"><App id="app"><pages><Page id="page" showHeader="false" class="page"><content><HBox alignItems="Center" alignContent="Center" justifyContent="SpaceBetween" class="sapUiSmallMargin"><VBox><Text text="{ path: \'/currentDate\', type: \'sap.ui.model.type.Time\', formatOptions: { style: \'short\', pattern: \'HH:mm\' } }"\n\t\t\t\t\t\t\t\t\tclass="headerLabel"/><Text text="{ path: \'/currentDate\', type: \'sap.ui.model.type.Date\', formatOptions: { pattern: \'dd.MM.yyyy\' } }" class="white"/><layoutData><FlexItemData growFactor="2"/></layoutData></VBox><Label textAlign="Center" text="Radlader - HM Rahmen" class="headerLabel"><layoutData><FlexItemData growFactor="1" alignSelf="Center"/></layoutData></Label><VBox class="demoBox"><Image src="img/logo.png" width="60%"/></VBox></HBox><Label text=" " class="big"></Label><grid:CSSGrid id="grid1" gridTemplateColumns="45% 5% 45%" gridTemplateRows="13rem" gridGap="1rem" class="sapUiSmallMargin"><grid:items><VBox alignContent="Center" justifyContent="Center" class="demoBox"><Text text="Aktuell" class="headerLabel" textAlign="Center"><layoutData><FlexItemData alignSelf="Center"/></layoutData></Text><Text text="{/countDown}" class="big" textAlign="Center"><layoutData><FlexItemData alignSelf="Center"/></layoutData></Text><Text text="Taktzeit 31 Minuten" class="headerLabel" textAlign="Center"><layoutData><FlexItemData alignSelf="Center"/></layoutData></Text></VBox><VBox alignContent="Center" justifyContent="Center" class="demoBox"><si:StatusIndicator id="indicator" value="{/progress}" width="auto" height="208px" class="sapUiSmallMargin"><si:ShapeGroup><si:Rectangle x="0" y="0" width="100" height="208" strokeWidth="1" fillingType="Linear"/></si:ShapeGroup><si:propertyThresholds><si:PropertyThreshold fillColor="Critical" toValue="40"/><si:PropertyThreshold fillColor="Error" toValue="20"/><si:PropertyThreshold fillColor="#17816A" toValue="100"/></si:propertyThresholds></si:StatusIndicator></VBox><VBox alignContent="Center" class="demoBox"><Text text="Stückzahlen" class="headerLabel" textAlign="Center"><layoutData><FlexItemData alignSelf="Center"/></layoutData></Text><Text text=" Ziel &#x9;      Soll &#x9;        Ist" class="headerLabel" renderWhitespace="true"><layoutData><FlexItemData alignSelf="Center"/></layoutData></Text><Text text="{/ziel} / {/soll} / {/ist}" class="big" renderWhitespace="true"><layoutData><FlexItemData alignSelf="Center"/></layoutData></Text></VBox></grid:items></grid:CSSGrid><VBox alignItems="Center" alignContent="Center" justifyContent="Center"><HBox height="100px" alignItems="End" alignContent="Center" justifyContent="SpaceBetween" width="70%"><items><Text text="HM 00" class="headerLabel" width = "120px" textAlign = "Center"/><Text text="HM 01" class="headerLabel" width = "120px" textAlign = "Center"/><Text text="HM 02" class="headerLabel" width = "120px" textAlign = "Center"/><Text text="HM 03" class="headerLabel" width = "120px" textAlign = "Center"/><Text text="HM 04" class="headerLabel" width = "120px" textAlign = "Center"/><Text text="HM 05" class="headerLabel" width = "120px" textAlign = "Center"/></items></HBox><HBox height="100px" alignItems="Center" alignContent="Center" justifyContent="SpaceBetween" width="70%"><items><VBox alignContent="Center" justifyContent="Center" class="standardBox" height = "80%" width = "120px"/><VBox alignContent="Center" justifyContent="Center" class="standardBox" height = "80%" width = "120px"/><VBox alignContent="Center" justifyContent="Center" class="standardBox" height = "80%" width = "120px"/><VBox alignContent="Center" justifyContent="Center" class="lightningBox" height = "80%" width = "120px"><Text text="Logistik"></Text></VBox><VBox alignContent="Center" justifyContent="Center" class="standardBox" height = "80%" width = "120px"/><VBox alignContent="Center" justifyContent="Center" class="standardBox" height = "80%" width = "120px"/></items></HBox></VBox><HBox class="sapUiSmallMargin" alignContent="Center" justifyContent="Center"><HBox class="demoBox" alignContent="Center" justifyContent="Center" width="75%"><Text text="{/info}" class="headerLabel" textAlign="Center"></Text></HBox></HBox></content></Page></pages></App></Shell></mvc:View>',"aqismockup/aqismockup/i18n/i18n.properties":"title=Title\nappTitle=aqismockup\nappDescription=App Description","aqismockup/aqismockup/manifest.json":'{"_version":"1.8.0","sap.app":{"id":"aqismockup.aqismockup","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"1.0.0"},"title":"{{appTitle}}","description":"{{appDescription}}","sourceTemplate":{"id":"ui5template.basicSAPUI5ApplicationProject","version":"1.40.12"}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"rootView":{"viewName":"aqismockup.aqismockup.view.View1","type":"XML","async":true,"id":"View1"},"dependencies":{"minUI5Version":"1.60.1","libs":{"sap.ui.layout":{},"sap.ui.core":{},"sap.m":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"aqismockup.aqismockup.i18n.i18n"}}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","async":true,"viewPath":"aqismockup.aqismockup.view","controlAggregation":"pages","controlId":"app","clearControlAggregation":false},"routes":[{"name":"RouteView1","pattern":"RouteView1","target":["TargetView1"]}],"targets":{"TargetView1":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"View1","viewName":"View1"}}}}}'}});