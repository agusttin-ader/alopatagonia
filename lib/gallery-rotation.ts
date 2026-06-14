function indicesEqual(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort((left, right) => left - right);
  const sortedB = [...b].sort((left, right) => left - right);
  return sortedA.every((value, index) => value === sortedB[index]);
}

/** Índice fijado al inicio del subset visible (foto `main` del manifest). */
const PINNED_GALLERY_INDEX = 0;

function shuffleSecondaryIndices(total: number, offset = 0): number[] {
  const secondary = Array.from({ length: total - 1 }, (_, index) => index + 1);
  if (offset > 0) {
    const shift = offset % secondary.length;
    return [...secondary.slice(shift), ...secondary.slice(0, shift)];
  }

  for (let i = secondary.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [secondary[i], secondary[j]] = [secondary[j], secondary[i]];
  }

  return secondary;
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

  const secondaryCount = pickCount - 1;

  for (let attempt = 0; attempt < 16; attempt += 1) {
    const picked = [
      PINNED_GALLERY_INDEX,
      ...shuffleSecondaryIndices(total).slice(0, secondaryCount),
    ];
    if (!exclude || !indicesEqual(picked, exclude)) {
      return picked;
    }
  }

  if (!exclude?.length) {
    return [
      PINNED_GALLERY_INDEX,
      ...shuffleSecondaryIndices(total).slice(0, secondaryCount),
    ];
  }

  const offset = (exclude[1] ?? 0) + 1;
  return [
    PINNED_GALLERY_INDEX,
    ...shuffleSecondaryIndices(total, offset).slice(0, secondaryCount),
  ];
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
