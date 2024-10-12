import type { MyContext } from '../types.js';
import logger from '../utils/logger.js';

// Обработчик для начала поиска билетов
export const searchHandler = async (ctx: MyContext) => {
	try {
		// Логирование начала процесса поиска билетов
		logger.info('Ticket search process started... 🎟️');

		// Проверка наличия метода reply в контексте
		if (typeof ctx.reply !== 'function') {
			// Если метод reply отсутствует, выбрасываем ошибку
			logger.error('[⚠️] Context does not contain method reply.');
		}

		// Проверка наличия сессии в контексте
		if (!ctx.session) {
			// Если сессия отсутствует, логируем предупреждение и инициализируем пустой объект
			logger.warn('[⚠️] Session property was missing, initializing with an empty object.');
			ctx.session = {}; // Инициализация сессии
		}

		// Логирование запроса на ввод города вылета
		logger.debug('[✈️] Requesting departure city from the user.');

		// Запрос у пользователя города вылета
		await ctx.reply('Из какого города вы вылетаете?');

		// Обновление данных сессии, устанавливая текущий шаг процесса выбора
		ctx.session = {
			...ctx.session,
			step: 'from_city', // Установка шага процесса на 'from_city'
		};
	} catch (error) {
		// Логирование ошибки, если что-то пошло не так при запросе города вылета
		logger.error('[❌] Error requesting departure city:', error);

		// Если ошибка является экземпляром класса Error, логируем также стек вызовов
		if (error instanceof Error) {
			logger.error('[🐛] Stack trace:', error.stack);
		}
	}
};
