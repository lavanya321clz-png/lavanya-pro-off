import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { jsx as _jsx, jsxs as _jsxs, Fragment } from 'react/jsx-runtime';
import {
  Building as ae,
  Database as N,
  FileText as fe,
  Briefcase as ie,
  Mail as be,
  Pencil as we,
  Phone as Te,
  Plus as Ee,
  Search as ke,
  Trash2 as Ie,
  User as Re,
  X as Ve,
  ChevronRight as se
} from 'lucide-react';

export default function Clients({
  clients: e = [],
  cases: t = [],
  records: n = [],
  onUpdateClient: r,
  onAddClient: i,
  onDeleteClient: delCli,
  perms: a = {}
}) {
  let [o, s] = useState(e[0]?.id || null),
    [c, l] = useState(''),
    [u, d] = useState(false),
    [editModalOpen, setEditModalOpen] = useState(false),
    [f, p] = useState(''),
    [m, h] = useState(''),
    [g, v] = useState(''),
    [y, b] = useState(''),
    [x, S] = useState(''),
    [C, w] = useState(''),
    [editForm, setEditForm] = useState({ name: '', company: '', email: '', phone: '' }),
    T = e.find(item => item.id === o) || e[0],
    E = evt => {
      evt.preventDefault();
      if (!f.trim()) return;
      let newClient = {
        id: 'client_' + Date.now(),
        name: f,
        company: m || 'Independent',
        email: g,
        phone: y,
        avatar: f
          .split(' ')
          .map(part => part[0])
          .join('')
          .toUpperCase()
          .substring(0, 2),
        linkedCases: [],
        linkedRecords: [],
        notes: x ? [x] : [],
        documents: []
      };
      i(newClient);
      s(newClient.id);
      d(false);
      p('');
      h('');
      v('');
      b('');
      S('');
    },
    D = () => {
      if (!C.trim() || !T || !r) return;
      r({ ...T, notes: [...(T.notes || []), C.trim()] });
      w('');
    },
    handleDeleteNote = noteIdx => {
      if (!T || !r) return;
      let newNotes = (T.notes || []).filter((_, idx) => idx !== noteIdx);
      r({ ...T, notes: newNotes });
    },
    openEditModal = () => {
      if (!T) return;
      setEditForm({
        name: T.name || '',
        company: T.company || '',
        email: T.email || '',
        phone: T.phone || ''
      });
      setEditModalOpen(true);
    },
    handleEditSubmit = evt => {
      evt.preventDefault();
      if (!T || !r) return;
      r({
        ...T,
        name: editForm.name,
        company: editForm.company,
        email: editForm.email,
        phone: editForm.phone,
        avatar: editForm.name
          .split(' ')
          .map(part => part[0])
          .join('')
          .toUpperCase()
          .substring(0, 2)
      });
      setEditModalOpen(false);
      Swal.fire({
        title: 'Profile Updated!',
        text: 'Client contact details saved to PostgreSQL database.',
        icon: 'success',
        confirmButtonColor: 'var(--primary)',
        background: 'var(--bg-secondary)',
        color: 'var(--text-primary)'
      });
    },
    O = e.filter(
      item => item.name?.toLowerCase().includes(c.toLowerCase()) || item.company?.toLowerCase().includes(c.toLowerCase())
    );

  return _jsxs('div', {
    className: 'page-container',
    children: [
      _jsxs('div', {
        className: 'page-header',
        children: [
          _jsxs('div', {
            className: 'page-title-area',
            children: [
              _jsx('h1', { className: 'page-title', children: 'Client Directory (CRM)' }),
              _jsx('p', {
                className: 'page-subtitle',
                children: 'Manage client profiles, contacts, and linked legal or contract cases.'
              })
            ]
          }),
          _jsxs('button', {
            className: 'btn-primary-action',
            onClick: () => a.addClient && d(true),
            disabled: !a.addClient,
            style: { cursor: a.addClient ? 'pointer' : 'not-allowed', opacity: a.addClient ? 1 : 0.6 },
            title: a.addClient ? 'Add Client' : 'Action Denied - Associate Advocate/Admin Role Required',
            children: [_jsx(Ee, { size: 16 }), _jsx('span', { children: 'Add Client' })]
          })
        ]
      }),

      // Add Client Drawer
      u &&
        _jsx('div', {
          className: 'side-drawer-overlay',
          onClick: () => d(false),
          children: _jsxs('div', {
            className: 'side-drawer',
            onClick: e => e.stopPropagation(),
            style: { width: '400px' },
            children: [
              _jsxs('div', {
                className: 'drawer-header',
                children: [
                  _jsx('span', { className: 'drawer-title', children: 'New Client Registration' }),
                  _jsx('button', { className: 'btn-drawer-close', onClick: () => d(false), children: _jsx(Ve, { size: 18 }) })
                ]
              }),
              _jsxs('form', {
                onSubmit: E,
                style: { padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' },
                children: [
                  _jsxs('div', {
                    style: { display: 'flex', flexDirection: 'column', gap: '6px' },
                    children: [
                      _jsx('label', { style: { fontSize: '0.85rem', fontWeight: '600' }, children: 'Full Name' }),
                      _jsx('input', {
                        type: 'text',
                        value: f,
                        onChange: e => p(e.target.value),
                        required: true,
                        placeholder: 'e.g. John Doe',
                        style: {
                          padding: '8px 12px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'var(--bg-primary)'
                        }
                      })
                    ]
                  }),
                  _jsxs('div', {
                    style: { display: 'flex', flexDirection: 'column', gap: '6px' },
                    children: [
                      _jsx('label', { style: { fontSize: '0.85rem', fontWeight: '600' }, children: 'Company Name' }),
                      _jsx('input', {
                        type: 'text',
                        value: m,
                        onChange: e => h(e.target.value),
                        placeholder: 'e.g. Acme Corp',
                        style: {
                          padding: '8px 12px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'var(--bg-primary)'
                        }
                      })
                    ]
                  }),
                  _jsxs('div', {
                    style: { display: 'flex', flexDirection: 'column', gap: '6px' },
                    children: [
                      _jsx('label', { style: { fontSize: '0.85rem', fontWeight: '600' }, children: 'Email Address' }),
                      _jsx('input', {
                        type: 'email',
                        value: g,
                        onChange: e => v(e.target.value),
                        placeholder: 'e.g. john@acme.com',
                        style: {
                          padding: '8px 12px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'var(--bg-primary)'
                        }
                      })
                    ]
                  }),
                  _jsxs('div', {
                    style: { display: 'flex', flexDirection: 'column', gap: '6px' },
                    children: [
                      _jsx('label', { style: { fontSize: '0.85rem', fontWeight: '600' }, children: 'Phone Number' }),
                      _jsx('input', {
                        type: 'text',
                        value: y,
                        onChange: e => b(e.target.value),
                        placeholder: '+91 XXXXX XXXXX',
                        style: {
                          padding: '8px 12px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'var(--bg-primary)'
                        }
                      })
                    ]
                  }),
                  _jsxs('div', {
                    style: { display: 'flex', flexDirection: 'column', gap: '6px' },
                    children: [
                      _jsx('label', { style: { fontSize: '0.85rem', fontWeight: '600' }, children: 'Initial Note' }),
                      _jsx('textarea', {
                        value: x,
                        onChange: e => S(e.target.value),
                        placeholder: 'Any specific onboarding details...',
                        rows: '3',
                        style: {
                          padding: '8px 12px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'var(--bg-primary)',
                          resize: 'vertical'
                        }
                      })
                    ]
                  }),
                  _jsx('button', {
                    type: 'submit',
                    className: 'btn-primary-action',
                    style: { justifyContent: 'center', marginTop: '10px' },
                    children: 'Save Client Profile'
                  })
                ]
              })
            ]
          })
        }),

      // Edit Client Modal
      editModalOpen &&
        _jsx('div', {
          className: 'add-case-overlay',
          onClick: () => setEditModalOpen(false),
          children: _jsxs('div', {
            className: 'add-case-modal',
            onClick: e => e.stopPropagation(),
            style: { maxWidth: '500px' },
            children: [
              _jsxs('div', {
                className: 'modal-header',
                children: [
                  _jsx('span', { className: 'modal-title', children: 'EDIT CLIENT PROFILE' }),
                  _jsx('button', { className: 'modal-close-btn', onClick: () => setEditModalOpen(false), children: _jsx(Ve, { size: 20 }) })
                ]
              }),
              _jsxs('form', {
                onSubmit: handleEditSubmit,
                className: 'modal-form-content',
                children: [
                  _jsxs('div', {
                    className: 'form-group',
                    children: [
                      _jsx('label', { children: 'Full Name' }),
                      _jsx('input', {
                        type: 'text',
                        value: editForm.name,
                        onChange: e => setEditForm(prev => ({ ...prev, name: e.target.value })),
                        required: true
                      })
                    ]
                  }),
                  _jsxs('div', {
                    className: 'form-group',
                    children: [
                      _jsx('label', { children: 'Company / Organization' }),
                      _jsx('input', {
                        type: 'text',
                        value: editForm.company,
                        onChange: e => setEditForm(prev => ({ ...prev, company: e.target.value }))
                      })
                    ]
                  }),
                  _jsxs('div', {
                    className: 'form-group',
                    children: [
                      _jsx('label', { children: 'Email Address' }),
                      _jsx('input', {
                        type: 'email',
                        value: editForm.email,
                        onChange: e => setEditForm(prev => ({ ...prev, email: e.target.value }))
                      })
                    ]
                  }),
                  _jsxs('div', {
                    className: 'form-group',
                    children: [
                      _jsx('label', { children: 'Phone Number' }),
                      _jsx('input', {
                        type: 'text',
                        value: editForm.phone,
                        onChange: e => setEditForm(prev => ({ ...prev, phone: e.target.value }))
                      })
                    ]
                  }),
                  _jsx('div', {
                    className: 'modal-action-block',
                    children: _jsx('button', { type: 'submit', className: 'btn-modal-submit', children: 'Save Changes' })
                  })
                ]
              })
            ]
          })
        }),

      _jsxs('div', {
        className: 'pdf-preview-split',
        style: { gridTemplateColumns: '0.8fr 1.2fr' },
        children: [
          _jsxs('div', {
            style: { display: 'flex', flexDirection: 'column', gap: '16px' },
            children: [
              _jsx('div', {
                className: 'records-toolbar',
                style: { borderRadius: 'var(--radius-lg)' },
                children: _jsxs('div', {
                  className: 'search-toolbar-wrapper',
                  style: { width: '100%' },
                  children: [
                    _jsx(ke, { size: 16, className: 'search-icon' }),
                    _jsx('input', {
                      type: 'text',
                      placeholder: 'Search contact roster...',
                      value: c,
                      onChange: e => l(e.target.value)
                    })
                  ]
                })
              }),
              _jsxs('div', {
                style: { display: 'flex', flexDirection: 'column', gap: '8px' },
                children: [
                  O.map(clientItem =>
                    _jsx(
                      'div',
                      {
                        onClick: () => s(clientItem.id),
                        className: `saas-card ${o === clientItem.id ? 'premium' : ''}`,
                        style: {
                          cursor: 'pointer',
                          padding: '16px',
                          borderColor: o === clientItem.id ? 'var(--primary)' : 'var(--border-color)'
                        },
                        children: _jsxs('div', {
                          style: { display: 'flex', alignItems: 'center', gap: '12px' },
                          children: [
                            _jsx('div', {
                              className: 'user-avatar',
                              style: { border: 'none', background: 'var(--primary-light)', color: 'var(--primary)', fontWeight: '700' },
                              children: clientItem.avatar
                            }),
                            _jsxs('div', {
                              style: { flex: 1, minWidth: 0 },
                              children: [
                                _jsx('div', {
                                  style: {
                                    fontWeight: '700',
                                    fontSize: '0.925rem',
                                    color: 'var(--text-primary)',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap'
                                  },
                                  children: clientItem.name
                                }),
                                _jsx('div', {
                                  style: {
                                    fontSize: '0.75rem',
                                    color: 'var(--text-secondary)',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap'
                                  },
                                  children: clientItem.company
                                })
                              ]
                            }),
                            _jsx(se, { size: 14, style: { color: 'var(--text-tertiary)' } })
                          ]
                        })
                      },
                      clientItem.id
                    )
                  ),
                  O.length === 0 &&
                    _jsx('div', {
                      style: {
                        textAlign: 'center',
                        padding: '40px',
                        color: 'var(--text-tertiary)',
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-lg)'
                      },
                      children: 'No clients found.'
                    })
                ]
              })
            ]
          }),
          _jsx('div', {
            className: 'saas-card',
            style: { display: 'flex', flexDirection: 'column', gap: '24px' },
            children: T
              ? _jsxs(Fragment, {
                  children: [
                    _jsxs('div', {
                      style: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '16px',
                        borderBottom: '1px solid var(--border-color)',
                        paddingBottom: '20px'
                      },
                      children: [
                        _jsxs('div', {
                          style: { display: 'flex', alignItems: 'center', gap: '16px' },
                          children: [
                            _jsx('div', {
                              className: 'user-avatar',
                              style: {
                                width: '56px',
                                height: '56px',
                                fontSize: '1.25rem',
                                border: 'none',
                                background: 'var(--primary-gradient)',
                                color: 'white',
                                fontWeight: '700'
                              },
                              children: T.avatar
                            }),
                            _jsxs('div', {
                              children: [
                                _jsx('h2', {
                                  style: { fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)' },
                                  children: T.name
                                }),
                                _jsxs('span', {
                                  style: {
                                    fontSize: '0.85rem',
                                    color: 'var(--text-secondary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    marginTop: '2px'
                                  },
                                  children: [_jsx(ae, { size: 14 }), ' ', T.company]
                                })
                              ]
                            })
                          ]
                        }),
                        _jsxs('div', {
                          style: { display: 'flex', gap: '8px' },
                          children: [
                            a.editClient &&
                              _jsxs('button', {
                                className: 'btn-secondary',
                                style: { padding: '6px 12px', fontSize: '0.78rem', cursor: 'pointer' },
                                onClick: openEditModal,
                                title: 'Edit Client Profile',
                                children: [_jsx(we, { size: 13 }), _jsx('span', { children: 'Edit Profile' })]
                              }),
                            (a.deleteClient || a.delete) &&
                              delCli &&
                              _jsxs('button', {
                                className: 'btn-dashboard-delete',
                                style: { cursor: 'pointer' },
                                onClick: () => {
                                  Swal.fire({
                                    title: 'Delete Client Contact?',
                                    text: `Delete "${T.name}" and remove profile from database?`,
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: 'var(--danger)',
                                    cancelButtonColor: 'var(--border-color)',
                                    confirmButtonText: 'Yes, delete!',
                                    background: 'var(--bg-secondary)',
                                    color: 'var(--text-primary)'
                                  }).then(res => {
                                    if (res.isConfirmed) {
                                      delCli(T.id);
                                      s(null);
                                      Swal.fire({
                                        title: 'Deleted!',
                                        text: 'Client removed from PostgreSQL database.',
                                        icon: 'success',
                                        confirmButtonColor: 'var(--primary)',
                                        background: 'var(--bg-secondary)',
                                        color: 'var(--text-primary)'
                                      });
                                    }
                                  });
                                },
                                title: 'Delete Client',
                                children: [_jsx(Ie, { size: 14 }), _jsx('span', { children: 'Delete Client' })]
                              })
                          ]
                        })
                      ]
                    }),
                    _jsxs('div', {
                      children: [
                        _jsx('h3', { className: 'drawer-section-title', children: 'Contact Details' }),
                        _jsxs('div', {
                          style: { display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem' },
                          children: [
                            _jsxs('div', {
                              style: { display: 'flex', alignItems: 'center', gap: '10px' },
                              children: [
                                _jsx(be, { size: 14, style: { color: 'var(--text-tertiary)' } }),
                                _jsx('span', { style: { color: 'var(--text-secondary)' }, children: 'Email:' }),
                                _jsx('a', { href: `mailto:${T.email}`, style: { fontWeight: '500' }, children: T.email })
                              ]
                            }),
                            _jsxs('div', {
                              style: { display: 'flex', alignItems: 'center', gap: '10px' },
                              children: [
                                _jsx(Te, { size: 14, style: { color: 'var(--text-tertiary)' } }),
                                _jsx('span', { style: { color: 'var(--text-secondary)' }, children: 'Phone:' }),
                                _jsx('span', { style: { fontWeight: '600' }, children: T.phone })
                              ]
                            })
                          ]
                        })
                      ]
                    }),
                    _jsxs('div', {
                      children: [
                        _jsx('h3', { className: 'drawer-section-title', children: 'Linked Items' }),
                        _jsxs('div', {
                          style: { display: 'flex', flexDirection: 'column', gap: '8px' },
                          children: [
                            (T.linkedCases || []).map(caseId => {
                              let linked = t.find(item => item.id === caseId);
                              return linked
                                ? _jsxs(
                                    'div',
                                    {
                                      style: {
                                        display: 'flex',
                                        gap: '10px',
                                        padding: '10px 14px',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: 'var(--radius-md)',
                                        alignItems: 'center',
                                        fontSize: '0.85rem'
                                      },
                                      children: [
                                        _jsx(ie, { size: 14, style: { color: 'var(--primary)' } }),
                                        _jsx('span', {
                                          style: { fontWeight: '600', color: 'var(--text-primary)', flex: 1 },
                                          children: linked.title
                                        }),
                                        _jsx('span', { className: 'badge-tag', style: { fontSize: '0.65rem' }, children: linked.cnr })
                                      ]
                                    },
                                    linked.id
                                  )
                                : null;
                            }),
                            (T.linkedRecords || []).map(recId => {
                              let linkedRec = n.find(item => item.id === recId);
                              return linkedRec
                                ? _jsxs(
                                    'div',
                                    {
                                      style: {
                                        display: 'flex',
                                        gap: '10px',
                                        padding: '10px 14px',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: 'var(--radius-md)',
                                        alignItems: 'center',
                                        fontSize: '0.85rem'
                                      },
                                      children: [
                                        _jsx(N, { size: 14, style: { color: 'var(--info)' } }),
                                        _jsx('span', {
                                          style: { fontWeight: '600', color: 'var(--text-primary)', flex: 1 },
                                          children: linkedRec.name
                                        }),
                                        _jsx('span', {
                                          className: 'badge-tag',
                                          style: { fontSize: '0.65rem' },
                                          children: linkedRec.type
                                        })
                                      ]
                                    },
                                    linkedRec.id
                                  )
                                : null;
                            }),
                            (!T.linkedCases || T.linkedCases.length === 0) &&
                              (!T.linkedRecords || T.linkedRecords.length === 0) &&
                              _jsx('div', {
                                style: { fontSize: '0.85rem', color: 'var(--text-tertiary)', fontStyle: 'italic' },
                                children: 'No cases or contract records associated with this client.'
                              })
                          ]
                        })
                      ]
                    }),
                    _jsxs('div', {
                      children: [
                        _jsx('h3', { className: 'drawer-section-title', children: 'Documents Folder' }),
                        _jsxs('div', {
                          style: { display: 'flex', flexDirection: 'column', gap: '8px' },
                          children: [
                            T.documents &&
                              T.documents.map((doc, docIdx) =>
                                _jsxs(
                                  'div',
                                  {
                                    style: {
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      padding: '10px 14px',
                                      backgroundColor: 'var(--bg-tertiary)',
                                      borderRadius: 'var(--radius-md)',
                                      alignItems: 'center',
                                      fontSize: '0.85rem'
                                    },
                                    children: [
                                      _jsxs('div', {
                                        style: { display: 'flex', gap: '8px', alignItems: 'center' },
                                        children: [
                                          _jsx(fe, { size: 14, style: { color: 'var(--text-secondary)' } }),
                                          _jsx('span', {
                                            style: { fontWeight: '500', color: 'var(--text-primary)' },
                                            children: doc.name
                                          })
                                        ]
                                      }),
                                      _jsx('span', {
                                        style: { fontSize: '0.75rem', color: 'var(--text-tertiary)' },
                                        children: doc.size
                                      })
                                    ]
                                  },
                                  docIdx
                                )
                              ),
                            (!T.documents || T.documents.length === 0) &&
                              _jsx('div', {
                                style: { fontSize: '0.85rem', color: 'var(--text-tertiary)', fontStyle: 'italic' },
                                children: 'No uploaded documents.'
                              })
                          ]
                        })
                      ]
                    }),
                    _jsxs('div', {
                      style: { borderTop: '1px solid var(--border-color)', paddingTop: '20px' },
                      children: [
                        _jsx('h3', { className: 'drawer-section-title', children: 'Client CRM Notes' }),
                        _jsx('div', {
                          style: { display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' },
                          children:
                            T.notes &&
                            T.notes.map((noteText, noteIdx) =>
                              _jsxs(
                                'div',
                                {
                                  style: {
                                    padding: '10px 12px',
                                    backgroundColor: 'var(--bg-tertiary)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.85rem',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                  },
                                  children: [
                                    _jsx('span', { children: noteText }),
                                    a.editClient &&
                                      _jsx('button', {
                                        className: 'btn-drawer-close',
                                        style: { color: 'var(--danger)', padding: '2px', cursor: 'pointer' },
                                        title: 'Delete note',
                                        onClick: () => handleDeleteNote(noteIdx),
                                        children: _jsx(Ie, { size: 13 })
                                      })
                                  ]
                                },
                                noteIdx
                              )
                            )
                        }),
                        _jsxs('div', {
                          style: { display: 'flex', gap: '8px' },
                          children: [
                            _jsx('input', {
                              type: 'text',
                              placeholder: a.editClient ? 'Enter discussion logs...' : 'Discussion log additions restricted',
                              value: C,
                              onChange: e => w(e.target.value),
                              disabled: !a.editClient,
                              style: {
                                flex: 1,
                                padding: '8px 12px',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.85rem',
                                backgroundColor: 'var(--bg-primary)',
                                cursor: a.editClient ? 'text' : 'not-allowed'
                              },
                              onKeyDown: e => e.key === 'Enter' && a.editClient && D()
                            }),
                            _jsx('button', {
                              className: 'btn-secondary',
                              style: { padding: '8px 12px', cursor: a.editClient ? 'pointer' : 'not-allowed' },
                              onClick: () => a.editClient && D(),
                              disabled: !a.editClient,
                              children: 'Save Note'
                            })
                          ]
                        })
                      ]
                    })
                  ]
                })
              : _jsxs('div', {
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    padding: '60px 0',
                    color: 'var(--text-tertiary)'
                  },
                  children: [_jsx(Re, { size: 48 }), _jsx('span', { children: 'Select a client contact to display details' })]
                })
          })
        ]
      })
    ]
  });
}