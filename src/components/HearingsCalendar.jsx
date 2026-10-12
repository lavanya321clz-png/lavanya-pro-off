import React, { useState, useEffect, useRef, useMemo } from 'react';
import Swal from 'sweetalert2';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import {
  Activity as ee,
  ArrowLeft as te,
  ArrowRight as ne,
  Bell as re,
  Briefcase as ie,
  Building as ae,
  Calendar as A,
  Check as j,
  ChevronLeft as oe,
  ChevronRight as se,
  CircleAlert as ce,
  CircleCheck as le,
  Clock as M,
  Database as N,
  Download as ue,
  Eye as de,
  FileText as fe,
  FolderOpen as pe,
  Filter as me,
  Gavel as he,
  Info as ge,
  Kanban as _e,
  LayoutDashboard as ve,
  LayoutGrid as ye,
  List as P,
  Mail as be,
  MapPin as xe,
  Menu as Se,
  Moon as Ce,
  Pencil as we,
  Phone as Te,
  Plus as Ee,
  Printer as De,
  RefreshCw as Oe,
  Search as ke,
  Settings as Ae,
  Shield as je,
  Sparkles as Me,
  SquareCheckBig as Ne,
  Sun as Pe,
  Tag as Fe,
  Trash2 as Ie,
  Trash as Le,
  TrendingUp as F,
  User as Re,
  Users as ze,
  Video as Be,
  X as Ve
} from 'lucide-react';

function nt(e,t){let n=new Date(e,t,1).getDay(),r=new Date(e,t+1,0).getDate(),i=new Date(e,t,0).getDate(),a=[];for(let r=n-1;r>=0;r--)a.push({day:i-r,currentMonth:!1,year:t===0?e-1:e,month:t===0?11:t-1});for(let n=1;n<=r;n++)a.push({day:n,currentMonth:!0,year:e,month:t});let o=42-a.length;for(let n=1;n<=o;n++)a.push({day:n,currentMonth:!1,year:t===11?e+1:e,month:t===11?0:t+1});return a}function rt(e,t,n){return`${e}-${String(t+1).padStart(2,`0`)}-${String(n).padStart(2,`0`)}`}function it(e,t,n){return new Date(e,t,n).toLocaleDateString(`en-US`,{weekday:`long`,month:`short`,day:`numeric`,year:`numeric`})}const L = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const tt = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export default function HearingsCalendar({cases:e,perms:t={}}){let n=new Date,[r,i]=useState(`calendar`),[a,o]=useState(n.getFullYear()),[s,c]=useState(n.getMonth()),[l,u]=useState(n.getDate()),d={};e.forEach(e=>{e.hearings&&e.hearings.forEach(t=>{let n=t.date;d[n]||(d[n]=[]),d[n].push({...t,caseId:e.id,caseTitle:e.title,court:e.court,caseStatus:e.status,caseNumber:e.caseNumber||``})})});let f=Object.values(d).flat().sort((e,t)=>new Date(e.date)-new Date(t.date)),p=nt(a,s),m=rt(n.getFullYear(),n.getMonth(),n.getDate()),h=d[rt(a,s,l)]||[];return _jsxs(`div`,{className:`hearings-schedule-container`,children:[_jsxs(`div`,{className:`hearings-page-header`,children:[_jsxs(`div`,{className:`hearings-title-block`,children:[_jsx(`h1`,{children:`Advocate Daily Schedule`}),_jsxs(`p`,{children:[`Track court appearances, `,_jsx(`a`,{href:`#`,children:`client trials`}),`, and case hearings.`]})]}),_jsxs(`div`,{className:`hearings-view-toggle`,children:[_jsx(`button`,{className:`view-toggle-btn ${r===`calendar`?`active`:``}`,onClick:()=>i(`calendar`),title:`Calendar Grid View`,children:_jsx(ye,{size:16})}),_jsx(`button`,{className:`view-toggle-btn ${r===`list`?`active`:``}`,onClick:()=>i(`list`),title:`List View`,children:_jsx(P,{size:16})})]})]}),r===`calendar`&&_jsxs(`div`,{className:`hearings-main-area`,children:[_jsxs(`div`,{className:`cal-card`,children:[_jsxs(`div`,{className:`cal-nav-row`,children:[_jsxs(`span`,{className:`cal-month-label`,children:[L[s],` `,a]}),_jsxs(`div`,{className:`cal-nav-controls`,children:[_jsx(`button`,{className:`cal-nav-btn`,onClick:()=>{s===0?(o(e=>e-1),c(11)):c(e=>e-1)},children:_jsx(oe,{size:14})}),_jsx(`button`,{className:`cal-today-btn`,onClick:()=>{o(n.getFullYear()),c(n.getMonth()),u(n.getDate())},children:`Today`}),_jsx(`button`,{className:`cal-nav-btn`,onClick:()=>{s===11?(o(e=>e+1),c(0)):c(e=>e+1)},children:_jsx(se,{size:14})})]})]}),_jsx(`div`,{className:`cal-weekday-header`,children:tt.map(e=>_jsx(`div`,{className:`cal-weekday-label`,children:e},e))}),_jsx(`div`,{className:`cal-days-grid`,children:p.map((e,t)=>{let n=rt(e.year,e.month,e.day),r=n===m,i=e.currentMonth&&e.day===l&&e.month===s&&e.year===a,f=d[n]||[];return _jsxs(`div`,{className:[`cal-day-cell`,e.currentMonth?``:`outside-month`,r?`is-today`:``,i?`is-selected`:``].filter(Boolean).join(` `),onClick:()=>{e.currentMonth?u(e.day):(o(e.year),c(e.month),u(e.day))},children:[_jsx(`span`,{className:`cal-day-number`,children:e.day}),f.slice(0,2).map((e,t)=>_jsx(`div`,{className:`cal-event-chip`,children:e.purpose},t)),f.length>2&&_jsxs(`div`,{className:`cal-event-chip`,children:[`+`,f.length-2,` more`]})]},t)})})]}),_jsxs(`div`,{className:`agenda-card`,children:[_jsxs(`div`,{children:[_jsx(`div`,{className:`agenda-header-label`,children:`Daily Agenda`}),_jsx(`div`,{className:`agenda-date-label`,children:it(a,s,l)})]}),h.length===0?_jsx(`div`,{className:`agenda-empty-state`,children:`No events scheduled for this day.`}):_jsx(`div`,{className:`agenda-events-list`,children:h.map((e,n)=>_jsxs(`div`,{className:`agenda-event-row`,children:[_jsx(`div`,{className:`agenda-time-label`,children:e.time}),_jsx(`div`,{className:`agenda-dot`}),_jsxs(`div`,{className:`agenda-event-card`,children:[_jsx(`div`,{className:`agenda-event-title`,children:e.purpose}),_jsxs(`div`,{className:`agenda-event-meta`,children:[_jsx(xe,{size:11}),e.court,` | Status: Scheduled`]}),_jsxs(`div`,{className:`agenda-event-meta`,style:{marginBottom:0},children:[_jsx(M,{size:11}),e.business?.slice(0,55),e.business?.length>55?`...`:``]}),_jsxs(`div`,{className:`agenda-event-actions`,children:[_jsx(`button`,{className:`agenda-action-btn`,title:`View`,children:_jsx(de,{size:13})}),_jsx(`button`,{className:`agenda-action-btn`,disabled:!t.write,style:{cursor:t.write?`pointer`:`not-allowed`,opacity:t.write?1:.4},title:t.write?`Edit`:`Action Denied - Permissions Required`,children:_jsx(we,{size:13})}),_jsx(`button`,{className:`agenda-action-btn danger`,disabled:!t.delete,style:{cursor:t.delete?`pointer`:`not-allowed`,opacity:t.delete?1:.4},title:t.delete?`Delete`:`Action Denied - Permissions Required`,children:_jsx(Ie,{size:13})})]})]})]},n))})]})]}),r===`list`&&_jsx(`div`,{className:`hearings-list-table`,children:_jsxs(`table`,{className:`saas-table`,children:[_jsx(`thead`,{children:_jsxs(`tr`,{children:[_jsx(`th`,{children:`Date & Time`}),_jsx(`th`,{children:`Case Title`}),_jsx(`th`,{children:`Court`}),_jsx(`th`,{children:`Purpose`}),_jsx(`th`,{children:`Judge Bench`}),_jsx(`th`,{children:`Status`})]})}),_jsxs(`tbody`,{children:[f.map((e,t)=>{let n=e.date===m;return _jsxs(`tr`,{style:{backgroundColor:n?`rgba(245, 158, 11, 0.05)`:`transparent`,borderLeft:n?`3px solid var(--warning)`:`none`},children:[_jsx(`td`,{style:{fontWeight:`600`},children:_jsxs(`div`,{style:{display:`flex`,flexDirection:`column`},children:[_jsx(`span`,{children:e.date}),_jsxs(`span`,{style:{fontSize:`0.75rem`,color:`var(--text-secondary)`,display:`flex`,alignItems:`center`,gap:`4px`,marginTop:`2px`},children:[_jsx(M,{size:10}),` `,e.time]})]})}),_jsx(`td`,{children:_jsxs(`div`,{style:{display:`flex`,flexDirection:`column`},children:[_jsx(`span`,{style:{fontWeight:`600`,color:`var(--primary)`,fontSize:`0.88rem`},children:e.caseTitle}),n&&_jsx(`span`,{style:{fontSize:`0.7rem`,color:`var(--warning)`,fontWeight:`700`,textTransform:`uppercase`,marginTop:`2px`},children:`TODAY`})]})}),_jsx(`td`,{children:_jsxs(`div`,{style:{display:`flex`,alignItems:`center`,gap:`6px`},children:[_jsx(xe,{size:12,style:{color:`var(--text-tertiary)`}}),_jsx(`span`,{style:{fontSize:`0.85rem`},children:e.court})]})}),_jsx(`td`,{children:_jsx(`span`,{className:`badge-tag`,children:e.purpose})}),_jsx(`td`,{style:{fontSize:`0.8rem`,color:`var(--text-secondary)`},children:e.judge}),_jsx(`td`,{children:_jsx(`span`,{className:`cell-badge ${e.caseStatus===`Active`?`badge-success`:e.caseStatus===`Pending`?`badge-warning`:`badge-info`}`,children:e.caseStatus})})]},t)}),f.length===0&&_jsx(`tr`,{children:_jsx(`td`,{colSpan:`6`,style:{textAlign:`center`,padding:`40px`,color:`var(--text-tertiary)`},children:`No hearings scheduled.`})})]})]})}),_jsx(`button`,{className:`hearings-fab`,disabled:!t.write,style:{cursor:t.write?`pointer`:`not-allowed`,opacity:t.write?1:.5},title:t.write?`Quick Schedule Actions`:`Action Denied - Write Permission Required`,children:_jsx(Me,{size:22})})]})}var ot=[`Filing Registry Order`,`Notice Order`,`Interim Order`,`Stay Order`,`Directions Order`,`Final Judgment`,`Dismissal Order`,`Contempt Order`,`Evidence Recording Order`,`Miscellaneous Order`];