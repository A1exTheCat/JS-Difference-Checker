const stringify = (data, symbol = ' ', count = 4) => {
  const filter = (key, value) => {
    if (typeof value === 'object' && value !== null) {
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
    if (object.type === 'leaf' && object.status === 'changed') {
      let dataOfDeletedVaule = object.deletedValue;
      let dataOfAddedVaule = object.addedValue;
      if (typeof object.deletedValue === 'object' && object.deletedValue !== null) {
        dataOfDeletedVaule = stringify(object.deletedValue, ' ', counter + 2);
      }
      if (typeof object.addedValue === 'object' && object.addedValue !== null) {
        dataOfAddedVaule = stringify(object.addedValue, ' ', counter + 2);
      }
      return `${' '.repeat(counter)}- ${object.name}: ${dataOfDeletedVaule}\n${' '.repeat(counter)}+ ${object.name}: ${dataOfAddedVaule}`;
    }
    if (object.type === 'leaf' && typeof object.value === 'object' && object.value !== null) {
      const data = stringify(object.value, ' ', counter + 2);
      return `${' '.repeat(counter)}${object.status}${object.name}: ${data}`;
    }
    if (object.type === 'leaf') {
      return `${' '.repeat(counter)}${object.status}${object.name}: ${object.value}`;
    }
    const children = object.children.flatMap((child) => filter(child, counter + 4)).join('\n');
    return `${' '.repeat(counter + 2)}${object.name}: {\n${children}\n${' '.repeat(counter + 2)}}`;
  };
  return diff.flatMap((children) => filter(children)).join('\n');
};

export default stylish;
