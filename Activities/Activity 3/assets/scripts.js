/* DRAG AND DROP */

document.querySelectorAll('.flex-tile').forEach(item => {
    item.addEventListener('drop', event => {
        event.preventDefault();
        var data = event.dataTransfer.getData("text");
        
        event.target.appendChild(document.getElementById(data));
    });
    
    item.addEventListener('dragover', event => {
        event.preventDefault();
    });
});

document.querySelectorAll('.piece').forEach(item => {
    item.draggable = "true";
    item.addEventListener('dragstart', event => {
        event.dataTransfer.setData("text", event.target.id);
    })
});

