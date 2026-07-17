// filterNode.js
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const fields = [
    {
      name: 'condition',
      label: 'Condition',
      type: 'text',
      defaultValue: data?.condition || 'value > 0',
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
      id: `${id}-output`,
    },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      fields={fields}
      handles={handles}
    />
  );
};
