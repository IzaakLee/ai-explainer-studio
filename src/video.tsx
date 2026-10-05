import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, Easing} from 'remotion';

const C = {
  bg: '#0b1020',
  panel: '#151d38',
  cyan: '#63e6ff',
  yellow: '#ffd85c',
  pink: '#ff78b7',
  green: '#78e08f',
  white: '#f5f7ff',
  muted: '#9ca8c7',
};

type Scene = {
  title: string;
  sub: string;
  kind: 'hook'|'attention'|'eye'|'blindspot'|'illusion'|'prediction'|'memory'|'ending';
};

const scenes: Scene[] = [
  {title:'YOUR BRAIN IS LYING TO YOU',sub:'And you usually cannot tell when.',kind:'hook'},
  {title:'LOOK AT THE DOT',sub:'Your attention feels continuous. It is not.',kind:'attention'},
  {title:'YOU DO NOT SEE EVERYTHING',sub:'Your eyes collect far more information than reaches awareness.',kind:'eye'},
  {title:'THE BLIND SPOT',sub:'There is literally a hole in your visual field.',kind:'blindspot'},
  {title:'YOUR BRAIN FILLS IT IN',sub:'Not with a warning. With a guess.',kind:'prediction'},
  {title:'THE GUESS FEELS REAL',sub:'That is the strange part.',kind:'illusion'},
  {title:'TRY THIS',sub:'Fix your gaze. Let the moving object disappear.',kind:'illusion'},
  {title:'NOW MOVE YOUR EYES',sub:'The scene snaps back together.',kind:'eye'},
  {title:'YOUR BRAIN IS NOT A CAMERA',sub:'It is an active model of the world.',kind:'prediction'},
  {title:'IT PREDICTS',sub:'Then it compares those predictions with incoming signals.',kind:'prediction'},
  {title:'WHEN THEY MATCH',sub:'Everything feels obvious.',kind:'attention'},
  {title:'WHEN THEY DO NOT',sub:'You notice something changed.',kind:'attention'},
  {title:'THIS IS USEFUL',sub:'Prediction makes a noisy world easier to navigate.',kind:'prediction'},
  {title:'BUT IT HAS A COST',sub:'A good guess can still be wrong.',kind:'illusion'},
  {title:'OPTICAL ILLUSIONS',sub:'Your eyes can send the same pattern while your brain reads it differently.',kind:'illusion'},
  {title:'CONTEXT CHANGES PERCEPTION',sub:'The surrounding shapes become part of the evidence.',kind:'illusion'},
  {title:'YOUR BRAIN USES SHORTCUTS',sub:'Usually, that saves time.',kind:'prediction'},
  {title:'NOW THINK ABOUT ATTENTION',sub:'You can look directly at something and still miss it.',kind:'attention'},
  {title:'CHANGE BLINDNESS',sub:'Large changes can hide when your attention is elsewhere.',kind:'attention'},
  {title:'THE WORLD FEELS COMPLETE',sub:'Even when your attention only sampled part of it.',kind:'attention'},
  {title:'AND THEN THERE IS MEMORY',sub:'Memory feels like playback. It is closer to reconstruction.',kind:'memory'},
  {title:'REMEMBERING IS ACTIVE',sub:'Your brain rebuilds an event from stored pieces.',kind:'memory'},
  {title:'EACH REBUILD CAN SHIFT',sub:'Details can become clearer, blurrier, or simply different.',kind:'memory'},
  {title:'CONFIDENCE IS NOT A RECORDING',sub:'Feeling certain does not guarantee perfect detail.',kind:'memory'},
  {title:'SO IS YOUR BRAIN BAD?',sub:'No. These shortcuts are part of what makes it useful.',kind:'prediction'},
  {title:'FAST BEATS PERFECT',sub:'A brain that waits for complete information would be painfully slow.',kind:'prediction'},
  {title:'THE REAL TRICK',sub:'Your brain constantly combines evidence with expectations.',kind:'prediction'},
  {title:'YOU EXPERIENCE THE RESULT',sub:'Not the calculation underneath it.',kind:'illusion'},
  {title:'THAT IS WHY IT FEELS SO REAL',sub:'The model is hidden from the person using it.',kind:'illusion'},
  {title:'QUESTION YOUR FIRST IMPRESSION',sub:'Especially when the evidence is incomplete.',kind:'ending'},
  {title:'LOOK AGAIN',sub:'Move your eyes. Change the context. Check the memory.',kind:'ending'},
  {title:'YOUR BRAIN IS NOT YOUR ENEMY',sub:'It is an astonishing prediction machine.',kind:'ending'},
  {title:'AND SOMETIMES...',sub:'The strangest thing is realizing how little you notice it working.',kind:'ending'},
];

const clamp = {extrapolateLeft:'clamp' as const, extrapolateRight:'clamp' as const};

const Puzzle = ({progress, x=960, y=510}: {progress:number;x?:number;y?:number}) => {
  const pieces = [
    {x:-110,y:-55,fill:C.cyan},{x:0,y:-55,fill:C.yellow},
    {x:-110,y:55,fill:C.pink},{x:0,y:55,fill:C.green},
    {x:110,y:0,fill:C.white},
  ];
  return <g transform={'translate('+x+' '+y+')'} opacity={interpolate(progress,[0,1],[0.25,1],clamp)}>
    {pieces.map((p,i)=><g key={i} transform={'translate('+p.x+' '+p.y+')'}>
      <rect x="-48" y="-48" width="96" height="96" rx="18" fill={p.fill} opacity={0.9}/>
      <circle cx={i%2===0?48:-48} cy="0" r="16" fill={p.fill}/>
      <circle cx={i%2===0?-48:48} cy="0" r="16" fill={C.bg}/>
    </g>)}
  </g>;
};

const Brain = ({scale=1, glow=0}: {scale?:number;glow?:number}) => (
  <g transform={'scale('+scale+')'}>
    <path d="M-170 35 C-205-80-125-170-20-145 C55-205 165-145 145-55 C205 20 145 125 45 105 C-20 160-125 125-170 35Z"
      fill={C.panel} stroke={C.cyan} strokeWidth="8"/>
    <path d="M-95-65 C-45-105-25-35-70 0 C-20 35-45 95-95 60 M5-120 C-35-55 35-35 0 15 C-35 70 20 105 65 65 M75-95 C35-45 105-20 70 20 C55 55 105 75 120 45"
      fill="none" stroke={C.pink} strokeWidth="10" strokeLinecap="round"/>
    <circle cx="0" cy="0" r={20+glow*18} fill={C.yellow} opacity={0.65+glow*0.3}/>
  </g>
);

const Eye = ({blink=0}: {blink?:number}) => (
  <g>
    <path d={'M-270 0 Q0 '+(-155+blink*150)+' 270 0 Q0 '+(155-blink*150)+' -270 0Z'} fill={C.panel} stroke={C.cyan} strokeWidth="8"/>
    <circle cx="0" cy="0" r="72" fill={C.white}/>
    <circle cx="0" cy="0" r="38" fill={C.pink}/>
    <circle cx="0" cy="0" r="15" fill={C.bg}/>
  </g>
);

export const Explainer: React.FC = () => {
  const f = useCurrentFrame();
  const scene = Math.min(scenes.length - 1, Math.floor(f / 300));
  const local = f % 300;
  const s = scenes[scene];
  const inP = interpolate(local,[0,35],[0,1],clamp);
  const outP = interpolate(local,[255,299],[1,0],clamp);
  const textOpacity = Math.min(inP,outP);
  const progress = interpolate(f,[0,scenes.length*300],[0,1],clamp);
  const drift = Math.sin(f/24)*18;
  const pulse = 1 + Math.sin(f/18)*0.045;

  let visual: React.ReactNode;
  if (s.kind === 'hook') visual = <><g transform={'translate(960 390) scale('+pulse+')'}><Brain scale={1.05} glow={1}/></g><Puzzle progress={0.25} x={960} y={720}/></>;
  else if (s.kind === 'eye') visual = <g transform={'translate(960 475)'}><Eye blink={s.title==='NOW MOVE YOUR EYES'?Math.abs(Math.sin(local/18)):0}/></g>;
  else if (s.kind === 'blindspot') visual = <><g transform="translate(650 450)"><Eye/></g><circle cx="1300" cy="450" r="70" fill={C.panel} stroke={C.yellow} strokeWidth="8" strokeDasharray="14 12"/><path d="M1050 450H1220" stroke={C.yellow} strokeWidth="8"/><text x="1245" y="555" fill={C.yellow} fontSize="32" fontWeight="800">MISSING INPUT</text></>;
  else if (s.kind === 'memory') visual = <><g transform={'translate(960 430) scale('+pulse+')'}><Brain scale={1} glow={0.7}/></g><g opacity=".75">{[0,1,2,3].map(i=><rect key={i} x={470+i*290} y={690+(i%2)*30} width="220" height="90" rx="18" fill={C.panel} stroke={i===2?C.pink:C.cyan} strokeWidth="5"/>)}</g></>;
  else if (s.kind === 'attention') visual = <><g transform={'translate(960 450)'}><circle r="270" fill={C.panel}/>{Array.from({length:14}).map((_,i)=>{const a=i*Math.PI*2/14;return <circle key={i} cx={Math.cos(a)*230} cy={Math.sin(a)*230} r={i===Math.floor(local/22)%14?26:12} fill={i===Math.floor(local/22)%14?C.yellow:C.cyan} opacity={i===Math.floor(local/22)%14?1:.45}/>})}<circle r="90" fill="none" stroke={C.pink} strokeWidth="8"/></g></>;
  else if (s.kind === 'illusion') visual = <><g transform={'translate(960 450) rotate('+(local/18-8)+')'}>{[0,1,2,3,4,5,6,7].map(i=><rect key={i} x={-260+i*75} y={i%2?-110:20} width="48" height="190" rx="18" fill={i%2?C.cyan:C.pink}/>)}</g><circle cx="960" cy="450" r="35" fill={C.yellow}/></>;
  else if (s.kind === 'prediction') visual = <><g transform={'translate(960 450) scale('+pulse+')'}><Brain scale={1} glow={0.9}/></g><g opacity=".8"><path d="M430 720 C650 610 760 720 960 610 S1270 510 1490 650" fill="none" stroke={C.yellow} strokeWidth="9" strokeDasharray="22 18"/><circle cx={960+drift*3} cy="610" r="24" fill={C.green}/></g></>;
  else visual = <><g transform={'translate(960 440) scale('+pulse+')'}><Brain scale={1.05} glow={1}/></g><Puzzle progress={progress} x={960} y={735}/></>;

  return <AbsoluteFill style={{background:C.bg,fontFamily:'Arial, sans-serif',overflow:'hidden'}}>
    <svg width="100%" height="100%" viewBox="0 0 1920 1080">
      <defs>
        <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse"><path d="M80 0H0V80" fill="none" stroke="white" strokeOpacity=".045" strokeWidth="2"/></pattern>
      </defs>
      <rect width="1920" height="1080" fill="url(#grid)"/>
      <g transform={'translate(0 '+(Math.sin(f/55)*8)+')'}>{visual}</g>
      <g opacity={textOpacity}>
        <rect x="100" y="825" width="1720" height="175" rx="30" fill={C.panel} opacity=".96"/>
        <text x="150" y="895" fill={C.white} fontSize="55" fontWeight="900">{s.title}</text>
        <text x="150" y="950" fill={C.cyan} fontSize="31" fontWeight="600">{s.sub}</text>
      </g>
      <text x="150" y="75" fill={C.muted} fontSize="25" fontWeight="700">AI EXPLAINER STUDIO  •  THE BRAIN</text>
      <text x="1770" y="75" textAnchor="end" fill={C.muted} fontSize="25" fontWeight="700">{String(scene+1).padStart(2,'0')} / {scenes.length}</text>
      <rect x="150" y="1015" width="1620" height="5" rx="3" fill={C.panel}/>
      <rect x="150" y="1015" width={1620*progress} height="5" rx="3" fill={C.yellow}/>
    </svg>
  </AbsoluteFill>;
};
