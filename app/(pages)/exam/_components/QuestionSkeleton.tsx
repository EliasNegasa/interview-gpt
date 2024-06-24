import { Skeleton, Text } from '@radix-ui/themes';
import React from 'react';

const QuestionSkeleton = () => {
  return (
    <>
      <div className="mb-4">
        <div className="flex flex-col mb-6 space-y-4">
          <Skeleton height="3" width="70%">
            <Text>Question</Text>
          </Skeleton>
          <Skeleton height="3">
            <Text>Question</Text>
          </Skeleton>
        </div>
      </div>

      <Skeleton minHeight="120px">
        <Text>Code</Text>
      </Skeleton>
      
      <div className="flex flex-col mt-6 space-y-4">
        <Skeleton minHeight="45px">
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque
          </Text>
        </Skeleton>
        <Skeleton minHeight="45px">
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque
          </Text>
        </Skeleton>
        <Skeleton minHeight="45px">
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque
          </Text>
        </Skeleton>
        <Skeleton minHeight="45px">
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque
          </Text>
        </Skeleton>
      </div>
    </>
  );
};

export default QuestionSkeleton;
