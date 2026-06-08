export function indicesEqual(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort((left, right) => left - right);
  const sortedB = [...b].sort((left, right) => left - right);
  return sortedA.every((value, index) => value === sortedB[index]);
}

export function pickRandomIndices(
  total: number,
  count: number,
  exclude?: number[],
): number[] {
  const pickCount = Math.min(count, total);
  if (total <= pickCount) {
    return Array.from({ length: total }, (_, index) => index);
  }

  for (let attempt = 0; attempt < 16; attempt += 1) {
    const pool = Array.from({ length: total }, (_, index) => index);
    for (let i = pool.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const picked = pool.slice(0, pickCount);
    if (!exclude || !indicesEqual(picked, exclude)) {
      return picked;
    }
  }

  if (!exclude?.length) {
    return Array.from({ length: pickCount }, (_, index) => index);
  }

  const offset = (exclude[0] + 1) % total;
  const rotated = Array.from({ length: total }, (_, index) => (index + offset) % total);
  return rotated.slice(0, pickCount);
}

export type GallerySelectionState = {
  sets: number[][];
  index: number;
};

export type GallerySelectionAction =
  | { type: "init"; total: number; displayCount: number }
  | { type: "prev" }
  | { type: "next"; total: number; displayCount: number };

export function gallerySelectionReducer(
  state: GallerySelectionState,
  action: GallerySelectionAction,
): GallerySelectionState {
  switch (action.type) {
    case "init":
      return {
        sets: [pickRandomIndices(action.total, action.displayCount)],
        index: 0,
      };
    case "prev":
      return {
        ...state,
        index: Math.max(0, state.index - 1),
      };
    case "next": {
      if (state.index < state.sets.length - 1) {
        return { ...state, index: state.index + 1 };
      }

      const currentSet = state.sets[state.index];
      if (!currentSet) return state;

      return {
        sets: [
          ...state.sets,
          pickRandomIndices(action.total, action.displayCount, currentSet),
        ],
        index: state.index + 1,
      };
    }
    default:
      return state;
  }
}
