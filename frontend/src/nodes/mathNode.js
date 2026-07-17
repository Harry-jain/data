// mathNode.js
import { BaseNode } from './BaseNode';

export const MathNode = ({ id, data }) => {
  const fields = [
    {
      name: 'operation',
      label: 'Operation',
      type: 'select',
      defaultValue: data?.operation || '+',
      options: [
        { value: '+', label: '+' },
        { value: '-', label: '-' },
        { value: '*', label: '*' },
        { value: '/', label: '/' },
      ],
    },
  ];

  const handles = [
    {
      type: 'target',
      position: 'Left',
      id: `${id}-inputA`,
      style: { top: '33%' },
    },
    {
      type: 'target',
      position: 'Left',
      id: `${id}-inputB`,
      style: { top: '66%' },
    },
    {
      type: 'source',
      position: 'Right',
      id: `${id}-output`,
    },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Math Operation"
      fields={fields}
      handles={handles}
    />
  );
};
