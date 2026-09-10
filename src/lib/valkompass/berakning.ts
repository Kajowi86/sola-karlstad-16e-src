export type PosMap = Record<string, number | null>;

export type Fraga = {
  id: string;
  kat: string;
  text: string;
  desc: string;
  kalla?: string;
  pos: PosMap;
};

export type Parti = {
  id: string;
  namn: string;
  kort: string;
  farg: string;
  mandat: boolean;
};

export type SvarMap = Record<number, number>;
export type Spann = { min: number; max: number };

export function raknaIndex(
  svar: SvarMap,
  viktiga: number[],
  partiId: string,
  fragor: Fraga[],
): { index: number | null; kanda: number } {
  let avst = 0;
  let max = 0;
  let kanda = 0;
  for (const nyckel of Object.keys(svar)) {
    const qi = Number(nyckel);
    const pp = fragor[qi]?.pos[partiId];
    if (pp === null || pp === undefined) continue;
    const w = viktiga.includes(qi) ? 2 : 1;
    avst += Math.abs(svar[qi] - pp) * w;
    max += 4 * w;
    kanda++;
  }
  return max === 0
    ? { index: null, kanda: 0 }
    : { index: Math.round(100 * (1 - avst / max)), kanda };
}

export function kanslighet(
  svar: SvarMap,
  viktiga: number[],
  partiId: string,
  fragor: Fraga[],
): Spann | null {
  const nycklar = Object.keys(svar);
  if (nycklar.length < 3) return null;
  const varden: number[] = [];
  for (const utelamna of nycklar) {
    const delmangd = { ...svar };
    delete delmangd[Number(utelamna)];
    const { index } = raknaIndex(delmangd, viktiga, partiId, fragor);
    if (index !== null) varden.push(index);
  }
  return varden.length ? { min: Math.min(...varden), max: Math.max(...varden) } : null;
}

function compareSpannKey(
  a: Spann | null | undefined,
  b: Spann | null | undefined,
  key: "min" | "max",
): number {
  const av = a?.[key];
  const bv = b?.[key];
  if (av === undefined && bv === undefined) return 0;
  if (av === undefined) return 1;
  if (bv === undefined) return -1;
  return bv - av;
}

export type ResultatRad = Parti & {
  index: number;
  kanda: number;
  spann: Spann | null;
};

export type ResultatGrupp = {
  index: number;
  partier: ResultatRad[];
};

export function grupperaResultat(rader: ResultatRad[]): ResultatGrupp[] {
  const sorterade = [...rader].sort((a, b) => {
    if (b.index !== a.index) return b.index - a.index;
    const maxCmp = compareSpannKey(a.spann, b.spann, "max");
    if (maxCmp !== 0) return maxCmp;
    const minCmp = compareSpannKey(a.spann, b.spann, "min");
    if (minCmp !== 0) return minCmp;
    return a.namn.localeCompare(b.namn, "sv");
  });
  const grupper: ResultatGrupp[] = [];
  for (const rad of sorterade) {
    const sista = grupper[grupper.length - 1];
    if (sista && sista.index === rad.index) sista.partier.push(rad);
    else grupper.push({ index: rad.index, partier: [rad] });
  }
  return grupper;
}

export function stallning(p: number | null | undefined): string {
  if (p === null || p === undefined) return "Inget publicerat svar";
  if (p === 2) return "Helt för";
  if (p === 1) return "Delvis för";
  if (p === 0) return "Varken för eller emot";
  if (p === -1) return "Delvis emot";
  return "Helt emot";
}
