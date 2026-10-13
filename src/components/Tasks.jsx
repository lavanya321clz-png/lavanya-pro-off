import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import {
  Calendar as A,
  Check as j,
  ChevronLeft as oe,
  ChevronRight as se,
  Kanban as _e,
  List as P,
  Pencil as we,
  Plus as Ee,
  Trash as Le,
  X as Ve,
  ArrowRight as ne,
  ArrowLeft as te
} from 'lucide-react';

export default function Tasks({
  tasks: e = [],
  onUpdateTask: t,
  onAddTask: n,
  onDeleteTask: r,
  perms: i = {}
}) {
  let [a, o] = useState('kanban'),
    [s, c] = useState(''),
    [l, u] = useState('Sarah Jenkins'),
    [d, f] = useState(''),
    [editModalOpen, setEditModalOpen] = useState(false),
    [editingTask, setEditingTask] = useState(null),
    p = (taskId, taskTitle) => {
      Swal.fire({
        title: 'Delete Task Checklist Item?',
        text: `Are you sure you want to delete the task: "${taskTitle}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'var(--primary)',
        cancelButtonColor: 'var(--danger)',
        confirmButtonText: 'Yes, delete it!',
        background: 'var(--bg-secondary)',
        color: 'var(--text-primary)'
      }).then(res => {
        if (res.isConfirmed) {
          r(taskId);
          Swal.fire({
            title: 'Deleted!',
            text: 'Task removed from database.',
            icon: 'success',
            confirmButtonColor: 'var(--primary)',
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)'
          });
        }
      });
    },
    m = evt => {
      evt.preventDefault();
      if (!s.trim()) return;
      n({
        id: 'task_' + Date.now(),
        title: s,
        dueDate: d || new Date().toISOString().split('T')[0],
        assignedUser: l,
        assignedTo: l,
        priority: 'MEDIUM',
        status: 'todo'
      });
      c('');
      f('');
    },
    h = (taskItem, statusVal) => {
      t({ ...taskItem, status: statusVal });
    },
    openEditModal = taskItem => {
      setEditingTask({ ...taskItem });
      setEditModalOpen(true);
    },
    handleEditSubmit = evt => {
      evt.preventDefault();
      if (!editingTask || !t) return;
      t({
        ...editingTask,
        assignedTo: editingTask.assignedUser || editingTask.assignedTo
      });
      setEditModalOpen(false);
      Swal.fire({
        title: 'Task Updated!',
        text: 'Task updates saved to PostgreSQL database.',
        icon: 'success',
        confirmButtonColor: 'var(--primary)',
        background: 'var(--bg-secondary)',
        color: 'var(--text-primary)'
      });
    },
    g = e.filter(item => item.status === 'todo'),
    v = e.filter(item => item.status === 'in_progress'),
    y = e.filter(item => item.status === 'done' || item.status === 'Completed'),
    b = nameVal =>
      (nameVal || 'Unassigned')
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);

  return _jsxs('div', {
    className: 'page-container',
    children: [
      _jsxs('div', {
        className: 'page-header',
        children: [
          _jsxs('div', {
            className: 'page-title-area',
            children: [
              _jsx('h1', { className: 'page-title', children: 'Tasks & Workflows' }),
              _jsx('p', {
                className: 'page-subtitle',
                children: 'Track project schedules, case deadlines, and operations check sheets.'
              })
            ]
          }),
          _jsxs('div', {
            className: 'flex-align',
            style: { backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '4px' },
            children: [
              _jsxs('button', {
                className: `btn-toolbar-filter ${a === 'kanban' ? 'active-filter' : ''}`,
                onClick: () => o('kanban'),
                style: { border: 'none', margin: 0 },
                children: [_jsx(_e, { size: 14, style: { marginRight: '6px' } }), 'Kanban']
              }),
              _jsxs('button', {
                className: `btn-toolbar-filter ${a === 'list' ? 'active-filter' : ''}`,
                onClick: () => o('list'),
                style: { border: 'none', margin: 0 },
                children: [_jsx(P, { size: 14, style: { marginRight: '6px' } }), 'List']
              })
            ]
          })
        ]
      }),
      _jsx('div', {
        className: 'saas-card',
        style: { padding: '16px', opacity: i.addTask ? 1 : 0.65 },
        children: _jsxs('form', {
          onSubmit: m,
          style: { display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' },
          children: [
            _jsx('input', {
              type: 'text',
              placeholder: i.addTask ? 'Add a new task checklist item...' : 'Task creation restricted for this role',
              value: s,
              onChange: evt => c(evt.target.value),
              required: true,
              disabled: !i.addTask,
              style: {
                flex: 1,
                minWidth: '200px',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-primary)',
                fontSize: '0.875rem',
                cursor: i.addTask ? 'text' : 'not-allowed'
              }
            }),
            _jsxs('select', {
              value: l,
              onChange: evt => u(evt.target.value),
              disabled: !i.addTask,
              style: {
                padding: '10px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-primary)',
                fontSize: '0.875rem',
                cursor: i.addTask ? 'pointer' : 'not-allowed'
              },
              children: [
                _jsx('option', { value: 'Sarah Jenkins', children: 'Sarah Jenkins' }),
                _jsx('option', { value: 'Alex Mercer', children: 'Alex Mercer' }),
                _jsx('option', { value: 'Devon Lane', children: 'Devon Lane' })
              ]
            }),
            _jsx('input', {
              type: 'date',
              value: d,
              onChange: evt => f(evt.target.value),
              disabled: !i.addTask,
              style: {
                padding: '8px 10px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-primary)',
                fontSize: '0.875rem',
                cursor: i.addTask ? 'pointer' : 'not-allowed'
              }
            }),
            _jsxs('button', {
              type: 'submit',
              className: 'btn-primary-action',
              style: { padding: '10px 16px', cursor: i.addTask ? 'pointer' : 'not-allowed' },
              disabled: !i.addTask,
              children: [_jsx(Ee, { size: 16 }), _jsx('span', { children: 'Add Task' })]
            })
          ]
        })
      }),
      a === 'kanban'
        ? _jsxs('div', {
            className: 'kanban-board',
            children: [
              _jsxs('div', {
                className: 'kanban-column',
                children: [
                  _jsxs('div', {
                    className: 'kanban-column-header',
                    children: [
                      _jsxs('span', {
                        className: 'kanban-column-title',
                        children: [_jsx('span', { style: { width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--text-tertiary)' } }), 'To Do']
                      }),
                      _jsx('span', { className: 'kanban-column-count', children: g.length })
                    ]
                  }),
                  g.map(taskItem =>
                    _jsxs(
                      'div',
                      {
                        className: 'kanban-card',
                        children: [
                          _jsxs('div', {
                            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
                            children: [
                              _jsx('span', { className: 'kanban-card-title', children: taskItem.title }),
                              _jsxs('div', {
                                style: { display: 'flex', gap: '2px' },
                                children: [
                                  i.editTask &&
                                    _jsx('button', {
                                      className: 'btn-drawer-close',
                                      style: { padding: '4px', cursor: 'pointer' },
                                      onClick: () => openEditModal(taskItem),
                                      title: 'Edit Task',
                                      children: _jsx(we, { size: 12 })
                                    }),
                                  _jsx('button', {
                                    className: 'btn-drawer-close',
                                    style: { padding: '4px', cursor: i.deleteTask ? 'pointer' : 'not-allowed', opacity: i.deleteTask ? 1 : 0.4 },
                                    onClick: () => i.deleteTask && p(taskItem.id, taskItem.title),
                                    title: i.deleteTask ? 'Delete Task' : 'Action Denied - Administrator Role Required',
                                    children: _jsx(Le, { size: 12 })
                                  })
                                ]
                              })
                            ]
                          }),
                          _jsxs('div', {
                            className: 'kanban-card-footer',
                            children: [
                              _jsxs('span', { className: 'kanban-card-date', children: [_jsx(A, { size: 12 }), ' ', taskItem.dueDate] }),
                              _jsxs('div', {
                                style: { display: 'flex', gap: '6px', alignItems: 'center' },
                                children: [
                                  _jsx('div', {
                                    className: 'cell-avatar',
                                    style: { fontSize: '0.65rem', width: '22px', height: '22px' },
                                    children: b(taskItem.assignedUser || taskItem.assignedTo)
                                  }),
                                  i.editTask &&
                                    _jsx('button', {
                                      className: 'btn-secondary',
                                      style: { padding: '4px', borderRadius: '4px' },
                                      title: 'Move to In Progress',
                                      onClick: () => h(taskItem, 'in_progress'),
                                      children: _jsx(ne, { size: 12 })
                                    })
                                ]
                              })
                            ]
                          })
                        ]
                      },
                      taskItem.id
                    )
                  ),
                  g.length === 0 &&
                    _jsx('div', {
                      style: { padding: '20px 0', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontStyle: 'italic' },
                      children: 'No pending items.'
                    })
                ]
              }),
              _jsxs('div', {
                className: 'kanban-column',
                children: [
                  _jsxs('div', {
                    className: 'kanban-column-header',
                    children: [
                      _jsxs('span', {
                        className: 'kanban-column-title',
                        children: [_jsx('span', { style: { width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--warning)' } }), 'In Progress']
                      }),
                      _jsx('span', { className: 'kanban-column-count', children: v.length })
                    ]
                  }),
                  v.map(taskItem =>
                    _jsxs(
                      'div',
                      {
                        className: 'kanban-card',
                        style: { borderLeft: '3px solid var(--warning)' },
                        children: [
                          _jsxs('div', {
                            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
                            children: [
                              _jsx('span', { className: 'kanban-card-title', children: taskItem.title }),
                              _jsxs('div', {
                                style: { display: 'flex', gap: '2px' },
                                children: [
                                  i.editTask &&
                                    _jsx('button', {
                                      className: 'btn-drawer-close',
                                      style: { padding: '4px', cursor: 'pointer' },
                                      onClick: () => openEditModal(taskItem),
                                      title: 'Edit Task',
                                      children: _jsx(we, { size: 12 })
                                    }),
                                  _jsx('button', {
                                    className: 'btn-drawer-close',
                                    style: { padding: '4px', cursor: i.deleteTask ? 'pointer' : 'not-allowed', opacity: i.deleteTask ? 1 : 0.4 },
                                    onClick: () => i.deleteTask && p(taskItem.id, taskItem.title),
                                    title: i.deleteTask ? 'Delete Task' : 'Action Denied - Administrator Role Required',
                                    children: _jsx(Le, { size: 12 })
                                  })
                                ]
                              })
                            ]
                          }),
                          _jsxs('div', {
                            className: 'kanban-card-footer',
                            children: [
                              _jsxs('span', { className: 'kanban-card-date', style: { color: 'var(--warning)' }, children: [_jsx(M, { size: 12 }), ' ', taskItem.dueDate] }),
                              _jsxs('div', {
                                style: { display: 'flex', gap: '6px', alignItems: 'center' },
                                children: [
                                  i.editTask &&
                                    _jsx('button', {
                                      className: 'btn-secondary',
                                      style: { padding: '4px', borderRadius: '4px' },
                                      title: 'Move back to Todo',
                                      onClick: () => h(taskItem, 'todo'),
                                      children: _jsx(te, { size: 12 })
                                    }),
                                  _jsx('div', {
                                    className: 'cell-avatar',
                                    style: { fontSize: '0.65rem', width: '22px', height: '22px' },
                                    children: b(taskItem.assignedUser || taskItem.assignedTo)
                                  }),
                                  i.editTask &&
                                    _jsx('button', {
                                      className: 'btn-secondary',
                                      style: { padding: '4px', borderRadius: '4px' },
                                      title: 'Mark Complete',
                                      onClick: () => h(taskItem, 'done'),
                                      children: _jsx(j, { size: 12 })
                                    })
                                ]
                              })
                            ]
                          })
                        ]
                      },
                      taskItem.id
                    )
                  ),
                  v.length === 0 &&
                    _jsx('div', {
                      style: { padding: '20px 0', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontStyle: 'italic' },
                      children: 'No active work items.'
                    })
                ]
              }),
              _jsxs('div', {
                className: 'kanban-column',
                children: [
                  _jsxs('div', {
                    className: 'kanban-column-header',
                    children: [
                      _jsxs('span', {
                        className: 'kanban-column-title',
                        children: [_jsx('span', { style: { width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success)' } }), 'Done']
                      }),
                      _jsx('span', { className: 'kanban-column-count', children: y.length })
                    ]
                  }),
                  y.map(taskItem =>
                    _jsxs(
                      'div',
                      {
                        className: 'kanban-card',
                        style: { borderLeft: '3px solid var(--success)', opacity: 0.75 },
                        children: [
                          _jsxs('div', {
                            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
                            children: [
                              _jsx('span', { className: 'kanban-card-title', style: { textDecoration: 'line-through', color: 'var(--text-secondary)' }, children: taskItem.title }),
                              _jsxs('div', {
                                style: { display: 'flex', gap: '2px' },
                                children: [
                                  i.editTask &&
                                    _jsx('button', {
                                      className: 'btn-drawer-close',
                                      style: { padding: '4px', cursor: 'pointer' },
                                      onClick: () => openEditModal(taskItem),
                                      title: 'Edit Task',
                                      children: _jsx(we, { size: 12 })
                                    }),
                                  _jsx('button', {
                                    className: 'btn-drawer-close',
                                    style: { padding: '4px', cursor: i.deleteTask ? 'pointer' : 'not-allowed', opacity: i.deleteTask ? 1 : 0.4 },
                                    onClick: () => i.deleteTask && p(taskItem.id, taskItem.title),
                                    title: i.deleteTask ? 'Delete Task' : 'Action Denied - Administrator Role Required',
                                    children: _jsx(Le, { size: 12 })
                                  })
                                ]
                              })
                            ]
                          }),
                          _jsxs('div', {
                            className: 'kanban-card-footer',
                            children: [
                              _jsxs('span', { className: 'kanban-card-date', style: { color: 'var(--success)' }, children: [_jsx(j, { size: 12 }), ' Completed'] }),
                              _jsxs('div', {
                                style: { display: 'flex', gap: '6px', alignItems: 'center' },
                                children: [
                                  i.editTask &&
                                    _jsx('button', {
                                      className: 'btn-secondary',
                                      style: { padding: '4px', borderRadius: '4px' },
                                      title: 'Move back to In Progress',
                                      onClick: () => h(taskItem, 'in_progress'),
                                      children: _jsx(te, { size: 12 })
                                    }),
                                  _jsx('div', {
                                    className: 'cell-avatar',
                                    style: { fontSize: '0.65rem', width: '22px', height: '22px' },
                                    children: b(taskItem.assignedUser || taskItem.assignedTo)
                                  })
                                ]
                              })
                            ]
                          })
                        ]
                      },
                      taskItem.id
                    )
                  ),
                  y.length === 0 &&
                    _jsx('div', {
                      style: { padding: '20px 0', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontStyle: 'italic' },
                      children: 'No completed checklist tasks.'
                    })
                ]
              })
            ]
          })
        : _jsx('div', {
            className: 'table-wrapper',
            children: _jsxs('table', {
              className: 'saas-table',
              children: [
                _jsx('thead', {
                  children: _jsxs('tr', {
                    children: [
                      _jsx('th', { children: 'Task Title' }),
                      _jsx('th', { children: 'Due Date' }),
                      _jsx('th', { children: 'Assignee' }),
                      _jsx('th', { children: 'Status' }),
                      _jsx('th', { style: { textAlign: 'right' }, children: 'Actions' })
                    ]
                  })
                }),
                _jsxs('tbody', {
                  children: [
                    e.map(taskItem =>
                      _jsxs(
                        'tr',
                        {
                          children: [
                            _jsx('td', {
                              style: {
                                fontWeight: '600',
                                textDecoration: taskItem.status === 'done' || taskItem.status === 'Completed' ? 'line-through' : 'none',
                                color: taskItem.status === 'done' || taskItem.status === 'Completed' ? 'var(--text-secondary)' : 'var(--text-primary)'
                              },
                              children: taskItem.title
                            }),
                            _jsx('td', { children: taskItem.dueDate }),
                            _jsx('td', {
                              children: _jsxs('div', {
                                className: 'cell-profile',
                                children: [
                                  _jsx('div', { className: 'cell-avatar', children: b(taskItem.assignedUser || taskItem.assignedTo) }),
                                  _jsx('span', { children: taskItem.assignedUser || taskItem.assignedTo })
                                ]
                              })
                            }),
                            _jsx('td', {
                              children: _jsxs('select', {
                                value: taskItem.status,
                                onChange: evt => h(taskItem, evt.target.value),
                                disabled: !i.editTask,
                                style: {
                                  padding: '4px 8px',
                                  borderRadius: 'var(--radius-sm)',
                                  border: '1px solid var(--border-color)',
                                  backgroundColor: 'var(--bg-secondary)',
                                  fontSize: '0.8rem',
                                  cursor: i.editTask ? 'pointer' : 'not-allowed'
                                },
                                children: [
                                  _jsx('option', { value: 'todo', children: 'To Do' }),
                                  _jsx('option', { value: 'in_progress', children: 'In Progress' }),
                                  _jsx('option', { value: 'done', children: 'Completed' })
                                ]
                              })
                            }),
                            _jsx('td', {
                              style: { textAlign: 'right' },
                              children: _jsxs('div', {
                                style: { display: 'flex', justifyContent: 'flex-end', gap: '6px' },
                                children: [
                                  i.editTask &&
                                    _jsx('button', {
                                      className: 'btn-drawer-close',
                                      style: { cursor: 'pointer' },
                                      onClick: () => openEditModal(taskItem),
                                      title: 'Edit Task',
                                      children: _jsx(we, { size: 14 })
                                    }),
                                  _jsx('button', {
                                    className: 'btn-drawer-close',
                                    style: { cursor: i.deleteTask ? 'pointer' : 'not-allowed', opacity: i.deleteTask ? 1 : 0.4 },
                                    onClick: () => i.deleteTask && p(taskItem.id, taskItem.title),
                                    title: i.deleteTask ? 'Delete Task' : 'Action Denied - Administrator Role Required',
                                    children: _jsx(Le, { size: 16 })
                                  })
                                ]
                              })
                            })
                          ]
                        },
                        taskItem.id
                      )
                    )
                  ]
                })
              ]
            })
          }),

      // Edit Task Modal
      editModalOpen &&
        editingTask &&
        _jsx('div', {
          className: 'add-case-overlay',
          onClick: () => setEditModalOpen(false),
          children: _jsxs('div', {
            className: 'add-case-modal',
            onClick: evt => evt.stopPropagation(),
            style: { maxWidth: '500px' },
            children: [
              _jsxs('div', {
                className: 'modal-header',
                children: [
                  _jsx('span', { className: 'modal-title', children: 'EDIT TASK DETAILS' }),
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
                      _jsx('label', { children: 'Task Title' }),
                      _jsx('input', {
                        type: 'text',
                        value: editingTask.title,
                        onChange: evt => setEditingTask(prev => ({ ...prev, title: evt.target.value })),
                        required: true
                      })
                    ]
                  }),
                  _jsxs('div', {
                    className: 'form-group',
                    children: [
                      _jsx('label', { children: 'Due Date' }),
                      _jsx('input', {
                        type: 'date',
                        value: editingTask.dueDate,
                        onChange: evt => setEditingTask(prev => ({ ...prev, dueDate: evt.target.value })),
                        required: true
                      })
                    ]
                  }),
                  _jsxs('div', {
                    className: 'form-group',
                    children: [
                      _jsx('label', { children: 'Assignee' }),
                      _jsxs('select', {
                        value: editingTask.assignedUser || editingTask.assignedTo,
                        onChange: evt => setEditingTask(prev => ({ ...prev, assignedUser: evt.target.value, assignedTo: evt.target.value })),
                        children: [
                          _jsx('option', { value: 'Sarah Jenkins', children: 'Sarah Jenkins' }),
                          _jsx('option', { value: 'Alex Mercer', children: 'Alex Mercer' }),
                          _jsx('option', { value: 'Devon Lane', children: 'Devon Lane' })
                        ]
                      })
                    ]
                  }),
                  _jsxs('div', {
                    className: 'form-group',
                    children: [
                      _jsx('label', { children: 'Status' }),
                      _jsxs('select', {
                        value: editingTask.status,
                        onChange: evt => setEditingTask(prev => ({ ...prev, status: evt.target.value })),
                        children: [
                          _jsx('option', { value: 'todo', children: 'To Do' }),
                          _jsx('option', { value: 'in_progress', children: 'In Progress' }),
                          _jsx('option', { value: 'done', children: 'Completed' })
                        ]
                      })
                    ]
                  }),
                  _jsx('div', {
                    className: 'modal-action-block',
                    children: _jsx('button', { type: 'submit', className: 'btn-modal-submit', children: 'Save Task Updates' })
                  })
                ]
              })
            ]
          })
        })
    ]
  });
}