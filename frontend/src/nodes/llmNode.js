// llmNode.js
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const handles = [
    {
      type: 'target',
      position: 'Left',
      id: `${id}-system`,
      style: { top: `${100 / 3}%` },
    },
    {
      type: 'target',
      position: 'Left',
      id: `${id}-prompt`,
      style: { top: `${200 / 3}%` },
    },
    {
      type: 'source',
      position: 'Right',
      id: `${id}-response`,
    },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      fields={[]}
      handles={handles}
    />
  );
};
