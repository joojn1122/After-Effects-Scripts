"use strict";
var RippleShift;
(function (RippleShift) {
    var project = app.project;
    function getRealStartOffset(layer) {
        var start = layer.startTime;
        var inPoint = layer.inPoint;
        return start - (inPoint - start);
    }
    function rippleShift() {
        var comp = project.activeItem;
        if (comp == null || !(comp instanceof CompItem)) {
            alert("Please select a composition");
            return;
        }
        var selectedLayers = comp.selectedLayers;
        if (selectedLayers.length == 0) {
            alert("Please select a layer");
            return;
        }
        app.beginUndoGroup("Ripple Shift");
        var otherLayers = [];
        for (var i = 1; i <= comp.layers.length; i++) {
            var layer = comp.layers[i];
            var skip = false;
            for (var j = 0; j < selectedLayers.length; j++) {
                if (layer.id == selectedLayers[j].id) {
                    skip = true;
                    break;
                }
            }
            if (skip)
                continue;
            otherLayers.push(layer);
        }
        var first = selectedLayers[0];
        for (var i = 1; i < selectedLayers.length; i++) {
            var layer = selectedLayers[i];
            if (layer.inPoint < first.inPoint) {
                first = layer;
            }
        }
        var furthest = 0;
        for (var i = 0; i < otherLayers.length; i++) {
            var otherLayer = otherLayers[i];
            var end = otherLayer.outPoint;
            if (first.inPoint < end) {
                continue;
            }
            if (end > furthest) {
                furthest = end;
            }
        }
        var firstStart = first.inPoint;
        for (var i = 0; i < selectedLayers.length; i++) {
            var layer = selectedLayers[i];
            var start = (furthest + layer.inPoint - firstStart) - (layer.inPoint - layer.startTime);
            layer.startTime = start;
        }
        app.endUndoGroup();
    }
    rippleShift();
})(RippleShift || (RippleShift = {}));
