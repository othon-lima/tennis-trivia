/*
############################################################################
	Author: Othon Lima
	Date: March 19, 2022
	Purpose: CIS-2286 Assignment 4 - Tennis Trivia
	Resources for trivia questions:
	https://www.triviawell.com/questions/tennis?eb4efcd1_page=1
	https://www.usefultrivia.com/sports_trivia/tennis_trivia_index.html
############################################################################
*/

window.onload = function ()
{
    //Submit button event listener
    document.querySelector("button:last-child").addEventListener("click", submitForm);

    //Hint buttons event listener
    let hintButtons = document.querySelectorAll('.hint');
    for (let currentHint of hintButtons)
    {
        currentHint.addEventListener('click', function ()
        {
            showHint(currentHint.id);
        })
    }
}

/**
 * Checks if all trivia answers are entered. If yes, call checkAnswers()
 * @since 20220318
 * @author Othon Lima
 */
function submitForm()
{
    let textFieldGood = true;
    let radioFieldGood = true;
    let multipleChoiceFieldGood;
    
    //Check text fields and dropdowns (questions 1 - 4)
    for(let i = 1; i < 5; i++)
    {
        let elementId = "question" + i;
        let errorId = "question" + i + "error";
        let formFieldGood = checkTextField(document.getElementById(elementId.toString()), document.getElementById(errorId.toString()));
        
        if (!formFieldGood)
        {
            textFieldGood = false;
        }
    }
    
    //Check multiple choice questions (questions 5 - 6)
    for(let i = 5; i < 7; i++)
    {
        let radioQuerySelector = 'input[name="' + "question" + i + "Options" + '"]:checked';
        let errorId = "question" + i + "error";
        let formFieldGood = checkRadioField(document.querySelector(radioQuerySelector), document.getElementById(errorId.toString()));

        if (!formFieldGood)
        {
            radioFieldGood = false;
        }
    }
    
    //Check choose-all-that-apply question (question 7)
    multipleChoiceFieldGood = checkMultipleChoice(document.querySelectorAll('input[name="question7Options[]"]'), document.getElementById("question7error"));

    if (textFieldGood && radioFieldGood && multipleChoiceFieldGood)
    {
        checkAnswers();
    }
    else
    {
        document.getElementById("outputDiv").innerHTML = "";
    }
}

/**
 * Checks if an input text field is filled. If empty, displays error message
 * @param elem - input element
 * @param error - error message span element
 * @return boolean
 * @since 20220317
 * @author Othon Lima
 */
function checkTextField(elem, error)
{
    let textFieldGood = false;

    if (elem.value.length < 1)
    {
        error.style.display = "inline";
    }
    else
    {
        error.style.display = "none";
        textFieldGood =  true;
    }
    
    return textFieldGood;
}

/**
 * Checks if a radio option is selected. If not, displays error message
 * @param elem - radio element
 * @param error - error message span element
 * @return boolean
 * @since 20220317
 * @author Othon Lima
 */
function checkRadioField(elem, error)
{
    let radioFieldGood = false;
    
    if(elem != null)
    {
        error.style.display = "none";
        radioFieldGood =  true;
    }
    else
    {
        error.style.display = "inline";
    }
    
    return radioFieldGood;
}

/**
 * Checks if multiple choice checkbox is select. If none selected, displays error message
 * @param elem - checkbox array element
 * @param error - error message span element
 * @return boolean
 * @since 20220317
 * @author Othon Lima
 */
function checkMultipleChoice(elem, error)
{
    let multipleChoiceGood = false;
    
    for (let child of elem)
    {
        if (child.type === 'checkbox' && child.checked)
        {
            error.style.display = "none";
            multipleChoiceGood = true;
            return multipleChoiceGood;
        }
    }
    
    error.style.display = "inline";
    return multipleChoiceGood;
}

/**
 * Check trivia answers and displays result
 * @since 20220317
 * @author Othon Lima
 */
function checkAnswers()
{
    let correctAnswerCount = 0;
    let correctPercentage;
    const NUMBER_OF_QUESTIONS = 7;
    
    //Check text input and dropdown menus
    if(document.getElementById("question1").value.toLowerCase() === "love")
    {
        correctAnswerCount++;
    }
    if(document.getElementById("question2").value.toLowerCase() === "spain")
    {
        correctAnswerCount++;
    }
    if(document.getElementById("question3").value === "Bjorn Borg")
    {
        correctAnswerCount++;
    }
    if(document.getElementById("question4").value === "1896")
    {
        correctAnswerCount++;
    }
    
    //Check radio input questions
    if(document.getElementById("question5Option2").checked)
    {
        correctAnswerCount++;
    }
    if(document.getElementById("question6Option2").checked)
    {
        correctAnswerCount++;
    }

    //Check "select all that apply"
    let question7boxes = document.getElementsByName("question7Options[]");
    let userSelectionString = "";
    
    for (let currentBox of question7boxes)
    {
        if (currentBox.type === 'checkbox' && currentBox.checked)
        {
            userSelectionString += currentBox.value + " ";
        }
    }
    if(userSelectionString === "Pete Sampras Roger Federer ")
    {
        correctAnswerCount++;
    }

    //Calculate percentage of correct answers and display it to the user
    correctPercentage = correctAnswerCount * 100 / NUMBER_OF_QUESTIONS;
    correctPercentage = correctPercentage.toFixed(2);
    document.getElementById("outputDiv").innerHTML = "You got " + correctPercentage + "% of the questions correct!";

    //Style output according to percentage of correct answers
    if (correctPercentage < 51)
    {
        document.getElementById("outputDiv").style.color = "red";
    }
    else if (correctPercentage < 80 && correctPercentage >= 51)
    {
        document.getElementById("outputDiv").style.color = "orange";
    }
    else
    {
        document.getElementById("outputDiv").style.color = "green";
    }
}

/**
 * Displays the appropriate hint according to the hint button ID
 * @since 20220318
 * @author Othon Lima
 */
function showHint(hintId)
{
    switch (hintId)
    {
        case "hint1":
            alert("Love means nothing to a tennis player.");
            break
        case "hint2":
            alert("NBA player Pau Gasol is from the same country.");
            break
        case "hint3":
            alert("Swedish former world No. 1 tennis player.");
            break
        case "hint4":
            alert("Over 70 years ago.");
            break
        case "hint5":
            alert("She's also fiercely and successfully advocated for gender equality and social justice.");
            break
        case "hint6":
            alert("The only Grand Slam played on clay court.");
            break
        case "hint7":
            alert("2 of these player won more than 10 Grand Slams. They only faced once, Wimbledon 2021");
            break
    }
}