// delayNode.js
import { BaseNode } from './BaseNode';

export const DelayNode = ({ id, data }) => {
  const fields = [
    {
      name: 'duration',
      label: 'Duration (ms)',
      type: 'text',
      defaultValue: data?.duration || '1000',
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
      title="Delay"
      fields={fields}
      handles={handles}
    />
  );
};
