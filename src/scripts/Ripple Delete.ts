// Namespace required to bypass typescript errors, redefinision
namespace RippleDelete {
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
        // Check if there is a selected composition
        const comp = project.activeItem;
        if(comp == null || !(comp instanceof CompItem)) {
            alert("Please select a composition");
            return;
        }
        
        // Check if there are any selected layers
        const selectedLayers = comp.selectedLayers;
        if(selectedLayers.length == 0) {
            alert("Please select a layer");
            return;
        }

        // Start undo group
        app.beginUndoGroup("Ripple Delete");
        
        const otherLayers: Layer[] = [];
        // Filter out selected layers
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

        // Find the layer with the earliest in point
        var first = selectedLayers[0];
        for(var i = 1; i < selectedLayers.length; i++)
        {
            var layer = selectedLayers[i];

            if(layer.inPoint < first.inPoint) {
                first = layer;
            }
        }

        const targetLayers: Layer[] = [];
        var furthest = 0;
        var targetFirst: Layer | null = null;

        // Filter other layers into target layers and find the furthest out point
        for(var i = 0; i < otherLayers.length; i++) 
        {
            var otherLayer = otherLayers[i];
            if(first.inPoint > otherLayer.inPoint) {
                if(otherLayer.outPoint < first.inPoint && otherLayer.outPoint > furthest) {
                    furthest = otherLayer.outPoint;
                }

                continue;
            }

            if(targetFirst == null || otherLayer.inPoint < targetFirst.inPoint) {
                targetFirst = otherLayer;
            }

            targetLayers.push(otherLayer);
        }

        // Move all the target layers to the start 
        for(var i = 0; i < targetLayers.length; i++)
        {
            var layer = targetLayers[i];

            var start = (
                furthest + getRealStartOffset(layer)
                - getRealStartOffset(targetFirst as Layer))
                - (layer.inPoint - layer.startTime);

            layer.startTime = start;
        }

        // Delete selected layers
        for(var i = 0; i < selectedLayers.length; i++)
        {
            var layer = selectedLayers[i];
            layer.remove();
        }

        // End of undo group
        app.endUndoGroup();
    }

    rippleDelete();
}