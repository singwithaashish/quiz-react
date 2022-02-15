import React, { useState } from "react";
import { useEffect } from "react";
import {
  Card,
  Button,
  Container,
  Fade,
  Collapse,
  ProgressBar,
  Spinner,
} from "react-bootstrap";
import Particles from "react-tsparticles";
import CardComp from "../Card/CardComp";
import category from "./category";
import Choice from "./Choice";
import partconf from "./particleConfig.json";

function Body() {
  const [questions, setQuestions] = useState(null); // * All the questions here
  const [userAns, setUserAns] = useState(-1); // * -1 means no answer yet
  const [qindex, setQindex] = useState(0); // * current question index
  const [open, setOpen] = useState(true); // * open/close the card, with animation
  const [score, setScore] = useState(0); // * score
  const [start, setStart] = useState(false); // * start/stop the quiz

  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("multiple");
  const [num, setNum] = useState(10);

  useEffect(() => {
    // console.log(`https://opentdb.com/api.php?amount=40&category=${category}&difficulty=${difficulty}&type=${type}`)

    // the api is returning 0 values when there is not enough values for the category, causing the error
    fetch(
      `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}`
    )
      .then((response) => response.json())
      .then((dat) => {
        const da = dat.results.map((el) => {
          const corr = el.correct_answer;
          const answers = insertCorr(el.incorrect_answers, corr);
          return {
            question: el.question,
            answers: answers,
            correctIndex: answers.indexOf(corr),
            category: el.category,
            difficulty: el.difficulty,
          };
        });
        setQuestions(da);
      });
  }, [start]);

  // * randomize the data
  function insertCorr(arr, corr) {
    const randInd = Math.floor(Math.random() * arr.length + 1);
    let na = [...arr];
    na.splice(randInd, 0, corr);

    return na;
  }

  const onAns = () => {
    // * increases score if userAns is correct
    if (userAns == questions[qindex]["correctIndex"]) {
      setScore(score + 1);
    }

    // * next question, and set userAns to -1 (which is like null)
    if (qindex < questions.length - 1) {
      setQindex(qindex + 1);
      setUserAns(-1);
    } else {
      // * -2 is like game completed
      setUserAns(-2);
      
    }

    // show the fade element
    setOpen(true);

    // WHEN ITS TRUE, IT SHOWS, WHEN ITS FALSE, IT CALLS THIS FUNCTION AND SETS IT TO TRUE
  };

  return (
    <div className="body ">
        <Particles options={partconf} />
        {/* * for some reasons, this container is not containing everything it contains */}
      <Container>
        <h1 className="text-center text-info fs-4">Quiz App by <br/> <a href="https://www.github.com/singwithaashish">Aashish singh</a></h1>

        {!start ? (
          <Choice
            type={type}
            num={num}
            setType={setType}
            setNum={setNum}
            setStart={setStart}
            category={category}
            setCategory={setCategory}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
        ) : // * if started and questions have been fetched, then show the card
        questions === null ? (
          <Spinner animation="grow" variant="warning" />
        ) : (
          <Fade
            in={open}
            onExited={() => onAns()}
            // * so we use another container
            className="position-absolute container top-50 start-50 translate-middle"
            
          >
            {userAns !== -2 ? 
            // * if not -2 (game not completed), then show the questions card
            (
              <div style={{maxWidth: "600px"}}>
                <div className="d-flex justify-content-between">
                  <h1 className="text-light">
                    question {qindex + 1} of {questions.length}
                  </h1>
                  <h1 className="text-success">{score}</h1>
                </div>
                <ProgressBar
                  className="mb-1"
                  animated
                  now={(qindex + 1 / questions.length) * 10}
                />
                <div className="bg-dark p-sm-5 p-1">
                  <CardComp
                    quix={questions[qindex]}
                    userAn={userAns}
                    setUserAn={setUserAns}
                    open={open}
                    setOpen={setOpen}
                  />
                  <div style={{display: "grid", placeItems:"center"}}>
                    <Button
                      onClick={() => setOpen(!open)}
                      className="mt-2 bg-dark"
                    >
                      Skip
                    </Button>
                  </div>
                </div>
              </div>
            ) : 
            // * -2 means game completed, so show the result card
            (
              <div className="bg-light p-2">
                <h1 className="text-success">
                  congrats, you got {score} questions right <br /> out of{" "}
                  {questions.length}
                </h1>
                <Button
                  onClick={() => {
                    setQindex(0);
                    setScore(0);
                    setOpen(open);

                    setUserAns(-1);
                    setQuestions(null);
                    setStart(false);
                  }}
                  className="ms-5 mt-1"
                >
                  Restart
                </Button>
              </div>
            )}
          </Fade>
        )}
      </Container>
    </div>
  );
}

export default Body;
