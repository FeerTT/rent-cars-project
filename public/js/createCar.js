document.addEventListener('DOMContentLoaded', function () {
	document
		.getElementById('carForm')
		.addEventListener('submit', async function (event) {
			event.preventDefault();

			const formData = new FormData(event.target);
			const airConditioningValue =
				formData.get('air_conditioning') === 'on';
			formData.set('air_conditioning', airConditioningValue);

			const jsonData = {};
			formData.forEach((value, key) => {
				jsonData[key] = value;
			});

			try {
				const response = await fetch('/cars/create', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(jsonData),
				});

				if (response.ok) {
					console.log('Datos enviados correctamente al servidor');
				} else {
					console.error('Error al enviar los datos al servidor');
				}
			} catch (error) {
				console.error('Error en la solicitud fetch:', error);
			}
		});
});
