//read me: the data is displaying correctly on the screen, but for some reason, the math is not working appropriately for the buttons so I chose to put the rankings directly on the screen just to show users that it's there. If I have time later, I would try to troubleshoot / format this.

window.addEventListener("load", () => {
  //fetch data from json file on page load
  //   data from: https://www.responsible-datasets-in-context.com/posts/top-500-novels/top-500-novels.html
  // description: This dataset contains information on the top 500 novels most widely held in libraries, according to OCLC, a library organization with over 16,000 member libraries in over 100 countries. The dataset includes information on authors’ biographies, library holdings, and online engagement for each novel, as well as the full text for all works that are not currently under copyright (190 novels).

  fetch("500 novels.json")
    .then((response) => response.json())
    .then((data) => {
      //display that data on the webpage

      //choose random book number
      randomNumber = Math.floor(Math.random() * data.length);
      randomNumberTwo = Math.floor(Math.random() * data.length);

      //display random book title & it's rank out of 500
      let novelTitleOneButton = document.querySelector("#book_title");
      let novelTitle = data[randomNumber].title;
      novelTitleOneButton.innerHTML = novelTitle;

      let novelRankingName = data[randomNumber].top_500_rank;
      console.log(novelRankingName);

      let novelRankingDisplay = document.getElementById("ranking_one");
      novelRankingDisplay.innerHTML = novelRankingName;

      //display random book title 2 & it's rank out of 500
      let novelTitleTwoButton = document.querySelector("#book_title_two");
      let novelTitleTwo = data[randomNumberTwo].title;
      novelTitleTwoButton.innerHTML = novelTitleTwo;

      let novelRankingNameTwo = data[randomNumberTwo].top_500_rank;
      console.log(novelRankingNameTwo);

      let novelRankingDisplayTwo = document.getElementById("ranking_two");
      novelRankingDisplayTwo.innerHTML = novelRankingNameTwo;

      //determine which is bigger // math not working for some reason

      let higherRanking;

      if (novelRankingName > novelRankingNameTwo) {
        higherRanking = novelTitleTwo;
      } else {
        higherRanking = novelTitle;
      }

      console.log(higherRanking);

      const showPopup = (isCorrect) => {
        let popup = document.getElementById("center_popup");
        popup.style.visibility = "visible";

        let overlay = document.getElementById("overlay");
        overlay.style.visibility = "visible";

        //display results in popup window

        let resultDisplayOne = document.getElementById("popup_text");

        resultDisplayOne.innerHTML = `${
          isCorrect ? "Correct! " : "Sorry, better luck next time :/ "
        } ${novelTitle} is ranked ${novelRankingName} by the OCLC! ${novelTitleTwo} is ranked ${novelRankingNameTwo}.`;

        let continueButton = document.getElementById("continue_button");
        continueButton.addEventListener("click", function () {
          location.reload();
        });
      };

      //detect click event for each button , in each button, ask if numworks if bigger than the other num works and then perform something based on that

      //in the click event, determine if they clicked the right button

      //when user clicks fandom button one, something happens depending on if that fandom is bigger
      novelTitleOneButton.addEventListener("click", function () {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });

        if (novelRankingName < novelRankingNameTwo) {
          console.log("number one ranked higher");

          showPopup(true);
        } else {
          console.log("number one ranked lower");

          showPopup(false);
        }
      });

      //when user clicks fandom button two, something happens depending on if that fandom is bigger
      novelTitleTwoButton.addEventListener("click", function () {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        if (novelRankingNameTwo < novelRankingName) {
          console.log("number two ranked higher");

          showPopup(false);
        } else {
          console.log("number two ranked lower");

          showPopup(true);
        }
      });
    })
    .catch(function (err) {
      console.error(err);
    });
});
