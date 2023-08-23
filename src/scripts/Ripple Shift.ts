const project = app.project;

/**
 * Calculates the real start offset of a layer
 * Example:
 * If a layer has a start time of 1 and an in point of 2, the real start offset is 0
 * @param layer Layer to get the real start offset of
 * @returns The real start offset of the layer
 */
function getRealStartOffset(layer: Layer): number {
    var start = layer.startTime;
    var inPoint = layer.inPoint;
    
    return start - (inPoint - start);
}

function rippleDelete(): void {
    const comp = project.activeItem;
    if(comp == null || !(comp instanceof CompItem)) {
        alert("Please select a composition");
        return;
    }

    const layers = comp.selectedLayers;
    if(layers.length == 0) {
        alert("Please select a layer");
        return;
    }

    app.beginUndoGroup("Ripple Delete");
    
    const selectedLayers = comp.selectedLayers;
    const otherLayers: Layer[] = [];

    for(var i = 1; i <= comp.layers.length; i++) 
    {
        var layer = comp.layers[i];
        var skip = false;

        for(var j = 0; j < selectedLayers.length; j++) 
        {
            if(layer.id == selectedLayers[j].id) {
                skip = true;
                break;
            }
        }

        if(skip) continue;
        otherLayers.push(layer);
    }

    var first = selectedLayers[0];
    for(var i = 1; i < selectedLayers.length; i++)
    {
        var layer = selectedLayers[i];

        var layerStart = getRealStartOffset(layer);
        var firstStart = getRealStartOffset(first);    
    
        if(layerStart < firstStart) {
            first = layer;
        }
    }

    var firstStart = getRealStartOffset(first);
    var furthest = 0;

    for(var i = 0; i < otherLayers.length; i++) 
    {
        var otherLayer = otherLayers[i];
        
        var end = otherLayer.outPoint;
        if(first.inPoint < end) {
            continue;
        }

        if(end > furthest) {
            furthest = end;
        }
    }

    for(var i = 0; i < selectedLayers.length; i++)
    {   
        var layer = selectedLayers[i];
        
        var start = (furthest + getRealStartOffset(layer) - firstStart) - (layer.inPoint - layer.startTime);
        layer.startTime = start;
    }

    app.endUndoGroup();
}

rippleDelete();