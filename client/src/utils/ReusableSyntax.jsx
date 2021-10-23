export const objectAssign = (ObjectArray, obj) => {
    return ObjectArray.map((info) => {
        return Object.assign(obj, info);
    });
};