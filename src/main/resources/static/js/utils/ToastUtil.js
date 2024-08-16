Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 2000
});

function toast(icon, title) {
    this.Toast.fire({
        icon: icon,
        title: title
    });
}
