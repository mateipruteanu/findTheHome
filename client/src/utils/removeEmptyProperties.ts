export default function removeEmptyProperties(object: any): any {
  const cleanedObject: any = {};
  for (const key in object) {
    if (object[key] !== "" && object[key] !== null && object[key] !== undefined) {
      cleanedObject[key] = object[key];
    }
  }
  return cleanedObject;
}
