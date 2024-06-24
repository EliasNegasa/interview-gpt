import { Feedback } from '@/app/types/feedback';
import { Box, Card, Text } from '@radix-ui/themes';

interface Props {
  feedback: Feedback;
}

const FeedbackCard = ({ feedback }: Props) => {
  return (
    <Box>
      <Card>
        <Text as="div" size="3" weight="bold" className="mb-4">
          You have answered {feedback.score} out of{' '}
          {feedback.number_of_questions} questions
        </Text>
        <Text as="div" size="2">
          {feedback.feedback}
        </Text>
      </Card>
    </Box>
  );
};

export default FeedbackCard;
