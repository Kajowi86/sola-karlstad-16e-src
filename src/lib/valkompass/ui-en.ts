export const META_EN = {
  title: "Karlstad Election Compass",
  description:
    "Election compass for the Karlstad municipal election on 13 September 2026. Everything is calculated in your browser. No answers are saved.",
} as const;

export const SVAR_EN = [
  { v: 2, etikett: "Very good proposal" },
  { v: 1, etikett: "Fairly good proposal" },
  { v: 0, etikett: "Neither good nor bad" },
  { v: -1, etikett: "Fairly bad proposal" },
  { v: -2, etikett: "Very bad proposal" },
] as const;

const STALLNING_EN: Record<string, string> = {
  null: "No published answer",
  "2": "Fully in favour",
  "1": "Partly in favour",
  "0": "Neither in favour nor against",
  "-1": "Partly against",
  "-2": "Fully against",
};

export function stallningEn(p: number | null | undefined): string {
  if (p === null || p === undefined) return STALLNING_EN.null;
  const etikett = STALLNING_EN[String(p)];
  if (!etikett) throw new Error(`Saknad engelsk positionsetikett: ${String(p)}`);
  return etikett;
}

export type EnFraga = { kat: string; text: string; desc: string };

export const FRAGOR_EN: Record<string, EnFraga> = {
  hamngatan: {
    kat: "Traffic",
    text: "Hamngatan should have fewer car lanes to make room for buses.",
    desc: "This concerns the redevelopment around the transport hub (Resecentrum). The question concerns the car lanes on Hamngatan, not the project as a whole.",
  },
  vindkraft: {
    kat: "Energy",
    text: "The municipality should say no to new wind turbines.",
    desc: "Karlstad adopted a new wind-power plan in 2026. The municipality has a right of veto over developments.",
  },
  karnkraft: {
    kat: "Energy",
    text: "The municipality should work to support the establishment of nuclear power in Karlstad.",
    desc: "The municipality cannot decide on nuclear power on its own, but it can promote its establishment through land-use decisions, permits and advocacy.",
  },
  klimatmal: {
    kat: "Climate",
    text: "The municipality should keep the goal of being climate-neutral by 2030.",
    desc: "Karlstad has an adopted goal of climate neutrality by 2030. The question is whether that goal should remain.",
  },
  privat_aldre: {
    kat: "Elderly care",
    text: "The municipality should allow private companies to provide elderly care services.",
    desc: "The dividing line is whether more providers shorten waiting lists and offer greater choice, or draw staff away from municipal services.",
  },
  forsorjningsstod: {
    kat: "Social support",
    text: "The municipality should set stricter requirements for people receiving social assistance (försörjningsstöd).",
    desc: "Requirements may involve taking part in activities, doing something in return and follow-up. The concern is whether these requirements exclude those who need the support most.",
  },
  pride: {
    kat: "Symbolic issues",
    text: "The municipality should fly the Pride flag.",
    desc: "A symbolic issue. Eight of nine parties are in favour. It is included because voters expect it, not because it maximises difference.",
  },
  parkering: {
    kat: "Traffic",
    text: "Parking should be free throughout Karlstad.",
    desc: "Free parking makes things easier for those who go by car, but it reduces revenue and can increase car traffic in the centre.",
  },
  arbetstid: {
    kat: "Staff",
    text: "Employees in elderly care should have shorter working hours with full pay.",
    desc: "Shorter hours have been used to retain staff in demanding jobs. The question is whether the staffing gain outweighs the cost.",
  },
  fritidsgardar: {
    kat: "Safety",
    text: "The municipality should invest in youth recreation centres to reduce crime.",
    desc: "Youth recreation centres are a preventive measure. The dividing line is whether they are the right tool against crime, and how much they should cost.",
  },
  politikerloner: {
    kat: "Economy",
    text: "Pay should be cut for the municipality’s top politicians.",
    desc: "The question is mainly about what the proposal signals about trust and priorities. Its effect on the municipal budget is small compared with other items.",
  },
  skatt: {
    kat: "Economy",
    text: "The municipality should prioritise a lower municipal tax rate over more welfare services.",
    desc: "This is a question about overall priorities. Agreeing means that the municipality should prioritise a lower municipal tax rate over expanding welfare services. The positions have been inverted to match the new wording.",
  },
  kultur: {
    kat: "Culture",
    text: "Culture should play a stronger role in the municipality’s future initiatives.",
    desc: "Culture can include performance venues, libraries, community organisations and public spaces. The counterargument is that the money would be better spent elsewhere.",
  },
  flyktingar: {
    kat: "Refugee reception",
    text: "The municipality should take greater responsibility for receiving people seeking refuge.",
    desc: "The municipality has authority over reception, housing and integration. The question is how much responsibility Karlstad should take compared with today.",
  },
  flygplatsen: {
    kat: "Airport",
    text: "The municipality should stop owning and subsidising Karlstad Airport.",
    desc: "Karlstad Municipality owns 95 per cent of the airport company. The positions are assessments, not the parties’ own answers.",
  },
  bostader: {
    kat: "Housing",
    text: "KBAB should build more rental housing.",
    desc: "KBAB is the municipality’s housing company and owns around 7,400 apartments.",
  },
  friskolor: {
    kat: "Schools",
    text: "The municipality should oppose the establishment of additional independent schools (friskolor).",
    desc: "The municipality cannot ban independent schools, but it can oppose the establishment of new ones through planning and public advocacy.",
  },
  landsbygd: {
    kat: "Rural areas",
    text: "Municipal services in outlying areas should be expanded.",
    desc: "Proximity to services throughout the municipality is weighed against cost per resident and staffing.",
  },
};

export function kravEnFraga(id: string): EnFraga {
  const f = FRAGOR_EN[id];
  if (!f) throw new Error(`Saknad engelsk nyckel: ${id}`);
  return f;
}

export const UI_EN = {
  metodH1: "Method and sources",
  metodStatus: "The Karlstad Election Compass is an election compass.",
  metodKarnFord: "Core and follow-up",
  metodKarnBrood:
    "The core consists of 14 scored questions. The four follow-up questions are shown after the results and do not affect the match index.",
  metodBerakning: "Calculation",
  metodBerakningBrood:
    "The match index is an integer between 0 and 100. For each core question you answer, your response is compared with the party’s position. The differences are added together and converted into an index. Questions marked as extra important count double. You must answer at least four core questions.",
  metodKalla: "Source",
  metodKallaLank: "SVT’s 2026 election compass for Karlstad Municipality",
  tillStartsidan: "← To the start page",
  tillResultatet: "← To the result",
  startSedel: "MUNICIPAL COUNCIL · KARLSTAD · 13 SEPTEMBER 2026",
  startH1: "Karlstad Election Compass",
  startIngress:
    "Fourteen statements answered directly by the parties. Give your own answers to the same statements to see which parties are closest to your views.",
  utkastStarkt: "Draft — not ready for publication.",
  utkastBrood:
    " A spot check of four questions (20 cells) produced consistent results in two independent readings. Mark the source check as complete only after a human review of the entire core.",
  tvaDelar: "Two parts with different status",
  karnanStarkt: "The core",
  karnanIngress:
    " consists of fourteen statements that all nine parties answered. Only the core is scored, and every party is assessed on exactly the same questions.",
  fordjupningStarkt: "The follow-up section",
  fordjupningIngress:
    " consists of four local questions — the airport, KBAB, independent schools (friskolor), and rural services. The parties did not answer these questions in a common questionnaire. They are therefore not scored, but you can still answer them and compare the parties question by question.",
  vilkaPartier: "Which parties are included",
  borja: "Start",
  integritet:
    "Everything is calculated in your browser. No answers are saved and nothing is sent anywhere. The election compass is not a voting recommendation.",
  metodLank: "Method and sources",
  kontaktEtikett: "Contact",
  seAvenAria: "Other election compasses",
  seAvenH2: "See also",
  seAvenBrood: "The same kind of election compass for the Riksdag election and the regional election.",
  legendPastaende: "What do you think about this statement?",
  hjalpViktiga: "You will choose which questions are important later, after you have seen all fourteen.",
  foregaende: "← Previous",
  hoppaOver: "Skip",
  nasta: "Next",
  granskaSvaren: "Review your answers",
  granskaSedel: "REVIEW AND PRIORITISE",
  dinaSvar: "Your answers",
  ingetSvar: "No answer",
  tillPastaendena: "← To the statements",
  visaResultat: "Show results",
  viktAv: "☆ Important",
  viktPa: "★ Important",
  resultatH1: "How closely the parties match you",
  resultatIngress:
    "A match index between 0 and 100 for the statements you answered. Not a forecast, not a recommendation.",
  utanMandat: "currently holds no seats",
  vadTaletSager: "What the number does not say.",
  vadTaletBrood:
    " Fourteen statements cannot capture every aspect of local politics. The sensitivity range shows how much the result changes if a single question is swapped out. Parties with the same index are shown as a group because they cannot be distinguished from one another. A party that takes a middle position automatically ends up closer to a wider range of views.",
  kallEjKontrollerad:
    " In addition, the parties’ answers have not yet been checked against the source by a person.",
  fortsattLokala: "Continue to the local questions",
  andraSvar: "← Change my answers",
  borjaOm: "Start over from the beginning",
  legendTycker: "What do you think?",
  jamforH2: "The parties’ assessed positions",
  jamforFot:
    "Check these assessments against the parties’ own municipal programmes before drawing conclusions from the comparison.",
  tillbakaResultat: "Back to the result",
  p0n: "The parties did not answer this question in a common questionnaire. The positions below are based on assessments — they are not the parties’ own answers. They are therefore not scored, and no strong positions are used: a derived position must never be placed at either extreme — fully in favour or fully against.",
} as const;

export function pastaendeAvEn(n: number, tot: number) {
  return `Statement ${n} of ${tot}`;
}
export function resultatSedelEn(n: number, tot: number) {
  return `RESULT · ${n} OF ${tot} ANSWERED`;
}
export function fordjupningSedelEn(n: number, tot: number) {
  return `FOLLOW-UP · ${n} / ${tot} · NOT SCORED`;
}
export function granskaIngressEn(max: number, markerade: number) {
  return `Change any answers you like. Select up to ${max} questions that will count double — you have selected ${markerade}.`;
}
export function minstSvarEn(min: number, antal: number) {
  return `Answer at least ${min} statements to get a result. You have answered ${antal}.`;
}
export function gruppEtikettEn(index: number) {
  return `Cannot be told apart · index ${index}`;
}
export function spannTextEn(min: number, max: number, kanda: number, antal: number) {
  return `Ranges from ${min} to ${max} if a single question is removed · based on ${kanda} of your ${antal} answers`;
}
export function detaljMetaEn(du: string, namn: string, parti: string, viktig: boolean) {
  return `You: ${du} · ${namn}: ${parti}${viktig ? " · important to you" : ""}`;
}
export function dittSvarPaEn(text: string) {
  return `Your answer to: ${text}`;
}
