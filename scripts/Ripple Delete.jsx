"use strict";
var RippleDelete;
(function (RippleDelete) {
    var project = app.project;
    function getRealStartOffset(layer) {
        var start = layer.startTime;
        var inPoint = layer.inPoint;
        return start - (inPoint - start);
    }
    function rippleDelete() {
        var comp = project.activeItem;
        if (comp == null || !(comp instanceof CompItem)) {
            alert("Please select a composition");
            return;
        }
        var layers = comp.selectedLayers;
        if (layers.length == 0) {
            alert("Please select a layer");
            return;
        }
        app.beginUndoGroup("Ripple Delete");
        var selectedLayers = comp.selectedLayers;
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
        var targetLayers = [];
        var furthest = 0;
        var targetFirst = null;
        for (var i = 0; i < otherLayers.length; i++) {
            var otherLayer = otherLayers[i];
            if (first.inPoint > otherLayer.inPoint) {
                if (otherLayer.outPoint > furthest) {
                    furthest = otherLayer.outPoint;
                }
                continue;
            }
            if (targetFirst == null || otherLayer.inPoint < targetFirst.inPoint) {
                targetFirst = otherLayer;
            }
            targetLayers.push(otherLayer);
        }
        for (var i = 0; i < targetLayers.length; i++) {
            var layer = targetLayers[i];
            var start = (furthest + getRealStartOffset(layer)
                - getRealStartOffset(targetFirst))
                - (layer.inPoint - layer.startTime);
            layer.startTime = start;
        }
        for (var i = 0; i < selectedLayers.length; i++) {
            var layer = selectedLayers[i];
            layer.remove();
        }
        app.endUndoGroup();
    }
    rippleDelete();
})(RippleDelete || (RippleDelete = {}));
