import type { Fraga, Parti } from "./berakning";

export const KALLKONTROLL_GJORD = true;
export const AVSANDARE = "Kajowi";
export const KONTAKT = "john.online.ai@gmail.com";

export const SYSTER = [
  { namn: "Valkompass Riksdagen", href: "https://riksdagen.grok.me/" },
  { namn: "Valkompass Värmland", href: "https://varmland.grok.me/" },
] as const;

export const PARTIER: Parti[] = [
  { id: "V", namn: "Vänsterpartiet", kort: "V", farg: "#AF0000", mandat: true },
  { id: "S", namn: "Socialdemokraterna", kort: "S", farg: "#E8112D", mandat: true },
  { id: "MP", namn: "Miljöpartiet", kort: "MP", farg: "#83CF39", mandat: true },
  { id: "C", namn: "Centerpartiet", kort: "C", farg: "#009933", mandat: true },
  { id: "L", namn: "Liberalerna", kort: "L", farg: "#006AB3", mandat: true },
  { id: "KD", namn: "Kristdemokraterna", kort: "KD", farg: "#005EA1", mandat: true },
  { id: "M", namn: "Moderaterna", kort: "M", farg: "#52BDEC", mandat: true },
  { id: "SD", namn: "Sverigedemokraterna", kort: "SD", farg: "#C9B016", mandat: true },
  {
    id: "KPL",
    namn: "Karlstadpartiet Livskvalitet",
    kort: "KPL",
    farg: "#E86008",
    mandat: true,
  },
];

export const KARNA: Fraga[] = [
  {
    id: "hamngatan",
    kat: "Trafik",
    text: "Hamngatan ska ha färre bilfiler för att ge plats för bussar.",
    desc: "Gäller ombyggnaden kring resecentrum. Frågan rör bilfilerna på Hamngatan, inte hela projektet.",
    kalla: "Hamngatan ska ha färre bilfiler för att ge plats för bussar",
    pos: { V: 2, S: 1, MP: 2, C: 2, L: -2, KD: -2, M: -2, SD: -2, KPL: -2 },
  },
  {
    id: "vindkraft",
    kat: "Energi",
    text: "Kommunen ska säga nej till nya vindkraftverk.",
    desc: "Karlstad antog en ny vindkraftsplan 2026. Kommunen har vetorätt mot etableringar.",
    kalla: "Kommunen ska säga nej till nya vindkraftverk",
    pos: { V: -2, S: -2, MP: -2, C: -1, L: 1, KD: 2, M: 1, SD: 2, KPL: -2 },
  },
  {
    id: "karnkraft",
    kat: "Energi",
    text: "Kommunen ska arbeta för etablering av kärnkraft i Karlstad.",
    desc: "Kommunen kan inte besluta om kärnkraft ensam, men kan verka för etablering genom mark, tillstånd och påverkansarbete.",
    kalla: "Kommunen ska arbeta för etablering av kärnkraft i Karlstad",
    pos: { V: -2, S: -1, MP: -2, C: -2, L: -1, KD: 2, M: 1, SD: 2, KPL: -2 },
  },
  {
    id: "klimatmal",
    kat: "Klimat",
    text: "Kommunen ska ha kvar målet att vara klimatneutralt 2030.",
    desc: "Karlstad har ett antaget mål om klimatneutralitet 2030. Frågan gäller om målet ska stå kvar.",
    kalla: "Kommunen ska ha kvar målet att vara klimatneutralt 2030",
    pos: { V: 1, S: 2, MP: 2, C: 2, L: 1, KD: -2, M: -1, SD: -2, KPL: -2 },
  },
  {
    id: "privat_aldre",
    kat: "Äldreomsorg",
    text: "Kommunen ska tillåta privata företag att driva äldrevård.",
    desc: "Skiljelinjen gäller om fler utförare kortar köer och ger valfrihet, eller drar personal från den kommunala verksamheten.",
    kalla: "Kommunen ska tillåta privata företag att driva äldrevård",
    pos: { V: -2, S: -1, MP: 1, C: 2, L: 2, KD: 2, M: 2, SD: 1, KPL: -2 },
  },
  {
    id: "forsorjningsstod",
    kat: "Socialt stöd",
    text: "Kommunen ska ställa högre krav på personer som får försörjningsstöd.",
    desc: "Krav kan handla om aktivitet, motprestation och uppföljning. Motståndet gäller om kraven stänger ute den som behöver stödet mest.",
    kalla: "Kommunen ska ställa högre krav på personer som får försörjningsstöd",
    pos: { V: -2, S: 1, MP: -1, C: -1, L: 1, KD: 2, M: 2, SD: 2, KPL: -1 },
  },
  {
    id: "pride",
    kat: "Symbolfrågor",
    text: "Kommunen ska hissa prideflaggan.",
    desc: "En symbolfråga. Åtta av nio partier är för. Den finns med för att väljaren förväntar sig den, inte för att den maximerar skillnad.",
    kalla: "Min kommun ska hissa prideflaggan",
    pos: { V: 2, S: 2, MP: 2, C: 2, L: 2, KD: 1, M: 2, SD: -2, KPL: 2 },
  },
  {
    id: "parkering",
    kat: "Trafik",
    text: "Det ska vara gratis att parkera i hela Karlstad.",
    desc: "Gratis parkering underlättar för den som tar bilen, men minskar intäkter och kan öka biltrafiken i centrum.",
    kalla: "Det ska vara gratis att parkera i hela Karlstad",
    pos: { V: -2, S: -2, MP: -2, C: -1, L: -1, KD: 1, M: 1, SD: 2, KPL: -2 },
  },
  {
    id: "arbetstid",
    kat: "Personal",
    text: "Anställda inom äldreomsorgen ska ha förkortad arbetstid med full lön.",
    desc: "Kortare arbetstid har använts för att behålla personal i slitsamma yrken. Frågan är om vinsten i bemanning väger upp kostnaden.",
    kalla: "Anställda inom äldreomsorgen ska ha förkortad arbetstid med full lön",
    pos: { V: 2, S: 1, MP: 2, C: -2, L: -2, KD: -2, M: -1, SD: 1, KPL: -1 },
  },
  {
    id: "fritidsgardar",
    kat: "Trygghet",
    text: "Kommunen ska satsa på fritidsgårdar för att minska kriminaliteten.",
    desc: "Fritidsgårdar är en förebyggande insats. Skiljelinjen gäller om de är rätt verktyg mot brott, och hur mycket de ska kosta.",
    kalla: "Kommunen ska satsa på fritidsgårdar för att minska kriminaliteten",
    pos: { V: 2, S: 1, MP: 2, C: 1, L: 1, KD: -2, M: 1, SD: -1, KPL: -1 },
  },
  {
    id: "politikerloner",
    kat: "Ekonomi",
    text: "Lönerna ska sänkas för kommunens toppolitiker.",
    desc: "En signalfråga om förtroende och prioriteringar. Effekten på kommunens budget är liten jämfört med andra poster.",
    kalla: "Lönerna ska sänkas för min kommuns toppolitiker",
    pos: { V: 2, S: -1, MP: 1, C: -1, L: -1, KD: -1, M: 1, SD: 2, KPL: 2 },
  },
  {
    id: "skatt",
    kat: "Ekonomi",
    text: "Kommunen ska prioritera lägre skatt framför fler välfärdstjänster.",
    desc: "En inriktningsfråga. Instämmande betyder att kommunen hellre sänker skatten än expanderar välfärden. Positionerna är inverterade så att de matchar den nya formuleringen.",
    kalla: "Hur mycket ska invånarna i min kommun betala i kommunalskatt?",
    pos: { V: 0, S: 0, MP: 0, C: 0, L: 1, KD: 1, M: 2, SD: 1, KPL: 0 },
  },
  {
    id: "kultur",
    kat: "Kultur",
    text: "Kulturen ska ha en starkare roll i kommunens framtida satsningar.",
    desc: "Kultur kan vara scener, bibliotek, föreningsliv och offentliga rum. Motståndet gäller om pengarna hellre ska gå till annat.",
    kalla: "Hur mycket pengar ska min kommun lägga på kultur?",
    pos: { V: 1, S: 1, MP: 2, C: 0, L: 1, KD: -1, M: 0, SD: -1, KPL: 0 },
  },
  {
    id: "flyktingar",
    kat: "Mottagande",
    text: "Kommunen ska ta ett större ansvar för att ta emot människor på flykt.",
    desc: "Kommunen har rådighet över mottagande, boende och integration. Frågan gäller hur stort ansvar Karlstad ska ta jämfört med i dag.",
    kalla: "Hur öppen ska min kommun vara för att ta emot flyktingar?",
    pos: { V: 1, S: 0, MP: 2, C: 0, L: 0, KD: -2, M: -1, SD: -2, KPL: 0 },
  },
];

/* Härledda. Poängsätts aldrig. D-02: ingen cell ±2 — klampad från Claude v1.3. */
export const FORDJUPNING: Fraga[] = [
  {
    id: "flygplatsen",
    kat: "Flygplatsen",
    text: "Kommunen ska sluta äga och subventionera Karlstad Airport.",
    desc: "Karlstads kommun äger 95 procent av flygplatsbolaget. Positionerna är bedömningar, inte partiernas egna svar.",
    pos: { V: 1, S: -1, MP: 1, C: null, L: -1, KD: -1, M: -1, SD: -1, KPL: 1 },
  },
  {
    id: "bostader",
    kat: "Bostäder",
    text: "KBAB ska bygga fler hyresrätter.",
    desc: "KBAB är kommunens bostadsbolag och äger omkring 7 400 lägenheter.",
    pos: { V: 1, S: 1, MP: 1, C: null, L: null, KD: -1, M: -1, SD: null, KPL: null },
  },
  {
    id: "friskolor",
    kat: "Skola",
    text: "Kommunen ska motverka etablering av fler friskolor.",
    desc: "Kommunen kan inte förbjuda friskolor, men kan verka mot nya etableringar genom planering och opinionsbildning.",
    pos: { V: 1, S: 1, MP: 1, C: -1, L: -1, KD: -1, M: -1, SD: -1, KPL: null },
  },
  {
    id: "landsbygd",
    kat: "Landsbygd",
    text: "Kommunal service i ytterorterna ska byggas ut.",
    desc: "Närhet till service i hela kommunen ställs mot kostnad per invånare och bemanning.",
    pos: { V: 1, S: 1, MP: 1, C: 1, L: null, KD: null, M: -1, SD: 1, KPL: 1 },
  },
];

export const SVAR = [
  { v: 2, etikett: "Mycket bra förslag" },
  { v: 1, etikett: "Ganska bra förslag" },
  { v: 0, etikett: "Varken bra eller dåligt" },
  { v: -1, etikett: "Ganska dåligt förslag" },
  { v: -2, etikett: "Mycket dåligt förslag" },
] as const;

export const MIN_SVAR = 4;
export const MAX_VIKTIGA = 3;
