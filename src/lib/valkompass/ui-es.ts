export const META_ES = {
  title: "Brújula electoral de Karlstad",
  description:
    "Brújula electoral para la elección municipal de Karlstad el 13 de septiembre de 2026. Todo se calcula en tu navegador. No se guardan respuestas.",
} as const;

export const SVAR_ES = [
  { v: 2, etikett: "Muy buena propuesta" },
  { v: 1, etikett: "Bastante buena propuesta" },
  { v: 0, etikett: "Ni buena ni mala" },
  { v: -1, etikett: "Bastante mala propuesta" },
  { v: -2, etikett: "Muy mala propuesta" },
] as const;

const STALLNING_ES: Record<string, string> = {
  null: "Sin respuesta publicada",
  "2": "Totalmente a favor",
  "1": "Parcialmente a favor",
  "0": "Ni a favor ni en contra",
  "-1": "Parcialmente en contra",
  "-2": "Totalmente en contra",
};

export function stallningEs(p: number | null | undefined): string {
  if (p === null || p === undefined) return STALLNING_ES.null;
  return STALLNING_ES[String(p)] ?? STALLNING_ES["-2"];
}

export type EsFraga = { kat: string; text: string; desc: string };

export const FRAGOR_ES: Record<string, EsFraga> = {
  hamngatan: {
    kat: "Tránsito",
    text: "Hamngatan debe tener menos carriles para autos a fin de dar espacio a los autobuses.",
    desc: "Se refiere a la remodelación alrededor de la estación central de transportes (resecentrum). La pregunta trata de los carriles de Hamngatan, no de todo el proyecto.",
  },
  vindkraft: {
    kat: "Energía",
    text: "El municipio debe decir no a nuevos aerogeneradores.",
    desc: "Karlstad aprobó un nuevo plan de energía eólica en 2026. El municipio tiene derecho de veto sobre la instalación de aerogeneradores.",
  },
  karnkraft: {
    kat: "Energía",
    text: "El municipio debe trabajar para que se instale energía nuclear en Karlstad.",
    desc: "El municipio no puede decidir por sí solo sobre la energía nuclear, pero puede promover su establecimiento mediante terrenos, permisos y labores de influencia.",
  },
  klimatmal: {
    kat: "Clima",
    text: "El municipio debe mantener la meta de ser climáticamente neutro en 2030.",
    desc: "Karlstad tiene una meta adoptada de neutralidad climática para 2030. La pregunta es si esa meta debe permanecer.",
  },
  privat_aldre: {
    kat: "Cuidado de personas mayores",
    text: "El municipio debe permitir que empresas privadas gestionen el cuidado de personas mayores (äldreomsorg).",
    desc: "La diferencia es si más prestadores acortan las listas de espera y dan libertad de elección, o si restan personal al servicio municipal.",
  },
  forsorjningsstod: {
    kat: "Apoyo social",
    text: "El municipio debe imponer requisitos más estrictos a quienes reciben ayuda económica municipal (försörjningsstöd).",
    desc: "Los requisitos pueden referirse a la participación en actividades, una contraprestación (motprestation) y el seguimiento. El desacuerdo es si esos requisitos excluyen a quienes más necesitan el apoyo.",
  },
  pride: {
    kat: "Preguntas simbólicas",
    text: "El municipio debe izar la bandera del Orgullo (prideflaggan).",
    desc: "Es una pregunta simbólica. Ocho de los nueve partidos están a favor. Está incluida porque los votantes esperan encontrarla, no porque maximice las diferencias.",
  },
  parkering: {
    kat: "Tránsito",
    text: "Estacionar debe ser gratis en todo Karlstad.",
    desc: "El estacionamiento gratis le facilita las cosas a quien usa el auto, pero reduce los ingresos y puede aumentar el tránsito de autos en el centro.",
  },
  arbetstid: {
    kat: "Empleados",
    text: "El personal del cuidado de personas mayores debe tener jornada reducida con salario completo.",
    desc: "La reducción de la jornada laboral se ha utilizado para retener al personal en trabajos desgastantes. La cuestión es si la mejora de la dotación de personal compensa el costo.",
  },
  fritidsgardar: {
    kat: "Seguridad",
    text: "El municipio debe invertir en centros juveniles (fritidsgårdar) para reducir la criminalidad.",
    desc: "Los centros juveniles son una medida preventiva. La diferencia es si son la herramienta adecuada contra el delito, y cuánto deben costar.",
  },
  politikerloner: {
    kat: "Economía",
    text: "Deben bajarse los sueldos de los altos cargos políticos del municipio.",
    desc: "Es una cuestión que transmite una señal sobre la confianza y las prioridades. Su efecto en el presupuesto municipal es pequeño en comparación con otras partidas.",
  },
  skatt: {
    kat: "Economía",
    text: "El municipio debe priorizar la reducción del impuesto municipal frente a la ampliación de los servicios de bienestar (välfärdstjänster).",
    desc: "Es una pregunta de orientación. Estar de acuerdo significa que el municipio prefiere reducir el impuesto antes que ampliar los servicios de bienestar. Las posiciones están invertidas para coincidir con la nueva formulación.",
  },
  kultur: {
    kat: "Cultura",
    text: "La cultura debe tener un papel más fuerte en las futuras iniciativas del municipio.",
    desc: "La cultura puede abarcar escenarios, bibliotecas, asociaciones y espacios públicos. El desacuerdo es si sería preferible destinar el dinero a otras áreas.",
  },
  flyktingar: {
    kat: "Acogida",
    text: "El municipio debe asumir una mayor responsabilidad en la acogida de personas que huyen.",
    desc: "El municipio tiene competencias en materia de acogida, vivienda e integración. La pregunta es qué grado de responsabilidad debe asumir Karlstad en comparación con la situación actual.",
  },
  flygplatsen: {
    kat: "El aeropuerto",
    text: "El municipio debe dejar de ser propietario de Karlstad Airport y dejar de subvencionarlo.",
    desc: "El municipio de Karlstad posee el 95 por ciento de la empresa aeroportuaria. Las posiciones son estimaciones, no respuestas de los propios partidos.",
  },
  bostader: {
    kat: "Vivienda",
    text: "KBAB debe construir más viviendas de alquiler (hyresrätter).",
    desc: "KBAB es la empresa municipal de vivienda y es propietaria de unas 7 400 viviendas.",
  },
  friskolor: {
    kat: "Escuela",
    text: "El municipio debe tomar medidas para frenar la apertura de más escuelas independientes (friskolor).",
    desc: "El municipio no puede prohibir las escuelas independientes, pero puede actuar para frenar nuevas aperturas mediante la planificación y acciones para influir en la opinión pública.",
  },
  landsbygd: {
    kat: "Medio rural",
    text: "Los servicios municipales en las localidades periféricas (ytterorterna) deben ampliarse.",
    desc: "La cercanía de los servicios en todo el municipio se contrapone al costo por habitante y a la dotación de personal.",
  },
};

export function kravEsFraga(id: string): EsFraga {
  const f = FRAGOR_ES[id];
  if (!f) throw new Error(`Saknad spansk nyckel: ${id}`);
  return f;
}

export const UI_ES = {
  metodH1: "Método y fuentes",
  metodStatus: "La Brújula electoral de Karlstad.",
  metodKarnFord: "Núcleo (kärna) y profundización (fördjupning)",
  metodKarnBrood:
    "El núcleo consiste en 14 preguntas que se puntúan. Las cuatro preguntas de profundización se muestran después del resultado y no afectan el índice de coincidencia (matchningsindex).",
  metodBerakning: "Cálculo",
  metodBerakningBrood:
    "El índice de coincidencia es un número entero entre 0 y 100. Por cada pregunta respondida del núcleo, se compara tu respuesta con la posición del partido. Las diferencias se suman y se convierten en un índice. Las preguntas marcadas como especialmente importantes (Extra viktiga) pesan el doble. Deben responderse al menos cuatro preguntas del núcleo.",
  metodKalla: "Fuente",
  metodKallaBrood:
    "Las posiciones de los partidos en las preguntas del núcleo provienen de la brújula electoral de SVT de 2026 para el municipio de Karlstad. SVT es la televisión pública sueca.",
  metodKallaLank: "la brújula electoral de SVT de 2026 para el municipio de Karlstad",
  tillStartsidan: "← A la página de inicio",
  tillResultatet: "← Al resultado",
  startSedel: "CONCEJO MUNICIPAL (KOMMUNFULLMÄKTIGE) · KARLSTAD · 13 DE SEPTIEMBRE DE 2026",
  startH1: "Brújula electoral de Karlstad",
  startIngress:
    "Catorce afirmaciones a las que los propios partidos han respondido. Tú tomas posición sobre esas mismas afirmaciones y ves qué partidos coinciden más contigo.",
  utkastStarkt: "Borrador — no está listo para publicación.",
  utkastBrood:
    " Un muestreo de cuatro preguntas (20 celdas) coincide entre dos lecturas independientes. Marca el control de fuentes como listo solo después de una revisión humana de todo el núcleo.",
  tvaDelar: "Dos partes con distinto estatus",
  karnanIngress:
    " consta de catorce afirmaciones a las que los nueve partidos han respondido. Solo esta parte se puntúa, y todos los partidos se evalúan a partir de exactamente las mismas preguntas.",
  karnanStarkt: "núcleo (kärnan)",
  fordjupningIngress:
    " consta de cuatro preguntas locales: el aeropuerto, KBAB (la empresa municipal de vivienda), las escuelas independientes de gestión privada y financiadas con fondos públicos (friskolor), y los servicios en las zonas rurales. Los partidos no han respondido estas preguntas en una fuente común. Por eso estas preguntas no se puntúan, pero puedes responderlas y comparar las posiciones, pregunta por pregunta.",
  fordjupningStarkt: "sección de profundización (fördjupningen)",
  vilkaPartier: "Qué partidos participan",
  partierBrood:
    "Nueve partidos en la elección municipal: los ocho partidos del Riksdag (el parlamento nacional sueco) más Karlstadpartiet Livskvalitet. La lista no es necesariamente completa. Compruébalo en ",
  partierEfter: ".",
  borja: "Empezar",
  integritet:
    "Todo se calcula en tu navegador. No se guardan respuestas y no se envía nada. Esta brújula no es una recomendación de voto.",
  metodLank: "Método y fuentes",
  kontaktEtikett: "Contacto",
  seAvenAria: "Otras brújulas electorales",
  seAvenH2: "Ver también",
  seAvenBrood: "El mismo tipo de brújula para la elección al Riksdag y la elección regional.",
  legendPastaende: "¿Qué opinas de la afirmación?",
  hjalpViktiga: "Las preguntas importantes las eliges después, cuando hayas visto las catorce.",
  foregaende: "← Anterior",
  hoppaOver: "Omitir",
  nasta: "Siguiente",
  granskaSvaren: "Revisar las respuestas",
  granskaSedel: "REVISAR Y PRIORIZAR",
  dinaSvar: "Tus respuestas",
  ingetSvar: "Sin respuesta",
  tillPastaendena: "← A las afirmaciones",
  visaResultat: "Ver resultado",
  viktAv: "☆ Importante",
  viktPa: "★ Importante",
  resultatH1: "Qué tan cerca están los partidos de tus respuestas",
  resultatIngress:
    "Un índice de coincidencia (matchningsindex) entre 0 y 100 para las afirmaciones que respondiste. No es un pronóstico ni una recomendación.",
  utanMandat: "sin mandato actual",
  vadTaletSager: "Lo que el número no dice.",
  vadTaletBrood:
    " Catorce afirmaciones no pueden abarcar toda la política municipal. El intervalo de sensibilidad muestra cuánto cambia el resultado si se sustituye una sola pregunta. Los partidos con el mismo índice aparecen en un mismo grupo porque el índice no permite diferenciarlos. Un partido que responde en el punto medio de la escala queda automáticamente más cerca de un mayor número de opiniones posibles.",
  kallEjKontrollerad:
    " Además, las respuestas de los partidos aún no han sido contrastadas con la fuente por una persona.",
  fortsattLokala: "Continuar con las preguntas locales",
  andraSvar: "← Cambiar mis respuestas",
  borjaOm: "Volver a empezar",
  legendTycker: "¿Qué opinas?",
  jamforH2: "Posición estimada de los partidos",
  jamforFot:
    "Contrasta estas estimaciones con los propios programas municipales de los partidos antes de sacar conclusiones de la comparación.",
  tillbakaResultat: "Volver al resultado",
  p0n: "Los partidos no han respondido esta pregunta en una fuente común. Las posiciones que aparecen abajo son estimaciones, no respuestas de los propios partidos. Por eso no se puntúan y no aparecen posturas fuertes: a una posición derivada nunca se le asigna “totalmente a favor” ni “totalmente en contra”.",
} as const;

export function pastaendeAvEs(n: number, tot: number) {
  return `Afirmación ${n} de ${tot}`;
}
export function resultatSedelEs(n: number, tot: number) {
  return `RESULTADO · ${n} DE ${tot} RESPONDIDAS`;
}
export function fordjupningSedelEs(n: number, tot: number) {
  return `PROFUNDIZACIÓN · ${n} / ${tot} · NO SE PUNTÚA`;
}
export function granskaIngressEs(max: number, markerade: number) {
  return `Cambia lo que quieras. Marca hasta ${max} preguntas con peso doble; has marcado ${markerade}.`;
}
export function minstSvarEs(min: number, antal: number) {
  return `Responde al menos ${min} afirmaciones para obtener un resultado. Has respondido ${antal}.`;
}
export function gruppEtikettEs(index: number) {
  return `No se pueden diferenciar · índice ${index}`;
}
export function spannTextEs(min: number, max: number, kanda: number, antal: number) {
  return `Varía entre ${min} y ${max} si se quita una sola pregunta · se basa en ${kanda} de tus ${antal} respuestas`;
}
export function detaljMetaEs(du: string, namn: string, parti: string, viktig: boolean) {
  return `Tú: ${du} · ${namn}: ${parti}${viktig ? " · importante para ti" : ""}`;
}
export function dittSvarPaEs(text: string) {
  return `Tu respuesta a: ${text}`;
}
