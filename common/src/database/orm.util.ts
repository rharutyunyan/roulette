import { ObjectLiteral, Brackets } from 'typeorm';

const createAddWhere = <T>(whereMethod: 'orWhere' | 'andWhere', qb: T) => {
  let callCount = 0;
  return (where: string | Brackets | ((qb: T) => string), parameters?: ObjectLiteral): T => {
    callCount++;
    if (callCount === 1) {
      (qb as any).where(where, parameters);
    } else {
      qb[whereMethod](where, parameters);
    }
    return qb;
  };
};

export const createOrWhere = <T>(qb: T) => createAddWhere('orWhere', qb);

export const createAndWhere = <T>(qb: T) => createAddWhere('andWhere', qb);
