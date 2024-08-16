function mostrarModalConfirmacion(mensaje, callbackConfirmar) {
    $("#btn-confirmar").off("click").on("click", function () {
        callbackConfirmar();
        $("#modal-confirmacion").modal("hide");
    });

    $('#modal-confirmacion .btn-secondary').on('click', function () {
    })

    $("#modal-confirmacion .modal-body p").text(mensaje);

    $("#modal-confirmacion").modal("show");
}