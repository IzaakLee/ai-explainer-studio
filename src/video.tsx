import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {CAPTIONS} from './captions';

const C={navy:'#0a0b2a',purple:'#37205f',violet:'#7046b8',orange:'#ff7b38',gold:'#ffd34f',cyan:'#55e7ef',pink:'#ee5d9f',red:'#ff4e62',cream:'#fff2c8',black:'#02030a',blue:'#78a8ff',teal:'#49d7b0',skin:'#f1b48e',hair:'#b9e3e9',coat:'#7e8d90',brown:'#5a3d48'};
const ease=(x:number)=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)};
const lerp=(f:number,a:number,b:number,v1:number,v2:number)=>interpolate(f,[a,b],[v1,v2],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
const pulse=(f:number,p:number=90)=>0.5+0.5*Math.sin(f/p*Math.PI*2);

function Bg({f,mode}:{f:number;mode:number}){return <g>
 <defs><filter id="glow"><feGaussianBlur stdDeviation="10"/></filter><filter id="soft"><feGaussianBlur stdDeviation="3"/></filter></defs>
 <rect width="1920" height="1080" fill={C.navy}/>
 <rect width="1920" height="1080" fill={mode%3===0?C.purple:'#10133b'} opacity=".38"/>
 <g opacity=".35" transform={`translate(${(f*.18)%240} 0)`}>{Array.from({length:18},(_,i)=><circle key={i} cx={i*130} cy={110+(i*83)%820} r={2+(i%4)} fill={i%3?C.cream:C.cyan}/>)}</g>
 <g opacity=".22" transform={`translate(${(-f*.55)%500} 0)`}>{Array.from({length:10},(_,i)=><ellipse key={i} cx={i*230} cy={180+(i*91)%760} rx={90+(i%3)*40} ry={18+(i%4)*9} fill={i%2?C.pink:C.violet}/>)}</g>
 <g opacity=".3">{Array.from({length:45},(_,i)=><circle key={i} cx={(i*211+f*.8)%2050-50} cy={(i*137)%1050} r={1+(i%3)} fill={C.cream}/>)}</g>
 </g>}

function Professor({x,y,s=1,expr=0,stretch=0,rot=0}:{x:number;y:number;s?:number;expr?:number;stretch?:number;rot?:number}){
 const bob=Math.sin(useCurrentFrame()/18)*4, eye=expr===3?5:expr===1?2:11, mouth=expr===0?'M-24 18Q0 42 24 18':expr===1?'M-22 35Q0 5 22 35':expr===2?'M-25 25Q0 5 25 25':'M-20 24Q0 28 20 24';
 const panic=expr===1||expr===4, surprised=expr===0||expr===5;
 return <g transform={`translate(${x} ${y+bob}) rotate(${rot}) scale(${s})`}>
  <path d="M-108-112L-160-155-112-148-130-205-72-164-45-225-8-168 30-215 48-165 112-195 83-145 143-132 91-102Z" fill={C.hair} transform={`scale(${1+stretch*.5} 1)`}/>
  <circle cy="-68" r="112" fill={C.skin}/>
  <path d="M-76 4Q0 68 76 4Q58 58 0 72Q-58 58-76 4Z" fill="#d7dfdd"/>
  <circle cx="-65" cy="-67" r="54" fill={C.cream}/><circle cx="65" cy="-67" r="54" fill={C.cream}/>
  <circle cx="-65" cy="-67" r={eye} fill={C.brown}/><circle cx="65" cy="-67" r={eye} fill={C.brown}/>
  <path d="M-103-112Q-70-137-35-118M35-118Q70-137 103-112" stroke={panic?C.red:'#7e8989'} strokeWidth="15" strokeLinecap="round" fill="none"/>
  <path d="M-55-128H55" stroke={C.brown} strokeWidth="13" strokeLinecap="round"/>
  <path d={mouth} stroke={C.brown} strokeWidth="8" fill="none" strokeLinecap="round"/>
  <path d="M-84 46Q-128 68-145 128L-120 250Q0 285 120 250L145 128Q128 68 84 46L0 90Z" fill={C.coat}/>
  <path d="M-42 48L0 91 42 48 19 253H-19Z" fill={C.gold}/><path d="M0 91L-20 115 0 255 20 115Z" fill={C.brown}/>
  <circle cx="72" cy="93" r="10" fill={C.red}/>
  <path d="M-87 70Q-135 96-165 150M87 70Q135 96 165 150" stroke={C.coat} strokeWidth="44" strokeLinecap="round"/>
  <circle cx="-166" cy="151" r="21" fill={C.skin}/><circle cx="166" cy="151" r="21" fill={C.skin}/>
  <path d="M-50 250L-58 315M50 250L58 315" stroke={C.brown} strokeWidth="35" strokeLinecap="round"/>
  <ellipse cx="-66" cy="322" rx="50" ry="22" fill={C.brown}/><ellipse cx="66" cy="322" rx="50" ry="22" fill={C.brown}/>
  {panic&&<circle cx="105" cy="-7" r="10" fill={C.cyan}/>}
 </g>}

function Bob({x,y,s=1,cry=false}:{x:number;y:number;s?:number;cry?:boolean}){return <g transform={`translate(${x} ${y}) scale(${s})`}><circle r="65" fill={C.cream}/><circle r="42" fill={C.navy}/><circle r="19" fill={C.cyan}/><circle cx="36" cy="-45" r="12" fill={C.gold}/><path d={cry?'M-28 20Q0 4 28 20':'M-28 20Q0 40 28 20'} fill="none" stroke={C.pink} strokeWidth="10" strokeLinecap="round"/>{cry&&<circle cx="20" cy="35" r="7" fill={C.cyan}/>}</g>}

function Duck({x,y,s=1,stretch=0,rot=0}:{x:number;y:number;s?:number;stretch?:number;rot?:number}){return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s*(1+stretch)} ${s/(1+stretch*.65)})`}><ellipse cx="0" cy="20" rx="62" ry="42" fill={C.gold}/><circle cx="-27" cy="-20" r="38" fill={C.gold}/><path d="M-60-17L-100 0-60 18Z" fill={C.orange}/><circle cx="-38" cy="-30" r="6" fill={C.black}/></g>}

function BlackHole({x=960,y=540,s=1,spin=0}:{x?:number;y?:number;s?:number;spin?:number}){return <g transform={`translate(${x} ${y}) scale(${s})`}>
 <ellipse rx="350" ry="78" fill={C.orange} opacity=".2" filter="url(#glow)"/>
 <ellipse rx="310" ry="68" fill="none" stroke={C.orange} strokeWidth="55" opacity=".48"/>
 <ellipse rx="290" ry="58" fill="none" stroke={C.gold} strokeWidth="19"/>
 <path d="M-305-30Q0-205 305-30Q0-92-305-30Z" fill={C.orange} opacity=".9"/>
 <path d="M-305 30Q0 205 305 30Q0 92-305 30Z" fill={C.gold} opacity=".75"/>
 <circle r="192" fill={C.black}/>
 <circle r="203" fill="none" stroke={C.cream} strokeWidth="6"/>
 <g transform={`rotate(${spin})`}>{Array.from({length:26},(_,i)=>{const a=i*Math.PI*2/26;return <circle key={i} cx={Math.cos(a)*325} cy={Math.sin(a)*62} r={6+(i%3)*2} fill={i%2?C.orange:C.gold}/>})}</g>
 <path d="M-130-205Q0-330 130-205L75-214Q0-275-75-214Z" fill={C.blue} opacity=".65" filter="url(#soft)"/>
 </g>}



function Visual({f}:{f:number}){
 const scene=Math.min(39,Math.floor(f/450)), beat=Math.floor((f%450)/90), local=f%450, z=1+0.06*ease(local/450), p=(beat-2)*35;
 const mode=scene<5?0:scene<10?1:scene<16?2:scene<22?3:scene<27?4:scene<32?5:6;
 const subjectX=960+p;
 const professorExpr=[5,3,1,0,2,4,5,3][(scene+beat)%8];
 return <g>
  <Bg f={f} mode={mode}/>
  <g transform={`translate(${960-subjectX} 540) scale(${z}) translate(-960 -540)`}>
   {scene<=2&&<><BlackHole x={1250} y={560} s={.9}/><Professor x={470+beat*120} y={800-beat*35} s={.55} expr={professorExpr}/><Bob x={1600} y={220} s={.6}/><Duck x={700+beat*170} y={830-beat*30} s={.42} rot={beat*110}/></>}
   {scene>=3&&scene<=5&&<><g transform={`translate(${960} 570) scale(${1-beat*.08})`}><circle r={190} fill={beat===0?C.blue:C.cream}/>{beat>1&&<circle r={80+beat*35} fill={C.black}/>}</g><BlackHole x={1380} y={590} s={.55+beat*.1}/><Professor x={430+beat*230} y={820-beat*40} s={.52} expr={professorExpr}/><Duck x={650+beat*220} y={870} s={.36}/></>}
   {scene>=6&&scene<=9&&<><BlackHole x={980} y={560} s={.82} spin={f/18}/><g opacity={.55}>{Array.from({length:16},(_,i)=><path key={i} d={`M80 ${160+i*52} Q 650 ${80+(i%5)*140} 1820 ${190+i*42}`} fill="none" stroke={i%2?C.cyan:C.pink} strokeWidth="5"/>)}</g><Professor x={360+beat*260} y={820-beat*45} s={.55} expr={professorExpr}/><Duck x={650+beat*170} y={840} s={.35}/></>}
   {scene>=10&&scene<=13&&<><BlackHole x={1450} y={560} s={.62}/><Bob x={1020} y={440} s={.72} cry={scene>=12}/><g transform={`translate(${680+beat*130} ${710-beat*65})`}><Professor s={.5} expr={scene===13?1:professorExpr}/></g><g opacity={.65}>{Array.from({length:6},(_,i)=><line key={i} x1={720+i*85} y1={650-i*15} x2={1080+i*45} y2={560-i*7} stroke={C.cyan} strokeWidth={8} strokeDasharray="20 18"/>)}</g></>}
   {scene>=14&&scene<=17&&<><BlackHole x={960} y={560} s={.75}/><g transform={`translate(${760+beat*90} ${760-beat*65}) rotate(${beat*180}) scale(${1+beat*.16} ${1-beat*.06})`}><Professor s={.48} expr={beat===4?1:professorExpr} stretch={beat>2?beat*.25:0}/></g><Duck x={1130} y={780} s={.38} stretch={beat>1?beat*.55:0} rot={beat*90}/></>}
   {scene>=18&&scene<=21&&<><BlackHole x={960} y={560} s={.72}/><g transform="translate(520 770)"><circle r="105" fill={C.cream}/><path d="M0 0L0-65M0 0L55 28" stroke={C.brown} strokeWidth="11"/></g><g transform="translate(1400 770)"><circle r="105" fill={C.cream}/><path d="M0 0L-35-55M0 0L68 4" stroke={C.brown} strokeWidth="11"/></g><Professor x={960} y={820} s={.48} expr={professorExpr}/>{beat===2&&<><rect x="410" y="560" width="210" height="90" rx="30" fill={C.cyan}/><rect x="1300" y="560" width="210" height="90" rx="30" fill={C.pink}/></>}</>}
   {scene>=22&&scene<=24&&<><BlackHole x={960} y={560} s={.78}/><g transform={`translate(960 560) rotate(${f/30})`}>{Array.from({length:12},(_,i)=><circle key={i} cx={Math.cos(i*Math.PI/6)*310} cy={Math.sin(i*Math.PI/6)*310} r="9" fill={C.gold}/>)}</g><Professor x={430+beat*200} y={830-beat*45} s={.52} expr={professorExpr}/></>}
   {scene>=25&&scene<=28&&<><g transform={`translate(960 560) scale(${1+beat*.08})`}><circle r="260" fill={C.violet}/><circle r="190" fill={C.black}/><circle r="202" fill="none" stroke={C.gold} strokeWidth="12"/></g><g transform={`translate(${450+beat*210} 760)`}><Professor s={.48} expr={professorExpr}/></g><path d="M300 380Q960 120 1620 380" fill="none" stroke={C.cyan} strokeWidth={beat===3?18:6} opacity=".7"/></>}
   {scene>=29&&scene<=32&&<><BlackHole x={960} y={560} s={.72}/><g transform={`translate(960 560) scale(${1+beat*.25})`}><circle r="220" fill="none" stroke={C.cyan} strokeWidth="9" strokeDasharray="16 12"/><circle r="175" fill={C.black}/></g><Professor x={430+beat*260} y={820-beat*40} s={.5} expr={beat===3?5:professorExpr}/><Bob x={1500} y={250} s={.58}/></>}
   {scene>=33&&<><BlackHole x={960} y={550} s={.7}/><Professor x={430} y={820} s={.52} expr={scene===39?5:professorExpr}/><Bob x={1500} y={260} s={.6} cry={scene===33}/><Duck x={1110} y={790} s={.38} stretch={scene===35?.9:0}/>{scene===39&&<circle cx="960" cy="550" r="285" fill="none" stroke={C.cream} strokeWidth="3" opacity=".25"/>}</>}
  </g>
  <g transform={`translate(960 944)`}><rect x="-820" y="-56" width="1640" height="86" rx="42" fill={C.black} opacity=".72"/><text textAnchor="middle" y="-2" fill={C.cream} fontFamily="Arial,sans-serif" fontWeight="700" fontSize="30">{CAPTIONS[scene]||''}</text></g>
  {scene===3&&beat===2&&<text x="960" y="180" textAnchor="middle" fill={C.gold} fontFamily="Arial,sans-serif" fontWeight="900" fontSize="86">8.9 mm</text>}
  {scene===4&&beat===2&&<text x="960" y="180" textAnchor="middle" fill={C.gold} fontFamily="Arial,sans-serif" fontWeight="900" fontSize="86">2.95 km</text>}
  {scene===8&&beat===3&&<text x="960" y="180" textAnchor="middle" fill={C.cyan} fontFamily="Arial,sans-serif" fontWeight="900" fontSize="70">1.5 × Rₛ</text>}
  {scene===29&&beat===2&&<text x="960" y="180" textAnchor="middle" fill={C.gold} fontFamily="Arial,sans-serif" fontWeight="900" fontSize="74">10⁶⁷ years</text>}
 </g>
}

export const Explainer:React.FC=()=>{
 const f=useCurrentFrame(); const {durationInFrames}=useVideoConfig();
 return <AbsoluteFill style={{background:C.black,overflow:'hidden'}}>
  <Audio src={staticFile('audio/narration.wav')} volume={1}/>
  <Audio src={staticFile('audio/music.wav')} volume={0.18}/>
  <Audio src={staticFile('audio/fx.wav')} volume={0.34}/>
  <svg width="100%" height="100%" viewBox="0 0 1920 1080"><Visual f={f}/></svg>
 </AbsoluteFill>
};
