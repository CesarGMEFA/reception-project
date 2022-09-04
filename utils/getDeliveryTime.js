import * as duration from 'duration-fns'

export function getDeliveryTime(created_at, delivery_time) {
  const time = duration.between(created_at, delivery_time)
	const arrayTimes = ["years", "months", "weeks", "days", "hours",	"minutes", "seconds",	"milliseconds"]
	for (let i in arrayTimes) {
		for (let j in time) {
      if (arrayTimes[i] === j) {
        arrayTimes.splice(i, 1, time[j])
      };
		};
	};

  const numberOfTime = arrayTimes.find( n => n !== 0)
	const indexOfTime = arrayTimes.indexOf(numberOfTime)

	let date = null;
	switch (indexOfTime) {
		case 0:
			numberOfTime === 1
				? (date = `${numberOfTime} año`)
				: (date = `${numberOfTime} años`);
			break;
		case 1:
			numberOfTime === 1
				? (date = `${numberOfTime} mes`)
				: (date = `${numberOfTime} meses`);
			break;
		case 2:
			numberOfTime === 1
				? (date = `${numberOfTime} semana`)
				: (date = `${numberOfTime} semanas`);
			break;
		case 3:
			numberOfTime === 1
				? (date = `${numberOfTime} dia`)
				: (date = `${numberOfTime} dias`);
			break;
		case 4:
			numberOfTime === 1
				? (date = `${numberOfTime} hora`)
				: (date = `${numberOfTime} horas`);
			break;
		case 5:
			numberOfTime === 1
				? (date = `${numberOfTime} minuto`)
				: (date = `${numberOfTime} minutos`);
			break;
		case 6:
			numberOfTime > 1
				? (date = `${numberOfTime} minutos`)
				: (date = `Tiempo agotado`);
			break;
		default:
			date = "Tiempo agotado";
	}
	return date;
}