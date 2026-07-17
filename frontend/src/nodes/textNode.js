// textNode.js
import React, { useState, useEffect, useRef } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

const extractVariables = (text) => {
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const variables = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (!variables.includes(match[1])) {
      variables.push(match[1]);
    }
  }
  return variables;
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const updateNodeStyle = useStore((state) => state.updateNodeStyle);
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${scrollHeight}px`;

      // Estimate dynamic dimensions based on content
      const lines = currText.split('\n');
      const maxLineLength = Math.max(...lines.map((line) => line.length), 15);
      
      // Calculate a comfortable width and height
      const computedWidth = Math.max(220, Math.min(600, maxLineLength * 8 + 40));
      const computedHeight = Math.max(80, scrollHeight + 70);

      updateNodeStyle(id, {
        width: `${computedWidth}px`,
        height: `${computedHeight}px`,
      });
    }
  }, [currText, id, updateNodeStyle]);

  const variables = extractVariables(currText);
  const N = variables.length;

  const variableHandles = variables.map((varName, index) => ({
    type: 'target',
    position: 'Left',
    id: `${id}-${varName}`,
    label: varName,
    style: { top: `${((index + 1) * 100) / (N + 1)}%` },
  }));

  const handles = [
    ...variableHandles,
    {
      type: 'source',
      position: 'Right',
      id: `${id}-output`,
    },
  ];

  const fields = [
    {
      name: 'text',
      label: 'Text',
      type: 'textarea',
      defaultValue: data?.text || '{{input}}',
      ref: textareaRef,
      onChange: (val) => {
        setCurrText(val);
      },
    },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      fields={fields}
      handles={handles}
    />
  );
};
