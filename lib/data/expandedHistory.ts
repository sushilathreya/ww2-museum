export interface ExpandedHistoryEntry {
  development: string;
  combatHistory: string;
  notableUses: string[];
}

export const expandedHistoryById: Record<string, ExpandedHistoryEntry> = {
  'lee-enfield-no4': {
    development:
      'The No.4 was a wartime evolution of the earlier SMLE pattern, optimized for faster mass production and easier armorer service. British and Commonwealth factories standardized it as the backbone rifle for large conscript armies.',
    combatHistory:
      'It equipped British and Commonwealth infantry from North Africa through Northwest Europe and jungle fighting in Burma. Troops valued its 10-round magazine and rapid bolt operation for practical battlefield fire cadence.',
    notableUses: [
      'Commonwealth infantry service rifle in Normandy 1944-45.',
      'Widely used in Burma by British and Indian formations.',
      'Issued across Europe, Mediterranean, and home defense units.',
    ],
  },
  'ppsh-41': {
    development:
      'The PPSh-41 was designed as a simple stamped-and-machined submachine gun to scale quickly after early Soviet losses in 1941. Its design favored robust operation in mud, snow, and rough field conditions.',
    combatHistory:
      'It became one of the defining close-range weapons of the Eastern Front, especially in urban and assault fighting. High volume fire at short range made it effective for shock actions and trench clearing.',
    notableUses: [
      'Soviet assault groups in Stalingrad.',
      'Infantry actions in Kursk and later offensives.',
      'Urban combat and close-range winter operations.',
    ],
  },
  'stg-44': {
    development:
      'The StG 44 emerged from German intermediate-cartridge programs intended to bridge rifle and SMG roles in one weapon. Production ramped late and never reached levels needed for full force conversion.',
    combatHistory:
      'Where issued, it improved German squad firepower at practical infantry ranges and influenced post-war rifle doctrine. Its tactical impact was real at unit level but too late to alter strategic outcomes.',
    notableUses: [
      'Issued to selected units on the Eastern Front in 1944-45.',
      'Seen in late-war defense of German territory.',
      'Influential reference point for post-war assault rifle development.',
    ],
  },
  'mg-42': {
    development:
      'The MG 42 was built around stamped production methods to reduce machining time compared with the MG 34. Designers accepted a very high cyclic rate to maximize suppressive effect and psychological shock.',
    combatHistory:
      'It served as the center of many German infantry fire plans in both offensive and defensive actions. Allied troops frequently reported its distinctive sound and intense beaten zone in open terrain.',
    notableUses: [
      'German defensive belts in Italy and Normandy.',
      'Mobile fire support for infantry squads on the Eastern Front.',
      'Tripod and bipod roles as a true general-purpose machine gun.',
    ],
  },
  'bren-mk2': {
    development:
      'The Bren Mk II simplified some features of earlier variants to speed wartime output while preserving accuracy and reliability. Its top-feed magazine and quick-change barrel supported sustained section fire.',
    combatHistory:
      'British and Commonwealth squads relied on the Bren as their core automatic weapon in varied climates from deserts to hedgerows. It remained effective in both advancing fire-and-movement and static defense.',
    notableUses: [
      'Commonwealth section automatic weapon in North Africa.',
      'Frequent use in Italy and Northwest Europe campaigns.',
      'Service in jungle warfare in Burma and Southeast Asia.',
    ],
  },
  'mosin-m9130': {
    development:
      'The M91/30 modernized the earlier Mosin platform with revised sights and wartime-friendly production features. Soviet arsenals produced it in very large numbers as a practical standard rifle.',
    combatHistory:
      'It armed Soviet infantry through the full Eastern Front campaign and performed reliably in severe weather. The same platform also served as the base for many sniper conversions.',
    notableUses: [
      'Mass-issue rifle in 1941 defensive fighting.',
      'Continued frontline service through Berlin 1945.',
      'Foundation for PU-scoped sniper configurations.',
    ],
  },
  'm1-carbine': {
    development:
      'The M1 Carbine was created to arm troops needing something lighter than a full rifle, including support and airborne personnel. Wartime industry delivered it at exceptional scale across many contractors.',
    combatHistory:
      'Its low recoil and compact size made it popular in mobile operations, though terminal performance varied by range and target. It saw broad use in Europe and the Pacific in secondary and frontline roles.',
    notableUses: [
      'Issued to U.S. airborne and support troops in Europe.',
      'Carried in Pacific island campaigns by officers and NCOs.',
      'Used in reconnaissance, vehicle crews, and rear-area security.',
    ],
  },
  'bar-m1918a2': {
    development:
      'The M1918A2 standardized wartime BAR production with automatic-fire emphasis for squad support. It sat between rifle and machine gun roles in U.S. doctrine, trading belt-fed endurance for mobility.',
    combatHistory:
      'BAR gunners provided immediate suppressive fire during maneuver and were central to many U.S. infantry actions. The weapon remained valued for hard-hitting automatic fire despite limited magazine size.',
    notableUses: [
      'U.S. infantry squad support in Normandy and France.',
      'Mountain and winter operations in the Ardennes.',
      'Pacific jungle fighting with Marine and Army units.',
    ],
  },
  'type-100-smg': {
    development:
      'The Type 100 gave Japan a domestic SMG design, but production volume stayed modest compared with other major powers. Manufacturing priorities and doctrine limited widespread issue.',
    combatHistory:
      'It appeared in selected infantry and naval landing units, mainly in close-range Pacific engagements. Its battlefield footprint remained narrower than Japanese bolt-action rifle deployments.',
    notableUses: [
      'Limited deployment in Pacific island defense fighting.',
      'Seen with selected Imperial Japanese Army formations.',
      'Used in close-range infantry actions where available.',
    ],
  },
  'fg-42': {
    development:
      'The FG 42 was engineered for German paratroopers needing one weapon for rifle, automatic, and marksman roles. It was technically advanced but costly and complex for late-war production realities.',
    combatHistory:
      'Issued in limited numbers, it delivered strong firepower and flexibility in elite formations. Scarcity kept it from broad tactical standardization across the wider German force.',
    notableUses: [
      'Fallschirmjager units in late-war operations.',
      'Defensive actions in Italy and Western Europe.',
      'Specialized airborne and elite infantry employment.',
    ],
  },
  'arisaka-type-99': {
    development:
      'The Type 99 was adopted to provide a stronger cartridge and updated features over earlier Japanese service rifles. Wartime pressure later drove simplified manufacturing on many late examples.',
    combatHistory:
      'It served as a principal Japanese infantry rifle in Pacific and China theaters. Performance was generally solid, though quality varied by production period and supply constraints.',
    notableUses: [
      'Japanese island garrisons in the Central Pacific.',
      'Infantry fighting in China and Southeast Asia.',
      'Late-war homeland and perimeter defense units.',
    ],
  },
  'svt-40': {
    development:
      'The SVT-40 represented Soviet pre-war interest in broader semi-automatic issue, improving on the earlier SVT-38. Combat losses, training burden, and production realities shifted many units back to simpler rifles.',
    combatHistory:
      'It saw meaningful early-war service and remained in selected frontline use later in the conflict. Captured rifles were also reused by German forces in limited numbers.',
    notableUses: [
      'Early Eastern Front issue in 1941-42.',
      'Selective Soviet use after production reprioritization.',
      'Captured examples reissued by German formations.',
    ],
  },
  'walther-p38': {
    development:
      'The P38 was designed to modernize German sidearm procurement with double-action operation and wartime manufacturability. It progressively replaced Luger production as the war expanded.',
    combatHistory:
      'It became the standard German service pistol for officers, specialists, and support personnel. Reliability and simpler production made it practical for broad wartime distribution.',
    notableUses: [
      'Standard German military sidearm in multiple theaters.',
      'Issued to officers, NCOs, and vehicle crews.',
      'Service in both frontline and rear-area duties.',
    ],
  },
  'de-lisle-carbine': {
    development:
      'The De Lisle was a niche British commando weapon combining a bolt-action mechanism with integral suppression. It was produced in small numbers for special operations rather than general infantry issue.',
    combatHistory:
      'Its low acoustic signature made it suitable for raids, sentry removal, and covert missions. Operational use was limited but effective in roles where stealth mattered more than volume fire.',
    notableUses: [
      'Commando and special-operations use in Europe.',
      'Clandestine raids requiring suppressed fire.',
      'Specialized issue rather than conventional battalion service.',
    ],
  },
  'm1903a4-springfield': {
    development:
      'The M1903A4 was a U.S. sniper adaptation of the Springfield action with selected barrels and telescopic optics. It filled a precision-fire gap before larger quantities of other sniper systems arrived.',
    combatHistory:
      'U.S. snipers employed it for deliberate long-range engagement, reconnaissance support, and counter-sniper work. It was especially useful in open-terrain and overwatch positions.',
    notableUses: [
      'U.S. Army sniper teams in France and Germany.',
      'Precision support in static and semi-static fronts.',
      'Counter-sniper and observation-linked fire missions.',
    ],
  },
  'lee-enfield-no4t': {
    development:
      'The No.4(T) was a carefully selected and converted sniper variant of the No.4 rifle with optical sighting and tuning. British conversion standards emphasized repeatable accuracy and field durability.',
    combatHistory:
      'It served Commonwealth snipers in Europe and other theaters, pairing solid accuracy with familiar Enfield handling. Units used it for harassment fire, observation support, and key-target engagement.',
    notableUses: [
      'Commonwealth sniper detachments in Northwest Europe.',
      'Long-range precision support during advance and defense.',
      'Use alongside standard No.4 rifle logistics chains.',
    ],
  },
  'kar98k-sniper': {
    development:
      'German sniper Kar98k rifles were selected from accurate production lots and fitted with period optics such as ZF39. Conversion depth and optic quality varied by time and issuing unit.',
    combatHistory:
      'They were employed broadly on Eastern and Western fronts for precision interdiction and counter-sniper roles. Performance depended heavily on training and visibility conditions.',
    notableUses: [
      'German sniper teams in Eastern Front defensive sectors.',
      'Long-range engagement in hedgerow and rural terrain in the West.',
      'Observation-linked precision fire against officers and crew-served weapons.',
    ],
  },
  'mosin-m9130-pu-sniper': {
    development:
      'The PU sniper variant paired selected M91/30 rifles with compact optics suitable for mass wartime issue. Soviet industry produced the configuration at scale relative to other sniper systems.',
    combatHistory:
      'It became one of the most recognizable sniper platforms of the Eastern Front, used in urban ruins, forests, and open steppe. Doctrine emphasized concealment, mobility, and repeated precision fire.',
    notableUses: [
      'Soviet sniper operations in Stalingrad.',
      'Counter-sniper and interdiction work in 1943-45 offensives.',
      'Extensive Eastern Front deployment across infantry formations.',
    ],
  },

  'panther-a': {
    development:
      'The Panther was developed rapidly after German encounters with the T-34, prioritizing armor slope and a high-velocity 75 mm gun. Early production suffered from drivetrain and reliability problems that improved over time.',
    combatHistory:
      'When mechanically sound, it was one of Germanys most effective mid-war anti-armor platforms at range. Operational impact was reduced by maintenance burden, fuel constraints, and attrition.',
    notableUses: [
      'Debuted in major numbers around Kursk in 1943.',
      'Widely used in defensive battles in France and Germany.',
      'Served in both Eastern and Western Front anti-tank roles.',
    ],
  },
  'panzer-iii-j': {
    development:
      'The Panzer III was originally intended as Germanys primary anti-armor medium tank, with the Ausf. J receiving armor and gun improvements. It was gradually overtaken by heavier enemy armor and shifting doctrine.',
    combatHistory:
      'It performed effectively in early-war campaigns but became less competitive against newer Soviet and Allied tanks. Many chassis later shifted to support and assault-gun derivatives.',
    notableUses: [
      'Poland and France campaigns in early war operations.',
      'North Africa service with Afrika Korps formations.',
      'Eastern Front actions before broader replacement by newer types.',
    ],
  },
  'churchill-mk-iv': {
    development:
      'The Churchill line emphasized heavy armor and obstacle-crossing ability for infantry support operations. Mk IV variants integrated armament updates while retaining the type\'s characteristic mobility profile.',
    combatHistory:
      'Its speed was modest, but protection and terrain-handling gave it strong value in difficult ground and fortified assaults. It remained relevant through engineering variants and specialized battlefield roles.',
    notableUses: [
      'North Africa and Italy where rough terrain favored its design.',
      'Normandy operations including close infantry support.',
      'Specialized Churchill variants in assault engineering tasks.',
    ],
  },
  'cromwell-mk-iv': {
    development:
      'The Cromwell combined cruiser-tank mobility with an updated gun in response to earlier British armored limitations. The Meteor engine gave it high speed and improved operational agility.',
    combatHistory:
      'It was effective for exploitation, reconnaissance, and rapid maneuver but still faced challenges against the heaviest German armor frontally. British units used it where mobility could be converted into tactical advantage.',
    notableUses: [
      'British armored divisions in Northwest Europe.',
      'Fast maneuver and pursuit actions after breakout phases.',
      'Combined use with heavier tanks in mixed armored groups.',
    ],
  },
  'is-2': {
    development:
      'The IS-2 was built as a breakthrough heavy tank with a 122 mm gun suitable for anti-fortification and anti-armor work. Its design reflected Soviet late-war emphasis on shock offensives.',
    combatHistory:
      'IS-2 regiments supported assaults against fortified lines and urban objectives in the final campaigns. The gun was powerful, though rate of fire was slower than medium-tank systems.',
    notableUses: [
      'Late-war Soviet offensives in Poland and Germany.',
      'Urban assault support during the Berlin campaign.',
      'Breakthrough operations against prepared defensive belts.',
    ],
  },
  'kv-1': {
    development:
      'The KV-1 entered war with armor protection that exceeded many contemporary anti-tank capabilities. Its heavy weight and mechanical strain became significant operational constraints in prolonged campaigns.',
    combatHistory:
      'In 1941 it could absorb fire that defeated lighter tanks, creating localized tactical shocks. Over time, improvements in German anti-tank weapons reduced that initial protection advantage.',
    notableUses: [
      'Early Eastern Front battles during Barbarossa.',
      'Defensive stands where armor resilience delayed enemy advances.',
      'Transition phase before broader T-34 dominance in Soviet units.',
    ],
  },
  'm3-stuart': {
    development:
      'The M3 Stuart prioritized speed, reliability, and production practicality as a light tank for reconnaissance and cavalry tasks. It was not designed to trade fire with heavier enemy armor.',
    combatHistory:
      'Stuart crews used mobility and coordination to support infantry, screen formations, and exploit breakthroughs. It proved useful in many theaters despite limited growth potential against heavier tanks.',
    notableUses: [
      'North Africa campaign with Allied armored forces.',
      'Pacific operations where terrain and logistics favored lighter vehicles.',
      'Reconnaissance and screening missions in Europe.',
    ],
  },
  'type-97-chi-ha': {
    development:
      'The Type 97 became Japans principal medium tank, with later revisions improving anti-armor capability. Design priorities reflected expected operations in Asia rather than heavy tank duels in Europe-style combat.',
    combatHistory:
      'It served widely in China and Pacific theaters, often in infantry support and local maneuver roles. Against later Allied armor, it faced increasing protection and firepower disadvantages.',
    notableUses: [
      'Extensive use in China theater operations.',
      'Pacific island defense and counter-landing actions.',
      'Employment in combined infantry-armor assaults where terrain allowed.',
    ],
  },
  'valentine-mk-iii': {
    development:
      'The Valentine emphasized compact protection and manufacturability, becoming one of the most numerous British tanks of the war. Multiple marks adapted armament and crew arrangement as battlefield needs changed.',
    combatHistory:
      'Though not fast, it earned a reputation for reliability and was useful in infantry support and steady armored operations. Lend-Lease deliveries gave it major Soviet service in addition to British use.',
    notableUses: [
      'British service in North Africa and Mediterranean fighting.',
      'Soviet Lend-Lease employment on the Eastern Front.',
      'Infantry-support missions in varied terrain conditions.',
    ],
  },
  'm26-pershing': {
    development:
      'The M26 was introduced late after long U.S. debate over balancing mobility, logistics, and heavier gun requirements. Its 90 mm armament was intended to address late-war heavy-armor threats.',
    combatHistory:
      'Arriving in small numbers in 1945, it saw limited but notable European combat before the war ended. Its timing prevented wide WW2 operational influence despite promising capability.',
    notableUses: [
      'Late-war deployment in Western Europe in 1945.',
      'Engagements against German heavy armor in final months.',
      'Transition platform for post-war U.S. armored doctrine.',
    ],
  },
  'jagdpanther': {
    development:
      'The Jagdpanther mounted the long 88 mm gun on the Panther chassis to create a high-performance tank destroyer. Production numbers remained modest relative to wartime demand.',
    combatHistory:
      'It combined strong frontal protection, mobility, and long-range anti-tank lethality when employed effectively. Mechanical and logistical pressures, plus low numbers, constrained overall strategic impact.',
    notableUses: [
      'Western Front anti-armor defense in 1944-45.',
      'Eastern Front long-range defensive engagements.',
      'Ambush and counterattack roles with heavy anti-tank units.',
    ],
  },
  'su-85': {
    development:
      'The SU-85 adapted the T-34 chassis with a fixed superstructure and improved anti-tank gun to counter newer German armor. It offered a practical interim step before later Soviet tank-destroyer upgrades.',
    combatHistory:
      'Soviet units used it to reinforce anti-armor capability during major offensives and defensive phases. Its gun performance at range was a meaningful improvement over earlier medium-tank armament.',
    notableUses: [
      'Eastern Front anti-armor support from 1943 onward.',
      'Service in breakthrough and exploitation operations.',
      'Bridging role before widespread introduction of later SPG types.',
    ],
  },

  'hawker-hurricane': {
    development:
      'The Hurricane was designed as a practical, robust monoplane fighter that could be produced and repaired quickly in wartime conditions. It complemented newer designs by prioritizing availability and serviceability.',
    combatHistory:
      'It carried a major share of RAF fighter effort in 1940 and continued as a multirole aircraft in other theaters. Later in the war it shifted toward ground-attack and secondary fighter duties.',
    notableUses: [
      'Battle of Britain defense against Luftwaffe raids.',
      'Mediterranean and North Africa operations.',
      'Ground-attack missions after frontline fighter transition.',
    ],
  },
  'fw-190-a8': {
    development:
      'The Fw 190 was introduced to supplement and eventually rival the Bf 109 with strong firepower and robust handling characteristics. A-series variants evolved for interception, fighter-bomber, and specialized roles.',
    combatHistory:
      'It was a key Luftwaffe fighter on multiple fronts, effective in both air combat and strike missions. Late-war fuel shortages and pilot attrition reduced unit effectiveness despite capable aircraft.',
    notableUses: [
      'Defense of the Reich against Allied bomber formations.',
      'Fighter-bomber sorties on Eastern and Western fronts.',
      'Low- to medium-altitude interception and escort missions.',
    ],
  },
  'il-2-sturmovik': {
    development:
      'The Il-2 was built as an armored attack aircraft to survive low-altitude strikes against battlefield targets. Soviet industry produced it in very large numbers, making it central to tactical air support doctrine.',
    combatHistory:
      'It delivered rockets, bombs, and cannon fire against armor, transport, and troop concentrations across the Eastern Front. Escort coordination and massed employment increased effectiveness over time.',
    notableUses: [
      'Close air support in Kursk and later Soviet offensives.',
      'Interdiction of German logistics and field columns.',
      'Sustained battlefield attack missions in 1943-45.',
    ],
  },
  'a6m-zero': {
    development:
      'The A6M prioritized range and agility for carrier warfare, accepting lighter protection by later-war standards. Early-war performance gave Japanese naval aviation a major operational advantage.',
    combatHistory:
      'The Zero dominated many early Pacific encounters, then faced growing Allied counters in aircraft design and pilot training. It remained widely used through the wars later defensive phases.',
    notableUses: [
      'Early Pacific carrier operations including 1941-42 offensives.',
      'Fleet and island air defense across broad maritime areas.',
      'Progressive shift from offensive to defensive air roles.',
    ],
  },
  'b24-liberator': {
    development:
      'The B-24 was designed for long range and high production efficiency, enabling broad strategic deployment. Its airframe supported bombing, maritime patrol, and transport adaptations.',
    combatHistory:
      'It served in Europe, the Mediterranean, and the Pacific in large numbers, complementing other heavy bomber forces. Crews flew demanding long-duration missions against both land and maritime targets.',
    notableUses: [
      'Strategic bombing operations in Europe and Mediterranean theaters.',
      'Long-range anti-submarine and maritime patrol missions.',
      'Pacific operations against Japanese logistics and infrastructure.',
    ],
  },
  'avro-lancaster': {
    development:
      'The Lancaster evolved from earlier bomber projects into RAF Bomber Commands premier heavy night bomber. Its payload flexibility made it suitable for both standard and specialized large-ordnance missions.',
    combatHistory:
      'It formed the core of Britains strategic night bombing campaign against industrial and urban targets. Losses were heavy, but sustained operations imposed major pressure on German war production.',
    notableUses: [
      'RAF strategic night bombing campaign over Germany.',
      'Specialized precision raids including major dams and infrastructure.',
      'Late-war attacks on transport, oil, and industrial networks.',
    ],
  },
  'ju-87-stuka': {
    development:
      'The Ju 87 was designed around dive-bombing accuracy and early-war close-support doctrine. As air defenses intensified, vulnerability in contested skies became a major limitation.',
    combatHistory:
      'It was highly effective with air superiority in early campaigns, then increasingly constrained on heavily defended fronts. Later versions shifted toward anti-tank and limited-support roles.',
    notableUses: [
      'Early blitzkrieg support in Poland and France.',
      'Mediterranean and Eastern Front close-support missions.',
      'Specialized anti-armor sorties in later-war operations.',
    ],
  },
  'b29-superfortress': {
    development:
      'The B-29 introduced advanced pressurization, remote gun systems, and high-performance long-range bombing capability. It represented one of the most complex Allied aircraft production efforts of the war.',
    combatHistory:
      'Operating mainly in the Pacific, it enabled sustained strategic strikes from distant bases against Japanese targets. Its range and payload were central to late-war air campaign planning.',
    notableUses: [
      'Strategic bombing from Pacific island bases in 1944-45.',
      'High-volume incendiary raids against Japanese urban-industrial areas.',
      'Long-range pressure on Japanese homeland logistics and production.',
    ],
  },
  'me-262': {
    development:
      'The Me 262 was the first operational jet fighter fielded in meaningful numbers, but engine durability and production disruption limited reliability. Program direction also shifted between fighter and attack roles.',
    combatHistory:
      'Its speed gave a clear tactical advantage against piston aircraft, especially in interception. Small numbers, fuel shortages, and pilot pipeline problems prevented decisive operational effect.',
    notableUses: [
      'Interception of Allied bomber streams over Germany.',
      'Limited fighter-bomber sorties in late-war operations.',
      'Proof of concept for post-war jet combat doctrine.',
    ],
  },
  'c47-skytrain': {
    development:
      'The C-47 adapted a proven transport airframe for military logistics, airborne operations, and medical evacuation. Its reliability and simplicity made it indispensable to Allied mobility.',
    combatHistory:
      'It delivered paratroops, towed gliders, and sustained resupply across multiple theaters. The aircrafts logistical contribution often had strategic effect beyond direct combat.',
    notableUses: [
      'Airborne operations in Normandy and Market Garden.',
      'Theater-wide cargo and troop transport missions.',
      'Medical evacuation and emergency supply flights.',
    ],
  },
  'yak-3': {
    development:
      'The Yak-3 was a late-war refinement focused on lower-altitude performance and reduced weight. Soviet designers prioritized agility and acceleration in frontline tactical air combat envelopes.',
    combatHistory:
      'It proved effective in short-range fighter engagements during the final phases of the Eastern Front campaign. Pilot reports highlighted strong maneuver characteristics in close combat.',
    notableUses: [
      'Late-war Soviet fighter regiments in 1944-45 offensives.',
      'Tactical air superiority missions at low to medium altitude.',
      'Escort and interception tasks over advancing front lines.',
    ],
  },
  'p47-thunderbolt': {
    development:
      'The P-47 combined a powerful radial engine with rugged construction and heavy armament. It evolved from high-altitude escort emphasis to a major fighter-bomber workhorse.',
    combatHistory:
      'It was effective in both air combat and ground-attack, especially once long-range escort coordination matured. Durability and payload flexibility made it valuable in sustained campaign operations.',
    notableUses: [
      'Escort and air combat missions over Western Europe.',
      'Ground-attack strikes on transport, armor, and rail targets.',
      'Close support during Allied advance after Normandy breakout.',
    ],
  },

  'yamato': {
    development:
      'Yamato was built around overwhelming gun caliber and heavy armor to win decisive surface engagements. Construction reflected pre-war assumptions about battleship-centric fleet combat.',
    combatHistory:
      'By the time of major operations, carrier air power had become the dominant naval threat, limiting battleship utility. Yamato saw limited direct surface action and was ultimately destroyed by air attack.',
    notableUses: [
      'Flagship service within major Japanese fleet concentrations.',
      'Participation in late-war Operation Ten-Go.',
      'Symbol of battleship-era doctrine confronting carrier-era reality.',
    ],
  },
  'uss-enterprise-cv6': {
    development:
      'Enterprise was one of the key U.S. fleet carriers available at the opening of Pacific war operations. Wartime modifications progressively strengthened anti-aircraft defense and air-group integration.',
    combatHistory:
      'She participated in many pivotal carrier battles and offensive campaigns across the Pacific. Continuous deployment and battle damage repair cycles made her one of the most active U.S. capital ships.',
    notableUses: [
      'Major role in Midway and subsequent carrier operations.',
      'Support for Guadalcanal and broader Pacific offensives.',
      'Sustained service in key fleet actions through the war.',
    ],
  },
  'ijn-shokaku': {
    development:
      'Shokaku-class carriers represented Japans modern pre-war carrier design emphasis on speed and strike capacity. They were central to early offensive naval aviation planning.',
    combatHistory:
      'Shokaku fought in major Pacific carrier battles and remained a frontline asset until lost in 1944. Attrition of trained crews and growing Allied air-sea pressure reduced overall Japanese carrier effectiveness.',
    notableUses: [
      'Early-war carrier strike operations in the Pacific.',
      'Participation in Coral Sea and later fleet engagements.',
      'Frontline service until loss during late-war carrier battles.',
    ],
  },
  'hms-king-george-v': {
    development:
      'The King George V class balanced treaty-era constraints with heavy armor and modern fire control. British design priorities focused on fleet survivability and coordinated gunnery.',
    combatHistory:
      'HMS King George V served in major Atlantic and later Pacific operations, including decisive anti-surface actions. The ship represented core Royal Navy capital-ship capability in wartime fleet duties.',
    notableUses: [
      'Action in the pursuit and destruction of Bismarck.',
      'Atlantic convoy and fleet cover operations.',
      'Later service supporting Allied naval presence in the Pacific.',
    ],
  },
  'uss-iowa': {
    development:
      'Iowa-class design emphasized high speed to operate with fast carrier task forces while retaining heavy battleship firepower. This blended traditional naval gunnery with carrier-era fleet requirements.',
    combatHistory:
      'USS Iowa served in escort and bombardment roles, supporting broader U.S. naval offensives. Her speed and endurance made her useful in long-range Pacific fleet movements.',
    notableUses: [
      'Fast battleship support to carrier task groups.',
      'Naval gunfire missions in Pacific operations.',
      'Fleet screening and deterrence in late-war naval strategy.',
    ],
  },
  'fletcher-class-destroyer': {
    development:
      'The Fletcher class was designed as a flexible destroyer platform for anti-air, anti-submarine, and torpedo warfare. Large wartime production made it a cornerstone of U.S. naval force structure.',
    combatHistory:
      'Fletchers escorted carriers and convoys, fought surface actions, and carried much of the day-to-day fleet protection burden. Their versatility made them critical in sustained naval campaigns.',
    notableUses: [
      'Carrier screening in major Pacific operations.',
      'Anti-submarine convoy and fleet escort duties.',
      'Surface actions and shore bombardment support missions.',
    ],
  },
  'hms-illustrious': {
    development:
      'Illustrious-class carriers featured armored flight decks prioritizing survivability under attack. British doctrine accepted smaller air groups in exchange for greater damage resistance.',
    combatHistory:
      'HMS Illustrious endured intense air attacks and continued operations after repair cycles, validating aspects of the armored-deck concept. She served in Mediterranean and later broader Allied carrier operations.',
    notableUses: [
      'Mediterranean carrier operations under heavy air threat.',
      'Fleet air support and strike coordination roles.',
      'Operational resilience after battle damage and repair.',
    ],
  },
  'gato-class-submarine': {
    development:
      'The Gato class was built for long Pacific patrol endurance with strong torpedo armament and crew habitability. It became the first large U.S. wartime submarine production baseline.',
    combatHistory:
      'Gato boats played a major role in U.S. commerce-raiding strategy against Japanese shipping and naval logistics. Submarine campaign pressure significantly degraded Japans maritime supply network.',
    notableUses: [
      'Long-range patrols across Pacific sea lanes.',
      'Torpedo attacks on transport and warship targets.',
      'Strategic interdiction of Japanese fuel and cargo movement.',
    ],
  },
  'essex-class-carrier': {
    development:
      'The Essex class was designed for scalable wartime construction and sustained high-tempo carrier operations. It became the backbone of U.S. fast-carrier striking power.',
    combatHistory:
      'Essex carriers enabled continuous large-scale naval air offensives as U.S. industry outpaced losses and expanded force levels. Their operational availability transformed campaign tempo in the Pacific.',
    notableUses: [
      'Core of U.S. fast-carrier task force operations.',
      'Sustained strike campaigns in 1944-45 Pacific offensives.',
      'Combined fleet air defense and deep strike employment.',
    ],
  },
  'tirpitz': {
    development:
      'Tirpitz was completed as the second Bismarck-class battleship and deployed primarily as a fleet-in-being threat. Strategic value often came from tying down Allied resources rather than frequent gunnery action.',
    combatHistory:
      'Operating from Norwegian waters, Tirpitz forced continued Allied planning and repeated strike attempts. She was eventually neutralized through sustained British air operations.',
    notableUses: [
      'Fleet-in-being pressure against Arctic and North Atlantic routes.',
      'Target of multiple major British strike operations.',
      'Strategic fixation effect on Allied naval asset allocation.',
    ],
  },
  'hms-warspite': {
    development:
      'Warspite was a modernized First World War-era battleship adapted for contemporary naval combat demands. Upgrades extended service relevance into major WW2 fleet operations.',
    combatHistory:
      'She served in several theaters, combining fleet action capability with bombardment support as the war evolved. Despite age, she remained operationally significant in key campaigns.',
    notableUses: [
      'Mediterranean naval operations and convoy protection.',
      'Gunfire support for amphibious and coastal operations.',
      'Service across Atlantic, Mediterranean, and European theaters.',
    ],
  },
  'kongo-class-battleship': {
    development:
      'Kongo-class ships began as battlecruisers and were heavily modernized into fast battleships before and during WW2. Their speed made them useful companions to carrier and cruiser formations.',
    combatHistory:
      'They supported Japanese fleet operations across the Pacific, including escort and bombardment tasks. Survivability challenges increased as Allied air and submarine threats intensified.',
    notableUses: [
      'Escort and support roles in major Pacific fleet movements.',
      'Naval bombardment and surface-action participation.',
      'Fast battleship employment in carrier-era operations.',
    ],
  },

  'mk2-frag-grenade': {
    development:
      'The Mk 2 was the standard U.S. fragmentation hand grenade refined for wartime mass issue and training standardization. Fuse and body design prioritized predictable delay and anti-personnel effect.',
    combatHistory:
      'It was ubiquitous in U.S. infantry actions for trench clearing, room fighting, and defensive positions. Practical employment emphasized throw distance, cover discipline, and coordinated movement.',
    notableUses: [
      'Routine U.S. infantry issue across Europe and Pacific theaters.',
      'Close-quarters fighting in urban and bunker environments.',
      'Defensive grenade use in foxholes and fixed positions.',
    ],
  },
  'mills-no36m': {
    development:
      'The No.36M was a mature British grenade pattern adapted for broad wartime Commonwealth distribution. Its long service history made training and doctrine integration straightforward.',
    combatHistory:
      'It served in varied climates and terrain, from North Africa to Northwest Europe and Asia. Commonwealth troops employed it extensively in both assault and defensive grenade drills.',
    notableUses: [
      'Standard Commonwealth grenade in multiple theaters.',
      'Infantry assault and trench-clearing actions.',
      'Defensive employment from prepared fighting positions.',
    ],
  },
  'stielhandgranate-24': {
    development:
      'The Stielhandgranate 24 prioritized throwing leverage and blast effect, with optional fragmentation sleeves for different tactical needs. Production remained high due its central place in German infantry equipment.',
    combatHistory:
      'German troops used it widely in close combat, especially in urban, trench, and fortified fighting. Its form factor supported longer throws but influenced carrying and readiness methods.',
    notableUses: [
      'German infantry close combat in Eastern and Western theaters.',
      'Urban and trench fighting where grenade exchange was common.',
      'Assault actions with and without fragmentation sleeve configurations.',
    ],
  },
  'type-97-grenade': {
    development:
      'Type 97 production reflected Japanese efforts to field a simple, widely distributable hand grenade for infantry units. Design favored practical wartime issue under constrained industrial conditions.',
    combatHistory:
      'It was used in Pacific and China campaigns for assault, defense, and close-quarters engagements. Employment varied by unit training quality and available supply in isolated garrisons.',
    notableUses: [
      'Japanese infantry use in Pacific island fighting.',
      'Assault and defensive grenade employment in China theater.',
      'Close-range use in bunker and jungle engagements.',
    ],
  },
  'rgd-33': {
    development:
      'The RGD-33 introduced a configurable Soviet grenade concept with optional fragmentation sleeve use. Its mechanism was more complex than simpler wartime grenade patterns.',
    combatHistory:
      'It saw service in early and mid-war periods, then was gradually supplemented by simpler designs better suited to mass wartime logistics. Units still employed it effectively where training supported safe handling.',
    notableUses: [
      'Early to mid-war Soviet infantry grenade issue.',
      'Configurable offensive or defensive use by sleeve selection.',
      'Close-assault roles before wider replacement by simpler models.',
    ],
  },
  'no-73-at-grenade': {
    development:
      'The No.73 represented an emergency British anti-tank grenade concept during an urgent early-war period. It was a stopgap solution before more effective dedicated anti-armor systems became common.',
    combatHistory:
      'Its practical battlefield use required dangerous close approach and gave mixed results against armored targets. As alternatives improved, operational reliance on this design decreased quickly.',
    notableUses: [
      'Early-war British home-defense and anti-armor planning.',
      'Limited frontline anti-tank employment under high risk.',
      'Transitional role before better anti-tank infantry weapons arrived.',
    ],
  },
  'rpg-43': {
    development:
      'The RPG-43 was a Soviet HEAT hand grenade designed to defeat armor with shaped-charge effect at close range. It reflected practical infantry anti-tank adaptation under intense armored warfare pressure.',
    combatHistory:
      'Soviet infantry used it in ambush and close-defense situations where tanks could be engaged from concealment. Effectiveness depended on approach opportunity and disciplined throw timing.',
    notableUses: [
      'Infantry anti-tank ambushes on the Eastern Front.',
      'Close-range defense in urban and wooded approaches.',
      'Use against medium armor when heavier support weapons were absent.',
    ],
  },
  'tellermine-42': {
    development:
      'The Tellermine series evolved into robust pressure-fused anti-tank mines for large-area defensive deployment. Design and production supported rapid emplacement by engineer and infantry units.',
    combatHistory:
      'Tellermine fields were used extensively to slow armored movement and channel attacks into kill zones. Their operational value came from integration with anti-tank guns and overwatch fire.',
    notableUses: [
      'German defensive mine belts in Eastern and Western Europe.',
      'Route denial and obstacle reinforcement in prepared defenses.',
      'Combined employment with anti-tank strongpoints and artillery coverage.',
    ],
  },
  's-mine-35': {
    development:
      'The S-mine introduced a bounding anti-personnel concept intended to maximize fragmentation effect above ground level. It became one of the most feared German anti-personnel mines in the war.',
    combatHistory:
      'Used in layered defensive belts, it complicated infantry advance and mine-clearance operations. Psychological impact was substantial due to blast pattern and casualty potential.',
    notableUses: [
      'Anti-personnel minefields in German defensive sectors.',
      'Delay and attrition against advancing infantry formations.',
      'Obstacle systems integrated with wire and covering fire.',
    ],
  },
  'm1a1-at-mine': {
    development:
      'The M1A1 gave U.S. forces a standardized pressure anti-tank mine for mobility denial and route control. Wartime engineering doctrine emphasized straightforward emplacement and reliable fuze behavior.',
    combatHistory:
      'It was used to disrupt enemy armor movement and protect flanks, crossings, and prepared positions. Effectiveness increased when minefields were integrated into broader anti-tank defense plans.',
    notableUses: [
      'U.S. engineer obstacle plans in Europe.',
      'Anti-vehicle route denial around key approaches and choke points.',
      'Defensive belt integration with guns, infantry, and artillery.',
    ],
  },
  'gammon-bomb': {
    development:
      'The Gammon Bomb was designed as a flexible demolition charge with adjustable filler for mission-specific effects. It was favored for irregular and special-operation tasks where adaptability mattered.',
    combatHistory:
      'Commandos and specialized troops employed it against vehicles, structures, and materiel in short-notice actions. Utility came from configurable charge size and compact carry profile.',
    notableUses: [
      'British special operations and commando raids.',
      'Sabotage and demolition tasks against infrastructure and transport.',
      'Close-range anti-vehicle and bunker-target applications.',
    ],
  },
  'hafthohlladung-3': {
    development:
      'The Hafthohlladung used magnetic attachment with a shaped charge to defeat armor at very close range. It reflected German interest in infantry anti-tank options when heavier support was unavailable.',
    combatHistory:
      'It was tactically dangerous to employ, requiring approach under fire and direct placement on target. In suitable conditions, it could achieve strong localized armor penetration.',
    notableUses: [
      'Close-assault anti-tank actions by German infantry teams.',
      'Urban and ambush environments allowing concealed approach.',
      'Emergency anti-armor use when stand-off systems were absent.',
    ],
  },
  'no-74-st-grenade': {
    development:
      'The No.74 Sticky Bomb was an expedient British anti-tank grenade created during early invasion-threat urgency. Adhesive design offered a theoretical armor attachment solution but had practical handling limits.',
    combatHistory:
      'It was used selectively and with caution due to handling risk and dependence on close contact. As more capable anti-tank infantry systems arrived, frontline reliance declined.',
    notableUses: [
      'Home-defense and early-war anti-tank contingency issue.',
      'Limited close-approach anti-armor employment.',
      'Transitional anti-tank tool before improved replacements.',
    ],
  },
  'an-m14-th3': {
    development:
      'The AN-M14 TH3 was an incendiary grenade using thermite composition to destroy equipment rather than maximize blast. It was intended for materiel denial and controlled destruction tasks.',
    combatHistory:
      'Troops used it to disable weapons, stores, and light equipment when recovery or capture risk was high. Operational use focused on denial effects rather than anti-personnel fragmentation.',
    notableUses: [
      'Destruction of sensitive equipment during withdrawal or abandonment.',
      'Incendiary denial against vehicles, stores, and weapons sets.',
      'Engineer and support-unit use for controlled materiel destruction.',
    ],
  },
};
