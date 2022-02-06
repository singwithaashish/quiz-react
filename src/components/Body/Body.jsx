import React, { useState } from "react";
import { useEffect } from "react";
import { Card, Button, Container, Fade, Collapse, ProgressBar } from "react-bootstrap";
import Particles from "react-tsparticles";
import CardComp from "../Card/CardComp";
import alld from "./data";
import partconf from "./particleConfig.json";

function Body() {
  const [questions, setQuestions] = useState(null);
  const [userAns, setUserAns] = useState(-1);
  const [qindex, setQindex] = useState(0);
  const [open, setOpen] = useState(true);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=40")
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
  }, []);

  // * randomize the data
  function insertCorr(arr, corr) {
    const randInd = Math.floor(Math.random() * 4);
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
        <Container>
          <Particles options={partconf} />

        {questions === null ? <h1 className="text-light">Loading</h1> : 
          <Fade
            in={open}
            onExited={() => onAns()}
            className="position-absolute top-50 start-50 translate-middle"
          >
            {userAns !== -2 ? (
              <div>
                <div className="d-flex justify-content-between">
                  <h1 className="text-light">
                    question {qindex + 1} of {questions.length}
                  </h1>
                  <h1 className="text-success">{score}</h1>
                </div>
                  <ProgressBar className="mb-1" animated now={(qindex + 1/questions.length) } />
                <div className=" bg-warning p-5 ">
                  <CardComp
                    quix={questions[qindex]}
                    userAn={userAns}
                    setUserAn={setUserAns}
                    open={open}
                    setOpen={setOpen}
                  />

                  <Button onClick={() => setOpen(!open)} className="mt-1">
                    Skip
                  </Button>
                </div>
              </div>
            ) : (
              <h1 className="text-light">
                congrats, you got {score} questions right <br /> out of{" "}
                {questions.length}
                <Button
                  onClick={() => {
                    setQindex(0);
                    setScore(0);
                    setOpen(open);
                    setUserAns(-1);
                  }}
                  className="ms-5 mt-1"
                >
                  Restart
                </Button>
              </h1>
            )}
          </Fade>}
        </Container>
      </div>
    );
  }


export default Body;
