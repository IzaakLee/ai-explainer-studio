import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

const C={
  ink:'#101526',deep:'#18233b',paper:'#f5efd9',white:'#fffdf5',
  cyan:'#55dff5',teal:'#42c7a5',yellow:'#ffd35a',pink:'#ff6f9f',
  orange:'#ff8b5e',purple:'#9b8cff',red:'#ff625f',blue:'#78a9ff'
};
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const ease=(v:number)=>v*v*(3-2*v);
const fade=(f:number,a=0,b=45)=>interpolate(f,[a,b],[0,1],clamp);
const out=(f:number,a=0,b=45)=>1-interpolate(f,[a,b],[0,1],clamp);

function Professor({x=960,y=800,s=1,r=0,look=0,arm=0,panic=0,fall=0}:{x?:number;y?:number;s?:number;r?:number;look?:number;arm?:number;panic?:number;fall?:number}){
  return <g transform={`translate(${x} ${y}) rotate(${r+fall*28}) scale(${s})`}>
    <g transform={`translate(${Math.sin(panic*18)*7} ${Math.abs(Math.sin(panic*14))*5})`}>
      <path d="M-104-145L-138-185-92-169-72-214-42-174-4-220 15-174 55-208 52-166 101-187 78-142Z" fill={C.ink}/>
      <ellipse cx="0" cy="-70" rx="96" ry="92" fill={C.paper} stroke={C.ink} strokeWidth="8"/>
      <g stroke={C.ink} strokeWidth="7" fill={C.white}><circle cx="-43" cy="-70" r="35"/><circle cx="43" cy="-70" r="35"/><path d="M-8-70H8"/></g>
      <circle cx={-43+look*10} cy="-70" r="10" fill={C.ink}/><circle cx={43+look*10} cy="-70" r="10" fill={C.ink}/>
      <path d={panic>.35?'M-22-30 Q0-42 22-30':'M-19-27 Q0-16 19-27'} fill="none" stroke={C.ink} strokeWidth="6" strokeLinecap="round"/>
      <path d="M-72 18 Q0-5 72 18L85 185Q0 210-85 185Z" fill={C.white} stroke={C.ink} strokeWidth="8"/>
      <path d="M0 19L-19 72 0 185 19 72Z" fill={C.yellow}/>
      <path d={`M-76 34Q-128 ${22-arm*52}-153 ${-8-arm*65}`} fill="none" stroke={C.white} strokeWidth="34" strokeLinecap="round"/>
      <path d={`M76 34Q128 ${22+arm*52}153 ${-8+arm*65}`} fill="none" stroke={C.white} strokeWidth="34" strokeLinecap="round"/>
      <path d="M-57 185L-66 254M57 185L66 254" stroke={C.ink} strokeWidth="26" strokeLinecap="round"/>
    </g>
  </g>;
}

function World({children,zoom=1,tx=0,ty=0}:{children:React.ReactNode;zoom?:number;tx?:number;ty?:number}){
 return <g transform={`translate(${960+tx} ${540+ty}) scale(${zoom}) translate(-960 -540)`}>{children}</g>;
}
function Label({children,x=960,y=100,size=42,fill=C.white}:{children:React.ReactNode;x?:number;y?:number;size?:number;fill?:string}){
 return <text x={x} y={y} textAnchor="middle" fill={fill} fontFamily="Arial, sans-serif" fontWeight="900" fontSize={size} letterSpacing="1">{children}</text>;
}
function Starfield({n=45,shift=0}){
 return <g>{Array.from({length:n},(_,i)=>{
   const x=((i*191+shift*3)%2100)-90,y=((i*113+shift*7)%1050);
   return <circle key={i} cx={x} cy={y} r={1.5+(i%4)*1.2} fill={i%5===0?C.yellow:C.cyan} opacity=".6"/>
 })}</g>;
}
function Room({ballX=1100,door=false}:{ballX?:number;door?:boolean}){
 return <g>
   <rect width="1920" height="1080" fill={C.paper}/>
   <rect x="90" y="90" width="1740" height="900" rx="52" fill="#d5e5e7" stroke={C.ink} strokeWidth="9"/>
   <path d="M130 720Q520 610 920 700T1790 680V940H130Z" fill="#866b58"/>
   <rect x="1380" y="320" width="260" height="410" rx="18" fill="#66768b" stroke={C.ink} strokeWidth="8"/>
   <rect x="1420" y="360" width="180" height="330" rx="8" fill={door?C.deep:'#9ec7d2'}/>
   <circle cx={ballX} cy="590" r="43" fill={C.red} stroke={C.ink} strokeWidth="6"/>
   <path d={`M${ballX-160} 590Q${ballX-90} 560 ${ballX-43} 590`} fill="none" stroke={C.red} strokeWidth="9" opacity=".65"/>
   <rect x="210" y="310" width="330" height="170" rx="24" fill="#b7cad0" stroke={C.ink} strokeWidth="7"/>
   <circle cx="280" cy="395" r="35" fill={C.cyan}/><circle cx="370" cy="395" r="35" fill={C.yellow}/><circle cx="460" cy="395" r="35" fill={C.pink}/>
 </g>;
}

function Eye({scale=1,blind=false}:{scale?:number;blind?:boolean}){
 return <g transform={`scale(${scale})`}>
   <path d="M-330 0Q0-205 330 0Q0 205-330 0Z" fill={C.paper} stroke={C.ink} strokeWidth="10"/>
   <circle r="108" fill={C.cyan} stroke={C.ink} strokeWidth="9"/><circle r="53" fill={C.ink}/><circle cx="-18" cy="-20" r="15" fill={C.white}/>
   {blind&&<circle cx="155" r="42" fill={C.deep} stroke={C.pink} strokeWidth="9" strokeDasharray="12 10"/>}
 </g>;
}

function Retina(){
 const cells=Array.from({length:99},(_,i)=>({x:(i%11)*64-320,y:Math.floor(i/11)*55-245}));
 return <g>
   <path d="M-390-260Q0-360 390-260L350 260Q0 350-350 260Z" fill="#e66f9c" opacity=".32" stroke={C.paper} strokeWidth="8"/>
   {cells.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r={i%9===0?22:12} fill={i===54?C.ink:C.cyan} opacity=".8"/>)}
   <circle cx="260" cy="0" r="62" fill={C.deep} stroke={C.yellow} strokeWidth="9"/>
 </g>;
}

function Scene({id,local}:{id:number;local:number}){
 const t=local/900, e=ease(Math.min(1,t));
 if(id===0){
   const bx=interpolate(local,[0,220,430,620,900],[1040,1250,1460,1550,1550],clamp);
   const cam=interpolate(local,[0,560,900],[1,1,2.25],clamp);
   return <World zoom={cam} tx={interpolate(local,[560,900],[0,-430],clamp)}>
    <Room ballX={bx} door={local>430}/>
    <Professor x={720+Math.min(local/4,150)} y={690} s={.78} look={local>180?1:0} arm={local>390?1:.1} panic={local>420?.7:0}/>
    {local<520&&<Label y={94} size={54}>YOUR BRAIN IS LYING TO YOU.</Label>}
    {local>470&&<g opacity={fade(local,470,560)}><Label y={180} size={48} fill={C.yellow}>YOU SAW IT.</Label></g>}
    {local>650&&<Label y={940} size={42}>OR DID YOU?</Label>}
   </World>;
 }
 if(id===1){
   const z=interpolate(local,[0,250,520,900],[1,1.4,3.2,1.05],clamp);
   return <World zoom={z} tx={interpolate(local,[500,900],[0,260],clamp)}>
     <rect width="1920" height="1080" fill={C.deep}/>
     <Starfield n={70} shift={local}/>
     <g transform="translate(960 470)">
       <Eye scale={.72}/>
       {Array.from({length:24},(_,i)=>{const a=i*Math.PI*2/24;return <circle key={i} cx={Math.cos(a)*450} cy={Math.sin(a)*300} r={i%3?9:18} fill={i%2?C.cyan:C.pink}/>})}
     </g>
     <Professor x={960} y={840} s={.68} arm={local>400?1:.1} look={local>550?1:0}/>
     {local<420&&<Label y={110}>WHAT DOES YOUR BRAIN ACTUALLY RECEIVE?</Label>}
     {local>450&&<Label y={110} fill={C.yellow}>LIGHT. PATTERNS. SIGNALS.</Label>}
     {local>650&&<g opacity={fade(local,650,740)}><Label y={950} size={38}>MILLIONS OF THEM.</Label></g>}
   </World>;
 }
 if(id===2){
   const z=interpolate(local,[0,260,500,900],[1,1.2,2.8,1.1],clamp);
   const ball=interpolate(local,[0,330,620],[420,820,1180],clamp);
   return <World zoom={z} tx={interpolate(local,[500,900],[0,-270],clamp)}>
     <rect width="1920" height="1080" fill="#0c1528"/>
     <g transform="translate(960 480)"><Eye scale={.8} blind={local>480}/></g>
     <path d={`M${ball} 480Q${ball+120} 430 ${ball+260} 480`} fill="none" stroke={C.yellow} strokeWidth="10" strokeDasharray="18 15"/>
     {local>500&&<g opacity={fade(local,500,600)}><circle cx="1115" cy="480" r="48" fill="none" stroke={C.pink} strokeWidth="9" strokeDasharray="10 10"/><Label y={900} size={40} fill={C.pink}>THERE'S A HOLE IN YOUR VISION.</Label></g>}
     <Professor x={960} y={820} s={.7} arm={local>480?1:.1} panic={local>520?.7:0}/>
   </World>;
 }
 if(id===3){
   const z=interpolate(local,[0,260,520,900],[1,2.2,5,1.4],clamp);
   const nerve=interpolate(local,[450,700,900],[0,1,1],clamp);
   return <World zoom={z}>
     <rect width="1920" height="1080" fill="#121b30"/>
     <g transform="translate(960 500)"><Eye scale={.65}/></g>
     <g transform="translate(960 500) scale(.65)"><Retina/></g>
     <path d={`M1220 500C1450 500 1500 ${500+nerve*100} 1780 ${500+nerve*100}`} fill="none" stroke={C.yellow} strokeWidth="18"/>
     <circle cx="1220" cy="500" r="65" fill={C.deep} stroke={C.pink} strokeWidth="10" strokeDasharray="12 10"/>
     {local<430&&<Label y={105}>THE SIGNAL HAS TO LEAVE THE EYE.</Label>}
     {local>430&&local<700&&<Label y={105} fill={C.yellow}>THROUGH ONE TINY EXIT.</Label>}
     {local>700&&<g opacity={fade(local,700,780)}><Label y={920} size={38} fill={C.pink}>NO RODS. NO CONES.</Label><Professor x={960} y={780} s={.62} fall={.35} panic={.7}/></g>}
   </World>;
 }
 if(id===4){
   const fillP=interpolate(local,[0,300,600,900],[0,0,1,1],clamp);
   return <World zoom={interpolate(local,[0,300,520,900],[1,1.1,1.8,1],clamp)}>
     <rect width="1920" height="1080" fill="#102139"/>
     <path d="M0 700Q400 540 800 700T1600 650T1920 700V1080H0Z" fill="#1d3a55"/>
     <g transform="translate(960 430) scale(.95)"><Retina/></g>
     <circle cx="1210" cy="430" r="70" fill={C.deep} stroke={C.pink} strokeWidth="10" strokeDasharray="12 10"/>
     <path d="M1210 430C1390 430 1470 300 1710 300" fill="none" stroke={C.yellow} strokeWidth="13"/>
     <g transform={`translate(${650+fillP*720} ${800-fillP*300}) rotate(${fillP*450}) scale(.7)`}><Professor arm={1} panic={fillP}/></g>
     {local<420&&<Label y={105}>SO YOUR BRAIN HAS A PROBLEM.</Label>}
     {local>420&&local<700&&<Label y={105} fill={C.yellow}>SOMETHING IS MISSING.</Label>}
     {local>700&&<Label y={950} size={40}>BUT THE WORLD DOESN'T LOOK BROKEN.</Label>}
   </World>;
 }
 if(id===5){
   const z=interpolate(local,[0,220,450,720,900],[1,1.2,1.8,1.8,1],clamp);
   return <World zoom={z}>
     <rect width="1920" height="1080" fill="#203d51"/>
     <path d="M0 650Q400 460 850 650T1920 610V1080H0Z" fill="#315a68"/>
     <path d="M0 240Q430 80 900 250T1920 220V620Q1450 500 900 650T0 620Z" fill="#78c9df" opacity=".45"/>
     <circle cx="470" cy="470" r="52" fill={C.deep} stroke={C.pink} strokeWidth="10" strokeDasharray="10 10"/>
     <path d="M80 470H420M520 470H1200" stroke={C.paper} strokeWidth="18" strokeLinecap="round"/>
     <path d="M520 470C760 470 830 330 1120 330" fill="none" stroke={C.paper} strokeWidth="18"/>
     {local>360&&<g opacity={fade(local,360,500)}><path d="M80 470H1280" stroke={C.yellow} strokeWidth="10" strokeDasharray="20 16"/><circle cx={Math.min(1180,520+(local-360)*1.6)} cy="470" r="35" fill={C.yellow}/></g>}
     <Professor x={700} y={820} s={.72} arm={local>500?1:.1}/>
     {local<350&&<Label y={100}>THE BRAIN DOES SOMETHING CLEVER.</Label>}
     {local>350&&<Label y={100} fill={C.yellow}>IT FILLS IN THE GAP.</Label>}
     {local>620&&<Label y={955} size={38}>USING WHAT'S AROUND IT.</Label>}
   </World>;
 }
 if(id===6){
   const chaos=interpolate(local,[0,250,500,700,900],[0,0,1,1,0],clamp);
   return <World zoom={interpolate(local,[0,450,900],[1,1.2,1],clamp)}>
     <rect width="1920" height="1080" fill="#211b38"/>
     <Starfield n={35} shift={local}/>
     <g transform="translate(960 510)">
       <rect x="-650" y="-330" width="1300" height="660" rx="60" fill="#3d315b" stroke={C.paper} strokeWidth="8"/>
       {Array.from({length:18},(_,i)=><g key={i} transform={`translate(${-520+(i%9)*130} ${-205+Math.floor(i/9)*250}) rotate(${Math.sin(local/25+i)*chaos*30})`}><rect width="72" height="72" rx="16" fill={i%3===0?C.cyan:i%3===1?C.yellow:C.pink}/></g>)}
       {chaos>0&&<path d="M-650-330L650 330M650-330L-650 330" stroke={C.red} strokeWidth="18" opacity={chaos*.55}/>}
     </g>
     <g transform={`translate(${520+interpolate(local,[0,500,900],[0,360,440],clamp)} ${790-interpolate(local,[0,500,900],[0,180,250],clamp)}) rotate(${chaos*360}) scale(.72)`}><Professor arm={1} panic={chaos}/></g>
     {local<400&&<Label y={100}>BUT HERE'S THE CATCH.</Label>}
     {local>400&&local<700&&<Label y={100} fill={C.red}>YOUR BRAIN CAN BE WRONG.</Label>}
     {local>700&&<Label y={950} size={39} fill={C.yellow}>AND SOMETIMES IT DOESN'T EVEN KNOW.</Label>}
   </World>;
 }
 if(id===7){
   const flip=interpolate(local,[0,300,600],[0,0,1],clamp);
   return <World zoom={interpolate(local,[0,450,900],[1,1.25,1],clamp)}>
     <rect width="1920" height="1080" fill="#102333"/>
     <g transform="translate(960 500)">
       <rect x="-720" y="-340" width="1440" height="680" rx="65" fill="#29445a" stroke={C.paper} strokeWidth="8"/>
       <g transform={`translate(0 ${flip*40}) rotate(${flip*12})`}>
         <rect x="-360" y="-75" width="290" height="150" rx="25" fill={C.cyan}/>
         <rect x="70" y="-75" width="290" height="150" rx="25" fill={C.pink}/>
         <rect x="-30" y="-75" width="60" height="150" rx="12" fill={C.yellow}/>
       </g>
       <text x="-330" y="-180" fill={C.paper} fontSize="38" fontWeight="900">A</text><text x="300" y="-180" fill={C.paper} fontSize="38" fontWeight="900">B</text>
     </g>
     <Professor x={960} y={830} s={.7} look={flip} arm={flip}/>
     {local<420&&<Label y={100}>THE SAME SHAPE CAN LOOK DIFFERENT.</Label>}
     {local>420&&<Label y={100} fill={C.yellow}>CONTEXT CHANGES THE GUESS.</Label>}
     {local>650&&<Label y={955} size={37}>YOUR BRAIN ISN'T JUST READING PIXELS.</Label>}
   </World>;
 }
 if(id===8){
   const missing=interpolate(local,[300,560,760],[0,1,0],clamp);
   return <World zoom={interpolate(local,[0,350,900],[1,1.15,1],clamp)}>
     <rect width="1920" height="1080" fill="#162a25"/><rect y="670" width="1920" height="410" fill="#27483d"/>
     {Array.from({length:17},(_,i)=>{const x=80+i*112;return <g key={i}><rect x={x} y={410-(i%4)*28} width="70" height="260" rx="12" fill={i%2?C.pink:C.cyan}/><circle cx={x+35} cy={380-(i%4)*28} r="30" fill={C.yellow}/></g>})}
     <g opacity={missing}><circle cx="976" cy="470" r="90" fill={C.deep}/><path d="M920 440L1030 550M1030 440L920 550" stroke={C.red} strokeWidth="15"/></g>
     <g transform={`translate(${600+interpolate(local,[0,900],[0,700],clamp)} 735) scale(.68)`}><Professor arm={1} look={local>520?1:0}/></g>
     <circle cx="980" cy="480" r={125+Math.sin(local/10)*8} fill="none" stroke={C.yellow} strokeWidth="9"/>
     {local<450&&<Label y={100}>YOU CAN LOOK DIRECTLY AT SOMETHING—</Label>}
     {local>450&&<Label y={100} fill={C.yellow}>AND STILL MISS IT.</Label>}
     {local>650&&<Label y={955} size={38}>ATTENTION IS A FILTER.</Label>}
   </World>;
 }
 if(id===9){
   const rebuild=interpolate(local,[0,400,700,900],[0,0,1,1],clamp);
   return <World zoom={interpolate(local,[0,400,900],[1,1.15,1],clamp)}>
     <rect width="1920" height="1080" fill="#211b36"/>
     <g transform="translate(960 500)">
       <rect x="-700" y="-360" width="1400" height="720" rx="60" fill="#403356" stroke={C.paper} strokeWidth="8"/>
       <rect x="-500" y="-220" width="400" height="280" rx="30" fill="#718ca0"/>
       <rect x="100" y="-220" width="400" height="280" rx="30" fill="#718ca0"/>
       <circle cx="-300" cy="-80" r="70" fill={C.paper}/><circle cx="-300" cy="-80" r="30" fill={C.ink}/>
       <circle cx="300" cy="-80" r="70" fill={C.paper}/><circle cx="300" cy="-80" r="30" fill={C.ink}/>
       <path d="M-80 170Q0 70 80 170" fill="none" stroke={C.yellow} strokeWidth="16"/>
       {rebuild>0&&<g opacity={rebuild}><path d="M-420 120L-260 40L-100 150M150 130L300 30L450 150" fill="none" stroke={C.pink} strokeWidth="13" strokeDasharray="18 13"/></g>}
     </g>
     <Professor x={960} y={835} s={.7} arm={rebuild}/>
     {local<430&&<Label y={100}>MEMORY FEELS LIKE A RECORDING.</Label>}
     {local>430&&<Label y={100} fill={C.yellow}>BUT IT'S NOT A VIDEO FILE.</Label>}
     {local>650&&<Label y={955} size={38}>YOUR BRAIN REBUILDS THE PAST.</Label>}
   </World>;
 }
 const z=interpolate(local,[0,300,600,900],[1,1.1,1.45,1],clamp);
 return <World zoom={z}>
   <rect width="1920" height="1080" fill="#0a1222"/><Starfield n={80} shift={local}/>
   <g transform="translate(960 500)">
     <circle r="355" fill="#152944" stroke={C.cyan} strokeWidth="9"/>
     <g transform={`rotate(${interpolate(local,[0,900],[0,360],clamp)})`}><Eye scale={.68}/></g>
     <path d="M-250 210Q0 380 250 210" fill="none" stroke={C.yellow} strokeWidth="12" strokeDasharray="20 15"/>
     <circle cx="-210" cy="-170" r="30" fill={C.pink}/><circle cx="230" cy="-150" r="26" fill={C.teal}/>
   </g>
   <g transform={`translate(960 ${850-interpolate(local,[0,900],[0,70],clamp)}) scale(.64)`}><Professor arm={1} look={local>500?1:0}/></g>
   {local<420&&<Label y={95} size={50}>YOUR BRAIN ISN'T A CAMERA.</Label>}
   {local>420&&<Label y={95} size={47} fill={C.yellow}>IT BUILDS A USEFUL MODEL.</Label>}
   {local>620&&<Label y={950} size={37}>FROM INCOMPLETE INFORMATION.</Label>}
 </World>;
}

export const Explainer:React.FC=()=>{
 const f=useCurrentFrame();
 const scene=Math.min(10,Math.floor(f/900));
 const local=f%900;
 const fi=interpolate(local,[0,28],[0,1],clamp);
 const fo=interpolate(local,[855,899],[1,0],clamp);
 return <AbsoluteFill style={{background:C.ink,overflow:'hidden'}}>
   <svg width="100%" height="100%" viewBox="0 0 1920 1080">
     <g opacity={Math.min(fi,fo)}><Scene id={scene} local={local}/></g>
   </svg>
 </AbsoluteFill>;
};
