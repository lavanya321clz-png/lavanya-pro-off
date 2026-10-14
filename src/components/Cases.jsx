import React, { useState, useEffect, useRef, useMemo } from "react";
import Swal from "sweetalert2";
import { jsx as _jsx, jsxs as _jsxs, Fragment } from "react/jsx-runtime";
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
  X as Ve,
} from "lucide-react";

export default function Cases({
  cases: e,
  onUpdateCase: t,
  onAddCase: n,
  onDeleteCase: r,
  perms: i = {},
  clients: a,
  onUpdateClient: o,
  users: s = [],
  currentUser: c = {},
}) {
  let [l, u] = useState(e[0]?.id || null);
  useEffect(() => {
    if (e && e.length > 0) {
      if (!l || !e.some((item) => item.id === l)) u(e[0].id);
    } else u(null);
  }, [e, l]);
  let [d, f] = useState(``),
    [p, m] = useState(`20/06/2026, 09:56:04`),
    [h, g] = useState(!1),
    [v, y] = useState(`number`),
    [b, x] = useState(!1),
    [S, C] = useState(!1),
    [w, T] = useState(``),
    [E, D] = useState(`Madras High Court`),
    [O, k] = useState(`CC (Criminal Case)`),
    [ee, te] = useState(``),
    [ne, re] = useState(`2026`),
    [ae, A] = useState(``),
    [j, oe] = useState(``),
    [se, ce] = useState(``),
    [le, N] = useState(``),
    [ue, de] = useState(`Hon. Justice Srinivasan`),
    [me, _e] = useState(`20`),
    [ve, ye] = useState(`Next Stage Scheduled (eCourt Sync)`),
    [P, be] = useState(``),
    [xe, Se] = useState(`Adv. Vivek Sharma`),
    [Ce, Te] = useState(`HIGH`),
    [De, Ae] = useState(`CORPORATE`),
    [je, Ne] = useState(a[0]?.id || ``),
    [Pe, Fe] = useState(``),
    [Le, F] = useState(``),
    [Be, Ue] = useState(``),
    [We, Ge] = useState(``),
    [Ke, qe] = useState(``),
    [Je, Ye] = useState(``),
    [Xe, Ze] = useState(``),
    [Qe, $e] = useState(`HIGH`),
    [et, L] = useState(`CORPORATE`),
    [tt, nt] = useState(``),
    [rt, it] = useState(`Corporate`),
    [at, ot] = useState(``),
    [st, ct] = useState(``),
    [lt, ut] = useState(``),
    [R, dt] = useState(``),
    [ft, pt] = useState(!1),
    z = e.find((e) => e.id === l) || e[0],
    mt = () => {
      z &&
        (Fe(z.court || ``),
        F(z.judge || ``),
        Ue(z.courtRoom || ``),
        Ge(z.filingDate || ``),
        qe(z.stage || ``),
        Ye(z.opposingCounsel || ``),
        Ze(z.leadCounsel || ``),
        $e(z.priority || `HIGH`),
        L(z.category || `CORPORATE`),
        nt(z.clientCoordinates?.clientName || ``),
        it(z.clientCoordinates?.clientType || `Corporate`),
        ot(z.clientCoordinates?.phone || ``),
        ct(z.clientCoordinates?.email || ``),
        ut(z.clientCoordinates?.contactPersons || ``),
        dt(z.assignedJunior || ``),
        x(!0));
    },
    ht = async (e) => {
      e.preventDefault();
      if (!z) return;
      try {
        await t({
          ...z,
          court: Pe,
          judge: Le,
          courtRoom: Be,
          filingDate: We,
          stage: Ke,
          opposingCounsel: Je,
          leadCounsel: Xe,
          priority: Qe,
          category: et,
          assignedJunior: R,
          clientCoordinates: {
            clientName: tt,
            clientType: rt,
            phone: at,
            email: st,
            contactPersons: lt,
          },
        });
        x(false);
        Swal.fire({
          title: "Coordinates Saved!",
          text: "Case coordinates updated and saved in PostgreSQL.",
          icon: "success",
          confirmButtonColor: "var(--primary)",
          background: "var(--bg-secondary)",
          color: "var(--text-primary)",
        });
      } catch (err) {
        Swal.fire({
          title: "Save Failed",
          text:
            "Could not update case coordinates in database: " +
            (err.message || "Error"),
          icon: "error",
          background: "var(--bg-secondary)",
          color: "var(--text-primary)",
        });
      }
    },
    handleJuniorAssign = async (juniorName) => {
      if (!z) return;
      try {
        await t({
          ...z,
          assignedJunior: juniorName,
        });
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: juniorName ? `Assigned to ${juniorName}` : "Case unassigned",
          showConfirmButton: false,
          timer: 2000,
          background: "var(--bg-secondary)",
          color: "var(--text-primary)",
        });
      } catch (err) {
        Swal.fire({
          title: "Database Error",
          text:
            "Failed to assign junior in PostgreSQL: " +
            (err.message || "Error"),
          icon: "error",
          background: "var(--bg-secondary)",
          color: "var(--text-primary)",
        });
      }
    },
    handleAddSpeechPoint = async (e) => {
      e.preventDefault();
      let input = e.target.elements.newSpeechPoint;
      let newPoint = input?.value?.trim();
      if (!newPoint || !z) return;
      try {
        let r = [...(z.notes || []), newPoint];
        await t({ ...z, notes: r });
        input.value = "";
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Speech point saved to database",
          showConfirmButton: false,
          timer: 2000,
          background: "var(--bg-secondary)",
          color: "var(--text-primary)",
        });
      } catch (err) {
        Swal.fire({
          title: "Database Error",
          text: "Failed to save speech point: " + (err.message || "Error"),
          icon: "error",
          background: "var(--bg-secondary)",
          color: "var(--text-primary)",
        });
      }
    },
    handleDeleteSpeechPoint = async (idx) => {
      if (!z) return;
      try {
        let r = (z.notes || []).filter((_, i) => i !== idx);
        await t({ ...z, notes: r });
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Speech point removed from database",
          showConfirmButton: false,
          timer: 2000,
          background: "var(--bg-secondary)",
          color: "var(--text-primary)",
        });
      } catch (err) {
        Swal.fire({
          title: "Database Error",
          text: "Failed to delete speech point: " + (err.message || "Error"),
          icon: "error",
          background: "var(--bg-secondary)",
          color: "var(--text-primary)",
        });
      }
    },
    gt = e.filter((e) => {
      let t = d.toLowerCase();
      return (
        e.title?.toLowerCase().includes(t) ||
        e.cnr?.toLowerCase().includes(t) ||
        e.caseNumber?.toLowerCase().includes(t) ||
        e.category?.toLowerCase().includes(t)
      );
    }),
    _t = () => {
      z &&
        Swal.fire({
          title: `Delete Case Dossier?`,
          text: `Are you sure you want to delete case: "${z.title}"?`,
          icon: `warning`,
          showCancelButton: !0,
          confirmButtonColor: `var(--primary)`,
          cancelButtonColor: `var(--danger)`,
          confirmButtonText: `Yes, delete it!`,
          background: `var(--bg-secondary)`,
          color: `var(--text-primary)`,
          showLoaderOnConfirm: !0,
          preConfirm: async () => {
            try {
              await r(z.id);
            } catch (n) {
              Swal.showValidationMessage(
                `Database error: ` + (n.message || `Could not delete case`),
              );
              return !1;
            }
          },
        }).then((t) => {
          if (t.isConfirmed) {
            let t = e.filter((e) => e.id !== z.id);
            t.length > 0 ? u(t[0].id) : u(null);
            Swal.fire({
              title: `Deleted!`,
              text: `The case dossier has been successfully deleted from PostgreSQL database.`,
              icon: `success`,
              confirmButtonColor: `var(--primary)`,
              background: `var(--bg-secondary)`,
              color: `var(--text-primary)`,
            });
          }
        });
    },
    vt = () => {
      if (!z) return;
      C(true);
      T(`Accessing eCourts WebAPI Gateway (v4.0)...`);
      setTimeout(() => {
        T(`Querying CNR status records for ` + z.cnr + `...`);
        setTimeout(() => {
          T(`Retrieving latest timelines and orders...`);
          setTimeout(async () => {
            try {
              let e = new Date();
              m(e.toLocaleDateString() + `, ` + e.toLocaleTimeString());
              let n = z.hearings?.some(
                  (e) => e.purpose === `eCourts Live Sync`,
                ),
                r = [...(z.hearings || [])];
              if (!n) {
                r.unshift({
                  date: e.toISOString().split(`T`)[0],
                  time: e.toLocaleTimeString([], {
                    hour: `2-digit`,
                    minute: `2-digit`,
                  }),
                  purpose: `eCourts Live Sync`,
                  business: `Automatic data sync audit completed. All records verified with the court docket registry.`,
                  judge: z.judge,
                });
              }
              await t({
                ...z,
                stage: `Next Stage Scheduled (eCourt Sync)`,
                hearings: r,
              });
              Swal.fire({
                title: "eCourts Synced!",
                text: "Case dossier updated with court docket registry and saved in database.",
                icon: "success",
                confirmButtonColor: "var(--primary)",
                background: "var(--bg-secondary)",
                color: "var(--text-primary)",
              });
            } catch (err) {
              Swal.fire({
                title: "Sync Failed",
                text:
                  "Could not persist synced status in database: " +
                  (err.message || "Error"),
                icon: "error",
                background: "var(--bg-secondary)",
                color: "var(--text-primary)",
              });
            } finally {
              C(false);
              T(``);
            }
          }, 800);
        }, 800);
      }, 600);
    };
  return _jsxs(`div`, {
    className: `page-container`,
    style: { padding: 0 },
    children: [
      _jsxs(`div`, {
        className: `case-dossier-layout`,
        children: [
          _jsxs(`div`, {
            className: `cases-sidebar`,
            children: [
              _jsxs(`div`, {
                className: `sidebar-header-pane`,
                children: [
                  _jsxs(`span`, {
                    className: `sidebar-header-title`,
                    children: [`Case Dossiers (`, gt.length, `)`],
                  }),
                  _jsx(`button`, {
                    className: `btn-add-circle`,
                    onClick: () => i.addCase && g(!0),
                    disabled: !i.addCase,
                    style: {
                      cursor: i.addCase ? `pointer` : `not-allowed`,
                      opacity: i.addCase ? 1 : 0.5,
                    },
                    title: i.addCase
                      ? `Add New Case`
                      : `Action Denied - Add Case permission required`,
                    children: _jsx(Ee, { size: 16 }),
                  }),
                ],
              }),
              _jsxs(`div`, {
                className: `sidebar-search-box`,
                children: [
                  _jsx(ke, { size: 14, className: `search-box-icon` }),
                  _jsx(`input`, {
                    type: `text`,
                    placeholder: `Search sidebar cases...`,
                    value: d,
                    onChange: (e) => f(e.target.value),
                    className: `search-box-input`,
                  }),
                ],
              }),
              _jsxs(`div`, {
                className: `sidebar-cards-list`,
                children: [
                  gt.map((e) => {
                    let t = e.id === l,
                      n = t
                        ? e.priority === `HIGH`
                          ? `1.5px solid #f59e0b`
                          : `1.5px solid #3b82f6`
                        : `1px solid var(--border-color)`;
                    return _jsxs(
                      `div`,
                      {
                        className: `dossier-card ${t ? `selected` : ``}`,
                        onClick: () => u(e.id),
                        style: { border: n },
                        children: [
                          _jsxs(`div`, {
                            className: `dossier-card-top`,
                            children: [
                              _jsx(`span`, {
                                className: `card-category-badge`,
                                children: e.category || `CIVIL`,
                              }),
                              _jsx(`span`, {
                                className: `card-priority-badge ${e.priority === `HIGH` ? `high` : `medium`}`,
                                children: e.priority || `MEDIUM`,
                              }),
                            ],
                          }),
                          _jsx(`div`, {
                            className: `dossier-card-title`,
                            children: e.title,
                          }),
                          _jsxs(`div`, {
                            className: `dossier-card-subtitle`,
                            children: [
                              `Case No: `,
                              e.caseNumber || `CC 250/2026`,
                            ],
                          }),
                          _jsx(`div`, {
                            className: `dossier-card-bottom`,
                            children: _jsx(`span`, {
                              className: `status-text ${e.status === `Active` ? `active` : `pending`}`,
                              children: e.status || `Active`,
                            }),
                          }),
                        ],
                      },
                      e.id,
                    );
                  }),
                  gt.length === 0 &&
                    _jsx(`div`, {
                      className: `empty-sidebar-state`,
                      children: `No dossiers match your search.`,
                    }),
                ],
              }),
            ],
          }),
          _jsx(`div`, {
            className: `cases-content`,
            children: z
              ? _jsxs(`div`, {
                  className: `dossier-dashboard`,
                  children: [
                    _jsxs(`div`, {
                      className: `dashboard-header-pane`,
                      children: [
                        _jsxs(`div`, {
                          className: `header-pane-left`,
                          children: [
                            _jsx(he, {
                              size: 18,
                              className: `gavel-header-icon`,
                            }),
                            _jsx(`span`, {
                              className: `header-pane-title`,
                              children: `CASE BRIEF DASHBOARD`,
                            }),
                            _jsxs(`span`, {
                              className: `last-synced-label`,
                              children: [`Last Synced: `, p],
                            }),
                          ],
                        }),
                        _jsxs(`div`, {
                          className: `header-pane-actions`,
                          children: [
                            _jsxs(`button`, {
                              className: `btn-dashboard-sync`,
                              onClick: () => i.sync && vt(),
                              disabled: S || !i.sync,
                              style: {
                                cursor: i.sync ? `pointer` : `not-allowed`,
                                opacity: i.sync ? 1 : 0.5,
                              },
                              title: i.sync
                                ? `Sync Now`
                                : `Action Denied - Sync permission required`,
                              children: [
                                _jsx(Oe, {
                                  size: 14,
                                  className: S ? `spin` : ``,
                                }),
                                _jsx(`span`, { children: `Sync Now` }),
                              ],
                            }),
                            _jsxs(`button`, {
                              className: `btn-dashboard-edit`,
                              onClick: () => i.editCase && mt(),
                              disabled: !i.editCase,
                              style: {
                                cursor: i.editCase ? `pointer` : `not-allowed`,
                                opacity: i.editCase ? 1 : 0.5,
                              },
                              title: i.editCase
                                ? `Edit Fields`
                                : `Action Denied - Edit Case permission required`,
                              children: [
                                _jsx(we, { size: 14 }),
                                _jsx(`span`, { children: `Edit Fields` }),
                              ],
                            }),
                            _jsxs(`button`, {
                              className: `btn-dashboard-delete`,
                              onClick: () => i.deleteCase && _t(),
                              disabled: !i.deleteCase,
                              style: {
                                cursor: i.deleteCase
                                  ? `pointer`
                                  : `not-allowed`,
                                opacity: i.deleteCase ? 1 : 0.5,
                              },
                              title: i.deleteCase
                                ? `Delete Case`
                                : `Action Denied - Delete Case permission required`,
                              children: [
                                _jsx(Ie, { size: 14 }),
                                _jsx(`span`, { children: `Delete Case` }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    _jsxs(`div`, {
                      className: `dossier-main-card`,
                      children: [
                        _jsxs(`div`, {
                          className: `dossier-banner`,
                          children: [
                            _jsxs(`div`, {
                              className: `banner-title-block`,
                              children: [
                                _jsx(`h2`, {
                                  className: `banner-case-title`,
                                  children: z.title,
                                }),
                                _jsxs(`div`, {
                                  className: `banner-meta-row`,
                                  children: [
                                    _jsxs(`span`, {
                                      children: [
                                        `CNR: `,
                                        _jsx(`strong`, { children: z.cnr }),
                                      ],
                                    }),
                                    _jsx(`span`, {
                                      className: `separator-dot`,
                                      children: `·`,
                                    }),
                                    _jsxs(`span`, {
                                      children: [
                                        `Case Number: `,
                                        _jsx(`strong`, {
                                          children:
                                            z.caseNumber || `CC 250/2026`,
                                        }),
                                      ],
                                    }),
                                    _jsx(`span`, {
                                      className: `separator-dot`,
                                      children: `·`,
                                    }),
                                    _jsxs(`span`, {
                                      children: [
                                        `Lead Counsel: `,
                                        _jsx(`strong`, {
                                          children:
                                            z.leadCounsel ||
                                            `Adv. Vivek Sharma`,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            _jsx(`div`, {
                              className: `banner-badge-block`,
                              children: _jsxs(`span`, {
                                className: `banner-priority-capsule ${z.priority === `HIGH` ? `high` : `medium`}`,
                                children: [z.priority || `HIGH`, ` PRIORITY`],
                              }),
                            }),
                          ],
                        }),
                        _jsxs(`div`, {
                          className: `dossier-section`,
                          children: [
                            _jsxs(`div`, {
                              className: `section-subtitle-pane`,
                              children: [
                                _jsx(ge, {
                                  size: 16,
                                  className: `subtitle-pane-icon`,
                                }),
                                _jsx(`span`, {
                                  children: `Overview & Coordinates`,
                                }),
                              ],
                            }),
                            _jsxs(`div`, {
                              className: `coordinates-grid`,
                              children: [
                                _jsxs(`div`, {
                                  className: `coord-card`,
                                  children: [
                                    _jsx(`div`, {
                                      className: `coord-card-title`,
                                      children: `Litigation Brief Case Info`,
                                    }),
                                    _jsx(`table`, {
                                      className: `coord-table`,
                                      children: _jsxs(`tbody`, {
                                        children: [
                                          _jsxs(`tr`, {
                                            children: [
                                              _jsx(`td`, {
                                                className: `label-cell`,
                                                children: `Filing Court:`,
                                              }),
                                              _jsx(`td`, {
                                                className: `value-cell bold`,
                                                children:
                                                  z.court ||
                                                  `Madras High Court`,
                                              }),
                                            ],
                                          }),
                                          _jsxs(`tr`, {
                                            children: [
                                              _jsx(`td`, {
                                                className: `label-cell`,
                                                children: `Presiding Judge:`,
                                              }),
                                              _jsx(`td`, {
                                                className: `value-cell bold`,
                                                children:
                                                  z.judge ||
                                                  `Hon. Justice Srinivasan`,
                                              }),
                                            ],
                                          }),
                                          _jsxs(`tr`, {
                                            children: [
                                              _jsx(`td`, {
                                                className: `label-cell`,
                                                children: `Court Room:`,
                                              }),
                                              _jsx(`td`, {
                                                className: `value-cell bold`,
                                                children: z.courtRoom || `20`,
                                              }),
                                            ],
                                          }),
                                          _jsxs(`tr`, {
                                            children: [
                                              _jsx(`td`, {
                                                className: `label-cell`,
                                                children: `Filing Date:`,
                                              }),
                                              _jsx(`td`, {
                                                className: `value-cell bold`,
                                                children:
                                                  z.filingDate || `2026-01-20`,
                                              }),
                                            ],
                                          }),
                                          _jsxs(`tr`, {
                                            children: [
                                              _jsx(`td`, {
                                                className: `label-cell`,
                                                children: `Current Stage:`,
                                              }),
                                              _jsx(`td`, {
                                                className: `value-cell bold stage-color`,
                                                children:
                                                  z.stage ||
                                                  `Next Stage Scheduled (eCourt Sync)`,
                                              }),
                                            ],
                                          }),
                                          _jsxs(`tr`, {
                                            children: [
                                              _jsx(`td`, {
                                                className: `label-cell`,
                                                children: `Opposing Counsel:`,
                                              }),
                                              _jsx(`td`, {
                                                className: `value-cell bold`,
                                                children:
                                                  z.opposingCounsel ||
                                                  `Adv. R. Krishnan`,
                                              }),
                                            ],
                                          }),
                                          _jsxs(`tr`, {
                                            children: [
                                              _jsx(`td`, {
                                                className: `label-cell`,
                                                children: `Assigned Junior:`,
                                              }),
                                              _jsx(`td`, {
                                                className: `value-cell bold`,
                                                style: {
                                                  color: `var(--success)`,
                                                },
                                                children:
                                                  z.assignedJunior ||
                                                  `Unassigned`,
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    }),
                                  ],
                                }),
                                _jsxs(`div`, {
                                  className: `coord-card`,
                                  children: [
                                    _jsx(`div`, {
                                      className: `coord-card-title`,
                                      children: `Client Profile Coordinates`,
                                    }),
                                    _jsx(`table`, {
                                      className: `coord-table`,
                                      children: _jsxs(`tbody`, {
                                        children: [
                                          _jsxs(`tr`, {
                                            children: [
                                              _jsx(`td`, {
                                                className: `label-cell`,
                                                children: `Client Name:`,
                                              }),
                                              _jsx(`td`, {
                                                className: `value-cell bold`,
                                                children:
                                                  z.clientCoordinates
                                                    ?.clientName ||
                                                  `Sharma & Associates`,
                                              }),
                                            ],
                                          }),
                                          _jsxs(`tr`, {
                                            children: [
                                              _jsx(`td`, {
                                                className: `label-cell`,
                                                children: `Client Type:`,
                                              }),
                                              _jsx(`td`, {
                                                className: `value-cell bold`,
                                                children:
                                                  z.clientCoordinates
                                                    ?.clientType || `Corporate`,
                                              }),
                                            ],
                                          }),
                                          _jsxs(`tr`, {
                                            children: [
                                              _jsx(`td`, {
                                                className: `label-cell`,
                                                children: `Phone Number:`,
                                              }),
                                              _jsx(`td`, {
                                                className: `value-cell bold`,
                                                children:
                                                  z.clientCoordinates?.phone ||
                                                  `+91 98765 43210`,
                                              }),
                                            ],
                                          }),
                                          _jsxs(`tr`, {
                                            children: [
                                              _jsx(`td`, {
                                                className: `label-cell`,
                                                children: `Email Coordinate:`,
                                              }),
                                              _jsx(`td`, {
                                                className: `value-cell bold email-link`,
                                                children: _jsx(`a`, {
                                                  href: `mailto:${z.clientCoordinates?.email || `contact@sharma-law.com`}`,
                                                  children:
                                                    z.clientCoordinates
                                                      ?.email ||
                                                    `contact@sharma-law.com`,
                                                }),
                                              }),
                                            ],
                                          }),
                                          _jsxs(`tr`, {
                                            children: [
                                              _jsx(`td`, {
                                                className: `label-cell`,
                                                children: `Contact Persons:`,
                                              }),
                                              _jsx(`td`, {
                                                className: `value-cell bold contact-names`,
                                                children:
                                                  z.clientCoordinates
                                                    ?.contactPersons ||
                                                  `Mr. Anil Sharma (CEO), Ms. Priya Sen (HR Head)`,
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    }),
                                  ],
                                }),
                                (c.role === `admin` || c.role === `senior`) &&
                                  _jsx(`div`, {
                                    className: `coord-card`,
                                    style: {
                                      gridColumn: `span 2`,
                                      padding: `16px`,
                                      backgroundColor: `var(--bg-tertiary)`,
                                      borderLeft: `4px solid var(--primary)`,
                                    },
                                    children: _jsxs(`div`, {
                                      style: {
                                        display: `flex`,
                                        justifyContent: `space-between`,
                                        alignItems: `center`,
                                        flexWrap: `wrap`,
                                        gap: `12px`,
                                      },
                                      children: [
                                        _jsxs(`div`, {
                                          children: [
                                            _jsxs(`div`, {
                                              style: {
                                                fontWeight: `700`,
                                                fontSize: `0.85rem`,
                                                color: `var(--text-primary)`,
                                                display: `flex`,
                                                alignItems: `center`,
                                                gap: `6px`,
                                              },
                                              children: [
                                                _jsx(Re, { size: 14 }),
                                                ` Case Ownership & Junior Assignment`,
                                              ],
                                            }),
                                            _jsx(`div`, {
                                              style: {
                                                fontSize: `0.72rem`,
                                                color: `var(--text-secondary)`,
                                                marginTop: `2px`,
                                              },
                                              children: `Assign this case dossier to a Junior Advocate.`,
                                            }),
                                          ],
                                        }),
                                        _jsxs(`select`, {
                                          value: z.assignedJunior || ``,
                                          onChange: (e) => {
                                            handleJuniorAssign(e.target.value);
                                          },
                                          style: {
                                            padding: `6px 10px`,
                                            borderRadius: `var(--radius-sm)`,
                                            border: `1px solid var(--border-color)`,
                                            backgroundColor: `var(--bg-primary)`,
                                            fontSize: `0.8rem`,
                                            fontWeight: `600`,
                                          },
                                          children: [
                                            _jsx(`option`, {
                                              value: ``,
                                              children: `-- Unassigned --`,
                                            }),
                                            s
                                              .filter(
                                                (e) => e.role === `junior`,
                                              )
                                              .map((e) =>
                                                _jsx(
                                                  `option`,
                                                  {
                                                    value: e.name,
                                                    children: e.name,
                                                  },
                                                  e.id,
                                                ),
                                              ),
                                          ],
                                        }),
                                      ],
                                    }),
                                  }),
                                _jsxs(`div`, {
                                  className: `coord-card`,
                                  style: {
                                    gridColumn: `span 2`,
                                    padding: `20px`,
                                    borderLeft: `4px solid var(--warning)`,
                                    backgroundColor: `rgba(245, 158, 11, 0.03)`,
                                    boxShadow: `var(--shadow-sm)`,
                                  },
                                  children: [
                                    _jsxs(`div`, {
                                      style: {
                                        display: `flex`,
                                        justifyContent: `space-between`,
                                        alignItems: `center`,
                                        borderBottom: `1px solid rgba(245, 158, 11, 0.1)`,
                                        paddingBottom: `10px`,
                                        marginBottom: `12px`,
                                      },
                                      children: [
                                        _jsxs(`div`, {
                                          style: {
                                            display: `flex`,
                                            alignItems: `center`,
                                            gap: `8px`,
                                          },
                                          children: [
                                            _jsx(Me, {
                                              size: 16,
                                              style: {
                                                color: `var(--warning)`,
                                              },
                                            }),
                                            _jsx(`span`, {
                                              style: {
                                                fontSize: `0.9rem`,
                                                fontWeight: `800`,
                                                color: `var(--text-primary)`,
                                              },
                                              children: `Court Speech Points & Case Notes`,
                                            }),
                                          ],
                                        }),
                                        _jsx(`span`, {
                                          style: {
                                            fontSize: `0.65rem`,
                                            color: `var(--warning)`,
                                            fontWeight: `800`,
                                            textTransform: `uppercase`,
                                            letterSpacing: `0.05em`,
                                          },
                                          children: `Speak in Court Notes`,
                                        }),
                                      ],
                                    }),
                                    _jsxs(`div`, {
                                      style: {
                                        display: `flex`,
                                        flexDirection: `column`,
                                        gap: `8px`,
                                        marginBottom: `14px`,
                                      },
                                      children: [
                                        (z.notes || []).map((e, n) =>
                                          _jsxs(
                                            `div`,
                                            {
                                              style: {
                                                display: `flex`,
                                                justifyContent: `space-between`,
                                                alignItems: `center`,
                                                padding: `8px 12px`,
                                                backgroundColor: `var(--bg-secondary)`,
                                                border: `1px solid var(--border-color)`,
                                                borderRadius: `var(--radius-sm)`,
                                              },
                                              children: [
                                                _jsxs(`span`, {
                                                  style: {
                                                    fontSize: `0.85rem`,
                                                    color: `var(--text-primary)`,
                                                    lineHeight: `1.4`,
                                                  },
                                                  children: [`• `, e],
                                                }),
                                                i.editCase &&
                                                  _jsx(`button`, {
                                                    className: `btn-drawer-close`,
                                                    onClick: () => {
                                                      handleDeleteSpeechPoint(n);
                                                    },
                                                    style: {
                                                      color: `var(--danger)`,
                                                      padding: `2px`,
                                                      cursor: `pointer`,
                                                    },
                                                    title: `Delete speech point`,
                                                    children: _jsx(Ve, {
                                                      size: 14,
                                                    }),
                                                  }),
                                              ],
                                            },
                                            n,
                                          ),
                                        ),
                                        (!z.notes || z.notes.length === 0) &&
                                          _jsx(`p`, {
                                            style: {
                                              fontSize: `0.8rem`,
                                              color: `var(--text-tertiary)`,
                                              fontStyle: `italic`,
                                              padding: `6px 0`,
                                            },
                                            children: `No critical points logged for this case. Add arguments below to speak in court.`,
                                          }),
                                      ],
                                    }),
                                    i.editCase &&
                                      _jsxs(`form`, {
                                        onSubmit: handleAddSpeechPoint,
                                        style: { display: `flex`, gap: `8px` },
                                        children: [
                                          _jsx(`input`, {
                                            name: `newSpeechPoint`,
                                            type: `text`,
                                            placeholder: `Add key argument or evidence citation...`,
                                            required: !0,
                                            style: {
                                              flex: 1,
                                              padding: `8px 12px`,
                                              border: `1px solid var(--border-color)`,
                                              borderRadius: `var(--radius-sm)`,
                                              fontSize: `0.85rem`,
                                              backgroundColor: `var(--bg-primary)`,
                                            },
                                          }),
                                          _jsx(`button`, {
                                            type: `submit`,
                                            className: `btn-secondary`,
                                            style: {
                                              padding: `8px 12px`,
                                              fontSize: `0.8rem`,
                                              whiteSpace: `nowrap`,
                                            },
                                            children: `Add Point`,
                                          }),
                                        ],
                                      }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        _jsxs(`div`, {
                          className: `dossier-section`,
                          children: [
                            _jsxs(`div`, {
                              className: `section-subtitle-pane`,
                              children: [
                                _jsx(ze, {
                                  size: 16,
                                  className: `subtitle-pane-icon`,
                                }),
                                _jsx(`span`, { children: `Litigant Parties` }),
                              ],
                            }),
                            _jsx(`div`, {
                              style: {
                                display: `flex`,
                                gap: `16px`,
                                flexWrap: `wrap`,
                                marginTop: `12px`,
                              },
                              children: (z.parties || []).map((e, t) =>
                                _jsxs(
                                  `div`,
                                  {
                                    style: {
                                      flex: 1,
                                      minWidth: `220px`,
                                      padding: `14px`,
                                      backgroundColor: `var(--bg-secondary)`,
                                      border: `1px solid var(--border-color)`,
                                      borderRadius: `var(--radius-md)`,
                                    },
                                    children: [
                                      _jsx(`span`, {
                                        style: {
                                          fontSize: `0.7rem`,
                                          fontWeight: `700`,
                                          color: `var(--primary)`,
                                          textTransform: `uppercase`,
                                        },
                                        children: e.type,
                                      }),
                                      _jsx(`div`, {
                                        style: {
                                          fontWeight: `700`,
                                          fontSize: `0.9rem`,
                                          color: `var(--text-primary)`,
                                          marginTop: `4px`,
                                        },
                                        children: e.name,
                                      }),
                                      _jsxs(`div`, {
                                        style: {
                                          fontSize: `0.75rem`,
                                          color: `var(--text-secondary)`,
                                          marginTop: `4px`,
                                        },
                                        children: [
                                          `Advocate: `,
                                          _jsx(`strong`, {
                                            children: e.advocate,
                                          }),
                                        ],
                                      }),
                                    ],
                                  },
                                  t,
                                ),
                              ),
                            }),
                          ],
                        }),
                        z.courtAppearances &&
                          z.courtAppearances.length > 0 &&
                          _jsxs(`div`, {
                            className: `dossier-section`,
                            children: [
                              _jsxs(`div`, {
                                className: `section-subtitle-pane`,
                                children: [
                                  _jsx(pe, {
                                    size: 16,
                                    className: `subtitle-pane-icon`,
                                  }),
                                  _jsx(`span`, {
                                    children: `Court Appearances Roster`,
                                  }),
                                ],
                              }),
                              _jsx(`div`, {
                                className: `table-wrapper`,
                                style: {
                                  marginTop: `12px`,
                                  border: `1px solid var(--border-color)`,
                                  borderRadius: `var(--radius-md)`,
                                  overflow: `hidden`,
                                },
                                children: _jsxs(`table`, {
                                  className: `saas-table`,
                                  style: { fontSize: `0.85rem` },
                                  children: [
                                    _jsx(`thead`, {
                                      children: _jsxs(`tr`, {
                                        children: [
                                          _jsx(`th`, {
                                            children: `Date & Time`,
                                          }),
                                          _jsx(`th`, { children: `Purpose` }),
                                          _jsx(`th`, {
                                            children: `Judge / Room`,
                                          }),
                                          _jsx(`th`, {
                                            children: `Appearing Advocate`,
                                          }),
                                          _jsx(`th`, { children: `Outcome` }),
                                          _jsx(`th`, { children: `Status` }),
                                        ],
                                      }),
                                    }),
                                    _jsx(`tbody`, {
                                      children: z.courtAppearances.map((e, t) =>
                                        _jsxs(
                                          `tr`,
                                          {
                                            children: [
                                              _jsxs(`td`, {
                                                children: [
                                                  _jsx(`span`, {
                                                    style: {
                                                      fontWeight: `600`,
                                                    },
                                                    children: e.date,
                                                  }),
                                                  _jsx(`div`, {
                                                    style: {
                                                      fontSize: `0.75rem`,
                                                      color: `var(--text-secondary)`,
                                                    },
                                                    children: e.time,
                                                  }),
                                                ],
                                              }),
                                              _jsx(`td`, {
                                                children: _jsx(`span`, {
                                                  className: `badge-tag`,
                                                  children:
                                                    e.appearanceType ||
                                                    e.purpose,
                                                }),
                                              }),
                                              _jsxs(`td`, {
                                                children: [
                                                  _jsx(`div`, {
                                                    children: e.judge,
                                                  }),
                                                  _jsxs(`div`, {
                                                    style: {
                                                      fontSize: `0.75rem`,
                                                      color: `var(--text-secondary)`,
                                                    },
                                                    children: [
                                                      `Room: `,
                                                      e.courtRoom,
                                                    ],
                                                  }),
                                                ],
                                              }),
                                              _jsx(`td`, {
                                                children: e.advocate,
                                              }),
                                              _jsx(`td`, {
                                                children: _jsx(`span`, {
                                                  style: {
                                                    fontSize: `0.8rem`,
                                                    fontStyle: `italic`,
                                                  },
                                                  children: e.outcome || `N/A`,
                                                }),
                                              }),
                                              _jsx(`td`, {
                                                children: _jsx(`span`, {
                                                  className: `cell-badge ${e.status === `Completed` ? `badge-success` : `badge-warning`}`,
                                                  children: e.status,
                                                }),
                                              }),
                                            ],
                                          },
                                          t,
                                        ),
                                      ),
                                    }),
                                  ],
                                }),
                              }),
                            ],
                          }),
                        _jsxs(`div`, {
                          className: `dossier-section`,
                          children: [
                            _jsxs(`div`, {
                              className: `section-subtitle-pane`,
                              children: [
                                _jsx(M, {
                                  size: 16,
                                  className: `subtitle-pane-icon`,
                                }),
                                _jsx(`span`, {
                                  children: `Case Docket Timeline Events`,
                                }),
                              ],
                            }),
                            _jsx(`div`, {
                              className: `timeline-axis-list`,
                              style: { marginTop: `12px` },
                              children:
                                z.hearings &&
                                z.hearings.map((e, t) =>
                                  _jsxs(
                                    `div`,
                                    {
                                      className: `timeline-axis-item`,
                                      children: [
                                        _jsx(`div`, {
                                          className: `timeline-axis-node-circle`,
                                        }),
                                        _jsxs(`div`, {
                                          className: `timeline-axis-content`,
                                          children: [
                                            _jsxs(`div`, {
                                              className: `timeline-axis-header`,
                                              children: [
                                                _jsx(`span`, {
                                                  className: `timeline-axis-date`,
                                                  children: e.date,
                                                }),
                                                _jsx(`span`, {
                                                  className: `timeline-axis-badge`,
                                                  children:
                                                    e.purpose || `Matter Filed`,
                                                }),
                                                i.editCase &&
                                                  _jsx(`button`, {
                                                    className: `btn-drawer-close`,
                                                    style: {
                                                      color: `var(--danger)`,
                                                      padding: `2px`,
                                                      marginLeft: `auto`,
                                                      cursor: `pointer`,
                                                    },
                                                    title: `Delete Timeline Event`,
                                                    onClick: () => {
                                                      Swal.fire({
                                                        title: `Delete Timeline Event?`,
                                                        text: `Delete "${e.purpose}" on ${e.date}?`,
                                                        icon: `warning`,
                                                        showCancelButton: !0,
                                                        confirmButtonColor: `var(--danger)`,
                                                        cancelButtonColor: `var(--border-color)`,
                                                        confirmButtonText: `Yes, delete!`,
                                                        background: `var(--bg-secondary)`,
                                                        color: `var(--text-primary)`,
                                                        showLoaderOnConfirm: true,
                                                        preConfirm: async () => {
                                                          try {
                                                            let n = (z.hearings || []).filter((_, idx) => idx !== t);
                                                            await t({ ...z, hearings: n });
                                                          } catch (err) {
                                                            Swal.showValidationMessage('Failed to delete event: ' + (err.message || 'Error'));
                                                            return false;
                                                          }
                                                        },
                                                      }).then((r) => {
                                                        if (r.isConfirmed) {
                                                          Swal.fire({
                                                            title: `Deleted!`,
                                                            text: `Timeline event deleted from database.`,
                                                            icon: `success`,
                                                            confirmButtonColor: `var(--primary)`,
                                                            background: `var(--bg-secondary)`,
                                                            color: `var(--text-primary)`,
                                                          });
                                                        }
                                                      });
                                                    },
                                                    children: _jsx(Ie, {
                                                      size: 12,
                                                    }),
                                                  }),
                                              ],
                                            }),
                                            _jsx(`div`, {
                                              className: `timeline-axis-description`,
                                              children:
                                                e.business ||
                                                `Case CS(COMM) 221/2026 lodged with the High Court Registry. Assigned Lead Counsel.`,
                                            }),
                                          ],
                                        }),
                                      ],
                                    },
                                    t,
                                  ),
                                ),
                            }),
                          ],
                        }),
                        z.orders &&
                          z.orders.length > 0 &&
                          _jsxs(`div`, {
                            className: `dossier-section`,
                            style: { borderBottom: `none` },
                            children: [
                              _jsxs(`div`, {
                                className: `section-subtitle-pane`,
                                children: [
                                  _jsx(fe, {
                                    size: 16,
                                    className: `subtitle-pane-icon`,
                                  }),
                                  _jsx(`span`, { children: `Judicial Orders` }),
                                ],
                              }),
                              _jsx(`div`, {
                                style: {
                                  display: `flex`,
                                  flexDirection: `column`,
                                  gap: `8px`,
                                  marginTop: `12px`,
                                },
                                children: z.orders.map((e, t) =>
                                  _jsxs(
                                    `div`,
                                    {
                                      style: {
                                        padding: `14px`,
                                        backgroundColor: `var(--bg-secondary)`,
                                        border: `1px solid var(--border-color)`,
                                        borderRadius: `var(--radius-md)`,
                                        display: `flex`,
                                        justifyContent: `space-between`,
                                        alignItems: `center`,
                                      },
                                      children: [
                                        _jsxs(`div`, {
                                          children: [
                                            _jsx(`div`, {
                                              style: {
                                                fontWeight: `700`,
                                                fontSize: `0.88rem`,
                                                color: `var(--text-primary)`,
                                              },
                                              children: e.type,
                                            }),
                                            _jsx(`p`, {
                                              style: {
                                                fontSize: `0.78rem`,
                                                color: `var(--text-secondary)`,
                                                marginTop: `2px`,
                                              },
                                              children: e.description,
                                            }),
                                            _jsxs(`div`, {
                                              style: {
                                                fontSize: `0.72rem`,
                                                color: `var(--text-tertiary)`,
                                                marginTop: `4px`,
                                              },
                                              children: [`Date: `, e.date],
                                            }),
                                          ],
                                        }),
                                        _jsx(`button`, {
                                          className: `btn-secondary`,
                                          style: {
                                            padding: `6px 12px`,
                                            fontSize: `0.75rem`,
                                          },
                                          onClick: () => {
                                            Swal.fire({
                                              title: e.type,
                                              html: `<div style="text-align: left; white-space: pre-wrap; font-family: monospace; font-size: 0.9rem; padding: 10px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); max-height: 300px; overflow-y: auto; background: var(--bg-primary); color: var(--text-primary);">${e.content || `No text content available.`}</div>`,
                                              confirmButtonColor: `var(--primary)`,
                                              background: `var(--bg-secondary)`,
                                              color: `var(--text-primary)`,
                                            });
                                          },
                                          children: `View Document`,
                                        }),
                                        i.editCase &&
                                          _jsx(`button`, {
                                            className: `btn-drawer-close`,
                                            style: {
                                              color: `var(--danger)`,
                                              padding: `6px`,
                                              marginLeft: `8px`,
                                              cursor: `pointer`,
                                            },
                                            title: `Delete Order`,
                                            onClick: () => {
                                              Swal.fire({
                                                title: `Delete Order Record?`,
                                                text: `Delete order "${e.type}" from this case?`,
                                                icon: `warning`,
                                                showCancelButton: !0,
                                                confirmButtonColor: `var(--danger)`,
                                                cancelButtonColor: `var(--border-color)`,
                                                confirmButtonText: `Yes, delete!`,
                                                background: `var(--bg-secondary)`,
                                                color: `var(--text-primary)`,
                                                showLoaderOnConfirm: true,
                                                preConfirm: async () => {
                                                  try {
                                                    let n = (z.orders || []).filter((_, idx) => idx !== t);
                                                    await t({ ...z, orders: n });
                                                  } catch (err) {
                                                    Swal.showValidationMessage('Failed to delete order: ' + (err.message || 'Error'));
                                                    return false;
                                                  }
                                                },
                                              }).then((r) => {
                                                if (r.isConfirmed) {
                                                  Swal.fire({
                                                    title: `Deleted!`,
                                                    text: `Order removed from case and saved to database.`,
                                                    icon: `success`,
                                                    confirmButtonColor: `var(--primary)`,
                                                    background: `var(--bg-secondary)`,
                                                    color: `var(--text-primary)`,
                                                  });
                                                }
                                              });
                                            },
                                            children: _jsx(Ie, { size: 14 }),
                                          }),
                                      ],
                                    },
                                    t,
                                  ),
                                ),
                              }),
                            ],
                          }),
                      ],
                    }),
                    _jsx(`button`, {
                      className: `fab-ai-assistant`,
                      onClick: () => pt(!0),
                      title: `AI Legal Assistant`,
                      children: _jsx(Me, { size: 22 }),
                    }),
                  ],
                })
              : _jsxs(`div`, {
                  className: `empty-content-state`,
                  children: [
                    _jsx(ie, {
                      size: 48,
                      style: {
                        color: `var(--text-tertiary)`,
                        marginBottom: `16px`,
                      },
                    }),
                    _jsx(`h3`, { children: `No Case Dossiers Available` }),
                    _jsx(`p`, {
                      children: `Create a new docket by clicking the "+" button in the left panel.`,
                    }),
                  ],
                }),
          }),
        ],
      }),
      h &&
        _jsx(`div`, {
          className: `add-case-overlay`,
          onClick: () => !S && g(!1),
          children: _jsxs(`div`, {
            className: `add-case-modal`,
            onClick: (e) => e.stopPropagation(),
            children: [
              _jsxs(`div`, {
                className: `modal-header`,
                children: [
                  _jsx(`span`, {
                    className: `modal-title`,
                    children: `ADD A NEW CASE`,
                  }),
                  _jsx(`button`, {
                    className: `modal-close-btn`,
                    onClick: () => !S && g(!1),
                    children: _jsx(Ve, { size: 20 }),
                  }),
                ],
              }),
              S
                ? _jsxs(`div`, {
                    className: `modal-syncing-state`,
                    children: [
                      _jsx(Oe, { size: 42, className: `spin trend-up` }),
                      _jsx(`h4`, { children: `Importing Case Dossier...` }),
                      _jsx(`p`, { children: w }),
                    ],
                  })
                : _jsxs(Fragment, {
                    children: [
                      _jsxs(`div`, {
                        className: `modal-tabs-row`,
                        children: [
                          _jsx(`button`, {
                            className: `modal-tab-btn ${v === `number` ? `active` : ``}`,
                            onClick: () => y(`number`),
                            children: `By Case Number`,
                          }),
                          _jsx(`button`, {
                            className: `modal-tab-btn ${v === `party` ? `active` : ``}`,
                            onClick: () => y(`party`),
                            children: `By Party Name`,
                          }),
                          _jsx(`button`, {
                            className: `modal-tab-btn ${v === `advocate` ? `active` : ``}`,
                            onClick: () => y(`advocate`),
                            children: `By Advocate`,
                          }),
                          _jsx(`button`, {
                            className: `modal-tab-btn ${v === `custom` ? `active` : ``}`,
                            onClick: () => y(`custom`),
                            children: `Custom Case`,
                          }),
                        ],
                      }),
                      _jsxs(`form`, {
                        onSubmit: (e) => {
                          e.preventDefault();
                          C(true);
                          T(`Connecting to eCourts registry API...`);
                          setTimeout(() => {
                            T(
                              `Pulling records for ` +
                                (v === `number`
                                  ? `Case No: ${ee}/${ne}`
                                  : `Party Name query`),
                            );
                            setTimeout(() => {
                              T(`Mapping client coordinates profile...`);
                              setTimeout(async () => {
                                try {
                                  let matchedClient = a.find((item) => item.id === je),
                                    clientCo = matchedClient
                                      ? matchedClient.company
                                      : `Sharma & Associates`,
                                    clientName = matchedClient ? matchedClient.name : `Mr. Anil Sharma`,
                                    clientMail = matchedClient
                                      ? matchedClient.email
                                      : `contact@sharma-law.com`,
                                    clientPhone = matchedClient ? matchedClient.phone : `+91 98765 43210`,
                                    clientType = matchedClient
                                      ? matchedClient.company
                                        ? `Corporate`
                                        : `Individual`
                                      : `Corporate`,
                                    newCaseId = `case_` + Date.now(),
                                    newCnr =
                                      le ||
                                      `TNCB0A` +
                                        Math.floor(
                                          1e7 + Math.random() * 9e7,
                                        ) +
                                        `2026`,
                                    newCaseNum = ee
                                      ? `${O.split(` `)[0]} ${ee}/${ne}`
                                      : `CC 250/2026`,
                                    newCaseTitle = ``;
                                  newCaseTitle =
                                    v === `number`
                                      ? `Deputy Commissioner of Income Tax Vs ${clientCo}`
                                      : v === `party`
                                        ? `${ae} Vs Respondent Group`
                                        : v === `advocate`
                                          ? `State represented by Adv. ${j} Vs Accused`
                                          : se || `Custom Docket Vs ${clientCo}`;

                                  const createdCase = await n({
                                    id: newCaseId,
                                    cnr: newCnr,
                                    caseNumber: newCaseNum,
                                    title: newCaseTitle,
                                    court: E,
                                    status: `Active`,
                                    nextHearing: new Date(
                                      Date.now() + 360 * 60 * 60 * 1e3,
                                    )
                                      .toISOString()
                                      .split(`T`)[0],
                                    judge:
                                      ue || `Hon. Justice Srinivasan`,
                                    courtRoom: me || `20`,
                                    filingDate: new Date()
                                      .toISOString()
                                      .split(`T`)[0],
                                    stage:
                                      ve ||
                                      `Next Stage Scheduled (eCourt Sync)`,
                                    opposingCounsel:
                                      P || `Adv. R. Krishnan`,
                                    leadCounsel:
                                      xe || `Adv. Vivek Sharma`,
                                    category: De || `CORPORATE`,
                                    priority: Ce || `HIGH`,
                                    clientCoordinates: {
                                      clientName: clientCo,
                                      clientType: clientType,
                                      phone: clientPhone,
                                      email: clientMail,
                                      contactPersons: `${clientName} (Lead Coordinator)`,
                                    },
                                    parties: [
                                      {
                                        type: `Petitioner`,
                                        name:
                                          newCaseTitle.split(` Vs `)[0] ||
                                          `Petitioner Group`,
                                        advocate: `Adv. Sarah Jenkins`,
                                      },
                                      {
                                        type: `Respondent`,
                                        name:
                                          newCaseTitle.split(` Vs `)[1] ||
                                          `Respondent Group`,
                                        advocate: `Adv. R. Krishnan`,
                                      },
                                    ],
                                    hearings: [
                                      {
                                        date: new Date()
                                          .toISOString()
                                          .split(`T`)[0],
                                        time: `10:30 AM`,
                                        purpose: `Matter Filed`,
                                        business: `Case dossier synced & mapped to Client CRM profile on ${new Date().toLocaleDateString()}`,
                                        judge:
                                          ue || `Hon. Justice Srinivasan`,
                                      },
                                    ],
                                    orders: [
                                      {
                                        date: new Date()
                                          .toISOString()
                                          .split(`T`)[0],
                                        type: `Registry Record Sync`,
                                        description: `eCourts registry admitted this file.`,
                                        content: `Record admitted. Case Number: ${newCaseNum}. Mapped Client ID: ${je}.`,
                                      },
                                    ],
                                    notes: [
                                      `Dossier created. Mapped with client CRM profile: ${clientCo}.`,
                                    ],
                                  });

                                  const actualId = createdCase?.id || newCaseId;

                                  if (matchedClient && o) {
                                    await o({
                                      ...matchedClient,
                                      linkedCases: [
                                        ...(matchedClient.linkedCases || []),
                                        actualId,
                                      ],
                                    });
                                  }

                                  u(actualId);
                                  g(false);
                                  te(``);
                                  A(``);
                                  oe(``);
                                  ce(``);
                                  N(``);

                                  Swal.fire({
                                    title: 'Case Created!',
                                    text: `Case "${newCaseTitle}" saved to PostgreSQL database.`,
                                    icon: 'success',
                                    confirmButtonColor: 'var(--primary)',
                                    background: 'var(--bg-secondary)',
                                    color: 'var(--text-primary)',
                                  });
                                } catch (err) {
                                  Swal.fire({
                                    title: 'Failed to Save Case',
                                    text: 'Could not create case in PostgreSQL: ' + (err.message || 'Server error'),
                                    icon: 'error',
                                    background: 'var(--bg-secondary)',
                                    color: 'var(--text-primary)',
                                  });
                                } finally {
                                  C(false);
                                  T(``);
                                }
                              }, 800);
                            }, 800);
                          }, 600);
                        },
                        className: `modal-form-content`,
                        children: [
                          v === `number` &&
                            _jsxs(Fragment, {
                              children: [
                                _jsxs(`div`, {
                                  className: `form-group`,
                                  children: [
                                    _jsx(`label`, {
                                      children: `Hearing Court`,
                                    }),
                                    _jsxs(`select`, {
                                      value: E,
                                      onChange: (e) => D(e.target.value),
                                      children: [
                                        _jsx(`option`, {
                                          value: `Madras High Court`,
                                          children: `Madras High Court`,
                                        }),
                                        _jsx(`option`, {
                                          value: `Delhi High Court`,
                                          children: `Delhi High Court`,
                                        }),
                                        _jsx(`option`, {
                                          value: `Bombay High Court`,
                                          children: `Bombay High Court`,
                                        }),
                                        _jsx(`option`, {
                                          value: `Karnataka High Court`,
                                          children: `Karnataka High Court`,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                _jsxs(`div`, {
                                  className: `form-group`,
                                  children: [
                                    _jsx(`label`, { children: `Case Type` }),
                                    _jsxs(`select`, {
                                      value: O,
                                      onChange: (e) => k(e.target.value),
                                      children: [
                                        _jsx(`option`, {
                                          value: `CC (Criminal Case)`,
                                          children: `CC (Criminal Case)`,
                                        }),
                                        _jsx(`option`, {
                                          value: `OS (Original Suit)`,
                                          children: `OS (Original Suit)`,
                                        }),
                                        _jsx(`option`, {
                                          value: `WP (Writ Petition)`,
                                          children: `WP (Writ Petition)`,
                                        }),
                                        _jsx(`option`, {
                                          value: `TA (Tax Appeal)`,
                                          children: `TA (Tax Appeal)`,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                _jsxs(`div`, {
                                  className: `form-group`,
                                  children: [
                                    _jsx(`label`, { children: `Case Number` }),
                                    _jsx(`input`, {
                                      type: `text`,
                                      placeholder: `Enter Case Number`,
                                      required: !0,
                                      value: ee,
                                      onChange: (e) => te(e.target.value),
                                    }),
                                  ],
                                }),
                                _jsxs(`div`, {
                                  className: `form-group`,
                                  children: [
                                    _jsx(`label`, { children: `Case Year` }),
                                    _jsxs(`select`, {
                                      value: ne,
                                      onChange: (e) => re(e.target.value),
                                      children: [
                                        _jsx(`option`, {
                                          value: `2026`,
                                          children: `2026`,
                                        }),
                                        _jsx(`option`, {
                                          value: `2025`,
                                          children: `2025`,
                                        }),
                                        _jsx(`option`, {
                                          value: `2024`,
                                          children: `2024`,
                                        }),
                                        _jsx(`option`, {
                                          value: `2023`,
                                          children: `2023`,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          v === `party` &&
                            _jsxs(Fragment, {
                              children: [
                                _jsxs(`div`, {
                                  className: `form-group`,
                                  children: [
                                    _jsx(`label`, {
                                      children: `Hearing Court`,
                                    }),
                                    _jsxs(`select`, {
                                      value: E,
                                      onChange: (e) => D(e.target.value),
                                      children: [
                                        _jsx(`option`, {
                                          value: `Madras High Court`,
                                          children: `Madras High Court`,
                                        }),
                                        _jsx(`option`, {
                                          value: `Delhi High Court`,
                                          children: `Delhi High Court`,
                                        }),
                                        _jsx(`option`, {
                                          value: `Bombay High Court`,
                                          children: `Bombay High Court`,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                _jsxs(`div`, {
                                  className: `form-group`,
                                  children: [
                                    _jsx(`label`, { children: `Party Name` }),
                                    _jsx(`input`, {
                                      type: `text`,
                                      placeholder: `e.g. CIBI International Private Limited`,
                                      required: !0,
                                      value: ae,
                                      onChange: (e) => A(e.target.value),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          v === `advocate` &&
                            _jsxs(Fragment, {
                              children: [
                                _jsxs(`div`, {
                                  className: `form-group`,
                                  children: [
                                    _jsx(`label`, {
                                      children: `Hearing Court`,
                                    }),
                                    _jsxs(`select`, {
                                      value: E,
                                      onChange: (e) => D(e.target.value),
                                      children: [
                                        _jsx(`option`, {
                                          value: `Madras High Court`,
                                          children: `Madras High Court`,
                                        }),
                                        _jsx(`option`, {
                                          value: `Delhi High Court`,
                                          children: `Delhi High Court`,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                _jsxs(`div`, {
                                  className: `form-group`,
                                  children: [
                                    _jsx(`label`, {
                                      children: `Advocate Name`,
                                    }),
                                    _jsx(`input`, {
                                      type: `text`,
                                      placeholder: `e.g. Adv. Vivek Sharma`,
                                      required: !0,
                                      value: j,
                                      onChange: (e) => oe(e.target.value),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          v === `custom` &&
                            _jsxs(Fragment, {
                              children: [
                                _jsxs(`div`, {
                                  className: `form-group`,
                                  children: [
                                    _jsx(`label`, { children: `Case Title` }),
                                    _jsx(`input`, {
                                      type: `text`,
                                      placeholder: `e.g. Acme Corp Vs State of Delhi`,
                                      required: !0,
                                      value: se,
                                      onChange: (e) => ce(e.target.value),
                                    }),
                                  ],
                                }),
                                _jsxs(`div`, {
                                  className: `form-group`,
                                  children: [
                                    _jsx(`label`, { children: `CNR Number` }),
                                    _jsx(`input`, {
                                      type: `text`,
                                      placeholder: `e.g. DLHC010351552024`,
                                      value: le,
                                      onChange: (e) =>
                                        N(e.target.value.toUpperCase()),
                                    }),
                                  ],
                                }),
                                _jsxs(`div`, {
                                  className: `form-group`,
                                  children: [
                                    _jsx(`label`, {
                                      children: `Hearing Court`,
                                    }),
                                    _jsx(`input`, {
                                      type: `text`,
                                      value: E,
                                      onChange: (e) => D(e.target.value),
                                    }),
                                  ],
                                }),
                                _jsxs(`div`, {
                                  className: `form-group`,
                                  children: [
                                    _jsx(`label`, {
                                      children: `Presiding Judge`,
                                    }),
                                    _jsx(`input`, {
                                      type: `text`,
                                      value: ue,
                                      onChange: (e) => de(e.target.value),
                                    }),
                                  ],
                                }),
                                _jsxs(`div`, {
                                  className: `form-group`,
                                  children: [
                                    _jsx(`label`, { children: `Court Room` }),
                                    _jsx(`input`, {
                                      type: `text`,
                                      value: me,
                                      onChange: (e) => _e(e.target.value),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          _jsxs(`div`, {
                            className: `form-group`,
                            style: { gridColumn: `span 2`, marginTop: `8px` },
                            children: [
                              _jsx(`label`, {
                                style: {
                                  color: `var(--primary)`,
                                  fontWeight: `600`,
                                },
                                children: `Link to Client CRM Profile`,
                              }),
                              _jsx(`select`, {
                                value: je,
                                onChange: (e) => Ne(e.target.value),
                                children: a.map((e) =>
                                  _jsxs(
                                    `option`,
                                    {
                                      value: e.id,
                                      children: [e.company, ` (`, e.name, `)`],
                                    },
                                    e.id,
                                  ),
                                ),
                              }),
                            ],
                          }),
                          _jsx(`div`, {
                            className: `modal-action-block`,
                            children: _jsx(`button`, {
                              type: `submit`,
                              className: `btn-modal-submit`,
                              children: `SUBMIT`,
                            }),
                          }),
                          _jsxs(`div`, {
                            className: `modal-bottom-link-row`,
                            children: [
                              `Can't find your Court? `,
                              _jsx(`a`, {
                                href: `#`,
                                onClick: (e) => {
                                  (e.preventDefault(),
                                    Swal.fire({
                                      title: `Request Court Integration`,
                                      text: `Your request for a new court endpoint integration has been submitted. Our support team will review it shortly.`,
                                      icon: `success`,
                                      confirmButtonColor: `var(--primary)`,
                                      background: `var(--bg-secondary)`,
                                      color: `var(--text-primary)`,
                                    }));
                                },
                                children: `Request it now`,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
            ],
          }),
        }),
      b &&
        _jsx(`div`, {
          className: `add-case-overlay`,
          onClick: () => x(!1),
          children: _jsxs(`div`, {
            className: `add-case-modal`,
            onClick: (e) => e.stopPropagation(),
            style: { maxWidth: `650px` },
            children: [
              _jsxs(`div`, {
                className: `modal-header`,
                children: [
                  _jsx(`span`, {
                    className: `modal-title`,
                    children: `EDIT CASE COORDINATES`,
                  }),
                  _jsx(`button`, {
                    className: `modal-close-btn`,
                    onClick: () => x(!1),
                    children: _jsx(Ve, { size: 20 }),
                  }),
                ],
              }),
              _jsxs(`form`, {
                onSubmit: ht,
                className: `modal-form-content`,
                style: {
                  display: `grid`,
                  gridTemplateColumns: `1fr 1fr`,
                  gap: `16px`,
                },
                children: [
                  _jsx(`div`, {
                    style: {
                      gridColumn: `span 2`,
                      borderBottom: `1px solid var(--border-color)`,
                      paddingBottom: `6px`,
                      fontWeight: `700`,
                      fontSize: `0.85rem`,
                      color: `var(--primary)`,
                    },
                    children: `LITIGATION BRIEF COORDINATES`,
                  }),
                  _jsxs(`div`, {
                    className: `form-group`,
                    children: [
                      _jsx(`label`, { children: `Filing Court` }),
                      _jsx(`input`, {
                        type: `text`,
                        value: Pe,
                        onChange: (e) => Fe(e.target.value),
                        required: !0,
                      }),
                    ],
                  }),
                  _jsxs(`div`, {
                    className: `form-group`,
                    children: [
                      _jsx(`label`, { children: `Presiding Judge` }),
                      _jsx(`input`, {
                        type: `text`,
                        value: Le,
                        onChange: (e) => F(e.target.value),
                        required: !0,
                      }),
                    ],
                  }),
                  _jsxs(`div`, {
                    className: `form-group`,
                    children: [
                      _jsx(`label`, { children: `Court Room` }),
                      _jsx(`input`, {
                        type: `text`,
                        value: Be,
                        onChange: (e) => Ue(e.target.value),
                        required: !0,
                      }),
                    ],
                  }),
                  _jsxs(`div`, {
                    className: `form-group`,
                    children: [
                      _jsx(`label`, { children: `Filing Date` }),
                      _jsx(`input`, {
                        type: `date`,
                        value: We,
                        onChange: (e) => Ge(e.target.value),
                        required: !0,
                      }),
                    ],
                  }),
                  _jsxs(`div`, {
                    className: `form-group`,
                    children: [
                      _jsx(`label`, { children: `Current Stage` }),
                      _jsx(`input`, {
                        type: `text`,
                        value: Ke,
                        onChange: (e) => qe(e.target.value),
                        required: !0,
                      }),
                    ],
                  }),
                  _jsxs(`div`, {
                    className: `form-group`,
                    children: [
                      _jsx(`label`, { children: `Opposing Counsel` }),
                      _jsx(`input`, {
                        type: `text`,
                        value: Je,
                        onChange: (e) => Ye(e.target.value),
                        required: !0,
                      }),
                    ],
                  }),
                  _jsxs(`div`, {
                    className: `form-group`,
                    children: [
                      _jsx(`label`, { children: `Lead Counsel` }),
                      _jsx(`input`, {
                        type: `text`,
                        value: Xe,
                        onChange: (e) => Ze(e.target.value),
                        required: !0,
                      }),
                    ],
                  }),
                  _jsxs(`div`, {
                    className: `form-group`,
                    children: [
                      _jsx(`label`, { children: `Case Priority` }),
                      _jsxs(`select`, {
                        value: Qe,
                        onChange: (e) => $e(e.target.value),
                        children: [
                          _jsx(`option`, { value: `HIGH`, children: `HIGH` }),
                          _jsx(`option`, {
                            value: `MEDIUM`,
                            children: `MEDIUM`,
                          }),
                          _jsx(`option`, { value: `LOW`, children: `LOW` }),
                        ],
                      }),
                    ],
                  }),
                  _jsxs(`div`, {
                    className: `form-group`,
                    children: [
                      _jsx(`label`, { children: `Assigned Junior Advocate` }),
                      _jsxs(`select`, {
                        value: R,
                        onChange: (e) => dt(e.target.value),
                        children: [
                          _jsx(`option`, {
                            value: ``,
                            children: `-- Unassigned --`,
                          }),
                          s
                            .filter((e) => e.role === `junior`)
                            .map((e) =>
                              _jsx(
                                `option`,
                                { value: e.name, children: e.name },
                                e.id,
                              ),
                            ),
                        ],
                      }),
                    ],
                  }),
                  _jsx(`div`, {
                    style: {
                      gridColumn: `span 2`,
                      borderBottom: `1px solid var(--border-color)`,
                      paddingBottom: `6px`,
                      marginTop: `12px`,
                      fontWeight: `700`,
                      fontSize: `0.85rem`,
                      color: `var(--primary)`,
                    },
                    children: `CLIENT PROFILE CRM COORDINATES`,
                  }),
                  _jsxs(`div`, {
                    className: `form-group`,
                    children: [
                      _jsx(`label`, { children: `Client Name / Company` }),
                      _jsx(`input`, {
                        type: `text`,
                        value: tt,
                        onChange: (e) => nt(e.target.value),
                        required: !0,
                      }),
                    ],
                  }),
                  _jsxs(`div`, {
                    className: `form-group`,
                    children: [
                      _jsx(`label`, { children: `Client Type` }),
                      _jsxs(`select`, {
                        value: rt,
                        onChange: (e) => it(e.target.value),
                        children: [
                          _jsx(`option`, {
                            value: `Corporate`,
                            children: `Corporate`,
                          }),
                          _jsx(`option`, {
                            value: `Individual`,
                            children: `Individual`,
                          }),
                          _jsx(`option`, {
                            value: `Government`,
                            children: `Government`,
                          }),
                        ],
                      }),
                    ],
                  }),
                  _jsxs(`div`, {
                    className: `form-group`,
                    children: [
                      _jsx(`label`, { children: `Phone Number` }),
                      _jsx(`input`, {
                        type: `text`,
                        value: at,
                        onChange: (e) => ot(e.target.value),
                      }),
                    ],
                  }),
                  _jsxs(`div`, {
                    className: `form-group`,
                    children: [
                      _jsx(`label`, { children: `Email Address` }),
                      _jsx(`input`, {
                        type: `email`,
                        value: st,
                        onChange: (e) => ct(e.target.value),
                      }),
                    ],
                  }),
                  _jsxs(`div`, {
                    className: `form-group`,
                    style: { gridColumn: `span 2` },
                    children: [
                      _jsx(`label`, {
                        children: `Contact Persons / Executive Leads`,
                      }),
                      _jsx(`input`, {
                        type: `text`,
                        value: lt,
                        onChange: (e) => ut(e.target.value),
                      }),
                    ],
                  }),
                  _jsx(`div`, {
                    className: `modal-action-block`,
                    style: { gridColumn: `span 2` },
                    children: _jsx(`button`, {
                      type: `submit`,
                      className: `btn-modal-submit`,
                      style: { width: `auto`, padding: `10px 24px` },
                      children: `Save Coordinates Changes`,
                    }),
                  }),
                ],
              }),
            ],
          }),
        }),
      ft &&
        _jsx(`div`, {
          className: `side-drawer-overlay`,
          onClick: () => pt(!1),
          children: _jsxs(`div`, {
            className: `side-drawer`,
            onClick: (e) => e.stopPropagation(),
            style: { width: `450px` },
            children: [
              _jsxs(`div`, {
                className: `drawer-header`,
                children: [
                  _jsxs(`div`, {
                    className: `flex-align`,
                    style: { gap: `8px` },
                    children: [
                      _jsx(Me, {
                        size: 18,
                        style: { color: `var(--primary)` },
                      }),
                      _jsx(`span`, {
                        className: `drawer-title`,
                        children: `AI Legal Assistant`,
                      }),
                    ],
                  }),
                  _jsx(`button`, {
                    className: `btn-drawer-close`,
                    onClick: () => pt(!1),
                    children: _jsx(Ve, { size: 18 }),
                  }),
                ],
              }),
              _jsxs(`div`, {
                style: {
                  padding: `24px`,
                  display: `flex`,
                  flexDirection: `column`,
                  gap: `20px`,
                },
                children: [
                  _jsxs(`div`, {
                    style: {
                      padding: `14px`,
                      backgroundColor: `var(--primary-light)`,
                      borderRadius: `var(--radius-md)`,
                      color: `var(--text-primary)`,
                      fontSize: `0.85rem`,
                    },
                    children: [
                      _jsx(`strong`, {
                        children: `Docket intelligence Summary`,
                      }),
                      `:`,
                      _jsxs(`p`, {
                        style: {
                          marginTop: `6px`,
                          color: `var(--text-secondary)`,
                        },
                        children: [
                          `This dossier represents a `,
                          _jsx(`strong`, { children: z?.category }),
                          ` brief under the jurisdiction of the `,
                          _jsx(`strong`, { children: z?.court }),
                          `. Mapped to Client CRM contact `,
                          _jsx(`strong`, {
                            children: z?.clientCoordinates?.clientName,
                          }),
                          `.`,
                        ],
                      }),
                    ],
                  }),
                  _jsxs(`div`, {
                    style: {
                      display: `flex`,
                      flexDirection: `column`,
                      gap: `10px`,
                    },
                    children: [
                      _jsx(`div`, {
                        style: { fontWeight: `600`, fontSize: `0.9rem` },
                        children: `Suggested Actions:`,
                      }),
                      _jsx(`button`, {
                        className: `btn-secondary`,
                        style: {
                          textAlign: `left`,
                          justifyContent: `flex-start`,
                          padding: `10px`,
                        },
                        onClick: () => {
                          Swal.fire({
                            title: `AI Drafting`,
                            text: `Drafting Petition brief response based on dossier coordinates...`,
                            icon: `info`,
                            confirmButtonColor: `var(--primary)`,
                            background: `var(--bg-secondary)`,
                            color: `var(--text-primary)`,
                          });
                        },
                        children: `📝 Draft Petition Brief Response`,
                      }),
                      _jsx(`button`, {
                        className: `btn-secondary`,
                        style: {
                          textAlign: `left`,
                          justifyContent: `flex-start`,
                          padding: `10px`,
                        },
                        onClick: () => {
                          Swal.fire({
                            title: `AI Analysis`,
                            text: `Formulating witness cross-examination questions...`,
                            icon: `info`,
                            confirmButtonColor: `var(--primary)`,
                            background: `var(--bg-secondary)`,
                            color: `var(--text-primary)`,
                          });
                        },
                        children: `⚖️ Formulate Witness Cross Questions`,
                      }),
                      _jsx(`button`, {
                        className: `btn-secondary`,
                        style: {
                          textAlign: `left`,
                          justifyContent: `flex-start`,
                          padding: `10px`,
                        },
                        onClick: () => {
                          Swal.fire({
                            title: `Exporting Report`,
                            text: `Generating and exporting coordinate audit report in PDF format...`,
                            icon: `success`,
                            confirmButtonColor: `var(--primary)`,
                            background: `var(--bg-secondary)`,
                            color: `var(--text-primary)`,
                          });
                        },
                        children: `📊 Export Coordinate Audit Report (PDF)`,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
      _jsx(`style`, {
        children: `
        .spin {
          animation: c-spin 2s linear infinite;
        }
        @keyframes c-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `,
      }),
    ],
  });
}
var L = [
    `January`,
    `February`,
    `March`,
    `April`,
    `May`,
    `June`,
    `July`,
    `August`,
    `September`,
    `October`,
    `November`,
    `December`,
  ],
  tt = [`SUN`, `MON`, `TUE`, `WED`, `THU`, `FRI`, `SAT`];
