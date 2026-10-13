import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import {
  Calendar as A,
  ChevronLeft as oe,
  ChevronRight as se,
  Clock as M,
  Eye as de,
  LayoutGrid as ye,
  List as P,
  MapPin as xe,
  Pencil as we,
  Plus as Ee,
  Sparkles as Me,
  Trash2 as Ie,
  X as Ve
} from 'lucide-react';

function nt(e, t) {
  let n = new Date(e, t, 1).getDay(),
    r = new Date(e, t + 1, 0).getDate(),
    i = new Date(e, t, 0).getDate(),
    a = [];
  for (let r = n - 1; r >= 0; r--) a.push({ day: i - r, currentMonth: !1, year: t === 0 ? e - 1 : e, month: t === 0 ? 11 : t - 1 });
  for (let n = 1; n <= r; n++) a.push({ day: n, currentMonth: !0, year: e, month: t });
  let o = 42 - a.length;
  for (let n = 1; n <= o; n++) a.push({ day: n, currentMonth: !1, year: t === 11 ? e + 1 : e, month: t === 11 ? 0 : t + 1 });
  return a;
}

function rt(e, t, n) {
  return `${e}-${String(t + 1).padStart(2, '0')}-${String(n).padStart(2, '0')}`;
}

function it(e, t, n) {
  return new Date(e, t, n).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
}

const L = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const tt = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export default function HearingsCalendar({ cases: e = [], onUpdateCase: onUpdate, perms: t = {} }) {
  let n = new Date(),
    [r, i] = useState('calendar'),
    [a, o] = useState(n.getFullYear()),
    [s, c] = useState(n.getMonth()),
    [l, u] = useState(n.getDate()),
    [editingHearing, setEditingHearing] = useState(null),
    [showScheduleModal, setShowScheduleModal] = useState(false),
    [newHearing, setNewHearing] = useState({
      caseId: e[0]?.id || '',
      date: new Date().toISOString().split('T')[0],
      time: '10:30 AM',
      purpose: 'Legal Hearing',
      judge: 'Hon. Justice Srinivasan',
      business: ''
    });

  let d = {};
  e.forEach(item => {
    item.hearings &&
      item.hearings.forEach(h => {
        let nDate = h.date;
        d[nDate] || (d[nDate] = []);
        d[nDate].push({
          ...h,
          caseId: item.id,
          caseTitle: item.title,
          court: item.court,
          caseStatus: item.status,
          caseNumber: item.caseNumber || ''
        });
      });
  });

  let f = Object.values(d)
      .flat()
      .sort((a, b) => new Date(a.date) - new Date(b.date)),
    p = nt(a, s),
    m = rt(n.getFullYear(), n.getMonth(), n.getDate()),
    h = d[rt(a, s, l)] || [];

  // 1. View Hearing
  const handleView = hearing => {
    Swal.fire({
      title: hearing.purpose || 'Hearing Details',
      html: `
        <div style="text-align: left; font-size: 0.88rem; line-height: 1.6;">
          <p><strong>Case:</strong> ${hearing.caseTitle} (${hearing.caseNumber || 'N/A'})</p>
          <p><strong>Court:</strong> ${hearing.court}</p>
          <p><strong>Date & Time:</strong> ${hearing.date} at ${hearing.time}</p>
          <p><strong>Judge:</strong> ${hearing.judge || 'Bench Magistrate'}</p>
          <p style="margin-top: 8px;"><strong>Proceedings / Business:</strong></p>
          <div style="background: var(--bg-primary); padding: 8px 12px; border-radius: 6px; border: 1px solid var(--border-color);">${
            hearing.business || 'No additional notes recorded.'
          }</div>
        </div>
      `,
      confirmButtonColor: 'var(--primary)',
      background: 'var(--bg-secondary)',
      color: 'var(--text-primary)'
    });
  };

  // 2. Delete Hearing
  const handleDelete = hearing => {
    Swal.fire({
      title: 'Delete Scheduled Hearing?',
      text: `Are you sure you want to remove the hearing "${hearing.purpose}" on ${hearing.date} for case "${hearing.caseTitle}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--danger)',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonColor: 'var(--border-color)',
      background: 'var(--bg-secondary)',
      color: 'var(--text-primary)'
    }).then(res => {
      if (res.isConfirmed) {
        const targetCase = e.find(c => c.id === hearing.caseId);
        if (!targetCase || !onUpdate) return;
        const updatedHearings = (targetCase.hearings || []).filter(
          item => !(item.date === hearing.date && item.time === hearing.time && item.purpose === hearing.purpose)
        );
        onUpdate({ ...targetCase, hearings: updatedHearings });
        Swal.fire({
          title: 'Deleted!',
          text: 'Hearing removed from case and database updated.',
          icon: 'success',
          confirmButtonColor: 'var(--primary)',
          background: 'var(--bg-secondary)',
          color: 'var(--text-primary)'
        });
      }
    });
  };

  // 3. Edit Hearing Submit
  const handleEditSubmit = evt => {
    evt.preventDefault();
    if (!editingHearing || !onUpdate) return;
    const targetCase = e.find(c => c.id === editingHearing.caseId);
    if (!targetCase) return;

    const updatedHearings = (targetCase.hearings || []).map(item => {
      if (
        item.date === editingHearing.originalDate &&
        item.time === editingHearing.originalTime &&
        item.purpose === editingHearing.originalPurpose
      ) {
        return {
          date: editingHearing.date,
          time: editingHearing.time,
          purpose: editingHearing.purpose,
          judge: editingHearing.judge,
          business: editingHearing.business
        };
      }
      return item;
    });

    onUpdate({ ...targetCase, hearings: updatedHearings });
    setEditingHearing(null);
    Swal.fire({
      title: 'Hearing Updated!',
      text: 'Hearing details updated and synced to database.',
      icon: 'success',
      confirmButtonColor: 'var(--primary)',
      background: 'var(--bg-secondary)',
      color: 'var(--text-primary)'
    });
  };

  // 4. Schedule New Hearing Submit
  const handleScheduleSubmit = evt => {
    evt.preventDefault();
    if (!newHearing.caseId || !onUpdate) return;
    const targetCase = e.find(c => c.id === newHearing.caseId);
    if (!targetCase) return;

    const hearingToAdd = {
      date: newHearing.date,
      time: newHearing.time,
      purpose: newHearing.purpose,
      judge: newHearing.judge || targetCase.judge || 'Hon. Justice Srinivasan',
      business: newHearing.business || `Hearing scheduled on ${newHearing.date}`
    };

    onUpdate({ ...targetCase, hearings: [...(targetCase.hearings || []), hearingToAdd] });
    setShowScheduleModal(false);
    setNewHearing({
      caseId: e[0]?.id || '',
      date: new Date().toISOString().split('T')[0],
      time: '10:30 AM',
      purpose: 'Legal Hearing',
      judge: 'Hon. Justice Srinivasan',
      business: ''
    });
    Swal.fire({
      title: 'Hearing Scheduled!',
      text: 'New hearing added to case docket and saved to database.',
      icon: 'success',
      confirmButtonColor: 'var(--primary)',
      background: 'var(--bg-secondary)',
      color: 'var(--text-primary)'
    });
  };

  return _jsxs('div', {
    className: 'hearings-schedule-container',
    children: [
      _jsxs('div', {
        className: 'hearings-page-header',
        children: [
          _jsxs('div', {
            className: 'hearings-title-block',
            children: [
              _jsx('h1', { children: 'Advocate Daily Schedule' }),
              _jsxs('p', {
                children: [
                  'Track court appearances, ',
                  _jsx('a', { href: '#', children: 'client trials' }),
                  ', and case hearings.'
                ]
              })
            ]
          }),
          _jsxs('div', {
            className: 'hearings-view-toggle',
            children: [
              _jsx('button', {
                className: `view-toggle-btn ${r === 'calendar' ? 'active' : ''}`,
                onClick: () => i('calendar'),
                title: 'Calendar Grid View',
                children: _jsx(ye, { size: 16 })
              }),
              _jsx('button', {
                className: `view-toggle-btn ${r === 'list' ? 'active' : ''}`,
                onClick: () => i('list'),
                title: 'List View',
                children: _jsx(P, { size: 16 })
              })
            ]
          })
        ]
      }),
      r === 'calendar' &&
        _jsxs('div', {
          className: 'hearings-main-area',
          children: [
            _jsxs('div', {
              className: 'cal-card',
              children: [
                _jsxs('div', {
                  className: 'cal-nav-row',
                  children: [
                    _jsxs('span', { className: 'cal-month-label', children: [L[s], ' ', a] }),
                    _jsxs('div', {
                      className: 'cal-nav-controls',
                      children: [
                        _jsx('button', {
                          className: 'cal-nav-btn',
                          onClick: () => {
                            s === 0 ? (o(e => e - 1), c(11)) : c(e => e - 1);
                          },
                          children: _jsx(oe, { size: 14 })
                        }),
                        _jsx('button', {
                          className: 'cal-today-btn',
                          onClick: () => {
                            o(n.getFullYear()), c(n.getMonth()), u(n.getDate());
                          },
                          children: 'Today'
                        }),
                        _jsx('button', {
                          className: 'cal-nav-btn',
                          onClick: () => {
                            s === 11 ? (o(e => e + 1), c(0)) : c(e => e + 1);
                          },
                          children: _jsx(se, { size: 14 })
                        })
                      ]
                    })
                  ]
                }),
                _jsx('div', {
                  className: 'cal-weekday-header',
                  children: tt.map(e => _jsx('div', { className: 'cal-weekday-label', children: e }, e))
                }),
                _jsx('div', {
                  className: 'cal-days-grid',
                  children: p.map((e, t) => {
                    let n = rt(e.year, e.month, e.day),
                      r = n === m,
                      i = e.currentMonth && e.day === l && e.month === s && e.year === a,
                      f = d[n] || [];
                    return _jsxs(
                      'div',
                      {
                        className: ['cal-day-cell', e.currentMonth ? '' : 'outside-month', r ? 'is-today' : '', i ? 'is-selected' : '']
                          .filter(Boolean)
                          .join(' '),
                        onClick: () => {
                          e.currentMonth ? u(e.day) : (o(e.year), c(e.month), u(e.day));
                        },
                        children: [
                          _jsx('span', { className: 'cal-day-number', children: e.day }),
                          f.slice(0, 2).map((e, t) => _jsx('div', { className: 'cal-event-chip', children: e.purpose }, t)),
                          f.length > 2 && _jsxs('div', { className: 'cal-event-chip', children: ['+', f.length - 2, ' more'] })
                        ]
                      },
                      t
                    );
                  })
                })
              ]
            }),
            _jsxs('div', {
              className: 'agenda-card',
              children: [
                _jsxs('div', {
                  children: [
                    _jsx('div', { className: 'agenda-header-label', children: 'Daily Agenda' }),
                    _jsx('div', { className: 'agenda-date-label', children: it(a, s, l) })
                  ]
                }),
                h.length === 0
                  ? _jsx('div', { className: 'agenda-empty-state', children: 'No events scheduled for this day.' })
                  : _jsx('div', {
                      className: 'agenda-events-list',
                      children: h.map((e, n) =>
                        _jsxs(
                          'div',
                          {
                            className: 'agenda-event-row',
                            children: [
                              _jsx('div', { className: 'agenda-time-label', children: e.time }),
                              _jsx('div', { className: 'agenda-dot' }),
                              _jsxs('div', {
                                className: 'agenda-event-card',
                                children: [
                                  _jsx('div', { className: 'agenda-event-title', children: e.purpose }),
                                  _jsxs('div', {
                                    className: 'agenda-event-meta',
                                    children: [_jsx(xe, { size: 11 }), e.court, ' | Status: Scheduled']
                                  }),
                                  _jsxs('div', {
                                    className: 'agenda-event-meta',
                                    style: { marginBottom: 0 },
                                    children: [_jsx(M, { size: 11 }), e.business?.slice(0, 55), e.business?.length > 55 ? '...' : '']
                                  }),
                                  _jsxs('div', {
                                    className: 'agenda-event-actions',
                                    children: [
                                      _jsx('button', {
                                        className: 'agenda-action-btn',
                                        title: 'View Hearing',
                                        onClick: () => handleView(e),
                                        children: _jsx(de, { size: 13 })
                                      }),
                                      _jsx('button', {
                                        className: 'agenda-action-btn',
                                        disabled: !t.write,
                                        style: { cursor: t.write ? 'pointer' : 'not-allowed', opacity: t.write ? 1 : 0.4 },
                                        title: t.write ? 'Edit Hearing' : 'Action Denied - Permissions Required',
                                        onClick: () => {
                                          if (!t.write) return;
                                          setEditingHearing({
                                            caseId: e.caseId,
                                            originalDate: e.date,
                                            originalTime: e.time,
                                            originalPurpose: e.purpose,
                                            date: e.date,
                                            time: e.time,
                                            purpose: e.purpose,
                                            judge: e.judge || '',
                                            business: e.business || ''
                                          });
                                        },
                                        children: _jsx(we, { size: 13 })
                                      }),
                                      _jsx('button', {
                                        className: 'agenda-action-btn danger',
                                        disabled: !t.delete,
                                        style: { cursor: t.delete ? 'pointer' : 'not-allowed', opacity: t.delete ? 1 : 0.4 },
                                        title: t.delete ? 'Delete Hearing' : 'Action Denied - Permissions Required',
                                        onClick: () => {
                                          if (!t.delete) return;
                                          handleDelete(e);
                                        },
                                        children: _jsx(Ie, { size: 13 })
                                      })
                                    ]
                                  })
                                ]
                              })
                            ]
                          },
                          n
                        )
                      )
                    })
              ]
            })
          ]
        }),
      r === 'list' &&
        _jsx('div', {
          className: 'hearings-list-table',
          children: _jsxs('table', {
            className: 'saas-table',
            children: [
              _jsx('thead', {
                children: _jsxs('tr', {
                  children: [
                    _jsx('th', { children: 'Date & Time' }),
                    _jsx('th', { children: 'Case Title' }),
                    _jsx('th', { children: 'Court' }),
                    _jsx('th', { children: 'Purpose' }),
                    _jsx('th', { children: 'Judge Bench' }),
                    _jsx('th', { children: 'Status' }),
                    (t.write || t.delete) && _jsx('th', { style: { textAlign: 'right' }, children: 'Actions' })
                  ]
                })
              }),
              _jsxs('tbody', {
                children: [
                  f.map((e, tIdx) => {
                    let n = e.date === m;
                    return _jsxs(
                      'tr',
                      {
                        style: {
                          backgroundColor: n ? 'rgba(245, 158, 11, 0.05)' : 'transparent',
                          borderLeft: n ? '3px solid var(--warning)' : 'none'
                        },
                        children: [
                          _jsx('td', {
                            style: { fontWeight: '600' },
                            children: _jsxs('div', {
                              style: { display: 'flex', flexDirection: 'column' },
                              children: [
                                _jsx('span', { children: e.date }),
                                _jsxs('span', {
                                  style: {
                                    fontSize: '0.75rem',
                                    color: 'var(--text-secondary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    marginTop: '2px'
                                  },
                                  children: [_jsx(M, { size: 10 }), ' ', e.time]
                                })
                              ]
                            })
                          }),
                          _jsx('td', {
                            children: _jsxs('div', {
                              style: { display: 'flex', flexDirection: 'column' },
                              children: [
                                _jsx('span', {
                                  style: { fontWeight: '600', color: 'var(--primary)', fontSize: '0.88rem' },
                                  children: e.caseTitle
                                }),
                                n &&
                                  _jsx('span', {
                                    style: {
                                      fontSize: '0.7rem',
                                      color: 'var(--warning)',
                                      fontWeight: '700',
                                      textTransform: 'uppercase',
                                      marginTop: '2px'
                                    },
                                    children: 'TODAY'
                                  })
                              ]
                            })
                          }),
                          _jsx('td', {
                            children: _jsxs('div', {
                              style: { display: 'flex', alignItems: 'center', gap: '6px' },
                              children: [
                                _jsx(xe, { size: 12, style: { color: 'var(--text-tertiary)' } }),
                                _jsx('span', { style: { fontSize: '0.85rem' }, children: e.court })
                              ]
                            })
                          }),
                          _jsx('td', { children: _jsx('span', { className: 'badge-tag', children: e.purpose }) }),
                          _jsx('td', { style: { fontSize: '0.8rem', color: 'var(--text-secondary)' }, children: e.judge }),
                          _jsx('td', {
                            children: _jsx('span', {
                              className: `cell-badge ${
                                e.caseStatus === 'Active' ? 'badge-success' : e.caseStatus === 'Pending' ? 'badge-warning' : 'badge-info'
                              }`,
                              children: e.caseStatus
                            })
                          }),
                          (t.write || t.delete) &&
                            _jsx('td', {
                              style: { textAlign: 'right' },
                              children: _jsxs('div', {
                                style: { display: 'flex', justifyContent: 'flex-end', gap: '6px' },
                                children: [
                                  _jsx('button', {
                                    className: 'btn-drawer-close',
                                    title: 'View Hearing',
                                    onClick: () => handleView(e),
                                    children: _jsx(de, { size: 13 })
                                  }),
                                  t.write &&
                                    _jsx('button', {
                                      className: 'btn-drawer-close',
                                      title: 'Edit Hearing',
                                      onClick: () => {
                                        setEditingHearing({
                                          caseId: e.caseId,
                                          originalDate: e.date,
                                          originalTime: e.time,
                                          originalPurpose: e.purpose,
                                          date: e.date,
                                          time: e.time,
                                          purpose: e.purpose,
                                          judge: e.judge || '',
                                          business: e.business || ''
                                        });
                                      },
                                      children: _jsx(we, { size: 13 })
                                    }),
                                  t.delete &&
                                    _jsx('button', {
                                      className: 'btn-drawer-close',
                                      style: { color: 'var(--danger)' },
                                      title: 'Delete Hearing',
                                      onClick: () => handleDelete(e),
                                      children: _jsx(Ie, { size: 13 })
                                    })
                                ]
                              })
                            })
                        ]
                      },
                      tIdx
                    );
                  }),
                  f.length === 0 &&
                    _jsx('tr', {
                      children: _jsx('td', {
                        colSpan: '7',
                        style: { textAlign: 'center', padding: '40px', color: 'var(--text-tertiary)' },
                        children: 'No hearings scheduled.'
                      })
                    })
                ]
              })
            ]
          })
        }),

      // FAB Quick Schedule Button
      _jsx('button', {
        className: 'hearings-fab',
        disabled: !t.write,
        style: { cursor: t.write ? 'pointer' : 'not-allowed', opacity: t.write ? 1 : 0.5 },
        title: t.write ? 'Quick Schedule Hearing' : 'Action Denied - Write Permission Required',
        onClick: () => {
          if (!t.write) return;
          setShowScheduleModal(true);
        },
        children: _jsx(Me, { size: 22 })
      }),

      // Modal: Edit Hearing
      editingHearing &&
        _jsx('div', {
          className: 'add-case-overlay',
          onClick: () => setEditingHearing(null),
          children: _jsxs('div', {
            className: 'add-case-modal',
            onClick: e => e.stopPropagation(),
            style: { maxWidth: '540px' },
            children: [
              _jsxs('div', {
                className: 'modal-header',
                children: [
                  _jsx('span', { className: 'modal-title', children: 'EDIT HEARING' }),
                  _jsx('button', { className: 'modal-close-btn', onClick: () => setEditingHearing(null), children: _jsx(Ve, { size: 20 }) })
                ]
              }),
              _jsxs('form', {
                onSubmit: handleEditSubmit,
                className: 'modal-form-content',
                children: [
                  _jsxs('div', {
                    style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' },
                    children: [
                      _jsxs('div', {
                        className: 'form-group',
                        children: [
                          _jsx('label', { children: 'Hearing Date' }),
                          _jsx('input', {
                            type: 'date',
                            value: editingHearing.date,
                            onChange: e => setEditingHearing(prev => ({ ...prev, date: e.target.value })),
                            required: true
                          })
                        ]
                      }),
                      _jsxs('div', {
                        className: 'form-group',
                        children: [
                          _jsx('label', { children: 'Hearing Time' }),
                          _jsx('input', {
                            type: 'text',
                            value: editingHearing.time,
                            onChange: e => setEditingHearing(prev => ({ ...prev, time: e.target.value })),
                            required: true
                          })
                        ]
                      })
                    ]
                  }),
                  _jsxs('div', {
                    className: 'form-group',
                    children: [
                      _jsx('label', { children: 'Hearing Purpose / Cause List' }),
                      _jsx('input', {
                        type: 'text',
                        value: editingHearing.purpose,
                        onChange: e => setEditingHearing(prev => ({ ...prev, purpose: e.target.value })),
                        required: true
                      })
                    ]
                  }),
                  _jsxs('div', {
                    className: 'form-group',
                    children: [
                      _jsx('label', { children: 'Judge Bench' }),
                      _jsx('input', {
                        type: 'text',
                        value: editingHearing.judge,
                        onChange: e => setEditingHearing(prev => ({ ...prev, judge: e.target.value }))
                      })
                    ]
                  }),
                  _jsxs('div', {
                    className: 'form-group',
                    children: [
                      _jsx('label', { children: 'Proceedings / Business Summary' }),
                      _jsx('textarea', {
                        rows: 3,
                        value: editingHearing.business,
                        onChange: e => setEditingHearing(prev => ({ ...prev, business: e.target.value })),
                        style: { resize: 'vertical' }
                      })
                    ]
                  }),
                  _jsx('div', {
                    className: 'modal-action-block',
                    children: _jsx('button', { type: 'submit', className: 'btn-modal-submit', children: 'Save Hearing Updates' })
                  })
                ]
              })
            ]
          })
        }),

      // Modal: Schedule New Hearing
      showScheduleModal &&
        _jsx('div', {
          className: 'add-case-overlay',
          onClick: () => setShowScheduleModal(false),
          children: _jsxs('div', {
            className: 'add-case-modal',
            onClick: e => e.stopPropagation(),
            style: { maxWidth: '580px' },
            children: [
              _jsxs('div', {
                className: 'modal-header',
                children: [
                  _jsx('span', { className: 'modal-title', children: 'SCHEDULE COURT HEARING' }),
                  _jsx('button', { className: 'modal-close-btn', onClick: () => setShowScheduleModal(false), children: _jsx(Ve, { size: 20 }) })
                ]
              }),
              _jsxs('form', {
                onSubmit: handleScheduleSubmit,
                className: 'modal-form-content',
                children: [
                  _jsxs('div', {
                    className: 'form-group',
                    children: [
                      _jsx('label', { style: { color: 'var(--primary)', fontWeight: '700' }, children: 'Target Case Docket' }),
                      _jsx('select', {
                        value: newHearing.caseId,
                        onChange: e => setNewHearing(prev => ({ ...prev, caseId: e.target.value })),
                        required: true,
                        children: e.map(item =>
                          _jsxs('option', { value: item.id, children: [item.caseNumber || 'N/A', ' — ', item.title.slice(0, 50)] }, item.id)
                        )
                      })
                    ]
                  }),
                  _jsxs('div', {
                    style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' },
                    children: [
                      _jsxs('div', {
                        className: 'form-group',
                        children: [
                          _jsx('label', { children: 'Hearing Date' }),
                          _jsx('input', {
                            type: 'date',
                            value: newHearing.date,
                            onChange: e => setNewHearing(prev => ({ ...prev, date: e.target.value })),
                            required: true
                          })
                        ]
                      }),
                      _jsxs('div', {
                        className: 'form-group',
                        children: [
                          _jsx('label', { children: 'Hearing Time' }),
                          _jsx('input', {
                            type: 'text',
                            value: newHearing.time,
                            onChange: e => setNewHearing(prev => ({ ...prev, time: e.target.value })),
                            required: true
                          })
                        ]
                      })
                    ]
                  }),
                  _jsxs('div', {
                    className: 'form-group',
                    children: [
                      _jsx('label', { children: 'Hearing Purpose / Cause List Item' }),
                      _jsx('input', {
                        type: 'text',
                        placeholder: 'e.g. Final Arguments or Evidence Cross',
                        value: newHearing.purpose,
                        onChange: e => setNewHearing(prev => ({ ...prev, purpose: e.target.value })),
                        required: true
                      })
                    ]
                  }),
                  _jsxs('div', {
                    className: 'form-group',
                    children: [
                      _jsx('label', { children: 'Presiding Judge Bench' }),
                      _jsx('input', {
                        type: 'text',
                        value: newHearing.judge,
                        onChange: e => setNewHearing(prev => ({ ...prev, judge: e.target.value }))
                      })
                    ]
                  }),
                  _jsxs('div', {
                    className: 'form-group',
                    children: [
                      _jsx('label', { children: 'Business Notes / Instructions' }),
                      _jsx('textarea', {
                        rows: 3,
                        placeholder: 'Notes on witness attendance, documents to present...',
                        value: newHearing.business,
                        onChange: e => setNewHearing(prev => ({ ...prev, business: e.target.value })),
                        style: { resize: 'vertical' }
                      })
                    ]
                  }),
                  _jsx('div', {
                    className: 'modal-action-block',
                    children: _jsx('button', { type: 'submit', className: 'btn-modal-submit', children: 'Save Hearing to Docket' })
                  })
                ]
              })
            ]
          })
        })
    ]
  });
}