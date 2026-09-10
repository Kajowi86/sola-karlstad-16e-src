import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { grupperaResultat, kanslighet, raknaIndex, stallning } from "@/lib/valkompass/berakning";
import {
  AVSANDARE,
  FORDJUPNING,
  KALLKONTROLL_GJORD,
  KARNA,
  MAX_VIKTIGA,
  MIN_SVAR,
  PARTIER,
  SVAR,
  SYSTER,
} from "@/lib/valkompass/data";
import type { Fraga, SvarMap } from "@/lib/valkompass/berakning";
import {
  UI_ES,
  SVAR_ES,
  kravEsFraga,
  stallningEs,
  detaljMetaEs,
  dittSvarPaEs,
  fordjupningSedelEs,
  gruppEtikettEs,
  granskaIngressEs,
  minstSvarEs,
  pastaendeAvEs,
  resultatSedelEs,
  spannTextEs,
} from "@/lib/valkompass/ui-es";
import {
  UI_EN,
  SVAR_EN,
  kravEnFraga,
  stallningEn,
  detaljMetaEn,
  dittSvarPaEn,
  fordjupningSedelEn,
  gruppEtikettEn,
  granskaIngressEn,
  minstSvarEn,
  pastaendeAvEn,
  resultatSedelEn,
  spannTextEn,
} from "@/lib/valkompass/ui-en";

export type Sok = { vy?: "metod"; fran?: "resultat" };
export type Bas = "/" | "/es" | "/en";
export type Sprak = "sv" | "es" | "en";

type Vy = "intro" | "kompass" | "granska" | "resultat" | "fordjupning";

export function ValkompassKarlstad({
  sprak,
  bas,
  sok,
}: {
  sprak: Sprak;
  bas: Bas;
  sok: Sok;
}) {
  const es = sprak === "es";
  const en = sprak === "en";
  const t = (sv: string, sp: string, eng: string) => (en ? eng : es ? sp : sv);
  const visad = (f: Fraga): Fraga =>
    es ? { ...f, ...kravEsFraga(f.id) } : en ? { ...f, ...kravEnFraga(f.id) } : f;
  const svarsalternativ = en ? SVAR_EN : es ? SVAR_ES : SVAR;
  const stall = (p: number | null | undefined) =>
    en ? stallningEn(p) : es ? stallningEs(p) : stallning(p);

  const [vy, setVy] = useState<Vy>("intro");
  const [idx, setIdx] = useState(0);
  const [svar, setSvar] = useState<SvarMap>({});
  const [viktiga, setViktiga] = useState<number[]>([]);
  const [oppen, setOppen] = useState<string | null>(null);
  const [fSvar, setFSvar] = useState<SvarMap>({});
  const [fIdx, setFIdx] = useState(0);
  const navigate = useNavigate();
  const metod = sok.vy === "metod";
  const franResultat = sok.fran === "resultat";

  const rubrikRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    rubrikRef.current?.focus();
  }, [vy, idx, fIdx, metod]);

  useLayoutEffect(() => {
    const st = window.history.state as {
      vkSvar?: SvarMap;
      vkViktiga?: number[];
      vkFSvar?: SvarMap;
    } | null;
    if (st?.vkSvar && typeof st.vkSvar === "object") setSvar(st.vkSvar);
    if (Array.isArray(st?.vkViktiga)) setViktiga(st.vkViktiga);
    if (st?.vkFSvar && typeof st.vkFSvar === "object") setFSvar(st.vkFSvar);
  }, []);

  const tillbakaFranMetod = () => {
    void navigate({ to: bas, search: {} });
    if (franResultat && Object.keys(svar).length >= MIN_SVAR) setVy("resultat");
    else setVy("intro");
  };

  const antalSvar = Object.keys(svar).length;
  const q = visad(KARNA[idx]);

  const resultat = useMemo(() => {
    if (antalSvar < MIN_SVAR) return null;
    const rader = PARTIER.map((p) => {
      const { index, kanda } = raknaIndex(svar, viktiga, p.id, KARNA);
      return { ...p, index: index as number, kanda, spann: kanslighet(svar, viktiga, p.id, KARNA) };
    }).filter((r) => r.index !== null && !Number.isNaN(r.index));
    return grupperaResultat(rader);
  }, [svar, viktiga, antalSvar]);

  const gaVidare = () =>
    idx + 1 < KARNA.length ? setIdx(idx + 1) : setVy("granska");

  const hoppaOver = () => {
    setSvar((f) => {
      const n = { ...f };
      delete n[idx];
      return n;
    });
    setViktiga((v) => v.filter((i) => i !== idx));
    gaVidare();
  };

  const vaxlaViktig = (qi: number) =>
    setViktiga((v) =>
      v.includes(qi) ? v.filter((i) => i !== qi) : v.length < MAX_VIKTIGA ? [...v, qi] : v,
    );

  const borjaOm = () => {
    setSvar({});
    setViktiga([]);
    setIdx(0);
    setOppen(null);
    setFSvar({});
    setFIdx(0);
    setVy("intro");
  };

  return (
    <div style={S.app}>
      {metod && (
        <main style={S.shell}>
          <h1 style={S.h1} tabIndex={-1} ref={rubrikRef}>
            {t("Metod och källor", UI_ES.metodH1, UI_EN.metodH1)}
          </h1>
          <p style={S.ingress}>{t("Valkompass Karlstad är en valkompass.", UI_ES.metodStatus, UI_EN.metodStatus)}</p>
          <div style={S.ruta}>
            <h2 style={S.h3}>{t("Kärna och fördjupning", UI_ES.metodKarnFord, UI_EN.metodKarnFord)}</h2>
            <p style={S.brodSist}>
              {t(
                "Kärnan består av 14 frågor som poängsätts. De fyra fördjupningsfrågorna visas efter resultatet och påverkar inte matchningsindexet.",
                UI_ES.metodKarnBrood,
                UI_EN.metodKarnBrood,
              )}
            </p>
          </div>
          <div style={S.ruta}>
            <h2 style={S.h3}>{t("Beräkning", UI_ES.metodBerakning, UI_EN.metodBerakning)}</h2>
            <p style={S.brodSist}>
              {t(
                "Matchningsindexet är ett heltal mellan 0 och 100. För varje besvarad kärnfråga jämförs ditt svar med partiets position. Skillnaderna summeras och räknas om till ett index. Frågor som markeras Extra viktiga väger dubbelt. Minst fyra kärnfrågor måste besvaras.",
                UI_ES.metodBerakningBrood,
                UI_EN.metodBerakningBrood,
              )}
            </p>
          </div>
          <div style={S.ruta}>
            <h2 style={S.h3}>{t("Källa", UI_ES.metodKalla, UI_EN.metodKalla)}</h2>
            <p style={S.brodSist}>
              {es ? (
                <>
                  Las posiciones de los partidos en las preguntas del núcleo provienen de{" "}
                  <a
                    href="https://valkompass.svt.se/2026/karlstad/kommun/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {UI_ES.metodKallaLank}
                  </a>
                  . SVT es la televisión pública sueca.
                </>
              ) : en ? (
                <>
                  The parties’ positions on the core questions come from{" "}
                  <a
                    href="https://valkompass.svt.se/2026/karlstad/kommun/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {UI_EN.metodKallaLank}
                  </a>
                  . SVT is Sweden’s public service broadcaster.
                </>
              ) : (
                <>
                  Partiernas positioner i kärnfrågorna kommer från{" "}
                  <a
                    href="https://valkompass.svt.se/2026/karlstad/kommun/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    SVT:s valkompass 2026 för Karlstads kommun
                  </a>
                  .
                </>
              )}
            </p>
          </div>
          <KontaktRad etikett={t("Kontakt", UI_ES.kontaktEtikett, UI_EN.kontaktEtikett)} />
          <button className="vk-sekundar" style={S.storKnapp} onClick={tillbakaFranMetod}>
            {franResultat
              ? t("← Till resultatet", UI_ES.tillResultatet, UI_EN.tillResultatet)
              : t("← Till startsidan", UI_ES.tillStartsidan, UI_EN.tillStartsidan)}
          </button>
        </main>
      )}

      {!metod && vy === "intro" && (
        <main style={S.shell}>
          <div style={S.sedel}>
            {t("KOMMUNFULLMÄKTIGE · KARLSTAD · 13 SEPTEMBER 2026", UI_ES.startSedel, UI_EN.startSedel)}
          </div>
          <h1 style={S.h1} tabIndex={-1} ref={rubrikRef}>
            {t("Valkompass Karlstad", UI_ES.startH1, UI_EN.startH1)}
          </h1>
          <p style={S.ingress}>
            {t(
              "Fjorton påståenden som partierna själva har besvarat. Du tar ställning till samma påståenden och ser vilka som ligger närmast dig.",
              UI_ES.startIngress,
              UI_EN.startIngress,
            )}
          </p>

          <button className="vk-primar" style={S.storKnapp} onClick={() => setVy("kompass")}>
            {t("Starta", UI_ES.borja, UI_EN.borja)}
          </button>

          {!KALLKONTROLL_GJORD && (
            <div style={S.varning} role="note">
              <strong>{t("Utkast — inte klar för publicering.", UI_ES.utkastStarkt, UI_EN.utkastStarkt)}</strong>
              {t(
                " Stickprov av fyra frågor (20 celler) stämmer mellan två oberoende avläsningar. Sätt källkontrollen till klar först efter en mänsklig genomgång av hela kärnan.",
                UI_ES.utkastBrood,
                UI_EN.utkastBrood,
              )}
            </div>
          )}

          <div style={S.ruta}>
            <h2 style={S.h3}>{t("Två delar med olika status", UI_ES.tvaDelar, UI_EN.tvaDelar)}</h2>
            {es ? (
              <>
                <p style={S.brod}>
                  El <strong>{UI_ES.karnanStarkt}</strong>
                  {UI_ES.karnanIngress}
                </p>
                <p style={S.brodSist}>
                  La <strong>{UI_ES.fordjupningStarkt}</strong>
                  {UI_ES.fordjupningIngress}
                </p>
              </>
            ) : en ? (
              <>
                <p style={S.brod}>
                  <strong>{UI_EN.karnanStarkt}</strong>
                  {UI_EN.karnanIngress}
                </p>
                <p style={S.brodSist}>
                  {UI_EN.fordjupningStarkt}
                  {UI_EN.fordjupningIngress}
                </p>
              </>
            ) : (
              <>
                <p style={S.brod}>
                  <strong>Kärnan</strong> är fjorton påståenden där alla nio
                  partier har lämnat ett eget svar. Bara den räknas, och
                  alla partier bedöms på exakt samma frågor.
                </p>
                <p style={S.brodSist}>
                  <strong>Fördjupningen</strong> är fyra lokala frågor — flygplatsen,
                  KBAB, friskolor och landsbygdsservice. Partierna har inte
                  besvarat dem gemensamt. Därför får de inget poängtal, men du kan
                  svara och jämföra fråga för fråga.
                </p>
              </>
            )}
          </div>

          <div style={S.ruta}>
            <h2 style={S.h3}>{t("Vilka partier som är med", UI_ES.vilkaPartier, UI_EN.vilkaPartier)}</h2>
            <p style={S.brodSist}>
              {es ? (
                <>
                  Nueve partidos en la elección municipal: los ocho partidos del Riksdag (el
                  parlamento nacional sueco) más Karlstadpartiet Livskvalitet. La lista no es
                  necesariamente completa. Compruébalo en{" "}
                  <a href="https://www.val.se" target="_blank" rel="noopener noreferrer">
                    Valmyndigheten
                  </a>{" "}
                  (la autoridad electoral sueca).
                </>
              ) : en ? (
                <>
                  Nine parties are included in the municipal election: the eight parties represented
                  in the Riksdag (Sweden’s national parliament), plus Karlstadpartiet Livskvalitet.
                  The list is not necessarily complete. Check with{" "}
                  <a href="https://www.val.se" target="_blank" rel="noopener noreferrer">
                    Valmyndigheten
                  </a>
                  , the Swedish Election Authority.
                </>
              ) : (
                <>
                  Nio partier i kommunvalet: de åtta riksdagspartierna plus
                  Karlstadpartiet Livskvalitet. Listan är inte nödvändigtvis
                  fullständig. Kontrollera hos{" "}
                  <a href="https://www.val.se" target="_blank" rel="noopener noreferrer">
                    Valmyndigheten
                  </a>
                  .
                </>
              )}
            </p>
          </div>

          <p style={S.finstilt}>
            {t(
              "Allt räknas i din webbläsare. Inga svar sparas och inget skickas vidare. Kompassen är inte en röstrekommendation.",
              UI_ES.integritet,
              UI_EN.integritet,
            )}
          </p>
          <Sidfot sprak={sprak} bas={bas} />
        </main>
      )}

      {!metod && vy === "kompass" && (
        <main style={S.shell}>
          <div style={S.forloppRad}>
            <div
              style={S.spar}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={KARNA.length}
              aria-valuenow={idx + 1}
              aria-label={
                es
                  ? pastaendeAvEs(idx + 1, KARNA.length)
                  : en
                    ? pastaendeAvEn(idx + 1, KARNA.length)
                    : `Påstående ${idx + 1} av ${KARNA.length}`
              }
            >
              <div style={{ ...S.fyll, width: `${((idx + 1) / KARNA.length) * 100}%` }} />
            </div>
            <span style={S.forloppText}>
              {idx + 1} / {KARNA.length}
            </span>
          </div>

          <div style={S.kort}>
            <div style={S.sedelInne}>{q.kat.toUpperCase()}</div>
            <h1 style={S.pastaende} tabIndex={-1} ref={rubrikRef}>
              {q.text}
            </h1>
            <p style={S.desc}>{q.desc}</p>

            <fieldset style={S.faltgrupp}>
              <legend style={S.dold}>
                {t("Vad tycker du om påståendet?", UI_ES.legendPastaende, UI_EN.legendPastaende)}
              </legend>
              {svarsalternativ.map((a) => (
                <label key={a.v} className={"vk-svar" + (svar[idx] === a.v ? " vald" : "")}>
                  <input
                    type="radio"
                    name={`k-${idx}`}
                    style={S.radio}
                    checked={svar[idx] === a.v}
                    onChange={() => setSvar((f) => ({ ...f, [idx]: a.v }))}
                  />
                  <span>{a.etikett}</span>
                </label>
              ))}
            </fieldset>
            <p style={S.hjalp}>
              {t(
                "Viktiga frågor väljer du sedan, när du sett alla fjorton.",
                UI_ES.hjalpViktiga,
                UI_EN.hjalpViktiga,
              )}
            </p>
          </div>

          <div style={S.navRad}>
            {idx === 0 ? (
              <button className="vk-sekundar" onClick={() => setVy("intro")}>
                {t("← Till startsidan", UI_ES.tillStartsidan, UI_EN.tillStartsidan)}
              </button>
            ) : (
              <button className="vk-sekundar" onClick={() => setIdx(idx - 1)}>
                {t("← Föregående", UI_ES.foregaende, UI_EN.foregaende)}
              </button>
            )}
            <button className="vk-spok" onClick={hoppaOver}>
              {t("Hoppa över", UI_ES.hoppaOver, UI_EN.hoppaOver)}
            </button>
            <button
              className="vk-primar"
              style={S.nasta}
              onClick={gaVidare}
              disabled={svar[idx] === undefined}
            >
              {idx + 1 === KARNA.length
                ? t("Granska svaren", UI_ES.granskaSvaren, UI_EN.granskaSvaren)
                : t("Nästa", UI_ES.nasta, UI_EN.nasta)}
            </button>
          </div>
        </main>
      )}

      {!metod && vy === "granska" && (
        <main style={S.shell}>
          <div style={S.sedel}>{t("GRANSKA OCH PRIORITERA", UI_ES.granskaSedel, UI_EN.granskaSedel)}</div>
          <h1 style={S.h1} tabIndex={-1} ref={rubrikRef}>
            {t("Dina svar", UI_ES.dinaSvar, UI_EN.dinaSvar)}
          </h1>
          <p style={S.ingress}>
            {es
              ? granskaIngressEs(MAX_VIKTIGA, viktiga.length)
              : en
                ? granskaIngressEn(MAX_VIKTIGA, viktiga.length)
                : `Ändra det du vill. Markera upp till ${MAX_VIKTIGA} frågor som väger dubbelt — du har markerat ${viktiga.length}.`}
          </p>

          {KARNA.map((fraga, qi) => {
            const vis = visad(fraga);
            return (
              <div key={fraga.id} style={S.granskaRad}>
                <div style={S.granskaText}>{vis.text}</div>
                <div style={S.granskaVal}>
                  <select
                    style={S.select}
                    value={svar[qi] ?? ""}
                    aria-label={
                      es
                        ? dittSvarPaEs(vis.text)
                        : en
                          ? dittSvarPaEn(vis.text)
                          : `Ditt svar på: ${fraga.text}`
                    }
                    onChange={(e) => {
                      const v = e.target.value;
                      setSvar((f) => {
                        const n = { ...f };
                        if (v === "") delete n[qi];
                        else n[qi] = Number(v);
                        return n;
                      });
                      if (v === "") setViktiga((w) => w.filter((i) => i !== qi));
                    }}
                  >
                    <option value="">{t("Inget svar", UI_ES.ingetSvar, UI_EN.ingetSvar)}</option>
                    {svarsalternativ.map((a) => (
                      <option key={a.v} value={a.v}>
                        {a.etikett}
                      </option>
                    ))}
                  </select>
                  <button
                    className={"vk-vikt" + (viktiga.includes(qi) ? " pa" : "")}
                    aria-pressed={viktiga.includes(qi)}
                    onClick={() => vaxlaViktig(qi)}
                    disabled={svar[qi] === undefined || (!viktiga.includes(qi) && viktiga.length >= MAX_VIKTIGA)}
                  >
                    {viktiga.includes(qi)
                      ? t("★ Viktig", UI_ES.viktPa, UI_EN.viktPa)
                      : t("☆ Viktig", UI_ES.viktAv, UI_EN.viktAv)}
                  </button>
                </div>
              </div>
            );
          })}

          <div style={S.navRad}>
            <button
              className="vk-sekundar"
              onClick={() => {
                setIdx(0);
                setVy("kompass");
              }}
            >
              {t("← Till påståendena", UI_ES.tillPastaendena, UI_EN.tillPastaendena)}
            </button>
            <button
              className="vk-primar"
              style={S.nasta}
              onClick={() => setVy("resultat")}
              disabled={antalSvar < MIN_SVAR}
            >
              {t("Visa resultat", UI_ES.visaResultat, UI_EN.visaResultat)}
            </button>
          </div>
          {antalSvar < MIN_SVAR && (
            <p style={S.hjalp}>
              {es
                ? minstSvarEs(MIN_SVAR, antalSvar)
                : en
                  ? minstSvarEn(MIN_SVAR, antalSvar)
                  : `Svara på minst ${MIN_SVAR} påståenden för att få ett resultat. Du har svarat på ${antalSvar}.`}
            </p>
          )}
        </main>
      )}

      {!metod && vy === "resultat" && (
        <main style={S.shell}>
          <div style={S.sedel}>
            {es
              ? resultatSedelEs(antalSvar, KARNA.length)
              : en
                ? resultatSedelEn(antalSvar, KARNA.length)
                : `RESULTAT · ${antalSvar} AV ${KARNA.length} BESVARADE`}
          </div>
          <h1 style={S.h1} tabIndex={-1} ref={rubrikRef}>
            {t("Så nära ligger partierna", UI_ES.resultatH1, UI_EN.resultatH1)}
          </h1>
          <p style={S.ingress}>
            {t(
              "Ett matchningsindex mellan 0 och 100 för de påståenden du svarat på. Inte en prognos, inte en rekommendation.",
              UI_ES.resultatIngress,
              UI_EN.resultatIngress,
            )}
          </p>

          {resultat?.map((grupp, gi) => (
            <section key={gi} style={S.grupp}>
              {grupp.partier.length > 1 && (
                <div style={S.gruppEtikett}>
                  {es
                    ? gruppEtikettEs(grupp.index)
                    : en
                      ? gruppEtikettEn(grupp.index)
                      : `Kan inte skiljas åt · index ${grupp.index}`}
                </div>
              )}
              {grupp.partier.map((p) => (
                <div key={p.id} style={S.partiRad}>
                  <button
                    className="vk-parti"
                    aria-expanded={oppen === p.id}
                    onClick={() => setOppen(oppen === p.id ? null : p.id)}
                  >
                    <span style={{ ...S.prick, background: p.farg }} />
                    <span style={S.partiNamn}>
                      {p.namn}
                      {!p.mandat && (
                        <span style={S.utanMandat}>
                          {t("utan mandat i dag", UI_ES.utanMandat, UI_EN.utanMandat)}
                        </span>
                      )}
                    </span>
                    <span style={S.indexTal}>{p.index}</span>
                  </button>
                  <div style={S.stapelSpar}>
                    <div
                      style={{
                        ...S.stapelFyll,
                        width: `${p.index}%`,
                        background: p.farg,
                      }}
                    />
                  </div>
                  {p.spann && (
                    <div style={S.spannText}>
                      {es
                        ? spannTextEs(p.spann.min, p.spann.max, p.kanda, antalSvar)
                        : en
                          ? spannTextEn(p.spann.min, p.spann.max, p.kanda, antalSvar)
                          : `Varierar mellan ${p.spann.min} och ${p.spann.max} om en enskild fråga tas bort · bygger på ${p.kanda} av dina ${antalSvar} svar`}
                    </div>
                  )}
                  {oppen === p.id && (
                    <div style={S.detalj}>
                      {Object.keys(svar)
                        .map((n) => {
                          const qi = Number(n);
                          const pp = KARNA[qi].pos[p.id];
                          return {
                            qi,
                            mitt: svar[qi],
                            pp,
                            diff: pp === null || pp === undefined ? null : Math.abs(svar[qi] - pp),
                          };
                        })
                        .sort((a, b) => (a.diff ?? 9) - (b.diff ?? 9))
                        .map(({ qi, mitt, pp }) => (
                          <div key={qi} style={S.detaljRad}>
                            <span
                              style={{
                                ...S.detaljPrick,
                                background:
                                  pp === null || pp === undefined
                                    ? "#9A9A90"
                                    : Math.abs(mitt - pp) <= 1
                                      ? "#2E7D32"
                                      : Math.abs(mitt - pp) === 2
                                        ? "#B58900"
                                        : "#C62828",
                              }}
                            />
                            <div>
                              <div style={S.detaljFraga}>{visad(KARNA[qi]).text}</div>
                              <div style={S.detaljMeta}>
                                {es
                                  ? detaljMetaEs(stall(mitt), p.namn, stall(pp), viktiga.includes(qi))
                                  : en
                                    ? detaljMetaEn(stall(mitt), p.namn, stall(pp), viktiga.includes(qi))
                                    : `Du: ${stallning(mitt)} · ${p.namn}: ${stallning(pp)}${viktiga.includes(qi) ? " · viktig för dig" : ""}`}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              ))}
            </section>
          ))}

          <div style={S.varning} role="note">
            <strong>{t("Vad talet inte säger.", UI_ES.vadTaletSager, UI_EN.vadTaletSager)}</strong>
            {t(
              " Fjorton påståenden kan inte fånga en hel kommunpolitik. Känslighetsspannet visar hur mycket resultatet svänger om en enda fråga byts ut. Partier med samma index visas som en grupp därför att de inte går att skilja åt. Ett parti som svarar i mitten hamnar automatiskt närmare fler möjliga åsikter.",
              UI_ES.vadTaletBrood,
              UI_EN.vadTaletBrood,
            )}
            {!KALLKONTROLL_GJORD &&
              t(
                " Partiernas svar är dessutom ännu inte kontrollerade mot källa av en människa.",
                UI_ES.kallEjKontrollerad,
                UI_EN.kallEjKontrollerad,
              )}
          </div>

          <button
            className="vk-primar"
            style={S.storKnapp}
            onClick={() => {
              setFIdx(0);
              setVy("fordjupning");
            }}
          >
            {t("Fortsätt till de lokala frågorna", UI_ES.fortsattLokala, UI_EN.fortsattLokala)}
          </button>
          <button className="vk-sekundar" style={S.breddSpok} onClick={() => setVy("granska")}>
            {t("← Ändra mina svar", UI_ES.andraSvar, UI_EN.andraSvar)}
          </button>
          <button className="vk-spok" style={S.breddSpok} onClick={borjaOm}>
            {t("Börja om från början", UI_ES.borjaOm, UI_EN.borjaOm)}
          </button>
          <Sidfot
            sprak={sprak}
            bas={bas}
            fran="resultat"
            utkast={{ vkSvar: svar, vkViktiga: viktiga, vkFSvar: fSvar }}
          />
        </main>
      )}

      {!metod && vy === "fordjupning" &&
        (() => {
          const f = visad(FORDJUPNING[fIdx]);
          const mitt = fSvar[fIdx];
          const sista = fIdx + 1 >= FORDJUPNING.length;
          return (
            <main style={S.shell}>
              <div style={S.sedel}>
                {es
                  ? fordjupningSedelEs(fIdx + 1, FORDJUPNING.length)
                  : en
                    ? fordjupningSedelEn(fIdx + 1, FORDJUPNING.length)
                    : `FÖRDJUPNING · ${fIdx + 1} / ${FORDJUPNING.length} · POÄNGSÄTTS INTE`}
              </div>
              <h1 style={S.pastaende} tabIndex={-1} ref={rubrikRef}>
                {f.text}
              </h1>
              <p style={S.desc}>{f.desc}</p>
              <div style={S.harledd} role="note">
                {t(
                  "Partierna har inte besvarat den här frågan i något gemensamt underlag. Positionerna nedan är en bedömning — inte partiernas egna svar. Därför räknas de inte, och därför förekommer inga starka ställningstaganden: en härledd position får aldrig sättas till helt för eller helt emot.",
                  UI_ES.p0n,
                  UI_EN.p0n,
                )}
              </div>
              <fieldset style={S.faltgrupp}>
                <legend style={S.dold}>{t("Vad tycker du?", UI_ES.legendTycker, UI_EN.legendTycker)}</legend>
                {svarsalternativ.map((a) => (
                  <label key={a.v} className={"vk-svar" + (mitt === a.v ? " vald" : "")}>
                    <input
                      type="radio"
                      name={`f-${fIdx}`}
                      style={S.radio}
                      checked={mitt === a.v}
                      onChange={() => setFSvar((s) => ({ ...s, [fIdx]: a.v }))}
                    />
                    <span>{a.etikett}</span>
                  </label>
                ))}
              </fieldset>
              {mitt !== undefined && (
                <div style={S.jamfor}>
                  <h2 style={S.h3}>{t("Var partierna bedöms stå", UI_ES.jamforH2, UI_EN.jamforH2)}</h2>
                  {PARTIER.map((p) => {
                    const pp = f.pos[p.id];
                    const nara = pp !== null && pp !== undefined && Math.abs(mitt - pp) <= 1;
                    return (
                      <div key={p.id} style={S.jamforRad}>
                        <span style={{ ...S.prick, background: p.farg }} />
                        <span style={S.jamforNamn}>{p.namn}</span>
                        <span
                          style={{
                            ...S.jamforVarde,
                            ...(pp === null || pp === undefined ? S.saknas : nara ? S.nara : S.langt),
                          }}
                        >
                          {stall(pp)}
                        </span>
                      </div>
                    );
                  })}
                  <p style={S.finstiltInne}>
                    {t(
                      "Kontrollera mot partiernas egna kommunala program innan du drar slutsatser av jämförelsen.",
                      UI_ES.jamforFot,
                      UI_EN.jamforFot,
                    )}
                  </p>
                </div>
              )}
              <div style={S.navRad}>
                <button className="vk-sekundar" disabled={fIdx === 0} onClick={() => setFIdx(fIdx - 1)}>
                  {t("← Föregående", UI_ES.foregaende, UI_EN.foregaende)}
                </button>
                <button
                  className="vk-primar"
                  style={S.nasta}
                  onClick={() => (sista ? setVy("resultat") : setFIdx(fIdx + 1))}
                >
                  {sista
                    ? t("Tillbaka till resultatet", UI_ES.tillbakaResultat, UI_EN.tillbakaResultat)
                    : t("Nästa", UI_ES.nasta, UI_EN.nasta)}
                </button>
              </div>
            </main>
          );
        })()}
    </div>
  );
}

function KontaktRad({ etikett }: { etikett: string }) {
  return (
    <p style={S.kontakt}>
      {etikett}: {AVSANDARE},{" "}
      <span>{"John.online"}</span>
      <span>{".ai"}</span>
      <span>{"@gmail"}</span>
      <span>{".com"}</span>
    </p>
  );
}

function Sidfot({
  sprak,
  bas,
  fran,
  utkast,
}: {
  sprak: Sprak;
  bas: Bas;
  fran?: "resultat";
  utkast?: { vkSvar: SvarMap; vkViktiga: number[]; vkFSvar: SvarMap };
}) {
  const es = sprak === "es";
  const en = sprak === "en";
  return (
    <>
      <p style={S.kontakt}>
        <Link
          to={bas}
          search={fran === "resultat" ? { vy: "metod", fran: "resultat" } : { vy: "metod" }}
          state={fran === "resultat" ? utkast : undefined}
        >
          {en ? UI_EN.metodLank : es ? UI_ES.metodLank : "Metod och källor"}
        </Link>
      </p>
      <KontaktRad etikett={en ? UI_EN.kontaktEtikett : es ? UI_ES.kontaktEtikett : "Kontakt"} />
      <SysterLankar sprak={sprak} />
    </>
  );
}

function SysterLankar({ sprak }: { sprak: Sprak }) {
  const es = sprak === "es";
  const en = sprak === "en";
  return (
    <nav style={S.ruta} aria-label={en ? UI_EN.seAvenAria : es ? UI_ES.seAvenAria : "Andra valkompasser"}>
      <h2 style={S.h3}>{en ? UI_EN.seAvenH2 : es ? UI_ES.seAvenH2 : "Se även"}</h2>
      <p style={S.brod}>
        {en
          ? UI_EN.seAvenBrood
          : es
            ? UI_ES.seAvenBrood
            : "Samma slags kompass för riksdags- och regionvalet."}
      </p>
      <ul style={S.systerLista}>
        {SYSTER.map((s) => (
          <li key={s.href} style={S.systerPost}>
            <a href={s.href} target="_blank" rel="noopener noreferrer">
              {s.namn}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const BLACK = "#111111";
const KANT = "#D8D8D2";
const YTA = "#F5F5F2";
const META = "#6B6B62";
const DISPLAY = 'Georgia, "Times New Roman", serif';
const BROD = "system-ui, -apple-system, 'Segoe UI', sans-serif";

const S: Record<string, CSSProperties> = {
  app: {
    minHeight: "100vh",
    background: "#FFFFFF",
    color: BLACK,
    fontFamily: BROD,
    WebkitFontSmoothing: "antialiased",
  },
  shell: {
    maxWidth: 600,
    width: "100%",
    boxSizing: "border-box",
    margin: "0 auto",
    padding: "32px 16px 48px",
  },
  sedel: {
    borderTop: `1px solid ${BLACK}`,
    paddingTop: 8,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: ".12em",
    color: META,
  },
  sedelInne: {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: ".12em",
    color: META,
  },
  h1: {
    fontFamily: DISPLAY,
    fontSize: "clamp(30px, 7.5vw, 42px)",
    fontWeight: 700,
    lineHeight: 1.1,
    margin: "8px 0 0",
    outline: "none",
  },
  h3: { fontFamily: DISPLAY, fontSize: 16, fontWeight: 700, lineHeight: 1.1, margin: "0 0 8px" },
  pastaende: {
    fontFamily: DISPLAY,
    fontSize: "clamp(21px, 5vw, 26px)",
    fontWeight: 700,
    lineHeight: 1.1,
    margin: "16px 0 8px",
    outline: "none",
  },
  ingress: { fontSize: 16, lineHeight: 1.55, color: "#333333", marginTop: 16 },
  brod: { fontSize: 15, lineHeight: 1.55, color: "#333333", margin: "0 0 12px" },
  brodSist: { fontSize: 15, lineHeight: 1.55, color: "#333333", margin: 0 },
  desc: { fontSize: 15, lineHeight: 1.55, color: META, margin: "0 0 16px" },
  finstilt: { fontSize: 13, lineHeight: 1.55, color: META, marginTop: 24 },
  finstiltInne: { fontSize: 13, lineHeight: 1.55, color: META, margin: "12px 0 0" },
  kontakt: { fontSize: 15, lineHeight: 1.55, color: BLACK, marginTop: 16 },
  hjalp: { fontSize: 13, color: META, marginTop: 16, lineHeight: 1.55 },
  varning: {
    marginTop: 24,
    padding: 16,
    fontSize: 15,
    lineHeight: 1.55,
    background: YTA,
    border: `1px solid ${KANT}`,
    borderRadius: 12,
    color: "#333333",
  },
  harledd: {
    marginTop: 8,
    marginBottom: 16,
    padding: 16,
    fontSize: 15,
    lineHeight: 1.55,
    background: YTA,
    border: `1px solid ${KANT}`,
    borderRadius: 12,
    color: "#333333",
  },
  ruta: {
    marginTop: 16,
    padding: 16,
    background: YTA,
    border: `1px solid ${KANT}`,
    borderRadius: 12,
  },
  storKnapp: { marginTop: 24, width: "100%", padding: "16px", fontSize: 16 },
  breddSpok: { marginTop: 8, width: "100%", textAlign: "center" },
  nasta: { padding: "12px 16px", fontSize: 16 },
  navRad: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    marginTop: 16,
    gap: 8,
  },
  forloppRad: { display: "flex", alignItems: "center", gap: 12, marginBottom: 16 },
  spar: { flex: 1, height: 8, background: "#EEEEEA", borderRadius: 12, overflow: "hidden" },
  fyll: { height: "100%", background: BLACK },
  forloppText: { fontSize: 13, fontWeight: 600, color: META, whiteSpace: "nowrap" },
  kort: {
    border: `1px solid ${KANT}`,
    borderRadius: 12,
    padding: 16,
    background: "#FFFFFF",
  },
  faltgrupp: { border: "none", padding: 0, margin: 0, minWidth: 0 },
  dold: {
    position: "absolute",
    width: 1,
    height: 1,
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    whiteSpace: "nowrap",
  },
  radio: { width: 16, height: 16, accentColor: BLACK, flexShrink: 0, margin: 0 },
  granskaRad: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    padding: "16px 0",
    borderBottom: `1px solid ${KANT}`,
  },
  granskaText: { flex: "1 1 100%", fontSize: 15, lineHeight: 1.55, fontWeight: 500 },
  granskaVal: { display: "flex", gap: 8, flex: "1 1 100%" },
  select: {
    flex: 1,
    minHeight: 48,
    padding: "8px 12px",
    fontSize: 15,
    border: `1px solid ${KANT}`,
    borderRadius: 12,
    background: "#fff",
    fontFamily: BROD,
    color: BLACK,
  },
  grupp: { marginTop: 24 },
  gruppEtikett: {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: ".08em",
    color: META,
    textTransform: "uppercase",
    paddingBottom: 8,
    borderBottom: `1px solid ${KANT}`,
  },
  partiRad: { marginTop: 12 },
  prick: {
    width: 12,
    height: 12,
    borderRadius: 12,
    flexShrink: 0,
    border: `1px solid ${KANT}`,
  },
  partiNamn: {
    fontSize: 16,
    fontWeight: 600,
    flex: 1,
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    alignItems: "baseline",
  },
  utanMandat: { fontSize: 12, fontWeight: 500, color: META },
  indexTal: { fontFamily: DISPLAY, fontSize: 24, fontWeight: 700 },
  stapelSpar: { height: 8, background: "#EEEEEA", borderRadius: 12, overflow: "hidden" },
  stapelFyll: { height: "100%", borderRadius: 12 },
  spannText: { fontSize: 13, color: META, marginTop: 8, lineHeight: 1.55 },
  detalj: {
    marginTop: 12,
    padding: 16,
    background: YTA,
    border: `1px solid ${KANT}`,
    borderRadius: 12,
  },
  detaljRad: { display: "flex", gap: 12, padding: "8px 0", alignItems: "flex-start" },
  detaljPrick: { width: 8, height: 8, borderRadius: 12, marginTop: 8, flexShrink: 0 },
  detaljFraga: { fontSize: 15, lineHeight: 1.55, fontWeight: 500 },
  detaljMeta: { fontSize: 13, color: META, marginTop: 8 },
  jamfor: {
    marginTop: 16,
    padding: 16,
    background: YTA,
    border: `1px solid ${KANT}`,
    borderRadius: 12,
  },
  jamforRad: { display: "flex", alignItems: "center", gap: 12, padding: "8px 0" },
  jamforNamn: { fontSize: 15, fontWeight: 600, flex: 1 },
  jamforVarde: { fontSize: 15 },
  nara: { color: "#111111", fontWeight: 600 },
  langt: { color: META },
  saknas: { color: META, fontStyle: "italic" },
  systerLista: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    fontSize: 15,
    lineHeight: 1.55,
  },
  systerPost: { minHeight: 48, display: "flex", alignItems: "center" },
};
