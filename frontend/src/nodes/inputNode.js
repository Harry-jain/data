// inputNode.js
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const fields = [
    {
      name: 'inputName',
      label: 'Name',
      type: 'text',
      defaultValue: data?.inputName || id.replace('customInput-', 'input_'),
    },
    {
      name: 'inputType',
      label: 'Type',
      type: 'select',
      defaultValue: data?.inputType || 'Text',
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'File', label: 'File' },
      ],
    },
  ];

  const handles = [
    {
      type: 'source',
      position: 'Right',
      id: `${id}-value`,
    },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      fields={fields}
      handles={handles}
    />
  );
};
