import { combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";

// export const join = <T extends { id: number }>(
//   target$: Observable<T[]>,
//   source$: Observable<any[]>,
//   config: { targetKey: string; sourceKey: string }
// ): Observable<any> => {
//   return combineLatest([target$, source$]).pipe(
//     map(([target, source]) => {
//       return target.map((i) => ({
//         ...i,
//         [config.targetKey]: source.find((j) => j.id === i[config.sourceKey]),
//       }));
//     })
//   );
// };
