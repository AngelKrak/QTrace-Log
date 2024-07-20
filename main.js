/**
 * Imprime una tabla de datos con opciones de formato.
 * @param {Object[]} data - Los datos para imprimir en la tabla.
 * @param {Object} [options={}] - Opciones para personalizar la impresión de la tabla.
 * @param {string} [options.tableName="QTrace Log"] - El nombre de la tabla.
 * @param {string} [options.style="table"] - El estilo de impresión de la tabla. Puede ser "table" para imprimir en formato de tabla o "expanded" para mostrar cada dato en filas separadas.
 * @param {number} [options.tableStyle=1] - El estilo específico de la tabla cuando `style` es "table". Puede ser 1 o 2.
 * @example
 * qtrace(
 *   [
 *     { Nombre: 'John Doe', edad: 30, 'Correo electronico': 'john@example.com' },
 *     { Nombre: 'Jane Smith', edad: 25, 'Correo electronico': 'jane@example.com' },
 *     { Nombre: 'Bob Johnson', edad: 35, 'Correo electronico': 'bob@example.com' }
 *   ],
 *   { tableName: "QTrace Log Table" }
 * );
 * @example
 * qtrace(
 *   [
 *     { Nombre: 'John Doe', Edad: 30, 'Correo electronico': 'john@example.com' },
 *     { Nombre: 'Jane Smith', Edad: 25, 'Correo electronico': 'jane@example.com' },
 *     { Nombre: 'Bob Johnson', Edad: 35, 'Correo electronico': 'bob@example.com' }
 *   ],
 *   { tableName: "QTrace Log Table", tableStyle: 2 }
 * );
 * @example
 * qtrace(
 *   [
 *     { Nombre: 'John Doe', Edad: 30, 'Correo electronico': 'john@example.com' },
 *     { Nombre: 'Jane Smith', Edad: 25, 'Correo electronico': 'jane@example.com' },
 *     { Nombre: 'Bob Johnson', Edad: 35, 'Correo electronico': 'bob@example.com' }
 *   ],
 *   { style: 'expanded' }
 * );
 */
function qtrace(data, options = {}) {
	const { tableName = "QTrace Log", style = "table", tableStyle = 1 } = options;
	const tablePrefix = "🛡️  ~ ";

	const lowercaseData = data.map(row => {
		const newRow = {};
		Object.keys(row).forEach(key => {
			newRow[key.toLowerCase()] = row[key];
		});
		return newRow;
	});

	const columns = Object.keys(lowercaseData[0]).map(column => column.charAt(0).toUpperCase() + column.slice(1));

	const columnWidths = {};
	columns.forEach(column => {
		const maxLength = Math.max(column.length, ...lowercaseData.map(row => String(row[column.toLowerCase()]).length));
		columnWidths[column] = maxLength;
	});

	const emojiLength = [...tablePrefix].filter(char => char.length > 1).length;
	const tableNameLength = tablePrefix.length + tableName.length + emojiLength;
	const totalWidth = Math.max(Object.values(columnWidths).reduce((acc, width) => acc + width + 3, 0), tableNameLength);

	console.log('╔' + '═'.repeat(totalWidth) + '╗');
	console.log(`║  ${' '.repeat((totalWidth - tableNameLength) / 2)}${tablePrefix}${tableName}${' '.repeat((totalWidth - tableNameLength) / 2)} ║`);
	console.log('╟' + '─'.repeat(totalWidth) + '╢');

	if (style === "table") {
		if (tableStyle === 1) {
			console.log('║  ' + columns.map(column => `${column.padEnd(columnWidths[column])} `).join('║ ') + '║');
			lowercaseData.forEach(row => {
				console.log('║  ' + columns.map(column => `${String(row[column.toLowerCase()]).padEnd(columnWidths[column])} `).join('║ ') + '║');
			});
		} else if (tableStyle === 2) {
			console.log('║  ' + columns.map(column => `${column.padEnd(columnWidths[column])} `).join('║ ') + '║');
			lowercaseData.forEach((row, index) => {
				console.log(index === 0 ? '╠' + '═'.repeat(totalWidth) + '╣' : '╟' + '─'.repeat(totalWidth) + '╢');
				console.log('║  ' + columns.map(column => `${String(row[column.toLowerCase()]).padEnd(columnWidths[column])} `).join('║ ') + '║');
			});
		} else {
			console.log("Error: Estilo de tabla no válido.");
		}
	} else if (style === "expanded") {
		lowercaseData.forEach((row, index) => {
			columns.forEach(column => {
				console.log(`║  ${column}: ${String(row[column.toLowerCase()]).padEnd(columnWidths[column])} ${' '.repeat(totalWidth - (column.length + columnWidths[column] + 5))}║`);
			});
			if (index < (lowercaseData?.length - 1)) console.log('╟' + '─'.repeat(totalWidth) + '╢');
		});
	} else {
		console.log("Error: Estilo de tabla no válido.");
	}

	console.log('╚' + '═'.repeat(totalWidth) + '╝');
}

module.exports = qtrace;