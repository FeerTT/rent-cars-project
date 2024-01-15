let currentCarId;
function openModifyForm(button) {
	console.log('Button clicked!');
	const row = button.closest('tr');
	currentCarId = row.querySelector('.car-id').dataset.carId;
	const brand = row.querySelector('.brand').dataset.brand;
	const model = row.querySelector('.model').dataset.model;
	const transmission = row.querySelector('.transmission').textContent;
	const passengers = row.querySelector('.passengers').textContent;
	const airConditioningCell = row.querySelector('.air-conditioning');
	const airConditioning = JSON.parse(
		airConditioningCell.dataset.airConditioning
	);
	const color = row.querySelector('.color').textContent;
	const kms = row.querySelector('.kms').textContent;
	const year = row.querySelector('.year').textContent;

	document.getElementById('brandModify').value = brand;
	document.getElementById('modelModify').value = model;
	document.getElementById('transmissionModify').value = transmission;
	document.getElementById('passengersModify').value = passengers;
	document.getElementById('airConditioningModify').checked = airConditioning;

	document.getElementById('colorModify').value = color;
	document.getElementById('kmsModify').value = kms;
	document.getElementById('yearModify').value = year;
	document.getElementById('modifyModal').classList.add('is-active');
}

document.addEventListener('DOMContentLoaded', function () {
	document
		.getElementById('modifyButton')
		.addEventListener('click', function () {
			// saco los nuevos valores de los inputs
			const modifiedBrand = document.getElementById('brandModify').value;
			const modifiedModel = document.getElementById('modelModify').value;
			const modifiedTransmission =
				document.getElementById('transmissionModify').value;
			const modifiedPassengers =
				document.getElementById('passengersModify').value;
			const modifiedAirConditioning = document.getElementById(
				'airConditioningModify'
			).checked;
			const modifiedColor = document.getElementById('colorModify').value;
			const modifiedKms = document.getElementById('kmsModify').value;
			const modifiedYear = document.getElementById('yearModify').value;

			//este es el nuevo objeto que voy a pasar para la modificación de datos
			const modifiedCarData = {
				brand: modifiedBrand,
				model: modifiedModel,
				transmission: modifiedTransmission,
				passengers: modifiedPassengers,
				air_conditioning: modifiedAirConditioning,
				color: modifiedColor,
				kms: modifiedKms,
				year: modifiedYear,
			};

			fetch(`/cars/update/${currentCarId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(modifiedCarData),
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.status) {
						console.log('Auto modificado exitosamente');
						window.location.reload();
					} else {
						console.error(
							'Error al modificar el auto:',
							data.errors
						);
					}

					closeModifyModal();
				})
				.catch((error) => {
					console.error('Error en la solicitud:', error);
				});
		});
});

function closeModifyModal() {
	document.getElementById('modifyModal').classList.remove('is-active');
}
