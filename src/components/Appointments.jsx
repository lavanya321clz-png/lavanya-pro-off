import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import {
  Clock as M,
  MapPin as xe,
  Pencil as we,
  Plus as Ee,
  Phone as Te,
  Trash2 as Ie,
  Video as Be,
  X as Ve
} from 'lucide-react';

const pt = ({ size = 16, color = '#25D366' }) =>
  _jsx('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    style: { color, display: 'inline-block', verticalAlign: 'middle' },
    children: _jsx('path', {
      d: 'M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.729-1.464L0 24zm6.002-3.666c1.611.956 3.195 1.458 4.793 1.459 5.485.002 9.948-4.462 9.951-9.95.002-2.659-1.032-5.158-2.909-7.037-1.879-1.877-4.382-2.91-7.042-2.911-5.488 0-9.952 4.462-9.955 9.95-.001 1.944.512 3.84 1.486 5.507L1.13 22.87l6.027-1.58c-1.411-.84-2.183-1.637-2.183-1.637zm11.517-5.64c-.234-.117-1.383-.683-1.597-.762-.216-.078-.373-.117-.53.117-.156.234-.606.762-.743.918-.137.156-.275.176-.508.06-.233-.118-.988-.363-1.88-1.161-.696-.621-1.165-1.388-1.302-1.622-.137-.234-.015-.361.102-.478.106-.104.234-.274.351-.41.118-.137.157-.234.235-.39.078-.157.039-.294-.02-.41-.058-.117-.53-1.277-.725-1.748-.19-.459-.38-.396-.53-.404-.136-.007-.294-.009-.451-.009-.157 0-.412.059-.628.294-.216.235-.824.805-.824 1.963 0 1.157.843 2.274.96 2.43.118.157 1.659 2.534 4.021 3.556.562.242.999.387 1.343.496.564.18 1.077.154 1.482.094.453-.068 1.383-.566 1.578-1.113.196-.547.196-1.016.137-1.113-.058-.098-.216-.157-.449-.274z'
    })
  });

export default function Appointments({
  appointments: e = [],
  onAddAppointment: t,
  onUpdateAppointment: n,
  onDeleteAppointment: r,
  clients: i = [],
  perms: a = {}
}) {
  let [o, s] = useState(false),
    [editModalOpen, setEditModalOpen] = useState(false),
    [editingAppt, setEditingAppt] = useState(null),
    [c, l] = useState('All'),
    [u, d] = useState(i[0]?.id || ''),
    [f, p] = useState(''),
    [m, h] = useState('10:00 AM'),
    [g, v] = useState('Video Call'),
    [y, b] = useState(''),
    [x, S] = useState(''),
    [C, w] = useState('Google Meet'),
    [T, E] = useState(''),
    [D, O] = useState(''),
    [k, ee] = useState(''),
    [te, ne] = useState(true),
    re = (eId, clientName, purpose) => {
      Swal.fire({
        title: 'Cancel Appointment?',
        text: `Are you sure you want to cancel the appointment with ${clientName} for "${purpose}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'var(--primary)',
        cancelButtonColor: 'var(--danger)',
        confirmButtonText: 'Yes, cancel it!',
        background: 'var(--bg-secondary)',
        color: 'var(--text-primary)'
      }).then(res => {
        if (res.isConfirmed) {
          r(eId);
          Swal.fire({
            title: 'Canceled!',
            text: 'Appointment removed and updated in database.',
            icon: 'success',
            confirmButtonColor: 'var(--primary)',
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)'
          });
        }
      });
    },
    ie = platform => {
      w(platform);
      E(
        platform === 'Google Meet'
          ? 'https://meet.google.com/' +
              Math.random().toString(36).substring(2, 5) +
              '-' +
              Math.random().toString(36).substring(2, 6) +
              '-' +
              Math.random().toString(36).substring(2, 5)
          : platform === 'Zoom'
          ? 'https://zoom.us/j/' + Math.floor(1e9 + Math.random() * 9e9)
          : platform === 'Microsoft Teams'
          ? 'https://teams.live.com/meet/' + Math.floor(1e8 + Math.random() * 9e8)
          : ''
      );
    },
    ae = clientVal => {
      d(clientVal);
      let targetClient = i.find(item => item.id === clientVal);
      targetClient && ee(targetClient.phone || '');
    },
    A = () => {
      s(true);
      if (i.length > 0) {
        let firstCli = i[0];
        d(firstCli.id);
        ee(firstCli.phone || '');
      }
      w('Google Meet');
      E(
        'https://meet.google.com/' +
          Math.random().toString(36).substring(2, 5) +
          '-' +
          Math.random().toString(36).substring(2, 6) +
          '-' +
          Math.random().toString(36).substring(2, 5)
      );
      O('Universal Case Chambers, 4th Floor, Room 402');
    },
    j = (appt, phoneNum) => {
      let cleanPhone = phoneNum.replace(/[^\d+]/g, ''),
        msg =
          appt.type === 'Video Call'
            ? `Hello *${appt.clientName}*, this is to confirm your video consultation scheduled on *${appt.date}* at *${appt.time}* regarding *${appt.purpose}*.\n\nJoin Link (${appt.videoPlatform || 'Google Meet'}): ${appt.videoLink || 'https://meet.google.com'}\n\nThank you,\nAdvocateOS`
            : appt.type === 'In-Person'
            ? `Hello *${appt.clientName}*, this is to confirm your in-person meeting scheduled on *${appt.date}* at *${appt.time}* regarding *${appt.purpose}*.\n\nLocation: ${appt.location || 'Advocate Chambers'}\n\nThank you,\nAdvocateOS`
            : `Hello *${appt.clientName}*, this is to confirm your telephonic consultation scheduled on *${appt.date}* at *${appt.time}* regarding *${appt.purpose}*.\n\nWe will call you on your registered number.\n\nThank you,\nAdvocateOS`;
      let url = `https://api.whatsapp.com/send?phone=${encodeURIComponent(cleanPhone)}&text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
    },
    oe = appt => {
      let client = i.find(item => item.name === appt.clientName),
        clientPhone = appt.phone || client?.phone || '';
      if (!clientPhone) {
        Swal.fire({
          title: 'Phone Number Missing',
          text: `No phone number configured for client: "${appt.clientName}". Please input a WhatsApp-registered phone number to share:`,
          input: 'text',
          inputValue: '',
          inputPlaceholder: '+91 XXXXX XXXXX',
          showCancelButton: true,
          confirmButtonColor: 'var(--primary)',
          cancelButtonColor: 'var(--danger)',
          confirmButtonText: 'Share',
          background: 'var(--bg-secondary)',
          color: 'var(--text-primary)'
        }).then(res => {
          res.isConfirmed && res.value && j(appt, res.value);
        });
        return;
      }
      j(appt, clientPhone);
    },
    se = evt => {
      evt.preventDefault();
      if (!y.trim()) return;
      let targetClient = i.find(item => item.id === u),
        clientName = targetClient ? targetClient.name : 'Independent Client',
        clientComp = targetClient ? targetClient.company : 'N/A',
        newAppt = {
          id: 'appt_' + Date.now(),
          clientName: clientName,
          company: clientComp,
          date: f || new Date().toISOString().split('T')[0],
          time: m,
          type: g,
          purpose: y,
          status: 'Scheduled',
          notes: x,
          videoPlatform: g === 'Video Call' ? C : void 0,
          videoLink: g === 'Video Call' ? T : void 0,
          location: g === 'In-Person' ? D : void 0,
          phone: k
        };
      t(newAppt);
      s(false);
      b('');
      S('');
      p('');
      te &&
        k &&
        Swal.fire({
          title: 'Appointment Scheduled!',
          text: 'Would you like to dispatch the meeting confirmation now via WhatsApp?',
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#25D366',
          cancelButtonColor: 'var(--danger)',
          confirmButtonText: '💬 Send WhatsApp Alert',
          cancelButtonText: 'Done',
          background: 'var(--bg-secondary)',
          color: 'var(--text-primary)'
        }).then(res => {
          res.isConfirmed && j(newAppt, k);
        });
    },
    ce = (appt, statusVal) => {
      n({ ...appt, status: statusVal });
    },
    openEditModal = appt => {
      setEditingAppt({ ...appt });
      setEditModalOpen(true);
    },
    handleEditSubmit = evt => {
      evt.preventDefault();
      if (!editingAppt || !n) return;
      n({ ...editingAppt });
      setEditModalOpen(false);
      Swal.fire({
        title: 'Appointment Updated!',
        text: 'Appointment details updated and saved to PostgreSQL.',
        icon: 'success',
        confirmButtonColor: 'var(--primary)',
        background: 'var(--bg-secondary)',
        color: 'var(--text-primary)'
      });
    },
    le = e.filter(item => (c === 'All' ? true : item.status === c)),
    N = typeVal => {
      switch (typeVal) {
        case 'Video Call':
          return _jsx(Be, { size: 14, style: { color: 'var(--primary)' } });
        case 'Phone Call':
          return _jsx(Te, { size: 14, style: { color: 'var(--info)' } });
        case 'In-Person':
          return _jsx(xe, { size: 14, style: { color: 'var(--warning)' } });
        default:
          return _jsx(M, { size: 14 });
      }
    };

  return _jsxs('div', {
    className: 'page-container',
    children: [
      _jsxs('div', {
        className: 'page-header',
        children: [
          _jsxs('div', {
            className: 'page-title-area',
            children: [
              _jsx('h1', { className: 'page-title', children: 'Client Appointments & Meetings' }),
              _jsx('p', {
                className: 'page-subtitle',
                children: 'Schedule, edit, and coordinate consultations, trial reviews, and client onboarding sessions.'
              })
            ]
          }),
          a.write &&
            _jsxs('button', {
              className: 'btn-primary-action',
              onClick: A,
              style: { padding: '10px 16px' },
              children: [_jsx(Ee, { size: 16 }), _jsx('span', { children: 'Schedule Appointment' })]
            })
        ]
      }),
      _jsx('div', {
        className: 'records-toolbar',
        style: { marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
        children: _jsx('div', {
          style: { display: 'flex', gap: '8px' },
          children: ['All', 'Scheduled', 'Completed', 'Canceled'].map(statusItem =>
            _jsx(
              'button',
              {
                className: `btn-toolbar-filter ${c === statusItem ? 'active-filter' : ''}`,
                onClick: () => l(statusItem),
                style: { border: 'none', background: 'none', cursor: 'pointer' },
                children: statusItem
              },
              statusItem
            )
          )
        })
      }),
      _jsx('div', {
        className: 'table-wrapper',
        style: { border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', overflowX: 'auto' },
        children: _jsxs('table', {
          className: 'saas-table',
          children: [
            _jsx('thead', {
              children: _jsxs('tr', {
                children: [
                  _jsx('th', { children: 'Client Contact' }),
                  _jsx('th', { children: 'Date & Time' }),
                  _jsx('th', { children: 'Meeting Type' }),
                  _jsx('th', { children: 'Purpose / Agenda' }),
                  _jsx('th', { children: 'Status' }),
                  a.write && _jsx('th', { style: { textAlign: 'right' }, children: 'Actions' })
                ]
              })
            }),
            _jsxs('tbody', {
              children: [
                le.map(apptItem =>
                  _jsxs(
                    'tr',
                    {
                      children: [
                        _jsx('td', {
                          children: _jsxs('div', {
                            style: { display: 'flex', flexDirection: 'column' },
                            children: [
                              _jsx('span', { style: { fontWeight: '700', color: 'var(--text-primary)' }, children: apptItem.clientName }),
                              _jsx('span', { style: { fontSize: '0.75rem', color: 'var(--text-secondary)' }, children: apptItem.company })
                            ]
                          })
                        }),
                        _jsx('td', {
                          children: _jsxs('div', {
                            style: { display: 'flex', flexDirection: 'column' },
                            children: [
                              _jsx('span', { style: { fontWeight: '600' }, children: apptItem.date }),
                              _jsxs('span', {
                                style: {
                                  fontSize: '0.75rem',
                                  color: 'var(--text-secondary)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                },
                                children: [_jsx(M, { size: 10 }), ' ', apptItem.time]
                              })
                            ]
                          })
                        }),
                        _jsxs('td', {
                          children: [
                            _jsxs('div', {
                              style: { display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' },
                              children: [N(apptItem.type), _jsx('span', { children: apptItem.type })]
                            }),
                            apptItem.type === 'Video Call' &&
                              apptItem.videoLink &&
                              _jsx('div', {
                                style: { fontSize: '0.75rem', marginTop: '4px' },
                                children: _jsxs('a', {
                                  href: apptItem.videoLink,
                                  target: '_blank',
                                  rel: 'noopener noreferrer',
                                  style: { color: 'var(--primary)', textDecoration: 'underline' },
                                  children: ['Join ', apptItem.videoPlatform || 'Meeting']
                                })
                              }),
                            apptItem.type === 'In-Person' &&
                              (apptItem.location || apptItem.venue) &&
                              _jsxs('div', {
                                style: { fontSize: '0.75rem', marginTop: '4px', color: 'var(--text-secondary)' },
                                children: ['📍 ', apptItem.location || apptItem.venue]
                              })
                          ]
                        }),
                        _jsx('td', {
                          children: _jsxs('div', {
                            style: { display: 'flex', flexDirection: 'column' },
                            children: [
                              _jsx('span', { style: { fontWeight: '600', color: 'var(--text-primary)' }, children: apptItem.purpose }),
                              apptItem.notes &&
                                _jsx('span', {
                                  style: { fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '2px' },
                                  children: apptItem.notes
                                })
                            ]
                          })
                        }),
                        _jsx('td', {
                          children: _jsxs('select', {
                            value: apptItem.status,
                            onChange: evt => ce(apptItem, evt.target.value),
                            disabled: !a.write,
                            style: {
                              padding: '4px 8px',
                              borderRadius: '4px',
                              border: '1px solid var(--border-color)',
                              fontSize: '0.8rem',
                              cursor: a.write ? 'pointer' : 'not-allowed',
                              backgroundColor: 'var(--bg-secondary)',
                              color:
                                apptItem.status === 'Completed'
                                  ? 'var(--success)'
                                  : apptItem.status === 'Canceled'
                                  ? 'var(--danger)'
                                  : 'var(--text-primary)',
                              fontWeight: '600'
                            },
                            children: [
                              _jsx('option', { value: 'Scheduled', children: 'Scheduled' }),
                              _jsx('option', { value: 'Completed', children: 'Completed' }),
                              _jsx('option', { value: 'Canceled', children: 'Canceled' })
                            ]
                          })
                        }),
                        a.write &&
                          _jsx('td', {
                            style: { textAlign: 'right' },
                            children: _jsxs('div', {
                              style: { display: 'flex', justifyContent: 'flex-end', gap: '6px', alignItems: 'center' },
                              children: [
                                _jsx('button', {
                                  className: 'btn-drawer-close',
                                  style: { color: '#25D366', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '6px' },
                                  onClick: () => oe(apptItem),
                                  title: 'Share via WhatsApp',
                                  children: _jsx(pt, { size: 16 })
                                }),
                                _jsx('button', {
                                  className: 'btn-drawer-close',
                                  style: { color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '6px' },
                                  onClick: () => openEditModal(apptItem),
                                  title: 'Edit Appointment',
                                  children: _jsx(we, { size: 15 })
                                }),
                                _jsx('button', {
                                  className: 'btn-drawer-close',
                                  style: {
                                    color: a.delete ? 'var(--danger)' : 'var(--text-tertiary)',
                                    opacity: a.delete ? 1 : 0.4,
                                    cursor: a.delete ? 'pointer' : 'not-allowed',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '6px'
                                  },
                                  disabled: !a.delete,
                                  onClick: () => re(apptItem.id, apptItem.clientName, apptItem.purpose),
                                  title: 'Cancel Appointment',
                                  children: _jsx(Ie, { size: 16 })
                                })
                              ]
                            })
                          })
                      ]
                    },
                    apptItem.id
                  )
                ),
                le.length === 0 &&
                  _jsx('tr', {
                    children: _jsx('td', {
                      colSpan: '6',
                      style: { textAlign: 'center', padding: '40px', color: 'var(--text-tertiary)', fontStyle: 'italic' },
                      children: 'No appointments scheduled matching filters.'
                    })
                  })
              ]
            })
          ]
        })
      }),

      // Add Appointment Modal
      o &&
        _jsx('div', {
          className: 'add-case-overlay',
          onClick: () => s(false),
          children: _jsxs('div', {
            className: 'add-case-modal',
            onClick: e => e.stopPropagation(),
            style: { maxWidth: '560px' },
            children: [
              _jsxs('div', {
                className: 'modal-header',
                children: [
                  _jsx('span', { className: 'modal-title', children: 'SCHEDULE NEW APPOINTMENT' }),
                  _jsx('button', { className: 'modal-close-btn', onClick: () => s(false), children: _jsx(Ve, { size: 20 }) })
                ]
              }),
              _jsxs('form', {
                onSubmit: se,
                className: 'modal-form-content',
                children: [
                  _jsxs('div', {
                    className: 'form-group',
                    children: [
                      _jsx('label', { children: 'Select CRM Client' }),
                      _jsx('select', {
                        value: u,
                        onChange: e => ae(e.target.value),
                        children: i.map(clientItem =>
                          _jsxs('option', { value: clientItem.id, children: [clientItem.name, ' (', clientItem.company, ')'] }, clientItem.id)
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
                          _jsx('label', { children: 'Meeting Date' }),
                          _jsx('input', { type: 'date', value: f, onChange: e => p(e.target.value), required: true })
                        ]
                      }),
                      _jsxs('div', {
                        className: 'form-group',
                        children: [
                          _jsx('label', { children: 'Meeting Time' }),
                          _jsx('input', { type: 'text', value: m, onChange: e => h(e.target.value), required: true, placeholder: 'e.g. 10:30 AM' })
                        ]
                      })
                    ]
                  }),
                  _jsxs('div', {
                    className: 'form-group',
                    children: [
                      _jsx('label', { children: 'Meeting Type' }),
                      _jsxs('select', {
                        value: g,
                        onChange: e => v(e.target.value),
                        children: [
                          _jsx('option', { value: 'Video Call', children: 'Video Call' }),
                          _jsx('option', { value: 'In-Person', children: 'In-Person (Office visit)' }),
                          _jsx('option', { value: 'Phone Call', children: 'Phone Call' })
                        ]
                      })
                    ]
                  }),
                  g === 'Video Call' &&
                    _jsxs('div', {
                      style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' },
                      children: [
                        _jsxs('div', {
                          className: 'form-group',
                          children: [
                            _jsx('label', { children: 'Video Call Platform' }),
                            _jsxs('select', {
                              value: C,
                              onChange: e => ie(e.target.value),
                              children: [
                                _jsx('option', { value: 'Google Meet', children: 'Google Meet' }),
                                _jsx('option', { value: 'Zoom', children: 'Zoom' }),
                                _jsx('option', { value: 'Microsoft Teams', children: 'Microsoft Teams' }),
                                _jsx('option', { value: 'Custom', children: 'Custom Link' })
                              ]
                            })
                          ]
                        }),
                        _jsxs('div', {
                          className: 'form-group',
                          children: [
                            _jsx('label', { children: 'Video Link' }),
                            _jsx('input', { type: 'url', value: T, onChange: e => E(e.target.value), required: true, placeholder: 'https://...' })
                          ]
                        })
                      ]
                    }),
                  g === 'In-Person' &&
                    _jsxs('div', {
                      className: 'form-group',
                      children: [
                        _jsx('label', { children: 'Meeting Location' }),
                        _jsx('input', {
                          type: 'text',
                          value: D,
                          onChange: e => O(e.target.value),
                          required: true,
                          placeholder: 'e.g. Universal Case Chambers, 4th Floor'
                        })
                      ]
                    }),
                  _jsxs('div', {
                    className: 'form-group',
                    children: [
                      _jsx('label', { children: 'Client WhatsApp Phone' }),
                      _jsx('input', { type: 'text', value: k, onChange: e => ee(e.target.value), required: true, placeholder: 'e.g. +91 98765 43210' })
                    ]
                  }),
                  _jsxs('div', {
                    style: { display: 'flex', alignItems: 'center', gap: '8px', padding: '2px 0' },
                    children: [
                      _jsx('input', {
                        type: 'checkbox',
                        id: 'shareOnWhatsapp',
                        checked: te,
                        onChange: e => ne(e.target.checked),
                        style: { cursor: 'pointer', width: '16px', height: '16px' }
                      }),
                      _jsx('label', {
                        htmlFor: 'shareOnWhatsapp',
                        style: { fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' },
                        children: _jsx('span', { children: 'Notify Client via WhatsApp instantly' })
                      })
                    ]
                  }),
                  _jsxs('div', {
                    className: 'form-group',
                    children: [
                      _jsx('label', { children: 'Purpose / Agenda' }),
                      _jsx('input', { type: 'text', value: y, onChange: e => b(e.target.value), required: true, placeholder: 'e.g. Cross Witness Prep' })
                    ]
                  }),
                  _jsxs('div', {
                    className: 'form-group',
                    children: [
                      _jsx('label', { children: 'Discussion Notes' }),
                      _jsx('textarea', { value: x, onChange: e => S(e.target.value), placeholder: 'Review liability clauses and background documents...', rows: '3', style: { resize: 'vertical' } })
                    ]
                  }),
                  _jsx('button', {
                    type: 'submit',
                    className: 'btn-modal-submit',
                    style: { justifyContent: 'center', marginTop: '10px' },
                    children: 'Save Appointment Schedule'
                  })
                ]
              })
            ]
          })
        }),

      // Edit Appointment Modal
      editModalOpen &&
        editingAppt &&
        _jsx('div', {
          className: 'add-case-overlay',
          onClick: () => setEditModalOpen(false),
          children: _jsxs('div', {
            className: 'add-case-modal',
            onClick: e => e.stopPropagation(),
            style: { maxWidth: '560px' },
            children: [
              _jsxs('div', {
                className: 'modal-header',
                children: [
                  _jsx('span', { className: 'modal-title', children: 'EDIT APPOINTMENT' }),
                  _jsx('button', { className: 'modal-close-btn', onClick: () => setEditModalOpen(false), children: _jsx(Ve, { size: 20 }) })
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
                          _jsx('label', { children: 'Date' }),
                          _jsx('input', {
                            type: 'date',
                            value: editingAppt.date,
                            onChange: e => setEditingAppt(prev => ({ ...prev, date: e.target.value })),
                            required: true
                          })
                        ]
                      }),
                      _jsxs('div', {
                        className: 'form-group',
                        children: [
                          _jsx('label', { children: 'Time' }),
                          _jsx('input', {
                            type: 'text',
                            value: editingAppt.time,
                            onChange: e => setEditingAppt(prev => ({ ...prev, time: e.target.value })),
                            required: true
                          })
                        ]
                      })
                    ]
                  }),
                  _jsxs('div', {
                    className: 'form-group',
                    children: [
                      _jsx('label', { children: 'Purpose / Agenda' }),
                      _jsx('input', {
                        type: 'text',
                        value: editingAppt.purpose,
                        onChange: e => setEditingAppt(prev => ({ ...prev, purpose: e.target.value })),
                        required: true
                      })
                    ]
                  }),
                  _jsxs('div', {
                    className: 'form-group',
                    children: [
                      _jsx('label', { children: 'Meeting Type' }),
                      _jsxs('select', {
                        value: editingAppt.type,
                        onChange: e => setEditingAppt(prev => ({ ...prev, type: e.target.value })),
                        children: [
                          _jsx('option', { value: 'Video Call', children: 'Video Call' }),
                          _jsx('option', { value: 'In-Person', children: 'In-Person' }),
                          _jsx('option', { value: 'Phone Call', children: 'Phone Call' })
                        ]
                      })
                    ]
                  }),
                  editingAppt.type === 'Video Call' &&
                    _jsxs('div', {
                      className: 'form-group',
                      children: [
                        _jsx('label', { children: 'Video Link' }),
                        _jsx('input', {
                          type: 'text',
                          value: editingAppt.videoLink || '',
                          onChange: e => setEditingAppt(prev => ({ ...prev, videoLink: e.target.value }))
                        })
                      ]
                    }),
                  editingAppt.type === 'In-Person' &&
                    _jsxs('div', {
                      className: 'form-group',
                      children: [
                        _jsx('label', { children: 'Location / Venue' }),
                        _jsx('input', {
                          type: 'text',
                          value: editingAppt.location || editingAppt.venue || '',
                          onChange: e => setEditingAppt(prev => ({ ...prev, location: e.target.value, venue: e.target.value }))
                        })
                      ]
                    }),
                  _jsxs('div', {
                    className: 'form-group',
                    children: [
                      _jsx('label', { children: 'Discussion Notes' }),
                      _jsx('textarea', {
                        rows: 3,
                        value: editingAppt.notes || '',
                        onChange: e => setEditingAppt(prev => ({ ...prev, notes: e.target.value })),
                        style: { resize: 'vertical' }
                      })
                    ]
                  }),
                  _jsx('div', {
                    className: 'modal-action-block',
                    children: _jsx('button', { type: 'submit', className: 'btn-modal-submit', children: 'Save Appointment Updates' })
                  })
                ]
              })
            ]
          })
        })
    ]
  });
}