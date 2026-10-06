import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

const C={navy:'#10162f',deep:'#171d46',purple:'#5c3d8f',orange:'#ff8b38',gold:'#ffd34e',cyan:'#55e4ee',magenta:'#f35a9a',teal:'#3fd0ad',cream:'#fff4d6',skin:'#f2b58f',hair:'#b9d8df',coat:'#dce6e6',brown:'#513b46',black:'#090a12',red:'#ff5e62'};
const cl={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const sm=(v:number)=>v*v*(3-2*v);
const p=(f:number,a:number,b:number)=>sm(interpolate(f,[a,b],[0,1],cl));

function Professor({x=960,y=760,s=1,rot=0,look=0,panic=0,stretch=0}:{x?:number;y?:number;s?:number;rot?:number;look?:number;panic?:number;stretch?:number}){
 const hair=1+stretch*.42, bob=Math.sin(panic*18)*7;
 return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
  <g transform={`translate(${bob} 0)`}>
   <path d={`M-105-110L-155-160-112-151-125-208-70-165-53-220-12-171 25-216 42-167 105-192 80-145 135-137 91-101Z`} fill={C.hair} transform={`scale(${hair} 1)`} />
   <circle cx="0" cy="-65" r="112" fill={C.skin}/>
   <path d="M-76-5Q0 55 76-5Q60 55 0 70Q-60 55-76-5Z" fill="#eef0e7"/>
   <path d="M-73-5Q-35-42 0-6Q35-42 73-5L60 23Q0 57-60 23Z" fill="#cbd5d2"/>
   <circle cx="-72" cy="-65" r="54" fill="#fff" fillOpacity=".9"/><circle cx="72" cy="-65" r="54" fill="#fff" fillOpacity=".9"/>
   <circle cx={-72+look*18} cy="-65" r={10+panic*10} fill={C.brown}/><circle cx={72+look*18} cy="-65" r={10+panic*10} fill={C.brown}/>
   <path d="M-103-112Q-70-135-36-118M36-118Q70-135 103-112" stroke="#8b9694" strokeWidth="15" strokeLinecap="round"/>
   <path d="M-55-128H55" stroke={C.brown} strokeWidth="13" strokeLinecap="round"/>
   <path d={panic>.45?'M-30 23Q0 0 30 23':'M-28 18Q0 36 28 18'} stroke={C.brown} strokeWidth="8" fill="none" strokeLinecap="round"/>
   <path d="M-83 45Q-128 62-142 125L-120 250Q0 280 120 250L142 125Q128 62 83 45L0 90Z" fill={C.coat}/>
   <path d="M-40 48L0 90 40 48 18 253H-18Z" fill="#f4d5a0"/><path d="M0 91L-20 115 0 255 20 115Z" fill={C.brown}/>
   <circle cx="72" cy="92" r="10" fill={C.red}/>
   <path d="M-86 70Q-135 92-168 145M86 70Q135 92 168 145" stroke={C.coat} strokeWidth="44" strokeLinecap="round"/>
   <circle cx="-170" cy="148" r="21" fill={C.skin}/><circle cx="170" cy="148" r="21" fill={C.skin}/>
   <path d="M-50 250L-58 315M50 250L58 315" stroke={C.brown} strokeWidth="35" strokeLinecap="round"/>
   <ellipse cx="-65" cy="322" rx="50" ry="22" fill={C.brown}/><ellipse cx="65" cy="322" rx="50" ry="22" fill={C.brown}/>
  </g>
 </g>;
}
function Bob({x=1500,y=220,s=1}:{x?:number;y?:number;s?:number}){return <g transform={`translate(${x} ${y}) scale(${s})`}><circle r="48" fill={C.cream}/><circle r="31" fill={C.navy}/><circle r="14" fill={C.cyan}/><path d="M-55 35Q0 75 55 35" fill="none" stroke={C.magenta} strokeWidth="10" strokeLinecap="round"/><circle cx="40" cy="-40" r="10" fill={C.gold}/></g>}
function Duck({x=960,y=850,s=1,rot=0}:{x?:number;y?:number;s?:number;rot?:number}){return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}><ellipse cx="0" cy="25" rx="55" ry="38" fill={C.gold}/><circle cx="-25" cy="-15" r="35" fill={C.gold}/><path d="M-58-12L-92 2-58 15Z" fill={C.orange}/><circle cx="-35" cy="-23" r="5" fill={C.navy}/></g>}
function Stars({n=90,drift=0}:{n?:number;drift?:number}){return <g>{Array.from({length:n},(_,i)=>{const x=(i*173+drift*1.7)%2100-90,y=(i*97+(drift*.3))%1050;return <circle key={i} cx={x} cy={y} r={1.2+(i%4)} fill={i%7===0?C.gold:C.cream} opacity={.35+(i%5)*.1}/>})}</g>}
function BlackHole({x=960,y=500,s=1,jets=true}:{x?:number;y?:number;s?:number;jets?:boolean}){
 return <g transform={`translate(${x} ${y}) scale(${s})`}>
  <ellipse rx="390" ry="92" fill={C.orange} opacity=".18"/><ellipse rx="300" ry="62" fill="none" stroke={C.orange} strokeWidth="48" opacity=".65"/><ellipse rx="250" ry="48" fill="none" stroke={C.gold} strokeWidth="18"/>
  <circle r="190" fill={C.black}/><circle r="201" fill="none" stroke="#fff0bd" strokeWidth="5" opacity=".9"/>
  <path d="M-70-235L-90-520Q0-570 90-520L70-235Z" fill={C.cyan} opacity={jets?.35:0}/>
  <path d="M-70 235L-90 520Q0 570 90 520L70 235Z" fill={C.cyan} opacity={jets?.35:0}/>
  {Array.from({length:28},(_,i)=>{const a=i*Math.PI*2/28;return <circle key={i} cx={Math.cos(a)*330} cy={Math.sin(a)*78} r={5+(i%3)*3} fill={i%2?C.orange:C.gold}/>})}
 </g>
}
function Label({children,x=960,y=95,size=48,accent=false}:{children:React.ReactNode;x?:number;y?:number;size?:number;accent?:boolean}){return <text x={x} y={y} textAnchor="middle" fill={accent?C.gold:C.cream} fontFamily="Arial,sans-serif" fontWeight="900" fontSize={size} letterSpacing="1">{children}</text>}
function Scene({id,local}:{id:number;local:number}){
 const t=local/1800, drift=local/8;
 if(id===0)return <g><rect width="1920" height="1080" fill={C.black}/><Stars n={45} drift={drift}/><BlackHole x={960} y={535} s={1.05}/><g transform={`translate(${960+Math.sin(local/70)*90} ${800-p(local,0,700)*230}) rotate(${Math.sin(local/50)*4})`}><ellipse cy="90" rx="125" ry="28" fill={C.purple} opacity=".6"/><Professor s={.48} look={1} panic={p(local,300,900)}/></g><Bob x={1500} y={190} s={.55}/><Label y={95} size={45}>TWO PEOPLE. ONE FALL. TWO STORIES.</Label><Label y={1010} size={38} accent>AND PHYSICS SAYS BOTH CAN BE RIGHT.</Label></g>;
 if(id===1)return <g><rect width="1920" height="1080" fill={C.navy}/><Stars n={55} drift={drift}/><g transform="translate(480 500)"><circle r="260" fill="#f5a45b"/><circle r="205" fill="#ffd66b"/><circle r="150" fill="#8d5a4d"/></g><g transform="translate(1460 500)"><circle r="260" fill={C.black}/><path d="M-300 300Q0 0 300 300" fill="none" stroke={C.gold} strokeWidth="12"/></g><path d="M210 820Q480 690 740 820M1180 820Q1450 690 1710 820" fill="none" stroke={C.cyan} strokeWidth="15" opacity=".7"/><Label x={480} y={180} size={52}>NORMAL STAR</Label><Label x={1460} y={180} size={52} accent>BLACK HOLE</Label><Label y={990} size={39}>NOT A COSMIC VACUUM CLEANER.</Label><Duck x={950} y={870} s={.7}/></g>;
 if(id===2)return <g><rect width="1920" height="1080" fill="#161b3d"/><Stars n={40} drift={drift}/><g transform="translate(960 530)"><circle r="410" fill="#25335a"/><circle r="285" fill={C.orange} opacity=".28"/><circle r="185" fill={C.black}/><circle r="196" fill="none" stroke={C.gold} strokeWidth="7"/><path d="M-600 250Q0 50 600 250" fill="none" stroke={C.cyan} strokeWidth="18"/><circle cx="-450" cy="200" r="25" fill={C.gold}/><circle cx="450" cy="200" r="25" fill={C.gold}/></g><g transform="translate(650 730)"><Professor s={.55} look={1}/></g><Label y={100}>THE EVENT HORIZON</Label><Label y={1000} size={38} accent>THE POINT OF NO RETURN.</Label></g>;
 if(id===3)return <g><rect width="1920" height="1080" fill={C.deep}/><Stars n={85} drift={drift}/><BlackHole x={1040} y={520} s={1.05}/><g transform={`translate(${600+p(local,0,900)*420} ${800-p(local,0,900)*280}) rotate(${p(local,0,900)*260})`}><Professor s={.55} look={1} panic={p(local,300,700)}/></g><path d="M520 650Q760 360 1040 250M520 650Q790 650 1040 780" fill="none" stroke={C.cream} strokeWidth="8" opacity=".35"/><Label y={100}>LIGHT DOESN'T JUST TRAVEL HERE.</Label><Label y={1000} size={38} accent>SPACE BENDS THE PATH.</Label></g>;
 if(id===4)return <g><rect width="1920" height="1080" fill="#080c1c"/><Stars n={120} drift={drift*1.8}/><BlackHole x={960} y={550} s={.9}/><path d="M0 460Q450 250 960 430T1920 430" fill="none" stroke={C.orange} strokeWidth="42" opacity=".42"/><path d="M0 650Q450 850 960 650T1920 650" fill="none" stroke={C.gold} strokeWidth="36" opacity=".5"/><g transform="translate(570 700)"><Professor s={.48} look={1}/></g><circle cx="960" cy="550" r="365" fill="none" stroke={C.cyan} strokeWidth="4" opacity=".8"/><Label y={100}>GET CLOSE ENOUGH…</Label><Label y={1000} size={39} accent>YOU CAN SEE LIGHT ORBIT THE HOLE.</Label></g>;
 if(id===5)return <g><rect width="1920" height="1080" fill={C.navy}/><Stars n={65} drift={drift}/><BlackHole x={1470} y={530} s={.8}/><g transform="translate(450 500)"><circle r="205" fill="#233456"/><circle r="170" fill="#6c85a5"/><path d="M-150 50Q0-110 150 50" fill="none" stroke={C.gold} strokeWidth="18"/><circle cx="0" cy="0" r="30" fill={C.cream}/></g><path d="M680 500C940 500 1060 530 1230 530" stroke={C.cyan} strokeWidth="9" fill="none" strokeDasharray="20 16"/><Bob x={1180} y={420} s={.75}/><Label y={100}>THE OUTSIDE OBSERVER</Label><Label y={1000} size={37} accent>SEES YOUR SIGNALS FADE, REDDEN, AND SLOW.</Label></g>;
 if(id===6)return <g><rect width="1920" height="1080" fill="#25153d"/><Stars n={70} drift={drift}/><BlackHole x={960} y={560} s={.9}/><g transform={`translate(${620+p(local,0,1000)*360} ${720-p(local,0,1000)*210}) rotate(${p(local,0,1000)*500})`}><Professor s={.5} look={1} panic={p(local,300,700)} stretch={p(local,400,1100)}/></g><Duck x={520+p(local,0,1100)*650} y={760-p(local,0,1100)*250} s={.42} rot={p(local,0,1100)*720}/><Label y={100}>FROM YOUR POINT OF VIEW…</Label><Label y={1000} size={38} accent>THE HORIZON DOESN'T FEEL LIKE A WALL.</Label></g>;
 if(id===7)return <g><rect width="1920" height="1080" fill="#1a1028"/><Stars n={35} drift={drift}/><g transform="translate(960 540)"><circle r="420" fill="#3c2456"/><circle r="300" fill={C.black}/><path d="M-220 250Q0 100 220 250" fill="none" stroke={C.magenta} strokeWidth="22"/><path d="M-170-260Q0-150 170-260" fill="none" stroke={C.orange} strokeWidth="22"/></g><g transform="translate(960 750)"><Professor s={.5} panic={p(local,600,1200)} stretch={p(local,300,1500)}/></g><path d="M350 350Q960 500 1570 350" fill="none" stroke={C.gold} strokeWidth="8" opacity=".5"/><Label y={100}>BUT GRAVITY CAN STILL KILL YOU.</Label><Label y={1000} size={39} accent>THE TIDAL FORCE STRETCHES YOU.</Label></g>;
 if(id===8)return <g><rect width="1920" height="1080" fill="#0c1128"/><Stars n={80} drift={drift}/><g transform="translate(960 520)"><circle r="430" fill="#19264b"/><circle r="330" fill="#283e67"/><circle r="230" fill="#3e5e82"/><circle r="135" fill={C.cream}/><path d="M-105 20Q0-90 105 20" fill="none" stroke={C.magenta} strokeWidth="16"/><circle cx="-45" cy="-15" r="18" fill={C.navy}/><circle cx="45" cy="-15" r="18" fill={C.navy}/></g><g transform="translate(600 800)"><Professor s={.43} look={1}/></g><Bob x={1390} y={250} s={.55}/><Label y={100}>ONE FALL. TWO DESCRIPTIONS.</Label><Label y={1000} size={39} accent>THE DIFFERENCE IS WHERE YOU STAND.</Label></g>;
 return <g><rect width="1920" height="1080" fill={C.black}/><Stars n={120} drift={drift}/><BlackHole x={960} y={520} s={.72}/><g transform="translate(650 780)"><Professor s={.42} look={1}/></g><Duck x={1250} y={770} s={.35}/><g transform="translate(960 890)"><circle cx="-190" r="14" fill={C.cyan}/><circle cx="0" r="14" fill={C.gold}/><circle cx="190" r="14" fill={C.magenta}/></g><Label y={105} size={52}>REALITY DEPENDS ON WHERE YOU STAND.</Label><Label y={995} size={34} accent>AND THAT'S THE STRANGEST PART.</Label></g>;
}
export const Explainer:React.FC=()=>{const f=useCurrentFrame();const scene=Math.min(9,Math.floor(f/1800));const local=f%1800;const op=Math.min(interpolate(local,[0,30],[0,1],cl),interpolate(local,[1770,1799],[1,0],cl));return <AbsoluteFill style={{background:C.black,overflow:'hidden'}}><svg width="100%" height="100%" viewBox="0 0 1920 1080"><g opacity={op}><Scene id={scene} local={local}/></g></svg></AbsoluteFill>}
