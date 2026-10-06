import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

const C={bg:'#0b1028',deep:'#171744',purple:'#6544a8',orange:'#ff8a3d',gold:'#ffd34f',cyan:'#54e7ef',pink:'#f15a9a',teal:'#45d2b0',cream:'#fff3d2',skin:'#f2b58f',hair:'#b9d9df',coat:'#dce7e5',brown:'#513b46',black:'#05060d',red:'#ff6268',blue:'#7197d8'};
const cl={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const I=(f:number,r:[number,number],v:[number,number])=>interpolate(f,r,v,cl);
const S=(f:number,r:[number,number])=>{const x=I(f,r,[0,1]);return x*x*(3-2*x)};
const beat=(f:number,a:number,b:number)=>S(f,[a,b]);

function Stars({n=90,drift=0}:{n?:number;drift?:number}){return <g>{Array.from({length:n},(_,i)=>{const x=(i*173+drift*2.1)%2050-60,y=(i*97+drift*.32)%1120-20;return <circle key={i} cx={x} cy={y} r={1+(i%4)} fill={i%9===0?C.gold:C.cream} opacity={.25+(i%6)*.1}/>})}</g>}
function Professor({x=960,y=800,s=1,look=0,panic=0,stretch=0,rot=0}:{x?:number;y?:number;s?:number;look?:number;panic?:number;stretch?:number;rot?:number}){const hairS=1+stretch*.35,b=Math.sin(panic*18)*7;return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}><g transform={`translate(${b} 0)`}><path d="M-105-110L-155-160-112-151-125-208-70-165-53-220-12-171 25-216 42-167 105-192 80-145 135-137 91-101Z" fill={C.hair} transform={`scale(${hairS} 1)`}/><circle cy="-65" r="112" fill={C.skin}/><path d="M-76-5Q0 55 76-5Q60 55 0 70Q-60 55-76-5Z" fill="#edf0e7"/><path d="M-73-5Q-35-42 0-6Q35-42 73-5L60 23Q0 57-60 23Z" fill="#cbd5d2"/><circle cx="-72" cy="-65" r="54" fill="#fff"/><circle cx="72" cy="-65" r="54" fill="#fff"/><circle cx={-72+look*18} cy="-65" r={10+panic*9} fill={C.brown}/><circle cx={72+look*18} cy="-65" r={10+panic*9} fill={C.brown}/><path d="M-103-112Q-70-135-36-118M36-118Q70-135 103-112" stroke="#8b9694" strokeWidth="15" strokeLinecap="round"/><path d="M-55-128H55" stroke={C.brown} strokeWidth="13" strokeLinecap="round"/><path d={panic>.45?'M-30 23Q0 0 30 23':'M-28 18Q0 36 28 18'} stroke={C.brown} strokeWidth="8" fill="none" strokeLinecap="round"/><path d="M-83 45Q-128 62-142 125L-120 250Q0 280 120 250L142 125Q128 62 83 45L0 90Z" fill={C.coat}/><path d="M-40 48L0 90 40 48 18 253H-18Z" fill="#f4d5a0"/><path d="M0 91L-20 115 0 255 20 115Z" fill={C.brown}/><circle cx="72" cy="92" r="10" fill={C.red}/><path d="M-86 70Q-135 92-168 145M86 70Q135 92 168 145" stroke={C.coat} strokeWidth="44" strokeLinecap="round"/><circle cx="-170" cy="148" r="21" fill={C.skin}/><circle cx="170" cy="148" r="21" fill={C.skin}/><path d="M-50 250L-58 315M50 250L58 315" stroke={C.brown} strokeWidth="35" strokeLinecap="round"/><ellipse cx="-65" cy="322" rx="50" ry="22" fill={C.brown}/><ellipse cx="65" cy="322" rx="50" ry="22" fill={C.brown}/></g></g>}
function Bob({x=1500,y=220,s=1,rot=0}:{x?:number;y?:number;s?:number;rot?:number}){return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}><circle r="48" fill={C.cream}/><circle r="31" fill={C.bg}/><circle r="14" fill={C.cyan}/><path d="M-55 35Q0 75 55 35" fill="none" stroke={C.pink} strokeWidth="10" strokeLinecap="round"/><circle cx="40" cy="-40" r="10" fill={C.gold}/></g>}
function Duck({x=960,y=850,s=1,rot=0}:{x?:number;y?:number;s?:number;rot?:number}){return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}><ellipse cx="0" cy="25" rx="55" ry="38" fill={C.gold}/><circle cx="-25" cy="-15" r="35" fill={C.gold}/><path d="M-58-12L-92 2-58 15Z" fill={C.orange}/><circle cx="-35" cy="-23" r="5" fill={C.bg}/></g>}
function BH({x=960,y=540,s=1,spin=0}:{x?:number;y?:number;s?:number;spin?:number}){return <g transform={`translate(${x} ${y}) scale(${s})`}><ellipse rx="330" ry="78" fill={C.orange} opacity=".18"/><ellipse rx="275" ry="58" fill="none" stroke={C.orange} strokeWidth="48" opacity=".62"/><ellipse rx="230" ry="45" fill="none" stroke={C.gold} strokeWidth="16"/><circle r="175" fill={C.black}/><circle r="185" fill="none" stroke="#fff0bd" strokeWidth="5"/><g transform={`rotate(${spin})`}>{Array.from({length:22},(_,i)=>{const a=i*Math.PI*2/22;return <circle key={i} cx={Math.cos(a)*285} cy={Math.sin(a)*58} r={5+(i%3)*2} fill={i%2?C.orange:C.gold}/>})}</g></g>}
function Txt({children,x=960,y=100,size=44,accent=false}:{children:React.ReactNode;x?:number;y?:number;size?:number;accent?:boolean}){return <text x={x} y={y} textAnchor="middle" fill={accent?C.gold:C.cream} fontFamily="Arial,sans-serif" fontWeight="900" fontSize={size} letterSpacing="1">{children}</text>}
function World({f}:{f:number}){const t=f/30,drift=f/9;const cycle=f%18000;const k=Math.floor(cycle/120);const u=(cycle%120)/120;const section=Math.floor(cycle/1800);const q=k%15;
 const bg=section>=9?C.black:section>=6?'#17102b':section>=3?C.bg:C.deep;
 const pan=(q-7)*55;
 return <g>
  <rect width="1920" height="1080" fill={bg}/><Stars n={section===0?55:105} drift={drift}/>
  {section===0&&<g>
   <BH x={960+pan} y={535} s={1.05-u*.08} spin={t*5}/>
   <Professor x={430+I(u,[0,1],[0,1050])} y={810-I(u,[0,1],[0,260])} s={.42+.08*u} look={1} panic={u}/>
   <Bob x={1500-pan} y={210+Math.sin(t)*18} s={.55}/>
   <Duck x={520+I(u,[0,1],[0,760])} y={850-I(u,[0,1],[0,300])} s={.35} rot={u*720}/>
   {q%3===0&&<Txt y={100} size={50}>WHAT ACTUALLY HAPPENS IF YOU FALL IN?</Txt>}
   {q%3===1&&<Txt y={100} size={46} accent>ONE FALL. TWO STORIES.</Txt>}
   {q%3===2&&<Txt y={100} size={42}>AND THEY ARE BOTH RELATIVITY.</Txt>}
  </g>}
  {section===1&&<g>
   <g transform={`translate(${q%2?1450:470} 540) scale(${1+u*.25})`}><circle r="205" fill={q%2?C.black:'#f5a45b'}/><circle r={q%2?215:155} fill={q%2?'none':'#ffd66b'} stroke={q%2?C.gold:'none'} strokeWidth="10"/></g>
   <path d="M180 820Q650 690 980 820T1780 820" fill="none" stroke={C.cyan} strokeWidth="12" opacity=".7"/>
   <Professor x={960+Math.sin(t)*130} y={830} s={.38} look={q%2}/>
   <Duck x={960+pan} y={900} s={.55} rot={u*90}/>
   <Txt y={105} size={q%2?46:50}>{q%2?'SAME MASS. SAME ORBIT. NO SUNLIGHT.':'BLACK HOLE ≠ COSMIC VACUUM CLEANER'}</Txt>
   {q===4&&<Txt y={995} size={48} accent>EARTH'S ORBIT BARELY CARES.</Txt>}
   {q===7&&<Txt y={995} size={52} accent>EARTH → 8.9 MILLIMETRES.</Txt>}
   {q===10&&<Txt y={995} size={52} accent>SUN → 2.95 KILOMETRES.</Txt>}
  </g>}
  {section===2&&<g>
   <BH x={960} y={560} s={.85+u*.22} spin={t*10}/>
   <circle cx="960" cy="560" r={290+u*170} fill="none" stroke={C.cyan} strokeWidth="5" strokeDasharray="14 18" opacity=".8"/>
   <Professor x={420+u*620} y={820-u*260} s={.45} look={1} panic={u}/>
   <Duck x={570+u*650} y={850-u*300} s={.32} rot={u*1080}/>
   <Txt y={105} size={q%2?48:54}>{q%2?'THE EVENT HORIZON IS NOT A WALL.':'A REGION OF SPACETIME.'}</Txt>
   {q===7&&<Txt y={990} size={45} accent>PAST THIS: ALL FUTURE PATHS LEAD INWARD.</Txt>}
   {q===11&&<Txt y={990} size={44} accent>THE “SURFACE” IS A BOUNDARY, NOT A FLOOR.</Txt>}
  </g>}
  {section===3&&<g>
   <BH x={1040} y={540} s={.92} spin={t*14}/>
   <path d={`M120 760 Q${520+u*220} ${300-u*180} 1040 365`} fill="none" stroke={C.cream} strokeWidth="7" opacity=".75"/>
   <path d={`M80 320 Q${560-u*170} ${760+u*120} 1040 700`} fill="none" stroke={C.cyan} strokeWidth="6" opacity=".6"/>
   <g transform={`translate(${420+u*500} ${760-u*330}) rotate(${u*360})`}><Professor s={.45} look={1} panic={u}/></g>
   <Txt y={105} size={q%3===0?48:42}>{q%3===0?'GRAVITY BENDS LIGHT.':q%3===1?'YOU CAN SEE LIGHT FROM BEHIND THE HOLE.':'AND THEN IT GETS WEIRD.'}</Txt>
   {q===8&&<Txt y={990} size={48} accent>PHOTON SPHERE: 1.5 × SCHWARZSCHILD RADIUS.</Txt>}
   {q===11&&<circle cx="1040" cy="540" r="300" fill="none" stroke={C.gold} strokeWidth="5" strokeDasharray="8 12"/>}
  </g>}
  {section===4&&<g>
   <BH x={1450} y={550} s={.72} spin={t*18}/>
   <g transform="translate(440 520)"><circle r="170" fill={C.blue}/><path d="M-120 40Q0-110 120 40" fill="none" stroke={C.gold} strokeWidth="15"/><circle r="32" fill={C.cream}/></g>
   <path d="M620 520 C900 520 1040 550 1190 550" fill="none" stroke={C.cyan} strokeWidth="8" strokeDasharray="18 14"/>
   <Bob x={1040} y={430} s={.7}/>
   <g transform={`translate(${720+u*350} ${700-u*170})`}><Professor s={.43} look={1}/></g>
   <Txt y={105} size={q%2?47:52}>{q%2?'THE OUTSIDE OBSERVER':'YOUR SIGNALS GET WEIRDER'}</Txt>
   {q===3&&<Txt y={980} size={46} accent>REDSHIFT → REDDER → DIMMER → DELAYED.</Txt>}
   {q===7&&<Txt y={980} size={44} accent>NO FINITE EXTERNAL SIGNAL SHOWS THE CROSSING.</Txt>}
   {q===11&&<g transform="translate(320 790)">{[0,1,2,3,4].map(i=><line key={i} x1={i*65} y1="0" x2={i*65} y2={30+i*14} stroke={C.gold} strokeWidth="8"/>)}<Txt x={160} y={-35} size={32}>CLOCK</Txt></g>}
  </g>}
  {section===5&&<g>
   <BH x={960} y={560} s={.78} spin={t*22}/>
   <g transform={`translate(${620+u*500} ${780-u*330}) rotate(${u*720})`}><Professor s={.47} look={1} panic={u} stretch={Math.max(0,u-.55)*2}/></g>
   <Duck x={580+u*750} y={820-u*270} s={.3} rot={u*1440}/>
   <path d="M0 240Q420 100 960 240T1920 240" fill="none" stroke={C.pink} strokeWidth="8" opacity=".4"/>
   <Txt y={105} size={q%2?46:52}>{q%2?'FROM YOUR VIEW: KEEP FALLING.':'THE HORIZON DOESN’T FEEL SPECIAL.'}</Txt>
   {q===5&&<Txt y={990} size={45} accent>FOR A HUGE BLACK HOLE, YOU MAY FEEL… NOTHING.</Txt>}
   {q===9&&<Txt y={990} size={48} accent>YOU CROSS IT IN FINITE PROPER TIME.</Txt>}
   {q===12&&<Txt y={990} size={45} accent>NO COSMIC FIREWALL REQUIRED BY CLASSICAL GR.</Txt>}
  </g>}
  {section===6&&<g>
   <g transform="translate(960 560)">{Array.from({length:11},(_,i)=><path key={'h'+i} d={`M${-500+i*100} -430 Q 0 ${-300+(i-5)*(i-5)*12} ${500-i*100} 430`} fill="none" stroke={i%2?C.orange:C.cyan} strokeWidth="4" opacity=".6"/>)}{Array.from({length:9},(_,i)=><path key={'v'+i} d={`M${-400+i*100} -450 Q ${(i-4)*35} 0 ${-400+i*100} 450`} fill="none" stroke={C.gold} strokeWidth="4" opacity=".55"/>)}</g>
   <Professor x={960+Math.sin(t*2)*170} y={770} s={.43} panic={u} stretch={u}/>
   <Txt y={105} size={q%2?48:53}>{q%2?'TIDAL FORCES ARE THE REAL PROBLEM.':'GRAVITY IS NOT EQUALLY STRONG EVERYWHERE.'}</Txt>
   {q===4&&<Txt y={990} size={47} accent>SMALL BLACK HOLE → BIG DIFFERENCE ACROSS YOU.</Txt>}
   {q===8&&<Txt y={990} size={48} accent>SUPERMASSIVE BLACK HOLE → HORIZON CAN BE GENTLE.</Txt>}
   {q===12&&<Txt y={990} size={48} accent>SPAGHETTIFICATION IS A GRADIENT.</Txt>}
  </g>}
  {section===7&&<g>
   <BH x={960} y={550} s={.78} spin={t*26}/>
   <g transform="translate(960 550)">{Array.from({length:12},(_,i)=><circle key={i} cx={Math.cos(i*Math.PI/6)*(230+i*9)} cy={Math.sin(i*Math.PI/6)*(230+i*9)} r="5" fill={C.gold}/>)}</g>
   <g transform="translate(960 820)"><Professor s={.36} look={1}/></g>
   <Txt y={105} size={q%2?48:54}>{q%2?'SO WHICH STORY IS REAL?':'HERE’S THE RABBIT HOLE.'}</Txt>
   {q===4&&<Txt y={980} size={48} accent>AN EVENT CAN BE REAL WITHOUT YOU SEEING ITS SIGNAL.</Txt>}
   {q===7&&<Txt y={980} size={47} accent>“SIMULTANEOUS” IS NOT UNIVERSAL.</Txt>}
   {q===10&&<Txt y={980} size={46} accent>LOCATION + MOTION CHANGE YOUR CLOCK.</Txt>}
   {q===13&&<Txt y={980} size={46} accent>RELATIVITY CHANGES WHAT “NOW” MEANS.</Txt>}
  </g>}
  {section===8&&<g>
   <g transform={`translate(960 540) scale(${1+u*.25})`}><circle r="270" fill={C.purple}/><circle r="205" fill={C.black}/><circle r="218" fill="none" stroke={C.gold} strokeWidth="10"/><path d="M-170 0Q0-140 170 0" fill="none" stroke={C.cyan} strokeWidth="9"/><circle cx="0" cy="0" r="35" fill={C.cream}/></g>
   <g transform="translate(350 790)"><circle r="65" fill={C.cream}/><path d="M0 0L0-42" stroke={C.brown} strokeWidth="8"/><path d="M0 0L35 18" stroke={C.brown} strokeWidth="8"/><circle r="8" fill={C.red}/></g>
   <g transform="translate(1570 790)"><circle r="65" fill={C.cream}/><path d="M0 0L-18-38" stroke={C.brown} strokeWidth="8"/><path d="M0 0L38 8" stroke={C.brown} strokeWidth="8"/><circle r="8" fill={C.red}/></g>
   <Txt y={105} size={q%2?49:55}>{q%2?'INFORMATION IS THE NEXT MYSTERY.':'TWO CLOCKS. TWO DESCRIPTIONS.'}</Txt>
   {q===5&&<Txt y={980} size={46} accent>BLACK HOLES MEET QUANTUM MECHANICS.</Txt>}
   {q===9&&<Txt y={980} size={45} accent>HAWKING RADIATION MAKES THE STORY HARDER.</Txt>}
   {q===13&&<Txt y={980} size={44} accent>THE INFORMATION PARADOX IS STILL A LIVE PROBLEM.</Txt>}
  </g>}
  {section===9&&<g>
   <BH x={960} y={535} s={.72} spin={t*30}/><Professor x={480} y={805} s={.4} look={1}/><Bob x={1440} y={270} s={.62}/><Duck x={1120} y={790} s={.32}/>
   <path d="M650 730Q960 600 1270 730" fill="none" stroke={C.cyan} strokeWidth="7" strokeDasharray="12 12"/>
   <Txt y={110} size={51}>ONE FALL. TWO STORIES.</Txt>
   <Txt y={930} size={42} accent>OUTSIDE: NO FINITE CROSSING SIGNAL.</Txt>
   <Txt y={990} size={42} accent>INSIDE: YOU CROSS IN FINITE PROPER TIME.</Txt>
   {q===13&&<Txt y={1040} size={38}>SAME BLACK HOLE. DIFFERENT OBSERVATIONS. SAME PHYSICS.</Txt>}
  </g>}
  <g opacity={q===14?.85:0}><rect x="70" y="70" width="1780" height="940" rx="35" fill="none" stroke={C.cream} strokeWidth="2" opacity=".08"/></g>
 </g>}
export const Explainer:React.FC=()=>{const f=useCurrentFrame();const fade=Math.min(I(f%1800,[0,18],[0,1]),I(f%1800,[1780,1799],[1,0]));return <AbsoluteFill style={{background:C.black,overflow:'hidden'}}><svg width="100%" height="100%" viewBox="0 0 1920 1080"><g opacity={fade}><World f={f}/></g></svg></AbsoluteFill>};
