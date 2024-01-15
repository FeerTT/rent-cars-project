function deleteCar(button) {
	var row = button.closest('tr');

	var carIdCell = row.querySelector('.car-id');

	var carId = carIdCell.textContent;

	if (confirm('¿Estás seguro de que deseas eliminar este auto?')) {
		fetch(`/cars/delete/${carId}`, {
			method: 'DELETE',
		})
			.then((response) => {
				if (response.ok) {
					alert('Auto eliminado exitosamente');
					window.location.reload();
				} else {
					alert('Error al intentar eliminar el auto');
				}
			})
			.catch((error) => {
				console.error('Error en la solicitud fetch:', error);
			});
	}
}
