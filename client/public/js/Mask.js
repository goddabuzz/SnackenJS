function Mask(handler){
    this.onClickHandler = handler
}
Mask.prototype.show = function(){
    var mask = document.createElement('div');
    mask.setAttribute('class','sn-mask');
    $(document.body).prepend(mask);
    this.mask = mask;
    
    if (this.onClickHandler){
        $(mask).on('click', this.onClickHandler);
    }
};

Mask.prototype.hide = function(){
    if (this.mask){
        document.body.removeChild(this.mask);
    }
    delete this.mask;
};