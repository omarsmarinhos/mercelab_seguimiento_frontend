$('[data-toggle="popover"]').on('click', function() {
    $(this).popover('show');
    let popover = $(this);
    setTimeout(() => {
        popover.popover('hide');
    }, 2000);
});