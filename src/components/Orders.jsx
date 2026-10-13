import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { jsx as _jsx, jsxs as _jsxs, Fragment } from 'react/jsx-runtime';
import {
  Briefcase as ie,
  Download as ue,
  FileText as fe,
  Gavel as he,
  Pencil as we,
  Plus as Ee,
  Printer as De,
  Search as ke,
  Tag as Fe,
  Trash2 as Ie,
  X as Ve,
  ChevronRight as se
} from 'lucide-react';

const ot = [
  'Filing Registry Order',
  'Notice Order',
  'Interim Order',
  'Stay Order',
  'Directions Order',
  'Final Judgment',
  'Decree Order',
  'Bail Order',
  'Disposal Order',
  'Contempt Notice Order'
];

export default function Orders({ cases: e = [], onUpdateCase: t, perms: n = {} }) {
  let r = [];
  e.forEach(caseItem => {
    (caseItem.orders || []).forEach((order, idx) => {
      r.push({
        ...order,
        id: `order_${caseItem.id}_${idx}`,
        orderIndex: idx,
        caseId: caseItem.id,
        caseTitle: caseItem.title,
        caseNumber: caseItem.caseNumber,
        cnr: caseItem.cnr,
        court: caseItem.court,
        category: caseItem.category,
        priority: caseItem.priority,
        tags: order.type === 'Final Judgment' ? ['Final', 'Disposal'] : ['Interim', 'Procedural']
      });
    });
  });

  let [i, a] = useState(r[0]?.id || null),
    [o, s] = useState(''),
    [c, l] = useState('All'),
    [u, d] = useState('All'),
    [f, p] = useState(false),
    [editingOrder, setEditingOrder] = useState(null),
    [g, v] = useState({
      caseId: e[0]?.id || '',
      date: new Date().toISOString().split('T')[0],
      type: 'Interim Order',
      description: '',
      filename: '',
      content: ''
    }),
    y = r.find(item => item.id === i) || r[0],
    b = r.filter(item => {
      let matchQuery =
          !o ||
          item.caseTitle.toLowerCase().includes(o.toLowerCase()) ||
          item.description.toLowerCase().includes(o.toLowerCase()) ||
          item.type.toLowerCase().includes(o.toLowerCase()),
        matchTag = c === 'All' || item.tags.includes(c),
        matchCase = u === 'All' || item.caseId === u;
      return matchQuery && matchTag && matchCase;
    }),
    x = ['All', 'Final', 'Interim', 'Procedural', 'Disposal'];

  // Add Order Submit
  const handleAddSubmit = evt => {
    evt.preventDefault();
    let targetCase = e.find(item => item.id === g.caseId);
    if (!targetCase || !t) return;
    let newOrderObj = {
      date: g.date,
      type: g.type,
      description: g.description,
      filename: g.filename || `Order_${g.type.replace(/\s/g, '_')}_${g.date}.pdf`,
      content: g.content
    };
    t({ ...targetCase, orders: [...(targetCase.orders || []), newOrderObj] });
    p(false);
    v({
      caseId: e[0]?.id || '',
      date: new Date().toISOString().split('T')[0],
      type: 'Interim Order',
      description: '',
      filename: '',
      content: ''
    });
    Swal.fire({
      title: 'Order Saved!',
      text: 'Order record added to case and saved to PostgreSQL.',
      icon: 'success',
      confirmButtonColor: 'var(--primary)',
      background: 'var(--bg-secondary)',
      color: 'var(--text-primary)'
    });
  };

  // Delete Order
  const handleDeleteOrder = order => {
    Swal.fire({
      title: 'Delete Order Record?',
      text: `Are you sure you want to delete order "${order.type}" dated ${order.date} from case "${order.caseTitle}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--danger)',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonColor: 'var(--border-color)',
      background: 'var(--bg-secondary)',
      color: 'var(--text-primary)'
    }).then(res => {
      if (res.isConfirmed) {
        let targetCase = e.find(item => item.id === order.caseId);
        if (!targetCase || !t) return;
        let updatedOrders = (targetCase.orders || []).filter((_, idx) => idx !== order.orderIndex);
        t({ ...targetCase, orders: updatedOrders });
        a(null);
        Swal.fire({
          title: 'Deleted!',
          text: 'Order record removed from case and database updated.',
          icon: 'success',
          confirmButtonColor: 'var(--primary)',
          background: 'var(--bg-secondary)',
          color: 'var(--text-primary)'
        });
      }
    });
  };

  // Edit Order Submit
  const handleEditSubmit = evt => {
    evt.preventDefault();
    if (!editingOrder || !t) return;
    let targetCase = e.find(item => item.id === editingOrder.caseId);
    if (!targetCase) return;

    let updatedOrders = (targetCase.orders || []).map((order, idx) => {
      if (idx === editingOrder.orderIndex) {
        return {
          date: editingOrder.date,
          type: editingOrder.type,
          description: editingOrder.description,
          filename: editingOrder.filename || order.filename,
          content: editingOrder.content
        };
      }
      return order;
    });

    t({ ...targetCase, orders: updatedOrders });
    setEditingOrder(null);
    Swal.fire({
      title: 'Order Updated!',
      text: 'Order changes saved to PostgreSQL database.',
      icon: 'success',
      confirmButtonColor: 'var(--primary)',
      background: 'var(--bg-secondary)',
      color: 'var(--text-primary)'
    });
  };

  let C = {};
  b.forEach(item => {
    C[item.caseId] || (C[item.caseId] = { caseTitle: item.caseTitle, caseNumber: item.caseNumber, court: item.court, orders: [] });
    C[item.caseId].orders.push(item);
  });

  return _jsxs('div', {
    className: 'page-container',
    children: [
      _jsxs('div', {
        className: 'page-header',
        children: [
          _jsxs('div', {
            className: 'page-title-area',
            children: [
              _jsx('h1', { className: 'page-title', children: 'Orders & Decrees' }),
              _jsx('p', {
                className: 'page-subtitle',
                children: 'Browse, preview, edit, and manage all court orders and decrees across all cases. eCourt-synced.'
              })
            ]
          }),
          n.write &&
            _jsxs('button', {
              className: 'btn-primary-action',
              onClick: () => p(true),
              children: [_jsx(Ee, { size: 16 }), _jsx('span', { children: 'Add Order' })]
            })
        ]
      }),
      _jsx('div', {
        className: 'records-toolbar',
        style: { marginBottom: '20px' },
        children: _jsxs('div', {
          className: 'toolbar-left',
          style: { flexWrap: 'wrap', gap: '10px' },
          children: [
            _jsxs('div', {
              className: 'search-toolbar-wrapper',
              style: { flex: '1 1 200px' },
              children: [
                _jsx(ke, { size: 16, className: 'search-icon' }),
                _jsx('input', {
                  type: 'text',
                  placeholder: 'Search orders by case, type, or description...',
                  value: o,
                  onChange: e => s(e.target.value)
                })
              ]
            }),
            _jsxs('div', {
              className: 'flex-align',
              style: { gap: '5px' },
              children: [
                _jsx(Fe, { size: 13, style: { color: 'var(--text-tertiary)' } }),
                x.map(item =>
                  _jsx(
                    'button',
                    {
                      className: `btn-toolbar-filter ${c === item ? 'active-filter' : ''}`,
                      onClick: () => l(item),
                      children: item
                    },
                    item
                  )
                )
              ]
            }),
            _jsxs('select', {
              value: u,
              onChange: e => d(e.target.value),
              style: {
                padding: '6px 10px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-secondary)',
                fontSize: '0.82rem',
                color: 'var(--text-primary)',
                cursor: 'pointer'
              },
              children: [
                _jsx('option', { value: 'All', children: 'All Cases' }),
                e.map(item => _jsx('option', { value: item.id, children: item.caseNumber }, item.id))
              ]
            })
          ]
        })
      }),
      _jsxs('div', {
        className: 'pdf-preview-split',
        children: [
          _jsxs('div', {
            style: { display: 'flex', flexDirection: 'column', gap: '20px' },
            children: [
              Object.entries(C).map(([caseId, group]) =>
                _jsxs(
                  'div',
                  {
                    children: [
                      _jsxs('div', {
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px 14px',
                          background: 'var(--bg-tertiary)',
                          borderRadius: 'var(--radius-md)',
                          marginBottom: '10px',
                          border: '1px solid var(--border-color)'
                        },
                        children: [
                          _jsx(ie, { size: 15, style: { color: 'var(--primary)' } }),
                          _jsxs('div', {
                            style: { flex: 1 },
                            children: [
                              _jsxs('div', {
                                style: { fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-primary)' },
                                children: [group.caseTitle.slice(0, 55), group.caseTitle.length > 55 ? '...' : '']
                              }),
                              _jsxs('div', {
                                style: { fontSize: '0.72rem', color: 'var(--text-tertiary)' },
                                children: [group.caseNumber, ' · ', group.court]
                              })
                            ]
                          }),
                          _jsxs('span', {
                            style: {
                              fontSize: '0.72rem',
                              fontWeight: '700',
                              color: 'var(--primary)',
                              background: 'var(--primary-light)',
                              padding: '2px 8px',
                              borderRadius: '10px'
                            },
                            children: [group.orders.length, ' order', group.orders.length === 1 ? '' : 's']
                          })
                        ]
                      }),
                      group.orders.map(orderItem =>
                        _jsxs(
                          'div',
                          {
                            className: `saas-card ${i === orderItem.id ? 'premium' : ''}`,
                            style: {
                              cursor: 'pointer',
                              borderColor: i === orderItem.id ? 'var(--primary)' : 'var(--border-color)',
                              padding: '14px 16px',
                              marginBottom: '8px'
                            },
                            onClick: () => a(orderItem.id),
                            children: [
                              _jsxs('div', {
                                className: 'flex-between',
                                children: [
                                  _jsxs('div', {
                                    style: { display: 'flex', gap: '8px', alignItems: 'center' },
                                    children: [
                                      _jsx('span', {
                                        style: {
                                          fontSize: '0.72rem',
                                          fontWeight: '700',
                                          textTransform: 'uppercase',
                                          color: 'var(--text-tertiary)'
                                        },
                                        children: orderItem.type
                                      }),
                                      _jsx('span', { className: 'badge-tag', style: { fontSize: '0.65rem' }, children: orderItem.date })
                                    ]
                                  }),
                                  _jsxs('div', {
                                    style: { display: 'flex', alignItems: 'center', gap: '6px' },
                                    children: [
                                      n.delete &&
                                        _jsx('button', {
                                          className: 'btn-drawer-close',
                                          style: { color: 'var(--danger)', padding: '2px' },
                                          title: 'Delete Order',
                                          onClick: evt => {
                                            evt.stopPropagation();
                                            handleDeleteOrder(orderItem);
                                          },
                                          children: _jsx(Ie, { size: 13 })
                                        }),
                                      _jsx(se, { size: 15, style: { color: i === orderItem.id ? 'var(--primary)' : 'var(--text-tertiary)' } })
                                    ]
                                  })
                                ]
                              }),
                              _jsx('h4', {
                                style: {
                                  fontSize: '0.88rem',
                                  fontWeight: '700',
                                  marginTop: '6px',
                                  color: 'var(--text-primary)',
                                  lineHeight: '1.3'
                                },
                                children: orderItem.description
                              }),
                              _jsxs('div', {
                                style: { display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' },
                                children: [
                                  orderItem.tags.map((tVal, tIdx) =>
                                    _jsx(
                                      'span',
                                      {
                                        className: 'badge-tag',
                                        style: { fontSize: '0.65rem', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' },
                                        children: tVal
                                      },
                                      tIdx
                                    )
                                  ),
                                  _jsx('span', {
                                    style: { fontSize: '0.65rem', color: 'var(--text-tertiary)', alignSelf: 'center', marginLeft: 'auto' },
                                    children: orderItem.filename
                                  })
                                ]
                              })
                            ]
                          },
                          orderItem.id
                        )
                      )
                    ]
                  },
                  caseId
                )
              ),
              b.length === 0 &&
                _jsxs('div', {
                  style: {
                    textAlign: 'center',
                    padding: '40px',
                    color: 'var(--text-tertiary)',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg)'
                  },
                  children: [
                    _jsx(fe, { size: 32, style: { marginBottom: '8px', opacity: 0.4 } }),
                    _jsx('div', { style: { fontWeight: '600' }, children: 'No orders match the selected filters.' })
                  ]
                })
            ]
          }),
          _jsx('div', {
            className: 'pdf-preview-panel',
            children: y
              ? _jsxs(Fragment, {
                  children: [
                    _jsxs('div', {
                      className: 'flex-between',
                      style: { width: '100%', padding: '0 10px 16px 10px', borderBottom: '1px solid var(--border-color)', marginBottom: '16px' },
                      children: [
                        _jsxs('div', {
                          style: { display: 'flex', alignItems: 'center', gap: '8px' },
                          children: [
                            _jsx(fe, { size: 18, style: { color: 'var(--primary)' } }),
                            _jsx('span', {
                              style: {
                                fontWeight: '700',
                                fontSize: '0.88rem',
                                maxWidth: '200px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              },
                              children: y.filename
                            })
                          ]
                        }),
                        _jsxs('div', {
                          className: 'flex-align',
                          style: { gap: '6px' },
                          children: [
                            n.write &&
                              _jsxs('button', {
                                className: 'btn-secondary',
                                style: { padding: '6px 10px', fontSize: '0.75rem' },
                                onClick: () => {
                                  setEditingOrder({
                                    caseId: y.caseId,
                                    orderIndex: y.orderIndex,
                                    date: y.date,
                                    type: y.type,
                                    description: y.description,
                                    filename: y.filename,
                                    content: y.content || ''
                                  });
                                },
                                children: [_jsx(we, { size: 12 }), _jsx('span', { children: 'Edit' })]
                              }),
                            n.delete &&
                              _jsxs('button', {
                                className: 'btn-secondary',
                                style: { padding: '6px 10px', fontSize: '0.75rem', color: 'var(--danger)', borderColor: 'var(--danger)' },
                                onClick: () => handleDeleteOrder(y),
                                children: [_jsx(Ie, { size: 12 }), _jsx('span', { children: 'Delete' })]
                              }),
                            _jsxs('button', {
                              className: 'btn-secondary',
                              style: { padding: '6px 10px', fontSize: '0.75rem' },
                              onClick: () => window.print(),
                              children: [_jsx(De, { size: 12 }), _jsx('span', { children: 'Print' })]
                            }),
                            _jsxs('button', {
                              className: 'btn-primary-action',
                              style: { padding: '6px 12px', fontSize: '0.75rem' },
                              onClick: () => {
                                Swal.fire({
                                  title: 'Download Certified Order',
                                  text: `Preparing certified copy of "${y.filename}" for download...`,
                                  icon: 'success',
                                  confirmButtonColor: 'var(--primary)',
                                  background: 'var(--bg-secondary)',
                                  color: 'var(--text-primary)'
                                });
                              },
                              children: [_jsx(ue, { size: 12 }), _jsx('span', { children: 'Download' })]
                            })
                          ]
                        })
                      ]
                    }),
                    _jsxs('div', {
                      style: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' },
                      children: [
                        _jsx('span', { className: 'badge-tag', children: y.category }),
                        _jsx('span', { style: { fontWeight: '600', fontSize: '0.82rem', color: 'var(--text-secondary)' }, children: y.caseNumber }),
                        _jsx('span', { style: { fontSize: '0.72rem', color: 'var(--text-tertiary)' }, children: y.court })
                      ]
                    }),
                    _jsxs('div', {
                      className: 'pdf-document-mock',
                      children: [
                        _jsxs('div', {
                          style: {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            borderBottom: '2px double #333333',
                            paddingBottom: '12px',
                            marginBottom: '20px'
                          },
                          children: [
                            _jsx(he, { size: 32, style: { color: '#1a1a1a', marginBottom: '8px' } }),
                            _jsx('h2', {
                              style: {
                                fontSize: '1.1rem',
                                fontWeight: '800',
                                fontFamily: 'serif',
                                letterSpacing: '1px',
                                textTransform: 'uppercase',
                                color: '#111111',
                                textAlign: 'center'
                              },
                              children: y.court
                            }),
                            _jsx('p', {
                              style: { fontSize: '0.7rem', color: '#666666', textTransform: 'uppercase', letterSpacing: '0.5px' },
                              children: 'Official Order — Certified Copy'
                            })
                          ]
                        }),
                        _jsxs('div', {
                          style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '0.75rem',
                            fontFamily: 'monospace',
                            marginBottom: '20px',
                            flexWrap: 'wrap',
                            gap: '8px'
                          },
                          children: [
                            _jsxs('div', {
                              children: [
                                _jsx('strong', { children: 'CNR:' }),
                                ' ',
                                y.cnr,
                                _jsx('br', {}),
                                _jsx('strong', { children: 'CASE NO:' }),
                                ' ',
                                y.caseNumber
                              ]
                            }),
                            _jsxs('div', {
                              style: { textAlign: 'right' },
                              children: [
                                _jsx('strong', { children: 'DATE:' }),
                                ' ',
                                y.date,
                                _jsx('br', {}),
                                _jsx('strong', { children: 'STATUS:' }),
                                ' Live Synced ●'
                              ]
                            })
                          ]
                        }),
                        _jsxs('div', {
                          style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                            borderLeft: '3px solid #666',
                            paddingLeft: '12px',
                            margin: '16px 0',
                            fontSize: '0.85rem'
                          },
                          children: [
                            _jsxs('div', {
                              children: [
                                _jsx('strong', { children: 'Petitioner:' }),
                                ' ',
                                y.caseTitle.split(' Vs ')[0] || y.caseTitle.split(' vs ')[0]
                              ]
                            }),
                            _jsx('div', { style: { fontStyle: 'italic', fontWeight: '500', color: '#555' }, children: 'versus' }),
                            _jsxs('div', {
                              children: [
                                _jsx('strong', { children: 'Respondent:' }),
                                ' ',
                                y.caseTitle.split(' Vs ')[1] || y.caseTitle.split(' vs ')[1] || '—'
                              ]
                            })
                          ]
                        }),
                        _jsx('div', {
                          style: {
                            fontSize: '0.85rem',
                            lineHeight: '1.7',
                            fontFamily: 'serif',
                            color: '#222222',
                            textAlign: 'justify',
                            whiteSpace: 'pre-line',
                            marginTop: '16px'
                          },
                          children: y.content
                        }),
                        _jsxs('div', {
                          style: {
                            marginTop: '40px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            fontSize: '0.8rem',
                            fontFamily: 'serif'
                          },
                          children: [
                            _jsx('div', {
                              style: { borderTop: '1px solid #333333', width: '200px', paddingTop: '6px', textAlign: 'center' },
                              children: _jsx('strong', { children: 'COURT REGISTRAR' })
                            }),
                            _jsxs('div', {
                              style: { fontSize: '0.7rem', color: '#666666', textAlign: 'center', width: '200px', marginTop: '2px' },
                              children: [y.court, ' (eCourt API Seal)']
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
                    color: 'var(--text-tertiary)',
                    height: '100%'
                  },
                  children: [
                    _jsx(fe, { size: 48, style: { opacity: 0.4 } }),
                    _jsx('span', { style: { fontWeight: '600' }, children: 'Select an order from the list to preview' }),
                    _jsx('span', { style: { fontSize: '0.82rem' }, children: 'Orders synced from eCourts will appear here' })
                  ]
                })
          })
        ]
      }),

      // Modal: Add New Order
      f &&
        _jsx('div', {
          className: 'add-case-overlay',
          onClick: () => p(false),
          children: _jsxs('div', {
            className: 'add-case-modal',
            onClick: e => e.stopPropagation(),
            style: { maxWidth: '600px' },
            children: [
              _jsxs('div', {
                className: 'modal-header',
                children: [
                  _jsx('span', { className: 'modal-title', children: 'ADD NEW ORDER / DECREE' }),
                  _jsx('button', { className: 'modal-close-btn', onClick: () => p(false), children: _jsx(Ve, { size: 20 }) })
                ]
              }),
              _jsxs('form', {
                onSubmit: handleAddSubmit,
                className: 'modal-form-content',
                children: [
                  _jsxs('div', {
                    className: 'form-group',
                    children: [
                      _jsx('label', { style: { color: 'var(--primary)', fontWeight: '700' }, children: 'Case' }),
                      _jsx('select', {
                        value: g.caseId,
                        onChange: e => v(t => ({ ...t, caseId: e.target.value })),
                        required: true,
                        children: e.map(item =>
                          _jsxs('option', { value: item.id, children: [item.caseNumber, ' — ', item.title.slice(0, 55)] }, item.id)
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
                          _jsx('label', { children: 'Order Date' }),
                          _jsx('input', {
                            type: 'date',
                            value: g.date,
                            onChange: e => v(t => ({ ...t, date: e.target.value })),
                            required: true
                          })
                        ]
                      }),
                      _jsxs('div', {
                        className: 'form-group',
                        children: [
                          _jsx('label', { children: 'Order Type' }),
                          _jsx('select', {
                            value: g.type,
                            onChange: e => v(t => ({ ...t, type: e.target.value })),
                            children: ot.map(item => _jsx('option', { value: item, children: item }, item))
                          })
                        ]
                      })
                    ]
                  }),
                  _jsxs('div', {
                    className: 'form-group',
                    children: [
                      _jsx('label', { children: 'Short Description' }),
                      _jsx('input', {
                        type: 'text',
                        placeholder: 'e.g. Stay of demand notice granted pending admission',
                        value: g.description,
                        onChange: e => v(t => ({ ...t, description: e.target.value })),
                        required: true
                      })
                    ]
                  }),
                  _jsxs('div', {
                    className: 'form-group',
                    children: [
                      _jsx('label', { children: 'Filename (optional)' }),
                      _jsx('input', {
                        type: 'text',
                        placeholder: 'e.g. Interim_Stay_Order.pdf',
                        value: g.filename,
                        onChange: e => v(t => ({ ...t, filename: e.target.value }))
                      })
                    ]
                  }),
                  _jsxs('div', {
                    className: 'form-group',
                    children: [
                      _jsx('label', { children: 'Order Content / Text' }),
                      _jsx('textarea', {
                        rows: 6,
                        placeholder: 'Paste or type the full order text as received from court...',
                        value: g.content,
                        onChange: e => v(t => ({ ...t, content: e.target.value })),
                        style: { resize: 'vertical' }
                      })
                    ]
                  }),
                  _jsx('div', {
                    className: 'modal-action-block',
                    children: _jsx('button', { type: 'submit', className: 'btn-modal-submit', children: 'Save Order' })
                  })
                ]
              })
            ]
          })
        }),

      // Modal: Edit Order
      editingOrder &&
        _jsx('div', {
          className: 'add-case-overlay',
          onClick: () => setEditingOrder(null),
          children: _jsxs('div', {
            className: 'add-case-modal',
            onClick: e => e.stopPropagation(),
            style: { maxWidth: '600px' },
            children: [
              _jsxs('div', {
                className: 'modal-header',
                children: [
                  _jsx('span', { className: 'modal-title', children: 'EDIT ORDER DETAILS' }),
                  _jsx('button', { className: 'modal-close-btn', onClick: () => setEditingOrder(null), children: _jsx(Ve, { size: 20 }) })
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
                          _jsx('label', { children: 'Order Date' }),
                          _jsx('input', {
                            type: 'date',
                            value: editingOrder.date,
                            onChange: e => setEditingOrder(prev => ({ ...prev, date: e.target.value })),
                            required: true
                          })
                        ]
                      }),
                      _jsxs('div', {
                        className: 'form-group',
                        children: [
                          _jsx('label', { children: 'Order Type' }),
                          _jsx('select', {
                            value: editingOrder.type,
                            onChange: e => setEditingOrder(prev => ({ ...prev, type: e.target.value })),
                            children: ot.map(item => _jsx('option', { value: item, children: item }, item))
                          })
                        ]
                      })
                    ]
                  }),
                  _jsxs('div', {
                    className: 'form-group',
                    children: [
                      _jsx('label', { children: 'Short Description' }),
                      _jsx('input', {
                        type: 'text',
                        value: editingOrder.description,
                        onChange: e => setEditingOrder(prev => ({ ...prev, description: e.target.value })),
                        required: true
                      })
                    ]
                  }),
                  _jsxs('div', {
                    className: 'form-group',
                    children: [
                      _jsx('label', { children: 'Filename' }),
                      _jsx('input', {
                        type: 'text',
                        value: editingOrder.filename,
                        onChange: e => setEditingOrder(prev => ({ ...prev, filename: e.target.value }))
                      })
                    ]
                  }),
                  _jsxs('div', {
                    className: 'form-group',
                    children: [
                      _jsx('label', { children: 'Order Content / Text' }),
                      _jsx('textarea', {
                        rows: 6,
                        value: editingOrder.content,
                        onChange: e => setEditingOrder(prev => ({ ...prev, content: e.target.value })),
                        style: { resize: 'vertical' }
                      })
                    ]
                  }),
                  _jsx('div', {
                    className: 'modal-action-block',
                    children: _jsx('button', { type: 'submit', className: 'btn-modal-submit', children: 'Save Order Updates' })
                  })
                ]
              })
            ]
          })
        })
    ]
  });
}