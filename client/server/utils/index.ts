
/**
 * 判断是否为空对象
 * @param object
 * @returns boolean
 */
export function isEmptyObject(object: object): boolean {
    const type = Object.prototype.toString.call(object).replace(/^\[object (\S+)\]$/, '$1');
    return type === 'Object' ? Boolean(Object.keys(object).length) : false;
  }
  