import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import next from "next";
import React, { useCallback, useState } from "react";
import type { SecurityResolve } from "../types";

type PropsType = {
  className?: string;
  item: SecurityResolve;
  nextIndex: () => void;
};

const Question: React.FC<PropsType> = ({ className, item, nextIndex }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [judgement, setJudgement] = useState<boolean>();
  const onClick = useCallback(
    (value: string) => {
      setJudgement(value === item.answer);
      setShowAnswer(true);
    },
    [item]
  );
  const onNext = () => {
    setShowAnswer(false);
    nextIndex();
  };
  return (
    <Box>
      <>
        <div>{item.genre}</div>
        <div>{item.text}</div>
        <ButtonGroup>
          <Button onClick={() => onClick("A01")} colorScheme="red">
            根本的解決
          </Button>
          <Button onClick={() => onClick("A02")} colorScheme="yellow">
            保険的解決
          </Button>
        </ButtonGroup>
        {showAnswer && (
          <>
            {judgement ? <p>正解</p> : <p>不正解</p>}
            <Button onClick={() => onNext()}>次へ</Button>
          </>
        )}
      </>
    </Box>
  );
};

export default Question;
