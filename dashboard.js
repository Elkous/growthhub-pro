// =====================================
// GROWTHHUB PRO - DASHBOARD
// =====================================

async function loadDashboard() {

  console.log("Dashboard starting...");

  try {

    // Get session
    const {
      data,
      error
    } = await supabaseClient.auth.getSession();

    if (error) {
      throw error;
    }

    const session = data.session;

    console.log("Session:", session);

    // No login
    if (!session) {
      window.location.href = "index.html";
      return;
    }

    const user = session.user;

    console.log("User:", user.id);

    // Show basic Auth information immediately
    setText(
      "userEmail",
      user.email || ""
    );

    setText(
      "userName",
      user.user_metadata?.full_name || "GrowthHub Member"
    );

    // =====================================
    // Get profile
    // =====================================

    const {
      data: profile,
      error: profileError
    } = await supabaseClient
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    console.log("Profile:", profile);
    console.log("Profile error:", profileError);

    // If profile exists
    if (profile) {

      setText(
        "userName",
        profile.full_name || "GrowthHub Member"
      );

      setText(
        "profileName",
        profile.full_name || "GrowthHub Member"
      );

      setText(
        "userRole",
        profile.role || "Member"
      );

      setText(
        "userXP",
        profile.points ?? 0
      );

      setText(
        "userLevel",
        profile.level ?? 1
      );

    }

    // If profile has an error, don't freeze dashboard
    if (profileError) {

      console.warn(
        "Could not load profile:",
        profileError.message
      );

    }

  } catch (error) {

    console.error(
      "Dashboard error:",
      error
    );

    setText(
      "userName",
      "GrowthHub Member"
    );

  } finally {

    // ALWAYS remove loading screen
    hideLoading();

  }

}


// =====================================
// Helper
// =====================================

function setText(id, value) {

  const element =
    document.getElementById(id);

  if (element) {
    element.textContent = value;
  }

}


// =====================================
// Hide Loading
// =====================================

function hideLoading() {

  const loading =
    document.getElementById("loadingScreen");

  if (!loading) return;

  loading.style.opacity = "0";

  setTimeout(() => {

    loading.style.display = "none";

  }, 300);

}


// =====================================
// Start
// =====================================

loadDashboard();
