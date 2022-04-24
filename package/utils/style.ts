import _ from "lingfun-utils";

export function formatUnit(value: [string, number], unit:string = 'px'){
  if(typeof value == 'number' &&  isNaN(value)) return new Error('value is a NaN');
  // stirng、number - '123'  '123sdbcvbd' '123px'  123 
  if(typeof value === 'number' || _.isNumeralString(value)) return value + unit;
  return value
}