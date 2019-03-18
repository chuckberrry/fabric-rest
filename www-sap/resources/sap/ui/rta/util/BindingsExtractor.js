/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/dt/ElementUtil','sap/ui/rta/Utils',"sap/ui/thirdparty/jquery"],function(E,R,q){"use strict";function g(e,p,t){var B=(t?c(e):b(e,p));for(var A in e.getMetadata().getAllAggregations()){var o=e.getBindingInfo(A);var T=o&&o.template;var d=T?[T]:E.getAggregation(e,A);d.forEach(function(C){if(C.getMetadata){B=B.concat(T||t?c(C):b(C,p),g(C,p,T||t));}});}return B;}function f(B,p){var d=[];var m=B.getMetadata().getName();if(m==="sap.ui.model.CompositeBinding"){B.getBindings().forEach(function(B){d=d.concat(f(B,p));});}else if((m==="sap.ui.model.odata.ODataPropertyBinding"||m==="sap.ui.model.odata.v2.ODataPropertyBinding"||m==="sap.ui.model.odata.v4.ODataPropertyBinding"||m==="sap.ui.model.json.JSONPropertyBinding"||m==="sap.ui.model.json.XMLPropertyBinding"||m==="sap.ui.model.resource.ResourcePropertyBinding")&&B.getModel()===p&&B.isRelative()&&q.isFunction(B.getPath)&&B.getPath()){d.push(B);}return d;}function a(B){var d=[];var p=B.parts;p.forEach(function(P){d.push({parts:[P]});});return d;}function b(e,p){var P=Object.keys(e.getMetadata().getAllProperties());return P.filter(e.getBinding.bind(e)).reduce(function(B,s){return B.concat(f(e.getBinding(s),p));},[]);}function c(e){var p=Object.keys(e.getMetadata().getAllProperties());return p.filter(function(P){return P in e.mBindingInfos;}).reduce(function(B,P){return B.concat(a(e.mBindingInfos[P]));},[]);}return{getBindings:g,flattenBindings:f,getBindingsFromProperties:b};},true);
