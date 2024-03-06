<script>
  import Header from "../lib/Header.svelte";
  import axios from "axios";

  async function getConversations() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/get-conversations/`,
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function getSiteAverageCorrectness(){
    let siteAverageCorrectness = 0;
    try {
      let allConversations = await getConversations();
      for(let conversation of allConversations){
        switch(conversation.correctness){
          case 'Correct':
            siteAverageCorrectness += 1;
            break;
          case 'Incorrect':
            siteAverageCorrectness += 0;
            break;
          case 'Partially Correct':
            siteAverageCorrectness += 0.5;
            break;
          default:
            siteAverageCorrectness += 0.5;
        }
      }
      siteAverageCorrectness = siteAverageCorrectness / allConversations.length;
      return siteAverageCorrectness
    } catch (error) {
      console.error("Error:", error);
    }
  } 
</script>

<div>
  <Header />
  <h1>User Stats</h1>
  <h3>Work in progress!</h3>
  <p>
    This page will display the user's stats, such as the number of questions
    answered correctly and incorrectly, the user's current score, and the user's
    average score.
  </p>
  <p>
    This page will also display the user's progress in studying for the
    different CompTIA certification exams.
  </p>
  <h3>Site Stats</h3>
  <p>
    {#await getSiteAverageCorrectness()}
      <p>Loading...</p>
    {:then siteAverageCorrectness}
      <p>
        The site's average correctness is {siteAverageCorrectness * 100}%.
      </p>
    {:catch error}
      <p>Error: {error.message}</p>
    {/await}
  </p>
</div>
