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

export default function Settings({rbacMatrix:e,onUpdateRbacMatrix:t,perms:n={},users:r=[],onUpdateUserRole:i,onAddUser:a}){let[o,s]=useState(`users`),c=(n,r)=>{n===`admin`&&[`read`,`viewSettings`].includes(r)||t({...e,[n]:{...e[n],permissions:{...e[n].permissions,[r]:!e[n].permissions[r]}}})};return _jsxs(`div`,{className:`page-container`,children:[_jsx(`div`,{className:`page-header`,children:_jsxs(`div`,{className:`page-title-area`,children:[_jsx(`h1`,{className:`page-title`,children:`Settings & System Config`}),_jsx(`p`,{className:`page-subtitle`,children:`Configure organization workspaces, RBAC security matrices, and API credentials.`})]})}),_jsxs(`div`,{style:{display:`grid`,gridTemplateColumns:`200px 1fr`,gap:`32px`,alignItems:`flex-start`},children:[_jsxs(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`6px`},children:[_jsxs(`button`,{onClick:()=>s(`users`),className:`menu-item`,style:{background:o===`users`?`var(--bg-tertiary)`:`none`,color:o===`users`?`var(--text-primary)`:`var(--text-secondary)`,textAlign:`left`},children:[_jsx(ze,{size:16}),_jsx(`span`,{children:`User Accounts`})]}),_jsxs(`button`,{onClick:()=>s(`rbac`),className:`menu-item`,style:{background:o===`rbac`?`var(--bg-tertiary)`:`none`,color:o===`rbac`?`var(--text-primary)`:`var(--text-secondary)`,textAlign:`left`},children:[_jsx(je,{size:16}),_jsx(`span`,{children:`Roles & RBAC`})]})]}),_jsxs(`div`,{className:`saas-card`,style:{padding:`24px`},children:[o===`users`&&_jsxs(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`20px`},children:[_jsxs(`div`,{children:[_jsx(`h3`,{className:`section-title`,children:`User Accounts & Directory`}),_jsx(`p`,{style:{fontSize:`0.8rem`,color:`var(--text-secondary)`},children:`Add team member profiles and change role scopes (Admin, Senior Advocate, Jr Advocate) to configure RBAC access controls.`})]}),n.manageUsers&&_jsxs(`div`,{style:{padding:`16px`,backgroundColor:`var(--bg-tertiary)`,borderRadius:`var(--radius-md)`},children:[_jsx(`h4`,{style:{fontSize:`0.825rem`,fontWeight:`700`,marginBottom:`12px`},children:`Register New Team User`}),_jsxs(`form`,{onSubmit:e=>{e.preventDefault();let t=e.target.elements.userName.value.trim(),n=e.target.elements.userEmail.value.trim(),r=e.target.elements.userRole.value;!t||!n||(a({id:`user_`+Date.now(),name:t,email:n,role:r,avatar:t.split(` `).map(e=>e[0]).join(``).toUpperCase().substring(0,2),color:r===`admin`?`#4f46e5`:r===`senior`?`#0ea5e9`:`#10b981`}),e.target.reset())},style:{display:`flex`,gap:`12px`,flexWrap:`wrap`,alignItems:`flex-end`},children:[_jsxs(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`4px`,flex:1,minWidth:`150px`},children:[_jsx(`label`,{style:{fontSize:`0.75rem`,fontWeight:`600`},children:`Full Name`}),_jsx(`input`,{name:`userName`,type:`text`,placeholder:`e.g. John Doe`,required:!0,style:{padding:`8px`,border:`1px solid var(--border-color)`,borderRadius:`4px`,backgroundColor:`var(--bg-primary)`}})]}),_jsxs(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`4px`,flex:1,minWidth:`180px`},children:[_jsx(`label`,{style:{fontSize:`0.75rem`,fontWeight:`600`},children:`Email Address`}),_jsx(`input`,{name:`userEmail`,type:`email`,placeholder:`e.g. john@company.com`,required:!0,style:{padding:`8px`,border:`1px solid var(--border-color)`,borderRadius:`4px`,backgroundColor:`var(--bg-primary)`}})]}),_jsxs(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`4px`,width:`150px`},children:[_jsx(`label`,{style:{fontSize:`0.75rem`,fontWeight:`600`},children:`Assign Role Scope`}),_jsxs(`select`,{name:`userRole`,style:{padding:`8px`,border:`1px solid var(--border-color)`,borderRadius:`4px`,backgroundColor:`var(--bg-primary)`},children:[_jsx(`option`,{value:`junior`,children:`Jr Advocate`}),_jsx(`option`,{value:`senior`,children:`Senior Advocate`}),_jsx(`option`,{value:`admin`,children:`Admin`})]})]}),_jsx(`button`,{type:`submit`,className:`btn-primary-action`,style:{height:`36px`,padding:`0 16px`},children:`Add User`})]})]}),_jsx(`div`,{className:`table-wrapper`,style:{border:`1px solid var(--border-color)`,borderRadius:`var(--radius-md)`,overflow:`hidden`},children:_jsxs(`table`,{className:`saas-table`,children:[_jsx(`thead`,{children:_jsxs(`tr`,{children:[_jsx(`th`,{children:`Team Member`}),_jsx(`th`,{children:`Email`}),_jsx(`th`,{children:`Role Scope`}),_jsx(`th`,{style:{textAlign:`right`},children:`Status`})]})}),_jsx(`tbody`,{children:r.map(e=>_jsxs(`tr`,{children:[_jsx(`td`,{children:_jsxs(`div`,{style:{display:`flex`,alignItems:`center`,gap:`10px`},children:[_jsx(`div`,{style:{width:`30px`,height:`30px`,borderRadius:`50%`,backgroundColor:e.color||`var(--primary)`,color:`#fff`,display:`flex`,alignItems:`center`,justifyContent:`center`,fontSize:`0.8rem`,fontWeight:`bold`},children:e.avatar}),_jsx(`span`,{style:{fontWeight:`600`},children:e.name})]})}),_jsx(`td`,{children:e.email}),_jsx(`td`,{children:_jsxs(`select`,{value:e.role,onChange:t=>i(e.id,t.target.value),disabled:!n.manageUsers||e.id===`user_1`,style:{padding:`4px 8px`,borderRadius:`4px`,border:`1px solid var(--border-color)`,fontSize:`0.8rem`,cursor:n.manageUsers&&e.id!==`user_1`?`pointer`:`not-allowed`,backgroundColor:`var(--bg-secondary)`},children:[_jsx(`option`,{value:`admin`,children:`Admin`}),_jsx(`option`,{value:`senior`,children:`Senior Advocate`}),_jsx(`option`,{value:`junior`,children:`Jr Advocate`})]})}),_jsx(`td`,{style:{textAlign:`right`},children:_jsxs(`span`,{style:{display:`inline-flex`,alignItems:`center`,gap:`6px`,fontSize:`0.75rem`,color:`var(--success)`,fontWeight:`600`},children:[_jsx(`span`,{style:{width:`6px`,height:`6px`,borderRadius:`50%`,backgroundColor:`var(--success)`}}),`Active`]})})]},e.id))})]})})]}),o===`rbac`&&_jsxs(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`20px`},children:[_jsxs(`div`,{children:[_jsx(`h3`,{className:`section-title`,children:`Role-Based Access Controls (RBAC)`}),_jsx(`p`,{style:{fontSize:`0.8rem`,color:`var(--text-secondary)`},children:`Grant or revoke fine-grained workspace permissions for tenant user roles.`})]}),(()=>{let t=Object.keys(e);return _jsx(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`24px`},children:[{label:`Core Access`,perms:[{key:`read`,label:`Read Cases & Documents`},{key:`write`,label:`Write / Create Records`},{key:`delete`,label:`Delete Records & Files`},{key:`export`,label:`Export Data`}]},{label:`Case Management`,perms:[{key:`addCase`,label:`Add New Cases`},{key:`editCase`,label:`Edit Case Details`},{key:`deleteCase`,label:`Delete Cases`},{key:`sync`,label:`eCourts API Sync`}]},{label:`Client Management`,perms:[{key:`addClient`,label:`Add Clients`},{key:`editClient`,label:`Edit Client Profiles`},{key:`deleteClient`,label:`Delete Clients`}]},{label:`Task & Document Management`,perms:[{key:`addTask`,label:`Add Tasks`},{key:`editTask`,label:`Edit Tasks`},{key:`deleteTask`,label:`Delete Tasks`},{key:`addRecord`,label:`Add Records`},{key:`editRecord`,label:`Edit Records`},{key:`deleteRecord`,label:`Delete Records`}]},{label:`System & Admin`,perms:[{key:`viewAnalytics`,label:`View Analytics`},{key:`viewSettings`,label:`Access Settings (Admin only)`},{key:`manageUsers`,label:`Manage Users & Roles (Admin only)`},{key:`config`,label:`System Configuration`}]}].map(n=>_jsxs(`div`,{children:[_jsx(`div`,{style:{fontSize:`0.72rem`,fontWeight:`700`,letterSpacing:`0.8px`,color:`var(--primary)`,textTransform:`uppercase`,marginBottom:`10px`,borderBottom:`1px solid var(--border-color)`,paddingBottom:`6px`},children:n.label}),_jsxs(`table`,{className:`rbac-matrix`,children:[_jsx(`thead`,{children:_jsxs(`tr`,{children:[_jsx(`th`,{style:{width:`40%`},children:`Permission`}),t.map(t=>_jsx(`th`,{style:{textAlign:`center`},children:_jsxs(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:`4px`},children:[_jsx(`div`,{style:{width:28,height:28,borderRadius:`50%`,background:e[t].color,color:`#fff`,display:`flex`,alignItems:`center`,justifyContent:`center`,fontSize:`0.7rem`,fontWeight:`800`},children:e[t].avatar}),_jsx(`span`,{style:{fontSize:`0.7rem`,color:e[t].color,fontWeight:`700`},children:t.toUpperCase()})]})},t))]})}),_jsx(`tbody`,{children:n.perms.map(n=>_jsxs(`tr`,{children:[_jsx(`td`,{style:{fontSize:`0.84rem`},children:n.label}),t.map(t=>{let r=e[t]?.permissions?.[n.key]||!1,i=t===`admin`&&[`read`,`viewSettings`].includes(n.key);return _jsx(`td`,{style:{textAlign:`center`},children:_jsx(`div`,{className:`checkbox-custom-container`,children:_jsx(`div`,{className:`checkbox-custom ${r?`checked`:``}`,style:i?{opacity:.5,cursor:`not-allowed`}:{},onClick:()=>!i&&c(t,n.key),title:i?`Admin always has this permission`:r?`Click to revoke`:`Click to grant`,children:r&&_jsx(j,{size:12})})})},t)})]},n.key))})]})]},n.label))})})()]})]})]}),_jsx(`style`,{children:`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `})]})}var R=[`Filing`,`Hearing`,`Arguments`,`Evidence`,`Cross Examination`,`Final Arguments`,`Notice`,`Admission`,`Judgment`,`Miscellaneous`],dt=[`Scheduled`,`Completed`,`Part Heard`,`Adjourned`,`Filed & Accepted`,`Filed & Numbered`,`Filed & Admitted`,`Notice Issued, Stay Granted`,`Interim Stay Granted`,`Judgment Reserved`,`Dismissed`,`Allowed`];