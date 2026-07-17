// BaseNode.js
import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

const positionMap = {
  Left: Position.Left,
  Right: Position.Right,
  Top: Position.Top,
  Bottom: Position.Bottom,
};

export const BaseNode = ({ id, data, title, fields = [], handles = [], style = {} }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  // Initialize local form values
  const [formValues, setFormValues] = useState(() => {
    const initial = {};
    fields.forEach((field) => {
      initial[field.name] = data?.[field.name] ?? field.defaultValue ?? '';
    });
    return initial;
  });

  // Sync initial default values to the store if not present
  useEffect(() => {
    fields.forEach((field) => {
      if (data?.[field.name] === undefined && field.defaultValue !== undefined) {
        updateNodeField(id, field.name, field.defaultValue);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (name, val, customOnChange) => {
    setFormValues((prev) => ({ ...prev, [name]: val }));
    updateNodeField(id, name, val);
    if (customOnChange) {
      customOnChange(val);
    }
  };

  return (
    <div
      className="base-node"
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        backgroundColor: '#1E293B',
        border: '1.5px solid #475569',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
        fontFamily: 'Inter, system-ui, sans-serif',
        overflow: 'visible',
        minWidth: '200px',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {/* Node Header */}
      <div
        className="base-node-header"
        style={{
          backgroundColor: '#1C2536',
          padding: '10px 14px',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
          borderBottom: '1.5px solid #334155',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            color: '#F8FAFC',
            fontWeight: '600',
            fontSize: '13px',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          {title}
        </span>
        <span style={{ fontSize: '10px', color: '#64748B', fontWeight: '500' }}>{id}</span>
      </div>

      {/* Node Content / Fields */}
      {fields.length > 0 && (
        <div
          className="base-node-body"
          style={{
            padding: '12px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxSizing: 'border-box',
          }}
        >
          {fields.map((field) => {
            const value = formValues[field.name];
            return (
              <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {field.label && (
                  <label
                    style={{
                      color: '#94A3B8',
                      fontSize: '11px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.03em',
                    }}
                  >
                    {field.label}
                  </label>
                )}
                {field.type === 'select' ? (
                  <select
                    value={value}
                    onChange={(e) => handleChange(field.name, e.target.value, field.onChange)}
                    className="base-node-select"
                    style={{
                      backgroundColor: '#0F172A',
                      color: '#F8FAFC',
                      border: '1px solid #475569',
                      borderRadius: '6px',
                      padding: '6px 10px',
                      fontSize: '12px',
                      outline: 'none',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s',
                    }}
                  >
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    ref={field.ref}
                    value={value}
                    onChange={(e) => handleChange(field.name, e.target.value, field.onChange)}
                    className="base-node-textarea"
                    rows={1}
                    style={{
                      backgroundColor: '#0F172A',
                      color: '#F8FAFC',
                      border: '1px solid #475569',
                      borderRadius: '6px',
                      padding: '8px 10px',
                      fontSize: '12px',
                      outline: 'none',
                      resize: 'none',
                      lineHeight: '1.4',
                      minHeight: '40px',
                      transition: 'border-color 0.2s',
                    }}
                  />
                ) : (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleChange(field.name, e.target.value, field.onChange)}
                    className="base-node-input"
                    style={{
                      backgroundColor: '#0F172A',
                      color: '#F8FAFC',
                      border: '1px solid #475569',
                      borderRadius: '6px',
                      padding: '6px 10px',
                      fontSize: '12px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Node Handles */}
      {handles.map((handle) => {
        const isSource = handle.type === 'source';
        const defaultHandleStyle = {
          width: '10px',
          height: '10px',
          backgroundColor: isSource ? '#10B981' : '#6366F1',
          border: '2px solid #1E293B',
          transition: 'transform 0.1s ease, background-color 0.2s',
        };

        return (
          <React.Fragment key={handle.id}>
            <Handle
              type={handle.type}
              position={positionMap[handle.position]}
              id={handle.id}
              style={{
                ...defaultHandleStyle,
                ...handle.style,
              }}
            />
            {handle.label && (
              <span
                style={{
                  position: 'absolute',
                  top: handle.style?.top || '50%',
                  transform: 'translateY(-50%)',
                  left: handle.position === 'Left' ? '12px' : 'auto',
                  right: handle.position === 'Right' ? '12px' : 'auto',
                  fontSize: '9px',
                  fontWeight: '600',
                  color: '#94A3B8',
                  backgroundColor: '#1E293B',
                  padding: '2px 4px',
                  borderRadius: '3px',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  zIndex: 10,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }}
              >
                {handle.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
