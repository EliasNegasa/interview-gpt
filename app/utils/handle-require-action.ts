import { Dispatch, SetStateAction } from 'react';
import { Message } from '../types/message';
import submitToolOutputs from './submit-tool-outputs';

const handleRequiresAction: any = async (
  data: any,
  threadId: string,
  setMessage: Dispatch<SetStateAction<Message | undefined>>
) => {
  console.log('handleRequiresAction');

  try {
    const toolOutputs = data.required_action.submit_tool_outputs.tool_calls.map(
      (toolCall: any) => {
        if (toolCall.function.name) {
          return {
            tool_call_id: toolCall.id,
            output: toolCall.function.arguments,
          };
        }
      }
    );

    return await submitToolOutputs(toolOutputs, data.id, threadId, setMessage);
  } catch (error) {
    console.error('Error processing required action:', error);
  }
};

export default handleRequiresAction;
