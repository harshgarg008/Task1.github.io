function showDetails(serviceName) {
    const details = {
      "User Authentication": "Securely sign up, log in, and manage your profile. Your data is encrypted for your safety.",
      "Scoring and Feedback": "Get automatic scoring, detailed reports, and review the correct answers for better learning.",
      "Offline Mode": "Continue using the quiz app even without internet. Your progress syncs when you're back online.",
      "Content Support": "Access quizzes across multiple subjects.",
    };
  
    alert(details[serviceName] || "More details coming soon!");
  }
  
  