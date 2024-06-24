import { Option, Question } from '@/app/types/question';
import { Box, Card, Flex, RadioCards, Text } from '@radix-ui/themes';
import { CopyBlock, dracula } from 'react-code-blocks';

interface Props {
  question: Question;
  language: string;
  onOptionSelect: (value: string) => void;
}

const QuestionItem = ({ question, language, onOptionSelect }: Props) => {
  return (
    <>
      <p className="text-2xl font-thin my-4">{question.question}</p>
      {question.code && (
        <Box className="my-4">
          <CopyBlock
            text={question.code}
            language={language}
            theme={dracula}
            codeBlock={false}
          />
        </Box>
      )}
      {question.additional_text && (
        <p className="text-2xl font-thin my-4">{question.additional_text}</p>
      )}
      <RadioCards.Root
        defaultValue=""
        onValueChange={(value) => onOptionSelect(value)}
        columns={{ initial: '1', sm: '1' }}
      >
        <div className="space-y-3 text-left">
          {question.options.map((option: Option) => (
            <div key={option.text} className="w-full flex justify-stretch">
              <RadioCards.Item
                value={option.text}
                key={option.text}
                className="!cursor-pointer !w-full !block transition-all duration-500 hover:bg-gray-200"
              >
                <Text as="div" size="2">
                  {option.text}
                </Text>
              </RadioCards.Item>
              {option.code && (
                <CopyBlock
                  text={option.code}
                  language={language}
                  theme={dracula}
                  codeBlock={false}
                />
              )}
            </div>
          ))}
        </div>
      </RadioCards.Root>
    </>
  );
};

export default QuestionItem;
