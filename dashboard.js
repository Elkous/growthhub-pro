// ===============================
// DASHBOARD
// ===============================

async function loadDashboard() {

  const {
    data: {
      session
    }
  } = await supabaseClient.auth.getSession();


  // User not logged in

  if (!session) {

    window.location.href = "index.html";

    return;

  }


  const user =
    session.user;


  // Email

  const emailElement =
    document.getElementById("userEmail");


  if (emailElement) {

    emailElement.textContent =
      user.email;

  }


  // Name

  const nameElement =
    document.getElementById("userName");


  const name =
    user.user_metadata?.full_name;


  if (nameElement) {

    nameElement.textContent =
      name || "GrowthHub Member";

  }

}


// Start

loadDashboard();
