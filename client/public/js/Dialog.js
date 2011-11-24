function setStyle(el, style, val){
    el.style[style] = val;
    return el;
}
function px(el, style, val){
    setStyle(el, style, val + 'px');
}

function Dialog(modal, cls){
    this.init(modal, cls);
}

Dialog.prototype.init = function(modal, cls){
    this.width = 500;
    this.height = 300;
    
    this.isModal = modal;
    this.extraCls = cls||'';
    
    this.init();
    this.render();
};

Dialog.prototype.render = function(){
    // Create the dialog div
    var div = document.createElement('div');
    div.className = 'sn-dialog ' + this.extraCls;
    
    // Append the body to the dialog
    if (this.body) {
        div.appendChild(this.body);
    }
    
    // Add the SnackenJS border
    var border = document.createElement('div');
    border.className = 'sn-transparent';
    div.appendChild(border);
    
    this.div = div;
};

Dialog.prototype.updateSize = function(){
    px(this.div, 'width', this.width);
    px(this.div, 'height', this.height);
    // center
    px(this.div, 'margin-left', -(this.width / 2));
    px(this.div, 'margin-top', -(this.height / 2));
};

Dialog.prototype.show = function(){
    var self = this;
    if (this.isModal && !this.mask) {
        this.mask = new Mask(function(){
            self.hide.call(self);
        });
        this.mask.show();
    }
    
    document.body.appendChild(this.div);

    this.updateSize();
};

Dialog.prototype.hide = function(){
    if (this.mask) {
        this.mask.hide(); // destroy
        delete this.mask;
    }
    document.body.removeChild(this.div);
    return;
};