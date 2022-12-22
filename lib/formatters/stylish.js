import _ from 'lodash';

const stringify = (data, symbol = ' ', count = 4) => {
  const filter = (key, value) => {
    if (_.isObject(value)) {
      return `${symbol.repeat(count + 4)}${key}: ${stringify(value, symbol, count + 4)}`;
    }
    return `${symbol.repeat(count + 4)}${key}: ${value}`;
  };
  const array = Object.entries(data);
  const result = array.flatMap(([key, value]) => filter(key, value));
  return `{\n${result.join('\n')}\n${symbol.repeat(count)}}`;
};

const stylish = (diff) => {
  const filter = (object, counter = 2) => {
    // Если узел листовой, был в обоих файлах и изменился, один
    // из них при этом может быть объектом
    if (object.type === 'leaf' && object.status === 'changed') {
      const dataOfDeletedVaule = (deletedValue) => {
        if (_.isObject(deletedValue)) {
          return stringify(deletedValue, ' ', counter + 2);
        }
        return deletedValue;
      };
      const dataOfAddedVaule = (addedValue) => {
        if (_.isObject(addedValue)) {
          return stringify(addedValue, ' ', counter + 2);
        }
        return addedValue;
      };
      return `${' '.repeat(counter)}- ${object.name}: ${dataOfDeletedVaule(object.deletedValue)}\n${' '.repeat(counter)}+ ${object.name}: ${dataOfAddedVaule(object.addedValue)}`;
    }
    // Если узел листовой и он был только в одном из файлов и при этом объект
    if (object.type === 'leaf' && _.isObject(object.value)) {
      const data = stringify(object.value, ' ', counter + 2);
      return `${' '.repeat(counter)}${object.status}${object.name}: ${data}`;
    }
    // Если узел листовой и он был только в одном из файлов и при этом не объект
    if (object.type === 'leaf') {
      return `${' '.repeat(counter)}${object.status}${object.name}: ${object.value}`;
    }
    // Если узел не листовой, идем внутрь
    const children = object.children.flatMap((child) => filter(child, counter + 4)).join('\n');
    return `${' '.repeat(counter + 2)}${object.name}: {\n${children}\n${' '.repeat(counter + 2)}}`;
  };
  return diff.flatMap((children) => filter(children)).join('\n');
};

export default stylish;
