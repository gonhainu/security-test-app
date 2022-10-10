import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import { Box, Container } from "@chakra-ui/react";
import Question from "../components/Question";
import styles from "../styles/Home.module.css";

type SecurityResolve = {
  genre: string;
  text: string;
  answer: string;
};

const Home: NextPage = () => {
  const [questions, setQuestions] = useState<SecurityResolve[]>([]);
  const [index, setIndex] = useState(0);

  const nextIndex = () => {
    setIndex(index + 1 < questions.length ? index + 1 : 0);
  };

  useEffect(() => {
    axios
      .get("/resolve.json")
      .then((res) => setQuestions(_.shuffle(res.data.items.slice())));
  }, []);

  console.log(index);
  return (
    <Container className={styles.main}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        {questions.length > 0 && (
          <Question item={questions[index]} nextIndex={nextIndex}></Question>
        )}
      </Box>
    </Container>
  );
};

export default Home;
