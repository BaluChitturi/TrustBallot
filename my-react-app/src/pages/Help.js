import React from 'react';

function Help() {
  return (
    <div>
      <h2>Help: Voting System</h2>
      <p>
        Welcome to the Help page for our Voting System. Below, you'll find some useful information about how our voting system works and how to use it effectively:
      </p>
      <h3>How to Vote</h3>
      <p>
        To cast your vote, follow these simple steps:
      </p>
      <ol>
        <li><strong>Login:</strong> Log in to your account using your credentials.</li>
        <li><strong>View Candidates:</strong> Browse through the list of candidates and their details.</li>
        <li><strong>Make Your Selection:</strong> Select your preferred candidate by clicking on their name or corresponding checkbox.</li>
        <li><strong>Submit Your Vote:</strong> Once you've made your selection, click the "Vote" button to submit your vote.</li>
      </ol>
      <h3>Important Information</h3>
      <p>
        Here are some important things to keep in mind while using our voting system:
      </p>
      <ul>
        <li><strong>One Vote per User:</strong> Each user is allowed to cast only one vote.</li>
        <li><strong>Deadline:</strong> Make sure to cast your vote before the voting deadline.</li>
        <li><strong>Confidentiality:</strong> Your voting choices are confidential and cannot be viewed by others.</li>
        <li><strong>Security:</strong> We prioritize the security and integrity of our voting system to ensure fair elections.</li>
      </ul>
      <h3>Need Further Assistance?</h3>
      <p>
        If you have any questions, concerns, or encounter any issues while using our voting system, please don't hesitate to contact our support team. We're here to help!
      </p>
      {/* Relevant Questions and Answers */}
      <h3>Relevant Questions</h3>
      <dl>
        <dt>Q: Can I change my vote after submitting it?</dt>
        <dd>A: No, once you've submitted your vote, it cannot be changed. Please review your selections carefully before submitting.</dd>
        <dt>Q: Is my personal information safe and secure?</dt>
        <dd>A: Yes, we prioritize the security of your personal information and voting choices. Your data is encrypted and protected.</dd>
        <dt>Q: How can I verify that my vote has been counted?</dt>
        <dd>A: You can trust that your vote has been counted accurately. Our system ensures transparency and integrity in the voting process.</dd>
      </dl>
    </div>
  );
}

export default Help;
