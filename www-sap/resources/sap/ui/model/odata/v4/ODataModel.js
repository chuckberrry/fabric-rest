/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ODataContextBinding","./ODataListBinding","./ODataMetaModel","./ODataPropertyBinding","./SubmitMode","./lib/_GroupLock","./lib/_Helper","./lib/_MetadataRequestor","./lib/_Parser","./lib/_Requestor","sap/base/assert","sap/base/Log","sap/ui/base/SyncPromise","sap/ui/core/library","sap/ui/core/message/Message","sap/ui/model/BindingMode","sap/ui/model/Context","sap/ui/model/Model","sap/ui/model/odata/OperationMode","sap/ui/thirdparty/jquery","sap/ui/thirdparty/URI"],function(O,a,b,c,S,_,d,e,f,g,h,L,i,j,M,B,k,l,m,q,U){"use strict";var r=/^\w+$/,C="sap.ui.model.odata.v4.ODataModel",E=["$count","$expand","$filter","$levels","$orderby","$search","$select"],n=/^(\$auto(\.\w+)?|\$direct|\w+)$/,o=j.MessageType,p=[undefined,o.Success,o.Information,o.Warning,o.Error],s={messageChange:true},t={annotationURI:true,autoExpandSelect:true,earlyRequests:true,groupId:true,groupProperties:true,odataVersion:true,operationMode:true,serviceUrl:true,supportReferences:true,synchronizationMode:true,updateGroupId:true},u=["$apply","$count","$expand","$filter","$orderby","$search","$select"];var v=l.extend("sap.ui.model.odata.v4.ODataModel",{constructor:function(P){var G,w,x=sap.ui.getCore().getConfiguration().getLanguageTag(),y,z,A,D,F=this;l.apply(this);if(!P||P.synchronizationMode!=="None"){throw new Error("Synchronization mode must be 'None'");}y=P.odataVersion||"4.0";this.sODataVersion=y;if(y!=="4.0"&&y!=="2.0"){throw new Error("Unsupported value for parameter odataVersion: "+y);}for(z in P){if(!(z in t)){throw new Error("Unsupported parameter: "+z);}}A=P.serviceUrl;if(!A){throw new Error("Missing service root URL");}D=new U(A);if(D.path()[D.path().length-1]!=="/"){throw new Error("Service root URL must end with '/'");}if(P.operationMode&&P.operationMode!==m.Server){throw new Error("Unsupported operation mode: "+P.operationMode);}this.sOperationMode=P.operationMode;this.mUriParameters=this.buildQueryOptions(D.query(true),false,true);this.sServiceUrl=D.query("").toString();this.sGroupId=P.groupId;if(this.sGroupId===undefined){this.sGroupId="$auto";}if(this.sGroupId!=="$auto"&&this.sGroupId!=="$direct"){throw new Error("Group ID must be '$auto' or '$direct'");}this.checkGroupId(P.updateGroupId,false,"Invalid update group ID: ");this.sUpdateGroupId=P.updateGroupId||this.getGroupId();this.aLockedGroupLocks=[];this.mGroupProperties={};for(G in P.groupProperties){F.checkGroupId(G,true);w=P.groupProperties[G];if(typeof w!=="object"||Object.keys(w).length!==1||!(w.submit in S)){throw new Error("Group '"+G+"' has invalid properties: '"+w+"'");}}this.mGroupProperties=q.extend({"$auto":{submit:S.Auto},"$direct":{submit:S.Direct}},P.groupProperties);if(P.autoExpandSelect!==undefined&&typeof P.autoExpandSelect!=="boolean"){throw new Error("Value for autoExpandSelect must be true or false");}this.bAutoExpandSelect=P.autoExpandSelect===true;this.oMetaModel=new b(e.create({"Accept-Language":x},y,this.mUriParameters),this.sServiceUrl+"$metadata",P.annotationURI,this,P.supportReferences);this.oRequestor=g.create(this.sServiceUrl,{fetchEntityContainer:this.oMetaModel.fetchEntityContainer.bind(this.oMetaModel),fetchMetadata:this.oMetaModel.fetchObject.bind(this.oMetaModel),getGroupProperty:this.getGroupProperty.bind(this),lockGroup:this.lockGroup.bind(this),onCreateGroup:function(G){if(F.isAutoGroup(G)){sap.ui.getCore().addPrerenderingTask(F._submitBatch.bind(F,G,true));}},reportBoundMessages:this.reportBoundMessages.bind(this),reportUnboundMessages:this.reportUnboundMessages.bind(this)},{"Accept-Language":x},this.mUriParameters,y);if(P.earlyRequests){this.oMetaModel.fetchEntityContainer(true);this.initializeSecurityToken();}this.aAllBindings=[];this.sDefaultBindingMode=B.TwoWay;this.mSupportedBindingModes={OneTime:true,OneWay:true,TwoWay:true};}});v.prototype._submitBatch=function(G,w){var x,P,y=this;P=i.all(this.aLockedGroupLocks.map(function(z){return z.waitFor(G);}));x=P.isPending();if(x){L.info("submitBatch('"+G+"') is waiting for locks",null,C);}return Promise.resolve(P.then(function(){if(x){L.info("submitBatch('"+G+"') continues",null,C);}y.aLockedGroupLocks=y.aLockedGroupLocks.filter(function(z){return z.isLocked();});return y.oRequestor.submitBatch(G).catch(function(z){y.reportError("$batch failed",C,z);if(!w){throw z;}});}));};v.prototype.attachEvent=function(w){if(!(w in s)){throw new Error("Unsupported event '"+w+"': v4.ODataModel#attachEvent");}return l.prototype.attachEvent.apply(this,arguments);};v.prototype.bindContext=function(P,w,x){return new O(this,P,w,x);};v.prototype.bindingCreated=function(w){this.aAllBindings.push(w);};v.prototype.bindingDestroyed=function(w){var I=this.aAllBindings.indexOf(w);if(I<0){throw new Error("Unknown "+w);}this.aAllBindings.splice(I,1);};v.prototype.bindList=function(P,w,x,F,y){return new a(this,P,w,x,F,y);};v.prototype.bindProperty=function(P,w,x){return new c(this,P,w,x);};v.prototype.bindTree=function(){throw new Error("Unsupported operation: v4.ODataModel#bindTree");};v.prototype.buildQueryOptions=function(P,w,x){var y,T=q.extend(true,{},P);function z(A,D,F){var G,H,I,V=A[D];if(!w||F.indexOf(D)<0){throw new Error("System query option "+D+" is not supported");}if((D==="$expand"||D==="$select")&&typeof V==="string"){V=f.parseSystemQueryOption(D+"="+V)[D];A[D]=V;}if(D==="$expand"){for(I in V){H=V[I];if(H===null||typeof H!=="object"){H=V[I]={};}for(G in H){z(H,G,E);}}}else if(D==="$count"){if(typeof V==="boolean"){if(!V){delete A.$count;}}else{switch(typeof V==="string"&&V.toLowerCase()){case"false":delete A.$count;break;case"true":A.$count=true;break;default:throw new Error("Invalid value for $count: "+V);}}}}if(P){for(y in P){if(y.indexOf("$$")===0){delete T[y];}else if(y[0]==="@"){throw new Error("Parameter "+y+" is not supported");}else if(y[0]==="$"){z(T,y,u);}else if(!x&&y.indexOf("sap-")===0){throw new Error("Custom query option "+y+" is not supported");}}}return T;};v.prototype.checkDeferredGroupId=function(G){this.checkGroupId(G,true,"Invalid deferred group ID: ");if(this.isAutoGroup(G)||this.isDirectGroup(G)){throw new Error("Group ID is not deferred: "+G);}};v.prototype.checkGroupId=function(G,A,w){if(!A&&G===undefined||typeof G==="string"&&(A?r:n).test(G)){return;}throw new Error((w||"Invalid group ID: ")+G);};v.prototype.createBindingContext=function(P,w){var D,x,y,R,z;function A(y){var F=y.indexOf("."),G=y.indexOf("/");return F>0&&(G<0||F<G);}if(arguments.length>2){throw new Error("Only the parameters sPath and oContext are supported");}if(w&&w.getBinding){throw new Error("Unsupported type: oContext must be of type sap.ui.model.Context, "+"but was sap.ui.model.odata.v4.Context");}R=this.resolve(P,w);if(R===undefined){throw new Error("Cannot create binding context from relative path '"+P+"' without context");}z=R.indexOf('#');if(z>=0){D=R.slice(0,z);y=R.slice(z+1);if(y[0]==="#"){y=y.slice(1);}else if(D.length>1&&y[0]!=="@"&&A(y)){return new k(this,R);}if(y[0]==="/"){y="."+y;}x=this.oMetaModel.getMetaContext(D);return this.oMetaModel.createBindingContext(y,x);}return new k(this,R);};v.prototype.destroy=function(){this.oRequestor.destroy();this.oMetaModel.destroy();return l.prototype.destroy.apply(this,arguments);};v.prototype.destroyBindingContext=function(){throw new Error("Unsupported operation: v4.ODataModel#destroyBindingContext");};v.prototype.getAllBindings=function(){return this.aAllBindings;};v.prototype.getContext=function(){throw new Error("Unsupported operation: v4.ODataModel#getContext");};v.prototype.getDependentBindings=function(P){return this.aAllBindings.filter(function(w){var x=w.getContext();return w.isRelative()&&(x===P||x&&x.getBinding&&x.getBinding()===P);});};v.prototype.getGroupId=function(){return this.sGroupId;};v.prototype.getGroupProperty=function(G,P){switch(P){case"submit":if(G.startsWith("$auto.")){return S.Auto;}return this.mGroupProperties[G]?this.mGroupProperties[G].submit:S.API;default:throw new Error("Unsupported group property: '"+P+"'");}};v.prototype.getMetaModel=function(){return this.oMetaModel;};v.prototype.getObject=function(){throw new Error("Unsupported operation: v4.ODataModel#getObject");};v.prototype.getODataVersion=function(){return this.sODataVersion;};v.prototype.getOriginalProperty=function(){throw new Error("Unsupported operation: v4.ODataModel#getOriginalProperty");};v.prototype.getProperty=function(){throw new Error("Unsupported operation: v4.ODataModel#getProperty");};v.prototype.getUpdateGroupId=function(){return this.sUpdateGroupId;};v.prototype.hasPendingChanges=function(){return this.oRequestor.hasPendingChanges();};v.prototype.initializeSecurityToken=function(){this.oRequestor.refreshSecurityToken().catch(function(){});};v.prototype.isAutoGroup=function(G){return this.getGroupProperty(G,"submit")===S.Auto;};v.prototype.isDirectGroup=function(G){return this.getGroupProperty(G,"submit")===S.Direct;};v.prototype.isList=function(){throw new Error("Unsupported operation: v4.ODataModel#isList");};v.prototype.lockGroup=function(G,w,x){var y;if(w instanceof _){w.setGroupId(G);return w;}y=new _(G,w,x,this.oRequestor.getSerialNumber());if(y.isLocked()){this.aLockedGroupLocks.push(y);}return y;};v.prototype.refresh=function(G){this.checkGroupId(G);this.aBindings.slice().forEach(function(w){if(w.isRoot()){w.refresh(w.isSuspended()?undefined:G);}});};v.prototype.reportBoundMessages=function(R,P,w){var D="/"+R,N=[],x=[],y=this;Object.keys(P).forEach(function(z){P[z].forEach(function(A){var T=d.buildPath(D,z,A.target);N.push(new M({code:A.code,descriptionUrl:A.longtextUrl||undefined,message:A.message,persistent:A.transition,processor:y,target:T,technical:A.technical,type:p[A.numericSeverity]||o.None}));});});(w||[""]).forEach(function(z){var A=d.buildPath(D,z);Object.keys(y.mMessages||{}).forEach(function(F){if(F===A||F.startsWith(A+"/")||F.startsWith(A+"(")){x=x.concat(y.mMessages[F].filter(function(G){return!G.persistent;}));}});});if(N.length||x.length){this.fireMessageChange({newMessages:N,oldMessages:x});}};v.prototype.reportError=function(w,R,x){var y=[],D,z,A=[];function F(G){var H={code:G.code,message:G.message,technical:G.technical};Object.keys(G).forEach(function(P){if(P[0]==='@'){if(P.endsWith(".numericSeverity")){H.numericSeverity=G[P];}else if(P.endsWith(".longtextUrl")&&x.requestUrl&&z){H.longtextUrl=d.makeAbsolute(G[P],x.requestUrl);}}});if(typeof G.target!=="string"){A.push(H);}else if(G.target[0]==="$"||!z){H.message=G.target+": "+H.message;A.push(H);}else{H.target=G.target;H.transition=true;y.push(H);}}if(x.canceled==="noDebugLog"){return;}D=x.stack||x.message;if(D.indexOf(x.message)<0){D=x.message+"\n"+x.stack;}if(x.canceled){L.debug(w,D,R);return;}L.error(w,D,R);if(x.$reported){return;}x.$reported=true;if(x.error){z=x.resourcePath&&x.resourcePath.split("?")[0];x.error["@.numericSeverity"]=4;x.error.technical=true;F(x.error);if(x.error.details){x.error.details.forEach(F);}if(y.length){this.reportBoundMessages(z,{"":y},[]);}}else{x["@.numericSeverity"]=4;x.technical=true;F(x);}this.reportUnboundMessages(z,A);};v.prototype.reportUnboundMessages=function(R,w){var x=this;if(w&&w.length){this.fireMessageChange({newMessages:w.map(function(y){var z=y.longtextUrl;return new M({code:y.code,descriptionUrl:z&&R?d.makeAbsolute(z,x.sServiceUrl+R):undefined,message:y.message,persistent:true,processor:x,target:"",technical:y.technical,type:p[y.numericSeverity]||o.None});})});}};v.prototype.requestCanonicalPath=function(w){h(w.getModel()===this,"oEntityContext must belong to this model");return w.requestCanonicalPath();};v.prototype.resetChanges=function(G){G=G||this.sUpdateGroupId;this.checkDeferredGroupId(G);this.oRequestor.cancelChanges(G);this.aAllBindings.forEach(function(w){if(G===w.getUpdateGroupId()){w.resetInvalidDataState();}});};v.prototype.resolve=function(P,w){var R;if(P&&P[0]==="/"){R=P;}else if(w){R=w.getPath();if(P){if(R.slice(-1)!=="/"){R+="/";}R+=P;}}if(R&&R!=="/"&&R[R.length-1]==="/"&&R.indexOf("#")<0){R=R.slice(0,R.length-1);}return R;};v.prototype.setLegacySyntax=function(){throw new Error("Unsupported operation: v4.ODataModel#setLegacySyntax");};v.prototype.submitBatch=function(G){var w=this;this.checkDeferredGroupId(G);this.oRequestor.addChangeSet(G);return new Promise(function(x){sap.ui.getCore().addPrerenderingTask(function(){x(w._submitBatch(G));});});};v.prototype.toString=function(){return C+": "+this.sServiceUrl;};return v;});
