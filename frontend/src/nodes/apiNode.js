// apiNode.js
import { BaseNode } from './BaseNode';

export const APINode = ({ id, data }) => {
  const fields = [
    {
      name: 'url',
      label: 'API URL',
      type: 'text',
      defaultValue: data?.url || 'https://api.example.com/data',
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
      title="API Request"
      fields={fields}
      handles={handles}
    />
  );
};
