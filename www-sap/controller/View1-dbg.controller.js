sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("aqismockup.aqismockup.controller.View1", {
		onInit: function () {
			var oModel = new JSONModel();
			this.getView().setModel(oModel);
			this.loadData(oModel);
		},
		onAfterRendering: function(){
			this.startCountdown();
		},

		loadData: function (oModel) {
			oModel.setProperty("/currentDate", new Date());
			oModel.setProperty("/countDownTime", 31);
			oModel.setProperty("/progress", 100);
			oModel.setProperty("/ziel", 18);
			oModel.setProperty("/soll", 2);
			oModel.setProperty("/ist", 2);
			oModel.setProperty("/info", "100 038 06 59 - Rahmen kpl. 351 ROH");
		},

		startCountdown: function () {
			var self = this;
			var that = this;
			var now = new Date();
			var startTime = now.getTime();
			this.intervalHandle = setInterval(function () {
				self.setTimer(startTime);
				that.getView().getModel().setProperty("/currentDate", now);
			}, 1000);
		},

		setTimer: function (startTime) {
			var oModel = this.getView().getModel();
			var now = new Date().getTime();
			var countDownTimeInMs = oModel.getProperty("/countDownTime")*60000;
			var countDownTime = startTime + countDownTimeInMs;
			var distance = countDownTime - now;
			var progress = distance*100/countDownTimeInMs;
			// Time calculations minutes and seconds
			var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((distance % (1000 * 60)) / 1000);
			if(distance < 0){
				oModel.setProperty("/countDown", "00:00");
				oModel.setProperty("/progress", 0);
				return;
			}
			
			if (minutes.toString().length === 1) {
				minutes = "0" + minutes;
			}

			if (seconds.toString().length === 1) {
				seconds = "0" + seconds;
			}
			// Output the result in an element with id="demo"
			oModel.setProperty("/countDown", minutes.toString() + ":" + seconds.toString());
			oModel.setProperty("/progress", progress);
		}
	});
});