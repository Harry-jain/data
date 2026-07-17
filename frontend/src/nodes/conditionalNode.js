// conditionalNode.js
import { BaseNode } from './BaseNode';

export const ConditionalNode = ({ id, data }) => {
  const fields = [
    {
      name: 'condition',
      label: 'Condition',
      type: 'text',
      defaultValue: data?.condition || 'x === true',
    },
  ];

  const handles = [
    {
      type: 'target',
      position: 'Left',
      id: `${id}-input`,
    },
    {
      type: 'source',
      position: 'Right',
      id: `${id}-true`,
      label: 'True',
      style: { top: '33%' },
    },
    {
      type: 'source',
      position: 'Right',
      id: `${id}-false`,
      label: 'False',
      style: { top: '66%' },
    },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Conditional"
      fields={fields}
      handles={handles}
    />
  );
};
