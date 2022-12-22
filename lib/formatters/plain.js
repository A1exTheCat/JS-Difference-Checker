// Форматер слов отдельной функцией
const valueFormatter = (obj) => {
  switch (typeof obj) {
    case 'object':
      if (obj === null) {
        return 'null';
      }
      return '[complex value]';
    case 'number':
      return obj;
    case 'boolean':
      return obj;
    default:
      return `'${obj}'`;
  }
};
  // Форматтер
const plain = (diff) => {
// Пишем фильтр для map, задаем аккамулятор для прописывания пути,
// будет передаваться дальше, передается путем задания через
// map вторым свойством ключа с именем объекта обрабатываемого
  const filter = (object, acc) => {
    // первый кейс для общего ключа с объектами внутри, идущий вглубь с аккамулятором
    if (object.type === 'nested') {
      return object.children.flatMap((children) => filter(children, `${acc}.${children.name}`));
    }
    // второй кейс для добавленного ключа
    if (object.status === '+ ') {
      const currentObjectValue = valueFormatter(object.value);
      return `Property '${acc}' was added with value: ${currentObjectValue}`;
    }
    // третий кейс для удаленного ключа
    if (object.status === '  ') {
      return [];
    }
    // последний четвертый кейс, где данные изменились
    if (object.status === 'changed') {
      const currentAddValue = valueFormatter(object.addedValue);
      const currentDeletedValue = valueFormatter(object.deletedValue);
      return `Property '${acc}' was updated. From ${currentDeletedValue} to ${currentAddValue}`;
    }
    return `Property '${acc}' was removed`;
  };
  return diff.flatMap((object) => filter(object, `${object.name}`)).join('\n');
};

export default plain;
